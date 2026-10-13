import { event } from "@/config/event";

const fmt = (d: Date) => d.toISOString().replace(/[-:]|\.\d{3}/g, "");

export function googleCalendarUrl(): string {
  const start = new Date(event.startISO);
  const end = new Date(start.getTime() + event.durationHours * 3600_000);
  const p = new URLSearchParams({
    action: "TEMPLATE",
    text: `${event.kicker}: ${event.title}`,
    dates: `${fmt(start)}/${fmt(end)}`,
    details: event.tagline,
    location: event.venue,
  });
  return `https://calendar.google.com/calendar/render?${p.toString()}`;
}

export const mapsUrl = () =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(event.mapQuery)}`;

export const whatsappShareUrl = (siteUrl: string) =>
  `https://wa.me/?text=${encodeURIComponent(`${event.kicker}: ${event.title}\n${siteUrl}`)}`;
