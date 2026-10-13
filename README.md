# Gala Dinner Invitation (Next.js + Tailwind)

Invitation site for the JKCI / HTAF charity gala dinner. Guests RSVP through your Google Form; this site
reads the form's response Sheet and shows live, aggregate numbers (no personal data is ever exposed).

## 1. Run locally
```bash
npm install
cp .env.example .env.local   # then fill the values (step 3)
npm run dev                  # http://localhost:3000
```
Without the Google variables the site still works and simply hides the live numbers.

## 2. Customise
- Event details, texts, goal, links: `src/config/event.ts`
- Layout and sections: `src/app/page.tsx`
- Colours and fonts: `tailwind.config.ts` (HTAF brand plum and aqua, sampled from their posts)
- Donation details (Lipa number, online link, QR): `event.donation` in `src/config/event.ts`; the QR image is `public/qr-donate.svg`
- Logo: `public/htaf-logo.jpg`
- Live numbers logic: `src/lib/sheets.ts` (expects the Form's column order: Timestamp, Attendance, Full name, Country, Organisation, Title, Contact, Additional guests, Dietary)

## 3. Connect the Google Sheet (live updates)
### Option A (recommended): Apps Script web app, no Google Cloud keys
1. Open the Sheet your RSVP Form writes to ("GALA DINNER - RSVP Responses").
2. **Extensions > Apps Script**, replace the code with the contents of `apps-script/stats.gs`, save.
3. **Deploy > New deployment > gear icon > Web app**. Execute as: **Me**. Who has access: **Anyone**. Deploy and accept the permissions.
4. Copy the **Web app URL** into `STATS_URL` (in `.env.local` and later in Vercel).
5. If "Anyone" is not offered, your Workspace administrator restricts external sharing: use a personal Google account for the Form and Sheet, or ask the admin to allow it.

The endpoint returns only totals and the list of countries. Names, contacts and dietary answers are never exposed.
Whenever you change `stats.gs`, use **Deploy > Manage deployments > Edit > New version** so the URL stays the same.

### Option B: Google Sheets API with a service account
Only if your organisation allows service account keys (otherwise you will see `iam.disableServiceAccountKeyCreation`).
1. Copy the Sheet ID from its URL into `GOOGLE_SHEET_ID`.
2. In console.cloud.google.com enable **Google Sheets API**, create a **Service Account** and a JSON key.
3. `client_email` -> `GOOGLE_CLIENT_EMAIL`, `private_key` -> `GOOGLE_PRIVATE_KEY` (keep `\n`, wrap in quotes).
4. Share the response Sheet with the service account email as **Viewer**.
5. If the response tab is not `Form Responses 1`, set `GOOGLE_SHEET_RANGE`.

The page refreshes its numbers at most once a minute (`revalidate = 60`).

## 4. Deploy on Vercel
1. Push this folder to a GitHub repository (the `.gitignore` already excludes `.env` files).
2. vercel.com > **Add New > Project** > import the repo (framework: Next.js, defaults are fine).
3. In **Settings > Environment Variables** add: `STATS_URL` (Option A) or the three `GOOGLE_*` variables (Option B), and `NEXT_PUBLIC_SITE_URL` (your final address).
4. Deploy. Every `git push` redeploys automatically.

## 5. Custom domain
1. Vercel project > **Settings > Domains > Add**, enter your domain (for example `galadinner.co.tz`).
2. Vercel shows the DNS records. At your registrar add either an **A record** `76.76.21.21` for the root domain
   or a **CNAME** (for a subdomain like `invite.yourdomain.com`) to the value Vercel displays. Use the exact values shown in Vercel.
3. Wait for DNS to propagate; HTTPS is issued automatically. Then set `NEXT_PUBLIC_SITE_URL` to the new address and redeploy.

## Privacy notes
- `/api/stats` and the page only show totals and the list of countries represented.
- Names, contacts and dietary answers stay in your private Sheet. Do not "Publish to web" or share that Sheet publicly.
- Never commit `.env.local` or the service-account JSON file.
