import React, { useState } from 'react';
import { MessageSquareText, Phone } from 'lucide-react';
import { BRAND, buildWhatsAppUrl } from '../data/brand.ts';
import { useSiteData } from '../context/SiteDataContext.tsx';
import { trackEvent } from '../lib/seo.ts';
import { TravelBuddyChatbot } from './TravelBuddyChatbot.tsx';

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M12.031 2C6.502 2 2 6.494 2 12.018c0 1.982.581 3.83 1.584 5.388L2.5 22l4.742-1.242a9.975 9.975 0 0 0 4.789 1.224h.004c5.529 0 10.03-4.494 10.03-10.018A9.97 9.97 0 0 0 19.129 4.9 9.976 9.976 0 0 0 12.031 2Zm5.84 14.287c-.245.692-1.434 1.324-1.99 1.404-.506.074-1.164.105-1.878-.12-.433-.138-.988-.321-1.7-.629-2.99-1.292-4.943-4.31-5.092-4.509-.149-.199-1.216-1.617-1.216-3.084 0-1.468.769-2.189 1.042-2.487.273-.299.596-.373.794-.373.199 0 .397.002.571.01.184.009.43-.07.673.514.248.597.844 2.064.919 2.214.075.149.124.323.025.522-.1.199-.149.323-.298.497-.149.174-.314.389-.447.522-.149.149-.304.31-.13.608.174.298.773 1.276 1.66 2.067 1.14 1.016 2.101 1.331 2.399 1.48.298.149.472.124.646-.075.174-.199.745-.87.944-1.169.199-.298.397-.248.67-.149.274.1 1.739.82 2.037.969.298.149.497.224.571.348.075.125.075.721-.17 1.414Z" />
    </svg>
  );
}

export function FloatingContactControls() {
  const { whatsappContextMessage, hasStickyMobileBar, compareSlugs } = useSiteData();
  const [isChatOpen, setIsChatOpen] = useState(false);

  const whatsappHref = buildWhatsAppUrl(whatsappContextMessage || undefined);

  // Lift floating buttons smoothly above mobile sticky package CTA bar or compare bar
  const bottomOffsetClass = hasStickyMobileBar
    ? 'bottom-24 lg:bottom-7'
    : compareSlugs.length > 0
      ? 'bottom-20 sm:bottom-20'
      : 'bottom-6';

  return (
    <>
      {!isChatOpen && (
        <div
          aria-label="Direct Communication Controls"
          className={`fixed right-4 sm:right-6 z-40 flex flex-col items-end gap-3 transition-all duration-200 ${bottomOffsetClass}`}
        >
          {/* Floating Call Control */}
          <a
            href={BRAND.phoneHref}
            onClick={() => trackEvent('phone_click', { source: 'floating_button' })}
            aria-label={`Call My Ujjain Darshan at ${BRAND.phoneDisplay}`}
            className="group flex items-center gap-2.5 bg-[#7A0806] hover:bg-[#580605] text-[#FBF8F3] rounded-full shadow-lg shadow-black/20 h-11 px-3 transition-all duration-200 focus-visible:ring-2 focus-visible:ring-[#D9690A]"
          >
            <span className="hidden sm:inline-block max-w-0 overflow-hidden whitespace-nowrap text-xs font-semibold tracking-wide transition-all duration-300 group-hover:max-w-[140px] group-hover:pl-1">
              Call {BRAND.phoneDisplay}
            </span>
            <Phone className="w-4.5 h-4.5 shrink-0" aria-hidden="true" />
          </a>

          {/* Floating WhatsApp Control */}
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackEvent('whatsapp_click', { source: 'floating_button' })}
            aria-label="Plan Your Journey on WhatsApp with My Ujjain Darshan"
            className="group flex items-center gap-2.5 bg-[#1B6E41] hover:bg-[#145532] text-white rounded-full shadow-lg shadow-black/25 h-11 px-3 transition-all duration-200 focus-visible:ring-2 focus-visible:ring-[#D9690A]"
          >
            <span className="hidden md:inline-block max-w-0 overflow-hidden whitespace-nowrap text-xs font-semibold tracking-wide transition-all duration-300 group-hover:max-w-[200px] group-hover:pl-1">
              Plan Your Journey on WhatsApp
            </span>
            <WhatsAppIcon className="w-5 h-5 shrink-0" />
          </a>

          {/* Travel Buddy Interactive Chatbot Launcher */}
          <button
            type="button"
            onClick={() => {
              trackEvent('travel_buddy_open', { source: 'floating_launcher' });
              setIsChatOpen(true);
            }}
            aria-label="Open Travel Buddy chat assistant"
            className="group flex items-center gap-2.5 bg-[#1F1A17] hover:bg-[#332A25] text-[#FBF8F3] border border-[#A68247]/70 rounded-full shadow-xl shadow-black/30 h-13 pl-2.5 pr-4 transition-all duration-200 focus-visible:ring-2 focus-visible:ring-[#A68247] cursor-pointer"
          >
            <span className="h-8 w-8 rounded-full bg-[#FBF8F3] p-0.5 shrink-0 overflow-hidden ring-1 ring-[#A68247]">
              <img
                src={BRAND.logoEmblem}
                alt=""
                aria-hidden="true"
                className="h-full w-full object-cover rounded-full"
              />
            </span>
            <span className="flex flex-col items-start text-left leading-tight">
              <span className="text-xs font-semibold tracking-wide text-white">
                Travel Buddy
              </span>
              <span className="text-[10px] text-[#E6CFA8]">Ask &amp; Plan Trip</span>
            </span>
            <MessageSquareText
              className="w-4 h-4 text-[#E6CFA8] shrink-0 hidden sm:block"
              aria-hidden="true"
            />
          </button>
        </div>
      )}

      <TravelBuddyChatbot isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </>
  );
}

