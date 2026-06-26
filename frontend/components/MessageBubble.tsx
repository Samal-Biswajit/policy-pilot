"use client";

import { Message } from "@/types";
import SourceBadge from "./SourceBadge";
import { AlertCircle, User, BotMessageSquare } from "lucide-react";

interface MessageBubbleProps {
  message: Message;
}

export default function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.role === "user";

  return (
    <div
      className={`flex items-start gap-3 animate-fade-in ${
        isUser ? "flex-row-reverse" : ""
      }`}
    >
      {/* Avatar — Square badge, not circle */}
      <div
        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border-2 border-black font-mono text-xs font-bold ${
          isUser
            ? "bg-yellow text-black"
            : "bg-white text-black"
        }`}
        style={{ boxShadow: "2px 2px 0 0 var(--color-black)" }}
      >
        {isUser ? <User size={16} /> : <BotMessageSquare size={16} />}
      </div>

      {/* Message Card */}
      <div
        className={`max-w-[80%] space-y-2.5 rounded-[var(--radius-brutal)] border-3 px-4 py-3 text-[0.9375rem] leading-relaxed sm:max-w-[70%] ${
          isUser
            ? "border-black bg-yellow text-black font-semibold"
            : message.isError
            ? "border-black bg-pink text-black"
            : "border-black bg-white text-black"
        }`}
        style={{ boxShadow: "4px 4px 0 0 var(--color-black)" }}
      >
        {/* Error icon */}
        {message.isError && (
          <div className="flex items-center gap-1.5 text-xs font-bold text-pink-dark">
            <AlertCircle size={14} />
            ERROR
          </div>
        )}

        {/* Message text — preserve line breaks and prevent overflow */}
        <div className="whitespace-pre-wrap break-words">{message.content}</div>

        {/* Source badges */}
        {message.sources && message.sources.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-1">
            {message.sources.map((src) => (
              <SourceBadge key={src} filename={src} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
