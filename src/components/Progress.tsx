import type { Stats } from "@/lib/sheets";

type Props = {
  stats: Stats;
  goal: number;
  title?: string;
  hideCountries?: string[]; // e.g. ["Tanzania"] on the public page
};

export default function Progress({ stats, goal, title = "Who is joining us", hideCountries = [] }: Props) {
  const pct = Math.min(100, Math.round((stats.totalGuests / goal) * 100));
  const hidden = hideCountries.map((c) => c.toLowerCase());
  const countries = stats.countries.filter((c) => !hidden.includes(c.toLowerCase()));
  const rsvps = `${stats.attending} ${stats.attending === 1 ? "RSVP" : "RSVPs"}`;
  const guests = `${stats.totalGuests} ${stats.totalGuests === 1 ? "guest" : "guests"}`;

  return (
    <section aria-labelledby="progress" className="rounded-3xl bg-white p-6 shadow-soft sm:p-8">
      <div className="flex items-baseline justify-between gap-3">
        <h2 id="progress" className="text-xl font-extrabold">{title}</h2>
        <p className="text-sm text-plum-dark/60">(Goal {goal})</p>
      </div>
      {!stats.configured ? (
        <p className="mt-3 text-plum-dark/70">Live registration numbers will appear here once responses start coming in.</p>
      ) : (
        <>
          <p className="mt-4 text-3xl font-extrabold tabular-nums">{rsvps} · {guests}</p>
          <div className="mt-4 h-3 overflow-hidden rounded-full bg-plum/10" role="progressbar"
               aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100}>
            <div className="h-full rounded-full bg-gradient-to-r from-plum to-aqua transition-[width] duration-700" style={{ width: `${pct}%` }} />
          </div>
          {countries.length > 0 && (
            <div className="mt-5 flex flex-wrap gap-2">
              {countries.map((c) => (
                <span key={c} className="rounded-full bg-aqua-mist px-3 py-1 text-xs font-semibold text-plum-deep">{c}</span>
              ))}
            </div>
          )}
        </>
      )}
    </section>
  );
}
