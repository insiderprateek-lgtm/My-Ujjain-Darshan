# My Ujjain Darshan — Official Spiritual & Heritage Travel Platform

A complete full-stack web platform for **My Ujjain Darshan** (Ujjain, Madhya Pradesh, India), built with **React 19**, **Vite**, **Tailwind CSS v4**, **Express (`server.ts`)**, **Google Cloud SQL (PostgreSQL) with Drizzle ORM**, and **Firebase Authentication**.

---

## 1. Key Capabilities

- **Editorial Public Experience (14-Section Home + Full Multi-Page Architecture):**
  - Signature `/ujjain-darshan` flagship page with interactive 10-landmark sacred-zone explorer (`SpiritualCircuitMap`)
  - Complete `/packages` catalog containing all 12 reference journeys plus 5 clearly labeled Proposed Ujjain-First Custom Itineraries, with live filtering, search, and side-by-side journey comparison
  - Nine editorial destination guides (`/destinations/:slug`) covering Ujjain, Omkareshwar, Maheshwar, Mandu, Dewas, Bhopal, Sanchi, Pachmarhi, and Amarkantak
  - Interactive 4-step `/plan-your-journey` planner persisting enquiries directly to Cloud SQL PostgreSQL with instant reference codes and pre-filled WhatsApp summary handoff
  - Dedicated Fleet (`/fleet`), Travel Journal (`/journal` & `/journal/:slug`), About (`/about`), Contact (`/contact`), FAQ (`/faq`), and Draft Legal Policy routes
- **Strict Pricing & Truthfulness Governance:**
  - Competitor reference rates (`referencePrice`, `sourceUrl`) are isolated strictly in PostgreSQL and admin APIs—never exposed on public endpoints.
  - Public routes display `"Pricing available on request"` until an operator approves a package's `publishedPrice` and sets `pricingStatus = 'approved'` in `/admin`.
  - Official Shri Mahakaleshwar Temple Management Committee attribution (`https://shrimahakaleshwar.com/`) for all darshan and Bhasma Aarti bookings.
- **Protected Admin Console (`/admin`):**
  - Secured with Google Sign-In via Firebase Authentication + server-side Firebase Admin token verification (`requireAdmin`) against the `ADMIN_EMAILS` allowlist.
  - Manage enquiries (status workflow, follow-up notes, formula-safe CSV export), approve package tariffs, publish/edit packages, add journal articles, manage FAQs, and moderate verified guest testimonials.
- **Technical SEO & Metadata:**
  - Route-level `<title>`, meta description, canonical URL, OpenGraph, Twitter tags, and JSON-LD structured data (`TravelAgency`, `TouristTrip`, `FAQPage`, `Article`, `BreadcrumbList`).
  - Dynamic `/robots.txt` and database-backed `/sitemap.xml`.

---

## 2. Architecture & Commands

- **Frontend:** React 19 + TypeScript + React Router v7 + Tailwind CSS v4 + Motion
- **Backend:** Express (`server.ts`) running on port `3000` (mounts Vite middleware in development, serves `dist/` in production)
- **Database:** Cloud SQL PostgreSQL via `pg.Pool` (Object Method) and Drizzle ORM (`src/db/schema.ts`)
- **Authentication:** Firebase Auth client SDK + `firebase-admin` server-side ID token verification

### Scripts
```bash
npm run dev     # Starts Express + Vite dev server on port 3000
npm run build   # Builds production Vite bundle to dist/
npm run start   # Runs production Express server serving dist/ and /api/*
npm run lint    # Runs TypeScript type-checking (tsc --noEmit)
```

---

## 3. Environment Variables

See `.env.example` for the full template (never commit real secrets):

| Variable | Required | Purpose |
| :--- | :---: | :--- |
| `SQL_HOST`, `SQL_ADMIN_USER`, `SQL_ADMIN_PASSWORD`, `SQL_DB_NAME` | Runtime-injected | Provided automatically by AI Studio Cloud SQL provisioning |
| `APP_URL` | Recommended | Canonical production base URL used in `/sitemap.xml` and `/robots.txt` |
| `ADMIN_EMAILS` | Optional | Comma-separated list of Google account emails authorized for `/admin` (defaults to owner allowlist) |
| `OPERATOR_NOTIFICATION_EMAIL` | Optional | Operator email for internal reference |
| `OPERATOR_WEBHOOK_URL` | Optional | HTTPS webhook endpoint notified on new enquiry submissions (blocks private/loopback URLs) |
| `VITE_GA4_MEASUREMENT_ID` | Optional | Google Analytics 4 measurement ID |
| `VITE_GTM_ID` | Optional | Google Tag Manager container ID |
| `VITE_GOOGLE_MAPS_EMBED_KEY` | Optional | Optional Maps embed key if external map embed is enabled |

---

## 4. Admin Access Setup

1. Navigate to `/admin`.
2. Sign in with an authorized Google account listed in `ADMIN_EMAILS`.
3. Every `/api/admin/*` route validates the `Authorization: Bearer <Firebase ID Token>` header on the server via `firebase-admin` before reading or mutating PostgreSQL data.

---

## 5. Analytics Event Naming Convention

When `VITE_GA4_MEASUREMENT_ID` or `VITE_GTM_ID` is connected, the platform standardizes conversion telemetry around these event names:

- `package_view` — User opens a package detail or `/ujjain-darshan` page
- `package_enquiry_click` — User clicks "Enquire / Customize" from a package card or detail view
- `whatsapp_click` — User clicks any header, footer, card, or floating WhatsApp CTA
- `phone_click` — User taps any `tel:+919522233375` call action
- `planner_start` — User starts the 4-step `/plan-your-journey` flow
- `planner_complete` — User advances to final review step of the planner
- `enquiry_submit` — Validated enquiry successfully saved to PostgreSQL
- `package_filter_change` — User filters packages by category, destination, or catalog type
- `journal_to_package_click` — User navigates from a Travel Journal article to a linked journey

---

## 6. Pre-Launch Operator Checklist

- [ ] Review all 12 reference packages in `/admin` -> **Packages & Pricing**, confirm actual selling tariffs, and toggle `pricingStatus` to `approved` when ready to display prices publicly.
- [ ] Review and update the 4 vehicle categories in PostgreSQL (`availabilityStatus`) once exact fleet models are confirmed.
- [ ] Review draft legal policies (`/privacy-policy`, `/terms-and-conditions`, `/cancellation-and-refund-policy`, `/travel-disclaimer`) with your legal/business details.
- [ ] Configure `ADMIN_EMAILS` and optional `OPERATOR_WEBHOOK_URL` in production secrets.
- [ ] Replace editorial placeholder photography progressively with authentic on-location photographs as they become available.
