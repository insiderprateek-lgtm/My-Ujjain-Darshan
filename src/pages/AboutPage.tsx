import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { BRAND, MEDIA } from '../data/brand.ts';
import { Breadcrumbs } from '../components/Breadcrumbs.tsx';
import { ResilientImage } from '../components/ResilientImage.tsx';
import { usePageSeo } from '../lib/seo.ts';

export function AboutPage() {
  usePageSeo({
    title: 'About My Ujjain Darshan — Beyond Darshan. A Journey Within.',
    description:
      'Learn about My Ujjain Darshan: our philosophy of calm, respectful spiritual travel, local Ujjain roots, transparent quotations, and family-first pilgrimage planning.',
    canonicalPath: '/about',
  });

  return (
    <div className="pt-28 pb-24 bg-[#FBF8F3] min-h-screen">
      <div className="max-w-[1380px] mx-auto px-5 sm:px-8">
        <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'About Us' }]} />

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-14 items-center">
          <div className="lg:col-span-6 space-y-6">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#7A0806]">
              {BRAND.tagline}
            </p>
            <h1 className="font-editorial text-4xl sm:text-6xl font-medium text-[#1F1A17] leading-[1.06]">
              Crafted in Ujjain for Meaningful Pilgrimages
            </h1>
            <p className="font-devanagari text-base text-[#7A0806]">
              {BRAND.devanagariGreeting}
            </p>
            <p className="text-[15.5px] text-[#4A413B] leading-[1.82]">
              My Ujjain Darshan is a Ujjain-based spiritual travel and private tour service dedicated to helping families, solo seekers, and cultural travelers experience the sacred soul of Avanti and Madhya Pradesh with clarity and peace of mind.
            </p>
            <p className="text-[15.5px] text-[#4A413B] leading-[1.82]">
              We believe pilgrimage logistics should remain quiet, dependable, and honest. Rather than rushing travelers through disjointed temple stops or promising unauthorized shortcuts, we plan sensible local sequences, arrange clean private transport, and share transparent written quotations ahead of arrival.
            </p>
          </div>

          <div className="lg:col-span-6">
            <figure>
              <div className="aspect-[4/3] overflow-hidden bg-[#261211] shadow-[0_18px_40px_-18px_rgba(31,26,23,0.24)]">
                <ResilientImage
                  src={MEDIA.ramGhatRiverfront}
                  alt="Stone steps and historic shrines along Ram Ghat on the Shipra River in Ujjain"
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="w-full h-full object-cover"
                />
              </div>
              <figcaption className="mt-3 flex items-center justify-between text-xs text-[#655C54]">
                <span className="font-editorial italic text-sm">
                  Ram Ghat on the Shipra River — spiritual heart of ancient Avanti
                </span>
                <span className="hidden sm:inline">Ujjain, Madhya Pradesh</span>
              </figcaption>
            </figure>
          </div>
        </div>

        <div className="mt-20 pt-16 border-t border-[#E5DCD0] grid grid-cols-1 md:grid-cols-3 gap-10">
          {[
            {
              num: '01',
              title: 'Respect for Living Heritage',
              body: 'Every itinerary honors Ujjain’s sacred calendar, architecture, and temple etiquette—leaving space for dawn and twilight stillness along the Shipra.',
            },
            {
              num: '02',
              title: 'Radical Clarity on Temple Rules',
              body: 'We distinguish private road transport and itinerary planning from official temple trust services. Visitors are always guided toward official temple portals for darshan or Bhasma Aarti.',
            },
            {
              num: '03',
              title: 'Thoughtful Multi-Generational Care',
              body: 'From Indore Airport pickups to shaded rest intervals for elders and custom stops across Omkareshwar, Maheshwar, and Mandu, comfort is built into every schedule.',
            },
          ].map((pillar) => (
            <div key={pillar.num} className="space-y-3">
              <div className="font-editorial text-3xl text-[#A68247] tabular-nums">
                {pillar.num}
              </div>
              <h2 className="font-editorial text-3xl font-medium text-[#1F1A17]">
                {pillar.title}
              </h2>
              <p className="text-sm text-[#524942] leading-relaxed">{pillar.body}</p>
            </div>
          ))}
        </div>

        <div className="mt-20 bg-[#1E0E0E] text-white p-10 sm:p-14 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="max-w-xl space-y-2">
            <h2 className="font-editorial text-3xl sm:text-4xl font-medium">
              Ready to Plan Your Visit to Ujjain?
            </h2>
            <p className="text-sm text-[#D8CEC1]">
              Share your arrival dates and travel companions—our Ujjain team will respond with a tailored route and written quotation.
            </p>
          </div>
          <Link
            to="/plan-your-journey"
            className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#7A0806] hover:bg-[#580605] text-white text-xs font-semibold rounded-sm whitespace-nowrap"
          >
            <span>Plan Your Journey</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
