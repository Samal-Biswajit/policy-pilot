# API Documentation

The Policy Pilot backend provides a RESTful API built with FastAPI. All endpoints accept and return JSON payloads.

---

## 1. Health Check

Verifies the operational status of the backend, the vector database, and the Gemini API.

**Endpoint:** `GET /health`

### Response
- **Status Code:** `200 OK`

```json
{
  "status": "healthy",
  "vector_database": "connected",
  "gemini": "connected"
}
```

### Error Cases
If a service is unreachable, the overall status will reflect it, though it will still return a `200 OK` so the frontend can display the degraded state gracefully.
```json
{
  "status": "unhealthy",
  "vector_database": "disconnected",
  "gemini": "connected"
}
```

---

## 2. Chat

Processes a user question, retrieves relevant context from the knowledge base, and returns an AI-generated answer.

**Endpoint:** `POST /chat`

### Request

```json
{
  "question": "What is the policy for working from home?"
}
```

### Response
- **Status Code:** `200 OK`

```json
{
  "answer": "Employees are permitted to work from home up to two days a week, subject to manager approval.",
  "sources": [
    "04_work_from_home_policy.pdf (Page 2)",
    "02_employee_handbook.pdf (Page 15)"
  ],
  "retrieved_chunks": 4
}
```

### Error Cases

**Empty Question**
- **Status Code:** `400 Bad Request`
```json
{
  "detail": "Question cannot be empty."
}
```

**Rate Limiting / Quota Exceeded**
- **Status Code:** `429 Too Many Requests`
```json
{
  "detail": "API rate limit exceeded. Please try again later."
}
```

**Internal Server Error**
- **Status Code:** `500 Internal Server Error`
```json
{
  "detail": "Error generating answer with Gemini: [upstream error details]"
}
```
