import 'dotenv/config';
import express, { Request, Response } from 'express';
import path from 'path';
import crypto from 'crypto';
import { fileURLToPath } from 'url';
import type { Server } from 'node:http';
import { asc, desc, eq } from 'drizzle-orm';

import { db } from './src/db/index.ts';
import {
  articles,
  destinations,
  enquiries,
  faqs,
  packages,
  siteSettings,
  testimonials,
  vehicles,
} from './src/db/schema.ts';
import {
  createEnquiryRecord,
  getApprovedTestimonials,
  getArticleBySlug,
  getDestinationBySlug,
  getDestinations,
  getFaqs,
  getPublicPackageBySlug,
  getPublicPackages,
  getPublishedArticles,
  getSiteSettingsMap,
  getVehicles,
} from './src/db/queries.ts';
import { ensureSeeded } from './src/db/seed.ts';
import { AuthRequest, requireAdmin } from './src/middleware/auth.ts';
import { Type } from '@google/genai';
import {
  adminArticleCreateSchema,
  adminEnquiryUpdateSchema,
  adminFaqSchema,
  adminPackageCreateSchema,
  adminPackageUpdateSchema,
  adminTestimonialSchema,
  chatLeadSchema,
  chatRequestSchema,
  enquirySubmissionSchema,
} from './src/lib/validation.ts';
import { BRAND, MEDIA } from './src/data/brand.ts';
import {
  CHAT_MODEL,
  getGeminiClient,
  ThinkingLevel,
  withGeminiRetry,
} from './src/lib/gemini.ts';
import { getTravelBuddySystemInstruction } from './src/lib/chatKnowledge.ts';
import { getLeadRecipientEmail, sendLeadNotificationEmail } from './src/lib/mailer.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = Number(process.env.PORT) || 3000;
const app = express();
app.set('trust proxy', 1);

app.use(express.json({ limit: '1mb' }));

// Browser caching headers for verified local WebP photography (/public/images/*)
app.use('/images', (_req, res, next) => {
  res.setHeader('Cache-Control', 'public, max-age=2592000, stale-while-revalidate=86400');
  next();
});

// Simple in-memory rate limiters for lead submission and Travel Buddy chat
const rateBucket = new Map<string, { count: number; resetAt: number }>();
const chatRateBucket = new Map<string, { count: number; resetAt: number }>();
const RATE_WINDOW_MS = 15 * 60 * 1000;
const RATE_MAX_REQUESTS = 10;
const CHAT_RATE_MAX_REQUESTS = 30;

function checkEnquiryRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateBucket.get(ip);
  if (!entry || now > entry.resetAt) {
    rateBucket.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return true;
  }
  if (entry.count >= RATE_MAX_REQUESTS) {
    return false;
  }
  entry.count += 1;
  return true;
}

function checkChatRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = chatRateBucket.get(ip);
  if (!entry || now > entry.resetAt) {
    chatRateBucket.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return true;
  }
  if (entry.count >= CHAT_RATE_MAX_REQUESTS) {
    return false;
  }
  entry.count += 1;
  return true;
}

function escapeCsvCell(value: unknown): string {
  const raw = String(value ?? '');
  // Prevent CSV spreadsheet formula injection
  const neutralized = /^[=+\-@\t\r]/.test(raw) ? `'${raw}` : raw;
  return `"${neutralized.replace(/"/g, '""')}"`;
}

function isSafeHttpsWebhook(rawUrl: string): boolean {
  try {
    const parsed = new URL(rawUrl);
    if (parsed.protocol !== 'https:') return false;
    const host = parsed.hostname.toLowerCase();
    if (
      host === 'localhost' ||
      host === '127.0.0.1' ||
      host === '::1' ||
      host === '169.254.169.254' ||
      host.startsWith('10.') ||
      host.startsWith('192.168.') ||
      /^172\.(1[6-9]|2\d|3[0-1])\./.test(host)
    ) {
      return false;
    }
    return true;
  } catch {
    return false;
  }
}

async function notifyOperatorWebhook(payload: Record<string, unknown>) {
  const webhookUrl = process.env.OPERATOR_WEBHOOK_URL?.trim();
  if (!webhookUrl || !isSafeHttpsWebhook(webhookUrl)) return;
  try {
    await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(4000),
    });
  } catch (err) {
    console.error('Operator webhook notification failed:', err);
  }
}

// ============================================================================
// PUBLIC API ROUTES
// ============================================================================

app.get('/api/bootstrap', async (_req: Request, res: Response) => {
  try {
    const [pkgList, destList, vehList, artList, faqList, reviewList, settings] =
      await Promise.all([
        getPublicPackages(),
        getDestinations(),
        getVehicles(),
        getPublishedArticles(),
        getFaqs(),
        getApprovedTestimonials(),
        getSiteSettingsMap(),
      ]);

    res.json({
      packages: pkgList,
      destinations: destList,
      vehicles: vehList,
      articles: artList,
      faqs: faqList,
      testimonials: reviewList,
      settings,
    });
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : 'Unable to load website data.';
    res.status(500).json({ error: message });
  }
});

app.get('/api/packages', async (_req: Request, res: Response) => {
  try {
    const data = await getPublicPackages();
    res.json({ packages: data });
  } catch (error: unknown) {
    res.status(500).json({
      error: error instanceof Error ? error.message : 'Failed to load packages.',
    });
  }
});

