import Image from "next/image";
import { event } from "@/config/event";
import { getStats } from "@/lib/sheets";
import { googleCalendarUrl, mapsUrl } from "@/lib/calendar";
import Countdown from "@/components/Countdown";
import Progress from "@/components/Progress";
import CopyButton from "@/components/CopyButton";
import ShareButton from "@/components/ShareButton";
import Icon from "@/components/Icon";

// Re-generate this page at most once a minute, so numbers follow the Google Sheet.
export const revalidate = 60;

const btn = "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 font-bold transition";

export default async function Home() {
  const stats = await getStats();
  const d = event.donation;
  // The public counter stays hidden until enough guests have confirmed (admin view: /admin).
  const showCounter = stats.configured && stats.totalGuests >= event.showCounterAfter;
  const details = [
    { icon: "calendar", k: "Date", v: event.dateLabel },
    { icon: "clock", k: "Time", v: event.timeLabel },
    { icon: "pin", k: "Venue", v: event.venue },
    { icon: "dress", k: "Dress code", v: event.dressCode },
  ] as const;

  return (
    <main>
      {/* HERO */}
      <header className="relative overflow-hidden bg-gradient-to-br from-plum-dark via-plum to-aqua-blue text-white">
        <div className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-aqua/40 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-32 -left-16 h-80 w-80 rounded-full bg-plum-deep/60 blur-3xl" />
        <div className="relative mx-auto max-w-3xl px-5 pb-28 pt-8">
          <div className="flex justify-between items-center">
            <Image src="/jkci.png" alt="Jakaya Kikwete Cardiac Institute (JKCI)" width={343} height={118}
                  priority className="h-14 w-auto sm:h-16 rounded-xl bg-white p-2 shadow-lg" />
            <Image src="/htaf-logo.jpg" alt="Heart Team Africa Foundation, Kutoa ni Moyo" width={343} height={118}
                  priority className="h-14 w-auto rounded-xl shadow-lg sm:h-16" />
          </div>
          <p className="mt-10 inline-block rounded-full bg-white/15 px-4 py-1.5 text-sm font-semibold backdrop-blur">
            {event.kicker} · {event.region} · {event.dateShort}
          </p>
          <h1 className="mt-4 text-5xl font-extrabold leading-[1.05] tracking-tight sm:text-7xl">{event.title}</h1>
          <h2 className="mt-2 text-3xl font-bold leading-[1.05] tracking-tight sm:text-5xl">{event.subtitle}</h2>
          <h3 className="mt-2 text-xl font-extralight leading-[1.05] tracking-widest sm:text-3xl">{event.subsubtitle}</h3>
          <p className="mt-5 max-w-xl text-lg text-white/90">{event.tagline}</p>
          <Countdown target={event.startISO} label="Starts in" />
          <div className="mt-8 flex gap-2">
            <a href={event.rsvpFormUrl} target="_blank" rel="noopener noreferrer"
               className={`${btn} bg-white text-plum-deep shadow-lg hover:bg-aqua-mist w-2/3`}>RSVP now</a>
            <a href="#donate" className={`${btn} border border-white/50 text-white hover:bg-white/15 w-1/3`}>
              <Icon name="heart" className="h-4 w-4" /> Donate
            </a>
          </div>
        </div>
        <svg className="absolute bottom-0 left-0 w-full text-aqua-mist" viewBox="0 0 1440 80" preserveAspectRatio="none" aria-hidden="true">
          <path fill="currentColor" d="M0 80V40c240 40 480 40 720 10S1200 0 1440 30v50z" />
        </svg>
      </header>

      <div className="mx-auto -mt-12 max-w-3xl space-y-6 px-5 pb-[calc(7rem+env(safe-area-inset-bottom))]">
        {/* DETAILS */}
        <section aria-labelledby="details" className="relative rounded-3xl bg-white p-6 shadow-soft sm:p-8">
          <h2 id="details" className="text-xl font-extrabold">Event details</h2>
          <dl className="mt-5 grid gap-4 sm:grid-cols-2">
            {details.map((x) => (
              <div key={x.k} className="flex items-start gap-3">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-plum to-aqua-blue text-white">
                  <Icon name={x.icon} />
                </span> 
                <div>
                  <dt className="text-sm text-plum-dark/60">{x.k}</dt>
                  <dd className="font-bold">{x.v}</dd>
                </div>
              </div>
            ))}
          </dl>
          <div className="mt-6 flex flex-wrap gap-3">
            <a className={`${btn} bg-aqua-mist text-plum-deep hover:bg-aqua/20`} href={mapsUrl()} target="_blank" rel="noopener noreferrer">Open map</a>
            <a className={`${btn} bg-aqua-mist text-plum-deep hover:bg-aqua/20`} href={googleCalendarUrl()} target="_blank" rel="noopener noreferrer">Add to calendar</a>
          </div>
        </section>

        {/* IMPACT */}
        <section aria-labelledby="cause" className="rounded-3xl bg-gradient-to-br from-plum-deep/10 via-plum/20 to-plum-deep/40 p-6 shadow-soft sm:p-8">
          <h2 id="cause" className="text-xl font-extrabold">Why we gather</h2>
          <p className="mt-4 bg-gradient-to-r from-plum to-aqua-blue bg-clip-text text-6xl font-extrabold text-transparent">{event.impact.number}</p>
          <p className="mt-1 text-lg font-semibold">{event.impact.text}</p>
          <p className="mt-1 text-xs text-plum-dark/50">{event.impact.source}</p>
          <p className="mt-5 text-plum-dark/80">{event.cause}</p>
        </section>

        {showCounter && <Progress stats={stats} goal={event.guestGoal} hideCountries={event.hideChips} />}

        {/* DONATE */}
        <section id="donate" aria-labelledby="give"
                 className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-plum-deep via-plum to-plum-deep p-6 text-white shadow-soft sm:p-8">
          <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-aqua/30 blur-3xl" />
          <div className="relative grid gap-x-8 gap-y-6 sm:grid-cols-[1fr_auto]">
            <div className="sm:col-start-1 sm:row-start-1">
              <h2 id="give" className="text-2xl font-extrabold">{event.motto}</h2>
              <p className="mt-2 text-white/90">{event.programme}</p>

              <div className="mt-5 rounded-2xl border border-white/20 bg-white/10 p-5">
                <p className="font-bold text-aqua">{d.anchor}</p>
                <p className="mt-4 text-sm text-white/80">{d.networkLabel}</p>
                <p className="mt-1 break-all text-4xl font-extrabold tabular-nums tracking-[0.14em] sm:text-5xl">{d.lipaNumber}</p>
                <p className="mt-2 text-sm font-semibold">{d.lipaName}</p>
                <div className="mt-5 flex flex-wrap gap-3">
                  <a href={d.onlineUrl} target="_blank" rel="noopener noreferrer"
                     className="rounded-full bg-gradient-to-r from-aqua to-aqua-blue px-6 py-2 font-bold text-plum-dark transition hover:brightness-110">
                    Donate online
                  </a>
                  <CopyButton text={d.lipaNumber} label="Copy number" />
                </div>
                <p className="mt-4 text-sm text-white/85">{d.howToPay}</p>
              </div>
            </div>

            {/* contacts (above the QR on phones) */}
            <ul className="space-y-2 text-sm sm:col-start-1 sm:row-start-2">
              <li className="flex flex-wrap gap-x-4 gap-y-1">
                <a className="inline-flex items-center gap-2 font-semibold transition-all hover:underline" href={`tel:${d.phoneTel}`}>
                  <Icon name="phone" className="h-4 w-4" />{d.hop} - {d.phoneLabel} 
                </a>
              </li>
              <li>
                <a className="inline-flex items-center gap-2 transition-all hover:underline" href={d.websiteUrl} target="_blank" rel="noopener noreferrer">
                  <Icon name="globe" className="h-4 w-4" />{d.websiteLabel}
                </a>
              </li>
              <li>
                <a className="inline-flex items-center gap-2 transition-all hover:underline" href={d.instagramUrl} target="_blank" rel="noopener noreferrer">
                  <Icon name="instagram" className="h-4 w-4" />{d.instagramHandle}
                </a>
              </li>
            </ul>

            {/* QR: small on phones (a phone cannot scan its own screen), full size on desktop, projector and print */}
            <div className="mx-auto w-28 rounded-2xl bg-white p-2 text-center shadow-lg sm:col-start-2 sm:row-span-2 sm:row-start-1 sm:w-44 sm:self-center print:w-64">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/qr-donate.svg" alt="QR code to donate online" className="h-auto w-full" />
              <p className="pb-1 text-xs font-bold text-black">Scan to donate</p>
            </div>
          </div>
        </section>

        {/* SHARE */}
        <section className="flex flex-col gap-3">
          <ShareButton className={`${btn} w-full bg-plum-deep text-white hover:bg-plum-dark`} />
          <a className={`${btn} w-full bg-white text-plum-deep shadow-soft hover:bg-aqua-mist`}
             href={`https://wa.me/${event.coordinatorWhatsApp}`} target="_blank" rel="noopener noreferrer">
            Message the event coordinator
          </a>
        </section>

        <footer className="pt-8 text-sm flex flex-col text-plum-dark/60 text-center gap-0.5">
          <p>{event.partners} | {<i className="text-plum-deep">{event.developer}</i>}</p>
          <p>© {new Date().getFullYear()} {event.footer}</p>
        </footer>
      </div>
    </main>
  );
}
