import React, { useEffect, useState, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown, Menu, Phone, X, ArrowUpRight } from 'lucide-react';
import { BRAND, buildWhatsAppUrl } from '../data/brand.ts';
import { useSiteData } from '../context/SiteDataContext.tsx';
import { trackEvent } from '../lib/seo.ts';

export function Header() {
  const location = useLocation();
  const { packages, destinations } = useSiteData();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeMega, setActiveMega] = useState<'journeys' | 'destinations' | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<'journeys' | 'destinations' | null>(null);
  const megaTimeout = useRef<number | null>(null);

  const isHeroRoute =
    location.pathname === '/' ||
    location.pathname === '/ujjain-darshan' ||
    location.pathname.startsWith('/packages/') ||
    location.pathname.startsWith('/destinations/');

  const isTransparent = isHeroRoute && !scrolled && !activeMega && !mobileOpen;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 36);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setActiveMega(null);
  }, [location.pathname]);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  const openMega = (key: 'journeys' | 'destinations') => {
    if (megaTimeout.current) window.clearTimeout(megaTimeout.current);
    setActiveMega(key);
  };

  const scheduleCloseMega = () => {
    if (megaTimeout.current) window.clearTimeout(megaTimeout.current);
    megaTimeout.current = window.setTimeout(() => setActiveMega(null), 160);
  };

  const featuredPackages = packages.slice(0, 6);
  const featuredDestinations = destinations.slice(0, 8);

  const isActive = (path: string) =>
    path === '/'
      ? location.pathname === '/'
      : location.pathname === path || location.pathname.startsWith(`${path}/`);

  const linkClass = (path: string) =>
    `relative py-1 text-[13.5px] font-medium tracking-[0.01em] transition-colors whitespace-nowrap shrink-0 ${
      isTransparent
        ? isActive(path)
          ? 'text-white'
          : 'text-white/85 hover:text-white'
        : isActive(path)
          ? 'text-[#7A0806]'
          : 'text-[#2B2420] hover:text-[#7A0806]'
    }`;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-[100] transition-colors duration-300 ${
        isTransparent
          ? 'bg-gradient-to-b from-black/65 via-black/30 to-transparent'
          : 'bg-[#FBF8F3]/96 backdrop-blur-md border-b border-[#E6DDD0]'
      }`}
      onMouseLeave={scheduleCloseMega}
    >
      <div className="max-w-[1380px] mx-auto px-5 sm:px-8 h-[76px] flex items-center justify-between gap-8">
        {/* Zone 1: Official Brand Logo Lockup */}
        <Link
          to="/"
          aria-label="My Ujjain Darshan — Home"
          className="flex items-center gap-3 shrink-0 whitespace-nowrap group"
        >
          {isTransparent ? (
            <>
              <img
                src={BRAND.logoEmblem}
                alt="My Ujjain Darshan Official Emblem"
                className="h-11 w-11 rounded-full object-contain shadow-sm ring-1 ring-white/20"
              />
              <span className="font-editorial text-[22px] sm:text-[24px] font-semibold tracking-tight text-white">
                My Ujjain Darshan
              </span>
            </>
          ) : (
            <img
              src={BRAND.logoWordmark}
              alt="My Ujjain Darshan"
              className="h-12 w-auto object-contain py-0.5 mix-blend-multiply"
            />
          )}
        </Link>

        {/* Zone 2: Concise Single-Line Desktop Navigation */}
        <nav
          aria-label="Primary Navigation"
          className="hidden lg:flex items-center gap-7"
        >
          <Link to="/ujjain-darshan" className={linkClass('/ujjain-darshan')}>
            Explore Ujjain
          </Link>

          <div
            className="relative"
            onMouseEnter={() => openMega('journeys')}
          >
            <Link
              to="/packages"
              className={`${linkClass('/packages')} inline-flex items-center gap-1`}
              aria-expanded={activeMega === 'journeys'}
            >
              <span>Our Journeys</span>
              <ChevronDown className="w-3.5 h-3.5 opacity-75" aria-hidden="true" />
            </Link>
          </div>

          <div
            className="relative"
            onMouseEnter={() => openMega('destinations')}
          >
            <Link
              to="/destinations"
              className={`${linkClass('/destinations')} inline-flex items-center gap-1`}
              aria-expanded={activeMega === 'destinations'}
            >
              <span>Destinations</span>
              <ChevronDown className="w-3.5 h-3.5 opacity-75" aria-hidden="true" />
            </Link>
          </div>

          <Link to="/travel-journal" className={linkClass('/travel-journal')}>
            Journal
          </Link>

          <Link to="/about" className={linkClass('/about')}>
            About Us
          </Link>

          <Link to="/contact" className={linkClass('/contact')}>
            Contact
          </Link>
        </nav>

        {/* Zone 3: Single Primary Action + Mobile Menu Trigger */}
        <div className="flex items-center gap-3 shrink-0">
          <Link
            to="/plan-your-journey"
            className={`hidden sm:inline-flex items-center justify-center px-5 py-2.5 text-[13px] font-semibold tracking-[0.02em] rounded-sm transition-colors whitespace-nowrap shrink-0 ${
              isTransparent
                ? 'bg-[#FBF8F3] text-[#580605] hover:bg-white'
                : 'bg-[#7A0806] text-[#FBF8F3] hover:bg-[#580605]'
            }`}
          >
            Plan Your Journey
          </Link>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileOpen}
            className={`lg:hidden inline-flex items-center justify-center w-11 h-11 rounded-sm transition-colors ${
              isTransparent
                ? 'text-white hover:bg-white/10'
                : 'text-[#1F1A17] hover:bg-[#EFE8DC]'
            }`}
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Desktop Mega Menu Panel */}
      {activeMega && (
        <div
          onMouseEnter={() => openMega(activeMega)}
          onMouseLeave={scheduleCloseMega}
          className="hidden lg:block bg-[#FBF8F3] border-b border-[#E5DCD0] shadow-lg"
        >
          <div className="max-w-[1380px] mx-auto px-8 py-8">
            {activeMega === 'journeys' ? (
              <div className="grid grid-cols-12 gap-8">
                <div className="col-span-4 pr-6 border-r border-[#E6DDD0]">
                  <p className="text-xs font-medium text-[#7A0806] tracking-widest uppercase mb-2">
                    Signature Experience
                  </p>
                  <h3 className="font-editorial text-2xl font-medium text-[#1F1A17] mb-3">
                    Ujjain Darshan Sacred Circuit
                  </h3>
                  <p className="text-sm text-[#655C54] leading-relaxed mb-5">
                    Our flagship one-day private journey through Shri Mahakaleshwar, Mahakal Lok, Harsiddhi Mata, Ram Ghat, and the ancient northern shrines.
                  </p>
                  <Link
                    to="/ujjain-darshan"
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#7A0806] hover:text-[#580605]"
                  >
                    <span>Explore Signature Page</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </Link>
                </div>

                <div className="col-span-8">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-medium tracking-widest uppercase text-[#655C54]">
                      Featured Spiritual & Heritage Packages
                    </span>
                    <Link
                      to="/packages"
                      className="text-xs font-semibold text-[#7A0806] hover:underline"
                    >
                      View all {packages.length} journeys
                    </Link>
                  </div>
                  <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                    {featuredPackages.map((pkg) => (
                      <Link
                        key={pkg.slug}
                        to={pkg.slug === 'ujjain-darshan' ? '/ujjain-darshan' : `/packages/${pkg.slug}`}
                        className="group block py-1.5 border-b border-[#EFE8DC] hover:border-[#7A0806]/30 transition-colors"
                      >
                        <div className="text-sm font-semibold text-[#1F1A17] group-hover:text-[#7A0806] transition-colors">
                          {pkg.name}
                        </div>
                        <div className="text-xs text-[#655C54] mt-0.5">
                          {pkg.duration} · {pkg.destinations.join(', ')}
                        </div>
                      </Link>
                    ))}
                  </div>
                  <div className="mt-5 pt-4 border-t border-[#E6DDD0] flex items-center gap-6 text-xs font-medium text-[#655C54]">
                    <Link to="/our-fleet" className="hover:text-[#7A0806]">
                      Curated Vehicles & Fleet
                    </Link>
                    <Link to="/faq" className="hover:text-[#7A0806]">
                      Pilgrimage FAQs
                    </Link>
                    <Link to="/plan-your-journey" className="hover:text-[#7A0806]">
                      Custom Trip Planner
                    </Link>
                  </div>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-12 gap-8">
                <div className="col-span-4 pr-6 border-r border-[#E6DDD0]">
                  <p className="text-xs font-medium text-[#7A0806] tracking-widest uppercase mb-2">
                    Sacred Madhya Pradesh
                  </p>
                  <h3 className="font-editorial text-2xl font-medium text-[#1F1A17] mb-3">
                    Rivers, Jyotirlingas & Timeless Stone
                  </h3>
                  <p className="text-sm text-[#655C54] leading-relaxed mb-5">
                    From the banks of the Shipra in Ujjain to Mandhata Island in Omkareshwar, Ahilya Fort in Maheshwar, and the UNESCO hilltops of Sanchi.
                  </p>
                  <Link
                    to="/destinations"
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#7A0806] hover:text-[#580605]"
                  >
                    <span>All Destination Guides</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </Link>
                </div>

                <div className="col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {featuredDestinations.map((dest) => (
                    <Link
                      key={dest.slug}
                      to={`/destinations/${dest.slug}`}
                      className="group block p-3 rounded-sm hover:bg-[#F3EDE3] transition-colors"
                    >
                      <div className="font-editorial text-xl font-medium text-[#1F1A17] group-hover:text-[#7A0806]">
                        {dest.name}
                      </div>
                      <div className="text-xs text-[#655C54] mt-1 line-clamp-2">
                        {dest.region}
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Mobile Full-Height Drawer */}
      {mobileOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation"
          className="lg:hidden fixed inset-x-0 bottom-0 top-[76px] bg-[#FBF8F3] z-[110] overflow-y-auto overscroll-contain px-6 py-6 flex flex-col justify-between shadow-2xl"
        >
          <div className="space-y-1">
            <Link
              to="/"
              className="block py-3.5 text-lg font-editorial font-medium text-[#1F1A17] border-b border-[#E6DDD0]"
            >
              Home
            </Link>
            <Link
              to="/ujjain-darshan"
              className="block py-3.5 text-lg font-editorial font-medium text-[#7A0806] border-b border-[#E6DDD0]"
            >
              Explore Ujjain (Signature Darshan)
            </Link>

            <div className="border-b border-[#E6DDD0]">
              <button
                type="button"
                onClick={() =>
                  setMobileExpanded((cur) => (cur === 'journeys' ? null : 'journeys'))
                }
                className="w-full py-3.5 flex items-center justify-between text-lg font-editorial font-medium text-[#1F1A17]"
              >
                <span>Our Journeys</span>
                <ChevronDown
                  className={`w-5 h-5 transition-transform ${
                    mobileExpanded === 'journeys' ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {mobileExpanded === 'journeys' && (
                <div className="pb-4 pl-3 space-y-2.5">
                  <Link to="/packages" className="block text-sm font-semibold text-[#7A0806]">
                    View All Packages
                  </Link>
                  {packages.slice(0, 6).map((pkg) => (
                    <Link
                      key={pkg.slug}
                      to={pkg.slug === 'ujjain-darshan' ? '/ujjain-darshan' : `/packages/${pkg.slug}`}
                      className="block text-sm text-[#4A413B]"
                    >
                      {pkg.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <div className="border-b border-[#E6DDD0]">
              <button
                type="button"
                onClick={() =>
                  setMobileExpanded((cur) => (cur === 'destinations' ? null : 'destinations'))
                }
                className="w-full py-3.5 flex items-center justify-between text-lg font-editorial font-medium text-[#1F1A17]"
              >
                <span>Destinations</span>
                <ChevronDown
                  className={`w-5 h-5 transition-transform ${
                    mobileExpanded === 'destinations' ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {mobileExpanded === 'destinations' && (
                <div className="pb-4 pl-3 grid grid-cols-2 gap-2.5">
                  <Link to="/destinations" className="col-span-2 text-sm font-semibold text-[#7A0806]">
                    All Destinations
                  </Link>
                  {destinations.map((d) => (
                    <Link
                      key={d.slug}
                      to={`/destinations/${d.slug}`}
                      className="block text-sm text-[#4A413B]"
                    >
                      {d.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              to="/our-fleet"
              className="block py-3.5 text-lg font-editorial font-medium text-[#1F1A17] border-b border-[#E6DDD0]"
            >
              Our Vehicles
            </Link>
            <Link
              to="/travel-journal"
              className="block py-3.5 text-lg font-editorial font-medium text-[#1F1A17] border-b border-[#E6DDD0]"
            >
              Travel Journal
            </Link>
            <Link
              to="/about"
              className="block py-3.5 text-lg font-editorial font-medium text-[#1F1A17] border-b border-[#E6DDD0]"
            >
              About Us
            </Link>
            <Link
              to="/faq"
              className="block py-3.5 text-lg font-editorial font-medium text-[#1F1A17] border-b border-[#E6DDD0]"
            >
              FAQs
            </Link>
            <Link
              to="/contact"
              className="block py-3.5 text-lg font-editorial font-medium text-[#1F1A17]"
            >
              Contact
            </Link>
          </div>

          <div className="pt-6 mt-6 border-t border-[#E6DDD0] space-y-3 pb-24">
            <Link
              to="/plan-your-journey"
              className="block w-full text-center py-3.5 px-5 bg-[#7A0806] text-[#FBF8F3] font-semibold text-sm rounded-sm"
            >
              Plan Your Journey
            </Link>
            <div className="grid grid-cols-2 gap-3">
              <a
                href={BRAND.phoneHref}
                onClick={() => trackEvent('phone_click', { source: 'mobile_menu' })}
                className="flex items-center justify-center gap-2 py-3 px-4 border border-[#D8CCBC] text-sm font-medium text-[#1F1A17] rounded-sm"
              >
                <Phone className="w-4 h-4 text-[#7A0806]" />
                <span>Call Us</span>
              </a>
              <a
                href={buildWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent('whatsapp_click', { source: 'mobile_menu' })}
                className="flex items-center justify-center gap-2 py-3 px-4 bg-[#1E6F43] text-white text-sm font-medium rounded-sm"
              >
                <span>WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