app.get('/api/packages/:slug', async (req: Request, res: Response) => {
  try {
    const pkg = await getPublicPackageBySlug(req.params.slug);
    if (!pkg) {
      return res.status(404).json({ error: 'Journey package not found.' });
    }
    return res.json({ package: pkg });
  } catch (error: unknown) {
    return res.status(500).json({
      error: error instanceof Error ? error.message : 'Failed to load package.',
    });
  }
});

app.get('/api/destinations', async (_req: Request, res: Response) => {
  try {
    const data = await getDestinations();
    res.json({ destinations: data });
  } catch (error: unknown) {
    res.status(500).json({
      error: error instanceof Error ? error.message : 'Failed to load destinations.',
    });
  }
});

app.get('/api/destinations/:slug', async (req: Request, res: Response) => {
  try {
    const dest = await getDestinationBySlug(req.params.slug);
    if (!dest) {
      return res.status(404).json({ error: 'Destination not found.' });
    }
    return res.json({ destination: dest });
  } catch (error: unknown) {
    return res.status(500).json({
      error: error instanceof Error ? error.message : 'Failed to load destination.',
    });
  }
});

app.get('/api/vehicles', async (_req: Request, res: Response) => {
  try {
    const data = await getVehicles();
    res.json({ vehicles: data });
  } catch (error: unknown) {
    res.status(500).json({
      error: error instanceof Error ? error.message : 'Failed to load vehicles.',
    });
  }
});

app.get('/api/articles', async (_req: Request, res: Response) => {
  try {
    const data = await getPublishedArticles();
    res.json({ articles: data });
  } catch (error: unknown) {
    res.status(500).json({
      error: error instanceof Error ? error.message : 'Failed to load articles.',
    });
  }
});

app.get('/api/articles/:slug', async (req: Request, res: Response) => {
  try {
    const article = await getArticleBySlug(req.params.slug);
    if (!article) {
      return res.status(404).json({ error: 'Article not found.' });
    }
    return res.json({ article });
  } catch (error: unknown) {
    return res.status(500).json({
      error: error instanceof Error ? error.message : 'Failed to load article.',
    });
  }
});

app.get('/api/faqs', async (_req: Request, res: Response) => {
  try {
    const data = await getFaqs();
    res.json({ faqs: data });
  } catch (error: unknown) {
    res.status(500).json({
      error: error instanceof Error ? error.message : 'Failed to load FAQs.',
    });
  }
});

app.post('/api/enquiries', async (req: Request, res: Response) => {
  const clientIp = req.ip || 'unknown';
  if (!checkEnquiryRateLimit(clientIp)) {
    return res.status(429).json({
      error: 'Too many enquiry requests from this connection. Please wait a few minutes or contact us directly on WhatsApp.',
    });
  }

  // Reject silent spam bots filling hidden honeypot
  if (typeof req.body?.honeypot === 'string' && req.body.honeypot.trim().length > 0) {
    return res.status(400).json({ error: 'Invalid submission.' });
  }

  const parsed = enquirySubmissionSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({
      error: 'Please check the highlighted fields before submitting.',
      fieldErrors: parsed.error.flatten().fieldErrors,
    });
  }

  const d = parsed.data;
  const refSuffix = crypto.randomBytes(3).toString('hex').toUpperCase();
  const referenceCode = `MUD-${new Date().getFullYear()}-${refSuffix}`;

  try {
    const created = await createEnquiryRecord({
      referenceCode,
      customerName: d.customerName,
      contactPhone: d.contactPhone,
      email: d.email || null,
      preferredContactMethod: d.preferredContactMethod,
      interestedPackageSlug: d.interestedPackageSlug || null,
      interestedPackageName: d.interestedPackageName,
      travelType: d.travelType,
      durationDays: d.durationDays || null,
      arrivalDate: d.arrivalDate || null,
      returnDate: d.returnDate || null,
      adults: d.adults,
      children: d.children,
      pickupLocation: d.pickupLocation || null,
      dropLocation: d.dropLocation || null,
      vehiclePreference: d.vehiclePreference || null,
      interests: d.interests,
      templesOfInterest: d.templesOfInterest,
      seniorTravelers: d.seniorTravelers,
      accessibilityNotes: d.accessibilityNotes || null,
      hotelAssistance: d.hotelAssistance,
      guideRequired: d.guideRequired,
      specialRequirements: d.specialRequirements || null,
      consentAccepted: true,
      sourcePage: d.sourcePage,
      leadStatus: 'new',
    });

    void sendLeadNotificationEmail({
      referenceCode: created.referenceCode,
      source: `Website Form (${created.sourcePage})`,
      customerName: created.customerName,
      contactPhone: created.contactPhone,
      email: created.email,
      preferredContactMethod: created.preferredContactMethod,
      interestedPackageName: created.interestedPackageName,
      travelType: created.travelType,
      arrivalDate: created.arrivalDate,
      returnDate: created.returnDate,
      adults: created.adults,
      children: created.children,
      pickupLocation: created.pickupLocation,
      dropLocation: created.dropLocation,
      vehiclePreference: created.vehiclePreference,
      specialRequirements: created.specialRequirements,
    });

    void notifyOperatorWebhook({
      event: 'new_enquiry',
      referenceCode: created.referenceCode,
      packageName: created.interestedPackageName,
      arrivalDate: created.arrivalDate,
      travelers: `${created.adults} Adults, ${created.children} Children`,
    });

    return res.status(201).json({
      enquiry: {
        id: created.id,
        referenceCode: created.referenceCode,
        interestedPackageName: created.interestedPackageName,
        createdAt: created.createdAt,
      },
      message:
        'Your travel enquiry has been recorded safely. Our Ujjain team will reach out with a tailored itinerary and quotation.',
    });
  } catch (error: unknown) {
    return res.status(500).json({
      error:
        error instanceof Error
          ? error.message
          : 'Unable to save your enquiry right now.',
    });
  }
});

