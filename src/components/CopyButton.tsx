"use client";
import { useState } from "react";

export default function CopyButton({ text, label = "Copy" }: { text: string; label?: string }) {
  const [done, setDone] = useState(false);
  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
      setDone(true);
      setTimeout(() => setDone(false), 2000);
    } catch {
      /* clipboard unavailable: the number is visible, user can copy manually */
    }
  }
  return (
    <button
      type="button"
      onClick={copy}
      className="rounded-full border border-white/40 px-4 py-1.5 text-sm font-semibold text-white transition hover:bg-white/15"
    >
      {done ? "Copied" : label}
    </button>
  );
}
