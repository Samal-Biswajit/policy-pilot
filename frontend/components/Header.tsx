"use client";

import ConnectionStatus from "./ConnectionStatus";
import { Zap, Triangle, Square } from "lucide-react";

interface HeaderProps {
  isConnected: boolean;
}

export default function Header({ isConnected }: HeaderProps) {
  return (
    <header className="relative z-20 border-b-3 border-black bg-white">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4 sm:px-8">
        {/* Left — Branding */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Icon badge */}
          <div
            className="flex h-9 w-9 sm:h-11 sm:w-11 items-center justify-center rounded-lg border-2 sm:border-3 border-black bg-yellow"
            style={{ boxShadow: "3px 3px 0 0 var(--color-black)" }}
          >
            <Zap className="h-5 w-5 sm:h-6 sm:w-6 text-black" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base font-bold tracking-tight text-black sm:text-xl">
                Policy Pilot
              </h1>
              {/* Decorative yellow accent block */}
              <div className="hidden h-3 w-3 rotate-12 rounded-sm border-2 border-black bg-yellow sm:block" />
            </div>
            <p className="hidden text-xs text-black/60 sm:block">
              <span className="font-handwritten text-sm text-pink-dark">RAG-powered</span>
              {" · "}TechNova Solutions
            </p>
          </div>
        </div>

        {/* Right — Connection Status */}
        <ConnectionStatus isConnected={isConnected} />

        {/* Decorative floating shapes */}
        <div className="pointer-events-none absolute right-[20%] top-2 hidden lg:block">
          <Triangle size={12} className="rotate-12 text-cyan opacity-40" fill="currentColor" />
        </div>
        <div className="pointer-events-none absolute left-[60%] bottom-1 hidden lg:block">
          <Square size={10} className="-rotate-6 text-pink opacity-30" fill="currentColor" />
        </div>
      </div>
    </header>
  );
}