// ============================================================================
// TRAVEL BUDDY CHATBOT & LEAD FORWARDING ROUTES
// ============================================================================

const TRAVEL_BUDDY_RESPONSE_SCHEMA = {
  type: Type.OBJECT,
  properties: {
    reply: {
      type: Type.STRING,
      description:
        'Helpful, accurate, concise answer from Travel Buddy grounded strictly in verified My Ujjain Darshan knowledge. If unsure, politely state that and include the direct customer support number +91 90093 36669 / +91 90093 46669.',
    },
    needsHumanSupport: {
      type: Type.BOOLEAN,
      description:
        'True whenever Travel Buddy is unsure, lacks verified facts, or the user asks for live pricing, live availability, booking confirmation, or direct agent assistance.',
    },
    shouldOfferLeadCapture: {
      type: Type.BOOLEAN,
      description:
        'True whenever the user expresses interest in planning a trip, requesting a quote, booking a package/cab, or wants a callback.',
    },
    suggestedQuickReplies: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: 'Up to 3 short follow-up questions or actions the visitor can click next.',
    },
    extractedLead: {
      type: Type.OBJECT,
      description:
        'Any real customer contact or trip details explicitly shared by the visitor so far. Leave fields as empty strings if not shared; never fabricate or guess values.',
      properties: {
        customerName: { type: Type.STRING },
        contactPhone: { type: Type.STRING },
        email: { type: Type.STRING },
        interestedPackageName: { type: Type.STRING },
        arrivalDate: { type: Type.STRING },
        adults: { type: Type.INTEGER },
        pickupLocation: { type: Type.STRING },
        vehiclePreference: { type: Type.STRING },
        notes: { type: Type.STRING },
        readyToSubmit: {
          type: Type.BOOLEAN,
          description:
            'True ONLY if the user explicitly provided BOTH their name AND a valid 10-digit Indian phone number and asked for a callback, quotation, or booking.',
        },
      },
    },
  },
  required: ['reply', 'needsHumanSupport', 'shouldOfferLeadCapture'],
};

interface TravelBuddyModelResponse {
  reply: string;
  needsHumanSupport: boolean;
  shouldOfferLeadCapture: boolean;
  suggestedQuickReplies?: string[];
  extractedLead?: {
    customerName?: string | null;
    contactPhone?: string | null;
    email?: string | null;
    interestedPackageName?: string | null;
    arrivalDate?: string | null;
    adults?: number | null;
    pickupLocation?: string | null;
    vehiclePreference?: string | null;
    notes?: string | null;
    readyToSubmit?: boolean;
  } | null;
}

