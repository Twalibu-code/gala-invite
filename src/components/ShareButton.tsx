"use client";
import { useEffect, useState } from "react";
import { event } from "@/config/event";
import { whatsappShareUrl } from "@/lib/calendar";

// Builds the WhatsApp link from the page's real address, so the shared link is always correct.
export default function ShareButton({ className = "" }: { className?: string }) {
  const [href, setHref] = useState(whatsappShareUrl(event.siteUrl));
  useEffect(() => {
    setHref(whatsappShareUrl(window.location.origin + window.location.pathname));
  }, []);
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
      Share on WhatsApp
    </a>
  );
}
