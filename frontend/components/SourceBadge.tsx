"use client";

import { FileText } from "lucide-react";

interface SourceBadgeProps {
  filename: string;
}

export default function SourceBadge({ filename }: SourceBadgeProps) {
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-lg border-2 border-black bg-cyan px-2.5 py-1 font-mono text-xs font-bold text-black transition-all brutal-hover cursor-default"
      style={{ boxShadow: "3px 3px 0 0 var(--color-black)" }}
    >
      <FileText size={12} />
      {filename}
    </span>
  );
}