app.post('/api/chat', async (req: Request, res: Response) => {
  const clientIp = req.ip || 'unknown';
  if (!checkChatRateLimit(clientIp)) {
    return res.status(429).json({
      error: `Too many chat messages right now. Please wait a moment or call our customer support agent directly at ${BRAND.phoneDisplay}.`,
      supportPhone: BRAND.phoneDisplay,
      supportPhoneHref: BRAND.phoneHref,
    });
  }

  const parsed = chatRequestSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({
      error: 'Please enter a valid message.',
    });
  }

  const { message, history, leadAlreadyCaptured } = parsed.data;

  try {
    const ai = getGeminiClient();
    const { systemInstruction } = await getTravelBuddySystemInstruction();

    const contents = [
      ...history.slice(-16).map((item) => ({
        role: item.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: item.content }],
      })),
      {
        role: 'user',
        parts: [{ text: message }],
      },
    ];

    const response = await withGeminiRetry(() =>
      ai.models.generateContent({
        model: CHAT_MODEL,
        contents,
        config: {
          systemInstruction,
          thinkingConfig: {
            thinkingLevel: ThinkingLevel.LOW,
          },
          responseMimeType: 'application/json',
          responseSchema: TRAVEL_BUDDY_RESPONSE_SCHEMA,
        },
      })
    );

    const rawText = response.text?.trim();
    if (!rawText) {
      throw new Error('Empty response from Travel Buddy service.');
    }

    let structured: TravelBuddyModelResponse;
    try {
      structured = JSON.parse(rawText) as TravelBuddyModelResponse;
    } catch {
      structured = {
        reply: rawText,
        needsHumanSupport: rawText.includes(BRAND.phoneDisplay),
        shouldOfferLeadCapture: false,
      };
    }

    const replyText =
      typeof structured.reply === 'string' && structured.reply.trim().length > 0
        ? structured.reply.trim()
        : `I want to make sure you get accurate details for your query. Please call our Customer Support Agent directly at ${BRAND.phoneDisplay} for immediate assistance.`;

    const needsHumanSupport = Boolean(structured.needsHumanSupport);
    const shouldOfferLeadCapture = Boolean(structured.shouldOfferLeadCapture);
    const suggestedQuickReplies = Array.isArray(structured.suggestedQuickReplies)
      ? structured.suggestedQuickReplies
          .filter((item): item is string => typeof item === 'string' && item.trim().length > 0)
          .map((item) => item.trim().slice(0, 64))
          .slice(0, 3)
      : [];

    const extractedLead = structured.extractedLead || null;
    let capturedLead: {
      referenceCode: string;
      emailForwarded: boolean;
      deliveryChannel: string;
      recipientEmail: string;
      interestedPackageName: string;
    } | null = null;

    // Automatically persist & forward lead when visitor shares name + valid phone in chat
    if (
      !leadAlreadyCaptured &&
      extractedLead?.readyToSubmit &&
      extractedLead.customerName &&
      extractedLead.contactPhone
    ) {
      const candidateLead = chatLeadSchema.safeParse({
        customerName: extractedLead.customerName,
        contactPhone: extractedLead.contactPhone,
        email: extractedLead.email || '',
        interestedPackageName:
          extractedLead.interestedPackageName || 'Custom Ujjain Darshan Journey',
        arrivalDate: extractedLead.arrivalDate || '',
        adults: extractedLead.adults && extractedLead.adults > 0 ? extractedLead.adults : 2,
        children: 0,
        pickupLocation: extractedLead.pickupLocation || '',
        vehiclePreference: extractedLead.vehiclePreference || '',
        specialRequirements: extractedLead.notes || '',
        consentAccepted: true,
        honeypot: '',
      });

      if (candidateLead.success) {
        const d = candidateLead.data;
        const refSuffix = crypto.randomBytes(3).toString('hex').toUpperCase();
        const referenceCode = `MUD-${new Date().getFullYear()}-${refSuffix}`;
        const transcriptSummary = [...history.slice(-8), { role: 'user' as const, content: message }]
          .map((m) => `${m.role === 'user' ? 'Visitor' : 'Travel Buddy'}: ${m.content}`)
          .join('\n')
          .slice(0, 2800);

        const created = await createEnquiryRecord({
          referenceCode,
          customerName: d.customerName,
          contactPhone: d.contactPhone,
          email: d.email || null,
          preferredContactMethod: 'phone',
          interestedPackageSlug: null,
          interestedPackageName: d.interestedPackageName,
          travelType: 'Travel Buddy Chat Lead',
          durationDays: null,
          arrivalDate: d.arrivalDate || null,
          returnDate: null,
          adults: d.adults,
          children: d.children,
          pickupLocation: d.pickupLocation || null,
          dropLocation: null,
          vehiclePreference: d.vehiclePreference || null,
          interests: [],
          templesOfInterest: [],
          seniorTravelers: false,
          accessibilityNotes: null,
          hotelAssistance: false,
          guideRequired: false,
          specialRequirements: d.specialRequirements || 'Captured via Travel Buddy chat conversation',
          consentAccepted: true,
          sourcePage: 'travel-buddy-chat',
          leadStatus: 'new',
        });

        const emailResult = await sendLeadNotificationEmail({
          referenceCode: created.referenceCode,
          source: 'Travel Buddy Chatbot (Conversation)',
          customerName: created.customerName,
          contactPhone: created.contactPhone,
          email: created.email,
          preferredContactMethod: 'Phone / WhatsApp',
          interestedPackageName: created.interestedPackageName,
          travelType: created.travelType,
          arrivalDate: created.arrivalDate,
          adults: created.adults,
          children: created.children,
          pickupLocation: created.pickupLocation,
          vehiclePreference: created.vehiclePreference,
          specialRequirements: created.specialRequirements,
          chatSummary: transcriptSummary,
        });

        void notifyOperatorWebhook({
          event: 'new_chatbot_lead',
          referenceCode: created.referenceCode,
          customerName: created.customerName,
          packageName: created.interestedPackageName,
          recipientEmail: emailResult.recipient,
        });

        capturedLead = {
          referenceCode: created.referenceCode,
          emailForwarded: emailResult.sent,
          deliveryChannel: emailResult.channel,
          recipientEmail: emailResult.recipient,
          interestedPackageName: created.interestedPackageName,
        };
      }
    }

    return res.json({
      reply: replyText,
      needsHumanSupport,
      shouldOfferLeadCapture: capturedLead ? false : shouldOfferLeadCapture,
      suggestedQuickReplies,
      extractedLead: extractedLead
        ? {
            customerName: extractedLead.customerName || '',
            contactPhone: extractedLead.contactPhone || '',
            email: extractedLead.email || '',
            interestedPackageName: extractedLead.interestedPackageName || '',
            arrivalDate: extractedLead.arrivalDate || '',
            adults: extractedLead.adults || 2,
            pickupLocation: extractedLead.pickupLocation || '',
            vehiclePreference: extractedLead.vehiclePreference || '',
            notes: extractedLead.notes || '',
          }
        : null,
      capturedLead,
      supportPhone: BRAND.phoneDisplay,
      supportPhoneHref: BRAND.phoneHref,
      leadRecipientEmail: getLeadRecipientEmail(),
    });
  } catch (error: unknown) {
    const errObj = error as { status?: number; code?: string; message?: string };
    const status = typeof errObj?.status === 'number' ? errObj.status : 503;
    const isMissingKey = errObj?.code === 'MISSING_GEMINI_API_KEY';
    console.error('Travel Buddy chat error:', {
      code: errObj?.code,
      status,
      message: errObj?.message,
    });

    const reasonCode = isMissingKey
      ? 'missing_api_key'
      : status === 400 || status === 403
        ? 'api_auth_or_schema_error'
        : status === 429
          ? 'quota_exceeded'
          : 'service_unavailable';

    return res.status(status === 429 ? 429 : 503).json({
      error: `Travel Buddy is temporarily unavailable. To ensure you receive accurate travel details, please call our Customer Support Agent directly at ${BRAND.phoneDisplay}.`,
      reasonCode,
      supportPhone: BRAND.phoneDisplay,
      supportPhoneHref: BRAND.phoneHref,
    });
  }
});

