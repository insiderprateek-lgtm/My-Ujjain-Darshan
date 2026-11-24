import React, { useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import type { PackageGalleryItem } from '../db/schema.ts';
import { getImageAssetBySrc } from '../data/imageRegistry.ts';

interface ImageLightboxProps {
  items: PackageGalleryItem[];
  activeIndex: number | null;
  onClose: () => void;
  onSelect: (index: number) => void;
}

export function ImageLightbox({
  items,
  activeIndex,
  onClose,
  onSelect,
}: ImageLightboxProps) {
  const touchStartX = useRef<number | null>(null);

  useEffect(() => {
    if (activeIndex === null) return;

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') {
        onSelect((activeIndex + 1) % items.length);
      }
      if (e.key === 'ArrowLeft') {
        onSelect((activeIndex - 1 + items.length) % items.length);
      }
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKey);
    };
  }, [activeIndex, items.length, onClose, onSelect]);

  if (activeIndex === null || !items[activeIndex]) return null;
  const current = items[activeIndex];
  const assetMeta = getImageAssetBySrc(current.url);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Destination Photo Gallery"
      className="fixed inset-0 z-50 bg-[#120A0A]/95 backdrop-blur-sm flex flex-col justify-between p-4 sm:p-8"
      onClick={onClose}
      onTouchStart={(e) => {
        touchStartX.current = e.touches[0]?.clientX ?? null;
      }}
      onTouchEnd={(e) => {
        if (touchStartX.current === null) return;
        const delta = (e.changedTouches[0]?.clientX ?? 0) - touchStartX.current;
        if (delta > 50) onSelect((activeIndex - 1 + items.length) % items.length);
        if (delta < -50) onSelect((activeIndex + 1) % items.length);
        touchStartX.current = null;
      }}
    >
      <div className="flex items-center justify-between text-[#EAE2D6]">
        <span className="text-xs tracking-widest uppercase tabular-nums">
          {activeIndex + 1} / {items.length}
        </span>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close photo lightbox"
          className="w-11 h-11 inline-flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div
        className="relative flex-1 flex items-center justify-center my-4"
        onClick={(e) => e.stopPropagation()}
      >
        {items.length > 1 && (
          <button
            type="button"
            onClick={() => onSelect((activeIndex - 1 + items.length) % items.length)}
            aria-label="Previous image"
            className="absolute left-0 sm:left-4 z-10 w-11 h-11 rounded-full bg-black/50 hover:bg-black/75 text-white inline-flex items-center justify-center transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
        )}

        <figure className="max-w-5xl max-h-[76vh] flex flex-col items-center">
          <img
            src={current.url}
            alt={current.alt}
            referrerPolicy="no-referrer"
            className="max-h-[65vh] w-auto max-w-full object-contain shadow-2xl"
          />
          <figcaption className="mt-4 text-center max-w-2xl space-y-1">
            <p className="text-[#DDD3C5] font-editorial italic text-lg">
              {current.caption}
            </p>
            {assetMeta && (
              <p className="text-[11px] text-[#A89D91]">
                Photo: {assetMeta.attribution} · {assetMeta.license}
              </p>
            )}
          </figcaption>
        </figure>

        {items.length > 1 && (
          <button
            type="button"
            onClick={() => onSelect((activeIndex + 1) % items.length)}
            aria-label="Next image"
            className="absolute right-0 sm:right-4 z-10 w-11 h-11 rounded-full bg-black/50 hover:bg-black/75 text-white inline-flex items-center justify-center transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        )}
      </div>

      <div className="flex items-center justify-center gap-2 overflow-x-auto py-1">
        {items.map((item, idx) => (
          <button
            key={idx}
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onSelect(idx);
            }}
            aria-label={`View image ${idx + 1}`}
            className={`w-14 h-10 overflow-hidden border transition-opacity ${
              idx === activeIndex
                ? 'border-[#D9690A] opacity-100'
                : 'border-white/20 opacity-50 hover:opacity-80'
            }`}
          >
            <img
              src={item.url}
              alt=""
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
