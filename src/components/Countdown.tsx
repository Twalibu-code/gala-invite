"use client";
import { useEffect, useState } from "react";

export default function Countdown({ target, label = "Starts in" }: { target: string; label?: string }) {
  const [ms, setMs] = useState<number | null>(null);
  useEffect(() => {
    const t = new Date(target).getTime();
    const tick = () => setMs(t - Date.now());
    tick();
    const id = setInterval(tick, 30_000);
    return () => clearInterval(id);
  }, [target]);

  if (ms === null || ms <= 0) return null;
  const parts: [number, string][] = [
    [Math.floor(ms / 864e5), "days"],
    [Math.floor((ms % 864e5) / 36e5), "hours"],
    [Math.floor((ms % 36e5) / 6e4), "min"],
  ];

  return (
    <div className="mt-8">
      <div className="flex items-center justify-center text-lg font-extralight tracking-widest">{label}</div>
      <div className="grid max-w-3xl grid-cols-3 gap-3" aria-label="Time until the event">
        {parts.map(([n, l]) => (
          <div key={l} className="rounded-2xl border border-white/25 bg-white/10 py-3 text-center backdrop-blur">
            <div className="text-4xl font-extrabold tabular-nums text-white">{n}</div>
            <div className="text-xs text-white/80">{l}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