app.post('/api/chat/lead', async (req: Request, res: Response) => {
  const clientIp = req.ip || 'unknown';
  if (!checkEnquiryRateLimit(clientIp)) {
    return res.status(429).json({
      error: `Too many requests from this connection. Please call our Customer Support Agent directly at ${BRAND.phoneDisplay}.`,
    });
  }

  if (typeof req.body?.honeypot === 'string' && req.body.honeypot.trim().length > 0) {
    return res.status(400).json({ error: 'Invalid submission.' });
  }

  const parsed = chatLeadSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({
      error: 'Please check your contact details before submitting.',
      fieldErrors: parsed.error.flatten().fieldErrors,
    });
  }

  const d = parsed.data;
  const refSuffix = crypto.randomBytes(3).toString('hex').toUpperCase();
  const referenceCode = `MUD-${new Date().getFullYear()}-${refSuffix}`;

  try {
    const created = await createEnquiryRecord({
      referenceCode,
      customerName: d.customerName,
      contactPhone: d.contactPhone,
      email: d.email || null,
      preferredContactMethod: 'whatsapp',
      interestedPackageSlug: null,
      interestedPackageName: d.interestedPackageName,
      travelType: 'Travel Buddy Lead',
      durationDays: null,
      arrivalDate: d.arrivalDate || null,
      returnDate: null,
      adults: d.adults,
      children: d.children,
      pickupLocation: d.pickupLocation || null,
      dropLocation: null,
      vehiclePreference: d.vehiclePreference || null,
      interests: [],
      templesOfInterest: [],
      seniorTravelers: false,
      accessibilityNotes: null,
      hotelAssistance: false,
      guideRequired: false,
      specialRequirements: d.specialRequirements || null,
      consentAccepted: true,
      sourcePage: 'travel-buddy-form',
      leadStatus: 'new',
    });

    const emailResult = await sendLeadNotificationEmail({
      referenceCode: created.referenceCode,
      source: 'Travel Buddy Chatbot (Lead Form)',
      customerName: created.customerName,
      contactPhone: created.contactPhone,
      email: created.email,
      preferredContactMethod: 'WhatsApp / Phone',
      interestedPackageName: created.interestedPackageName,
      travelType: created.travelType,
      arrivalDate: created.arrivalDate,
      adults: created.adults,
      children: created.children,
      pickupLocation: created.pickupLocation,
      vehiclePreference: created.vehiclePreference,
      specialRequirements: created.specialRequirements,
      chatSummary: d.chatSummary || null,
    });

    void notifyOperatorWebhook({
      event: 'new_chatbot_lead',
      referenceCode: created.referenceCode,
      customerName: created.customerName,
      packageName: created.interestedPackageName,
      recipientEmail: emailResult.recipient,
    });

    return res.status(201).json({
      enquiry: {
        id: created.id,
        referenceCode: created.referenceCode,
        interestedPackageName: created.interestedPackageName,
        createdAt: created.createdAt,
      },
      emailForwarded: emailResult.sent,
      deliveryChannel: emailResult.channel,
      recipientEmail: emailResult.recipient,
      message: emailResult.sent
        ? `Thank you, ${created.customerName}! Your enquiry (${created.referenceCode}) has been recorded and forwarded to ${emailResult.recipient}.`
        : `Thank you, ${created.customerName}! Your enquiry (${created.referenceCode}) has been saved safely for our travel desk (${emailResult.recipient}). You can also call us directly at ${BRAND.phoneDisplay}.`,
    });
  } catch (error: unknown) {
    console.error('Travel Buddy lead submission failed:', error);
    return res.status(500).json({
      error: `We could not save your details right now. Please call our Customer Support Agent directly at ${BRAND.phoneDisplay}.`,
    });
  }
});

// ============================================================================
// PROTECTED ADMIN API ROUTES (Firebase Auth + Admin Role)
// ============================================================================

app.get('/api/admin/me', requireAdmin, (req: AuthRequest, res: Response) => {
  res.json({
    user: {
      uid: req.dbUser?.uid,
      email: req.dbUser?.email,
      displayName: req.dbUser?.displayName,
      role: req.dbUser?.role,
    },
  });
});

app.get('/api/admin/overview', requireAdmin, async (_req: AuthRequest, res: Response) => {
  try {
    await ensureSeeded();
    const [allPackages, allEnquiries, allDestinations, allArticles, allTestimonials] =
      await Promise.all([
        db.select().from(packages),
        db.select().from(enquiries).orderBy(desc(enquiries.createdAt)),
        db.select().from(destinations),
        db.select().from(articles),
        db.select().from(testimonials),
      ]);

    res.json({
      stats: {
        totalPackages: allPackages.length,
        approvedPricePackages: allPackages.filter((p) => p.pricingStatus === 'approved').length,
        pendingPricePackages: allPackages.filter((p) => p.pricingStatus !== 'approved').length,
        totalEnquiries: allEnquiries.length,
        newEnquiries: allEnquiries.filter((e) => e.leadStatus === 'new').length,
        totalDestinations: allDestinations.length,
        totalArticles: allArticles.length,
        approvedTestimonials: allTestimonials.filter((t) => t.isApproved).length,
      },
    });
  } catch (error) {
    console.error('Admin overview failed:', error);
    res.status(500).json({ error: 'Unable to load admin summary.' });
  }
});

app.get('/api/admin/packages', requireAdmin, async (_req: AuthRequest, res: Response) => {
  try {
    await ensureSeeded();
    const rows = await db
      .select()
      .from(packages)
      .orderBy(asc(packages.displayOrder), asc(packages.id));
    res.json({ packages: rows });
  } catch (error) {
    console.error('Admin packages fetch failed:', error);
    res.status(500).json({ error: 'Unable to load packages.' });
  }
});

