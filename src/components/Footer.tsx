import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, MessageCircle } from 'lucide-react';
import { BRAND, buildWhatsAppUrl } from '../data/brand.ts';
import { useSiteData } from '../context/SiteDataContext.tsx';
import { trackEvent } from '../lib/seo.ts';

export function Footer() {
  const { settings } = useSiteData();

  const socialLinks = [
    { label: 'Instagram', url: settings.instagramUrl },
    { label: 'Facebook', url: settings.facebookUrl },
    { label: 'YouTube', url: settings.youtubeUrl },
  ].filter((item) => item.url && item.url.startsWith('https://'));

  return (
    <footer className="bg-[#1C0D0D] text-[#EAE2D6] border-t border-white/10">
      <div className="max-w-[1380px] mx-auto px-5 sm:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-14 border-b border-white/10">
          {/* Brand Introduction */}
          <div className="md:col-span-4 space-y-5">
            <Link to="/" className="inline-flex items-center gap-3.5">
              <img
                src={BRAND.logoEmblem}
                alt="My Ujjain Darshan Official Emblem"
                className="w-12 h-12 rounded-full object-contain ring-1 ring-white/20"
              />
              <div>
                <div className="font-editorial text-2xl font-medium text-white leading-none">
                  My Ujjain Darshan
                </div>
                <div className="text-xs text-[#D1B584] tracking-wide mt-1">
                  {BRAND.tagline}
                </div>
              </div>
            </Link>

            <p className="text-sm text-[#CEC4B7] leading-relaxed max-w-sm">
              Dedicated to thoughtful spiritual travel, comfortable private journeys, and authentic heritage discovery across Ujjain, Omkareshwar, Maheshwar, and sacred Madhya Pradesh.
            </p>

            <p className="font-devanagari text-sm text-[#D1B584]">
              {BRAND.devanagariGreeting}
            </p>

            <div className="space-y-2.5 pt-2 text-sm text-[#EAE2D6]">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#D9690A] shrink-0 mt-0.5" aria-hidden="true" />
                <span>{settings.brandLocation || BRAND.location}</span>
              </div>
              <a
                href={BRAND.phoneHref}
                onClick={() => trackEvent('phone_click', { source: 'footer' })}
                className="flex items-center gap-2.5 hover:text-white transition-colors"
              >
                <Phone className="w-4 h-4 text-[#D9690A] shrink-0" aria-hidden="true" />
                <span className="tabular-nums">{settings.brandPhone || BRAND.phoneDisplay}</span>
              </a>
              <a
                href={buildWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent('whatsapp_click', { source: 'footer' })}
                className="flex items-center gap-2.5 hover:text-white transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-[#D9690A] shrink-0" aria-hidden="true" />
                <span>WhatsApp Concierge ({BRAND.phoneDisplay})</span>
              </a>
            </div>
          </div>

          {/* Journeys */}
          <div className="md:col-span-3 space-y-3.5">
            <h3 className="font-sans text-xs font-semibold tracking-widest uppercase text-[#D1B584]">
              Curated Journeys
            </h3>
            <ul className="space-y-2.5 text-sm text-[#CEC4B7]">
              <li>
                <Link to="/ujjain-darshan" className="hover:text-white transition-colors">
                  Ujjain Darshan (Signature)
                </Link>
              </li>
              <li>
                <Link to="/packages/omkareshwar" className="hover:text-white transition-colors">
                  Omkareshwar Jyotirlinga
                </Link>
              </li>
              <li>
                <Link
                  to="/packages/omkareshwar-maheshwar-mamleshwar-shani-temple"
                  className="hover:text-white transition-colors"
                >
                  Omkareshwar & Maheshwar Circuit
                </Link>
              </li>
              <li>
                <Link
                  to="/packages/indore-airport-ujjain-darshan-transfer"
                  className="hover:text-white transition-colors"
                >
                  Indore Airport Same-Day Darshan
                </Link>
              </li>
              <li>
                <Link to="/packages/airport-pickup-drop" className="hover:text-white transition-colors">
                  Airport Pickup & Drop
                </Link>
              </li>
              <li>
                <Link to="/packages" className="text-[#E6C999] hover:text-white transition-colors">
                  Explore All Packages
                </Link>
              </li>
            </ul>
          </div>

          {/* Destinations */}
          <div className="md:col-span-2 space-y-3.5">
            <h3 className="font-sans text-xs font-semibold tracking-widest uppercase text-[#D1B584]">
              Destinations
            </h3>
            <ul className="space-y-2.5 text-sm text-[#CEC4B7]">
              <li><Link to="/destinations/ujjain" className="hover:text-white transition-colors">Ujjain</Link></li>
              <li><Link to="/destinations/omkareshwar" className="hover:text-white transition-colors">Omkareshwar</Link></li>
              <li><Link to="/destinations/maheshwar" className="hover:text-white transition-colors">Maheshwar</Link></li>
              <li><Link to="/destinations/mandu" className="hover:text-white transition-colors">Mandu</Link></li>
              <li><Link to="/destinations/dewas" className="hover:text-white transition-colors">Dewas</Link></li>
              <li><Link to="/destinations/sanchi" className="hover:text-white transition-colors">Sanchi</Link></li>
              <li><Link to="/destinations/pachmarhi" className="hover:text-white transition-colors">Pachmarhi</Link></li>
              <li><Link to="/destinations/amarkantak" className="hover:text-white transition-colors">Amarkantak</Link></li>
            </ul>
          </div>

          {/* Company & Guides */}
          <div className="md:col-span-3 space-y-3.5">
            <h3 className="font-sans text-xs font-semibold tracking-widest uppercase text-[#D1B584]">
              Plan & Explore
            </h3>
            <ul className="space-y-2.5 text-sm text-[#CEC4B7]">
              <li><Link to="/plan-your-journey" className="hover:text-white transition-colors">Plan Your Journey</Link></li>
              <li><Link to="/our-fleet" className="hover:text-white transition-colors">Our Vehicles</Link></li>
              <li><Link to="/travel-journal" className="hover:text-white transition-colors">Travel Journal</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors">About My Ujjain Darshan</Link></li>
              <li><Link to="/faq" className="hover:text-white transition-colors">Frequently Asked Questions</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Contact Our Team</Link></li>
            </ul>

            {socialLinks.length > 0 && (
              <div className="pt-3 flex items-center gap-4 text-xs text-[#D1B584]">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white underline underline-offset-4"
                  >
                    {social.label}
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Legal & Attribution Bottom Row */}
        <div className="pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-[#AFA497]">
          <div className="space-y-1">
            <p>© {new Date().getFullYear()} My Ujjain Darshan. All rights reserved.</p>
            <p className="text-[#8E8478]">
              Independent spiritual travel planner. Temple rituals, darshan schedules, and Bhasma Aarti permissions remain under respective official temple trusts.
            </p>
            <p className="text-[#8E8478]">
              Made with love by{' '}
              <a
                href="https://additude.in"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white underline underline-offset-4 transition-colors"
              >
                additude.in
              </a>
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <Link to="/privacy-policy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms-and-conditions" className="hover:text-white transition-colors">
              Terms & Conditions
            </Link>
            <Link to="/cancellation-policy" className="hover:text-white transition-colors">
              Cancellation Policy
            </Link>
            <a href="/sitemap.xml" className="hover:text-white transition-colors">
              Sitemap
            </a>
            <Link to="/admin" className="hover:text-white transition-colors">
              Admin
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
