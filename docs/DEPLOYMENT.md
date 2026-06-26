# Deployment Guide

This document outlines the deployment strategy for Policy Pilot. The application is designed to be easily deployed to modern cloud platforms.

## Overview
- **Frontend**: Deployed on Vercel.
- **Backend**: Deployed on Render.

## Backend Deployment (Render)

Render is used to host the FastAPI backend.

1. **Connect Repository**: Create a new "Web Service" in the Render dashboard and connect your GitHub repository.
2. **Configuration**:
   - **Root Directory**: `backend`
   - **Environment**: Python 3
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
3. **Environment Variables**:
   - Add `GEMINI_API_KEY` and set it to your Google Gemini API key.

### Automatic ChromaDB Initialization
On Render, the filesystem starts empty on the first deployment. The backend's FastAPI `lifespan` event automatically detects the absence of the `knowledge_base` collection. It blocks the startup sequence, runs the document ingestion pipeline synchronously, populates the ChromaDB database locally, and then initializes the retrieval service to ensure it doesn't crash on an empty disk.

## Frontend Deployment (Vercel)

Vercel is used to host the Next.js frontend.

1. **Import Project**: In the Vercel dashboard, click "Add New Project" and import the repository.
2. **Configuration**:
   - **Framework Preset**: Next.js
   - **Root Directory**: `frontend`
3. **API Integration**: Ensure the frontend's API service module (`lib/api.ts`) points to the production URL of your Render backend.
4. **Deploy**: Click Deploy.

## CORS Configuration

To allow the frontend to communicate with the backend, Cross-Origin Resource Sharing (CORS) is configured in the backend's `main.py`.

Ensure your Vercel URL is added to the `allow_origins` list:
```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "https://your-frontend-app.vercel.app"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

## Common Deployment Issues & Troubleshooting

**Backend crashes with "Collection does not exist"**
- **Cause**: The retrieval service attempted to connect to ChromaDB before the ingestion pipeline populated it.
- **Fix**: This has been resolved in the codebase via lazy initialization during the FastAPI lifespan. Ensure you are running the latest version of `app/main.py`.

**Frontend API calls fail (CORS Error)**
- **Cause**: The Vercel URL is not whitelisted in the backend.
- **Fix**: Add the deployed Vercel domain to `allow_origins` in `backend/app/main.py` and redeploy the backend.

**API Rate Limit Exceeded (Status 429)**
- **Cause**: The Gemini API free tier limits have been reached.
- **Fix**: Wait for the rate limit window to reset, or upgrade your Gemini API tier.