app.post('/api/admin/packages', requireAdmin, async (req: AuthRequest, res: Response) => {
  const parsed = adminPackageCreateSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({
      error: 'Invalid package fields.',
      fieldErrors: parsed.error.flatten().fieldErrors,
    });
  }

  const d = parsed.data;
  try {
    const [created] = await db
      .insert(packages)
      .values({
        slug: d.slug,
        name: d.name,
        subtitle: d.subtitle,
        summary: d.summary,
        fullDescription: d.fullDescription,
        category: d.category,
        catalogType: d.catalogType,
        destinations: d.destinations,
        duration: d.duration,
        startingLocation: d.startingLocation,
        endingLocation: d.endingLocation,
        referencePrice: null,
        publishedPrice: d.publishedPrice,
        priceBasis: d.pricingStatus === 'approved' ? 'confirmed-rate' : 'custom-quote',
        pricingStatus: d.pricingStatus,
        pricingCurrency: 'INR',
        sourceUrl: null,
        lastVerifiedAt: new Date().toISOString().slice(0, 10),
        featuredImage: d.featuredImage || MEDIA.mahakaleshwarTemple,
        gallery: [{ url: d.featuredImage || MEDIA.mahakaleshwarTemple, caption: d.name, alt: d.name }],
        highlights: ['Private customizable spiritual itinerary crafted by My Ujjain Darshan'],
        itinerary: [
          {
            segment: 'Day 01',
            title: d.name,
            summary: d.summary,
            details: d.fullDescription,
          },
        ],
        placesCovered: [],
        inclusions: [
          {
            item: 'Private vehicle allocation as confirmed in written quotation',
            status: 'pending-operator-approval',
          },
        ],
        exclusions: [
          'Temple entry tickets, Bhasma Aarti passes, hotels, and meals unless confirmed in writing',
        ],
        travelInfo: {
          bestSeason: 'October to March',
          departureGuidance: 'Confirmed upon enquiry based on arrival timings',
          suitableVehicles: ['Sedan', 'MPV', 'Innova Crysta'],
          familySeniorNote: 'Customizable pacing available for elderly travelers',
          coverageNote: d.destinations.join(', '),
        },
        faqs: [],
        seoTitle: d.seoTitle,
        seoDescription: d.seoDescription,
        isFeatured: false,
        displayOrder: 50,
        publishingStatus: 'published',
      })
      .returning();

    return res.status(201).json({ package: created });
  } catch (error) {
    console.error('Create package failed:', error);
    return res.status(500).json({ error: 'Unable to create package. Ensure the slug is unique.' });
  }
});

app.patch('/api/admin/packages/:id', requireAdmin, async (req: AuthRequest, res: Response) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({ error: 'Invalid package ID.' });
  }
  const parsed = adminPackageUpdateSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({
      error: 'Invalid package update payload.',
      fieldErrors: parsed.error.flatten().fieldErrors,
    });
  }

  try {
    const updatePayload = {
      ...parsed.data,
      updatedAt: new Date(),
    };
    const [updated] = await db
      .update(packages)
      .set(updatePayload)
      .where(eq(packages.id, id))
      .returning();

    if (!updated) {
      return res.status(404).json({ error: 'Package not found.' });
    }
    return res.json({ package: updated });
  } catch (error) {
    console.error('Update package failed:', error);
    return res.status(500).json({ error: 'Unable to update package.' });
  }
});

app.get('/api/admin/enquiries', requireAdmin, async (_req: AuthRequest, res: Response) => {
  try {
    await ensureSeeded();
    const rows = await db
      .select()
      .from(enquiries)
      .orderBy(desc(enquiries.createdAt));
    res.json({ enquiries: rows });
  } catch (error) {
    console.error('Admin enquiries fetch failed:', error);
    res.status(500).json({ error: 'Unable to load enquiries.' });
  }
});

app.patch('/api/admin/enquiries/:id', requireAdmin, async (req: AuthRequest, res: Response) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({ error: 'Invalid enquiry ID.' });
  }
  const parsed = adminEnquiryUpdateSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: 'Invalid status or note.' });
  }

  try {
    const [updated] = await db
      .update(enquiries)
      .set({
        leadStatus: parsed.data.leadStatus,
        followUpNotes: parsed.data.followUpNotes ?? null,
        updatedAt: new Date(),
      })
      .where(eq(enquiries.id, id))
      .returning();

    if (!updated) return res.status(404).json({ error: 'Enquiry not found.' });
    return res.json({ enquiry: updated });
  } catch (error) {
    console.error('Update enquiry failed:', error);
    return res.status(500).json({ error: 'Unable to update enquiry.' });
  }
});

