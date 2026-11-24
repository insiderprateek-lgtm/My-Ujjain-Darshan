import React, { useEffect, useState } from 'react';
import { BRAND } from '../data/brand.ts';
import { getImageAssetBySrc, LEGACY_IMAGE_FALLBACKS } from '../data/imageRegistry.ts';

interface ResilientImageProps {
  src: string;
  alt: string;
  className?: string;
  loading?: 'eager' | 'lazy';
  fetchPriority?: 'high' | 'low' | 'auto';
  sizes?: string;
  objectPosition?: string;
  fallbackLabel?: string;
}

export function ResilientImage({
  src,
  alt,
  className = '',
  loading = 'lazy',
  fetchPriority = 'auto',
  sizes = '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw',
  objectPosition,
  fallbackLabel,
}: ResilientImageProps) {
  const resolvedSrc = LEGACY_IMAGE_FALLBACKS[src] || src;
  const meta = getImageAssetBySrc(resolvedSrc);

  const [failed, setFailed] = useState(false);
  const [loaded, setLoaded] = useState(loading === 'eager');

  useEffect(() => {
    setFailed(false);
    setLoaded(loading === 'eager');
  }, [resolvedSrc, loading]);

  if (failed || !resolvedSrc) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`flex flex-col items-center justify-center bg-[#F3EDE3] border border-[#E2D6C5] text-[#4A413B] p-6 text-center ${className}`}
      >
        <img
          src={BRAND.logoEmblem}
          alt="My Ujjain Darshan Emblem"
          width={44}
          height={44}
          className="w-11 h-11 rounded-full opacity-80 mb-3 object-contain"
        />
        <span className="font-editorial text-lg font-medium text-[#1F1A17] tracking-wide">
          {fallbackLabel || meta?.subject || alt}
        </span>
        <span className="text-[11px] uppercase tracking-widest text-[#7A6F65] mt-1">
          Photograph Pending Verification
        </span>
      </div>
    );
  }

  const effectivePosition = objectPosition || meta?.objectPosition;
  const srcSet = meta
    ? `${meta.srcSm} 800w, ${meta.src} ${meta.width}w`
    : undefined;

  return (
    <img
      src={resolvedSrc}
      srcSet={srcSet}
      sizes={srcSet ? sizes : undefined}
      width={meta?.width}
      height={meta?.height}
      alt={alt || meta?.alt || ''}
      loading={loading}
      decoding={loading === 'eager' ? 'sync' : 'async'}
      fetchPriority={fetchPriority}
      referrerPolicy="no-referrer"
      style={effectivePosition ? { objectPosition: effectivePosition } : undefined}
      onLoad={() => setLoaded(true)}
      onError={() => setFailed(true)}
      className={`${className} transition-opacity duration-500 ${
        loaded ? 'opacity-100' : 'opacity-0'
      }`}
    />
  );
}
