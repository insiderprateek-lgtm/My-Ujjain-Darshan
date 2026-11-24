# Design System — My Ujjain Darshan

**Aesthetic Direction:** Quiet Luxury Spiritual Heritage Editorial  
Derived strictly from the official **My Ujjain Darshan** emblem and horizontal Devanagari wordmark—warm carved sandstone, aged temple ivory, deep heritage maroon, muted brass gold, and disciplined saffron accents.

---

## 1. Logo & Brand Asset Usage

- **Horizontal Wordmark** (`/assets/aistudio/F4EF5D88-E12D-4CE6-B306-162D7CF8255E_3b22a7af.PNG`)
  - Primary navigation bar logo (`h-11` to `h-12`, preserving exact native aspect ratio).
  - Never stretched, recolored, or overlaid on busy dark photography without an ivory surface container.
- **Circular Emblem** (`/assets/aistudio/D55FF91E-6864-4966-9A29-0800E0A51B39_b2dc8462.PNG`)
  - Browser favicon, footer heritage mark, subtle editorial seals, and mobile drawer identity.

---

## 2. Color Tokens (Tailwind v4 `@theme` in `src/index.css`)

| Token | Hex | Role |
| :--- | :--- | :--- |
| `--color-ivory` | `#FBF8F3` | Primary page canvas (warm travertine paper) |
| `--color-limestone` | `#F3EDE3` | Secondary alternating editorial section surfaces |
| `--color-sandstone` | `#E6DDD0` | Hairline borders, architectural dividers, subtle cards |
| `--color-maroon` | `#7A0806` | Primary brand color (pulled directly from logo) |
| `--color-maroon-deep` | `#580605` | Hover states, emphasized headers, active states |
| `--color-maroon-dark` | `#1C0D0D` | Dark architectural surfaces (footer, hero scrims, editorial callouts) |
| `--color-saffron` | `#D9690A` | Restrained sacred accent (highlights, active indicators, micro-accents) |
| `--color-gold` | `#A68247` | Muted brass hairlines, eyebrows, metadata markers |
| `--color-charcoal` | `#1F1A17` | Primary high-contrast body & display ink |
| `--color-stone` | `#655C54` | Secondary body copy, captions, quiet metadata |

### Contrast Commitment (WCAG 2.2 AA)
- Primary text (`#1F1A17`) on Ivory (`#FBF8F3`): **15.8:1**
- Muted Stone (`#655C54`) on Ivory (`#FBF8F3`): **6.3:1**
- White / Ivory (`#FBF8F3`) on Deep Maroon (`#7A0806`): **9.7:1**
- White / Ivory (`#FBF8F3`) on Dark Maroon (`#1C0D0D`): **17.4:1**

---

## 3. Typography System

Loaded via Google Fonts in `index.html`:

| Role | Font Family | Usage |
| :--- | :--- | :--- |
| **Display & Headings** | `Cormorant Garamond` (400, 500, 600, 700, italic) | Hero headlines, section titles, pull quotes, editorial numerals |
| **UI & Body Copy** | `Plus Jakarta Sans` (400, 500, 600, 700) | Navigation, paragraphs, forms, tables, metadata, buttons |
| **Devanagari Companion** | `Noto Serif Devanagari` (400, 500, 600) | Authentic Hindi/Sanskrit accents (`श्री महाकालेश्वर`, `उज्जैन दर्शन`) |

### Typographic Discipline
- Editorial uppercase eyebrows: `11px` (`text-[11px]`), `tracking-[0.22em]`, `font-semibold`, `text-gold` or `text-maroon`.
- Numeric consistency: `tabular-nums` applied on phone numbers, prices, itinerary numbers, and admin counters.
- Measure discipline: Long-form narratives constrained to `62ch–70ch` for effortless reading.

---

## 4. Architectural & Layout Principles

- **Zero-Pill Editorial Discipline:** Avoid cluttered rounded pill badges over photography. Use crisp architectural metadata rows, hairline borders (`border-sandstone`), subtle `2px`–`4px` structural radii (`rounded-sm`), and generous whitespace.
- **Photographic Integrity:** Destination images use `aspect-[16/10]` or `aspect-[4/3]` frames with soft warm tonal grading (`ResilientImage`) and high-contrast gradient scrims where typography overlaps.
- **Section Cadence:** Generous vertical rhythm (`py-16` to `py-24`) alternating between `bg-ivory`, `bg-limestone`, and occasional `bg-maroon-dark` anchor bands.
- **Responsive Grids:** Mobile-first single column expanding cleanly at `md:` (768px) and `lg:` (1024px) up to `max-w-7xl` (`1280px`) editorial container width.

---

## 5. Core Reusable Components

- `Header`: Sticky frosted-ivory bar (`bg-ivory/95 backdrop-blur-md`) with official wordmark, clean 6-item primary navigation, direct Call & WhatsApp actions, and accessible mobile drawer.
- `Footer`: Architectural dark maroon footer (`#1C0D0D`) with official emblem, curated navigation columns, official Mahakaleshwar temple portal link, and verified contact actions.
- `FloatingContactControls`: Desktop floating WhatsApp + Call rail and mobile bottom quick-action bar (`Call`, `WhatsApp`, `Plan Trip`) with `pb-20 md:pb-0` clearance so content is never obscured.
- `PackageCard`: Clean editorial card featuring destination photography, catalog label (`Reference Catalog` vs. `Proposed Custom Itinerary`), duration, starting point, `"Pricing available on request"` (or approved INR tariff), Compare toggle, and direct detail/enquiry actions.
- `CompareModal`: Side-by-side comparison drawer/modal for up to 3 selected journeys.
- `SpiritualCircuitMap`: Interactive Ujjain sacred-zone explorer plotting 10 real-coordinate Ujjain landmarks grouped by cluster (Central Rudra Sagar Core, Northern Shipra Bend, Southwestern Approach) with zone filters and walking/access notes.
- `ImageLightbox`: Keyboard-accessible (`Esc`, Arrow keys) gallery viewer for destination and package photography.
- `FaqAccordion`: Accessible disclosure panels with native `<button aria-expanded>` semantics.

---

## 6. Motion & Accessibility

- Subtle entrance transitions via `motion/react` using gentle opacity and short vertical offset (`12px–16px`).
- Global `@media (prefers-reduced-motion: reduce)` rule in `src/index.css` eliminates animations and transitions for motion-sensitive users.
- Visible `:focus-visible` maroon outline (`2px solid #7A0806`), skip-to-content link, semantic `<header>`, `<main>`, `<nav>`, `<article>`, and `<footer>` landmarks across every route.
