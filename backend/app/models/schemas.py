from pydantic import BaseModel, Field
from typing import List

class ChatRequest(BaseModel):
    question: str = Field(..., description="The user's question to answer.")

class ChatResponse(BaseModel):
    answer: str
    sources: List[str]
    retrieved_chunks: int

class HealthResponse(BaseModel):
    status: str
    vector_database: str
    gemini: str
