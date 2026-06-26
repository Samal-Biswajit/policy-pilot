"use client";

import { useState, useEffect, useCallback } from "react";
import { checkHealth } from "@/lib/api";

/**
 * Polls the /health endpoint every 30 seconds
 * and exposes whether the backend is connected.
 */
export function useHealth() {
  const [isConnected, setIsConnected] = useState(false);

  const poll = useCallback(async () => {
    try {
      const data = await checkHealth();
      setIsConnected(data.status === "healthy");
    } catch {
      setIsConnected(false);
    }
  }, []);

  useEffect(() => {
    poll(); // initial check
    const interval = setInterval(poll, 30_000);
    return () => clearInterval(interval);
  }, [poll]);

  return { isConnected };
}
