import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  Loader2,
  MessageCircle,
  Phone,
  ShieldCheck,
} from 'lucide-react';
import {
  BRAND,
  UJJAIN_LANDMARKS,
  buildPackageWhatsAppMessage,
  buildWhatsAppUrl,
} from '../data/brand.ts';
import { useSiteData } from '../context/SiteDataContext.tsx';
import { Breadcrumbs } from '../components/Breadcrumbs.tsx';
import { trackEvent, usePageSeo } from '../lib/seo.ts';

const TRAVEL_TYPES = [
  'Family Pilgrimage',
  'Couple / Solo Spiritual Visit',
  'Senior-Citizen-Friendly Journey',
  'Airport Transfer + Darshan',
  'Multi-Day Madhya Pradesh Heritage Tour',
  'Extended Family / Group Yatra',
];

const INTEREST_OPTIONS = [
  'Jyotirlinga Darshan',
  'Historic Temples & Shakti Peethas',
  'Shipra & Narmada River Ghats',
  'Heritage Architecture (Maheshwar / Mandu / Sanchi)',
  'Unhurried Senior-Friendly Pacing',
  'Highland Nature (Pachmarhi / Amarkantak)',
];

const VEHICLE_OPTIONS = [
  'Comfort Sedan (Swift Dzire or equivalent)',
  'Family MPV (Maruti Ertiga or equivalent)',
  'Executive SUV (Toyota Innova / Crysta)',
  'Group Coach (Tempo Traveller)',
  'Not Sure — Please Recommend',
];

const INDIAN_PHONE_CHECK = /^(?:\+?91[\s-]?)?[6-9]\d{9}$/;

