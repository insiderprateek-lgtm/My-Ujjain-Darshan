import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Briefcase,
  Compass,
  Info,
  ShieldCheck,
  Users,
  Wind,
} from 'lucide-react';
import { useSiteData } from '../context/SiteDataContext.tsx';
import { Breadcrumbs } from '../components/Breadcrumbs.tsx';
import { ResilientImage } from '../components/ResilientImage.tsx';
import { usePageSeo } from '../lib/seo.ts';

export function FleetPage() {
  const { vehicles, loading } = useSiteData();

  usePageSeo({
    title: 'Our Vehicles & Private Travel Fleet | My Ujjain Darshan',
    description:
      'Explore private vehicle categories for Ujjain Darshan, Indore Airport transfers, and Madhya Pradesh pilgrimages: Maruti Suzuki Swift, Maruti Suzuki Ertiga, Toyota Innova Crysta, and Force Tempo Traveller.',
    canonicalPath: '/our-fleet',
  });

  return (
    <div className="pt-28 pb-24 bg-[#FBF8F3] min-h-screen">
      <div className="max-w-[1380px] mx-auto px-5 sm:px-8">
        <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Our Fleet' }]} />

        <div className="mt-6 flex flex-col lg:flex-row lg:items-end justify-between gap-8">
          <div className="max-w-3xl space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#7A0806]">
              Private Ground Transportation
            </p>
            <h1 className="font-editorial text-4xl sm:text-6xl font-medium text-[#1F1A17] leading-[1.06]">
              Our Vehicles for Calm, Unhurried Travel
            </h1>
            <p className="text-base text-[#524942] leading-relaxed">
              Whether arriving at Devi Ahilyabai Holkar Airport in Indore for a same-day Ujjain Darshan or traveling with extended family across Omkareshwar, Maheshwar, Mandu, and Pachmarhi, we match every group with dependable, clean private vehicles sized for passengers and luggage.
            </p>
          </div>

          <div className="lg:text-right text-xs text-[#655C54] space-y-1 shrink-0">
            <div className="inline-flex items-center gap-1.5 font-semibold text-[#1F1A17]">
              <ShieldCheck className="w-4 h-4 text-[#7A0806]" />
              <span>Private Dedicated Allocation</span>
            </div>
            <p>Zero ride-sharing · Pre-coordinated local drivers</p>
          </div>
        </div>

        <div className="mt-8 p-5 bg-[#F3EDE3] border border-[#E2D6C5] text-xs text-[#4A413B] flex items-start gap-3">
          <Info className="w-4 h-4 text-[#7A0806] shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong className="text-[#1F1A17]">Representative Photography & Availability Notice:</strong> Photographs shown below are real reference photographs of each vehicle class (Maruti Suzuki Swift, Maruti Suzuki Ertiga, Toyota Innova Crysta, and Force Tempo Traveller). Exact vehicle registration, Swift Dzire compact-sedan variants, AC configuration, and larger group options (Tavera, Toofan, or tourist coaches) are confirmed individually in writing when you request a quotation for your travel dates.
          </p>
        </div>

        {loading ? (
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8">
            {[1, 2, 3, 4].map((n) => (
              <div key={n} className="h-[520px] bg-white border border-[#E5DCD0] animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8">
            {vehicles.map((veh, idx) => (
              <article
                key={veh.slug}
                className="group bg-white border border-[#E5DCD0] hover:border-[#C9B9A3] transition-all duration-300 hover:shadow-[0_14px_34px_-12px_rgba(31,26,23,0.12)] flex flex-col justify-between"
              >
                <div>
                  {/* Clean neutral studio-toned vehicle showcase frame */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-[#F4EFE7] border-b border-[#EFE8DC]">
                    <ResilientImage
                      src={veh.image}
                      alt={`${veh.modelName} — ${veh.category} for Ujjain and Madhya Pradesh travel`}
                      loading={idx < 2 ? 'eager' : 'lazy'}
                      sizes="(min-width: 768px) 50vw, 100vw"
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                    />
                    <div className="absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-black/45 to-transparent pointer-events-none" />
                    <div className="absolute bottom-3 left-5 right-5 flex items-center justify-between text-[11px] font-medium text-white/95">
                      <span className="uppercase tracking-[0.14em]">
                        Class 0{idx + 1} · {veh.category}
                      </span>
                      <span className="text-[#F7D7A8]">Representative Model</span>
                    </div>
                  </div>

                  <div className="p-7 sm:p-8 space-y-5">
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <h2 className="font-editorial text-3xl sm:text-[34px] font-medium text-[#1F1A17] leading-tight">
                        {veh.modelName}
                      </h2>
                      <span className="text-[11.5px] font-medium text-[#655C54]">
                        {veh.availabilityStatus === 'confirmed'
                          ? 'Confirmed Category'
                          : 'Confirmed Upon Enquiry'}
                      </span>
                    </div>

                    <p className="text-sm text-[#4A413B] leading-relaxed">
                      {veh.description}
                    </p>

                    <dl className="pt-5 border-t border-[#EFE8DC] space-y-3.5 text-sm">
                      <div className="flex items-start gap-3">
                        <Users className="w-4 h-4 text-[#7A0806] shrink-0 mt-0.5" />
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-1 flex-1">
                          <dt className="text-xs uppercase tracking-wider text-[#7A6F65] pt-0.5">
                            Passengers
                          </dt>
                          <dd className="sm:col-span-2 text-[#1F1A17] font-medium">
                            {veh.capacityLabel}
                          </dd>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <Briefcase className="w-4 h-4 text-[#7A0806] shrink-0 mt-0.5" />
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-1 flex-1">
                          <dt className="text-xs uppercase tracking-wider text-[#7A6F65] pt-0.5">
                            Luggage
                          </dt>
                          <dd className="sm:col-span-2 text-[#1F1A17]">
                            {veh.luggageLabel}
                          </dd>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <Wind className="w-4 h-4 text-[#7A0806] shrink-0 mt-0.5" />
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-1 flex-1">
                          <dt className="text-xs uppercase tracking-wider text-[#7A6F65] pt-0.5">
                            Climate
                          </dt>
                          <dd className="sm:col-span-2 text-[#1F1A17]">
                            {veh.acStatus}
                          </dd>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <Compass className="w-4 h-4 text-[#7A0806] shrink-0 mt-0.5" />
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-1 flex-1">
                          <dt className="text-xs uppercase tracking-wider text-[#7A6F65] pt-0.5">
                            Ideal Routes
                          </dt>
                          <dd className="sm:col-span-2 text-[#4A413B]">
                            {veh.recommendedUse}
                          </dd>
                        </div>
                      </div>
                    </dl>
                  </div>
                </div>

                <div className="px-7 sm:px-8 pb-7 pt-5 border-t border-[#EFE8DC] flex flex-wrap items-center justify-between gap-4 bg-[#FCFBF8]">
                  <span className="text-xs text-[#655C54]">
                    Pricing available on request
                  </span>
                  <Link
                    to={`/plan-your-journey?vehicle=${encodeURIComponent(veh.modelName)}`}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-[#7A0806] hover:bg-[#580605] text-white text-xs font-semibold tracking-wide rounded-sm transition-colors whitespace-nowrap"
                  >
                    <span>Request Quote for {veh.modelName}</span>
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
