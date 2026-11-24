import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Header } from './Header.tsx';
import { Footer } from './Footer.tsx';
import { FloatingContactControls } from './FloatingContactControls.tsx';
import { CompareModal } from './CompareModal.tsx';
import { useSiteData } from '../context/SiteDataContext.tsx';

export function Layout() {
  const { pathname } = useLocation();
  const { setWhatsappContextMessage, setHasStickyMobileBar } = useSiteData();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
    setWhatsappContextMessage(null);
    setHasStickyMobileBar(false);
  }, [pathname, setWhatsappContextMessage, setHasStickyMobileBar]);

  return (
    <div className="min-h-screen flex flex-col bg-[#FBF8F3] text-[#1F1A17]">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:px-4 focus:py-2 focus:bg-[#7A0806] focus:text-white focus:text-xs focus:font-semibold"
      >
        Skip to main content
      </a>

      <Header />

      <main id="main-content" className="flex-1">
        <Outlet />
      </main>

      <Footer />
      <FloatingContactControls />
      <CompareModal />
    </div>
  );
}