export function PlanYourJourneyPage() {
  const [searchParams] = useSearchParams();
  const { packages } = useSiteData();

  const preselectedSlug = searchParams.get('package') || '';
  const preselectedDest = searchParams.get('destination') || '';
  const preselectedTemple = searchParams.get('temple') || '';
  const preselectedVehicle = searchParams.get('vehicle') || '';
  const preselectedDate = searchParams.get('date') || '';

  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [confirmedRef, setConfirmedRef] = useState<{
    referenceCode: string;
    interestedPackageName: string;
  } | null>(null);

  const [form, setForm] = useState({
    interestedPackageSlug: preselectedSlug,
    interestedPackageName: preselectedDest
      ? `Custom Journey to ${preselectedDest}`
      : 'Ujjain Darshan',
    travelType: 'Family Pilgrimage',
    durationDays: '1–2 Days',
    arrivalDate: preselectedDate,
    returnDate: '',
    adults: 2,
    children: 0,
    pickupLocation: 'Ujjain Hotel / Railway Station',
    dropLocation: 'Ujjain Hotel / Railway Station',
    vehiclePreference: preselectedVehicle || 'Not Sure — Please Recommend',
    interests: ['Jyotirlinga Darshan'] as string[],
    templesOfInterest: preselectedTemple
      ? [preselectedTemple]
      : ['Shri Mahakaleshwar Jyotirlinga', 'Shri Mahakal Lok Corridor'],
    seniorTravelers: false,
    accessibilityNotes: '',
    hotelAssistance: false,
    guideRequired: false,
    specialRequirements: '',
    customerName: '',
    contactPhone: '',
    email: '',
    preferredContactMethod: 'whatsapp' as 'whatsapp' | 'phone' | 'email',
    consentAccepted: false,
    honeypot: '',
  });

  usePageSeo({
    title: 'Plan Your Journey — Custom Ujjain Darshan Quotation | My Ujjain Darshan',
    description:
      'Share your preferred travel dates, destinations, and comfort preferences to receive a tailored Ujjain Darshan or Madhya Pradesh itinerary and written quotation.',
    canonicalPath: '/plan-your-journey',
  });

  useEffect(() => {
    trackEvent('planner_start', { preselected: preselectedSlug || preselectedDest || 'none' });
  }, [preselectedSlug, preselectedDest]);

  useEffect(() => {
    if (preselectedSlug && packages.length > 0) {
      const found = packages.find((p) => p.slug === preselectedSlug);
      if (found) {
        setForm((prev) => ({
          ...prev,
          interestedPackageSlug: found.slug,
          interestedPackageName: found.name,
          pickupLocation: found.startingLocation,
          dropLocation: found.endingLocation,
        }));
      }
    }
  }, [preselectedSlug, packages]);

  const toggleArrayItem = (field: 'interests' | 'templesOfInterest', value: string) => {
    setForm((prev) => {
      const exists = prev[field].includes(value);
      return {
        ...prev,
        [field]: exists
          ? prev[field].filter((v) => v !== value)
          : [...prev[field], value],
      };
    });
  };

  const validateCurrentStep = (targetStep: number): boolean => {
    const errors: Record<string, string> = {};
    if (step === 1) {
      if (!form.interestedPackageName.trim()) {
        errors.interestedPackageName = 'Please choose a package or custom journey.';
      }
    }
    if (step === 2) {
      if (form.adults < 1) {
        errors.adults = 'At least 1 adult traveler is required.';
      }
    }
    if (step === 4 && targetStep > 4) {
      if (form.customerName.trim().length < 2) {
        errors.customerName = 'Please enter your full name.';
      }
      if (!INDIAN_PHONE_CHECK.test(form.contactPhone.replace(/\s+/g, ''))) {
        errors.contactPhone =
          'Please enter a valid 10-digit Indian mobile number (with optional +91).';
      }
      if (form.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
        errors.email = 'Please enter a valid email address or leave blank.';
      }
      if (!form.consentAccepted) {
        errors.consentAccepted =
          'Please confirm privacy consent so our team may contact you regarding this enquiry.';
      }
    }
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleNext = () => {
    if (validateCurrentStep(step + 1) && step < 4) {
      setStep((prev) => (prev + 1) as 1 | 2 | 3 | 4);
      window.scrollTo({ top: 140, behavior: 'smooth' });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);
    if (!validateCurrentStep(5)) return;

    setSubmitting(true);
    try {
      const response = await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          sourcePage: window.location.pathname + window.location.search,
        }),
      });
      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        if (data.fieldErrors) {
          const flat: Record<string, string> = {};
          for (const [k, v] of Object.entries(data.fieldErrors)) {
            if (Array.isArray(v) && v[0]) flat[k] = String(v[0]);
          }
          setFieldErrors(flat);
        }
        throw new Error(
          data.error || 'Unable to submit enquiry. Please verify your details and try again.'
        );
      }

      setConfirmedRef({
        referenceCode: data.enquiry.referenceCode,
        interestedPackageName: data.enquiry.interestedPackageName,
      });
      trackEvent('planner_complete', {
        package_slug: form.interestedPackageSlug || 'custom',
      });
      trackEvent('enquiry_submit', {
        package_slug: form.interestedPackageSlug || 'custom',
      });
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      setSubmitError(
        err instanceof Error
          ? err.message
          : 'Network error while sending your enquiry. Your details are preserved—please retry or connect on WhatsApp.'
      );
    } finally {
      setSubmitting(false);
    }
  };

  const whatsappSummaryHref = buildWhatsAppUrl(
    buildPackageWhatsAppMessage({
      packageName: `${form.interestedPackageName}${
        confirmedRef ? ` (Ref: ${confirmedRef.referenceCode})` : ''
      }`,
      dates: form.arrivalDate
        ? `${form.arrivalDate}${form.returnDate ? ` to ${form.returnDate}` : ''}`
        : form.durationDays,
      travelers: `${form.adults} Adults${form.children > 0 ? `, ${form.children} Children` : ''}${
        form.seniorTravelers ? ' (Includes Senior Travelers)' : ''
      }`,
      pickup: form.pickupLocation,
      vehicle: form.vehiclePreference,
      notes: form.specialRequirements || undefined,
    })
  );

  return (
    <div className="pt-28 pb-24 bg-[#FBF8F3] min-h-screen">
      <div className="max-w-[1160px] mx-auto px-5 sm:px-8">
        <Breadcrumbs
          items={[{ label: 'Home', to: '/' }, { label: 'Plan Your Journey' }]}
        />

        {confirmedRef ? (
          <div className="mt-10 bg-white border border-[#E5DCD0] p-8 sm:p-12 space-y-7 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#1B6E41]">
              <CheckCircle2 className="w-5 h-5" />
              <span>Enquiry Recorded Successfully</span>
            </div>

            <div className="space-y-2">
              <h1 className="font-editorial text-4xl sm:text-5xl font-medium text-[#1F1A17]">
                Thank You, {form.customerName}.
              </h1>
              <p className="text-sm sm:text-base text-[#524942] leading-relaxed">
                Your journey enquiry has been safely saved with our Ujjain planning team. Please note this is a quotation request—our team will confirm vehicle availability, tailored routing, and exact pricing directly with you before any booking is finalized.
              </p>
            </div>

            <div className="bg-[#FBF8F3] border border-[#E5DCD0] p-6 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div>
                <div className="text-[11px] uppercase tracking-wider text-[#7A6F65]">
                  Enquiry Reference Code
                </div>
                <div className="font-semibold text-[#7A0806] text-lg tabular-nums mt-0.5">
                  {confirmedRef.referenceCode}
                </div>
              </div>
              <div>
                <div className="text-[11px] uppercase tracking-wider text-[#7A6F65]">
                  Selected Journey
                </div>
                <div className="font-semibold text-[#1F1A17] mt-0.5">
                  {confirmedRef.interestedPackageName}
                </div>
              </div>
              <div>
                <div className="text-[11px] uppercase tracking-wider text-[#7A6F65]">
                  Travelers
                </div>
                <div className="text-[#1F1A17] mt-0.5 tabular-nums">
                  {form.adults} Adults{form.children > 0 ? `, ${form.children} Children` : ''}
                </div>
              </div>
              <div>
                <div className="text-[11px] uppercase tracking-wider text-[#7A6F65]">
                  Preferred Contact
                </div>
                <div className="text-[#1F1A17] mt-0.5 capitalize">
                  {form.preferredContactMethod} ({form.contactPhone})
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href={whatsappSummaryHref}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() =>
                  trackEvent('whatsapp_click', { source: 'enquiry_confirmation' })
                }
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#1B6E41] hover:bg-[#145532] text-white text-xs font-semibold rounded-sm transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Send Summary on WhatsApp Now</span>
              </a>

              <Link
                to="/packages"
                className="inline-flex items-center px-6 py-3.5 border border-[#D4C7B5] text-[#1F1A17] text-xs font-semibold rounded-sm hover:border-[#7A0806]"
              >
                Continue Exploring Journeys
              </Link>
            </div>
          </div>
        ) : (
          <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* LEFT 8 COLS: MULTI-STEP PLANNER */}
            <div className="lg:col-span-8">
              <div className="space-y-3 mb-8">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#7A0806]">
                  Personalized Travel Planner
                </p>
                <h1 className="font-editorial text-4xl sm:text-5xl font-medium text-[#1F1A17] leading-[1.08]">
                  Tell Us the Journey You Envision
                </h1>
                <p className="text-sm text-[#574F48] leading-relaxed">
                  Complete four brief steps below to receive a transparent, tailored itinerary and quotation from our Ujjain team.
                </p>
              </div>

              {/* Accessible Progress Bar */}
              <nav aria-label="Trip planner steps" className="mb-8">
                <ol className="grid grid-cols-4 gap-2">
                  {[
                    { num: 1, label: 'Journey' },
                    { num: 2, label: 'Travel Details' },
                    { num: 3, label: 'Preferences' },
                    { num: 4, label: 'Contact' },
                  ].map((s) => {
                    const active = step === s.num;
                    const done = step > s.num;
                    return (
                      <li key={s.num}>
                        <button
                          type="button"
                          onClick={() => {
                            if (s.num < step) setStep(s.num as 1 | 2 | 3 | 4);
                          }}
                          disabled={s.num > step}
                          className={`w-full text-left pt-3 border-t-2 transition-colors ${
                            active
                              ? 'border-[#7A0806] text-[#7A0806]'
                              : done
                                ? 'border-[#A68247] text-[#1F1A17]'
                                : 'border-[#E2D8C9] text-[#8D8277]'
                          }`}
                        >
                          <div className="text-[11px] font-semibold tabular-nums">
                            0{s.num}
                          </div>
                          <div className="text-xs font-semibold truncate">
                            {s.label}
                          </div>
                        </button>
                      </li>
                    );
                  })}
                </ol>
              </nav>

              <form
                onSubmit={handleSubmit}
                noValidate
                className="bg-white border border-[#E5DCD0] p-6 sm:p-9 space-y-7"
              >
                {/* Invisible Honeypot Field */}
                <div className="sr-only" aria-hidden="true">
                  <label htmlFor="website-field">Leave blank</label>
                  <input
                    id="website-field"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    value={form.honeypot}
                    onChange={(e) => setForm({ ...form, honeypot: e.target.value })}
                  />
                </div>

                {/* STEP 1 — CHOOSE YOUR JOURNEY */}
                {step === 1 && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="font-editorial text-3xl font-medium text-[#1F1A17]">
                        Step 1 — Choose Your Journey
                      </h2>
                      <p className="text-xs text-[#655C54] mt-1">
                        Pick a curated package or choose a completely custom itinerary.
                      </p>
                    </div>

                    <div>
                      <label
                        htmlFor="pkg-select"
                        className="block text-xs font-semibold text-[#2B2420] mb-2"
                      >
                        Preferred Package or Route *
                      </label>
                      <select
                        id="pkg-select"
                        value={form.interestedPackageSlug || '__custom__'}
                        onChange={(e) => {
                          const slug = e.target.value;
                          if (slug === '__custom__') {
                            setForm((prev) => ({
                              ...prev,
                              interestedPackageSlug: '',
                              interestedPackageName: 'Custom Personalized Journey',
                            }));
                          } else {
                            const found = packages.find((p) => p.slug === slug);
                            setForm((prev) => ({
                              ...prev,
                              interestedPackageSlug: slug,
                              interestedPackageName: found?.name || slug,
                              pickupLocation: found?.startingLocation || prev.pickupLocation,
                              dropLocation: found?.endingLocation || prev.dropLocation,
                            }));
                          }
                        }}
                        className="w-full px-4 py-3 bg-[#FBF8F3] border border-[#DDD2C2] text-sm text-[#1F1A17] rounded-sm"
                      >
                        <option value="__custom__">
                          Custom Personalized Itinerary (Design Your Own Route)
                        </option>
                        <optgroup label="Core Route Catalog">
                          {packages
                            .filter((p) => p.catalogType === 'reference-catalog')
                            .map((p) => (
                              <option key={p.slug} value={p.slug}>
                                {p.name} ({p.duration})
                              </option>
                            ))}
                        </optgroup>
                        <optgroup label="Proposed Ujjain-First Experiences">
                          {packages
                            .filter((p) => p.catalogType === 'proposed-experience')
                            .map((p) => (
                              <option key={p.slug} value={p.slug}>
                                {p.name} ({p.duration})
                              </option>
                            ))}
                        </optgroup>
                      </select>
                      {fieldErrors.interestedPackageName && (
                        <p className="text-xs text-[#9B1C1C] mt-1.5">
                          {fieldErrors.interestedPackageName}
                        </p>
                      )}
                    </div>

                    <div>
                      <span className="block text-xs font-semibold text-[#2B2420] mb-2.5">
                        Travel Style *
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {TRAVEL_TYPES.map((type) => {
                          const active = form.travelType === type;
                          return (
                            <button
                              key={type}
                              type="button"
                              onClick={() => setForm({ ...form, travelType: type })}
                              className={`p-3.5 text-left text-xs font-medium border rounded-sm transition-colors flex items-center justify-between ${
                                active
                                  ? 'border-[#7A0806] bg-[#7A0806]/6 text-[#7A0806]'
                                  : 'border-[#E2D8C9] text-[#3A322C] hover:border-[#B8A894]'
                              }`}
                            >
                              <span>{type}</span>
                              {active && <Check className="w-4 h-4 shrink-0" />}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="duration-days"
                        className="block text-xs font-semibold text-[#2B2420] mb-2"
                      >
                        Approximate Number of Days
                      </label>
                      <select
                        id="duration-days"
                        value={form.durationDays}
                        onChange={(e) => setForm({ ...form, durationDays: e.target.value })}
                        className="w-full px-4 py-3 bg-[#FBF8F3] border border-[#DDD2C2] text-sm text-[#1F1A17] rounded-sm"
                      >
                        <option value="Half Day / Airport Transfer">Half Day / Airport Transfer</option>
                        <option value="1 Full Day">1 Full Day</option>
                        <option value="1–2 Days">1–2 Days</option>
                        <option value="3–4 Days">3–4 Days</option>
                        <option value="5+ Days">5+ Days (Multi-Destination)</option>
                        <option value="Flexible / Undecided">Flexible / Need Recommendation</option>
                      </select>
                    </div>
                  </div>
                )}

                {/* STEP 2 — TRAVEL DETAILS */}
                {step === 2 && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="font-editorial text-3xl font-medium text-[#1F1A17]">
                        Step 2 — Dates, Group Size & Vehicle
                      </h2>
                      <p className="text-xs text-[#655C54] mt-1">
                        Approximate dates are welcome if flights or trains are not yet booked.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label
                          htmlFor="arrival-date"
                          className="block text-xs font-semibold text-[#2B2420] mb-1.5"
                        >
                          Preferred Arrival Date
                        </label>
                        <input
                          id="arrival-date"
                          type="date"
                          value={form.arrivalDate}
                          onChange={(e) => setForm({ ...form, arrivalDate: e.target.value })}
                          className="w-full px-4 py-3 bg-[#FBF8F3] border border-[#DDD2C2] text-sm rounded-sm"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="return-date"
                          className="block text-xs font-semibold text-[#2B2420] mb-1.5"
                        >
                          Return Date (Optional)
                        </label>
                        <input
                          id="return-date"
                          type="date"
                          value={form.returnDate}
                          onChange={(e) => setForm({ ...form, returnDate: e.target.value })}
                          className="w-full px-4 py-3 bg-[#FBF8F3] border border-[#DDD2C2] text-sm rounded-sm"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-5">
                      <div>
                        <label
                          htmlFor="adults-count"
                          className="block text-xs font-semibold text-[#2B2420] mb-1.5"
                        >
                          Adults *
                        </label>
                        <input
                          id="adults-count"
                          type="number"
                          min={1}
                          max={80}
                          value={form.adults}
                          onChange={(e) =>
                            setForm({ ...form, adults: Math.max(1, Number(e.target.value) || 1) })
                          }
                          className="w-full px-4 py-3 bg-[#FBF8F3] border border-[#DDD2C2] text-sm tabular-nums rounded-sm"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="children-count"
                          className="block text-xs font-semibold text-[#2B2420] mb-1.5"
                        >
                          Children
                        </label>
                        <input
                          id="children-count"
                          type="number"
                          min={0}
                          max={40}
                          value={form.children}
                          onChange={(e) =>
                            setForm({ ...form, children: Math.max(0, Number(e.target.value) || 0) })
                          }
                          className="w-full px-4 py-3 bg-[#FBF8F3] border border-[#DDD2C2] text-sm tabular-nums rounded-sm"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label
                          htmlFor="pickup-loc"
                          className="block text-xs font-semibold text-[#2B2420] mb-1.5"
                        >
                          Pickup Location
                        </label>
                        <input
                          id="pickup-loc"
                          type="text"
                          value={form.pickupLocation}
                          onChange={(e) => setForm({ ...form, pickupLocation: e.target.value })}
                          placeholder="e.g., Indore Airport, Ujjain Junction, Hotel"
                          className="w-full px-4 py-3 bg-[#FBF8F3] border border-[#DDD2C2] text-sm rounded-sm"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="drop-loc"
                          className="block text-xs font-semibold text-[#2B2420] mb-1.5"
                        >
                          Drop Location
                        </label>
                        <input
                          id="drop-loc"
                          type="text"
                          value={form.dropLocation}
                          onChange={(e) => setForm({ ...form, dropLocation: e.target.value })}
                          placeholder="e.g., Indore Airport, Ujjain Hotel"
                          className="w-full px-4 py-3 bg-[#FBF8F3] border border-[#DDD2C2] text-sm rounded-sm"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="vehicle-pref"
                        className="block text-xs font-semibold text-[#2B2420] mb-1.5"
                      >
                        Preferred Vehicle Category
                      </label>
                      <select
                        id="vehicle-pref"
                        value={form.vehiclePreference}
                        onChange={(e) => setForm({ ...form, vehiclePreference: e.target.value })}
                        className="w-full px-4 py-3 bg-[#FBF8F3] border border-[#DDD2C2] text-sm rounded-sm"
                      >
                        {VEHICLE_OPTIONS.map((v) => (
                          <option key={v} value={v}>
                            {v}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                )}

                {/* STEP 3 — PREFERENCES */}
                {step === 3 && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="font-editorial text-3xl font-medium text-[#1F1A17]">
                        Step 3 — Sacred Sites & Comfort Preferences
                      </h2>
                      <p className="text-xs text-[#655C54] mt-1">
                        Help us tailor your route sequence and pacing. All comfort fields are optional.
                      </p>
                    </div>

                    <div>
                      <span className="block text-xs font-semibold text-[#2B2420] mb-2.5">
                        Primary Travel Interests
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {INTEREST_OPTIONS.map((item) => {
                          const selected = form.interests.includes(item);
                          return (
                            <button
                              key={item}
                              type="button"
                              onClick={() => toggleArrayItem('interests', item)}
                              className={`p-3 text-left text-xs font-medium border rounded-sm transition-colors flex items-center justify-between gap-2 ${
                                selected
                                  ? 'border-[#7A0806] bg-[#7A0806]/6 text-[#7A0806]'
                                  : 'border-[#E2D8C9] text-[#3A322C]'
                              }`}
                            >
                              <span>{item}</span>
                              {selected && <Check className="w-3.5 h-3.5 shrink-0" />}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div>
                      <span className="block text-xs font-semibold text-[#2B2420] mb-2.5">
                        Ujjain Temples & Landmarks of Particular Interest
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {UJJAIN_LANDMARKS.map((lm) => {
                          const selected = form.templesOfInterest.includes(lm.name);
                          return (
                            <button
                              key={lm.id}
                              type="button"
                              onClick={() => toggleArrayItem('templesOfInterest', lm.name)}
                              className={`px-3 py-1.5 text-xs font-medium border rounded-sm transition-colors ${
                                selected
                                  ? 'border-[#7A0806] bg-[#7A0806] text-white'
                                  : 'border-[#DDD2C2] bg-[#FBF8F3] text-[#3A322C]'
                              }`}
                            >
                              {lm.name.replace('Shri ', '')}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                      <label className="flex items-start gap-2.5 p-3.5 bg-[#FBF8F3] border border-[#E5DCD0] cursor-pointer text-xs">
                        <input
                          type="checkbox"
                          checked={form.seniorTravelers}
                          onChange={(e) =>
                            setForm({ ...form, seniorTravelers: e.target.checked })
                          }
                          className="mt-0.5 accent-[#7A0806]"
                        />
                        <span>
                          <strong className="block text-[#1F1A17]">Senior Travelers</strong>
                          Prefer gentle pacing & rest breaks
                        </span>
                      </label>

                      <label className="flex items-start gap-2.5 p-3.5 bg-[#FBF8F3] border border-[#E5DCD0] cursor-pointer text-xs">
                        <input
                          type="checkbox"
                          checked={form.hotelAssistance}
                          onChange={(e) =>
                            setForm({ ...form, hotelAssistance: e.target.checked })
                          }
                          className="mt-0.5 accent-[#7A0806]"
                        />
                        <span>
                          <strong className="block text-[#1F1A17]">Hotel Guidance</strong>
                          Request optional stay suggestions
                        </span>
                      </label>

                      <label className="flex items-start gap-2.5 p-3.5 bg-[#FBF8F3] border border-[#E5DCD0] cursor-pointer text-xs">
                        <input
                          type="checkbox"
                          checked={form.guideRequired}
                          onChange={(e) =>
                            setForm({ ...form, guideRequired: e.target.checked })
                          }
                          className="mt-0.5 accent-[#7A0806]"
                        />
                        <span>
                          <strong className="block text-[#1F1A17]">Local Guide</strong>
                          Enquire about heritage guide option
                        </span>
                      </label>
                    </div>

                    <div>
                      <label
                        htmlFor="accessibility-notes"
                        className="block text-xs font-semibold text-[#2B2420] mb-1.5"
                      >
                        Voluntary Mobility or Practical Seating Notes (Optional)
                      </label>
                      <input
                        id="accessibility-notes"
                        type="text"
                        value={form.accessibilityNotes}
                        onChange={(e) =>
                          setForm({ ...form, accessibilityNotes: e.target.value })
                        }
                        placeholder="e.g., folding wheelchair luggage space, avoid steep stair routes (no medical details needed)"
                        className="w-full px-4 py-3 bg-[#FBF8F3] border border-[#DDD2C2] text-sm rounded-sm"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="special-req"
                        className="block text-xs font-semibold text-[#2B2420] mb-1.5"
                      >
                        Additional Requests or Flight / Train Timings (Optional)
                      </label>
                      <textarea
                        id="special-req"
                        rows={3}
                        value={form.specialRequirements}
                        onChange={(e) =>
                          setForm({ ...form, specialRequirements: e.target.value })
                        }
                        placeholder="Share arrival timings, extra destinations (e.g., Omkareshwar or Dewas), or questions..."
                        className="w-full px-4 py-3 bg-[#FBF8F3] border border-[#DDD2C2] text-sm rounded-sm"
                      />
                    </div>
                  </div>
                )}

                {/* STEP 4 — CONTACT DETAILS */}
                {step === 4 && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="font-editorial text-3xl font-medium text-[#1F1A17]">
                        Step 4 — Your Contact Details
                      </h2>
                      <p className="text-xs text-[#655C54] mt-1">
                        Used exclusively by My Ujjain Darshan to prepare and share your quotation.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label
                          htmlFor="cust-name"
                          className="block text-xs font-semibold text-[#2B2420] mb-1.5"
                        >
                          Full Name *
                        </label>
                        <input
                          id="cust-name"
                          type="text"
                          required
                          value={form.customerName}
                          onChange={(e) => setForm({ ...form, customerName: e.target.value })}
                          placeholder="Your full name"
                          className="w-full px-4 py-3 bg-[#FBF8F3] border border-[#DDD2C2] text-sm rounded-sm"
                        />
                        {fieldErrors.customerName && (
                          <p className="text-xs text-[#9B1C1C] mt-1">{fieldErrors.customerName}</p>
                        )}
                      </div>

                      <div>
                        <label
                          htmlFor="cust-phone"
                          className="block text-xs font-semibold text-[#2B2420] mb-1.5"
                        >
                          Mobile Number (India) *
                        </label>
                        <input
                          id="cust-phone"
                          type="tel"
                          required
                          value={form.contactPhone}
                          onChange={(e) => setForm({ ...form, contactPhone: e.target.value })}
                          placeholder="+91 98XXX XXXXX"
                          className="w-full px-4 py-3 bg-[#FBF8F3] border border-[#DDD2C2] text-sm tabular-nums rounded-sm"
                        />
                        {fieldErrors.contactPhone && (
                          <p className="text-xs text-[#9B1C1C] mt-1">{fieldErrors.contactPhone}</p>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label
                          htmlFor="cust-email"
                          className="block text-xs font-semibold text-[#2B2420] mb-1.5"
                        >
                          Email Address (Optional)
                        </label>
                        <input
                          id="cust-email"
                          type="email"
                          value={form.email}
                          onChange={(e) => setForm({ ...form, email: e.target.value })}
                          placeholder="name@example.com"
                          className="w-full px-4 py-3 bg-[#FBF8F3] border border-[#DDD2C2] text-sm rounded-sm"
                        />
                        {fieldErrors.email && (
                          <p className="text-xs text-[#9B1C1C] mt-1">{fieldErrors.email}</p>
                        )}
                      </div>

                      <div>
                        <label
                          htmlFor="pref-contact"
                          className="block text-xs font-semibold text-[#2B2420] mb-1.5"
                        >
                          Preferred Contact Method
                        </label>
                        <select
                          id="pref-contact"
                          value={form.preferredContactMethod}
                          onChange={(e) =>
                            setForm({
                              ...form,
                              preferredContactMethod: e.target.value as
                                | 'whatsapp'
                                | 'phone'
                                | 'email',
                            })
                          }
                          className="w-full px-4 py-3 bg-[#FBF8F3] border border-[#DDD2C2] text-sm rounded-sm"
                        >
                          <option value="whatsapp">WhatsApp</option>
                          <option value="phone">Phone Call</option>
                          <option value="email">Email</option>
                        </select>
                      </div>
                    </div>

                    <div className="pt-2">
                      <label className="flex items-start gap-3 cursor-pointer text-xs text-[#4A413B] leading-relaxed">
                        <input
                          type="checkbox"
                          checked={form.consentAccepted}
                          onChange={(e) =>
                            setForm({ ...form, consentAccepted: e.target.checked })
                          }
                          className="mt-1 accent-[#7A0806]"
                        />
                        <span>
                          I consent to My Ujjain Darshan storing my enquiry details and contacting me via my chosen method to share a travel quotation, in accordance with the{' '}
                          <Link
                            to="/privacy-policy"
                            className="text-[#7A0806] underline"
                          >
                            Privacy Policy
                          </Link>
                          .
                        </span>
                      </label>
                      {fieldErrors.consentAccepted && (
                        <p className="text-xs text-[#9B1C1C] mt-1.5">
                          {fieldErrors.consentAccepted}
                        </p>
                      )}
                    </div>

                    {submitError && (
                      <div
                        role="alert"
                        className="p-4 bg-[#FDF2F2] border border-[#E5B4B4] text-xs text-[#8B1A1A] flex items-start gap-2.5"
                      >
                        <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                        <span>{submitError}</span>
                      </div>
                    )}
                  </div>
                )}

                {/* Navigation Controls */}
                <div className="pt-6 border-t border-[#EFE8DC] flex items-center justify-between gap-4">
                  {step > 1 ? (
                    <button
                      type="button"
                      onClick={() => setStep((prev) => (prev - 1) as 1 | 2 | 3 | 4)}
                      className="inline-flex items-center gap-2 px-5 py-3 border border-[#D4C7B5] text-xs font-semibold text-[#1F1A17] rounded-sm hover:border-[#7A0806]"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      <span>Previous Step</span>
                    </button>
                  ) : (
                    <div />
                  )}

                  {step < 4 ? (
                    <button
                      type="button"
                      onClick={handleNext}
                      className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#7A0806] hover:bg-[#580605] text-white text-xs font-semibold tracking-wide rounded-sm transition-colors"
                    >
                      <span>Continue</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={submitting}
                      className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#7A0806] hover:bg-[#580605] disabled:opacity-60 text-white text-xs font-semibold tracking-wide rounded-sm transition-colors"
                    >
                      {submitting && <Loader2 className="w-4 h-4 animate-spin" />}
                      <span>{submitting ? 'Submitting Enquiry...' : 'Submit Journey Enquiry'}</span>
                    </button>
                  )}
                </div>
              </form>
            </div>

            {/* RIGHT 4 COLS: LIVE SUMMARY & DIRECT CONCIERGE */}
            <aside className="lg:col-span-4 space-y-6 lg:sticky lg:top-24">
              <div className="bg-white border border-[#E5DCD0] p-6 space-y-5">
                <h3 className="font-editorial text-2xl font-medium text-[#1F1A17]">
                  Your Journey Summary
                </h3>
                <dl className="space-y-3 text-xs border-t border-[#EFE8DC] pt-4">
                  <div>
                    <dt className="text-[#7A6F65]">Selected Journey</dt>
                    <dd className="font-semibold text-[#1F1A17] mt-0.5">
                      {form.interestedPackageName}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-[#7A6F65]">Style & Duration</dt>
                    <dd className="text-[#1F1A17] mt-0.5">
                      {form.travelType} · {form.durationDays}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-[#7A6F65]">Travelers</dt>
                    <dd className="text-[#1F1A17] mt-0.5 tabular-nums">
                      {form.adults} Adults
                      {form.children > 0 ? `, ${form.children} Children` : ''}
                    </dd>
                  </div>
                  {form.arrivalDate && (
                    <div>
                      <dt className="text-[#7A6F65]">Dates</dt>
                      <dd className="text-[#1F1A17] mt-0.5 tabular-nums">
                        {form.arrivalDate}
                        {form.returnDate ? ` → ${form.returnDate}` : ''}
                      </dd>
                    </div>
                  )}
                  <div>
                    <dt className="text-[#7A6F65]">Vehicle Preference</dt>
                    <dd className="text-[#1F1A17] mt-0.5">{form.vehiclePreference}</dd>
                  </div>
                </dl>

                <div className="pt-4 border-t border-[#EFE8DC] space-y-2.5">
                  <p className="text-xs text-[#655C54]">
                    Prefer speaking directly with our Ujjain desk?
                  </p>
                  <a
                    href={whatsappSummaryHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full py-2.5 px-4 bg-[#1B6E41] hover:bg-[#145532] text-white text-xs font-semibold rounded-sm"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Share Draft on WhatsApp</span>
                  </a>
                  <a
                    href={BRAND.phoneHref}
                    className="flex items-center justify-center gap-2 w-full py-2.5 px-4 border border-[#D4C7B5] text-[#1F1A17] text-xs font-semibold rounded-sm"
                  >
                    <Phone className="w-3.5 h-3.5 text-[#7A0806]" />
                    <span className="tabular-nums">{BRAND.phoneDisplay}</span>
                  </a>
                </div>
              </div>

              <div className="bg-[#F3EDE3] border border-[#E2D6C5] p-5 text-xs text-[#4A413B] space-y-2 leading-relaxed">
                <div className="flex items-center gap-2 font-semibold text-[#1F1A17]">
                  <ShieldCheck className="w-4 h-4 text-[#7A0806]" />
                  <span>No Upfront Payment Required</span>
                </div>
                <p>
                  Submitting an enquiry simply requests a tailored itinerary and written quotation. Temple rituals and Bhasma Aarti permissions remain booked directly via official temple portals.
                </p>
              </div>
            </aside>
          </div>
        )}
      </div>
    </div>
  );
}
