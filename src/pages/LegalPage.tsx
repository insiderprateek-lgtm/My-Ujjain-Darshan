import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { BRAND } from '../data/brand.ts';
import { Breadcrumbs } from '../components/Breadcrumbs.tsx';
import { usePageSeo } from '../lib/seo.ts';

type LegalDocType = 'privacy' | 'terms' | 'cancellation';

const LEGAL_DOCS: Record<
  LegalDocType,
  {
    title: string;
    canonical: string;
    intro: string;
    sections: { heading: string; body: string }[];
  }
> = {
  privacy: {
    title: 'Privacy Policy',
    canonical: '/privacy-policy',
    intro:
      'This Privacy Policy draft outlines how My Ujjain Darshan collects, uses, and safeguards contact and trip-planning details submitted through our website.',
    sections: [
      {
        heading: '1. Information We Collect',
        body: 'When you submit a travel enquiry via our Plan Your Journey form, we collect your name, mobile number, optional email address, preferred travel dates, passenger counts, pickup/drop locations, and any voluntary travel preferences you choose to share. We do not require you to disclose medical records or sensitive personal data.',
      },
      {
        heading: '2. Purpose of Processing',
        body: 'Your enquiry details are used strictly to prepare personalized itineraries, confirm vehicle availability, share written quotations via your chosen contact method (WhatsApp, phone, or email), and coordinate confirmed travel services.',
      },
      {
        heading: '3. Data Retention & Security',
        body: 'Enquiry records are stored in a secured database accessible only to authorized My Ujjain Darshan administrators. We never sell or rent customer phone numbers or personal data to third-party telemarketers. You may request deletion of your enquiry records by contacting +91 90093 36669 / +91 90093 46669.',
      },
      {
        heading: '4. Analytics & Cookies',
        body: 'Essential local browser storage is used solely to remember your optional Saved Journeys shortlist. Personally identifying information is never transmitted to analytics services.',
      },
    ],
  },
  terms: {
    title: 'Terms and Conditions',
    canonical: '/terms-and-conditions',
    intro:
      'These draft Terms and Conditions govern enquiries and private travel arrangements requested through My Ujjain Darshan.',
    sections: [
      {
        heading: '1. Quotation-Based Booking Model',
        body: 'Submitting an enquiry on this website requests a personalized quotation and does not constitute a confirmed booking or binding price guarantee. Services, pricing, vehicle class, inclusions, and exclusions take effect only once confirmed in writing by My Ujjain Darshan.',
      },
      {
        heading: '2. Temple Administration & Official Rituals',
        body: 'My Ujjain Darshan is an independent travel service based in Ujjain. We are not affiliated with the Shri Mahakaleshwar Temple Management Committee or any temple trust. Official temple entry fees, Bhasma Aarti permissions, puja bookings, ASI monument tickets, and forest permits are governed solely by their respective authorities.',
      },
      {
        heading: '3. Route & Schedule Flexibility',
        body: 'Local traffic regulations, festival crowds (such as Mahashivratri, Shravan Mondays, or Simhastha periods), and weather conditions may require practical adjustments to sightseeing order or drop-off points in pedestrian temple zones.',
      },
    ],
  },
  cancellation: {
    title: 'Cancellation Policy',
    canonical: '/cancellation-policy',
    intro:
      'Draft operational framework for rescheduling or cancelling confirmed private travel arrangements with My Ujjain Darshan.',
    sections: [
      {
        heading: '1. Written Confirmation Terms Apply',
        body: 'Because My Ujjain Darshan operates on personalized written quotations rather than automated online checkout, specific advance payment, rescheduling, and cancellation terms are communicated clearly in writing for each booking prior to confirmation.',
      },
      {
        heading: '2. Advance Notice',
        body: 'If your travel dates or flight timings change, please inform our Ujjain team as early as possible via WhatsApp or telephone (+91 90093 36669 / +91 90093 46669) so vehicle scheduling can be adjusted smoothly.',
      },
      {
        heading: '3. Third-Party Reservations',
        body: 'Any independently booked temple slots, railway/flight tickets, forest Gypsy permits, or hotel stays are subject strictly to the respective provider’s cancellation rules.',
      },
    ],
  },
};

export function LegalPage({ type }: { type: LegalDocType }) {
  const doc = LEGAL_DOCS[type];

  usePageSeo({
    title: `${doc.title} | My Ujjain Darshan`,
    description: doc.intro,
    canonicalPath: doc.canonical,
  });

  return (
    <div className="pt-28 pb-24 bg-[#FBF8F3] min-h-screen">
      <div className="max-w-3xl mx-auto px-5 sm:px-8">
        <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: doc.title }]} />

        <div className="mt-6 space-y-4">
          <h1 className="font-editorial text-4xl sm:text-5xl font-medium text-[#1F1A17]">
            {doc.title}
          </h1>
          <p className="text-sm text-[#574F48] leading-relaxed">{doc.intro}</p>
        </div>

        <div className="mt-6 p-5 bg-[#FFF9ED] border border-[#E5CFA3] text-xs text-[#614718] flex items-start gap-3 leading-relaxed">
          <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5 text-[#B47A14]" />
          <p>
            <strong>Draft Notice for Operator & Legal Review:</strong> This policy text is a structured draft prepared for My Ujjain Darshan. Before commercial publication, business leadership and legal counsel should review and approve exact payment, cancellation, and governing-jurisdiction clauses.
          </p>
        </div>

        <div className="mt-10 bg-white border border-[#E5DCD0] p-7 sm:p-10 space-y-8">
          {doc.sections.map((sec, idx) => (
            <section key={idx} className="space-y-2.5">
              <h2 className="font-editorial text-2xl font-medium text-[#1F1A17]">
                {sec.heading}
              </h2>
              <p className="text-sm text-[#4A413B] leading-[1.8]">{sec.body}</p>
            </section>
          ))}

          <div className="pt-6 border-t border-[#EFE8DC] text-xs text-[#655C54]">
            Contact: {BRAND.name} · {BRAND.location} · {BRAND.phoneDisplay}
          </div>
        </div>
      </div>
    </div>
  );
}
