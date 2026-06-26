"use client";

import { useState, useRef, KeyboardEvent } from "react";
import { SendHorizontal } from "lucide-react";

interface ChatInputProps {
  onSend: (message: string) => void;
  isLoading: boolean;
}

export default function ChatInput({ onSend, isLoading }: ChatInputProps) {
  const [value, setValue] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSend = () => {
    const trimmed = value.trim();
    if (!trimmed || isLoading) return;
    onSend(trimmed);
    setValue("");
    // Reset height
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Auto-resize textarea
  const handleInput = () => {
    const el = textareaRef.current;
    if (el) {
      el.style.height = "auto";
      el.style.height = `${Math.min(el.scrollHeight, 160)}px`;
    }
  };

  return (
    <div className="border-t-3 border-black bg-white">
      <div className="mx-auto flex max-w-3xl items-end gap-3 px-4 py-4 sm:px-6">
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            handleInput();
          }}
          onKeyDown={handleKeyDown}
          placeholder="Ask a question about company policies..."
          rows={1}
          className="flex-1 resize-none rounded-[var(--radius-brutal)] border-3 border-black bg-white px-4 py-3 text-sm text-black placeholder-black/40 outline-none transition-all focus:bg-yellow/10 focus:shadow-[4px_4px_0_0_var(--color-yellow-dark)]"
          style={{ boxShadow: "4px 4px 0 0 var(--color-black)" }}
          aria-label="Type your question"
        />
        <button
          onClick={handleSend}
          disabled={!value.trim() || isLoading}
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[var(--radius-brutal)] border-3 border-black bg-yellow text-black transition-all brutal-hover disabled:cursor-not-allowed disabled:opacity-40"
          style={{ boxShadow: "4px 4px 0 0 var(--color-black)" }}
          aria-label="Send message"
        >
          <SendHorizontal size={20} />
        </button>
      </div>
    </div>
  );
}
