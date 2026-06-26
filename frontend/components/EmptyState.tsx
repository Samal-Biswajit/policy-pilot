"use client";

import { Sparkles, Circle, Triangle, Square, Star } from "lucide-react";

const SUGGESTIONS = [
  { text: "How many sick leaves are allowed?", color: "bg-yellow" },
  { text: "Is VPN mandatory?", color: "bg-cyan" },
  { text: "What is the learning budget?", color: "bg-pink" },
  { text: "Can I work remotely every day?", color: "bg-green" },
];

interface EmptyStateProps {
  onSuggestionClick: (question: string) => void;
}

export default function EmptyState({ onSuggestionClick }: EmptyStateProps) {
  return (
    <div className="flex flex-1 items-center justify-center px-4 py-10 animate-fade-in">
      <div className="relative w-full max-w-2xl">
        {/* Decorative shapes — asymmetric, playful */}
        <div className="pointer-events-none absolute -left-6 -top-8 hidden md:block animate-float">
          <div
            className="h-8 w-8 rotate-12 rounded-md border-3 border-black bg-yellow"
            style={{ boxShadow: "3px 3px 0 0 var(--color-black)" }}
          />
        </div>
        <div className="pointer-events-none absolute -right-4 top-4 hidden md:block animate-float [animation-delay:1s]">
          <div
            className="h-6 w-6 -rotate-6 rounded-full border-3 border-black bg-pink"
            style={{ boxShadow: "2px 2px 0 0 var(--color-black)" }}
          />
        </div>
        <div className="pointer-events-none absolute -bottom-4 left-16 hidden md:block animate-float [animation-delay:2s]">
          <div
            className="h-5 w-5 rotate-45 border-3 border-black bg-cyan"
            style={{ boxShadow: "2px 2px 0 0 var(--color-black)" }}
          />
        </div>

        {/* Hero content */}
        <div className="text-center">
          {/* Large heading */}
          <h2 className="text-3xl font-bold tracking-tight text-black sm:text-5xl lg:text-6xl">
            Enterprise
            <br />
            <span className="relative inline-block">
              Knowledge
              {/* Underline accent */}
              <span className="absolute -bottom-1 left-0 h-3 w-full -skew-x-3 bg-yellow opacity-60" />
            </span>
            <br />
            Assistant
          </h2>

          {/* Subheading */}
          <p className="mx-auto mt-6 max-w-md text-base text-black/70 sm:text-lg">
            A RAG chatbot that answers questions using TechNova&apos;s internal
            knowledge base.
          </p>

          {/* Handwritten accent */}
          <p className="font-handwritten mt-3 text-xl text-pink-dark sm:text-2xl">
            ask anything →
          </p>
        </div>

        {/* Suggestion cards — Brutalist grid */}
        <div className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {SUGGESTIONS.map((s, i) => (
            <button
              key={s.text}
              onClick={() => onSuggestionClick(s.text)}
              className={`group flex items-center gap-3 rounded-[var(--radius-brutal)] border-3 border-black ${s.color} px-4 py-4 text-left text-sm font-semibold text-black transition-all brutal-hover animate-slide-up`}
              style={{
                boxShadow: "4px 4px 0 0 var(--color-black)",
                animationDelay: `${i * 0.08}s`,
                animationFillMode: "both",
              }}
            >
              <Sparkles
                size={16}
                className="shrink-0 text-black/50 transition-transform group-hover:rotate-12 group-hover:text-black"
              />
              <span>{s.text}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
