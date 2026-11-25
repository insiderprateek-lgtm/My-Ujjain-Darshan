# Content Verification & Governance — My Ujjain Darshan

This document records the provenance, pricing approval status, unconfirmed operational details, official temple boundaries, and media attributions for the **My Ujjain Darshan** platform.

---

## 1. Confirmed Brand & Contact Details

| Field | Confirmed Value | Status |
| :--- | :--- | :--- |
| Brand Name | My Ujjain Darshan | Confirmed by owner |
| Location | Ujjain, Madhya Pradesh, India | Confirmed by owner |
| Primary Phone & WhatsApp | `+91 90093 36669 / +91 90093 46669` (`tel:+919009336669`, `https://wa.me/919009336669`) | Confirmed by owner |
| Primary Logo (Circular Emblem) | `/assets/aistudio/D55FF91E-6864-4966-9A29-0800E0A51B39_b2dc8462.PNG` | Owner-supplied official asset |
| Horizontal Wordmark | `/assets/aistudio/F4EF5D88-E12D-4CE6-B306-162D7CF8255E_3b22a7af.PNG` | Owner-supplied official asset |
| Physical Street Address | Not published publicly (only city/state shown) | Pending owner confirmation |
| Official Business Email | Not published publicly unless configured via admin settings | Pending owner confirmation |

---

## 2. Reference Website Package Catalog (`ujjaintourtravels.in`)

All 12 packages observed on the reference site (`https://ujjaintourtravels.in/`) are imported into the PostgreSQL `packages` table with `catalogType: 'reference-catalog'`.

**Strict Pricing Governance Rule:**
- Competitor reference prices are stored **exclusively** in the private `reference_price` and `source_url` database columns.
- The public API (`sanitizePublicPackage`) strips `referencePrice` and `sourceUrl` before sending data to public routes.
- Until an administrator approves and enters a confirmed `published_price` with `pricing_status = 'approved'` in `/admin`, all public pages display **"Pricing available on request"**.

| # | Package Name | Slug | Internal Reference Rate (INR, Private) | Public Pricing Status |
| :-: | :--- | :--- | :---: | :--- |
| 1 | Ujjain Darshan | `ujjain-darshan` | ₹2,000 | `pending-approval` (Displays "Pricing available on request") |
| 2 | Airport Pickup & Drop | `airport-pickup-drop` | ₹1,800 | `pending-approval` |
| 3 | Omkareshwar | `omkareshwar` | ₹3,200 | `pending-approval` |
| 4 | Maheshwar | `maheshwar` | ₹4,000 | `pending-approval` |
| 5 | Mandu | `mandu` | ₹4,000 | `pending-approval` |
| 6 | Dewas Darshan | `dewas-darshan` | ₹2,000 | `pending-approval` |
| 7 | Bhopal | `bhopal` | ₹4,100 | `pending-approval` |
| 8 | Sanchi | `sanchi` | ₹5,000 | `pending-approval` |
| 9 | Pachmarhi | `pachmarhi` | ₹10,500 | `pending-approval` |
| 10 | Amarkantak | `amarkantak` | ₹11,500 | `pending-approval` |
| 11 | Omkareshwar + Maheshwar + Mamleshwar + Shani Temple | `omkareshwar-maheshwar-mamleshwar-shani-temple` | ₹5,000 | `pending-approval` |
| 12 | Indore Airport → Ujjain → Ujjain Darshan → Indore Airport | `indore-airport-ujjain-darshan-transfer` | ₹4,100 | `pending-approval` |

### Pending Operator Verification on All Reference Packages
- Exact vehicle class mapped to each base rate (e.g., Sedan vs. MPV vs. Innova Crysta)
- Inclusion/exclusion confirmation for highway tolls, state permits, parking fees, night driver allowances, and airport waiting grace periods (every seeded inclusion is explicitly marked `pending-operator-approval`)

---

## 3. Proposed Ujjain-First Custom Itineraries

Five additional itineraries are seeded with `catalogType: 'proposed-experience'` and `pricingStatus: 'request-only'`. Every card and detail page labels them clearly as **Proposed Custom Itinerary**.

| # | Itinerary Name | Slug | Pricing Status |
| :-: | :--- | :--- | :--- |
| 1 | Mahakaleshwar Spiritual Journey | `mahakaleshwar-spiritual-journey` | `request-only` |
| 2 | Ujjain & Omkareshwar Jyotirlinga Journey | `ujjain-omkareshwar-jyotirlinga-journey` | `request-only` |
| 3 | Ujjain Senior-Citizen-Friendly Darshan | `ujjain-senior-citizen-friendly-darshan` | `request-only` |
| 4 | Ujjain Family Pilgrimage Experience | `ujjain-family-pilgrimage-experience` | `request-only` |
| 5 | Personalized Multi-Day Spiritual Journey | `personalized-multi-day-spiritual-journey` | `request-only` |

