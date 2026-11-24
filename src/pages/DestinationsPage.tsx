import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useSiteData } from '../context/SiteDataContext.tsx';
import { Breadcrumbs } from '../components/Breadcrumbs.tsx';
import { ResilientImage } from '../components/ResilientImage.tsx';
import { usePageSeo } from '../lib/seo.ts';

export function DestinationsPage() {
  const { destinations, loading } = useSiteData();

  usePageSeo({
    title: 'Sacred & Heritage Destinations of Madhya Pradesh | My Ujjain Darshan',
    description:
      'Explore destination guides for Ujjain, Omkareshwar, Maheshwar, Mandu, Dewas, Bhopal, Sanchi, Pachmarhi, and Amarkantak.',
    canonicalPath: '/destinations',
  });

  return (
    <div className="pt-28 pb-24 bg-[#FBF8F3] min-h-screen">
      <div className="max-w-[1380px] mx-auto px-5 sm:px-8">
        <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Destinations' }]} />

        <div className="mt-6 max-w-3xl space-y-4">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#7A0806]">
            Destination Guides
          </p>
          <h1 className="font-editorial text-4xl sm:text-6xl font-medium text-[#1F1A17] leading-[1.06]">
            Sacred Rivers, Ancient Shrines & Timeless Plateaus
          </h1>
          <p className="text-base text-[#524942] leading-relaxed">
            From Ujjain along the Shipra to Omkareshwar and Maheshwar on the Narmada, medieval Mandu, UNESCO Sanchi, and the highlands of Pachmarhi and Amarkantak.
          </p>
        </div>

        {loading ? (
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div key={n} className="h-[420px] bg-white border border-[#E5DCD0] animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {destinations.map((dest, idx) => (
              <article
                key={dest.slug}
                className={`group bg-white border border-[#E5DCD0] flex flex-col justify-between transition-all duration-300 hover:border-[#C9B9A3] hover:shadow-[0_14px_32px_-12px_rgba(31,26,23,0.12)] ${
                  idx === 0 ? 'md:col-span-2 lg:col-span-2' : ''
                }`}
              >
                <div>
                  <Link
                    to={`/destinations/${dest.slug}`}
                    className={`block overflow-hidden bg-[#261211] ${
                      idx === 0 ? 'aspect-[16/9]' : 'aspect-[4/3]'
                    }`}
                  >
                    <ResilientImage
                      src={dest.featuredImage}
                      alt={dest.name}
                      loading={idx < 2 ? 'eager' : 'lazy'}
                      sizes={
                        idx === 0
                          ? '(min-width: 1024px) 66vw, 100vw'
                          : '(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw'
                      }
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                    />
                  </Link>
                  <div className="p-6 sm:p-7 space-y-2.5">
                    <div className="flex items-center justify-between gap-2 text-xs text-[#655C54]">
                      <span>{dest.region}</span>
                      {dest.devanagariName && (
                        <span className="font-devanagari text-sm text-[#7A0806]">
                          {dest.devanagariName}
                        </span>
                      )}
                    </div>
                    <Link to={`/destinations/${dest.slug}`}>
                      <h2 className="font-editorial text-3xl font-medium text-[#1F1A17] group-hover:text-[#7A0806] transition-colors">
                        {dest.name}
                      </h2>
                    </Link>
                    <p className="font-editorial italic text-base text-[#7A0806]">
                      {dest.tagline}
                    </p>
                    <p className="text-sm text-[#574F48] leading-relaxed pt-1">
                      {dest.summary}
                    </p>
                  </div>
                </div>
                <div className="px-6 sm:px-7 pb-6 pt-4 border-t border-[#F0E9DE] flex items-center justify-between">
                  <span className="text-xs text-[#655C54]">
                    {dest.attractions.length} key landmarks
                  </span>
                  <Link
                    to={`/destinations/${dest.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#7A0806] hover:underline"
                  >
                    <span>Explore Guide</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
