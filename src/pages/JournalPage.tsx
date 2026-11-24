import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useSiteData } from '../context/SiteDataContext.tsx';
import { Breadcrumbs } from '../components/Breadcrumbs.tsx';
import { ResilientImage } from '../components/ResilientImage.tsx';
import { usePageSeo } from '../lib/seo.ts';

export function JournalPage() {
  const { articles, loading } = useSiteData();
  const [selectedCategory, setSelectedCategory] = useState('All');

  usePageSeo({
    title: 'Travel Journal — Ujjain Pilgrimage & Madhya Pradesh Guides | My Ujjain Darshan',
    description:
      'Read thoughtful travel guides on Ujjain Darshan, Mahakaleshwar temple planning, Mahakal Lok, Omkareshwar Jyotirlinga routes, and family pilgrimage pacing.',
    canonicalPath: '/travel-journal',
  });

  const categories = ['All', ...Array.from(new Set(articles.map((a) => a.category)))];
  const visible =
    selectedCategory === 'All'
      ? articles
      : articles.filter((a) => a.category === selectedCategory);

  return (
    <div className="pt-28 pb-24 bg-[#FBF8F3] min-h-screen">
      <div className="max-w-[1380px] mx-auto px-5 sm:px-8">
        <Breadcrumbs
          items={[{ label: 'Home', to: '/' }, { label: 'Travel Journal' }]}
        />

        <div className="mt-6 max-w-3xl space-y-4">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#7A0806]">
            Editorial Guides
          </p>
          <h1 className="font-editorial text-4xl sm:text-6xl font-medium text-[#1F1A17] leading-[1.06]">
            The My Ujjain Darshan Travel Journal
          </h1>
          <p className="text-base text-[#524942] leading-relaxed">
            In-depth guides written for first-time pilgrims, families, and cultural travelers exploring Ujjain, the Shipra River, and sacred Madhya Pradesh.
          </p>
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-2 pb-4 border-b border-[#E5DCD0]">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 text-xs font-semibold rounded-sm transition-colors ${
                selectedCategory === cat
                  ? 'bg-[#7A0806] text-white'
                  : 'text-[#524942] hover:bg-[#EFE8DC]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {[1, 2, 3].map((n) => (
              <div key={n} className="h-96 bg-white border border-[#E5DCD0] animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {visible.map((article) => (
              <article
                key={article.slug}
                className="group bg-white border border-[#E5DCD0] hover:border-[#C9B9A3] transition-all duration-300 hover:shadow-[0_14px_32px_-12px_rgba(31,26,23,0.12)] flex flex-col justify-between"
              >
                <div>
                  <Link
                    to={`/travel-journal/${article.slug}`}
                    className="block aspect-[16/10] overflow-hidden bg-[#261211]"
                  >
                    <ResilientImage
                      src={article.coverImage}
                      alt={article.title}
                      sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                    />
                  </Link>
                  <div className="p-6 space-y-2.5">
                    <div className="text-xs text-[#655C54]">
                      <span>{article.category}</span>
                      <span className="mx-2" aria-hidden="true">·</span>
                      <span>{article.readTime}</span>
                      <span className="mx-2" aria-hidden="true">·</span>
                      <span>{article.publishedDate}</span>
                    </div>
                    <Link to={`/travel-journal/${article.slug}`}>
                      <h2 className="font-editorial text-2xl sm:text-[28px] font-medium text-[#1F1A17] group-hover:text-[#7A0806] transition-colors leading-snug">
                        {article.title}
                      </h2>
                    </Link>
                    <p className="text-sm text-[#574F48] leading-relaxed">
                      {article.excerpt}
                    </p>
                  </div>
                </div>
                <div className="px-6 pb-6 pt-4 border-t border-[#F0E9DE]">
                  <Link
                    to={`/travel-journal/${article.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#7A0806] hover:underline"
                  >
                    <span>Read Full Essay</span>
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