---

## 4. Fleet & Vehicle Availability

Four vehicle categories are seeded in the `vehicles` table with `availabilityStatus: 'reference-unconfirmed'` and real representative vehicle model photographs:
1. **Compact Hatchback & Sedan Class** — Maruti Suzuki Swift (with Swift Dzire compact sedan option on request)
2. **Family MPV** — Maruti Suzuki Ertiga
3. **Executive Touring MPV** — Toyota Innova Crysta
4. **Group Pilgrimage Minibus** — Force Tempo Traveller (12 to 26 seater variants; larger group options such as Tavera, Toofan, and tourist coaches confirmed on enquiry)

**Pending Owner Confirmation:** Confirm exact active fleet models, seating capacities, luggage allowances, and AC/non-AC availability in `/admin` before marking vehicles as confirmed.

---

## 5. Claims Intentionally Avoided (Zero-Fabrication Policy)

To preserve guest trust and legal compliance, the platform intentionally omits all unverified claims:
- **Zero fabricated guest testimonials or star ratings** — the `testimonials` table starts empty and displays a transparent verified-feedback notice until real approved reviews are added via `/admin`.
- **Zero invented business metrics** — no fabricated years in operation, pilgrims served counts, fleet counts, or "award-winning / #1" superlatives.
- **Zero fabricated temple timings or ritual guarantees** — all Mahakaleshwar darshan schedules, Bhasma Aarti permissions, queue rules, and special darshan passes are explicitly attributed to the official **Shri Mahakaleshwar Temple Management Committee** (`https://shrimahakaleshwar.com/`).
- **Zero unverified hotel or guide partnerships** — hotel assistance is offered strictly as an optional enquiry checkbox clarified during written quotation.

---

## 6. Visual Asset Provenance (Verified Real-World Photography Audit)

All legacy AI-generated placeholder images in `/src/assets/images/` have been **permanently removed** and replaced with **39 visually verified, real-world photographs** (78 optimized WebP files: primary + `800w` responsive variants in `/public/images/`) sourced under Creative Commons / CC0 licenses from Wikimedia Commons, plus owner-supplied brand logos.

