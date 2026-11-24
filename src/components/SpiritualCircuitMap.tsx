import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Compass, ExternalLink, MapPin } from 'lucide-react';
import { UJJAIN_LANDMARKS, SacredLandmark } from '../data/brand.ts';
import { ResilientImage } from './ResilientImage.tsx';

type CircuitView = 'all' | 'core' | 'northern';

export function SpiritualCircuitMap() {
  const [selectedId, setSelectedId] = useState<string>(UJJAIN_LANDMARKS[0].id);
  const [circuitView, setCircuitView] = useState<CircuitView>('all');

  const visibleLandmarks = UJJAIN_LANDMARKS.filter((lm) => {
    if (circuitView === 'core') return [1, 2, 3, 4, 9].includes(lm.order);
    if (circuitView === 'northern') return [5, 6, 7, 10].includes(lm.order);
    return true;
  });

  const activeLandmark: SacredLandmark =
    visibleLandmarks.find((l) => l.id === selectedId) || visibleLandmarks[0];

  const mapsApiKey = import.meta.env.VITE_GOOGLE_MAPS_EMBED_KEY as string | undefined;

  const routePathPoints = visibleLandmarks
    .map((lm) => `${lm.mapPosition.x * 6},${lm.mapPosition.y * 4.4}`)
    .join(' ');

  return (
    <div className="bg-white border border-[#E5DCD0]">
      {/* Filter Header Bar */}
      <div className="px-6 py-5 border-b border-[#EFE8DC] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <p className="text-xs font-medium tracking-widest uppercase text-[#7A0806]">
            Interactive Sacred Geography
          </p>
          <h3 className="font-editorial text-2xl sm:text-3xl font-medium text-[#1F1A17] mt-1">
            Mapping Ujjain’s Temple Clusters Along the Shipra
          </h3>
        </div>

        <div className="flex flex-wrap items-center gap-1 p-1 bg-[#F3EDE3] rounded-sm">
          {[
            { id: 'all', label: 'Full 10-Site Circuit' },
            { id: 'core', label: 'Rudra Sagar & Ghat Core' },
            { id: 'northern', label: 'Northern Shipra Loop' },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => {
                setCircuitView(tab.id as CircuitView);
                const first = UJJAIN_LANDMARKS.find((lm) =>
                  tab.id === 'core'
                    ? lm.order === 1
                    : tab.id === 'northern'
                      ? lm.order === 5
                      : lm.order === 1
                );
                if (first) setSelectedId(first.id);
              }}
              className={`px-3.5 py-2 text-xs font-semibold rounded-sm transition-colors whitespace-nowrap ${
                circuitView === tab.id
                  ? 'bg-[#7A0806] text-white'
                  : 'text-[#4A413B] hover:text-[#1F1A17]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Interactive Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12">
        {/* Left: Art-Directed Cartographic Map of Ujjain */}
        <div className="lg:col-span-7 bg-[#F7F2E8] p-5 sm:p-7 border-b lg:border-b-0 lg:border-r border-[#E5DCD0] flex flex-col justify-between">
          {mapsApiKey ? (
            <div className="aspect-[16/11] w-full overflow-hidden border border-[#DFD5C5]">
              <iframe
                title={`Map of ${activeLandmark.name}`}
                width="100%"
                height="100%"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                src={`https://www.google.com/maps/embed/v1/place?key=${encodeURIComponent(mapsApiKey)}&q=${activeLandmark.coordinates.lat},${activeLandmark.coordinates.lng}&zoom=15`}
              />
            </div>
          ) : (
            <div className="relative w-full aspect-[16/11] bg-[#F2EADC] border border-[#E2D6C3] overflow-hidden">
              <svg
                viewBox="0 0 600 440"
                className="w-full h-full"
                role="img"
                aria-label="Schematic spiritual geography map of Ujjain showing the Shipra River and 10 sacred landmarks"
              >
                {/* Subtle parchment cartographic grid */}
                <defs>
                  <pattern
                    id="mapGrid"
                    width="60"
                    height="60"
                    patternUnits="userSpaceOnUse"
                  >
                    <path
                      d="M 60 0 L 0 0 0 60"
                      fill="none"
                      stroke="#DFD3C0"
                      strokeWidth="0.7"
                    />
                  </pattern>
                </defs>
                <rect width="600" height="440" fill="url(#mapGrid)" />

                {/* Shipra River winding northward through western Ujjain */}
                <path
                  d="M 90 440 C 120 375, 130 325, 165 265 C 190 220, 155 180, 195 140 C 245 90, 320 95, 365 40 C 385 18, 405 10, 425 0"
                  fill="none"
                  stroke="#BFD1D8"
                  strokeWidth="22"
                  strokeLinecap="round"
                />
                <path
                  d="M 90 440 C 120 375, 130 325, 165 265 C 190 220, 155 180, 195 140 C 245 90, 320 95, 365 40 C 385 18, 405 10, 425 0"
                  fill="none"
                  stroke="#9AB6C2"
                  strokeWidth="2"
                  strokeDasharray="6 6"
                />
                <text
                  x="130"
                  y="328"
                  fill="#5A7784"
                  fontSize="11"
                  fontStyle="italic"
                  fontFamily="Cormorant Garamond, serif"
                  transform="rotate(-55 130 328)"
                >
                  Sacred Shipra River
                </text>

                {/* Rudra Sagar Lake */}
                <ellipse
                  cx="250"
                  cy="245"
                  rx="24"
                  ry="15"
                  fill="#C8D7DC"
                  stroke="#9AB6C2"
                  strokeWidth="1"
                />
                <text
                  x="250"
                  y="273"
                  textAnchor="middle"
                  fill="#6E645A"
                  fontSize="9.5"
                >
                  Rudra Sagar
                </text>

                {/* Zone Labels */}
                <text
                  x="468"
                  y="44"
                  fill="#8A7E71"
                  fontSize="10"
                  letterSpacing="1.6"
                >
                  NORTHERN LOOP
                </text>
                <text
                  x="380"
                  y="255"
                  fill="#8A7E71"
                  fontSize="10"
                  letterSpacing="1.6"
                >
                  OLD AVANTI CORE
                </text>
                <text
                  x="160"
                  y="412"
                  fill="#8A7E71"
                  fontSize="10"
                  letterSpacing="1.6"
                >
                  INDORE / FATEHABAD APPROACH
                </text>

                {/* Suggested sightseeing progression dashed path */}
                <polyline
                  points={routePathPoints}
                  fill="none"
                  stroke="#A68247"
                  strokeWidth="1.6"
                  strokeDasharray="4 4"
                  opacity="0.85"
                />

                {/* Interactive Landmark Markers */}
                {visibleLandmarks.map((lm) => {
                  const cx = lm.mapPosition.x * 6;
                  const cy = lm.mapPosition.y * 4.4;
                  const isSelected = lm.id === activeLandmark.id;
                  return (
                    <g
                      key={lm.id}
                      onClick={() => setSelectedId(lm.id)}
                      className="cursor-pointer"
                      role="button"
                      tabIndex={0}
                      aria-label={`Select ${lm.name}`}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          setSelectedId(lm.id);
                        }
                      }}
                    >
                      {isSelected && (
                        <circle
                          cx={cx}
                          cy={cy}
                          r="17"
                          fill="#7A0806"
                          opacity="0.16"
                        />
                      )}
                      <circle
                        cx={cx}
                        cy={cy}
                        r={isSelected ? '11.5' : '9'}
                        fill={isSelected ? '#7A0806' : '#FBF8F3'}
                        stroke={isSelected ? '#D9690A' : '#7A0806'}
                        strokeWidth={isSelected ? '2.5' : '1.6'}
                      />
                      <text
                        x={cx}
                        y={cy + 3.5}
                        textAnchor="middle"
                        fontSize="9.5"
                        fontWeight="700"
                        fill={isSelected ? '#FFFFFF' : '#7A0806'}
                      >
                        {lm.order}
                      </text>
                      <text
                        x={cx}
                        y={cy - 15}
                        textAnchor="middle"
                        fontSize="10"
                        fontWeight={isSelected ? '700' : '500'}
                        fill={isSelected ? '#580605' : '#3C342E'}
                      >
                        {lm.name.replace('Shri ', '').replace(' Temple', '').split(' ')[0]}{' '}
                        {lm.name.includes('Mahakal Lok')
                          ? 'Lok'
                          : lm.name.includes('Bhairav')
                            ? 'Bhairav'
                            : lm.name.includes('Ghat')
                              ? 'Ghat'
                              : lm.name.includes('Ganesh')
                                ? 'Ganesh'
                                : ''}
                      </text>
                    </g>
                  );
                })}
              </svg>

              <div className="absolute bottom-3 left-3 bg-[#FBF8F3]/95 border border-[#DFD3C0] px-3 py-1.5 text-[11px] text-[#5C534B] flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5 text-[#7A0806]" />
                <span>Schematic spatial view · Exact route times vary by local traffic</span>
              </div>
            </div>
          )}

          {/* Selectable Landmark Index Row */}
          <div className="mt-5 flex flex-wrap gap-2">
            {visibleLandmarks.map((lm) => {
              const active = lm.id === activeLandmark.id;
              return (
                <button
                  key={lm.id}
                  type="button"
                  onClick={() => setSelectedId(lm.id)}
                  className={`px-3 py-1.5 text-xs font-medium border rounded-sm transition-colors ${
                    active
                      ? 'bg-[#7A0806] border-[#7A0806] text-white'
                      : 'bg-white border-[#DFD5C5] text-[#3A322C] hover:border-[#7A0806]'
                  }`}
                >
                  <span className="tabular-nums mr-1.5 opacity-75">
                    {String(lm.order).padStart(2, '0')}
                  </span>
                  {lm.name.replace('Shri ', '')}
                </button>
              );
            })}
          </div>
        </div>

        {/* Right: Detailed Editorial Preview of Selected Landmark */}
        <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between bg-white">
          <div className="space-y-5">
            <div className="aspect-[16/10] overflow-hidden bg-[#261211]">
              <ResilientImage
                src={activeLandmark.image}
                alt={activeLandmark.name}
                sizes="(min-width: 1024px) 42vw, 100vw"
                className="w-full h-full object-cover"
              />
            </div>

            <div>
              <div className="flex items-center justify-between gap-2 text-xs text-[#655C54]">
                <span>Stop {String(activeLandmark.order).padStart(2, '0')} · {activeLandmark.zone}</span>
                <span className="tabular-nums">
                  {activeLandmark.coordinates.lat.toFixed(4)}°N, {activeLandmark.coordinates.lng.toFixed(4)}°E
                </span>
              </div>
              <h4 className="font-editorial text-3xl font-medium text-[#1F1A17] mt-1.5">
                {activeLandmark.name}
              </h4>
              <p className="font-devanagari text-sm text-[#7A0806] mt-0.5">
                {activeLandmark.devanagari}
              </p>
            </div>

            <p className="text-sm text-[#4A413B] leading-relaxed">
              {activeLandmark.summary}
            </p>

            <div className="pt-4 border-t border-[#EFE8DC] space-y-2.5 text-xs leading-relaxed text-[#574F48]">
              <p>
                <strong className="text-[#1F1A17] font-semibold">Heritage Context:</strong>{' '}
                {activeLandmark.heritageNote}
              </p>
              <p>
                <strong className="text-[#1F1A17] font-semibold">Practical Planning:</strong>{' '}
                {activeLandmark.visitorGuidance}
              </p>
            </div>
          </div>

          <div className="pt-6 mt-6 border-t border-[#EFE8DC] flex flex-wrap items-center justify-between gap-3">
            <Link
              to={`/plan-your-journey?temple=${encodeURIComponent(activeLandmark.name)}`}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#7A0806] hover:bg-[#580605] text-white text-xs font-semibold rounded-sm transition-colors"
            >
              <span>Include in Custom Route</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>

            <a
              href={`https://www.google.com/maps/search/?api=1&query=${activeLandmark.coordinates.lat},${activeLandmark.coordinates.lng}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#655C54] hover:text-[#7A0806]"
            >
              <MapPin className="w-3.5 h-3.5" />
              <span>Open Coordinates</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
