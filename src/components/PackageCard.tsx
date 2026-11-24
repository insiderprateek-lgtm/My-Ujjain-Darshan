import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Bookmark, Check, Scale } from 'lucide-react';
import type { PublicPackage } from '../types/models.ts';
import { buildPackageWhatsAppMessage, buildWhatsAppUrl } from '../data/brand.ts';
import { useSiteData } from '../context/SiteDataContext.tsx';
import { ResilientImage } from './ResilientImage.tsx';
import { trackEvent } from '../lib/seo.ts';

interface PackageCardProps {
  pkg: PublicPackage;
  showCompareControls?: boolean;
}

export function PackageCard({ pkg, showCompareControls = true }: PackageCardProps) {
  const { savedSlugs, toggleSavedPackage, compareSlugs, toggleComparePackage } =
    useSiteData();

  const detailPath =
    pkg.slug === 'ujjain-darshan' ? '/ujjain-darshan' : `/packages/${pkg.slug}`;
  const isSaved = savedSlugs.includes(pkg.slug);
  const isCompared = compareSlugs.includes(pkg.slug);

  const waHref = buildWhatsAppUrl(
    buildPackageWhatsAppMessage({
      packageName: pkg.name,
    })
  );

  return (
    <article className="group bg-white border border-[#E6DDD0] flex flex-col justify-between transition-all duration-300 hover:border-[#C9B9A3] hover:shadow-[0_14px_32px_-12px_rgba(31,26,23,0.12)]">
      <div>
        <Link to={detailPath} className="block relative aspect-[4/3] overflow-hidden bg-[#261211]">
          <ResilientImage
            src={pkg.featuredImage}
            alt={pkg.name}
            sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          />
          <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
          <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-[11.5px] font-medium text-white/95">
            <span>{pkg.duration}</span>
            {pkg.catalogType === 'proposed-experience' && (
              <span className="tracking-wide text-[#F7D7A8]">Proposed Custom Plan</span>
            )}
          </div>
        </Link>

        <div className="p-6">
          {/* Unboxed clean typographic metadata (Zero-Pill discipline) */}
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-[#655C54] mb-2.5">
            <span>{pkg.destinations.join(', ')}</span>
            <span aria-hidden="true">·</span>
            <span>From {pkg.startingLocation.split('/')[0].trim()}</span>
          </div>

          <Link to={detailPath} className="block">
            <h3 className="font-editorial text-[26px] leading-[1.2] font-medium text-[#1F1A17] group-hover:text-[#7A0806] transition-colors">
              {pkg.name}
            </h3>
          </Link>

          <p className="text-sm text-[#574F48] leading-relaxed mt-3 line-clamp-3">
            {pkg.summary}
          </p>
        </div>
      </div>

      <div className="px-6 pb-6 pt-4 border-t border-[#F0E9DE] space-y-4">
        <div className="flex items-center justify-between gap-2">
          <div>
            <div className="text-[11px] uppercase tracking-wider text-[#7A6F65]">
              Quotation
            </div>
            <div className="text-sm font-semibold text-[#1F1A17] tabular-nums">
              {pkg.publicPriceLabel}
            </div>
          </div>

          {showCompareControls && (
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => toggleSavedPackage(pkg.slug)}
                aria-label={isSaved ? `Remove ${pkg.name} from shortlist` : `Save ${pkg.name} to shortlist`}
                aria-pressed={isSaved}
                className={`inline-flex items-center justify-center w-9 h-9 border rounded-sm transition-colors ${
                  isSaved
                    ? 'border-[#7A0806] bg-[#7A0806]/10 text-[#7A0806]'
                    : 'border-[#E2D8C9] text-[#655C54] hover:border-[#7A0806] hover:text-[#7A0806]'
                }`}
                title={isSaved ? 'Saved in shortlist' : 'Save journey'}
              >
                <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
              </button>

              <button
                type="button"
                onClick={() => toggleComparePackage(pkg.slug)}
                aria-label={isCompared ? `Remove ${pkg.name} from comparison` : `Compare ${pkg.name}`}
                aria-pressed={isCompared}
                className={`inline-flex items-center gap-1 px-2.5 h-9 text-xs font-medium border rounded-sm transition-colors whitespace-nowrap ${
                  isCompared
                    ? 'border-[#7A0806] bg-[#7A0806] text-white'
                    : 'border-[#E2D8C9] text-[#655C54] hover:border-[#7A0806] hover:text-[#7A0806]'
                }`}
              >
                {isCompared ? <Check className="w-3.5 h-3.5" /> : <Scale className="w-3.5 h-3.5" />}
                <span>Compare</span>
              </button>
            </div>
          )}
        </div>

        <div className="flex items-center gap-3">
          <Link
            to={detailPath}
            className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-4 bg-[#7A0806] hover:bg-[#580605] text-[#FBF8F3] text-xs font-semibold tracking-wide rounded-sm transition-colors whitespace-nowrap"
          >
            <span>View Journey</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
          </Link>
          <a
            href={waHref}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() =>
              trackEvent('whatsapp_click', {
                source: 'package_card',
                package_slug: pkg.slug,
              })
            }
            className="inline-flex items-center justify-center py-2.5 px-4 border border-[#D4C7B5] hover:border-[#1B6E41] hover:text-[#1B6E41] text-[#2B2420] text-xs font-semibold rounded-sm transition-colors whitespace-nowrap"
          >
            WhatsApp
          </a>
        </div>
      </div>
    </article>
  );
}