| Category | Local WebP Asset | Subject | Attribution & License | Wikimedia Commons Source |
| :--- | :--- | :--- | :--- | :--- |
| Brand Mark | `/assets/aistudio/D55FF91E-6864-4966-9A29-0800E0A51B39_b2dc8462.PNG` | Official Circular Emblem | Owner-supplied official asset | User upload |
| Brand Mark | `/assets/aistudio/F4EF5D88-E12D-4CE6-B306-162D7CF8255E_3b22a7af.PNG` | Official Horizontal Wordmark | Owner-supplied official asset | User upload |
| Homepage | `/images/homepage/ram-ghat-shipra-ujjain.webp` | Ram Ghat on the Shipra River, Ujjain | Bernard Gagnon · CC BY-SA 3.0 | `File:Shri Ram Ghat 03.jpg` |
| Ujjain Temples | `/images/temples/mahakaleshwar-temple-ujjain.webp` | Shri Mahakaleshwar Jyotirlinga (Twilight) | Ashverse · CC BY-SA 4.0 | `File:Mahakaleshwar Temple, Ujjain.jpg` |
| Ujjain Temples | `/images/temples/mahakaleshwar-temple-shikhara.webp` | Shri Mahakaleshwar Temple Shikhara (Day) | Gyanendra Singh Chauhan · CC BY 3.0 | `File:Shri Mahakaleshwar Temple Ujjain - panoramio (2).jpg` |
| Ujjain Temples | `/images/temples/mahakal-lok-corridor.webp` | Shri Mahakal Lok Corridor | Surendra 1999 · CC BY-SA 4.0 | `File:Mahakal Corridor, Ujjain, MP.jpg` |
| Ujjain Temples | `/images/temples/mahakal-lok-sculpture.webp` | Shri Mahakal Lok Sculptures | Wikimedia Commons Contributor · CC BY-SA 4.0 | `File:Mahakal Lok ujjain.jpg` |
| Ujjain Temples | `/images/temples/ram-ghat-shipra.webp` | Ram Ghat Riverfront, Ujjain | Bernard Gagnon · CC BY-SA 3.0 | `File:Shri Ram Ghat 01.jpg` |
| Ujjain Temples | `/images/temples/ram-ghat-steps-ujjain.webp` | Ram Ghat Steps, Ujjain | Bernard Gagnon · CC BY-SA 3.0 | `File:Ram Ghat, Ujjain 01.jpg` |
| Ujjain Temples | `/images/temples/harsiddhi-temple-ujjain.webp` | Harsiddhi Mata Temple, Ujjain | Bernard Gagnon · CC BY-SA 3.0 | `File:Harsiddhi Temple, Ujjain 02.jpg` |
| Ujjain Temples | `/images/temples/harsiddhi-temple-sanctum-gate.webp` | Harsiddhi Mata Sanctum Gate, Ujjain | Bernard Gagnon · CC BY-SA 3.0 | `File:Harsiddhi Temple, Ujjain 03.jpg` |
| Ujjain Temples | `/images/temples/kal-bhairav-temple-ujjain.webp` | Kal Bhairav Temple, Ujjain | Utcursch · CC BY-SA 4.0 | `File:Kal Bhairav temple Ujjain.jpg` |
| Ujjain Temples | `/images/temples/mangalnath-temple-ujjain.webp` | Mangalnath Temple, Ujjain | Wikimedia Commons Contributor · CC BY 3.0 | `File:Shri Mangal Nath Mahadev Temple Ujjain - panoramio.jpg` |
| Ujjain Temples | `/images/temples/sandipani-ashram-ujjain.webp` | Sandipani Ashram (Gomti Kund), Ujjain | Gyanendra Singh Chauhan · CC BY 3.0 | `File:Kund at Maharshi Sandipani Ashram Ujjain - panoramio.jpg` |
| Ujjain Temples | `/images/temples/chintaman-ganesh-temple-ujjain.webp` | Chintaman Ganesh Temple, Ujjain | Wikimedia Commons Contributor · CC BY 3.0 | `File:Shri Chintamann Ganesh Temple Ujjain - panoramio.jpg` |
| Ujjain Temples | `/images/temples/gopal-mandir-ujjain.webp` | Dwarkadhish Gopal Mandir, Ujjain | Wikimedia Commons Contributor · CC BY-SA 4.0 | `File:Shikhara of Shri Dwarkadhish Gopal Mandir.jpg` |
| Ujjain Temples | `/images/temples/gadkalika-temple-ujjain.webp` | Gadkalika Mata Temple, Ujjain | Sunil Ujjain · CC BY-SA 4.0 | `File:GARH KALIKA OVERVIEW.jpg` |
| Ujjain Temples | `/images/temples/iskcon-temple-ujjain.webp` | ISKCON Temple, Ujjain | Wikimedia Commons Contributor · CC BY-SA 4.0 | `File:ISKCON Temple Ujjain.jpg` |
| Ujjain Temples | `/images/temples/vedh-shala-ujjain.webp` | Vedh Shala (Jantar Mantar), Ujjain | Bernard Gagnon · CC BY-SA 3.0 | `File:Vedh Shala, Ujjain 01.jpg` |
| Destinations | `/images/destinations/omkareshwar-temple-mandhata.webp` | Shri Omkareshwar Jyotirlinga | Bernard Gagnon · CC BY-SA 3.0 | `File:Omkareshwar Temple 02.jpg` |
| Destinations | `/images/destinations/omkareshwar-narmada-view.webp` | Omkareshwar Narmada Riverfront | Bernard Gagnon · CC BY-SA 3.0 | `File:Omkareshwar Temple 01.jpg` |
| Destinations | `/images/destinations/mamleshwar-temple-omkareshwar.webp` | Shri Mamleshwar Temple, Omkareshwar | Bernard Gagnon · CC BY-SA 3.0 | `File:Mamleshwar Temple 04.jpg` |
| Destinations | `/images/destinations/maheshwar-ahilya-fort-ghat.webp` | Ahilya Fort & Ghats, Maheshwar | Bernard Gagnon · CC BY-SA 3.0 | `File:Maheshwar Fort - Exterior 04.jpg` |
| Destinations | `/images/destinations/maheshwar-narmada-temples.webp` | Maheshwar Fort & Narmada Shrines | Bernard Gagnon · CC BY-SA 3.0 | `File:Maheshwar Fort 01.jpg` |
| Destinations | `/images/destinations/mandu-jahaz-mahal.webp` | Jahaz Mahal, Mandu | Bernard Gagnon · CC BY-SA 3.0 | `File:Jahaz Mahal 01.jpg` |
| Destinations | `/images/destinations/mandu-roopmati-pavilion.webp` | Rani Roopmati Pavilion, Mandu | Yayawar monk · CC BY-SA 4.0 | `File:Rani Roopmati Pavillion in monsoon season, Mandu, Madhya pradesh.jpg` |
| Destinations | `/images/destinations/dewas-tekri-hilltop.webp` | Dewas Tekri Hilltop Panorama | Akashwk07 · CC BY-SA 4.0 | `File:Dewas City View From Tekri Hilltop.jpg` |
| Destinations | `/images/destinations/bhopal-bhojtal-upper-lake.webp` | Bhojtal (Upper Lake), Bhopal | Sanyam Bahga · CC BY-SA 3.0 | `File:BadaTalaabBhopal3.jpg` |
| Destinations | `/images/destinations/bhojpur-shiva-temple.webp` | Bhojeshwar Shiva Temple, Bhojpur | Bernard Gagnon · CC BY-SA 3.0 | `File:Shiva Temple, Bhojpur 01.jpg` |
| Destinations | `/images/destinations/sanchi-great-stupa.webp` | Great Stupa (No. 1), Sanchi | Bernard Gagnon · CC BY-SA 3.0 | `File:Stupa 1, Sanchi 02.jpg` |
| Destinations | `/images/destinations/pachmarhi-pandav-caves.webp` | Pandav Caves, Pachmarhi | The open draft · CC BY-SA 4.0 | `File:Pandav cave,pachmari.jpg` |
| Destinations | `/images/destinations/pachmarhi-satpura-valley.webp` | Satpura Plateau Gardens, Pachmarhi | Jaarvis 1997 · CC BY-SA 4.0 | `File:Paanch pandav cave garden.jpg` |
| Destinations | `/images/destinations/amarkantak-sacred-temple.webp` | Sacred Temple, Amarkantak | R Singh · CC BY 2.0 | `File:A Hindu temple, Amarkantak Madhya Pradesh India.jpg` |
| Destinations | `/images/destinations/amarkantak-narmada-sarovar.webp` | Pushkar Sarovar & Shrine, Amarkantak | Ms Sarah Welch · CC0 | `File:01022 Narmada goddess and Pushkar Sarovar, Amarkantak Madhya Pradesh 03.jpg` |
| Airport | `/images/airport-transfers/indore-airport-terminal.webp` | Devi Ahilyabai Holkar Airport Terminal, Indore | Wikimedia Commons Contributor · CC BY-SA 4.0 | `File:DABH T2.png` |
| Airport | `/images/airport-transfers/indore-airport-aircraft.webp` | Commercial Aircraft at Indore Airport | Nick-D · CC BY-SA 4.0 | `File:Vistara A320 at Indore Airport July 2023.jpg` |
| Vehicles | `/images/vehicles/maruti-suzuki-swift.webp` | Maruti Suzuki Swift | Alexander Migl · CC BY-SA 4.0 | `File:Suzuki Swift (2024) hybrid DSC 6076.jpg` |
| Vehicles | `/images/vehicles/maruti-suzuki-dzire.webp` | Maruti Suzuki Dzire | Wikimedia Commons Contributor · CC BY-SA 4.0 | `File:Suzuki Dzire II 1.2 GLX Hybrid Arctic White Pearl.jpg` |
| Vehicles | `/images/vehicles/maruti-suzuki-ertiga.webp` | Maruti Suzuki Ertiga | Wikimedia Commons Contributor · CC BY-SA 4.0 | `File:Suzuki Ertiga NC FL 1.5 GLX Hybrid Snow White Pearl.jpg` |
| Vehicles | `/images/vehicles/toyota-innova-crysta.webp` | Toyota Innova Crysta | Wikimedia Commons Contributor · CC BY-SA 4.0 | `File:2021 Toyota Kijang Innova 2.0 G TGN140R (20210521).jpg` |
| Vehicles | `/images/vehicles/force-tempo-traveller.webp` | Force Tempo Traveller | Yann Forget · CC BY-SA 3.0 | `File:Force Traveller, Leh-Manali Highway.jpg` |

**Note on Future Photography Upgrades:** Two Ujjain shrine photos sourced as the highest-authenticity verified images available on Wikimedia Commons have non-standard aspect ratios (`chintaman-ganesh-temple-ujjain.webp` panoramic 874×356 and `gopal-mandir-ujjain.webp` vertical 675×1200) and are framed carefully via focal `objectPosition`. Replacing those two with bespoke high-resolution 16:10 local DSLR photographs in a future photo shoot will further elevate consistency.

---

## 7. Draft Legal Policies Requiring Owner Review

The four policy pages (`/privacy-policy`, `/terms-and-conditions`, `/cancellation-and-refund-policy`, `/travel-disclaimer`) are clearly marked as **Draft Policies** pending final review by the business owner before commercial launch, including:
- Advance deposit and cancellation cut-off windows
- GST/invoicing details and registered legal entity name
- Grievance contact email and registered office address
