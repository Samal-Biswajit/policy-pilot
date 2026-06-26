"use client";

export default function TypingIndicator() {
  return (
    <div className="flex items-start gap-3 animate-fade-in">
      {/* Avatar — matches assistant style */}
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border-2 border-black bg-white font-mono text-xs font-bold text-black"
        style={{ boxShadow: "2px 2px 0 0 var(--color-black)" }}
      >
        AI
      </div>

      {/* Dots card — brutalist style */}
      <div
        className="rounded-[var(--radius-brutal)] border-2 border-black bg-white px-5 py-3.5"
        style={{ boxShadow: "3px 3px 0 0 var(--color-black)" }}
      >
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-black animate-dot-bounce" />
          <span className="h-2.5 w-2.5 rounded-full bg-black animate-dot-bounce [animation-delay:0.16s]" />
          <span className="h-2.5 w-2.5 rounded-full bg-black animate-dot-bounce [animation-delay:0.32s]" />
        </div>
      </div>
    </div>
  );
}
