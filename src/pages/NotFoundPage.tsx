import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { usePageSeo } from '../lib/seo.ts';

export function NotFoundPage() {
  usePageSeo({
    title: 'Page Not Found | My Ujjain Darshan',
    description: 'The requested page could not be found on My Ujjain Darshan.',
  });

  return (
    <div className="pt-36 pb-28 bg-[#FBF8F3] min-h-[75vh] flex items-center justify-center px-5">
      <div className="max-w-xl text-center space-y-5">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#7A0806]">
          404 · Route Not Found
        </p>
        <h1 className="font-editorial text-4xl sm:text-5xl font-medium text-[#1F1A17]">
          This Path Does Not Lead to a Shrine
        </h1>
        <p className="text-sm text-[#574F48] leading-relaxed">
          The page you are looking for may have moved. Return to our homepage, explore the signature Ujjain Darshan guide, or plan your custom journey directly.
        </p>
        <div className="pt-3 flex flex-wrap items-center justify-center gap-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#7A0806] text-white text-xs font-semibold rounded-sm"
          >
            <span>Return Home</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
          <Link
            to="/packages"
            className="px-6 py-3 border border-[#D4C7B5] text-[#1F1A17] text-xs font-semibold rounded-sm"
          >
            Explore All Journeys
          </Link>
        </div>
      </div>
    </div>
  );
}
