import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  CheckCircle2,
  ClipboardList,
  Loader2,
  Mail,
  MessageCircle,
  Phone,
  RotateCcw,
  Send,
  X,
} from 'lucide-react';
import { BRAND, buildWhatsAppUrl } from '../data/brand.ts';
import { useSiteData } from '../context/SiteDataContext.tsx';
import { trackEvent } from '../lib/seo.ts';

interface CapturedLeadInfo {
  referenceCode: string;
  emailForwarded: boolean;
  deliveryChannel: string;
  recipientEmail: string;
  interestedPackageName: string;
  customerName?: string;
  contactPhone?: string;
}

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  needsHumanSupport?: boolean;
  shouldOfferLeadCapture?: boolean;
  suggestedQuickReplies?: string[];
  capturedLead?: CapturedLeadInfo | null;
  isError?: boolean;
}

interface LeadFormState {
  customerName: string;
  contactPhone: string;
  email: string;
  interestedPackageName: string;
  arrivalDate: string;
  adults: number;
  pickupLocation: string;
  vehiclePreference: string;
  specialRequirements: string;
  consentAccepted: boolean;
  honeypot: string;
}

interface TravelBuddyChatbotProps {
  isOpen: boolean;
  onClose: () => void;
}

const STARTER_PROMPTS = [
  'Ujjain Darshan 1-day itinerary',
  'Indore Airport to Ujjain cab',
  'Omkareshwar & Maheshwar tour',
  'Request a custom trip quote',
];

const INITIAL_FORM_STATE: LeadFormState = {
  customerName: '',
  contactPhone: '',
  email: '',
  interestedPackageName: 'Custom Ujjain Darshan Journey',
  arrivalDate: '',
  adults: 2,
  pickupLocation: '',
  vehiclePreference: '',
  specialRequirements: '',
  consentAccepted: false,
  honeypot: '',
};

function createWelcomeMessage(): ChatMessage {
  return {
    id: 'welcome',
    role: 'assistant',
    content: `Namaste! I am Travel Buddy, your My Ujjain Darshan travel assistant. Ask me about Ujjain Darshan itineraries, Jyotirlinga circuits, Indore Airport transfers, our vehicles, or share your trip details for a custom quote.\n\nIf you ever need live pricing or direct help, you can call our Customer Support Agent at ${BRAND.phoneDisplay}.`,
    suggestedQuickReplies: STARTER_PROMPTS,
  };
}

/**
 * Safely renders assistant text into React elements without raw HTML injection.
 * Automatically converts verified support phone numbers and official portal URLs
 * into accessible links.
 */
