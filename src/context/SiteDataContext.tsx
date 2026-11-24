import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import type {
  ArticleRecord,
  DestinationRecord,
  FaqRecord,
  PublicPackage,
  TestimonialRecord,
  VehicleRecord,
} from '../types/models.ts';

interface SiteDataContextValue {
  packages: PublicPackage[];
  destinations: DestinationRecord[];
  vehicles: VehicleRecord[];
  articles: ArticleRecord[];
  faqs: FaqRecord[];
  testimonials: TestimonialRecord[];
  settings: Record<string, string>;
  loading: boolean;
  error: string | null;
  refreshData: () => Promise<void>;
  savedSlugs: string[];
  toggleSavedPackage: (slug: string) => void;
  compareSlugs: string[];
  toggleComparePackage: (slug: string) => void;
  clearCompare: () => void;
  compareModalOpen: boolean;
  setCompareModalOpen: (open: boolean) => void;
  whatsappContextMessage: string | null;
  setWhatsappContextMessage: (msg: string | null) => void;
  hasStickyMobileBar: boolean;
  setHasStickyMobileBar: (active: boolean) => void;
}

const SiteDataContext = createContext<SiteDataContextValue | null>(null);

const SAVED_KEY = 'mud_saved_journeys_v1';

function readSavedSlugs(): string[] {
  try {
    const raw = window.localStorage.getItem(SAVED_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter((s) => typeof s === 'string').slice(0, 8) : [];
  } catch {
    return [];
  }
}

export function SiteDataProvider({ children }: { children: React.ReactNode }) {
  const [packages, setPackages] = useState<PublicPackage[]>([]);
  const [destinations, setDestinations] = useState<DestinationRecord[]>([]);
  const [vehicles, setVehicles] = useState<VehicleRecord[]>([]);
  const [articles, setArticles] = useState<ArticleRecord[]>([]);
  const [faqs, setFaqs] = useState<FaqRecord[]>([]);
  const [testimonials, setTestimonials] = useState<TestimonialRecord[]>([]);
  const [settings, setSettings] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [savedSlugs, setSavedSlugs] = useState<string[]>(() => readSavedSlugs());
  const [compareSlugs, setCompareSlugs] = useState<string[]>([]);
  const [compareModalOpen, setCompareModalOpen] = useState(false);
  const [whatsappContextMessage, setWhatsappContextMessage] = useState<string | null>(null);
  const [hasStickyMobileBar, setHasStickyMobileBar] = useState(false);

  const refreshData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/bootstrap');
      if (!response.ok) {
        throw new Error('Unable to load journey catalog from server.');
      }
      const data = await response.json();
      setPackages(data.packages || []);
      setDestinations(data.destinations || []);
      setVehicles(data.vehicles || []);
      setArticles(data.articles || []);
      setFaqs(data.faqs || []);
      setTestimonials(data.testimonials || []);
      setSettings(data.settings || {});
    } catch (err) {
      console.error('Bootstrap fetch error:', err);
      setError(
        err instanceof Error
          ? err.message
          : 'Unable to load travel information right now.'
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void refreshData();
  }, [refreshData]);

  const toggleSavedPackage = useCallback((slug: string) => {
    setSavedSlugs((prev) => {
      const next = prev.includes(slug)
        ? prev.filter((item) => item !== slug)
        : [...prev, slug].slice(0, 8);
      try {
        window.localStorage.setItem(SAVED_KEY, JSON.stringify(next));
      } catch {
        // Ignore storage quota errors
      }
      return next;
    });
  }, []);

  const toggleComparePackage = useCallback((slug: string) => {
    setCompareSlugs((prev) => {
      if (prev.includes(slug)) {
        return prev.filter((item) => item !== slug);
      }
      if (prev.length >= 3) {
        return [...prev.slice(1), slug];
      }
      return [...prev, slug];
    });
  }, []);

  const clearCompare = useCallback(() => {
    setCompareSlugs([]);
    setCompareModalOpen(false);
  }, []);

  return (
    <SiteDataContext.Provider
      value={{
        packages,
        destinations,
        vehicles,
        articles,
        faqs,
        testimonials,
        settings,
        loading,
        error,
        refreshData,
        savedSlugs,
        toggleSavedPackage,
        compareSlugs,
        toggleComparePackage,
        clearCompare,
        compareModalOpen,
        setCompareModalOpen,
        whatsappContextMessage,
        setWhatsappContextMessage,
        hasStickyMobileBar,
        setHasStickyMobileBar,
      }}
    >
      {children}
    </SiteDataContext.Provider>
  );
}

export function useSiteData() {
  const ctx = useContext(SiteDataContext);
  if (!ctx) {
    throw new Error('useSiteData must be used inside SiteDataProvider');
  }
  return ctx;
}
