# Enterprise Knowledge Assistant - Backend

This is the backend for the Enterprise Knowledge Assistant project. Currently, it supports the document ingestion pipeline (Milestone 1).

## Setup Instructions

1. **Create a Virtual Environment (Optional but recommended)**
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows use: venv\Scripts\activate
   ```

2. **Install Dependencies**
   Navigate to the `backend` directory and install the required Python packages:
   ```bash
   pip install -r requirements.txt
   ```

3. **Configure Environment Variables**
   Copy the `.env.example` file to `.env`:
   ```bash
   cp .env.example .env
   ```
   Open `.env` and paste your valid Gemini API Key:
   ```
   GEMINI_API_KEY=your_actual_key_here
   ```

4. **Run Ingestion Pipeline**
   To index the PDFs in the `knowledge_base` folder into ChromaDB, run:
   ```bash
   python scripts/run_ingestion.py
   ```
