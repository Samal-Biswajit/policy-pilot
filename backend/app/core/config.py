import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

class Settings:
    """Application settings and environment variables."""
    GEMINI_API_KEY: str = os.getenv("GEMINI_API_KEY", "")
    
    # Base directory is the 'backend' folder
    BASE_DIR: str = os.path.dirname(os.path.dirname(os.path.dirname(__file__)))
    
    # Important directories
    KNOWLEDGE_BASE_DIR: str = os.path.join(BASE_DIR, "knowledge_base")
    CHROMA_DB_DIR: str = os.path.join(BASE_DIR, "chroma_db")

# Instantiate settings to be used across the application
settings = Settings()
