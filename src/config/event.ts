// All event details live here. Edit this file, commit, and Vercel redeploys.
export const event = {
  title: "Little Hearts, Big Hope",
  kicker: "Gala Dinner",
  motto: "Kutoa ni Moyo",
  tagline:
    "A charity evening raising voluntary contributions for children with heart conditions, through JKCI and the Heart Team Africa Foundation (HTAF).",
  cause:
    "Every contribution helps a child with a heart condition receive surgery and dependable care at the Jakaya Kikwete Cardiac Institute (JKCI). Giving is entirely voluntary.",
  startISO: "2026-12-04T18:00:00+03:00",
  durationHours: 4,
  dateLabel: "Friday, 4 December 2026",
  timeLabel: "From 18:00",
  venue: "Malaika Beach Resort, Mwanza",
  mapQuery: "Malaika Beach Resort, Mwanza",
  dressCode: "To be confirmed",
  guestGoal: 50, // placeholder target, change to your real goal
  rsvpFormUrl:
    "https://docs.google.com/forms/d/e/1FAIpQLSfsMix48sw9iGuYcc1PFSyej_kAT_Tn2vM1wKzktCcxltnX9g/viewform",
  coordinatorWhatsApp: "255784311111", // digits only, with country code
  partners: "In partnership with JKCI and Heart Team Africa Foundation",
  impact: {
    number: "16,000",
    text: "children are born with a congenital heart defect in Tanzania every year, out of about 2 million births.",
    source: "Source: Heart Team Africa Foundation",
  },
  donation: {
    networkLabel: "SELCOM Lipa Number",
    lipaNumber: "70028106",
    lipaName: "HEART TEAM AFRICA FOUNDATION",
    onlineUrl: "https://web.chapaa.co.tz/?ci=moyo",
    phoneLabel: "0747 008 980",
    phoneTel: "+255747008980",
    websiteLabel: "www.htafoundation.or.tz",
    websiteUrl: "https://www.htafoundation.or.tz",
    instagramUrl: "https://www.instagram.com/heartteamafrica",
    instagramHandle: "heartteamafrica",
  },
};
export type EventConfig = typeof event;
