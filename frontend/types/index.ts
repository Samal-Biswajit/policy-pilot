// ---- API Types ----

export interface ChatRequest {
  question: string;
}

export interface ChatResponse {
  answer: string;
  sources: string[];
  retrieved_chunks: number;
}

export interface HealthResponse {
  status: string;
  vector_database: string;
  gemini: string;
}

// ---- UI Types ----

export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  sources?: string[];
  retrieved_chunks?: number;
  isError?: boolean;
  timestamp: Date;
}
