"use client";

import { useChat } from "@/hooks/useChat";
import { useHealth } from "@/hooks/useHealth";
import Header from "./Header";
import MessageList from "./MessageList";
import ChatInput from "./ChatInput";
import EmptyState from "./EmptyState";
import ErrorBanner from "./ErrorBanner";

export default function ChatContainer() {
  const { messages, isLoading, error, send, clearError } = useChat();
  const { isConnected } = useHealth();

  return (
    <div className="flex h-screen flex-col bg-[var(--color-bg)]">
      <Header isConnected={isConnected} />

      {/* Error banner */}
      {error && <ErrorBanner message={error} onDismiss={clearError} />}

      {/* Chat body */}
      {messages.length === 0 && !isLoading ? (
        <EmptyState onSuggestionClick={send} />
      ) : (
        <MessageList messages={messages} isLoading={isLoading} />
      )}

      {/* Input */}
      <ChatInput onSend={send} isLoading={isLoading} />
    </div>
  );
}
