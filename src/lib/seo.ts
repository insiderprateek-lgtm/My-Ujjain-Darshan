import { useEffect } from 'react';

interface SeoConfig {
  title: string;
  description: string;
  canonicalPath?: string;
  jsonLd?: Record<string, unknown> | null;
}

function upsertMeta(attr: 'name' | 'property', key: string, content: string) {
  let el = document.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

export function usePageSeo({ title, description, canonicalPath, jsonLd }: SeoConfig) {
  useEffect(() => {
    document.title = title;
    upsertMeta('name', 'description', description);
    upsertMeta('property', 'og:title', title);
    upsertMeta('property', 'og:description', description);
    upsertMeta('name', 'twitter:title', title);
    upsertMeta('name', 'twitter:description', description);

    const canonicalUrl =
      window.location.origin + (canonicalPath || window.location.pathname);
    upsertMeta('property', 'og:url', canonicalUrl);

    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', canonicalUrl);

    const scriptId = 'mud-page-jsonld';
    const existing = document.getElementById(scriptId);
    if (existing) existing.remove();

    if (jsonLd) {
      const script = document.createElement('script');
      script.id = scriptId;
      script.type = 'application/ld+json';
      script.textContent = JSON.stringify(jsonLd);
      document.head.appendChild(script);
    }

    return () => {
      const node = document.getElementById(scriptId);
      if (node) node.remove();
    };
  }, [title, description, canonicalPath, jsonLd]);
}

// Consent-aware, privacy-safe analytics event dispatcher (never sends PII)
export function trackEvent(
  eventName:
    | 'package_view'
    | 'package_enquiry_click'
    | 'whatsapp_click'
    | 'phone_click'
    | 'planner_start'
    | 'planner_complete'
    | 'enquiry_submit'
    | 'package_filter_change'
    | 'journal_to_package_click'
    | 'travel_buddy_open'
    | 'travel_buddy_message'
    | 'travel_buddy_lead_submitted',
  metadata: Record<string, string | number | boolean> = {}
) {
  try {
    const win = window as unknown as {
      dataLayer?: Record<string, unknown>[];
      gtag?: (...args: unknown[]) => void;
    };
    if (Array.isArray(win.dataLayer)) {
      win.dataLayer.push({ event: eventName, ...metadata });
    }
    if (typeof win.gtag === 'function') {
      win.gtag('event', eventName, metadata);
    }
  } catch {
    // Non-blocking analytics
  }
}
