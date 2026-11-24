import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { BRAND } from '../data/brand.ts';
import { useSiteData } from '../context/SiteDataContext.tsx';
import { Breadcrumbs } from '../components/Breadcrumbs.tsx';
import { FaqAccordion } from '../components/FaqAccordion.tsx';
import { usePageSeo } from '../lib/seo.ts';

export function FaqPage() {
  const { faqs } = useSiteData();

  usePageSeo({
    title: 'Frequently Asked Questions — Ujjain Pilgrimage & Travel | My Ujjain Darshan',
    description:
      'Answers to common questions about Ujjain Darshan timing, Indore Airport transfers, custom family itineraries, and official Mahakaleshwar temple rules.',
    canonicalPath: '/faq',
    jsonLd:
      faqs.length > 0
        ? {
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faqs.map((f) => ({
              '@type': 'Question',
              name: f.question,
              acceptedAnswer: {
                '@type': 'Answer',
                text: f.answer,
              },
            })),
          }
        : null,
  });

  return (
    <div className="pt-28 pb-24 bg-[#FBF8F3] min-h-screen">
      <div className="max-w-4xl mx-auto px-5 sm:px-8">
        <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'FAQs' }]} />

        <div className="mt-6 space-y-4">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#7A0806]">
            Travel Clarity
          </p>
          <h1 className="font-editorial text-4xl sm:text-6xl font-medium text-[#1F1A17] leading-[1.06]">
            Frequently Asked Questions
          </h1>
          <p className="text-base text-[#524942] leading-relaxed">
            Honest answers regarding sightseeing logistics, vehicle planning, elderly traveler comfort, and temple-administered bookings.
          </p>
        </div>

        <div className="mt-10">
          <FaqAccordion items={faqs} />
        </div>

        <div className="mt-12 p-7 bg-[#F3EDE3] border border-[#E2D6C5] space-y-3 text-sm text-[#4A413B]">
          <h2 className="font-editorial text-2xl font-medium text-[#1F1A17]">
            Official Temple Resources
          </h2>
          <p className="leading-relaxed">
            For official Shri Mahakaleshwar Bhasma Aarti registration, darshan guidelines, or donation receipts, please always refer directly to the temple management committee portal.
          </p>
          <div className="flex flex-wrap items-center gap-5 pt-2">
            <a
              href={BRAND.officialTemplePortal}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#7A0806] hover:underline"
            >
              <span>Shri Mahakaleshwar Official Portal</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
            <Link
              to="/plan-your-journey"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1F1A17] hover:text-[#7A0806]"
            >
              <span>Still have a question? Request a custom plan</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
