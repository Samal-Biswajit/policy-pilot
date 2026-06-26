import sys
import os

# Add the backend directory to Python path so 'app' can be imported
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from app.services.ingestion import run_ingestion_pipeline

if __name__ == "__main__":
    try:
        run_ingestion_pipeline()
    except KeyboardInterrupt:
        print("\nIngestion stopped by user.")
    except Exception as e:
        print(f"\nAn unexpected error occurred: {e}")
