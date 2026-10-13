import type { Metadata } from "next";
import "./globals.css";
import { event } from "@/config/event";

const site = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(site),
  title: `${event.kicker} • ${event.title}`,
  description: event.tagline,
  openGraph: {
    title: `${event.kicker} • ${event.title}`,
    description: `${event.dateLabel}, ${event.venue}. ${event.tagline}`,
    type: "website",
    // Add /public/og.jpg (1200x630) to get a picture in WhatsApp link previews.
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
