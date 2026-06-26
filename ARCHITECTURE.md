# ARCHITECTURE.md

# Enterprise Knowledge Assistant

## System Architecture

Version: 1.0

---

# Overview

Enterprise Knowledge Assistant is a Retrieval-Augmented Generation (RAG) application that enables employees to ask questions about company policies and receive answers generated from an internal document knowledge base.

The system retrieves relevant information from indexed PDF documents before sending context to the Large Language Model (LLM).

The LLM should never answer directly without retrieved context.

---

# High-Level Architecture

```text
                    User
                      │
                      ▼
            Next.js Frontend
                      │
                 HTTP Request
                      │
                      ▼
               FastAPI Backend
                      │
         ┌────────────┴────────────┐
         │                         │
         ▼                         ▼
 Question Embedding         ChromaDB Search
         │                         │
         └────────────┬────────────┘
                      ▼
           Top Relevant Chunks
                      │
                      ▼
          Prompt Construction
                      │
                      ▼
             Gemini 2.5 Flash
                      │
                      ▼
              Generated Answer
                      │
                      ▼
            Returned to Frontend
```

---

# Ingestion Pipeline

The ingestion pipeline runs only when documents are indexed.

```text
PDF Files
     │
     ▼
PyMuPDF Loader
     │
     ▼
Extract Raw Text
     │
     ▼
Text Cleaning
     │
     ▼
Chunking
     │
     ▼
Embedding Generation
     │
     ▼
Store Embeddings
     │
     ▼
ChromaDB
```

The ingestion process should be repeatable without duplicating existing vectors.

---

# Query Pipeline

Every user question follows this pipeline.

```text
User Question
      │
      ▼
Generate Question Embedding
      │
      ▼
Vector Similarity Search
      │
      ▼
Retrieve Top-K Chunks
      │
      ▼
Build Prompt
      │
      ▼
Gemini API
      │
      ▼
Generated Response
      │
      ▼
Frontend
```

---

# Project Structure

```text
Enterprise-Knowledge-Assistant/

backend/
│
├── app/
│   ├── api/
│   ├── core/
│   ├── services/
│   ├── models/
│   ├── utils/
│   └── main.py
│
├── knowledge_base/
│
├── chroma_db/
│
├── scripts/
│
├── tests/
│
├── requirements.txt
│
└── .env

frontend/

reports/
```

Folders should only be created when required.

---

# Backend Modules

## app/api/

Responsible for REST endpoints.

Example:

* POST /chat
* POST /ingest
* GET /health

No business logic should exist here.

---

## app/services/

Contains application logic.

Examples:

* PDF processing
* Chunking
* Embedding generation
* Retrieval
* Prompt construction
* Gemini communication

---

## app/core/

Contains:

* Configuration
* Environment loading
* Gemini initialization
* Chroma initialization

---

## app/models/

Contains Pydantic request and response models.

Example:

ChatRequest

ChatResponse

HealthResponse

---

## app/utils/

Contains helper functions.

Examples:

* Logging
* File utilities
* Text preprocessing
* Constants

---

# Frontend Architecture

```text
Next.js

│

├── app/

├── components/

├── lib/

├── hooks/

└── public/
```

The frontend communicates only with FastAPI.

It never communicates directly with Gemini.

---

# Knowledge Base

Current knowledge base consists of seven PDF documents.

```text
knowledge_base/

01_company_profile.pdf

02_employee_handbook.pdf

03_leave_policy.pdf

04_work_from_home_policy.pdf

05_it_security_policy.pdf

06_employee_benefits.pdf

07_faq.pdf
```

No additional documents are required.

---

# Chunking Strategy

The application should split documents into semantic chunks.

Guidelines:

* Preserve paragraph boundaries when possible.
* Avoid splitting in the middle of sentences.
* Include slight overlap between adjacent chunks.
* Balance retrieval quality and context length.

Choose sensible default chunk size and overlap.

---

# Embedding Strategy

Embedding Model

Gemini Embedding API

Requirements:

* Embed every chunk.
* Store embeddings only once.
* Associate metadata with each chunk.

Metadata should include:

* Source PDF
* Chunk ID
* Page Number (if available)

---

# Vector Database

Database:

ChromaDB

Purpose:

Store

* embeddings
* chunk text
* metadata

The vector database should be persistent.

Data should survive application restarts.

---

# Retrieval Strategy

When a user asks a question:

1. Generate embedding.

2. Perform semantic similarity search.

3. Retrieve Top-K chunks.

4. Merge retrieved context.

5. Send context to Gemini.

Never answer without retrieval.

---

# Prompt Strategy

Prompt template should instruct Gemini to:

Answer using only the retrieved context.

If information is missing:

Reply that the answer is unavailable in the provided documents.

Do not fabricate company policies.

---

# API Endpoints

## POST /ingest

Purpose

Index all PDFs.

Returns

Success status

Indexed document count

Indexed chunk count

---

## POST /chat

Input

Question

Output

Answer

Referenced source documents

---

## GET /health

Returns

Application status

Gemini connection status

Vector database status

---

# Error Handling

The application should gracefully handle:

* Missing PDFs
* Empty knowledge base
* Invalid API key
* Gemini API failures
* Vector database failures
* Empty retrieval results

Return meaningful error messages.

---

# Logging

Log important events.

Examples:

* Document ingestion
* Embedding generation
* Retrieval time
* API requests
* Errors

Avoid excessive logging.

---

# Security

This project is internal.

Authentication is intentionally excluded.

Do not implement:

* Login
* JWT
* OAuth
* RBAC

---

# Performance

Optimize for clarity.

Not maximum throughput.

Small document collection.

Single-user development environment.

---

# Coding Principles

Follow SOLID where practical.

Prefer composition over inheritance.

Avoid unnecessary abstractions.

Write modular code.

Small functions.

Clear names.

Good comments.

Readable structure.

---

# Deployment

Frontend

Next.js

↓

Vercel

Backend

FastAPI

↓

Render

Environment variables should be configured during deployment.

---

# Future Enhancements

Not part of Version 1.

Possible future additions:

* PDF upload
* Authentication
* Conversation history
* Reranking
* Hybrid search
* Prompt injection protection
* Evaluation metrics
* Streaming responses
* Citation highlighting
* Admin dashboard

---

# Architecture Rules

Always follow these principles:

* Retrieval before generation.
* One responsibility per module.
* Modular backend.
* Thin API layer.
* Persistent vector database.
* Minimal dependencies.
* Clean separation of concerns.
* Build incrementally.
* Never rewrite completed modules unless necessary.
