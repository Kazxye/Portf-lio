"use client";

import { useEffect, useRef, useState } from "react";
import { log } from "@/lib/log";

type Status = "idle" | "copied" | "failed";

const MESSAGES: Record<Exclude<Status, "idle">, string> = {
  copied: "> email copied",
  failed: "> copy failed, use the link above",
};

export function CopyEmailButton({ email }: { email: string }) {
  const [status, setStatus] = useState<Status>("idle");
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const copy = async () => {
    window.clearTimeout(timer.current);
    try {
      // Clipboard API needs a secure context (https or localhost) and user activation.
      if (!navigator.clipboard) throw new Error("clipboard-unavailable");
      await navigator.clipboard.writeText(email);
      setStatus("copied");
    } catch (error) {
      log("warn", "CopyEmailButton", "copy-failed", { error: error instanceof Error ? error.message : String(error) });
      setStatus("failed");
    }
    timer.current = window.setTimeout(() => setStatus("idle"), 2400);
  };

  return (
    <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
      <button
        type="button"
        onClick={copy}
        className="inline-flex h-11 items-center rounded-[2px] border border-line px-5 text-sm font-medium transition-colors duration-200 hover:border-fg"
      >
        Copy email
      </button>
      {/* Announced to screen readers; visible as a short terminal-style line. */}
      <p role="status" aria-live="polite" className="text-label text-accent">
        {status === "idle" ? "" : MESSAGES[status]}
      </p>
    </div>
  );
}
