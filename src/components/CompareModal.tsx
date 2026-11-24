import React from 'react';
import { Link } from 'react-router-dom';
import { Scale, X } from 'lucide-react';
import { useSiteData } from '../context/SiteDataContext.tsx';

export function CompareModal() {
  const {
    packages,
    compareSlugs,
    toggleComparePackage,
    clearCompare,
    compareModalOpen,
    setCompareModalOpen,
  } = useSiteData();

  if (compareSlugs.length === 0) return null;

  const selected = compareSlugs
    .map((slug) => packages.find((p) => p.slug === slug))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  return (
    <>
      {/* Subtle Bottom Comparison Bar */}
      {!compareModalOpen && (
        <div className="fixed bottom-4 left-4 right-20 sm:left-1/2 sm:right-auto sm:-translate-x-1/2 z-30 bg-[#1F1A17] text-[#FBF8F3] px-5 py-3 shadow-xl border border-white/10 flex items-center justify-between gap-5 max-w-xl">
          <div className="flex items-center gap-2.5 text-xs sm:text-sm min-w-0">
            <Scale className="w-4 h-4 text-[#D9690A] shrink-0" />
            <span className="truncate">
              <strong className="font-semibold tabular-nums">{selected.length}</strong>{' '}
              {selected.length === 1 ? 'journey selected' : 'journeys selected'} to compare
            </span>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => setCompareModalOpen(true)}
              className="px-3.5 py-1.5 bg-[#7A0806] hover:bg-[#580605] text-white text-xs font-semibold rounded-sm whitespace-nowrap"
            >
              Compare Now
            </button>
            <button
              type="button"
              onClick={clearCompare}
              aria-label="Clear comparison selection"
              className="text-white/70 hover:text-white p-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Comparison Modal Dialog */}
      {compareModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="compare-modal-title"
          className="fixed inset-0 z-50 bg-black/65 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6"
          onClick={() => setCompareModalOpen(false)}
        >
          <div
            className="bg-[#FBF8F3] border border-[#E5DCD0] w-full max-w-5xl max-h-[88vh] overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-[#FBF8F3] border-b border-[#E5DCD0] px-6 py-4 flex items-center justify-between">
              <div>
                <h2
                  id="compare-modal-title"
                  className="font-editorial text-2xl sm:text-3xl font-medium text-[#1F1A17]"
                >
                  Compare Selected Journeys
                </h2>
                <p className="text-xs text-[#655C54] mt-0.5">
                  Side-by-side overview of routes, duration, starting hub, and quotation basis.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setCompareModalOpen(false)}
                aria-label="Close comparison dialog"
                className="w-10 h-10 inline-flex items-center justify-center text-[#4A413B] hover:text-[#1F1A17]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-x-auto">
              <table className="w-full min-w-[640px] border-collapse text-left">
                <thead>
                  <tr className="border-b border-[#E5DCD0]">
                    <th className="py-3 pr-4 text-xs uppercase tracking-wider text-[#655C54] w-40">
                      Journey Attribute
                    </th>
                    {selected.map((pkg) => (
                      <th key={pkg.slug} className="py-3 px-4 align-top">
                        <div className="flex items-start justify-between gap-2">
                          <Link
                            to={
                              pkg.slug === 'ujjain-darshan'
                                ? '/ujjain-darshan'
                                : `/packages/${pkg.slug}`
                            }
                            onClick={() => setCompareModalOpen(false)}
                            className="font-editorial text-xl font-medium text-[#7A0806] hover:underline"
                          >
                            {pkg.name}
                          </Link>
                          <button
                            type="button"
                            onClick={() => toggleComparePackage(pkg.slug)}
                            aria-label={`Remove ${pkg.name}`}
                            className="text-[#8B8075] hover:text-[#1F1A17] p-1"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#EFE8DC] text-sm">
                  <tr>
                    <td className="py-3.5 pr-4 font-medium text-[#655C54]">Destinations</td>
                    {selected.map((pkg) => (
                      <td key={pkg.slug} className="py-3.5 px-4 text-[#1F1A17]">
                        {pkg.destinations.join(', ')}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="py-3.5 pr-4 font-medium text-[#655C54]">Duration</td>
                    {selected.map((pkg) => (
                      <td key={pkg.slug} className="py-3.5 px-4 text-[#1F1A17]">
                        {pkg.duration}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="py-3.5 pr-4 font-medium text-[#655C54]">Starting Point</td>
                    {selected.map((pkg) => (
                      <td key={pkg.slug} className="py-3.5 px-4 text-[#1F1A17]">
                        {pkg.startingLocation}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="py-3.5 pr-4 font-medium text-[#655C54]">Catalog Type</td>
                    {selected.map((pkg) => (
                      <td key={pkg.slug} className="py-3.5 px-4 text-[#1F1A17]">
                        {pkg.catalogType === 'proposed-experience'
                          ? 'Proposed Custom Itinerary'
                          : 'Core Catalog Journey'}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="py-3.5 pr-4 font-medium text-[#655C54]">Pricing Status</td>
                    {selected.map((pkg) => (
                      <td key={pkg.slug} className="py-3.5 px-4 font-semibold text-[#1F1A17]">
                        {pkg.publicPriceLabel}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="py-3.5 pr-4 font-medium text-[#655C54]">Key Highlights</td>
                    {selected.map((pkg) => (
                      <td key={pkg.slug} className="py-3.5 px-4 text-[#4A413B] align-top">
                        <ul className="space-y-1.5 list-disc pl-4 text-xs leading-relaxed">
                          {pkg.highlights.slice(0, 3).map((item, idx) => (
                            <li key={idx}>{item}</li>
                          ))}
                        </ul>
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="py-4 pr-4 font-medium text-[#655C54]">Next Step</td>
                    {selected.map((pkg) => (
                      <td key={pkg.slug} className="py-4 px-4">
                        <Link
                          to={`/plan-your-journey?package=${encodeURIComponent(pkg.slug)}`}
                          onClick={() => setCompareModalOpen(false)}
                          className="inline-flex items-center justify-center px-4 py-2 bg-[#7A0806] hover:bg-[#580605] text-white text-xs font-semibold rounded-sm"
                        >
                          Request Quote
                        </Link>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
