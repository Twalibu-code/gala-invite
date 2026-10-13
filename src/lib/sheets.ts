import { JWT } from "google-auth-library";

export type Stats = {
  configured: boolean;
  attending: number;
  declined: number;
  totalGuests: number;
  countries: string[];
  updatedAt: string;
  error?: string;
};

const empty = (configured: boolean, error?: string): Stats => ({
  configured,
  attending: 0,
  declined: 0,
  totalGuests: 0,
  countries: [],
  updatedAt: new Date().toISOString(),
  error,
});

// Expected column order of the Google Form response sheet:
// A Timestamp | B Attendance | C Full name | D Country | E Organisation | F Title | G Contact | H Additional guests | I Dietary
export async function getStats(): Promise<Stats> {
  // Option A (no Google Cloud keys needed): an Apps Script web app attached to the response Sheet.
  const statsUrl = process.env.STATS_URL;
  if (statsUrl) {
    try {
      const res = await fetch(statsUrl, { next: { revalidate: 60 } });
      if (!res.ok) throw new Error(`Stats endpoint ${res.status}`);
      const j = (await res.json()) as Partial<Stats>;
      return {
        configured: true,
        attending: Number(j.attending) || 0,
        declined: Number(j.declined) || 0,
        totalGuests: Number(j.totalGuests) || 0,
        countries: Array.isArray(j.countries) ? j.countries.map(String) : [],
        updatedAt: new Date().toISOString(),
      };
    } catch (e) {
      return empty(true, e instanceof Error ? e.message : "Unknown error");
    }
  }

  // Option B: Google Sheets API with a service account (needs key creation to be allowed).
  const id = process.env.GOOGLE_SHEET_ID;
  const email = process.env.GOOGLE_CLIENT_EMAIL;
  const key = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n");
  if (!id || !email || !key) return empty(false);

  try {
    const auth = new JWT({
      email,
      key,
      scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
    });
    const { token } = await auth.getAccessToken();
    const range = encodeURIComponent(process.env.GOOGLE_SHEET_RANGE || "Form Responses 1!A2:I");
    const res = await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${id}/values/${range}`,
      { headers: { Authorization: `Bearer ${token}` }, next: { revalidate: 60 } }
    );
    if (!res.ok) throw new Error(`Sheets API ${res.status}`);
    const { values = [] } = (await res.json()) as { values?: string[][] };

    // One person = one entry (latest answer wins), keyed by contact or name.
    const latest = new Map<string, string[]>();
    for (const row of values) {
      const k = (row[6] || row[2] || "").trim().toLowerCase();
      if (k) latest.set(k, row);
    }

    let attending = 0, declined = 0, totalGuests = 0;
    const countries = new Set<string>();
    latest.forEach((row) => {
      const att = (row[1] || "").toLowerCase();
      if (att.startsWith("i will attend")) {
        attending += 1;
        totalGuests += 1 + (parseInt(row[7] || "0", 10) || 0);
        const c = (row[3] || "").trim();
        if (c && c.toLowerCase() !== "other") countries.add(c);
      } else if (att.startsWith("unable")) {
        declined += 1;
      }
    });

    return {
      configured: true,
      attending,
      declined,
      totalGuests,
      countries: Array.from(countries).sort(),
      updatedAt: new Date().toISOString(),
    };
  } catch (e) {
    return empty(true, e instanceof Error ? e.message : "Unknown error");
  }
}