app.get('/api/admin/enquiries/export.csv', requireAdmin, async (_req: AuthRequest, res: Response) => {
  try {
    const rows = await db
      .select()
      .from(enquiries)
      .orderBy(desc(enquiries.createdAt));

    const header = [
      'Reference Code',
      'Created At',
      'Lead Status',
      'Customer Name',
      'Phone',
      'Email',
      'Package',
      'Travel Type',
      'Arrival Date',
      'Return Date',
      'Adults',
      'Children',
      'Pickup',
      'Drop',
      'Vehicle Preference',
      'Senior Travelers',
      'Hotel Assistance',
      'Guide Required',
      'Special Requirements',
      'Follow-Up Notes',
    ];

    const csvLines = [
      header.map(escapeCsvCell).join(','),
      ...rows.map((r) =>
        [
          r.referenceCode,
          r.createdAt?.toISOString() ?? '',
          r.leadStatus,
          r.customerName,
          r.contactPhone,
          r.email ?? '',
          r.interestedPackageName,
          r.travelType,
          r.arrivalDate ?? '',
          r.returnDate ?? '',
          r.adults,
          r.children,
          r.pickupLocation ?? '',
          r.dropLocation ?? '',
          r.vehiclePreference ?? '',
          r.seniorTravelers ? 'Yes' : 'No',
          r.hotelAssistance ? 'Yes' : 'No',
          r.guideRequired ? 'Yes' : 'No',
          r.specialRequirements ?? '',
          r.followUpNotes ?? '',
        ]
          .map(escapeCsvCell)
          .join(',')
      ),
    ];

    res.setHeader('Content-Type', 'text/csv; charset=utf-8');
    res.setHeader(
      'Content-Disposition',
      `attachment; filename="my-ujjain-darshan-enquiries-${new Date().toISOString().slice(0, 10)}.csv"`
    );
    res.send(csvLines.join('\n'));
  } catch (error) {
    console.error('CSV export failed:', error);
    res.status(500).json({ error: 'Unable to export CSV.' });
  }
});

app.get('/api/admin/faqs', requireAdmin, async (_req: AuthRequest, res: Response) => {
  try {
    const rows = await getFaqs();
    res.json({ faqs: rows });
  } catch (error) {
    console.error('Admin FAQs fetch failed:', error);
    res.status(500).json({ error: 'Unable to load FAQs.' });
  }
});

app.post('/api/admin/faqs', requireAdmin, async (req: AuthRequest, res: Response) => {
  const parsed = adminFaqSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: 'Invalid FAQ fields.' });
  }
  try {
    const [created] = await db
      .insert(faqs)
      .values({
        category: parsed.data.category,
        question: parsed.data.question,
        answer: parsed.data.answer,
        displayOrder: parsed.data.displayOrder ?? 20,
      })
      .returning();
    return res.status(201).json({ faq: created });
  } catch (error) {
    console.error('Create FAQ failed:', error);
    return res.status(500).json({ error: 'Unable to create FAQ.' });
  }
});

app.delete('/api/admin/faqs/:id', requireAdmin, async (req: AuthRequest, res: Response) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({ error: 'Invalid FAQ ID.' });
  }
  try {
    await db.delete(faqs).where(eq(faqs.id, id));
    return res.json({ ok: true });
  } catch (error) {
    console.error('Delete FAQ failed:', error);
    return res.status(500).json({ error: 'Unable to delete FAQ.' });
  }
});

app.get('/api/admin/articles', requireAdmin, async (_req: AuthRequest, res: Response) => {
  try {
    await ensureSeeded();
    const rows = await db
      .select()
      .from(articles)
      .orderBy(desc(articles.publishedDate), asc(articles.id));
    res.json({ articles: rows });
  } catch (error) {
    console.error('Admin articles fetch failed:', error);
    res.status(500).json({ error: 'Unable to load articles.' });
  }
});

app.post('/api/admin/articles', requireAdmin, async (req: AuthRequest, res: Response) => {
  const parsed = adminArticleCreateSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: 'Invalid article payload.' });
  }
  const d = parsed.data;
  try {
    const paragraphs = d.bodyText
      .split(/\n{2,}/)
      .map((p) => p.trim())
      .filter(Boolean);
    const [created] = await db
      .insert(articles)
      .values({
        slug: d.slug,
        title: d.title,
        category: d.category,
        readTime: d.readTime,
        excerpt: d.excerpt,
        content: [{ heading: d.title, paragraphs }],
        authorName: req.dbUser?.displayName || 'My Ujjain Darshan Editorial Desk',
        coverImage: d.coverImage || MEDIA.heroRamGhat,
        tags: [d.category, 'Ujjain'],
        relatedPackageSlugs: ['ujjain-darshan'],
        seoTitle: `${d.title} | My Ujjain Darshan`,
        seoDescription: d.excerpt,
        publishedDate: new Date().toISOString().slice(0, 10),
        publishingStatus: d.publishingStatus,
      })
      .returning();
    return res.status(201).json({ article: created });
  } catch (error) {
    console.error('Create article failed:', error);
    return res.status(500).json({ error: 'Unable to create article. Ensure slug is unique.' });
  }
});

app.get('/api/admin/testimonials', requireAdmin, async (_req: AuthRequest, res: Response) => {
  try {
    await ensureSeeded();
    const rows = await db
      .select()
      .from(testimonials)
      .orderBy(desc(testimonials.createdAt));
    res.json({ testimonials: rows });
  } catch (error) {
    console.error('Admin testimonials fetch failed:', error);
    res.status(500).json({ error: 'Unable to load testimonials.' });
  }
});

app.post('/api/admin/testimonials', requireAdmin, async (req: AuthRequest, res: Response) => {
  const parsed = adminTestimonialSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: 'Invalid testimonial fields.' });
  }
  try {
    const [created] = await db.insert(testimonials).values(parsed.data).returning();
    return res.status(201).json({ testimonial: created });
  } catch (error) {
    console.error('Create testimonial failed:', error);
    return res.status(500).json({ error: 'Unable to add testimonial.' });
  }
});

app.patch('/api/admin/testimonials/:id', requireAdmin, async (req: AuthRequest, res: Response) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({ error: 'Invalid ID.' });
  }
  const isApproved = Boolean(req.body?.isApproved);
  try {
    const [updated] = await db
      .update(testimonials)
      .set({ isApproved })
      .where(eq(testimonials.id, id))
      .returning();
    return res.json({ testimonial: updated });
  } catch (error) {
    console.error('Update testimonial failed:', error);
    return res.status(500).json({ error: 'Unable to update testimonial.' });
  }
});

