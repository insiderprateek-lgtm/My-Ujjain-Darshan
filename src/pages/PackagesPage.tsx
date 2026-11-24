import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Bookmark, RotateCcw, Scale, Search } from 'lucide-react';
import { PACKAGE_CATEGORIES } from '../data/brand.ts';
import { useSiteData } from '../context/SiteDataContext.tsx';
import { Breadcrumbs } from '../components/Breadcrumbs.tsx';
import { PackageCard } from '../components/PackageCard.tsx';
import { trackEvent, usePageSeo } from '../lib/seo.ts';

export function PackagesPage() {
  const {
    packages,
    loading,
    savedSlugs,
    compareSlugs,
    setCompareModalOpen,
  } = useSiteData();

  const [category, setCategory] = useState('all');
  const [destinationFilter, setDestinationFilter] = useState('all');
  const [catalogView, setCatalogView] = useState<
    'all' | 'reference-catalog' | 'proposed-experience' | 'saved'
  >('all');
  const [query, setQuery] = useState('');

  usePageSeo({
    title: 'Ujjain Tour Packages & Sacred Journeys | My Ujjain Darshan',
    description:
      'Explore all 12 core travel routes and proposed custom itineraries from Ujjain: Mahakaleshwar Darshan, Indore Airport transfers, Omkareshwar, Maheshwar, Mandu, Sanchi, Pachmarhi, and Amarkantak.',
    canonicalPath: '/packages',
  });

  const allDestinations = useMemo(() => {
    const set = new Set<string>();
    packages.forEach((p) => p.destinations.forEach((d) => set.add(d)));
    return Array.from(set).sort();
  }, [packages]);

  const filtered = useMemo(() => {
    return packages.filter((pkg) => {
      if (category !== 'all' && pkg.category !== category) return false;
      if (
        destinationFilter !== 'all' &&
        !pkg.destinations.includes(destinationFilter)
      ) {
        return false;
      }
      if (catalogView === 'reference-catalog' && pkg.catalogType !== 'reference-catalog') {
        return false;
      }
      if (catalogView === 'proposed-experience' && pkg.catalogType !== 'proposed-experience') {
        return false;
      }
      if (catalogView === 'saved' && !savedSlugs.includes(pkg.slug)) {
        return false;
      }
      if (query.trim()) {
        const q = query.trim().toLowerCase();
        const hay = `${pkg.name} ${pkg.subtitle} ${pkg.summary} ${pkg.destinations.join(' ')} ${pkg.duration}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [packages, category, destinationFilter, catalogView, savedSlugs, query]);

  const resetFilters = () => {
    setCategory('all');
    setDestinationFilter('all');
    setCatalogView('all');
    setQuery('');
  };

  return (
    <div className="pt-28 pb-24 bg-[#FBF8F3] min-h-screen">
      <div className="max-w-[1380px] mx-auto px-5 sm:px-8">
        <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Our Journeys' }]} />

        <div className="mt-6 max-w-3xl space-y-4">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#7A0806]">
            Complete Journey Catalog
          </p>
          <h1 className="font-editorial text-4xl sm:text-6xl font-medium text-[#1F1A17] leading-[1.06]">
            Curated Spiritual & Heritage Journeys
          </h1>
          <p className="text-base text-[#524942] leading-relaxed">
            Browse all regional pilgrimage routes, Indore Airport transfers, and proposed Ujjain-first custom experiences. Select up to three journeys to compare side by side, or bookmark favorites into your personal shortlist.
          </p>
        </div>

        {/* Discovery Filter Bar */}
        <div className="mt-10 bg-white border border-[#E5DCD0] p-5 sm:p-6 space-y-5">
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 border-b border-[#EFE8DC]">
            {PACKAGE_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => {
                  setCategory(cat.id);
                  trackEvent('package_filter_change', { category: cat.id });
                }}
                className={`px-3.5 py-2 text-xs font-semibold rounded-sm transition-colors whitespace-nowrap shrink-0 ${
                  category === cat.id
                    ? 'bg-[#7A0806] text-white'
                    : 'text-[#4A413B] hover:bg-[#F3EDE3]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Secondary Filter Controls */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-4 items-center">
            <div className="lg:col-span-4 relative">
              <Search
                className="w-4 h-4 text-[#857A70] absolute left-3.5 top-1/2 -translate-y-1/2"
                aria-hidden="true"
              />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search temple, city, or duration..."
                aria-label="Search tour packages"
                className="w-full pl-10 pr-4 py-2.5 bg-[#FBF8F3] border border-[#DDD2C2] text-sm text-[#1F1A17] rounded-sm"
              />
            </div>

            <div className="lg:col-span-3">
              <select
                value={destinationFilter}
                onChange={(e) => setDestinationFilter(e.target.value)}
                aria-label="Filter by destination"
                className="w-full px-3.5 py-2.5 bg-[#FBF8F3] border border-[#DDD2C2] text-sm text-[#1F1A17] rounded-sm"
              >
                <option value="all">All Destinations</option>
                {allDestinations.map((dest) => (
                  <option key={dest} value={dest}>
                    {dest}
                  </option>
                ))}
              </select>
            </div>

            <div className="lg:col-span-3">
              <select
                value={catalogView}
                onChange={(e) =>
                  setCatalogView(
                    e.target.value as
                      | 'all'
                      | 'reference-catalog'
                      | 'proposed-experience'
                      | 'saved'
                  )
                }
                aria-label="Filter by catalog view"
                className="w-full px-3.5 py-2.5 bg-[#FBF8F3] border border-[#DDD2C2] text-sm text-[#1F1A17] rounded-sm"
              >
                <option value="all">All Offerings ({packages.length})</option>
                <option value="reference-catalog">Core Route Catalog (12)</option>
                <option value="proposed-experience">Proposed Custom Plans (5)</option>
                <option value="saved">Saved Shortlist ({savedSlugs.length})</option>
              </select>
            </div>

            <div className="lg:col-span-2 flex items-center justify-end gap-2">
              {compareSlugs.length > 0 && (
                <button
                  type="button"
                  onClick={() => setCompareModalOpen(true)}
                  className="inline-flex items-center gap-1.5 px-3 py-2.5 bg-[#1F1A17] text-white text-xs font-semibold rounded-sm whitespace-nowrap"
                >
                  <Scale className="w-3.5 h-3.5" />
                  <span>Compare ({compareSlugs.length})</span>
                </button>
              )}
              {(category !== 'all' ||
                destinationFilter !== 'all' ||
                catalogView !== 'all' ||
                query) && (
                <button
                  type="button"
                  onClick={resetFilters}
                  className="inline-flex items-center gap-1 px-3 py-2.5 text-xs font-semibold text-[#7A0806] hover:underline whitespace-nowrap"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Results Meta */}
        <div className="mt-6 mb-6 flex flex-wrap items-center justify-between gap-3 text-xs text-[#655C54]">
          <span>
            Showing <strong className="text-[#1F1A17] tabular-nums">{filtered.length}</strong>{' '}
            {filtered.length === 1 ? 'journey' : 'journeys'}
          </span>
          {savedSlugs.length > 0 && catalogView !== 'saved' && (
            <button
              type="button"
              onClick={() => setCatalogView('saved')}
              className="inline-flex items-center gap-1.5 font-semibold text-[#7A0806] hover:underline"
            >
              <Bookmark className="w-3.5 h-3.5 fill-current" />
              <span>View Saved Shortlist ({savedSlugs.length})</span>
            </button>
          )}
        </div>

        {/* Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div key={n} className="h-[440px] bg-white border border-[#E5DCD0] animate-pulse" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="bg-white border border-[#E5DCD0] p-12 text-center space-y-4">
            <h2 className="font-editorial text-3xl text-[#1F1A17]">
              No Journeys Match Your Current Filter
            </h2>
            <p className="text-sm text-[#574F48] max-w-md mx-auto">
              Clear your filters to explore all regional itineraries, or request a completely customized journey tailored to your dates.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={resetFilters}
                className="px-5 py-2.5 border border-[#7A0806] text-[#7A0806] text-xs font-semibold rounded-sm"
              >
                Show All Packages
              </button>
              <Link
                to="/plan-your-journey"
                className="px-5 py-2.5 bg-[#7A0806] text-white text-xs font-semibold rounded-sm"
              >
                Plan Custom Journey
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {filtered.map((pkg) => (
              <PackageCard key={pkg.slug} pkg={pkg} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
