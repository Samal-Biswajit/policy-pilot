import { ChatRequest, ChatResponse, HealthResponse } from "@/types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

/**
 * Sends a question to the backend /chat endpoint.
 */
export async function sendChatMessage(question: string): Promise<ChatResponse> {
  const body: ChatRequest = { question };

  const response = await fetch(`${API_BASE_URL}/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (response.status === 429) {
    throw new Error("Rate limit exceeded. Please wait a moment and try again.");
  }

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    throw new Error(
      errorData?.detail || `Server error (${response.status})`
    );
  }

  return response.json();
}

/**
 * Checks backend health via /health endpoint.
 */
export async function checkHealth(): Promise<HealthResponse> {
  const response = await fetch(`${API_BASE_URL}/health`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  if (!response.ok) {
    throw new Error("Backend health check failed.");
  }

  return response.json();
}
