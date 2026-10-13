import type { Stats } from "@/lib/sheets";

export default function Progress({ stats, goal }: { stats: Stats; goal: number }) {
  const pct = Math.min(100, Math.round((stats.totalGuests / goal) * 100));
  return (
    <section aria-labelledby="progress" className="rounded-3xl bg-white p-6 shadow-soft sm:p-8">
      <h2 id="progress" className="text-xl font-extrabold">Who is joining us</h2>
      {!stats.configured ? (
        <p className="mt-3 text-plum-dark/70">Live registration numbers will appear here once responses start coming in.</p>
      ) : (
        <>
          <div className="mt-5 flex items-end gap-8">
            <div>
              <div className="text-5xl font-extrabold tabular-nums">{stats.totalGuests}</div>
              <div className="text-sm text-plum-dark/70">guests confirmed (goal {goal})</div>
            </div>
            <div>
              <div className="text-3xl font-extrabold tabular-nums">{stats.attending}</div>
              <div className="text-sm text-plum-dark/70">RSVPs</div>
            </div>
          </div>
          <div className="mt-5 h-3 overflow-hidden rounded-full bg-plum/10" role="progressbar"
               aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100}>
            <div className="h-full rounded-full bg-gradient-to-r from-plum to-aqua transition-[width] duration-700" style={{ width: `${pct}%` }} />
          </div>
          {stats.countries.length > 0 && (
            <div className="mt-5 flex flex-wrap gap-2">
              {stats.countries.map((c) => (
                <span key={c} className="rounded-full bg-aqua-mist px-3 py-1 text-xs font-semibold text-plum-deep">{c}</span>
              ))}
            </div>
          )}
        </>
      )}
    </section>
  );
}
