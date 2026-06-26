"use client";

import { AlertCircle, X } from "lucide-react";

interface ErrorBannerProps {
  message: string;
  onDismiss: () => void;
}

export default function ErrorBanner({ message, onDismiss }: ErrorBannerProps) {
  return (
    <div className="mx-auto max-w-4xl px-4 pt-4 sm:px-6 animate-slide-up">
      <div
        className="flex items-center gap-3 rounded-[var(--radius-brutal)] border-3 border-black bg-pink px-4 py-3 text-sm font-semibold text-black"
        style={{ boxShadow: "4px 4px 0 0 var(--color-black)" }}
      >
        <AlertCircle size={18} className="shrink-0" />
        <span className="flex-1">{message}</span>
        <button
          onClick={onDismiss}
          className="flex h-7 w-7 items-center justify-center rounded-lg border-2 border-black bg-white transition-all hover:-translate-y-0.5 active:translate-y-0"
          aria-label="Dismiss error"
        >
          <X size={14} />
        </button>
      </div>
    </div>
  );
}