function renderSafeMessageText(text: string): React.ReactNode {
  const paragraphs = text.split(/\n+/);

  const renderInlineTokens = (line: string, lineKey: number) => {
    const tokenRegex =
      /(\+91\s?90093\s?(?:36669|46669)|https:\/\/shrimahakaleshwar\.com\/?|\*\*[^*]+\*\*)/g;
    const parts = line.split(tokenRegex);

    return parts.map((part, idx) => {
      if (!part) return null;
      if (/^\+91\s?90093\s?(?:36669|46669)$/.test(part)) {
        return (
          <a
            key={`${lineKey}-${idx}`}
            href={BRAND.phoneHref}
            onClick={() => trackEvent('phone_click', { source: 'travel_buddy_inline' })}
            className="font-semibold text-[#7A0806] underline decoration-[#A68247] underline-offset-2 hover:text-[#580605]"
          >
            {BRAND.phoneDisplay}
          </a>
        );
      }
      if (/^https:\/\/shrimahakaleshwar\.com\/?$/.test(part)) {
        return (
          <a
            key={`${lineKey}-${idx}`}
            href={BRAND.officialTemplePortal}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-[#7A0806] underline decoration-[#A68247] underline-offset-2 hover:text-[#580605]"
          >
            shrimahakaleshwar.com
          </a>
        );
      }
      if (part.startsWith('**') && part.endsWith('**') && part.length > 4) {
        return (
          <strong key={`${lineKey}-${idx}`} className="font-semibold text-[#1F1A17]">
            {part.slice(2, -2)}
          </strong>
        );
      }
      return <React.Fragment key={`${lineKey}-${idx}`}>{part}</React.Fragment>;
    });
  };

  return (
    <div className="space-y-2 text-[13.5px] leading-relaxed">
      {paragraphs.map((rawLine, index) => {
        const line = rawLine.trim();
        if (!line) return null;
        if (/^[-•*]\s+/.test(line)) {
          return (
            <div key={index} className="flex items-start gap-2 pl-1">
              <span
                className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#A68247]"
                aria-hidden="true"
              />
              <span>{renderInlineTokens(line.replace(/^[-•*]\s+/, ''), index)}</span>
            </div>
          );
        }
        return <p key={index}>{renderInlineTokens(line, index)}</p>;
      })}
    </div>
  );
}

export function TravelBuddyChatbot({ isOpen, onClose }: TravelBuddyChatbotProps) {
  const { packages, vehicles, settings } = useSiteData();
  const [messages, setMessages] = useState<ChatMessage[]>(() => [createWelcomeMessage()]);
  const [inputValue, setInputValue] = useState('');
  const [isSending, setIsSending] = useState(false);

  // Inline Lead Capture Form State
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [leadForm, setLeadForm] = useState<LeadFormState>(INITIAL_FORM_STATE);
  const [leadSubmitting, setLeadSubmitting] = useState(false);
  const [leadError, setLeadError] = useState<string | null>(null);
  const [capturedLead, setCapturedLead] = useState<CapturedLeadInfo | null>(null);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const supportPhone = settings.brandPhone || BRAND.phoneDisplay;
  const supportPhoneHref = `tel:${supportPhone.replace(/[^\d+]/g, '')}`;

  const packageOptions = useMemo(() => {
    const names = packages.map((pkg) => pkg.name);
    return ['Custom Ujjain Darshan Journey', ...names];
  }, [packages]);

  const vehicleOptions = useMemo(() => {
    return vehicles.map((v) => `${v.category} — ${v.modelName}`);
  }, [vehicles]);

  useEffect(() => {
    if (!isOpen) return;
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isSending, showLeadForm, isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const timer = window.setTimeout(() => {
      if (!showLeadForm) {
        inputRef.current?.focus();
      }
    }, 150);

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, showLeadForm, onClose]);

  const buildConversationSummary = () => {
    return messages
      .filter((m) => m.id !== 'welcome')
      .slice(-10)
      .map((m) => `${m.role === 'user' ? 'Visitor' : 'Travel Buddy'}: ${m.content}`)
      .join('\n')
      .slice(0, 2800);
  };

  const handleResetChat = () => {
    setMessages([createWelcomeMessage()]);
    setInputValue('');
    setShowLeadForm(false);
    setLeadError(null);
    setCapturedLead(null);
    setLeadForm(INITIAL_FORM_STATE);
  };

  const sendMessage = async (rawText: string) => {
    const text = rawText.trim();
    if (!text || isSending) return;

    trackEvent('travel_buddy_message', { length: text.length });
    setInputValue('');
    setShowLeadForm(false);

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: text,
    };

    const historyPayload = messages
      .filter((m) => m.id !== 'welcome' && !m.isError)
      .slice(-14)
      .map((m) => ({
        role: m.role,
        content: m.content,
      }));

    setMessages((prev) => [...prev, userMsg]);
    setIsSending(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          history: historyPayload,
          leadAlreadyCaptured: Boolean(capturedLead),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        const fallbackError =
          data?.error ||
          `I am unable to verify that right now. Please call our Customer Support Agent directly at ${supportPhone}.`;
        setMessages((prev) => [
          ...prev,
          {
            id: `err-${Date.now()}`,
            role: 'assistant',
            content: fallbackError,
            needsHumanSupport: true,
            isError: true,
          },
        ]);
        return;
      }

      // Pre-fill inline lead form smoothly with any trip details mentioned in chat
      if (data.extractedLead && typeof data.extractedLead === 'object') {
        const ext = data.extractedLead;
        setLeadForm((prev) => ({
          ...prev,
          customerName: prev.customerName || ext.customerName || '',
          contactPhone: prev.contactPhone || ext.contactPhone || '',
          email: prev.email || ext.email || '',
          interestedPackageName:
            prev.interestedPackageName === INITIAL_FORM_STATE.interestedPackageName &&
            ext.interestedPackageName
              ? ext.interestedPackageName
              : prev.interestedPackageName,
          arrivalDate: prev.arrivalDate || ext.arrivalDate || '',
          adults:
            prev.adults === 2 && typeof ext.adults === 'number' && ext.adults > 0
              ? ext.adults
              : prev.adults,
          pickupLocation: prev.pickupLocation || ext.pickupLocation || '',
          vehiclePreference: prev.vehiclePreference || ext.vehiclePreference || '',
          specialRequirements: prev.specialRequirements || ext.notes || '',
        }));
      }

      if (data.capturedLead) {
        setCapturedLead(data.capturedLead);
      }

      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        role: 'assistant',
        content: data.reply,
        needsHumanSupport: Boolean(data.needsHumanSupport),
        shouldOfferLeadCapture: Boolean(data.shouldOfferLeadCapture) && !data.capturedLead,
        suggestedQuickReplies: Array.isArray(data.suggestedQuickReplies)
          ? data.suggestedQuickReplies
          : [],
        capturedLead: data.capturedLead || null,
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: `neterr-${Date.now()}`,
          role: 'assistant',
          content: `I could not connect to Travel Buddy right now. To make sure you receive accurate details, please call our Customer Support Agent directly at ${supportPhone}.`,
          needsHumanSupport: true,
          isError: true,
        },
      ]);
    } finally {
      setIsSending(false);
    }
  };

  const handleChatSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    void sendMessage(inputValue);
  };

  const handleLeadFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLeadError(null);
    setLeadSubmitting(true);

    try {
      const response = await fetch('/api/chat/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerName: leadForm.customerName,
          contactPhone: leadForm.contactPhone,
          email: leadForm.email,
          interestedPackageName: leadForm.interestedPackageName,
          arrivalDate: leadForm.arrivalDate,
          adults: Number(leadForm.adults) || 2,
          children: 0,
          pickupLocation: leadForm.pickupLocation,
          vehiclePreference: leadForm.vehiclePreference,
          specialRequirements: leadForm.specialRequirements,
          chatSummary: buildConversationSummary(),
          consentAccepted: leadForm.consentAccepted,
          honeypot: leadForm.honeypot,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        const firstFieldErr = data?.fieldErrors
          ? Object.values(data.fieldErrors).flat()[0]
          : null;
        setLeadError(
          (typeof firstFieldErr === 'string' && firstFieldErr) ||
            data?.error ||
            `Could not submit your details. Please call ${supportPhone}.`
        );
        return;
      }

      const leadConfirmation: CapturedLeadInfo = {
        referenceCode: data.enquiry.referenceCode,
        emailForwarded: Boolean(data.emailForwarded),
        deliveryChannel: data.deliveryChannel || 'saved',
        recipientEmail: data.recipientEmail || 'insiderprateek@gmail.com',
        interestedPackageName: data.enquiry.interestedPackageName,
        customerName: leadForm.customerName,
        contactPhone: leadForm.contactPhone,
      };

      trackEvent('travel_buddy_lead_submitted', {
        packageName: leadConfirmation.interestedPackageName,
      });

      setCapturedLead(leadConfirmation);
      setShowLeadForm(false);
      setMessages((prev) => [
        ...prev,
        {
          id: `lead-confirm-${Date.now()}`,
          role: 'assistant',
          content: data.message,
          capturedLead: leadConfirmation,
        },
      ]);
    } catch {
      setLeadError(
        `Unable to submit right now. Please call our Customer Support Agent directly at ${supportPhone}.`
      );
    } finally {
      setLeadSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <section
      role="dialog"
      aria-label="Travel Buddy Customer Support Chat"
      className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex flex-col w-[calc(100vw-2rem)] sm:w-[410px] h-[min(640px,calc(100dvh-2rem))] sm:h-[min(650px,calc(100dvh-4.5rem))] bg-[#FBF8F3] border border-[#DDD2C2] rounded-2xl shadow-2xl shadow-black/25 overflow-hidden"
    >
      {/* Header */}
      <header className="shrink-0 bg-[#7A0806] text-[#FBF8F3] px-4 py-3.5 border-b border-[#A68247]/40 flex items-center justify-between gap-2">
        <div className="flex items-center gap-3 min-w-0">
          <div className="h-10 w-10 rounded-full bg-[#FBF8F3] p-0.5 ring-2 ring-[#E0BE86]/70 shrink-0 overflow-hidden">
            <img
              src={BRAND.logoEmblem}
              alt="Travel Buddy emblem"
              className="h-full w-full object-cover rounded-full"
            />
          </div>
          <div className="min-w-0">
            <h2 className="font-editorial text-xl font-semibold leading-tight tracking-wide text-white truncate">
              Travel Buddy
            </h2>
            <p className="text-[11px] text-[#F4DEC0] truncate">
              My Ujjain Darshan Travel Assistant
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1 shrink-0">
          <button
            type="button"
            onClick={() => {
              setLeadError(null);
              setShowLeadForm((prev) => !prev);
            }}
            title="Share Trip Details / Request Quote"
            className={`inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-[11px] font-semibold transition-colors cursor-pointer ${
              showLeadForm
                ? 'bg-[#FBF8F3] text-[#7A0806]'
                : 'bg-white/12 text-[#FBF8F3] hover:bg-white/20'
            }`}
          >
            <ClipboardList className="w-3.5 h-3.5" aria-hidden="true" />
            <span>{showLeadForm ? 'Back to Chat' : 'Get Quote'}</span>
          </button>

          <a
            href={supportPhoneHref}
            onClick={() => trackEvent('phone_click', { source: 'travel_buddy_header' })}
            title={`Call Customer Support Agent (${supportPhone})`}
            aria-label={`Call Customer Support Agent at ${supportPhone}`}
            className="p-2 rounded-lg text-[#F4DEC0] hover:bg-white/15 hover:text-white transition-colors"
          >
            <Phone className="w-4 h-4" aria-hidden="true" />
          </a>

          <button
            type="button"
            onClick={handleResetChat}
            title="Start new conversation"
            aria-label="Start new conversation"
            className="p-2 rounded-lg text-[#F4DEC0] hover:bg-white/15 hover:text-white transition-colors cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" aria-hidden="true" />
          </button>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close Travel Buddy"
            className="p-2 rounded-lg text-[#F4DEC0] hover:bg-white/15 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>
      </header>

      {/* Body: either Inline Lead Capture Form OR Chat Stream */}
      {showLeadForm ? (
        <div className="flex-1 overflow-y-auto px-4 py-4 bg-[#FBF8F3]">
          <div className="mb-3.5 pb-3 border-b border-[#E5DDD1]">
            <h3 className="font-editorial text-xl font-semibold text-[#1F1A17]">
              Share Your Trip Details
            </h3>
            <p className="text-xs text-[#5C4E44] mt-0.5 leading-relaxed">
              Submit your requirements below. Your enquiry is saved and forwarded directly to our Ujjain travel desk for a tailored quote.
            </p>
          </div>

          <form onSubmit={handleLeadFormSubmit} className="space-y-3">
            {/* Hidden honeypot for spam protection */}
            <input
              type="text"
              tabIndex={-1}
              autoComplete="off"
              value={leadForm.honeypot}
              onChange={(e) => setLeadForm((p) => ({ ...p, honeypot: e.target.value }))}
              className="hidden"
              aria-hidden="true"
            />

            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#5C4E44] mb-1">
                Full Name *
              </label>
              <input
                type="text"
                required
                minLength={2}
                maxLength={120}
                placeholder="e.g. Rajesh Sharma"
                value={leadForm.customerName}
                onChange={(e) =>
                  setLeadForm((p) => ({ ...p, customerName: e.target.value }))
                }
                className="w-full rounded-lg border border-[#D8CCBC] bg-white px-3 py-2 text-sm text-[#1F1A17] focus:border-[#7A0806] focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#5C4E44] mb-1">
                  Mobile / WhatsApp *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="10-digit mobile number"
                  value={leadForm.contactPhone}
                  onChange={(e) =>
                    setLeadForm((p) => ({ ...p, contactPhone: e.target.value }))
                  }
                  className="w-full rounded-lg border border-[#D8CCBC] bg-white px-3 py-2 text-sm text-[#1F1A17] focus:border-[#7A0806] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#5C4E44] mb-1">
                  Email (Optional)
                </label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={leadForm.email}
                  onChange={(e) => setLeadForm((p) => ({ ...p, email: e.target.value }))}
                  className="w-full rounded-lg border border-[#D8CCBC] bg-white px-3 py-2 text-sm text-[#1F1A17] focus:border-[#7A0806] focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#5C4E44] mb-1">
                Interested Package / Circuit
              </label>
              <select
                value={
                  packageOptions.includes(leadForm.interestedPackageName)
                    ? leadForm.interestedPackageName
                    : 'Custom Ujjain Darshan Journey'
                }
                onChange={(e) =>
                  setLeadForm((p) => ({ ...p, interestedPackageName: e.target.value }))
                }
                className="w-full rounded-lg border border-[#D8CCBC] bg-white px-3 py-2 text-sm text-[#1F1A17] focus:border-[#7A0806] focus:outline-none"
              >
                {packageOptions.map((name) => (
                  <option key={name} value={name}>
                    {name}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#5C4E44] mb-1">
                  Tentative Date
                </label>
                <input
                  type="date"
                  value={leadForm.arrivalDate}
                  onChange={(e) =>
                    setLeadForm((p) => ({ ...p, arrivalDate: e.target.value }))
                  }
                  className="w-full rounded-lg border border-[#D8CCBC] bg-white px-3 py-2 text-sm text-[#1F1A17] focus:border-[#7A0806] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#5C4E44] mb-1">
                  Travelers
                </label>
                <input
                  type="number"
                  min={1}
                  max={100}
                  value={leadForm.adults}
                  onChange={(e) =>
                    setLeadForm((p) => ({
                      ...p,
                      adults: Math.max(1, Number(e.target.value) || 1),
                    }))
                  }
                  className="w-full rounded-lg border border-[#D8CCBC] bg-white px-3 py-2 text-sm text-[#1F1A17] focus:border-[#7A0806] focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#5C4E44] mb-1">
                  Pickup Location
                </label>
                <input
                  type="text"
                  placeholder="Indore Airport / Ujjain"
                  value={leadForm.pickupLocation}
                  onChange={(e) =>
                    setLeadForm((p) => ({ ...p, pickupLocation: e.target.value }))
                  }
                  className="w-full rounded-lg border border-[#D8CCBC] bg-white px-3 py-2 text-sm text-[#1F1A17] focus:border-[#7A0806] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#5C4E44] mb-1">
                  Vehicle Preference
                </label>
                <select
                  value={leadForm.vehiclePreference}
                  onChange={(e) =>
                    setLeadForm((p) => ({ ...p, vehiclePreference: e.target.value }))
                  }
                  className="w-full rounded-lg border border-[#D8CCBC] bg-white px-3 py-2 text-sm text-[#1F1A17] focus:border-[#7A0806] focus:outline-none"
                >
                  <option value="">Any suitable vehicle</option>
                  {vehicleOptions.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#5C4E44] mb-1">
                Trip Notes (Optional)
              </label>
              <textarea
                rows={2}
                maxLength={1000}
                placeholder="Elderly travelers, specific temples, return drop city..."
                value={leadForm.specialRequirements}
                onChange={(e) =>
                  setLeadForm((p) => ({ ...p, specialRequirements: e.target.value }))
                }
                className="w-full rounded-lg border border-[#D8CCBC] bg-white px-3 py-2 text-sm text-[#1F1A17] focus:border-[#7A0806] focus:outline-none resize-none"
              />
            </div>

            <label className="flex items-start gap-2.5 text-xs text-[#4F433B] cursor-pointer">
              <input
                type="checkbox"
                required
                checked={leadForm.consentAccepted}
                onChange={(e) =>
                  setLeadForm((p) => ({ ...p, consentAccepted: e.target.checked }))
                }
                className="mt-0.5 h-4 w-4 rounded border-[#CBBBA6] text-[#7A0806] focus:ring-[#7A0806]"
              />
              <span>
                I permit My Ujjain Darshan to contact me via phone, WhatsApp, or email regarding this travel enquiry.
              </span>
            </label>

            {leadError && (
              <div className="rounded-lg bg-[#FCEEEE] border border-[#E5B8B8] px-3 py-2 text-xs text-[#7A0806]">
                {leadError}
              </div>
            )}

            <div className="flex items-center gap-2 pt-1">
              <button
                type="submit"
                disabled={leadSubmitting}
                className="flex-1 inline-flex items-center justify-center gap-2 rounded-lg bg-[#7A0806] hover:bg-[#580605] disabled:opacity-60 text-[#FBF8F3] px-4 py-2.5 text-xs font-semibold tracking-wide transition-colors cursor-pointer"
              >
                {leadSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
                    <span>Sending Details...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>Submit &amp; Request Quote</span>
                  </>
                )}
              </button>
              <button
                type="button"
                onClick={() => setShowLeadForm(false)}
                className="rounded-lg border border-[#D8CCBC] bg-white hover:bg-[#F3EDE3] px-3 py-2.5 text-xs font-medium text-[#4F433B] transition-colors cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      ) : (
        <>
          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
            {messages.map((msg, idx) => {
              const isLast = idx === messages.length - 1;
              if (msg.role === 'user') {
                return (
                  <div key={msg.id} className="flex justify-end">
                    <div className="max-w-[84%] rounded-2xl rounded-br-sm bg-[#7A0806] text-[#FBF8F3] px-3.5 py-2.5 text-[13.5px] leading-relaxed shadow-sm">
                      {msg.content}
                    </div>
                  </div>
                );
              }

              return (
                <div key={msg.id} className="space-y-2.5">
                  <div className="flex items-start gap-2.5">
                    <div className="h-7 w-7 rounded-full bg-[#7A0806]/10 border border-[#A68247]/40 p-0.5 shrink-0 mt-0.5 overflow-hidden">
                      <img
                        src={BRAND.logoEmblem}
                        alt=""
                        aria-hidden="true"
                        className="h-full w-full object-cover rounded-full"
                      />
                    </div>
                    <div
                      className={`max-w-[86%] rounded-2xl rounded-tl-sm px-3.5 py-3 shadow-xs ${
                        msg.isError
                          ? 'bg-[#FDF1EE] border border-[#E6C2BA] text-[#3B2621]'
                          : 'bg-[#F3EDE3] border border-[#E5DDD1] text-[#1F1A17]'
                      }`}
                    >
                      {renderSafeMessageText(msg.content)}
                    </div>
                  </div>

                  {/* Direct Human Customer Support Escalation Card */}
                  {msg.needsHumanSupport && (
                    <div className="ml-9 rounded-xl border border-[#D4B98C] bg-white p-3 shadow-xs space-y-2">
                      <p className="text-[11px] font-semibold uppercase tracking-wider text-[#7A0806]">
                        Direct Customer Support Agent
                      </p>
                      <p className="text-xs text-[#4F433B] leading-relaxed">
                        For verified live availability, exact quotes, or urgent guidance, speak directly with our Ujjain desk:
                      </p>
                      <div className="flex flex-wrap items-center gap-2 pt-0.5">
                        <a
                          href={supportPhoneHref}
                          onClick={() =>
                            trackEvent('phone_click', { source: 'travel_buddy_escalation' })
                          }
                          className="inline-flex items-center gap-1.5 rounded-lg bg-[#7A0806] hover:bg-[#580605] text-white px-3 py-1.5 text-xs font-semibold transition-colors"
                        >
                          <Phone className="w-3.5 h-3.5" aria-hidden="true" />
                          <span>Call {supportPhone}</span>
                        </a>
                        <a
                          href={buildWhatsAppUrl(
                            `Namaste My Ujjain Darshan Team, I spoke with Travel Buddy and need direct assistance with my Ujjain trip.`
                          )}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() =>
                            trackEvent('whatsapp_click', {
                              source: 'travel_buddy_escalation',
                            })
                          }
                          className="inline-flex items-center gap-1.5 rounded-lg border border-[#1B6E41] text-[#1B6E41] hover:bg-[#1B6E41] hover:text-white px-3 py-1.5 text-xs font-semibold transition-colors"
                        >
                          <MessageCircle className="w-3.5 h-3.5" aria-hidden="true" />
                          <span>WhatsApp</span>
                        </a>
                      </div>
                    </div>
                  )}

                  {/* Lead Captured Confirmation Card */}
                  {msg.capturedLead && (
                    <div className="ml-9 rounded-xl border border-[#B9D5C3] bg-[#F2F9F4] p-3 space-y-2">
                      <div className="flex items-center gap-2 text-[#1B6E41]">
                        <CheckCircle2 className="w-4 h-4 shrink-0" aria-hidden="true" />
                        <span className="text-xs font-semibold">
                          Enquiry Saved — Ref {msg.capturedLead.referenceCode}
                        </span>
                      </div>
                      <p className="text-xs text-[#2E4A39] leading-relaxed">
                        {msg.capturedLead.emailForwarded
                          ? `Your trip lead for "${msg.capturedLead.interestedPackageName}" has been forwarded to ${msg.capturedLead.recipientEmail}.`
                          : `Your trip lead for "${msg.capturedLead.interestedPackageName}" is recorded in our desk system for ${msg.capturedLead.recipientEmail}.`}
                      </p>
                      <div className="flex flex-wrap gap-2 pt-0.5">
                        <a
                          href={supportPhoneHref}
                          className="inline-flex items-center gap-1.5 rounded-lg bg-[#7A0806] hover:bg-[#580605] text-white px-2.5 py-1.5 text-[11px] font-semibold transition-colors"
                        >
                          <Phone className="w-3 h-3" aria-hidden="true" />
                          <span>Call {supportPhone}</span>
                        </a>
                        {!msg.capturedLead.emailForwarded && (
                          <a
                            href={`mailto:${msg.capturedLead.recipientEmail}?subject=${encodeURIComponent(
                              `My Ujjain Darshan Lead ${msg.capturedLead.referenceCode} - ${msg.capturedLead.interestedPackageName}`
                            )}&body=${encodeURIComponent(
                              `Reference: ${msg.capturedLead.referenceCode}\nPackage: ${msg.capturedLead.interestedPackageName}\nName: ${msg.capturedLead.customerName || leadForm.customerName}\nPhone: ${msg.capturedLead.contactPhone || leadForm.contactPhone}\n\nPlease share a personalized quote.`
                            )}`}
                            className="inline-flex items-center gap-1.5 rounded-lg border border-[#7A0806]/30 bg-white hover:bg-[#FBF8F3] text-[#7A0806] px-2.5 py-1.5 text-[11px] font-semibold transition-colors"
                          >
                            <Mail className="w-3 h-3" aria-hidden="true" />
                            <span>Send Email Copy</span>
                          </a>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Lead Capture Prompt CTA */}
                  {msg.shouldOfferLeadCapture && !capturedLead && (
                    <div className="ml-9">
                      <button
                        type="button"
                        onClick={() => {
                          setLeadError(null);
                          setShowLeadForm(true);
                        }}
                        className="inline-flex items-center gap-2 rounded-lg border border-[#7A0806] bg-white hover:bg-[#7A0806] text-[#7A0806] hover:text-white px-3 py-1.5 text-xs font-semibold transition-colors cursor-pointer"
                      >
                        <ClipboardList className="w-3.5 h-3.5" aria-hidden="true" />
                        <span>Share Trip Details for a Quote</span>
                      </button>
                    </div>
                  )}

                  {/* Quick Replies on latest assistant message */}
                  {isLast &&
                    !isSending &&
                    msg.suggestedQuickReplies &&
                    msg.suggestedQuickReplies.length > 0 && (
                      <div className="ml-9 flex flex-wrap gap-1.5 pt-0.5">
                        {msg.suggestedQuickReplies.map((prompt) => (
                          <button
                            key={prompt}
                            type="button"
                            onClick={() => {
                              if (/custom.*quote|request.*quote/i.test(prompt)) {
                                setShowLeadForm(true);
                              } else {
                                void sendMessage(prompt);
                              }
                            }}
                            className="text-left rounded-lg border border-[#DDD2C2] bg-white hover:border-[#A68247] hover:bg-[#F7F1E7] px-2.5 py-1.5 text-[11.5px] font-medium text-[#3A312C] transition-colors cursor-pointer"
                          >
                            {prompt}
                          </button>
                        ))}
                      </div>
                    )}
                </div>
              );
            })}

            {isSending && (
              <div className="flex items-start gap-2.5">
                <div className="h-7 w-7 rounded-full bg-[#7A0806]/10 border border-[#A68247]/40 p-0.5 shrink-0 overflow-hidden">
                  <img
                    src={BRAND.logoEmblem}
                    alt=""
                    aria-hidden="true"
                    className="h-full w-full object-cover rounded-full"
                  />
                </div>
                <div className="rounded-2xl rounded-tl-sm bg-[#F3EDE3] border border-[#E5DDD1] px-3.5 py-2.5 flex items-center gap-2 text-xs text-[#5C4E44]">
                  <Loader2 className="w-3.5 h-3.5 animate-spin text-[#7A0806]" aria-hidden="true" />
                  <span>Travel Buddy is checking verified details...</span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Footer Input Bar */}
          <form
            onSubmit={handleChatSubmit}
            className="shrink-0 border-t border-[#E5DDD1] bg-white px-3 py-2.5"
          >
            <div className="flex items-center gap-2">
              <input
                ref={inputRef}
                type="text"
                maxLength={1000}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask Travel Buddy about Ujjain tours, cabs..."
                aria-label="Ask Travel Buddy a question"
                disabled={isSending}
                className="flex-1 rounded-xl border border-[#DDD2C2] bg-[#FBF8F3] px-3.5 py-2 text-sm text-[#1F1A17] placeholder:text-[#8A7D72] focus:border-[#7A0806] focus:bg-white focus:outline-none disabled:opacity-60"
              />
              <button
                type="submit"
                disabled={isSending || inputValue.trim().length === 0}
                aria-label="Send message to Travel Buddy"
                className="inline-flex items-center justify-center h-10 w-10 rounded-xl bg-[#7A0806] hover:bg-[#580605] disabled:opacity-45 text-[#FBF8F3] transition-colors shrink-0 cursor-pointer"
              >
                <Send className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-1.5 flex items-center justify-between text-[10.5px] text-[#786A60] px-0.5">
              <span>Need a human agent?</span>
              <a
                href={supportPhoneHref}
                onClick={() => trackEvent('phone_click', { source: 'travel_buddy_footer' })}
                className="font-semibold text-[#7A0806] hover:underline"
              >
                Call {supportPhone}
              </a>
            </div>
          </form>
        </>
      )}
    </section>
  );
}
