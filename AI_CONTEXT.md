# AI_CONTEXT.md

# Enterprise Knowledge Assistant

## Purpose

This document is the primary source of context for AI coding assistants (Antigravity, Claude Code, Cursor, etc.). Before generating or modifying any code, read this document completely and follow all constraints described here.

---

# Project Overview

Project Name:

Enterprise Knowledge Assistant

Project Type:

Retrieval-Augmented Generation (RAG) Chatbot

Purpose:

Develop a working enterprise RAG chatbot that answers employee questions using internal company documents rather than relying solely on the LLM's knowledge.

This is a college project intended to demonstrate a real RAG pipeline, not a production-grade enterprise application.

---

# Primary Goal

Build a complete but minimal RAG application that demonstrates:

* Document ingestion
* PDF parsing
* Text chunking
* Embedding generation
* Vector database indexing
* Semantic retrieval
* LLM-based answer generation
* Modern web interface

The project should prioritize simplicity, reliability, maintainability, and correctness over feature richness.

---

# Project Constraints

This project has strict constraints.

* Build incrementally.
* Never generate the entire application in one response.
* Complete one milestone before moving to the next.
* Avoid unnecessary abstractions.
* Keep the codebase beginner-friendly.
* Prefer readability over cleverness.
* Avoid overengineering.

---

# Current Project Structure

Enterprise-Knowledge-Assistant/

backend/

knowledge_base/

frontend/

reports/

The remaining folders should be generated only when required.

---

# Knowledge Base

The backend already contains the following PDF documents.

knowledge_base/

01_company_profile.pdf

02_employee_handbook.pdf

03_leave_policy.pdf

04_work_from_home_policy.pdf

05_it_security_policy.pdf

06_employee_benefits.pdf

07_faq.pdf

These documents together form the enterprise knowledge base.

Do not regenerate them.

Assume they already exist.

---

# Fictional Company

Company Name:

TechNova Solutions Pvt. Ltd.

Industry:

Software Development

Artificial Intelligence

Cloud Solutions

Employees:

Approximately 420

Work Model:

Hybrid

Office Hours:

9:30 AM – 6:30 PM

Headquarters:

Bengaluru, India

---

# Expected RAG Capabilities

The chatbot should answer questions like:

* How many sick leaves are allowed?
* Can I carry forward earned leave?
* Is VPN mandatory?
* Can I use my personal laptop?
* What is the learning budget?
* How do I report phishing emails?
* What benefits are available?
* What are the office hours?
* How many office days are mandatory?
* Can I claim travel expenses?

Answers must come from retrieved document context.

---

# Technical Stack (LOCKED)

Do not replace these technologies unless explicitly instructed.

Frontend

Next.js

Backend

FastAPI

Programming Language

Python

LLM

Gemini 2.5 Flash

Embedding Model

Gemini Embedding API

Vector Database

ChromaDB

PDF Loader

PyMuPDF (fitz)

Environment Variables

python-dotenv

Validation

Pydantic

HTTP Client

httpx

Deployment

Frontend → Vercel

Backend → Render

---

# Technologies That Must NOT Be Used

Unless explicitly requested.

Do NOT introduce:

LangChain

LlamaIndex

Haystack

Pinecone

FAISS

Weaviate

Milvus

Redis Vector

ElasticSearch

Complex Agent Frameworks

Do not replace ChromaDB.

Do not replace Gemini.

---

# RAG Philosophy

Implement a genuine Retrieval-Augmented Generation pipeline.

Required flow:

User Question

↓

Embedding Generation

↓

Semantic Similarity Search

↓

Retrieve Top Relevant Chunks

↓

Construct Prompt

↓

Gemini

↓

Final Answer

Never fake retrieval.

Never bypass the vector database.

---

# Hallucination Policy

The assistant should minimize hallucinations.

Prompt the LLM to:

* Answer only from retrieved context.
* If sufficient information is unavailable, clearly state that the answer is not present in the provided documents.
* Avoid inventing policies or company information.

---

# Retrieval Guidelines

Documents should be:

Loaded

↓

Chunked

↓

Embedded

↓

Stored in ChromaDB

Each chunk should preserve useful context.

Do not create excessively small chunks.

Do not create excessively large chunks.

Choose sensible defaults.

---

# Coding Style

Write production-quality but beginner-friendly code.

Requirements:

* Modular architecture
* Clear variable names
* Good comments
* Type hints where appropriate
* Proper error handling
* Small focused functions
* Minimal nesting

Avoid unnecessary design patterns.

---

# API Design

The backend should expose REST APIs.

Prefer simple endpoints.

Example:

POST /chat

POST /ingest

GET /health

The exact implementation may evolve.

---

# Frontend

Use Next.js.

Build a clean, minimal chat interface.

Requirements:

* Chat window
* User input
* Streaming or standard responses
* Loading indicator
* Error state
* Responsive design

Avoid unnecessary animations.

---

# UI Principles

Simple

Professional

Minimal

Fast

Readable

Not flashy.

---

# Evaluation

The chatbot should correctly answer questions derived from the provided PDFs.

The FAQ document can also be used for testing.

No complex automated evaluation framework is required.

---

# Security

Basic security practices only.

Do not implement authentication.

Do not implement user accounts.

Do not implement role management.

Prompt injection protection can be noted as future work but is not required in the initial implementation.

---

# Out of Scope

The following are intentionally excluded:

Authentication

Authorization

Admin Dashboard

PDF Upload

Multi-user Support

Conversation Memory Across Sessions

Analytics Dashboard

Fine-tuning Models

Hybrid Search

Reranking

Advanced Evaluation Pipelines

---

# AI Coding Instructions

When writing code:

* Prefer maintainability over cleverness.
* Explain architectural decisions briefly.
* Keep dependencies minimal.
* Avoid changing previously implemented modules unless necessary.
* Never rewrite the whole project if only one module is requested.
* Build incrementally.
* Follow the milestones defined in TASKS.md.
* Follow the architecture defined in ARCHITECTURE.md.

---

# Development Workflow

Always assume this workflow.

1. Complete current milestone.
2. Verify functionality.
3. Fix bugs.
4. Commit stable implementation.
5. Proceed to next milestone.

Never skip milestones.

---

# Success Criteria

The project is considered successful if:

* PDFs are successfully ingested.
* ChromaDB stores document embeddings.
* Relevant chunks are retrieved.
* Gemini answers using retrieved context.
* Users can interact through the web interface.
* The application can be deployed.
* The codebase remains modular and understandable.

---

# Final Instruction

Treat this project as a clean, modular implementation of a minimal enterprise RAG system.

Do not overengineer.

Do not introduce unnecessary frameworks.

Prefer simplicity, correctness, and incremental development over feature quantity.
