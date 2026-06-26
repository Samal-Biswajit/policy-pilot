import os
import time
import re
import fitz  # PyMuPDF
import chromadb
import google.generativeai as genai
from typing import List

from app.core.config import settings

def clean_text(text: str) -> str:
    """Removes excessive whitespace and newlines from text."""
    text = re.sub(r'\s+', ' ', text)
    return text.strip()

def chunk_text(text: str, chunk_size: int = 1000, overlap: int = 200) -> List[str]:
    """
    Splits text into chunks of approximate `chunk_size` characters with an `overlap`.
    Preserves word boundaries to avoid splitting in the middle of sentences when possible.
    """
    words = text.split()
    chunks = []
    current_chunk = []
    current_length = 0
    
    for word in words:
        current_chunk.append(word)
        current_length += len(word) + 1  # +1 for space
        
        if current_length >= chunk_size:
            chunks.append(" ".join(current_chunk))
            
            # Start new chunk with overlap
            overlap_length = 0
            overlap_chunk = []
            for w in reversed(current_chunk):
                overlap_chunk.insert(0, w)
                overlap_length += len(w) + 1
                if overlap_length >= overlap:
                    break
                    
            current_chunk = overlap_chunk
            current_length = overlap_length
            
    if current_chunk:
        # Avoid adding the same exact chunk if it's identical to the last one
        final_chunk = " ".join(current_chunk)
        if not chunks or chunks[-1] != final_chunk:
            chunks.append(final_chunk)
            
    return chunks

def embed_texts(texts: List[str]) -> List[List[float]]:
    """Generates embeddings for a list of texts using Gemini API."""
    if not settings.GEMINI_API_KEY or settings.GEMINI_API_KEY == "your_gemini_api_key_here":
        raise ValueError("Valid GEMINI_API_KEY is not set. Please set it in your .env file.")
        
    genai.configure(api_key=settings.GEMINI_API_KEY)
    
    embeddings = []
    # Embed each chunk
    for text in texts:
        result = genai.embed_content(
            model="models/gemini-embedding-2",
            content=text,
            task_type="retrieval_document"
        )
        embeddings.append(result['embedding'])
    return embeddings

def run_ingestion_pipeline():
    """Main pipeline to process PDFs, chunk text, embed, and store in ChromaDB."""
    print("Initializing ingestion pipeline...")
    
    start_time = time.time()
    
    # 1. Initialize ChromaDB
    try:
        chroma_client = chromadb.PersistentClient(path=settings.CHROMA_DB_DIR)
        collection = chroma_client.get_or_create_collection(name="knowledge_base")
    except Exception as e:
        print(f"Error initializing ChromaDB: {e}")
        return

    # 2. Check Knowledge Base Directory
    if not os.path.exists(settings.KNOWLEDGE_BASE_DIR):
        print(f"Error: Knowledge base directory not found at {settings.KNOWLEDGE_BASE_DIR}")
        return
        
    pdf_files = [f for f in os.listdir(settings.KNOWLEDGE_BASE_DIR) if f.endswith('.pdf')]
    if not pdf_files:
        print(f"Error: No PDF files found in {settings.KNOWLEDGE_BASE_DIR}")
        return
        
    print(f"Loading PDFs...\n")
    
    total_docs_indexed = 0
    total_chunks_created = 0
    
    # 3. Process each PDF
    for pdf_file in pdf_files:
        print(f"Processing {pdf_file}...")
        
        # Check for duplicate indexing
        existing_docs = collection.get(where={"document_filename": pdf_file})
        if existing_docs and existing_docs.get('ids'):
            print(f"Document '{pdf_file}' is already indexed. Skipping.\n")
            continue
            
        pdf_path = os.path.join(settings.KNOWLEDGE_BASE_DIR, pdf_file)
        
        try:
            doc = fitz.open(pdf_path)
        except Exception as e:
            print(f"Error opening {pdf_file}: {e}\n")
            continue
            
        document_chunks = []
        document_metadatas = []
        document_ids = []
        
        chunk_idx = 0
        
        # Read pages
        for page_num in range(len(doc)):
            page = doc.load_page(page_num)
            text = page.get_text()
            cleaned_text = clean_text(text)
            
            if not cleaned_text:
                continue
                
            # Chunk requirements: preserve paragraph boundaries, avoid splitting sentences.
            # The chunk_text function is word-aware and overlap keeps context between chunks.
            chunks = chunk_text(cleaned_text, chunk_size=1000, overlap=200)
            
            for chunk in chunks:
                document_chunks.append(chunk)
                document_metadatas.append({
                    "document_filename": pdf_file,
                    "page_number": page_num + 1,
                    "chunk_index": chunk_idx
                    # total_chunks will be added after we know the total
                })
                document_ids.append(f"{pdf_file}_chunk_{chunk_idx}")
                chunk_idx += 1
                
        doc.close()
        
        if not document_chunks:
            print(f"No usable text found in {pdf_file}. Skipping.\n")
            continue
            
        # Update metadata with total_chunks
        total_file_chunks = len(document_chunks)
        for meta in document_metadatas:
            meta["total_chunks"] = total_file_chunks
            
        print(f"Created {total_file_chunks} chunks...")
        print("Embedding chunks...")
        
        try:
            embeddings = embed_texts(document_chunks)
        except Exception as e:
            print(f"Error generating embeddings for {pdf_file}: {e}")
            print("Please ensure your GEMINI_API_KEY is valid and the API is reachable.\n")
            continue
            
        print("Saving to ChromaDB...")
        try:
            collection.add(
                ids=document_ids,
                embeddings=embeddings,
                metadatas=document_metadatas,
                documents=document_chunks
            )
            print("Document indexed successfully.\n")
            total_docs_indexed += 1
            total_chunks_created += total_file_chunks
        except Exception as e:
            print(f"Error saving to ChromaDB for {pdf_file}: {e}\n")
            
    # Final Summary
    end_time = time.time()
    time_taken = round(end_time - start_time, 2)
    
    print("Final summary:")
    print(f"Documents indexed: {total_docs_indexed}")
    print(f"Chunks created: {total_chunks_created}")
    print(f"Time taken: {time_taken} seconds")
