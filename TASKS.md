# TASKS.md

# Enterprise Knowledge Assistant

## Development Execution Plan

---

# Objective

Develop a complete Retrieval-Augmented Generation (RAG) chatbot incrementally.

Every milestone must be fully completed and tested before moving to the next.

Do not skip milestones.

Do not implement future milestones early.

---

# Development Rules

## General Rules

* Complete only one milestone at a time.
* Keep commits small and focused.
* Do not rewrite completed modules.
* Do not introduce unnecessary libraries.
* Follow AI_CONTEXT.md.
* Follow ARCHITECTURE.md.
* Keep the code modular.
* Prioritize readability over optimization.

---

# Milestone 1

## Document Ingestion Pipeline

### Goal

Create a complete ingestion pipeline that converts PDF documents into searchable vector embeddings.

---

### Tasks

* Create backend application structure.
* Configure FastAPI project.
* Configure environment variable loading.
* Read all PDFs from `backend/knowledge_base`.
* Extract text using PyMuPDF.
* Clean extracted text.
* Split documents into semantic chunks.
* Generate embeddings using Gemini Embedding API.
* Store embeddings inside ChromaDB.
* Save metadata for every chunk.
* Prevent duplicate indexing.
* Create logging for ingestion.

---

### Deliverables

* Working ingestion script.
* Persistent ChromaDB database.
* Successfully indexed seven PDF documents.
* Console output showing:

  * Number of documents
  * Number of chunks
  * Success message

---

### Definition of Done

Milestone is complete when:

* All PDFs are indexed.
* ChromaDB contains vectors.
* No ingestion errors occur.
* Re-running ingestion does not duplicate data.

---

# Milestone 2

## Retrieval API

### Goal

Build a backend API capable of retrieving relevant document chunks.

---

### Tasks

* Initialize ChromaDB.
* Load embeddings.
* Accept user questions.
* Generate question embeddings.
* Perform semantic similarity search.
* Retrieve Top-K chunks.
* Build prompt.
* Send prompt to Gemini.
* Return generated answer.

---

### API Endpoints

POST /chat

GET /health

---

### Deliverables

Working FastAPI backend.

Swagger UI functional.

Backend answers questions correctly.

---

### Definition of Done

Questions from the company PDFs return accurate answers.

If information is unavailable:

Return an appropriate message instead of hallucinating.

---

# Milestone 3

## Frontend

### Goal

Create a clean Next.js chat interface.

---

### Tasks

* Create chat page.
* Build reusable chat components.
* Create message bubbles.
* Connect frontend to FastAPI.
* Display responses.
* Display loading indicator.
* Display error state.
* Make layout responsive.

---

### Deliverables

Functional chat interface.

Users can ask questions.

Responses appear correctly.

---

### Definition of Done

Frontend communicates successfully with backend.

---

# Milestone 4

## User Experience Improvements

### Goal

Improve usability.

---

### Tasks

* Show source document names.
* Improve prompt template.
* Improve response formatting.
* Display timestamps.
* Auto-scroll chat.
* Improve loading animation.
* Improve error messages.

---

### Deliverables

Professional user experience.

---

### Definition of Done

Chat experience feels polished.

---

# Milestone 5

## Deployment

### Goal

Deploy application.

---

### Backend

Deploy FastAPI.

Preferred platform:

Render

---

### Frontend

Deploy Next.js.

Preferred platform:

Vercel

---

### Tasks

* Configure environment variables.
* Verify API communication.
* Fix deployment issues.

---

### Deliverables

Publicly accessible application.

---

### Definition of Done

Application works online.

---

# Milestone 6

## Documentation

### Goal

Prepare project documentation.

---

### Tasks

Generate:

README.md

Architecture Diagram

Flow Diagram

Installation Guide

Project Report

Screenshots

Deployment Instructions

Future Scope

---

### Deliverables

Complete documentation.

---

### Definition of Done

Project is ready for submission.

---

# Coding Standards

Every module should satisfy:

* Single Responsibility Principle.
* Clear function names.
* Type hints where appropriate.
* Proper exception handling.
* Minimal dependencies.
* Good comments.
* Small functions.
* Consistent formatting.

---

# Quality Checklist

Before completing every milestone verify:

* Code runs successfully.
* No unnecessary files created.
* No dead code.
* No duplicate logic.
* No hardcoded secrets.
* No placeholder implementations.
* No fake functionality.

---

# AI Instructions

When completing a milestone:

1. Read AI_CONTEXT.md.
2. Read ARCHITECTURE.md.
3. Read TASKS.md.
4. Implement only the requested milestone.
5. Explain important implementation decisions.
6. Stop after the milestone is complete.
7. Wait for the next instruction.

Never begin the next milestone automatically.

---

# Expected Final Result

The completed application should provide:

* PDF ingestion
* Text chunking
* Embedding generation
* ChromaDB vector storage
* Semantic retrieval
* Gemini-powered responses
* FastAPI backend
* Next.js frontend
* Deployable architecture
* Clean, modular codebase

The application should demonstrate a genuine Retrieval-Augmented Generation pipeline suitable for an academic project while remaining simple, maintainable, and easy to understand.
