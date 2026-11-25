import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import {
  ArrowRight,
  ArrowUpRight,
  ChevronDown,
  MapPin,
  MessageCircle,
  Phone,
  ShieldCheck,
} from 'lucide-react';
import {
  BRAND,
  MEDIA,
  PACKAGE_CATEGORIES,
  UJJAIN_LANDMARKS,
  buildWhatsAppUrl,
} from '../data/brand.ts';
import { useSiteData } from '../context/SiteDataContext.tsx';
import { PackageCard } from '../components/PackageCard.tsx';
import { SpiritualCircuitMap } from '../components/SpiritualCircuitMap.tsx';
import { FaqAccordion } from '../components/FaqAccordion.tsx';
import { ResilientImage } from '../components/ResilientImage.tsx';
import { trackEvent, usePageSeo } from '../lib/seo.ts';

const STORY_CHAPTERS = [
  {
    number: '01',
    title: 'Before the City Awakens',
    subtitle: 'First Light Across the Shipra',
    body: 'Ujjain reveals its deepest character before midday traffic rises. Along the stone steps of Ram Ghat, temple bells echo across cool water, brass oil lamps catch the morning breeze, and priests prepare offerings in quiet continuity with centuries past.',
    image: MEDIA.ramGhatSteps,
  },
  {
    number: '02',
    title: 'The Sacred Presence of Mahakal',
    subtitle: 'Timeless Axis of Devotion',
    body: 'Enshrined facing south beside Rudra Sagar, Shri Mahakaleshwar Jyotirlinga draws seekers from every corner of India. Walking unhurriedly through the carved sandstone colonnades of Shri Mahakal Lok prepares the mind long before entering the inner sanctum.',
    image: MEDIA.mahakalCorridor,
  },
  {
    number: '03',
    title: 'Walking Through Centuries of Devotion',
    subtitle: 'Shakti, Wisdom & Astronomy',
    body: 'Beyond Mahakaleshwar unfolds a complete spiritual city: Harsiddhi Mata’s towering Maratha lamp pillars, Kal Bhairav guarding the northern river bend, Mangalnath marking ancient India’s prime meridian, and Krishna’s gurukul legacy at Sandipani Ashram.',
    image: MEDIA.harsiddhiTemple,
  },
  {
    number: '04',
    title: 'Along the Timeless Rivers',
    subtitle: 'From the Shipra to the Narmada',
    body: 'South of the Malwa plains, the Vindhya hills open onto the emerald waters of the Narmada—cradling Mandhata Island at Omkareshwar and Maharani Ahilyabai Holkar’s majestic riverfront fortress and ghats at Maheshwar.',
    image: MEDIA.omkareshwarIsland,
  },
  {
    number: '05',
    title: 'Beyond Ujjain',
    subtitle: 'Living Heritage of Madhya Pradesh',
    body: 'Extend a spiritual pilgrimage into an architectural and natural odyssey—from Mandu’s poetic hilltop palaces and Emperor Ashoka’s Great Stupa at Sanchi to the misty Satpura caves of Pachmarhi and the sacred Narmada source at Amarkantak.',
    image: MEDIA.sanchiStupa,
  },
];

