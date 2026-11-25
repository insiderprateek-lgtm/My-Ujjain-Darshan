import React, { useEffect, useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import {
  ArrowRight,
  Bookmark,
  Check,
  ChevronDown,
  Clock,
  ExternalLink,
  Info,
  MapPin,
  MessageCircle,
  Phone,
  Scale,
  X,
} from 'lucide-react';
import {
  BRAND,
  buildPackageWhatsAppMessage,
  buildWhatsAppUrl,
} from '../data/brand.ts';
import { useSiteData } from '../context/SiteDataContext.tsx';
import { Breadcrumbs } from '../components/Breadcrumbs.tsx';
import { FaqAccordion } from '../components/FaqAccordion.tsx';
import { ImageLightbox } from '../components/ImageLightbox.tsx';
import { PackageCard } from '../components/PackageCard.tsx';
import { ResilientImage } from '../components/ResilientImage.tsx';
import { trackEvent, usePageSeo } from '../lib/seo.ts';
import type { PublicPackage } from '../types/models.ts';

export function PackageDetailPage({ forcedSlug }: { forcedSlug?: string }) {
  const params = useParams<{ slug: string }>();
  const activeSlug = forcedSlug || params.slug || '';

  // Canonical consolidation: redirect /packages/ujjain-darshan -> /ujjain-darshan
  if (!forcedSlug && params.slug === 'ujjain-darshan') {
    return <Navigate to="/ujjain-darshan" replace />;
  }

  const {
    packages,
    loading,
    savedSlugs,
    toggleSavedPackage,
    compareSlugs,
    toggleComparePackage,
    setWhatsappContextMessage,
    setHasStickyMobileBar,
  } = useSiteData();

  const [fetchedPkg, setFetchedPkg] = useState<PublicPackage | null>(null);
  const [fetching, setFetching] = useState(false);
  const [expandedSteps, setExpandedSteps] = useState<number[]>([0, 1]);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [quickDate, setQuickDate] = useState('');
  const [quickTravelers, setQuickTravelers] = useState('2 Adults');

  const pkgFromContext = packages.find((p) => p.slug === activeSlug) || null;
  const pkg = pkgFromContext || fetchedPkg;

  useEffect(() => {
    if (pkgFromContext || !activeSlug) return;
    setFetching(true);
    fetch(`/api/packages/${encodeURIComponent(activeSlug)}`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.package) setFetchedPkg(data.package);
      })
      .finally(() => setFetching(false));
  }, [activeSlug, pkgFromContext]);

  useEffect(() => {
    setHasStickyMobileBar(true);
    return () => setHasStickyMobileBar(false);
  }, [setHasStickyMobileBar]);

  useEffect(() => {
    if (!pkg) return;
    trackEvent('package_view', { package_slug: pkg.slug, package_name: pkg.name });
    setWhatsappContextMessage(
      buildPackageWhatsAppMessage({
        packageName: pkg.name,
        dates: quickDate || undefined,
        travelers: quickTravelers || undefined,
      })
    );
  }, [pkg, quickDate, quickTravelers, setWhatsappContextMessage]);

  usePageSeo({
    title: pkg ? pkg.seoTitle : 'Journey Details | My Ujjain Darshan',
    description: pkg
      ? pkg.seoDescription
      : 'Explore curated spiritual and heritage travel packages across Ujjain and Madhya Pradesh.',
    canonicalPath:
      activeSlug === 'ujjain-darshan'
        ? '/ujjain-darshan'
        : `/packages/${activeSlug}`,
    jsonLd: pkg
      ? {
          '@context': 'https://schema.org',
          '@type': 'TouristTrip',
          name: pkg.name,
          description: pkg.summary,
          provider: {
            '@type': 'TravelAgency',
            name: BRAND.name,
            telephone: '+919009336669',
          },
        }
      : null,
  });

  if (loading || fetching) {
    return (
      <div className="pt-32 pb-24 max-w-[1380px] mx-auto px-5 sm:px-8">
        <div className="h-96 bg-[#EFE8DC] animate-pulse" />
      </div>
    );
  }

  if (!pkg) {
    return (
      <div className="pt-36 pb-28 max-w-2xl mx-auto px-5 text-center space-y-5">
        <p className="text-xs uppercase tracking-widest text-[#7A0806]">
          Journey Not Found
        </p>
        <h1 className="font-editorial text-4xl sm:text-5xl text-[#1F1A17]">
          We Could Not Find That Package
        </h1>
        <p className="text-sm text-[#574F48]">
          The journey you requested may have moved or been updated. Explore our complete catalog or let us craft a custom itinerary for you.
        </p>
        <div className="flex items-center justify-center gap-4 pt-2">
          <Link
            to="/packages"
            className="px-6 py-3 bg-[#7A0806] text-white text-xs font-semibold rounded-sm"
          >
            View All Packages
          </Link>
          <Link
            to="/plan-your-journey"
            className="px-6 py-3 border border-[#D4C7B5] text-[#1F1A17] text-xs font-semibold rounded-sm"
          >
            Plan Custom Journey
          </Link>
        </div>
      </div>
    );
  }

  const isSaved = savedSlugs.includes(pkg.slug);
  const isCompared = compareSlugs.includes(pkg.slug);

  const toggleStep = (idx: number) => {
    setExpandedSteps((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
    );
  };

  const relatedPackages = packages
    .filter((p) => p.slug !== pkg.slug)
    .sort((a, b) => {
      const aMatch = a.category === pkg.category ? 1 : 0;
      const bMatch = b.category === pkg.category ? 1 : 0;
      return bMatch - aMatch;
    })
    .slice(0, 3);

  const waDirectHref = buildWhatsAppUrl(
    buildPackageWhatsAppMessage({
      packageName: pkg.name,
      dates: quickDate || undefined,
      travelers: quickTravelers || undefined,
      pickup: pkg.startingLocation,
    })
  );

  return (
    <div className="pb-20 lg:pb-0">
      {/* A. IMMERSIVE PACKAGE HERO */}
      <section className="relative min-h-[68vh] flex items-end pt-32 pb-14 bg-[#180A0A] overflow-hidden">
        <div className="absolute inset-0">
          <ResilientImage
            src={pkg.featuredImage}
            alt={pkg.name}
            loading="eager"
            fetchPriority="high"
            sizes="100vw"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#160808]/94 via-[#160808]/55 to-black/35" />
        </div>

        <div className="relative z-10 max-w-[1380px] mx-auto px-5 sm:px-8 w-full">
          <Breadcrumbs
            light
            items={[
              { label: 'Home', to: '/' },
              { label: 'Our Journeys', to: '/packages' },
              { label: pkg.name },
            ]}
          />

          <div className="mt-6 max-w-3xl space-y-4">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-[#F0CCA0]">
              <span>{pkg.duration}</span>
              <span aria-hidden="true">·</span>
              <span>{pkg.destinations.join(' · ')}</span>
              {pkg.catalogType === 'proposed-experience' && (
                <>
                  <span aria-hidden="true">·</span>
                  <span>Proposed Custom Itinerary</span>
                </>
              )}
            </div>

            <h1 className="font-editorial text-4xl sm:text-6xl font-medium text-white leading-[1.06]">
              {pkg.name}
            </h1>

            <p className="text-base sm:text-lg text-[#EAE2D6]/90 leading-relaxed">
              {pkg.subtitle}
            </p>

            <div className="pt-4 flex flex-wrap items-center gap-3.5">
              <Link
                to={`/plan-your-journey?package=${encodeURIComponent(pkg.slug)}`}
                onClick={() =>
                  trackEvent('package_enquiry_click', {
                    package_slug: pkg.slug,
                    source: 'package_hero',
                  })
                }
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#7A0806] hover:bg-[#580605] text-white text-sm font-semibold rounded-sm transition-colors"
              >
                <span>Request Custom Quote</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <a
                href={waDirectHref}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() =>
                  trackEvent('whatsapp_click', {
                    package_slug: pkg.slug,
                    source: 'package_hero',
                  })
                }
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-white/10 hover:bg-white/20 border border-white/30 text-white text-sm font-semibold rounded-sm transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Enquire on WhatsApp</span>
              </a>

              <button
                type="button"
                onClick={() => toggleSavedPackage(pkg.slug)}
                className="inline-flex items-center gap-2 px-4 py-3.5 border border-white/25 text-white/90 hover:bg-white/10 text-xs font-semibold rounded-sm transition-colors"
              >
                <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-current text-[#F0CCA0]' : ''}`} />
                <span>{isSaved ? 'Saved' : 'Save'}</span>
              </button>

              <button
                type="button"
                onClick={() => toggleComparePackage(pkg.slug)}
                className="inline-flex items-center gap-2 px-4 py-3.5 border border-white/25 text-white/90 hover:bg-white/10 text-xs font-semibold rounded-sm transition-colors"
              >
                <Scale className="w-4 h-4" />
                <span>{isCompared ? 'Comparing' : 'Compare'}</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* QUICK KEY-FACTS BAR */}
      <div className="bg-[#F3EDE3] border-b border-[#E5DCD0]">
        <div className="max-w-[1380px] mx-auto px-5 sm:px-8 py-5 grid grid-cols-2 lg:grid-cols-4 gap-6 text-sm">
          <div>
            <div className="text-[11px] uppercase tracking-wider text-[#655C54]">
              Duration
            </div>
            <div className="font-semibold text-[#1F1A17] mt-0.5">{pkg.duration}</div>
          </div>
          <div>
            <div className="text-[11px] uppercase tracking-wider text-[#655C54]">
              Starting Point
            </div>
            <div className="font-semibold text-[#1F1A17] mt-0.5">
              {pkg.startingLocation}
            </div>
          </div>
          <div>
            <div className="text-[11px] uppercase tracking-wider text-[#655C54]">
              Ending Point
            </div>
            <div className="font-semibold text-[#1F1A17] mt-0.5">
              {pkg.endingLocation}
            </div>
          </div>
          <div>
            <div className="text-[11px] uppercase tracking-wider text-[#655C54]">
              Pricing Status
            </div>
            <div className="font-semibold text-[#7A0806] mt-0.5 tabular-nums">
              {pkg.publicPriceLabel}
            </div>
          </div>
        </div>
      </div>

      {/* MAIN TWO-COLUMN EDITORIAL CONTENT + STICKY ENQUIRY PANEL */}
      <section className="py-16 sm:py-20 bg-[#FBF8F3]">
        <div className="max-w-[1380px] mx-auto px-5 sm:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* LEFT 8 COLUMNS: RICH EDITORIAL CONTENT */}
          <div className="lg:col-span-8 space-y-16">
            {/* B. Journey Overview */}
            <div className="space-y-5">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#7A0806]">
                Journey Overview
              </p>
              <h2 className="font-editorial text-3xl sm:text-4xl font-medium text-[#1F1A17]">
                About This Experience
              </h2>
              <div className="space-y-4 text-[15.5px] text-[#453D37] leading-[1.82] max-w-prose">
                {pkg.fullDescription.split('\n\n').map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>

              {pkg.catalogType === 'proposed-experience' && (
                <div className="p-5 bg-[#F3EDE3] border border-[#DFD4C4] text-xs text-[#4A413B] leading-relaxed flex items-start gap-3">
                  <Info className="w-4 h-4 text-[#7A0806] shrink-0 mt-0.5" />
                  <p>
                    <strong className="text-[#1F1A17]">Proposed Custom Itinerary:</strong>{' '}
                    This curated experience is arranged exclusively on personalized quotation. Final route sequence, vehicle assignment, and inclusions are confirmed directly in writing by My Ujjain Darshan.
                  </p>
                </div>
              )}
            </div>

            {/* E. Journey Highlights */}
            <div className="pt-10 border-t border-[#E5DCD0] space-y-5">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#7A0806]">
                Defining Moments
              </p>
              <h2 className="font-editorial text-3xl sm:text-4xl font-medium text-[#1F1A17]">
                Journey Highlights
              </h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {pkg.highlights.map((hl, idx) => (
                  <li
                    key={idx}
                    className="bg-white border border-[#E5DCD0] p-5 flex items-start gap-3 text-sm text-[#3A322C] leading-relaxed"
                  >
                    <Check className="w-4 h-4 text-[#7A0806] shrink-0 mt-1" />
                    <span>{hl}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* C. Interactive Detailed Itinerary Timeline */}
            <div className="pt-10 border-t border-[#E5DCD0] space-y-6">
              <div className="flex flex-wrap items-end justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#7A0806]">
                    Suggested Route Progression
                  </p>
                  <h2 className="font-editorial text-3xl sm:text-4xl font-medium text-[#1F1A17] mt-1">
                    Detailed Itinerary Timeline
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    setExpandedSteps(
                      expandedSteps.length === pkg.itinerary.length
                        ? []
                        : pkg.itinerary.map((_, i) => i)
                    )
                  }
                  className="text-xs font-semibold text-[#7A0806] hover:underline"
                >
                  {expandedSteps.length === pkg.itinerary.length
                    ? 'Collapse All Segments'
                    : 'Expand All Segments'}
                </button>
              </div>

              <div className="space-y-4">
                {pkg.itinerary.map((step, idx) => {
                  const open = expandedSteps.includes(idx);
                  return (
                    <div
                      key={idx}
                      className="bg-white border border-[#E5DCD0] transition-colors"
                    >
                      <button
                        type="button"
                        onClick={() => toggleStep(idx)}
                        aria-expanded={open}
                        className="w-full p-6 text-left flex items-start justify-between gap-4"
                      >
                        <div className="space-y-1">
                          <div className="text-xs font-medium text-[#7A0806]">
                            {step.segment}
                            {step.duration ? ` · ${step.duration}` : ''}
                          </div>
                          <h3 className="font-editorial text-2xl font-medium text-[#1F1A17]">
                            {step.title}
                          </h3>
                          <p className="text-xs text-[#655C54]">{step.summary}</p>
                        </div>
                        <ChevronDown
                          className={`w-5 h-5 text-[#7A0806] shrink-0 mt-1 transition-transform ${
                            open ? 'rotate-180' : ''
                          }`}
                        />
                      </button>

                      {open && (
                        <div className="px-6 pb-6 pt-2 border-t border-[#F0E9DE] space-y-3 text-sm text-[#4A413B] leading-relaxed">
                          <p>{step.details}</p>
                          {step.walkingNote && (
                            <p className="text-xs text-[#574F48] bg-[#FBF8F3] p-3 border border-[#EAE2D6]">
                              <strong className="text-[#1F1A17]">Walking & Accessibility:</strong>{' '}
                              {step.walkingNote}
                            </p>
                          )}
                          {step.visitorAdvice && (
                            <p className="text-xs text-[#574F48]">
                              <strong className="text-[#1F1A17]">Visitor Advice:</strong>{' '}
                              {step.visitorAdvice}
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Official Temple Administration Clarity Notice */}
              <div className="p-6 bg-[#F3EDE3] border border-[#E2D6C5] space-y-2 text-xs text-[#4A413B] leading-relaxed">
                <div className="font-semibold text-[#1F1A17] uppercase tracking-wider">
                  Important Note on Temple Timings & Official Bookings
                </div>
                <p>
                  Temple darshan rules, ritual schedules, and Shri Mahakaleshwar Bhasma Aarti permissions are administered exclusively by respective official temple trusts. My Ujjain Darshan does not sell, guarantee, or intermediate expedited VIP temple access.
                </p>
                <a
                  href={BRAND.officialTemplePortal}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 font-semibold text-[#7A0806] hover:underline pt-1"
                >
                  <span>Visit Official Shri Mahakaleshwar Temple Portal</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            {/* D. Places Covered */}
            {pkg.placesCovered.length > 0 && (
              <div className="pt-10 border-t border-[#E5DCD0] space-y-6">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#7A0806]">
                    Sacred & Cultural Stops
                  </p>
                  <h2 className="font-editorial text-3xl sm:text-4xl font-medium text-[#1F1A17] mt-1">
                    Places Covered
                  </h2>
                </div>

                <div className="space-y-6">
                  {pkg.placesCovered.map((place, idx) => (
                    <div
                      key={idx}
                      className="bg-white border border-[#E5DCD0] grid grid-cols-1 sm:grid-cols-12 items-stretch"
                    >
                      <div className="sm:col-span-4 aspect-[4/3] sm:aspect-auto bg-[#261211]">
                        <ResilientImage
                          src={place.image}
                          alt={place.name}
                          sizes="(min-width: 640px) 28vw, 100vw"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="sm:col-span-8 p-6 space-y-2.5">
                        <div className="flex items-center justify-between gap-2">
                          <h3 className="font-editorial text-2xl font-medium text-[#1F1A17]">
                            {place.name}
                          </h3>
                          {place.recommendedDuration && (
                            <span className="text-xs text-[#655C54] inline-flex items-center gap-1 whitespace-nowrap">
                              <Clock className="w-3.5 h-3.5 text-[#7A0806]" />
                              {place.recommendedDuration}
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-[#4A413B] leading-relaxed">
                          {place.significance}
                        </p>
                        <p className="text-xs text-[#655C54]">
                          <strong className="text-[#1F1A17]">Highlights:</strong>{' '}
                          {place.highlights}
                        </p>
                        <p className="text-xs text-[#655C54]">
                          <strong className="text-[#1F1A17]">Practical Note:</strong>{' '}
                          {place.visitNote}
                        </p>
                        {place.slug && (
                          <div className="pt-1">
                            <Link
                              to={`/destinations/${place.slug}`}
                              className="inline-flex items-center gap-1 text-xs font-semibold text-[#7A0806] hover:underline"
                            >
                              <span>Read {place.slug.charAt(0).toUpperCase() + place.slug.slice(1)} Destination Guide</span>
                              <ArrowRight className="w-3 h-3" />
                            </Link>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* F. Inclusions & Exclusions */}
            <div className="pt-10 border-t border-[#E5DCD0] space-y-6">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#7A0806]">
                  Complete Transparency
                </p>
                <h2 className="font-editorial text-3xl sm:text-4xl font-medium text-[#1F1A17] mt-1">
                  Inclusions & Exclusions
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white border border-[#E5DCD0] p-6 space-y-4">
                  <h3 className="font-editorial text-2xl font-medium text-[#1F1A17]">
                    Inclusions (Confirmed on Quote)
                  </h3>
                  <ul className="space-y-3 text-sm text-[#4A413B]">
                    {pkg.inclusions.map((inc, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <Check className="w-4 h-4 text-[#1B6E41] shrink-0 mt-1" />
                        <div>
                          <span>{inc.item}</span>
                          {inc.status === 'pending-operator-approval' && (
                            <span className="block text-[11px] text-[#7A6F65] mt-0.5">
                              Confirmed in written quotation
                            </span>
                          )}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-white border border-[#E5DCD0] p-6 space-y-4">
                  <h3 className="font-editorial text-2xl font-medium text-[#1F1A17]">
                    Not Included Unless Requested
                  </h3>
                  <ul className="space-y-3 text-sm text-[#4A413B]">
                    {pkg.exclusions.map((exc, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <X className="w-4 h-4 text-[#8C2B27] shrink-0 mt-1" />
                        <span>{exc}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* G. Travel Information */}
            <div className="pt-10 border-t border-[#E5DCD0] space-y-5">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#7A0806]">
                Practical Planning
              </p>
              <h2 className="font-editorial text-3xl sm:text-4xl font-medium text-[#1F1A17]">
                Essential Travel Information
              </h2>

              <dl className="bg-white border border-[#E5DCD0] divide-y divide-[#EFE8DC] text-sm">
                <div className="p-5 grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <dt className="font-semibold text-[#1F1A17]">Best Season</dt>
                  <dd className="sm:col-span-2 text-[#4A413B]">
                    {pkg.travelInfo.bestSeason}
                  </dd>
                </div>
                <div className="p-5 grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <dt className="font-semibold text-[#1F1A17]">Departure Planning</dt>
                  <dd className="sm:col-span-2 text-[#4A413B]">
                    {pkg.travelInfo.departureGuidance}
                  </dd>
                </div>
                <div className="p-5 grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <dt className="font-semibold text-[#1F1A17]">Suitable Vehicles</dt>
                  <dd className="sm:col-span-2 text-[#4A413B]">
                    {pkg.travelInfo.suitableVehicles.join(' · ')}
                  </dd>
                </div>
                <div className="p-5 grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <dt className="font-semibold text-[#1F1A17]">
                    Family & Senior Guidance
                  </dt>
                  <dd className="sm:col-span-2 text-[#4A413B]">
                    {pkg.travelInfo.familySeniorNote}
                  </dd>
                </div>
                <div className="p-5 grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <dt className="font-semibold text-[#1F1A17]">Route Coverage</dt>
                  <dd className="sm:col-span-2 text-[#4A413B]">
                    {pkg.travelInfo.coverageNote}
                  </dd>
                </div>
              </dl>
            </div>

            {/* I. Photo Gallery with Lightbox */}
            {pkg.gallery.length > 0 && (
              <div className="pt-10 border-t border-[#E5DCD0] space-y-6">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#7A0806]">
                    Visual Impressions
                  </p>
                  <h2 className="font-editorial text-3xl sm:text-4xl font-medium text-[#1F1A17] mt-1">
                    Destination Gallery
                  </h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {pkg.gallery.map((item, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setLightboxIndex(idx)}
                      className="group text-left bg-white border border-[#E5DCD0] overflow-hidden focus-visible:ring-2 focus-visible:ring-[#7A0806]"
                    >
                      <div className="aspect-[4/3] overflow-hidden bg-[#261211]">
                        <ResilientImage
                          src={item.url}
                          alt={item.alt}
                          sizes="(min-width: 768px) 26vw, (min-width: 640px) 50vw, 100vw"
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                      <p className="p-3 text-xs text-[#574F48] line-clamp-2">
                        {item.caption}
                      </p>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* J. Package-Specific FAQs */}
            {pkg.faqs.length > 0 && (
              <div className="pt-10 border-t border-[#E5DCD0] space-y-6">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#7A0806]">
                    Journey Questions
                  </p>
                  <h2 className="font-editorial text-3xl sm:text-4xl font-medium text-[#1F1A17] mt-1">
                    Frequently Asked About {pkg.name}
                  </h2>
                </div>
                <FaqAccordion items={pkg.faqs} />
              </div>
            )}
          </div>

          {/* RIGHT 4 COLUMNS: STICKY DESKTOP ENQUIRY PANEL */}
          <aside className="lg:col-span-4 lg:sticky lg:top-24 space-y-6">
            <div className="bg-white border border-[#E5DCD0] p-7 space-y-6 shadow-xs">
              <div className="pb-5 border-b border-[#EFE8DC]">
                <div className="text-[11px] uppercase tracking-widest text-[#7A0806]">
                  Tailored Private Journey
                </div>
                <div className="font-editorial text-3xl font-medium text-[#1F1A17] mt-1">
                  {pkg.publicPriceLabel}
                </div>
                <p className="text-xs text-[#655C54] mt-1.5 leading-relaxed">
                  Receive a written quotation tailored to your dates, group size, pickup hub, and preferred vehicle category.
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="sticky-travel-date"
                    className="block text-xs font-semibold text-[#3A322C] mb-1.5"
                  >
                    Preferred Travel Date
                  </label>
                  <input
                    id="sticky-travel-date"
                    type="date"
                    value={quickDate}
                    onChange={(e) => setQuickDate(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#FBF8F3] border border-[#DDD2C2] text-sm text-[#1F1A17] rounded-sm"
                  />
                </div>

                <div>
                  <label
                    htmlFor="sticky-travelers"
                    className="block text-xs font-semibold text-[#3A322C] mb-1.5"
                  >
                    Travelers
                  </label>
                  <select
                    id="sticky-travelers"
                    value={quickTravelers}
                    onChange={(e) => setQuickTravelers(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#FBF8F3] border border-[#DDD2C2] text-sm text-[#1F1A17] rounded-sm"
                  >
                    <option value="1 Adult">1 Adult (Solo Pilgrim)</option>
                    <option value="2 Adults">2 Adults</option>
                    <option value="3–4 Adults">3–4 Travelers (Family / Sedan)</option>
                    <option value="5–6 Travelers">5–6 Travelers (MPV / Innova)</option>
                    <option value="7+ Group">7+ Travelers (Tempo Traveller)</option>
                  </select>
                </div>
              </div>

              <div className="space-y-3 pt-1">
                <Link
                  to={`/plan-your-journey?package=${encodeURIComponent(pkg.slug)}${
                    quickDate ? `&date=${encodeURIComponent(quickDate)}` : ''
                  }`}
                  onClick={() =>
                    trackEvent('package_enquiry_click', {
                      package_slug: pkg.slug,
                      source: 'sticky_panel',
                    })
                  }
                  className="flex items-center justify-center gap-2 w-full py-3.5 px-5 bg-[#7A0806] hover:bg-[#580605] text-white text-xs font-semibold tracking-wide rounded-sm transition-colors"
                >
                  <span>Request Personalized Quote</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <a
                  href={waDirectHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() =>
                    trackEvent('whatsapp_click', {
                      package_slug: pkg.slug,
                      source: 'sticky_panel',
                    })
                  }
                  className="flex items-center justify-center gap-2 w-full py-3 px-5 bg-[#1B6E41] hover:bg-[#145532] text-white text-xs font-semibold rounded-sm transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp With These Details</span>
                </a>

                <a
                  href={BRAND.phoneHref}
                  onClick={() => trackEvent('phone_click', { source: 'sticky_panel' })}
                  className="flex items-center justify-center gap-2 w-full py-3 px-5 border border-[#D8CCBC] hover:border-[#7A0806] text-[#1F1A17] text-xs font-semibold rounded-sm transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-[#7A0806]" />
                  <span className="tabular-nums">Call {BRAND.phoneDisplay}</span>
                </a>
              </div>

              <div className="pt-4 border-t border-[#EFE8DC] flex items-start gap-2.5 text-xs text-[#655C54]">
                <MapPin className="w-4 h-4 text-[#7A0806] shrink-0 mt-0.5" />
                <span>
                  Operated locally from Ujjain. Zero hidden obligations—confirm only once your itinerary and quote are finalized.
                </span>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* K. RELATED JOURNEYS */}
      {relatedPackages.length > 0 && (
        <section className="py-16 sm:py-24 bg-[#F3EDE3] border-t border-[#E5DCD0]">
          <div className="max-w-[1380px] mx-auto px-5 sm:px-8">
            <div className="flex items-end justify-between gap-4 mb-10">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#7A0806]">
                  Continue Exploring
                </p>
                <h2 className="font-editorial text-3xl sm:text-4xl font-medium text-[#1F1A17] mt-1">
                  Related Sacred & Heritage Journeys
                </h2>
              </div>
              <Link
                to="/packages"
                className="text-xs font-semibold text-[#7A0806] hover:underline whitespace-nowrap"
              >
                View All Journeys
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
              {relatedPackages.map((rel) => (
                <PackageCard key={rel.slug} pkg={rel} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* MOBILE STICKY BOTTOM ENQUIRY BAR (Compact, <=15% viewport height, coordinated with Floating Controls) */}
      <div className="lg:hidden fixed bottom-0 inset-x-0 z-30 bg-[#FBF8F3]/98 backdrop-blur-md border-t border-[#DFD4C4] px-4 py-3 flex items-center justify-between gap-3">
        <div className="min-w-0">
          <div className="text-[10.5px] uppercase tracking-wider text-[#655C54] truncate">
            {pkg.name}
          </div>
          <div className="text-xs font-semibold text-[#1F1A17] truncate">
            {pkg.publicPriceLabel}
          </div>
        </div>
        <Link
          to={`/plan-your-journey?package=${encodeURIComponent(pkg.slug)}`}
          className="px-4 py-2.5 bg-[#7A0806] text-white text-xs font-semibold rounded-sm whitespace-nowrap shrink-0"
        >
          Request Quote
        </Link>
      </div>

      <ImageLightbox
        items={pkg.gallery}
        activeIndex={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onSelect={(idx) => setLightboxIndex(idx)}
      />
    </div>
  );
}
