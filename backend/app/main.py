from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.endpoints import router as api_router

from contextlib import asynccontextmanager
import os
import chromadb
from app.core.config import settings
from app.services.ingestion import run_ingestion_pipeline
from app.services.retrieval import retrieval_service

@asynccontextmanager
async def lifespan(app: FastAPI):
    """Lifecycle events for the FastAPI application."""
    # Check if ChromaDB collection 'knowledge_base' exists
    client = chromadb.PersistentClient(path=settings.CHROMA_DB_DIR)
    try:
        client.get_collection("knowledge_base")
        collection_exists = True
    except Exception:
        collection_exists = False

    if not collection_exists:
        print("Collection 'knowledge_base' not found. Running initial ingestion...")
        # Run ingestion in the background or synchronously. 
        # Doing it synchronously blocks startup until ingestion completes.
        run_ingestion_pipeline()
    else:
        print("Collection 'knowledge_base' already exists. Skipping initial ingestion.")
        
    # Initialize retrieval service AFTER ingestion
    retrieval_service.initialize()
    
    yield

app = FastAPI(
    title="Enterprise Knowledge Assistant API",
    description="Retrieval-Augmented Generation (RAG) backend API",
    version="1.0.0",
    lifespan=lifespan
)

# Allow the Next.js frontend to call the API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "https://policy-pilot-flax.vercel.app"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(api_router)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)
