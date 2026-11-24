import React from 'react';
import { PackageDetailPage } from './PackageDetailPage.tsx';
import { SpiritualCircuitMap } from '../components/SpiritualCircuitMap.tsx';
import { UJJAIN_LANDMARKS } from '../data/brand.ts';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export function UjjainDarshanPage() {
  return (
    <div>
      {/* Render the full flagship Ujjain Darshan package experience */}
      <PackageDetailPage forcedSlug="ujjain-darshan" />

      {/* Flagship Editorial Addendum: Sacred Geography & Circuit Planning */}
      <section className="py-20 bg-[#FBF8F3] border-t border-[#E5DCD0]">
        <div className="max-w-[1380px] mx-auto px-5 sm:px-8 space-y-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            <div className="lg:col-span-5 space-y-4">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#7A0806]">
                Why Ujjain Is Among India’s Sapta Puri
              </p>
              <h2 className="font-editorial text-4xl sm:text-5xl font-medium text-[#1F1A17] leading-[1.1]">
                Understanding Ujjain’s Sacred Geography
              </h2>
            </div>
            <div className="lg:col-span-7 space-y-4 text-[15.5px] text-[#4A413B] leading-[1.82]">
              <p>
                Revered across classical Sanskrit literature as Ujjayini and Avanti, Ujjain stands alongside Varanasi, Ayodhya, Mathura, Haridwar, Kanchipuram, and Dwarka as one of India’s seven sacred liberation cities (Sapta Puri). Every twelve years, the city hosts Simhastha Kumbh Mela along the tranquil bends of the Shipra River.
              </p>
              <p>
                What makes Ujjain deeply distinctive is how devotion, poetry, and ancient Indian astronomy meet within a few square kilometers. From the south-facing Shri Mahakaleshwar Jyotirlinga beside Rudra Sagar to Mangalnath’s meridian overlook and Sandipani Ashram’s serene courtyard, planning your route by natural river clusters ensures every hour feels reflective rather than rushed.
              </p>
            </div>
          </div>

          <SpiritualCircuitMap />

          {/* Complete 10-Landmark Quick Reference Directory */}
          <div className="pt-8 border-t border-[#E5DCD0]">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#7A0806]">
                  Complete City Directory
                </p>
                <h3 className="font-editorial text-3xl font-medium text-[#1F1A17] mt-1">
                  All Ten Sacred Sites You Can Include
                </h3>
              </div>
              <Link
                to="/plan-your-journey?package=ujjain-darshan"
                className="inline-flex items-center gap-2 text-xs font-semibold text-[#7A0806] hover:underline"
              >
                <span>Customize Your Temple Selection</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              {UJJAIN_LANDMARKS.map((lm) => (
                <div
                  key={lm.id}
                  className="bg-white border border-[#E5DCD0] p-5 flex flex-col justify-between space-y-3"
                >
                  <div>
                    <div className="text-xs text-[#A68247] font-editorial text-lg tabular-nums">
                      {String(lm.order).padStart(2, '0')}
                    </div>
                    <h4 className="font-editorial text-xl font-medium text-[#1F1A17] mt-1">
                      {lm.name}
                    </h4>
                    <p className="text-[11px] text-[#655C54] mt-1">{lm.zone}</p>
                  </div>
                  <p className="text-xs text-[#574F48] leading-relaxed line-clamp-3">
                    {lm.summary}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
