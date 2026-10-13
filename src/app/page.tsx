import Image from "next/image";
import { event } from "@/config/event";
import { getStats } from "@/lib/sheets";
import { googleCalendarUrl, mapsUrl, whatsappShareUrl } from "@/lib/calendar";
import Countdown from "@/components/Countdown";
import Progress from "@/components/Progress";
import CopyButton from "@/components/CopyButton";
import Icon from "@/components/Icon";

// Re-generate this page at most once a minute, so numbers follow the Google Sheet.
export const revalidate = 60;

const btn = "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 font-bold transition";

export default async function Home() {
  const stats = await getStats();
  const site = process.env.NEXT_PUBLIC_SITE_URL || "";
  const d = event.donation;
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
            <Image src="/jkci.png" alt="Heart Team Africa Foundation main logo" width={343} height={118}
                  priority className="h-14 w-auto sm:h-16" />
            <Image src="/htaf-logo.jpg" alt="Heart Team Africa Foundation, Kutoa ni Moyo" width={343} height={118}
                  priority className="h-14 w-auto rounded-2xl shadow-lg sm:h-16" />
          </div>
          <p className="mt-10 inline-block rounded-full bg-white/15 px-4 py-1.5 text-sm font-semibold backdrop-blur">
            {event.kicker} · {event.dateLabel}
          </p>
          <h1 className="mt-4 text-5xl font-extrabold leading-[1.05] tracking-tight sm:text-7xl">{event.title}</h1>
          <p className="mt-5 max-w-xl text-lg text-white/90">{event.tagline}</p>
          <div className="mt-8">
            <div className="flex justify-center items-center text-lg font-extralight">Time Left to the GALA DINNER</div>
            <Countdown target={event.startISO} />
          </div>
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

      <div className="mx-auto -mt-12 max-w-3xl space-y-6 px-5 pb-16">
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
        <section aria-labelledby="cause" className="rounded-3xl bg-white p-6 shadow-soft sm:p-8">
          <h2 id="cause" className="text-xl font-extrabold">Why we gather</h2>
          <p className="mt-4 bg-gradient-to-r from-plum to-aqua-blue bg-clip-text text-6xl font-extrabold text-transparent">{event.impact.number}</p>
          <p className="mt-1 text-lg font-semibold">{event.impact.text}</p>
          <p className="mt-1 text-xs text-plum-dark/50">{event.impact.source}</p>
          <p className="mt-5 text-plum-dark/80">{event.cause}</p>
        </section>

        <Progress stats={stats} goal={event.guestGoal} />

        {/* DONATE */}
        <section id="donate" aria-labelledby="give"
                 className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-plum-deep via-plum to-plum-deep p-6 text-white shadow-soft sm:p-8">
          <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-aqua/30 blur-3xl" />
          <div className="relative grid gap-6 sm:grid-cols-[1fr_auto] sm:items-center">
            <div>
              <h2 id="give" className="text-2xl font-extrabold">{event.motto}</h2>
              <p className="mt-1 text-white/85">Give from the heart. Every contribution is voluntary and goes to children's heart care.</p>
              <p className="mt-5 text-sm text-white/75">{d.networkLabel}</p>
              <p className="text-4xl font-extrabold tracking-widest tabular-nums">{d.lipaNumber}</p>
              <p className="mt-1 text-sm font-semibold">{d.lipaName}</p>
              <div className="mt-4 flex flex-wrap gap-3">
                <CopyButton text={d.lipaNumber} label="Copy Lipa number" />
                <a href={d.onlineUrl} target="_blank" rel="noopener noreferrer"
                   className="rounded-full bg-gradient-to-r from-aqua to-aqua-blue px-5 py-1.5 text-sm font-bold text-plum-dark transition hover:brightness-110">
                  Donate online
                </a>
              </div>
            </div>
            <div className="mx-auto w-40 rounded-2xl bg-white p-2 text-center shadow-lg">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/qr-donate.svg" alt="QR code to donate online" width={144} height={144} className="h-auto w-full" />
              <p className="pb-1 text-xs font-bold text-plum-deep">Scan to donate</p>
            </div>
          </div>
          <ul className="relative mt-6 flex flex-wrap flex-col gap-y-2 border-t border-white/20 pt-4 text-sm">
            <li><a className="inline-flex items-center gap-2 hover:underline" href={`tel:${d.phoneTel}`}><Icon name="phone" className="h-4 w-4" />Dr. Adelphina Ncheye:&nbsp;{d.phoneLabel}&nbsp;(Head of Programs, HTAF)</a></li>
            <li><a className="inline-flex items-center gap-2 hover:underline" href={d.websiteUrl} target="_blank" rel="noopener noreferrer"><Icon name="globe" className="h-4 w-4" />{d.websiteLabel}</a></li>
            <li><a className="inline-flex items-center gap-2 hover:underline" href={d.instagramUrl} target="_blank" rel="noopener noreferrer"><Icon name="instagram" className="h-4 w-4" />{d.instagramHandle}</a></li>
          </ul>
        </section>

        {/* SHARE */}
        <section className="flex flex-wrap gap-3">
          <a className={`${btn} bg-plum-deep text-white hover:bg-plum-dark`} href={whatsappShareUrl(site)} target="_blank" rel="noopener noreferrer">Share on WhatsApp</a>
          <a className={`${btn} bg-white text-plum-deep shadow-soft hover:bg-aqua-mist`} href={`https://wa.me/${event.coordinatorWhatsApp}`} target="_blank" rel="noopener noreferrer">Message the event coordinator</a>
        </section>

        <footer className="pt-2 text-sm text-plum-dark/60">{event.partners}</footer>
      </div>
    </main>
  );
}
