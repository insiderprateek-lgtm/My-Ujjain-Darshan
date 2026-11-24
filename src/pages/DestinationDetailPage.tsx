import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowRight, Check, MapPin } from 'lucide-react';
import { useSiteData } from '../context/SiteDataContext.tsx';
import { Breadcrumbs } from '../components/Breadcrumbs.tsx';
import { PackageCard } from '../components/PackageCard.tsx';
import { ImageLightbox } from '../components/ImageLightbox.tsx';
import { ResilientImage } from '../components/ResilientImage.tsx';
import { usePageSeo } from '../lib/seo.ts';

export function DestinationDetailPage() {
  const { slug = '' } = useParams<{ slug: string }>();
  const { destinations, packages, loading } = useSiteData();
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const dest = destinations.find((d) => d.slug === slug);

  usePageSeo({
    title: dest ? dest.seoTitle : 'Destination Guide | My Ujjain Darshan',
    description: dest
      ? dest.seoDescription
      : 'Explore sacred and architectural destinations across Madhya Pradesh.',
    canonicalPath: `/destinations/${slug}`,
  });

  if (loading) {
    return (
      <div className="pt-32 pb-24 max-w-[1380px] mx-auto px-5 sm:px-8">
        <div className="h-96 bg-[#EFE8DC] animate-pulse" />
      </div>
    );
  }

  if (!dest) {
    return (
      <div className="pt-36 pb-28 max-w-2xl mx-auto px-5 text-center space-y-5">
        <h1 className="font-editorial text-4xl text-[#1F1A17]">
          Destination Guide Not Found
        </h1>
        <Link
          to="/destinations"
          className="inline-block px-6 py-3 bg-[#7A0806] text-white text-xs font-semibold rounded-sm"
        >
          View All Destinations
        </Link>
      </div>
    );
  }

  const relatedPackages = packages.filter(
    (p) =>
      dest.relatedPackageSlugs.includes(p.slug) ||
      p.destinations.some((d) => d.toLowerCase() === dest.name.toLowerCase())
  );

  return (
    <div>
      {/* Hero */}
      <section className="relative min-h-[64vh] flex items-end pt-32 pb-14 bg-[#180A0A] overflow-hidden">
        <div className="absolute inset-0">
          <ResilientImage
            src={dest.featuredImage}
            alt={dest.name}
            loading="eager"
            fetchPriority="high"
            sizes="100vw"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#160808]/92 via-[#160808]/50 to-black/30" />
        </div>

        <div className="relative z-10 max-w-[1380px] mx-auto px-5 sm:px-8 w-full">
          <Breadcrumbs
            light
            items={[
              { label: 'Home', to: '/' },
              { label: 'Destinations', to: '/destinations' },
              { label: dest.name },
            ]}
          />
          <div className="mt-6 max-w-3xl space-y-3">
            <div className="flex items-center gap-3 text-xs text-[#F0CCA0]">
              <span>{dest.region}</span>
              {dest.devanagariName && (
                <>
                  <span aria-hidden="true">·</span>
                  <span className="font-devanagari text-sm">{dest.devanagariName}</span>
                </>
              )}
            </div>
            <h1 className="font-editorial text-5xl sm:text-7xl font-medium text-white leading-[1.04]">
              {dest.name}
            </h1>
            <p className="font-editorial italic text-xl sm:text-2xl text-[#EAE2D6]">
              {dest.tagline}
            </p>
          </div>
        </div>
      </section>

      {/* Editorial Body */}
      <section className="py-16 sm:py-24 bg-[#FBF8F3]">
        <div className="max-w-[1380px] mx-auto px-5 sm:px-8 grid grid-cols-1 lg:grid-cols-12 gap-14">
          <div className="lg:col-span-8 space-y-14">
            <div className="space-y-4">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#7A0806]">
                Overview & Living Heritage
              </p>
              <p className="text-lg text-[#2B2420] leading-[1.75] font-medium">
                {dest.summary}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-[#E5DCD0]">
              <div className="space-y-3">
                <h2 className="font-editorial text-3xl font-medium text-[#1F1A17]">
                  Cultural & Spiritual Significance
                </h2>
                <p className="text-[15px] text-[#4A413B] leading-[1.8]">
                  {dest.culturalSignificance}
                </p>
              </div>
              <div className="space-y-3">
                <h2 className="font-editorial text-3xl font-medium text-[#1F1A17]">
                  Historical Context
                </h2>
                <p className="text-[15px] text-[#4A413B] leading-[1.8]">
                  {dest.historicalContext}
                </p>
              </div>
            </div>

            {/* Attractions */}
            <div className="pt-8 border-t border-[#E5DCD0] space-y-6">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#7A0806]">
                  Essential Sites
                </p>
                <h2 className="font-editorial text-3xl sm:text-4xl font-medium text-[#1F1A17] mt-1">
                  Key Landmarks in {dest.name}
                </h2>
              </div>

              <div className="divide-y divide-[#E5DCD0] border-y border-[#E5DCD0]">
                {dest.attractions.map((attr, idx) => (
                  <div key={idx} className="py-6 space-y-2">
                    <div className="flex items-baseline gap-3">
                      <span className="font-editorial text-xl text-[#A68247] tabular-nums">
                        {String(idx + 1).padStart(2, '0')}
                      </span>
                      <h3 className="font-editorial text-2xl font-medium text-[#1F1A17]">
                        {attr.name}
                      </h3>
                    </div>
                    <p className="text-sm text-[#4A413B] leading-relaxed pl-8">
                      {attr.summary}
                    </p>
                    <p className="text-xs text-[#655C54] pl-8">
                      <strong className="text-[#1F1A17]">Visitor Note:</strong> {attr.visitNote}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Gallery */}
            {dest.gallery.length > 0 && (
              <div className="pt-8 border-t border-[#E5DCD0] space-y-5">
                <h2 className="font-editorial text-3xl font-medium text-[#1F1A17]">
                  Photography From {dest.name}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {dest.gallery.map((g, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setLightboxIndex(idx)}
                      className="text-left bg-white border border-[#E5DCD0] overflow-hidden group"
                    >
                      <div className="aspect-[16/10] overflow-hidden bg-[#261211]">
                        <ResilientImage
                          src={g.url}
                          alt={g.alt}
                          sizes="(min-width: 640px) 34vw, 100vw"
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                      <p className="p-3 text-xs text-[#574F48]">{g.caption}</p>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Practical Travel Sidebar */}
          <aside className="lg:col-span-4 space-y-6">
            <div className="bg-white border border-[#E5DCD0] p-7 space-y-6">
              <div>
                <h3 className="font-editorial text-2xl font-medium text-[#1F1A17]">
                  Reaching {dest.name}
                </h3>
                <p className="text-sm text-[#574F48] leading-relaxed mt-2">
                  {dest.transportInfo}
                </p>
                {dest.coordinates && (
                  <p className="mt-3 text-xs text-[#7A6F65] inline-flex items-center gap-1.5 tabular-nums">
                    <MapPin className="w-3.5 h-3.5 text-[#7A0806]" />
                    <span>
                      {dest.coordinates.lat.toFixed(4)}°N, {dest.coordinates.lng.toFixed(4)}°E
                    </span>
                  </p>
                )}
              </div>

              <div className="pt-5 border-t border-[#EFE8DC] space-y-3">
                <h3 className="font-editorial text-2xl font-medium text-[#1F1A17]">
                  Thoughtful Travel Tips
                </h3>
                <ul className="space-y-2.5 text-sm text-[#4A413B]">
                  {dest.travelTips.map((tip, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-[#7A0806] shrink-0 mt-1" />
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-5 border-t border-[#EFE8DC]">
                <Link
                  to={`/plan-your-journey?destination=${encodeURIComponent(dest.name)}`}
                  className="flex items-center justify-center gap-2 w-full py-3.5 px-5 bg-[#7A0806] hover:bg-[#580605] text-white text-xs font-semibold rounded-sm transition-colors"
                >
                  <span>Plan a Journey to {dest.name}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* Related Packages */}
      {relatedPackages.length > 0 && (
        <section className="py-16 sm:py-24 bg-[#F3EDE3] border-t border-[#E5DCD0]">
          <div className="max-w-[1380px] mx-auto px-5 sm:px-8">
            <div className="mb-10">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#7A0806]">
                Curated Routes
              </p>
              <h2 className="font-editorial text-3xl sm:text-4xl font-medium text-[#1F1A17] mt-1">
                Journeys Featuring {dest.name}
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
              {relatedPackages.slice(0, 3).map((pkg) => (
                <PackageCard key={pkg.slug} pkg={pkg} />
              ))}
            </div>
          </div>
        </section>
      )}

      <ImageLightbox
        items={dest.gallery}
        activeIndex={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onSelect={(idx) => setLightboxIndex(idx)}
      />
    </div>
  );
}