app.get('/api/admin/vehicles', requireAdmin, async (_req: AuthRequest, res: Response) => {
  try {
    const rows = await getVehicles();
    res.json({ vehicles: rows });
  } catch (error) {
    console.error('Admin vehicles fetch failed:', error);
    res.status(500).json({ error: 'Unable to load vehicles.' });
  }
});

app.patch('/api/admin/vehicles/:id', requireAdmin, async (req: AuthRequest, res: Response) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({ error: 'Invalid vehicle ID.' });
  }
  const availabilityStatus =
    req.body?.availabilityStatus === 'confirmed' ? 'confirmed' : 'reference-unconfirmed';
  try {
    const [updated] = await db
      .update(vehicles)
      .set({ availabilityStatus })
      .where(eq(vehicles.id, id))
      .returning();
    return res.json({ vehicle: updated });
  } catch (error) {
    console.error('Update vehicle failed:', error);
    return res.status(500).json({ error: 'Unable to update vehicle status.' });
  }
});

app.get('/api/admin/settings', requireAdmin, async (_req: AuthRequest, res: Response) => {
  try {
    const settings = await getSiteSettingsMap();
    res.json({ settings });
  } catch (error) {
    console.error('Admin settings fetch failed:', error);
    res.status(500).json({ error: 'Unable to load settings.' });
  }
});

app.put('/api/admin/settings', requireAdmin, async (req: AuthRequest, res: Response) => {
  const allowedKeys = new Set([
    'brandPhone',
    'brandWhatsapp',
    'brandLocation',
    'contactEmail',
    'instagramUrl',
    'facebookUrl',
    'youtubeUrl',
  ]);
  const body = req.body?.settings;
  if (!body || typeof body !== 'object') {
    return res.status(400).json({ error: 'Invalid settings payload.' });
  }
  try {
    for (const [key, val] of Object.entries(body)) {
      if (!allowedKeys.has(key) || typeof val !== 'string') continue;
      const trimmed = val.trim().slice(0, 300);
      if (
        (key.endsWith('Url') && trimmed.length > 0 && !trimmed.startsWith('https://'))
      ) {
        continue;
      }
      await db
        .insert(siteSettings)
        .values({ key, value: trimmed, updatedAt: new Date() })
        .onConflictDoUpdate({
          target: siteSettings.key,
          set: { value: trimmed, updatedAt: new Date() },
        });
    }
    const updated = await getSiteSettingsMap();
    return res.json({ settings: updated });
  } catch (error) {
    console.error('Update settings failed:', error);
    return res.status(500).json({ error: 'Unable to update settings.' });
  }
});

// ============================================================================
// SEO ROUTES: robots.txt & sitemap.xml
// ============================================================================

app.get('/robots.txt', (req: Request, res: Response) => {
  const baseUrl =
    process.env.APP_URL && process.env.APP_URL !== 'MY_APP_URL'
      ? process.env.APP_URL.replace(/\/$/, '')
      : `${req.protocol}://${req.get('host')}`;

  res.type('text/plain').send(
    [
      'User-agent: *',
      'Allow: /',
      'Disallow: /admin',
      'Disallow: /api/',
      `Sitemap: ${baseUrl}/sitemap.xml`,
    ].join('\n')
  );
});

app.get('/sitemap.xml', async (req: Request, res: Response) => {
  const baseUrl =
    process.env.APP_URL && process.env.APP_URL !== 'MY_APP_URL'
      ? process.env.APP_URL.replace(/\/$/, '')
      : `${req.protocol}://${req.get('host')}`;

  const staticPaths = [
    '/',
    '/ujjain-darshan',
    '/packages',
    '/destinations',
    '/our-fleet',
    '/plan-your-journey',
    '/travel-journal',
    '/about',
    '/contact',
    '/faq',
    '/privacy-policy',
    '/terms-and-conditions',
    '/cancellation-policy',
  ];

  let dynamicPaths: string[] = [];
  try {
    const [pkgList, destList, artList] = await Promise.all([
      getPublicPackages(),
      getDestinations(),
      getPublishedArticles(),
    ]);
    dynamicPaths = [
      ...pkgList
        .filter((p) => p.slug !== 'ujjain-darshan')
        .map((p) => `/packages/${p.slug}`),
      ...destList.map((d) => `/destinations/${d.slug}`),
      ...artList.map((a) => `/travel-journal/${a.slug}`),
    ];
  } catch (err) {
    console.error('Sitemap dynamic query fallback:', err);
  }

  const allPaths = [...staticPaths, ...dynamicPaths];
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPaths
  .map(
    (p) => `  <url>
    <loc>${baseUrl}${p}</loc>
    <changefreq>${p === '/' ? 'weekly' : 'monthly'}</changefreq>
  </url>`
  )
  .join('\n')}
</urlset>`;

  res.type('application/xml').send(xml);
});

// ============================================================================
// VITE DEV / STATIC PRODUCTION SERVING
// ============================================================================

export async function startServer(existingServer?: Server) {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  if (existingServer) {
    existingServer.on('request', app);
    console.log('My Ujjain Darshan application is ready.');
    return;
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`My Ujjain Darshan server listening on http://0.0.0.0:${PORT}`);
  });
}

// Direct local execution (for example, `npm start`) retains the original behavior.
if (process.argv[1]?.endsWith('server.ts')) {
  void startServer();
}
