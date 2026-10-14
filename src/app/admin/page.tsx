import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { event } from "@/config/event";
import { getStats } from "@/lib/sheets";
import Progress from "@/components/Progress";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Admin", robots: { index: false, follow: false } };

// Private view: open /admin?key=YOUR_ADMIN_KEY (set ADMIN_KEY in Vercel > Settings > Environment Variables)
export default async function Admin({ searchParams }: { searchParams: { key?: string } }) {
  const key = process.env.ADMIN_KEY;
  if (!key || searchParams.key !== key) notFound();
  const stats = await getStats(true);
  return (
    <main className="mx-auto max-w-2xl space-y-6 px-5 py-10 pb-[calc(6rem+env(safe-area-inset-bottom))]">
      <h1 className="text-2xl font-extrabold">Admin: registration</h1>
      <p className="text-sm text-plum-dark/70">
        Private view. The public page shows the guest counter only after {event.showCounterAfter} guests are confirmed.
      </p>
      <Progress stats={stats} goal={event.guestGoal} title="All responses" />
      <div className="rounded-3xl bg-white p-6 shadow-soft">
        <p className="font-semibold">Declined: {stats.declined}</p>
        {stats.error && <p className="mt-2 text-sm text-red-600">Error: {stats.error}</p>}
      </div>
    </main>
  );
}