export function HomePage() {
  const { packages, vehicles, articles, faqs, testimonials, loading } = useSiteData();
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [activeLandmarkIndex, setActiveLandmarkIndex] = useState<number>(0);
  const [activeChapterIndex, setActiveChapterIndex] = useState<number>(0);

  usePageSeo({
    title: 'My Ujjain Darshan — Beyond Darshan. A Journey Within.',
    description:
      'Thoughtfully curated spiritual journeys, Ujjain Darshan tours, Mahakaleshwar travel planning, Omkareshwar Jyotirlinga circuits, and private travel across Madhya Pradesh.',
    canonicalPath: '/',
  });

  const signaturePackage = useMemo(
    () => packages.find((p) => p.slug === 'ujjain-darshan') || packages[0],
    [packages]
  );

  const filteredPackages = useMemo(() => {
    if (activeCategory === 'all') return packages.slice(0, 9);
    return packages.filter((p) => p.category === activeCategory);
  }, [packages, activeCategory]);

  const activeLandmark = UJJAIN_LANDMARKS[activeLandmarkIndex] || UJJAIN_LANDMARKS[0];
  const activeChapter = STORY_CHAPTERS[activeChapterIndex] || STORY_CHAPTERS[0];

  return (
    <div>
      {/* =====================================================================
          SECTION 1 — CINEMATIC FULL-SCREEN HERO
      ===================================================================== */}
      <section className="relative min-h-[92vh] lg:min-h-screen flex items-end pb-16 sm:pb-24 pt-28 overflow-hidden bg-[#180B0B]">
        <motion.div
          initial={{ scale: 1.07, opacity: 0.85 }}
          animate={{ scale: 1.0, opacity: 1 }}
          transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0"
        >
          <ResilientImage
            src={MEDIA.mahakaleshwarTemple}
            alt="Shri Mahakaleshwar Jyotirlinga Temple shikhara illuminated at twilight in Ujjain, Madhya Pradesh"
            loading="eager"
            fetchPriority="high"
            sizes="100vw"
            className="w-full h-full object-cover"
          />
        </motion.div>

        {/* Measured architectural contrast scrim */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-[#160909]/92 via-[#160909]/50 to-[#160909]/30"
        />

        <div className="relative z-10 max-w-[1380px] mx-auto px-5 sm:px-8 w-full">
          <div className="max-w-3xl">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.1 }}
              className="font-devanagari text-sm sm:text-base text-[#F1CCA0] tracking-wide mb-3"
            >
              {BRAND.devanagariGreeting}
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="font-editorial text-[42px] sm:text-[58px] lg:text-[72px] font-medium text-white leading-[1.04] tracking-[-0.01em]"
            >
              Experience the Sacred Soul of Ujjain.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.35 }}
              className="mt-6 text-base sm:text-lg text-[#EAE2D6]/90 leading-relaxed max-w-2xl"
            >
              Thoughtfully curated spiritual journeys through ancient temples, timeless traditions, and the sacred heritage of Mahakal’s city—paired with calm private travel across Madhya Pradesh.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.48 }}
              className="mt-9 flex flex-wrap items-center gap-4"
            >
              <Link
                to="/ujjain-darshan"
                className="inline-flex items-center gap-2.5 px-7 py-3.5 bg-[#7A0806] hover:bg-[#580605] text-[#FBF8F3] text-sm font-semibold tracking-wide rounded-sm transition-colors whitespace-nowrap"
              >
                <span>Explore Sacred Journeys</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/plan-your-journey"
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-white/10 hover:bg-white/18 backdrop-blur-xs border border-white/30 text-white text-sm font-semibold tracking-wide rounded-sm transition-colors whitespace-nowrap"
              >
                <span>Plan Your Darshan</span>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.65 }}
              className="mt-10 pt-6 border-t border-white/15 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-[#DFD5C5]/85"
            >
              <span>Ujjain, Madhya Pradesh</span>
              <span aria-hidden="true">·</span>
              <span>Private Curated Pilgrimages & Airport Transfers</span>
              <span aria-hidden="true">·</span>
              <span className="tabular-nums">Direct Concierge {BRAND.phoneDisplay}</span>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <a
          href="#philosophy"
          aria-label="Scroll to brand introduction"
          className="hidden md:flex absolute bottom-8 right-8 z-10 flex-col items-center gap-2 text-white/70 hover:text-white transition-colors"
        >
          <span className="text-[11px] uppercase tracking-[0.2em] [writing-mode:vertical-rl]">
            Scroll
          </span>
          <ChevronDown className="w-4 h-4 animate-bounce" />
        </a>
      </section>

      {/* =====================================================================
          SECTION 2 — EDITORIAL INTRODUCTION TO MY UJJAIN DARSHAN
      ===================================================================== */}
      <section id="philosophy" className="py-20 sm:py-28 bg-[#FBF8F3]">
        <div className="max-w-[1380px] mx-auto px-5 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <div className="lg:col-span-6 space-y-6">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#7A0806]">
                {BRAND.tagline}
              </p>
              <h2 className="font-editorial text-4xl sm:text-5xl font-medium text-[#1F1A17] leading-[1.1]">
                Not Just a Destination. A Journey of Devotion.
              </h2>
              <div className="h-px w-16 bg-[#A68247]" aria-hidden="true" />
              <p className="text-[15.5px] text-[#4A413B] leading-[1.8]">
                A visit to Ujjain is rarely an ordinary holiday. Families travel across India carrying prayers, ancestral memories, and quiet anticipation—seeking the presence of Shri Mahakaleshwar and the serenity of the Shipra River.
              </p>
              <p className="text-[15.5px] text-[#4A413B] leading-[1.8]">
                My Ujjain Darshan was created to honor that intention. We plan private, comfortably paced itineraries rooted in authentic local geography—helping first-time visitors, multi-generational families, and senior pilgrims explore Ujjain’s temples, architecture, and surrounding Madhya Pradesh sanctuaries without confusion or haste.
              </p>
              <div className="pt-2 flex flex-wrap items-center gap-6">
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[#7A0806] hover:text-[#580605] border-b border-[#7A0806] pb-1"
                >
                  <span>Read Our Philosophy</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/destinations/ujjain"
                  className="inline-flex items-center gap-2 text-sm font-medium text-[#524942] hover:text-[#7A0806]"
                >
                  <span>Explore Ujjain Destination Guide</span>
                </Link>
              </div>
            </div>

            <div className="lg:col-span-6">
              <figure className="relative">
                <div className="aspect-[4/3] overflow-hidden bg-[#261211] shadow-[0_18px_40px_-18px_rgba(31,26,23,0.28)]">
                  <ResilientImage
                    src={MEDIA.heroRamGhat}
                    alt="Sunlit stone steps and riverfront shrines at Ram Ghat on the Shipra River in Ujjain"
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="w-full h-full object-cover"
                  />
                </div>
                <figcaption className="mt-3.5 flex items-center justify-between text-xs text-[#655C54]">
                  <span className="font-editorial italic text-sm">
                    Fig. 01 — Ram Ghat and riverside shrines along the sacred Shipra River
                  </span>
                  <span className="hidden sm:inline">Ujjain · Malwa Plateau</span>
                </figcaption>
              </figure>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 3 — FEATURED SIGNATURE EXPERIENCE: UJJAIN DARSHAN
      ===================================================================== */}
      {signaturePackage && (
        <section className="py-20 sm:py-28 bg-[#F3EDE3] border-y border-[#E5DCD0]">
          <div className="max-w-[1380px] mx-auto px-5 sm:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#7A0806]">
                  Signature Experience
                </p>
                <h2 className="font-editorial text-4xl sm:text-5xl font-medium text-[#1F1A17] mt-2">
                  The Ujjain Darshan Sacred Circuit
                </h2>
              </div>
              <Link
                to="/ujjain-darshan"
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#7A0806] hover:text-[#580605] whitespace-nowrap"
              >
                <span>View Complete Flagship Guide</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="bg-white border border-[#E5DCD0] shadow-[0_14px_36px_-18px_rgba(31,26,23,0.14)] grid grid-cols-1 lg:grid-cols-12 items-stretch">
              <div className="lg:col-span-6 relative min-h-[340px] lg:min-h-full bg-[#241010]">
                <ResilientImage
                  src={MEDIA.harsiddhiTemple}
                  alt="Vermilion Nagara shikhara of Harsiddhi Mata Temple in Ujjain, Madhya Pradesh"
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="w-full h-full lg:absolute lg:inset-0 object-cover"
                />
              </div>

              <div className="lg:col-span-6 p-7 sm:p-11 flex flex-col justify-between space-y-7">
                <div className="space-y-4">
                  <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs text-[#655C54]">
                    <span>{signaturePackage.duration}</span>
                    <span aria-hidden="true">·</span>
                    <span>Private Vehicle Circuit</span>
                    <span aria-hidden="true">·</span>
                    <span>Customizable for Families & Elders</span>
                  </div>

                  <h3 className="font-editorial text-3xl sm:text-4xl font-medium text-[#1F1A17]">
                    {signaturePackage.subtitle}
                  </h3>

                  <p className="text-sm sm:text-[15px] text-[#4A413B] leading-relaxed">
                    {signaturePackage.summary}
                  </p>
                </div>

                {/* Suggested 4-Segment Preview */}
                <div className="border-t border-[#EFE8DC] pt-6">
                  <h4 className="text-xs font-semibold uppercase tracking-widest text-[#7A0806] mb-4">
                    Suggested Day Sequence
                  </h4>
                  <ol className="space-y-3 text-sm">
                    {signaturePackage.itinerary.map((step, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="font-editorial text-lg text-[#A68247] leading-tight tabular-nums">
                          0{i + 1}
                        </span>
                        <div>
                          <div className="font-semibold text-[#1F1A17]">{step.title}</div>
                          <div className="text-xs text-[#655C54] mt-0.5">{step.summary}</div>
                        </div>
                      </li>
                    ))}
                  </ol>
                </div>

                <div className="border-t border-[#EFE8DC] pt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <div className="text-[11px] uppercase tracking-wider text-[#7A6F65]">
                      Quotation Status
                    </div>
                    <div className="text-base font-semibold text-[#1F1A17]">
                      {signaturePackage.publicPriceLabel}
                    </div>
                  </div>
                  <div className="flex flex-wrap items-center gap-3">
                    <Link
                      to="/ujjain-darshan"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-[#7A0806] hover:bg-[#580605] text-white text-xs font-semibold tracking-wide rounded-sm transition-colors"
                    >
                      <span>Explore Ujjain Darshan</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                    <Link
                      to="/plan-your-journey?package=ujjain-darshan"
                      className="inline-flex items-center px-5 py-3 border border-[#D4C7B5] hover:border-[#7A0806] text-[#1F1A17] text-xs font-semibold rounded-sm transition-colors"
                    >
                      Request Quote
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* =====================================================================
          SECTION 4 — EXPLORE ALL JOURNEYS (INTERACTIVE FILTERABLE CATALOG)
      ===================================================================== */}
      <section className="py-20 sm:py-28 bg-[#FBF8F3]">
        <div className="max-w-[1380px] mx-auto px-5 sm:px-8">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#7A0806]">
                Curated Catalog
              </p>
              <h2 className="font-editorial text-4xl sm:text-5xl font-medium text-[#1F1A17] mt-2">
                Explore Sacred & Heritage Journeys
              </h2>
              <p className="text-sm sm:text-[15px] text-[#574F48] mt-3 leading-relaxed">
                From direct Indore Airport transfers and local Ujjain Darshan to Jyotirlinga circuits across Omkareshwar, Maheshwar, Mandu, Sanchi, and the Satpura hills.
              </p>
            </div>
            <Link
              to="/packages"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#7A0806] hover:text-[#580605] whitespace-nowrap"
            >
              <span>Browse All {packages.length} Packages</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Interactive Category Filter Tabs */}
          <div
            role="tablist"
            aria-label="Filter journey packages by category"
            className="flex items-center gap-1.5 overflow-x-auto pb-3 mb-10 border-b border-[#E5DCD0]"
          >
            {PACKAGE_CATEGORIES.map((cat) => {
              const active = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => {
                    setActiveCategory(cat.id);
                    trackEvent('package_filter_change', { category: cat.id });
                  }}
                  className={`px-4 py-2 text-xs font-semibold rounded-sm transition-colors whitespace-nowrap shrink-0 ${
                    active
                      ? 'bg-[#7A0806] text-[#FBF8F3]'
                      : 'text-[#524942] hover:bg-[#EFE8DC] hover:text-[#1F1A17]'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <div
                  key={n}
                  className="bg-white border border-[#E5DCD0] h-[440px] animate-pulse"
                />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
              {filteredPackages.map((pkg) => (
                <PackageCard key={pkg.slug} pkg={pkg} />
              ))}
            </div>
          )}

          <div className="mt-12 text-center">
            <Link
              to="/packages"
              className="inline-flex items-center gap-2.5 px-7 py-3.5 border border-[#7A0806] text-[#7A0806] hover:bg-[#7A0806] hover:text-white text-xs font-semibold tracking-wider uppercase rounded-sm transition-colors"
            >
              <span>View Complete Catalog & Filters</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 5 — THE TEN SACRED LANDMARKS OF UJJAIN
      ===================================================================== */}
      <section className="py-20 sm:py-28 bg-[#F3EDE3] border-t border-[#E5DCD0]">
        <div className="max-w-[1380px] mx-auto px-5 sm:px-8">
          <div className="max-w-2xl mb-12">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#7A0806]">
              Sacred Landmarks of Ujjain
            </p>
            <h2 className="font-editorial text-4xl sm:text-5xl font-medium text-[#1F1A17] mt-2">
              Ten Sanctuaries That Shape Ancient Avanti
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Editorial Landmark Index List */}
            <div className="lg:col-span-5 divide-y divide-[#E2D8C8] border-y border-[#E2D8C8]">
              {UJJAIN_LANDMARKS.map((lm, idx) => {
                const active = idx === activeLandmarkIndex;
                return (
                  <button
                    key={lm.id}
                    type="button"
                    onClick={() => setActiveLandmarkIndex(idx)}
                    className={`w-full py-3.5 px-3 text-left flex items-center justify-between gap-4 transition-colors ${
                      active
                        ? 'bg-white text-[#7A0806]'
                        : 'hover:bg-white/60 text-[#2B2420]'
                    }`}
                  >
                    <div className="flex items-baseline gap-3.5 min-w-0">
                      <span className="font-editorial text-lg text-[#A68247] tabular-nums shrink-0">
                        {String(lm.order).padStart(2, '0')}
                      </span>
                      <div className="truncate">
                        <span className="font-editorial text-xl font-medium block truncate">
                          {lm.name}
                        </span>
                        <span className="text-[11.5px] text-[#655C54]">{lm.zone}</span>
                      </div>
                    </div>
                    <ArrowRight
                      className={`w-4 h-4 shrink-0 transition-transform ${
                        active ? 'text-[#7A0806] translate-x-0.5' : 'text-[#A09487]'
                      }`}
                    />
                  </button>
                );
              })}
            </div>

            {/* Active Landmark Editorial Feature Card */}
            <div className="lg:col-span-7 bg-white border border-[#E5DCD0] shadow-[0_12px_30px_-16px_rgba(31,26,23,0.12)]">
              <div className="aspect-[16/10] overflow-hidden bg-[#241010]">
                <ResilientImage
                  src={activeLandmark.image}
                  alt={activeLandmark.name}
                  sizes="(min-width: 1024px) 58vw, 100vw"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="px-4 py-2 bg-[#F7F2E9] text-[10px] text-[#655C54] text-right">
                <a
                  href={activeLandmark.photoSourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline underline-offset-2 hover:text-[#7A0806]"
                >
                  Photo: {activeLandmark.photoCredit}
                </a>
              </div>
              <div className="p-7 sm:p-9 space-y-5">
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-[#655C54]">
                  <span>
                    Landmark {String(activeLandmark.order).padStart(2, '0')} of 10 · {activeLandmark.zone}
                  </span>
                  <span className="font-devanagari text-sm text-[#7A0806]">
                    {activeLandmark.devanagari}
                  </span>
                </div>

                <div>
                  <h3 className="font-editorial text-3xl sm:text-4xl font-medium text-[#1F1A17]">
                    {activeLandmark.name}
                  </h3>
                  <p className="font-editorial italic text-lg text-[#7A0806] mt-1">
                    {activeLandmark.shortTitle}
                  </p>
                </div>

                <p className="text-[15px] text-[#4A413B] leading-relaxed">
                  {activeLandmark.summary}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-[#EFE8DC] text-xs leading-relaxed text-[#574F48]">
                  <div>
                    <div className="font-semibold uppercase tracking-wider text-[#1F1A17] mb-1.5">
                      Historical & Spiritual Context
                    </div>
                    <p>{activeLandmark.heritageNote}</p>
                  </div>
                  <div>
                    <div className="font-semibold uppercase tracking-wider text-[#1F1A17] mb-1.5">
                      Visitor Guidance
                    </div>
                    <p>{activeLandmark.visitorGuidance}</p>
                  </div>
                </div>

                <div className="pt-4 flex flex-wrap items-center gap-4">
                  <Link
                    to="/destinations/ujjain"
                    className="inline-flex items-center gap-2 text-xs font-semibold text-[#7A0806] hover:underline"
                  >
                    <span>Read Full Ujjain Destination Guide</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                  <Link
                    to={`/plan-your-journey?temple=${encodeURIComponent(activeLandmark.name)}`}
                    className="inline-flex items-center gap-2 text-xs font-semibold text-[#2B2420] hover:text-[#7A0806]"
                  >
                    <span>Add to Personalized Itinerary</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 6 — INTERACTIVE SPIRITUAL CIRCUIT MAP
      ===================================================================== */}
      <section className="py-20 sm:py-28 bg-[#FBF8F3]">
        <div className="max-w-[1380px] mx-auto px-5 sm:px-8">
          <SpiritualCircuitMap />
        </div>
      </section>

      {/* =====================================================================
          SECTION 7 — THE EXPERIENCE, NOT JUST THE ITINERARY (STORYTELLING)
      ===================================================================== */}
      <section className="py-20 sm:py-28 bg-[#1E0E0E] text-[#F2EAE0]">
        <div className="max-w-[1380px] mx-auto px-5 sm:px-8">
          <div className="max-w-2xl mb-14">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#D9A760]">
              The Experience, Not Just the Itinerary
            </p>
            <h2 className="font-editorial text-4xl sm:text-5xl font-medium text-white mt-2">
              Five Chapters of a Sacred Journey
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-5 space-y-2">
              {STORY_CHAPTERS.map((chap, idx) => {
                const active = idx === activeChapterIndex;
                return (
                  <button
                    key={chap.number}
                    type="button"
                    onClick={() => setActiveChapterIndex(idx)}
                    className={`w-full text-left p-5 border transition-colors ${
                      active
                        ? 'bg-white/8 border-[#D9A760]/60 text-white'
                        : 'bg-transparent border-white/10 text-[#C8BDB1] hover:border-white/25 hover:text-white'
                    }`}
                  >
                    <div className="flex items-baseline gap-4">
                      <span className="font-editorial text-xl text-[#D9A760] tabular-nums">
                        {chap.number}
                      </span>
                      <div>
                        <div className="font-editorial text-2xl font-medium">
                          {chap.title}
                        </div>
                        <div className="text-xs text-[#C8BDB1]/80 mt-0.5">
                          {chap.subtitle}
                        </div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="lg:col-span-7 space-y-6">
              <div className="aspect-[16/10] overflow-hidden bg-black/40 border border-white/10">
                <ResilientImage
                  src={activeChapter.image}
                  alt={activeChapter.title}
                  sizes="(min-width: 1024px) 58vw, 100vw"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="max-w-2xl space-y-3">
                <div className="text-xs uppercase tracking-widest text-[#D9A760]">
                  Chapter {activeChapter.number} · {activeChapter.subtitle}
                </div>
                <h3 className="font-editorial text-3xl sm:text-4xl font-medium text-white">
                  {activeChapter.title}
                </h3>
                <p className="text-[15.5px] text-[#DFD5C8] leading-[1.8]">
                  {activeChapter.body}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 8 — WHY TRAVEL WITH US
      ===================================================================== */}
      <section className="py-20 sm:py-28 bg-[#FBF8F3]">
        <div className="max-w-[1380px] mx-auto px-5 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-4 space-y-4">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#7A0806]">
                Why My Ujjain Darshan
              </p>
              <h2 className="font-editorial text-4xl sm:text-5xl font-medium text-[#1F1A17] leading-[1.1]">
                Grounded Local Care, Transparent Planning
              </h2>
              <p className="text-sm text-[#574F48] leading-relaxed">
                We focus on clarity, comfort, and respectful honesty—never inflated promises or opaque temple claims.
              </p>
            </div>

            <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-8">
              {[
                {
                  num: '01',
                  title: 'Cluster-Smart Ujjain Sequencing',
                  desc: 'Routes follow Ujjain’s real temple geography and pedestrian-zone drop points, reducing unnecessary city crisscrossing.',
                },
                {
                  num: '02',
                  title: 'Family & Senior-Conscious Pacing',
                  desc: 'Midday rest breaks, minimal-walking shrine order, and spacious seating recommendations tailored around elderly parents.',
                },
                {
                  num: '03',
                  title: 'Transparent Quotation Process',
                  desc: 'Every trip receives a clear written quote confirming vehicle category, inclusions, and exclusions before you commit.',
                },
                {
                  num: '04',
                  title: 'Direct WhatsApp & Phone Access',
                  desc: 'Speak directly with our Ujjain planning team on +91 95222 33375 without automated call centers or hidden middlemen.',
                },
                {
                  num: '05',
                  title: 'Honest Temple Administration Clarity',
                  desc: 'We distinguish private sightseeing logistics from official Mahakaleshwar temple trust bookings and direct you to official portals.',
                },
                {
                  num: '06',
                  title: 'Flexible Madhya Pradesh Connections',
                  desc: 'Extend effortlessly from Indore Airport and Ujjain to Omkareshwar, Maheshwar, Mandu, Dewas, Sanchi, and Pachmarhi.',
                },
              ].map((item) => (
                <div key={item.num} className="pt-5 border-t border-[#E2D8C8]">
                  <span className="font-editorial text-xl text-[#A68247] tabular-nums">
                    {item.num}
                  </span>
                  <h3 className="font-editorial text-2xl font-medium text-[#1F1A17] mt-1.5">
                    {item.title}
                  </h3>
                  <p className="text-sm text-[#574F48] leading-relaxed mt-2">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 9 — CURATED VEHICLE EXPERIENCE
      ===================================================================== */}
      <section className="py-20 sm:py-28 bg-[#F3EDE3] border-y border-[#E5DCD0]">
        <div className="max-w-[1380px] mx-auto px-5 sm:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#7A0806]">
                Private Transportation
              </p>
              <h2 className="font-editorial text-4xl sm:text-5xl font-medium text-[#1F1A17] mt-2">
                Curated Vehicle Options for Every Group
              </h2>
              <p className="text-sm text-[#574F48] mt-3 leading-relaxed">
                Vehicle categories are confirmed individually at the time of quotation based on your group size, luggage volume, and travel dates.
              </p>
            </div>
            <Link
              to="/our-fleet"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#7A0806] hover:text-[#580605] whitespace-nowrap"
            >
              <span>View Full Fleet Guide</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {vehicles.map((veh) => (
              <div
                key={veh.slug}
                className="group bg-white border border-[#E5DCD0] hover:border-[#C9B9A3] transition-all duration-300 hover:shadow-[0_12px_28px_-12px_rgba(31,26,23,0.12)] flex flex-col justify-between"
              >
                <div>
                  <div className="aspect-[16/10] overflow-hidden bg-[#F4EFE7] border-b border-[#EFE8DC]">
                    <ResilientImage
                      src={veh.image}
                      alt={`${veh.modelName} — ${veh.category}`}
                      sizes="(min-width: 1024px) 25vw, (min-width: 768px) 50vw, 100vw"
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                    />
                  </div>
                  <div className="p-6 space-y-3">
                    <div className="text-[11px] uppercase tracking-widest text-[#7A0806]">
                      {veh.category}
                    </div>
                    <h3 className="font-editorial text-2xl font-medium text-[#1F1A17]">
                      {veh.modelName}
                    </h3>
                    <p className="text-xs text-[#574F48] leading-relaxed">
                      {veh.description}
                    </p>
                    <dl className="pt-3 border-t border-[#EFE8DC] space-y-1.5 text-xs">
                      <div className="flex justify-between gap-2">
                        <dt className="text-[#7A6F65]">Seating</dt>
                        <dd className="text-[#1F1A17] text-right font-medium">
                          {veh.capacityLabel.split('(')[0].trim()}
                        </dd>
                      </div>
                      <div className="flex justify-between gap-2">
                        <dt className="text-[#7A6F65]">Luggage</dt>
                        <dd className="text-[#1F1A17] text-right">
                          {veh.luggageLabel}
                        </dd>
                      </div>
                      <div className="flex justify-between gap-2">
                        <dt className="text-[#7A6F65]">Climate</dt>
                        <dd className="text-[#1F1A17] text-right">
                          {veh.acStatus.split('(')[0].trim()}
                        </dd>
                      </div>
                    </dl>
                  </div>
                </div>
                <div className="px-6 pb-6">
                  <Link
                    to={`/plan-your-journey?vehicle=${encodeURIComponent(veh.modelName)}`}
                    className="block w-full text-center py-2.5 px-4 border border-[#7A0806] text-[#7A0806] hover:bg-[#7A0806] hover:text-white text-xs font-semibold rounded-sm transition-colors"
                  >
                    Request Vehicle Quote
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 10 — HOW YOUR JOURNEY BEGINS (4-STEP BOOKING MODEL)
      ===================================================================== */}
      <section className="py-20 sm:py-28 bg-[#FBF8F3]">
        <div className="max-w-[1380px] mx-auto px-5 sm:px-8">
          <div className="max-w-2xl mb-14">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#7A0806]">
              Simple Enquiry Process
            </p>
            <h2 className="font-editorial text-4xl sm:text-5xl font-medium text-[#1F1A17] mt-2">
              How Your Journey Begins
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                step: '01',
                title: 'Explore Destinations',
                desc: 'Browse our Ujjain Darshan guide, Jyotirlinga circuits, and regional heritage routes to see what resonates with your family.',
              },
              {
                step: '02',
                title: 'Share Your Dates & Pace',
                desc: 'Use our multi-step Trip Planner or WhatsApp to share arrival dates, traveler count, pickup hub, and comfort preferences.',
              },
              {
                step: '03',
                title: 'Receive Tailored Quote',
                desc: 'Our Ujjain team prepares a clear, customized itinerary and written quotation specifying vehicle class and exact inclusions.',
              },
              {
                step: '04',
                title: 'Confirm With Our Team',
                desc: 'Once every detail feels right, confirm your travel plan directly with our team and receive driver coordination ahead of arrival.',
              },
            ].map((item) => (
              <div key={item.step} className="bg-white border border-[#E5DCD0] p-7">
                <div className="font-editorial text-4xl text-[#A68247] tabular-nums mb-4">
                  {item.step}
                </div>
                <h3 className="font-editorial text-2xl font-medium text-[#1F1A17]">
                  {item.title}
                </h3>
                <p className="text-sm text-[#574F48] leading-relaxed mt-2.5">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 11 — TRAVEL JOURNAL (EDITORIAL MAGAZINE)
      ===================================================================== */}
      {articles.length > 0 && (
        <section className="py-20 sm:py-28 bg-[#F3EDE3] border-t border-[#E5DCD0]">
          <div className="max-w-[1380px] mx-auto px-5 sm:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#7A0806]">
                  Travel Journal
                </p>
                <h2 className="font-editorial text-4xl sm:text-5xl font-medium text-[#1F1A17] mt-2">
                  Essays & Practical Pilgrimage Guides
                </h2>
              </div>
              <Link
                to="/travel-journal"
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#7A0806] hover:text-[#580605] whitespace-nowrap"
              >
                <span>Read All Articles</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* 3-Tier Editorial Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Lead Article */}
              <article className="lg:col-span-7 bg-white border border-[#E5DCD0] group flex flex-col justify-between">
                <Link
                  to={`/travel-journal/${articles[0].slug}`}
                  className="block aspect-[16/10] overflow-hidden bg-[#261211]"
                >
                  <ResilientImage
                    src={articles[0].coverImage}
                    alt={articles[0].title}
                    sizes="(min-width: 1024px) 58vw, 100vw"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                </Link>
                <div className="p-7 sm:p-9">
                  <div className="text-xs text-[#655C54] mb-2">
                    <span>{articles[0].category}</span>
                    <span className="mx-2" aria-hidden="true">·</span>
                    <span>{articles[0].readTime}</span>
                    <span className="mx-2" aria-hidden="true">·</span>
                    <span>{articles[0].publishedDate}</span>
                  </div>
                  <Link to={`/travel-journal/${articles[0].slug}`}>
                    <h3 className="font-editorial text-3xl sm:text-4xl font-medium text-[#1F1A17] group-hover:text-[#7A0806] transition-colors">
                      {articles[0].title}
                    </h3>
                  </Link>
                  <p className="text-sm sm:text-[15px] text-[#574F48] leading-relaxed mt-3">
                    {articles[0].excerpt}
                  </p>
                  <Link
                    to={`/travel-journal/${articles[0].slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#7A0806] mt-5 hover:underline"
                  >
                    <span>Continue Reading</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </article>

              {/* Secondary Articles Column */}
              <div className="lg:col-span-5 divide-y divide-[#DFD5C6] border-y border-[#DFD5C6] flex flex-col justify-between">
                {articles.slice(1, 5).map((art) => (
                  <article key={art.slug} className="py-5 first:pt-2 last:pb-2 group">
                    <div className="text-xs text-[#655C54] mb-1.5">
                      <span>{art.category}</span>
                      <span className="mx-2" aria-hidden="true">·</span>
                      <span>{art.readTime}</span>
                    </div>
                    <Link to={`/travel-journal/${art.slug}`}>
                      <h3 className="font-editorial text-2xl font-medium text-[#1F1A17] group-hover:text-[#7A0806] transition-colors leading-snug">
                        {art.title}
                      </h3>
                    </Link>
                    <p className="text-xs text-[#574F48] leading-relaxed mt-2 line-clamp-2">
                      {art.excerpt}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* =====================================================================
          SECTION 12 — VERIFIED GUEST REFLECTIONS (ZERO FABRICATION)
      ===================================================================== */}
      <section className="py-20 bg-[#FBF8F3] border-t border-[#E5DCD0]">
        <div className="max-w-[1380px] mx-auto px-5 sm:px-8">
          {testimonials.length > 0 ? (
            <div>
              <div className="max-w-2xl mb-12">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#7A0806]">
                  Verified Guest Reflections
                </p>
                <h2 className="font-editorial text-4xl sm:text-5xl font-medium text-[#1F1A17] mt-2">
                  Words From Fellow Pilgrims
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
                {testimonials.map((t) => (
                  <blockquote
                    key={t.id}
                    className="bg-white border border-[#E5DCD0] p-7 flex flex-col justify-between"
                  >
                    <p className="font-editorial italic text-xl text-[#1F1A17] leading-relaxed">
                      “{t.quote}”
                    </p>
                    <footer className="mt-6 pt-4 border-t border-[#EFE8DC] text-xs text-[#655C54]">
                      <div className="font-semibold text-[#1F1A17]">{t.guestName}</div>
                      <div className="mt-0.5">
                        {t.originCity} · {t.journeyTitle}
                      </div>
                      <div className="text-[11px] text-[#8B8075] mt-1">
                        Verified via {t.verifiedSource}
                      </div>
                    </footer>
                  </blockquote>
                ))}
              </div>
            </div>
          ) : (
            <div className="bg-white border border-[#E5DCD0] p-8 sm:p-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="max-w-2xl space-y-2">
                <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#7A0806]">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Verified Reviews Policy</span>
                </div>
                <h2 className="font-editorial text-3xl sm:text-4xl font-medium text-[#1F1A17]">
                  Authentic Guest Reviews Only
                </h2>
                <p className="text-sm text-[#574F48] leading-relaxed">
                  We publish verified reflections submitted directly by real My Ujjain Darshan travelers rather than synthetic ratings. Completed a journey with us recently? We welcome your honest feedback via WhatsApp.
                </p>
              </div>
              <a
                href={buildWhatsAppUrl(
                  'Namaste! I recently traveled with My Ujjain Darshan and would like to share a verified review of my journey.'
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 border border-[#7A0806] text-[#7A0806] hover:bg-[#7A0806] hover:text-white text-xs font-semibold rounded-sm transition-colors whitespace-nowrap"
              >
                <span>Share Your Experience</span>
              </a>
            </div>
          )}
        </div>
      </section>

      {/* =====================================================================
          SECTION 13 — FREQUENTLY ASKED QUESTIONS
      ===================================================================== */}
      <section className="py-20 sm:py-28 bg-[#F3EDE3] border-t border-[#E5DCD0]">
        <div className="max-w-[1380px] mx-auto px-5 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-4 space-y-4">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#7A0806]">
                Clarity Before You Travel
              </p>
              <h2 className="font-editorial text-4xl sm:text-5xl font-medium text-[#1F1A17] leading-[1.1]">
                Frequently Asked Questions
              </h2>
              <p className="text-sm text-[#574F48] leading-relaxed">
                Practical guidance on Ujjain Darshan timing, airport pickups, custom family pacing, and official Mahakaleshwar temple administration.
              </p>
              <Link
                to="/faq"
                className="inline-flex items-center gap-2 text-xs font-semibold text-[#7A0806] pt-2 hover:underline"
              >
                <span>View All FAQs</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="lg:col-span-8">
              <FaqAccordion items={faqs.slice(0, 7)} />
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 14 — FINAL CONVERSION EXPERIENCE
      ===================================================================== */}
      <section className="relative py-24 sm:py-32 overflow-hidden bg-[#1D0C0C]">
        <div className="absolute inset-0">
          <ResilientImage
            src={MEDIA.maheshwarGhat}
            alt="Ahilya Fort sandstone ramparts and ceremonial ghats overlooking the Narmada River at Maheshwar"
            sizes="100vw"
            className="w-full h-full object-cover opacity-45"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#1A0909]/92 via-[#1A0909]/75 to-[#1A0909]/65" />
        </div>

        <div className="relative z-10 max-w-[1380px] mx-auto px-5 sm:px-8">
          <div className="max-w-2xl space-y-6">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#E6BE82]">
              Begin Planning Today
            </p>
            <h2 className="font-editorial text-4xl sm:text-6xl font-medium text-white leading-[1.08]">
              Your Journey to the Sacred Begins Here.
            </h2>
            <p className="text-base text-[#EAE2D6]/90 leading-relaxed">
              Tell us the journey you envision—whether a serene single-day Ujjain Darshan, an Indore Airport fly-in visit, or a multi-day Madhya Pradesh pilgrimage. We will help you plan an experience that feels meaningful, comfortable, and truly yours.
            </p>

            <div className="pt-3 flex flex-wrap items-center gap-4">
              <Link
                to="/plan-your-journey"
                className="inline-flex items-center gap-2.5 px-7 py-4 bg-[#7A0806] hover:bg-[#580605] text-white text-sm font-semibold rounded-sm transition-colors"
              >
                <span>Plan My Journey</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <a
                href={buildWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent('whatsapp_click', { source: 'final_cta' })}
                className="inline-flex items-center gap-2.5 px-7 py-4 bg-white/10 hover:bg-white/20 border border-white/30 text-white text-sm font-semibold rounded-sm transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Talk to Our Team</span>
              </a>

              <a
                href={BRAND.phoneHref}
                onClick={() => trackEvent('phone_click', { source: 'final_cta' })}
                className="inline-flex items-center gap-2 text-sm font-medium text-[#E6BE82] hover:text-white px-2 py-2"
              >
                <Phone className="w-4 h-4" />
                <span className="tabular-nums">{BRAND.phoneDisplay}</span>
              </a>
            </div>

            <div className="pt-4 flex items-center gap-2 text-xs text-[#D5C9BA]">
              <MapPin className="w-3.5 h-3.5 text-[#D9690A]" />
              <span>Serving pilgrims from {BRAND.location}</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
