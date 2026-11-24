import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useSiteData } from '../context/SiteDataContext.tsx';
import { Breadcrumbs } from '../components/Breadcrumbs.tsx';
import { PackageCard } from '../components/PackageCard.tsx';
import { ResilientImage } from '../components/ResilientImage.tsx';
import { trackEvent, usePageSeo } from '../lib/seo.ts';

export function ArticleDetailPage() {
  const { slug = '' } = useParams<{ slug: string }>();
  const { articles, packages, loading } = useSiteData();

  const article = articles.find((a) => a.slug === slug);

  usePageSeo({
    title: article ? article.seoTitle : 'Travel Journal | My Ujjain Darshan',
    description: article
      ? article.seoDescription
      : 'Spiritual pilgrimage essays and travel planning advice for Ujjain and Madhya Pradesh.',
    canonicalPath: `/travel-journal/${slug}`,
  });

  if (loading) {
    return (
      <div className="pt-32 pb-24 max-w-3xl mx-auto px-5">
        <div className="h-72 bg-[#EFE8DC] animate-pulse" />
      </div>
    );
  }

  if (!article) {
    return (
      <div className="pt-36 pb-28 max-w-2xl mx-auto px-5 text-center space-y-5">
        <h1 className="font-editorial text-4xl text-[#1F1A17]">Article Not Found</h1>
        <Link
          to="/travel-journal"
          className="inline-block px-6 py-3 bg-[#7A0806] text-white text-xs font-semibold rounded-sm"
        >
          Back to Travel Journal
        </Link>
      </div>
    );
  }

  const relatedPackages = packages.filter((p) =>
    article.relatedPackageSlugs.includes(p.slug)
  );

  return (
    <div className="pt-28 pb-24 bg-[#FBF8F3] min-h-screen">
      <article className="max-w-4xl mx-auto px-5 sm:px-8">
        <Breadcrumbs
          items={[
            { label: 'Home', to: '/' },
            { label: 'Travel Journal', to: '/travel-journal' },
            { label: article.category },
          ]}
        />

        <header className="mt-7 space-y-5">
          <div className="text-xs text-[#655C54]">
            <span className="font-semibold text-[#7A0806]">{article.category}</span>
            <span className="mx-2" aria-hidden="true">·</span>
            <span>{article.readTime}</span>
            <span className="mx-2" aria-hidden="true">·</span>
            <span>Published {article.publishedDate}</span>
            <span className="mx-2" aria-hidden="true">·</span>
            <span>By {article.authorName}</span>
          </div>

          <h1 className="font-editorial text-4xl sm:text-6xl font-medium text-[#1F1A17] leading-[1.08]">
            {article.title}
          </h1>

          <p className="text-lg text-[#524942] leading-relaxed">{article.excerpt}</p>
        </header>

        <figure className="mt-9 mb-12">
          <div className="aspect-[16/9] overflow-hidden bg-[#261211] shadow-[0_18px_40px_-18px_rgba(31,26,23,0.22)]">
            <ResilientImage
              src={article.coverImage}
              alt={article.title}
              loading="eager"
              fetchPriority="high"
              sizes="(min-width: 896px) 896px, 100vw"
              className="w-full h-full object-cover"
            />
          </div>
        </figure>

        <div className="max-w-2xl mx-auto space-y-10">
          {article.content.map((sec, idx) => (
            <section key={idx} className="space-y-4">
              <h2 className="font-editorial text-3xl font-medium text-[#1F1A17]">
                {sec.heading}
              </h2>
              {sec.paragraphs.map((p, pIdx) => (
                <p
                  key={pIdx}
                  className={`text-[16px] text-[#3B332E] leading-[1.85] ${
                    idx === 0 && pIdx === 0
                      ? 'first-letter:float-left first-letter:font-editorial first-letter:text-5xl first-letter:font-semibold first-letter:text-[#7A0806] first-letter:mr-3 first-letter:leading-[0.9]'
                      : ''
                  }`}
                >
                  {p}
                </p>
              ))}
            </section>
          ))}

          <div className="pt-8 border-t border-[#E5DCD0] flex flex-wrap items-center justify-between gap-4">
            <Link
              to="/travel-journal"
              className="inline-flex items-center gap-2 text-xs font-semibold text-[#655C54] hover:text-[#7A0806]"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>All Journal Essays</span>
            </Link>
            <Link
              to="/plan-your-journey"
              onClick={() =>
                trackEvent('journal_to_package_click', { article_slug: article.slug })
              }
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#7A0806] hover:bg-[#580605] text-white text-xs font-semibold rounded-sm"
            >
              <span>Plan This Journey With Us</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </article>

      {relatedPackages.length > 0 && (
        <section className="max-w-[1380px] mx-auto px-5 sm:px-8 mt-20 pt-16 border-t border-[#E5DCD0]">
          <h2 className="font-editorial text-3xl sm:text-4xl font-medium text-[#1F1A17] mb-8">
            Related Journeys Mentioned in This Guide
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
            {relatedPackages.map((pkg) => (
              <PackageCard key={pkg.slug} pkg={pkg} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
