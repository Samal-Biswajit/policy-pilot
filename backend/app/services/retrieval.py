import time
import chromadb
import google.generativeai as genai
from typing import List, Dict, Any, Tuple
from app.core.config import settings
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Re-use the embedding model from ingestion and specify generation model
EMBEDDING_MODEL = "models/gemini-embedding-2"
GENERATION_MODEL = "gemini-2.5-flash"

class RetrievalService:
    def __init__(self):
        self.chroma_client = None
        self.collection = None
        self.vector_db_status = "disconnected"
        self.gemini_status = "disconnected"

    def initialize(self):
        try:
            self.chroma_client = chromadb.PersistentClient(path=settings.CHROMA_DB_DIR)
            self.collection = self.chroma_client.get_collection(name="knowledge_base")
            self.vector_db_status = "connected"
        except Exception as e:
            logger.error(f"Failed to connect to ChromaDB: {e}")
            self.collection = None
            self.vector_db_status = "disconnected"

        try:
            genai.configure(api_key=settings.GEMINI_API_KEY)
            # Test configuration silently
            self.gemini_status = "connected" if settings.GEMINI_API_KEY and settings.GEMINI_API_KEY != "your_gemini_api_key_here" else "disconnected"
        except Exception as e:
            logger.error(f"Failed to initialize Gemini: {e}")
            self.gemini_status = "disconnected"

    def get_health(self) -> Dict[str, str]:
        status = "healthy" if self.vector_db_status == "connected" and self.gemini_status == "connected" else "unhealthy"
        return {
            "status": status,
            "vector_database": self.vector_db_status,
            "gemini": self.gemini_status
        }

    def generate_embedding(self, text: str) -> List[float]:
        result = genai.embed_content(
            model=EMBEDDING_MODEL,
            content=text,
            task_type="retrieval_query"
        )
        return result['embedding']

    def search_chroma(self, query_embedding: List[float], top_k: int = 4) -> Tuple[List[str], List[str]]:
        if not self.collection:
            raise RuntimeError("ChromaDB is not connected.")
            
        results = self.collection.query(
            query_embeddings=[query_embedding],
            n_results=top_k
        )
        
        chunks = []
        sources = set()
        
        if results['documents'] and results['documents'][0]:
            chunks = results['documents'][0]
            metadatas = results['metadatas'][0]
            for meta in metadatas:
                if 'document_filename' in meta:
                    filename = meta['document_filename']
                    page = meta.get('page_number')
                    if page is not None:
                        sources.add(f"{filename} (Page {page})")
                    else:
                        sources.add(filename)
                    
        # Sort naturally and remove duplicates implicitly via set
        sorted_sources = sorted(list(sources))
        return chunks, sorted_sources

    def generate_answer(self, question: str, chunks: List[str]) -> str:
        prompt = "You are an enterprise knowledge assistant.\n\n"
        prompt += "Answer ONLY using the provided context for company-related questions.\n"
        prompt += "If the user is just saying hello, thank you, or other conversational pleasantries, respond politely without searching for context.\n"
        prompt += "For policy questions, if the answer cannot be determined from the context, say:\n"
        prompt += "'I could not find that information in the provided company documents.'\n"
        prompt += "Never invent company policies.\n"
        prompt += "Never guess.\n"
        prompt += "IMPORTANT: If your response does not use the retrieved context (e.g., if it's a greeting, a pleasantry, or if the information is missing), append the exact string '|||NO_SOURCES|||' to the very end of your response.\n\n"
        
        prompt += "--- Retrieved Context ---\n"
        for idx, chunk in enumerate(chunks, 1):
            prompt += f"Chunk {idx}:\n{chunk}\n\n"
            
        prompt += "--- User Question ---\n"
        prompt += f"{question}\n"
        
        model = genai.GenerativeModel(GENERATION_MODEL)
        response = model.generate_content(prompt)
        
        return response.text.strip()

    def answer_question(self, question: str) -> Dict[str, Any]:
        start_time = time.time()
        
        if not question.strip():
            raise ValueError("Question cannot be empty.")
            
        if self.gemini_status != "connected":
            raise RuntimeError("Gemini API is not properly connected. Check API key.")
            
        # 1. Generate query embedding
        emb_start = time.time()
        try:
            query_embedding = self.generate_embedding(question)
        except Exception as e:
            raise RuntimeError(f"Error generating embeddings: {e}")
        emb_end = time.time()
        
        # 2. Search Chroma
        retrieval_start = time.time()
        top_k = 4  # Provides a solid balance (approx 4 chunks of 1000 chars = 4000 chars total) preventing overwhelming the context window while giving enough detail.
        chunks, sources = self.search_chroma(query_embedding, top_k=top_k)
        retrieval_end = time.time()
        
        if not chunks:
            logger.warning("No context retrieved from ChromaDB.")
            
        # 3. Generate Answer
        llm_start = time.time()
        try:
            answer = self.generate_answer(question, chunks)
            if "|||NO_SOURCES|||" in answer:
                answer = answer.replace("|||NO_SOURCES|||", "").strip()
                sources = []
        except Exception as e:
            raise RuntimeError(f"Error generating answer with Gemini: {e}")
        llm_end = time.time()
        
        total_time = time.time() - start_time
        
        logger.info(f"Incoming Request Question: {question}")
        logger.info(f"Retrieval Duration: {retrieval_end - retrieval_start:.2f}s")
        logger.info(f"LLM Duration: {llm_end - llm_start:.2f}s")
        logger.info(f"Total Response Time: {total_time:.2f}s")
        logger.info(f"Retrieved Document Count: {len(chunks)}")
        
        return {
            "answer": answer,
            "sources": sources,
            "retrieved_chunks": len(chunks)
        }

retrieval_service = RetrievalService()
