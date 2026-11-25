import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, MapPin, MessageCircle, Phone } from 'lucide-react';
import { BRAND, buildWhatsAppUrl } from '../data/brand.ts';
import { Breadcrumbs } from '../components/Breadcrumbs.tsx';
import { trackEvent, usePageSeo } from '../lib/seo.ts';

export function ContactPage() {
  usePageSeo({
    title: 'Contact My Ujjain Darshan — Phone & WhatsApp Concierge',
    description:
      'Connect directly with My Ujjain Darshan in Ujjain, Madhya Pradesh via phone or WhatsApp (+91 90093 36669 or +91 90093 46669) for Ujjain Darshan packages and custom quotations.',
    canonicalPath: '/contact',
  });

  return (
    <div className="pt-28 pb-24 bg-[#FBF8F3] min-h-screen">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-8">
        <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Contact' }]} />

        <div className="mt-6 max-w-3xl space-y-4">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#7A0806]">
            Direct Local Concierge
          </p>
          <h1 className="font-editorial text-4xl sm:text-6xl font-medium text-[#1F1A17] leading-[1.06]">
            Speak With Our Ujjain Team
          </h1>
          <p className="text-base text-[#524942] leading-relaxed">
            Whether you need an urgent Indore Airport pickup, advice on Ujjain Darshan pacing with senior parents, or a multi-day Madhya Pradesh quotation, reach us directly.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white border border-[#E5DCD0] p-7 space-y-4">
            <Phone className="w-6 h-6 text-[#7A0806]" />
            <h2 className="font-editorial text-2xl font-medium text-[#1F1A17]">
              Telephone
            </h2>
            <p className="text-sm text-[#574F48]">
              Direct telephone assistance for itinerary enquiries and pickup coordination.
            </p>
            <div className="space-y-1">
              {BRAND.contactPhones.map((phone) => (
                <a
                  key={phone.href}
                  href={phone.href}
                  onClick={() => trackEvent('phone_click', { source: 'contact_page' })}
                  className="block text-lg font-semibold text-[#7A0806] tabular-nums hover:underline"
                >
                  {phone.display}
                </a>
              ))}
            </div>
          </div>

          <div className="bg-white border border-[#E5DCD0] p-7 space-y-4">
            <MessageCircle className="w-6 h-6 text-[#1B6E41]" />
            <h2 className="font-editorial text-2xl font-medium text-[#1F1A17]">
              WhatsApp Planning Desk
            </h2>
            <p className="text-sm text-[#574F48]">
              Fastest way to share your arrival dates, traveler count, and receive written itineraries.
            </p>
            <div className="flex flex-wrap gap-2">
              {BRAND.contactPhones.map((phone, index) => (
                <a
                  key={phone.whatsappNumber}
                  href={index === 0 ? buildWhatsAppUrl() : `https://wa.me/${phone.whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackEvent('whatsapp_click', { source: 'contact_page' })}
                  className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#1B6E41] hover:bg-[#145532] text-white text-xs font-semibold rounded-sm"
                >
                  <span>WhatsApp {phone.display}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              ))}
            </div>
          </div>

          <div className="bg-white border border-[#E5DCD0] p-7 space-y-4">
            <MapPin className="w-6 h-6 text-[#7A0806]" />
            <h2 className="font-editorial text-2xl font-medium text-[#1F1A17]">
              Base Location
            </h2>
            <p className="text-sm text-[#574F48]">{BRAND.location}</p>
            <p className="text-xs text-[#655C54] leading-relaxed">
              Serving Ujjain, Indore Airport (IDR), Omkareshwar, Maheshwar, Mandu, Dewas, Bhopal, Sanchi, Pachmarhi, and Amarkantak.
            </p>
          </div>
        </div>

        <div className="mt-12 bg-white border border-[#E5DCD0] p-8 sm:p-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="max-w-xl space-y-2">
            <h2 className="font-editorial text-3xl font-medium text-[#1F1A17]">
              Want a Structured Custom Quotation?
            </h2>
            <p className="text-sm text-[#574F48] leading-relaxed">
              Use our interactive 4-step Trip Planner to select exact temples, dates, pickup location, and vehicle preferences so our team can respond with precision.
            </p>
          </div>
          <Link
            to="/plan-your-journey"
            className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#7A0806] hover:bg-[#580605] text-white text-xs font-semibold rounded-sm whitespace-nowrap"
          >
            <span>Open Trip Planner</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
