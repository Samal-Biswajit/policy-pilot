# Project Structure

This document provides a breakdown of the important files and directories in the Policy Pilot repository.

## Root Directory

```text
policy-pilot/
├── backend/                  # The FastAPI backend application
├── frontend/                 # The Next.js frontend application
├── docs/                     # Project documentation (Architecture, API, Tasks, etc.)
├── reports/                  # Project reports and screenshots
├── .gitignore                # Global Git ignore rules
└── README.md                 # Primary project overview
```

## Backend Directory

```text
backend/
├── app/
│   ├── api/
│   │   └── endpoints.py      # FastAPI route definitions (/chat, /health)
│   ├── core/
│   │   └── config.py         # Environment variables and application settings
│   ├── models/
│   │   └── schemas.py        # Pydantic data models for request/response validation
│   ├── services/
│   │   ├── ingestion.py      # PDF text extraction, chunking, and embedding logic
│   │   └── retrieval.py      # Semantic search and Gemini LLM generation logic
│   └── main.py               # FastAPI application initialization and middleware
├── knowledge_base/           # The static PDF documents serving as the corpus
├── chroma_db/                # Local SQLite storage for ChromaDB vectors (auto-generated)
├── scripts/
│   └── run_ingestion.py      # CLI script for manually triggering document ingestion
├── .env                      # API keys and environment variables (not in version control)
└── requirements.txt          # Python dependencies
```

## Frontend Directory

```text
frontend/
├── app/
│   ├── layout.tsx            # Root layout and global metadata
│   ├── page.tsx              # Main entry point hosting the chat interface
│   └── globals.css           # Global Tailwind styles
├── components/
│   ├── ChatContainer.tsx     # Manages chat state and UI orchestration
│   ├── ChatInput.tsx         # User text input and submit logic
│   ├── MessageList.tsx       # Renders the conversational history
│   ├── MessageBubble.tsx     # Displays individual user/AI messages
│   ├── EmptyState.tsx        # Hero section displayed before the first message
│   └── Header.tsx            # Application branding and health status
├── hooks/
│   ├── useChat.ts            # Custom React hook for API interactions and state
│   └── useHealth.ts          # Custom React hook for polling backend status
├── lib/
│   └── api.ts                # Axios/Fetch wrappers for API communication
├── public/                   # Static assets (SVGs, icons)
├── package.json              # Node dependencies and npm scripts
└── tailwind.config.ts        # Tailwind configuration (if applicable)
```

## Reports Directory

```text
reports/
└── PROJECT_REPORT.md         # A formal, academic-style report detailing the system's design, implementation, and results
```
