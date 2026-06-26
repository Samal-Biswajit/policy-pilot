"use client";

interface ConnectionStatusProps {
  isConnected: boolean;
}

export default function ConnectionStatus({ isConnected }: ConnectionStatusProps) {
  return (
    <div
      className={`inline-flex items-center gap-2 rounded-[var(--radius-brutal)] brutal-border px-3 py-1.5 font-mono text-xs font-bold tracking-wide transition-all brutal-hover ${
        isConnected
          ? "bg-green text-black"
          : "bg-pink text-black"
      }`}
      style={{ boxShadow: "3px 3px 0 0 var(--color-black)" }}
    >
      <span
        className={`h-2 w-2 rounded-full ${
          isConnected ? "bg-green-dark" : "bg-pink-dark"
        }`}
      />
      {isConnected ? "ONLINE" : "OFFLINE"}
    </div>
  );
}
