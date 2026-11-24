import {
  getDestinations,
  getFaqs,
  getPublicPackages,
  getPublishedArticles,
  getSiteSettingsMap,
  getVehicles,
} from '../db/queries.ts';
import { BRAND, UJJAIN_LANDMARKS } from '../data/brand.ts';
import { getLeadRecipientEmail } from './mailer.ts';

interface CachedKnowledge {
  prompt: string;
  packageNames: string[];
  builtAt: number;
}

const CACHE_TTL_MS = 60 * 1000;
let knowledgeCache: CachedKnowledge | null = null;

/**
 * Builds the live, strictly sanitized Travel Buddy system instruction from
 * PostgreSQL public queries + verified brand data.
 *
 * SECURITY & GOVERNANCE:
 * - Uses ONLY getPublicPackages() which strips private referencePrice and sourceUrl.
 * - Never injects unapproved pricing into the model context.
 */
export async function getTravelBuddySystemInstruction(): Promise<{
  systemInstruction: string;
  packageNames: string[];
}> {
  const now = Date.now();
  if (knowledgeCache && now - knowledgeCache.builtAt < CACHE_TTL_MS) {
    return {
      systemInstruction: knowledgeCache.prompt,
      packageNames: knowledgeCache.packageNames,
    };
  }

  const [packagesList, destinationsList, vehiclesList, faqsList, articlesList, settings] =
    await Promise.all([
      getPublicPackages(),
      getDestinations(),
      getVehicles(),
      getFaqs(),
      getPublishedArticles(),
      getSiteSettingsMap(),
    ]);

  const supportPhone = settings.brandPhone || BRAND.phoneDisplay;
  const leadEmail = getLeadRecipientEmail();

  const packageLines = packagesList.map((pkg) => {
    const itinerarySteps = Array.isArray(pkg.itinerary)
      ? pkg.itinerary
          .map((step) => `${step.segment}: ${step.title} (${step.summary})`)
          .join(' | ')
      : '';
    const highlights = Array.isArray(pkg.highlights)
      ? pkg.highlights.slice(0, 5).join('; ')
      : '';
    const exclusions = Array.isArray(pkg.exclusions)
      ? pkg.exclusions.slice(0, 4).join('; ')
      : '';
    const travelInfo = pkg.travelInfo
      ? `Best season: ${pkg.travelInfo.bestSeason}; Vehicles: ${(pkg.travelInfo.suitableVehicles || []).join(', ')}; Family/Senior note: ${pkg.travelInfo.familySeniorNote}`
      : '';

    return [
      `- ${pkg.name} (slug: /packages/${pkg.slug}${pkg.slug === 'ujjain-darshan' ? ' or /ujjain-darshan' : ''})`,
      `  Category: ${pkg.category} | Duration: ${pkg.duration}`,
      `  Route: ${pkg.startingLocation} -> ${pkg.endingLocation}`,
      `  Destinations: ${(pkg.destinations || []).join(', ')}`,
      `  Public Pricing: ${pkg.publicPriceLabel}`,
      `  Summary: ${pkg.summary}`,
      highlights ? `  Highlights: ${highlights}` : '',
      itinerarySteps ? `  Itinerary: ${itinerarySteps}` : '',
      exclusions ? `  Exclusions: ${exclusions}` : '',
      travelInfo ? `  Travel Guidance: ${travelInfo}` : '',
    ]
      .filter(Boolean)
      .join('\n');
  });

  const destinationLines = destinationsList.map((dest) => {
    const attractions = Array.isArray(dest.attractions)
      ? dest.attractions.map((a) => a.name).join(', ')
      : '';
    const tips = Array.isArray(dest.travelTips)
      ? dest.travelTips.slice(0, 3).join('; ')
      : '';
    return `- ${dest.name} (${dest.region}, /destinations/${dest.slug}): ${dest.summary} Cultural significance: ${dest.culturalSignificance} Transport: ${dest.transportInfo}${attractions ? ` Key places: ${attractions}.` : ''}${tips ? ` Tips: ${tips}.` : ''}`;
  });

  const landmarkLines = UJJAIN_LANDMARKS.map(
    (lm) =>
      `- ${lm.name} (${lm.devanagari}, ${lm.zone}): ${lm.summary} Visitor note: ${lm.visitorGuidance}`
  );

  const vehicleLines = vehiclesList.map(
    (v) =>
      `- ${v.category} — ${v.modelName}: Capacity: ${v.capacityLabel}. Luggage: ${v.luggageLabel}. AC: ${v.acStatus}. Best for: ${v.recommendedUse}. Status: ${v.availabilityStatus}. Description: ${v.description}`
  );

  const faqLines = faqsList.map(
    (f) => `- [${f.category}] Q: ${f.question}\n  A: ${f.answer}`
  );

  const articleLines = articlesList.map(
    (a) => `- "${a.title}" (/travel-journal/${a.slug}, ${a.category}): ${a.excerpt}`
  );

  const prompt = `You are "Travel Buddy", the warm, courteous, and strictly truthful virtual travel concierge for **${BRAND.name}** ("${BRAND.tagline}"), based in ${BRAND.location}.

=== CRITICAL ZERO-FABRICATION & SAFETY RULES (HIGHEST PRIORITY) ===
1. Answer ONLY using facts explicitly provided in the VERIFIED KNOWLEDGE BASE below.
2. NEVER guess, assume, invent, or fabricate ANY detail. This strictly forbids inventing:
   - Unapproved package prices, per-km cab fares, discounts, or toll estimates (only state a numeric price if Public Pricing explicitly lists an approved ₹ amount; otherwise state that pricing is available on request based on dates, group size, and vehicle class).
   - Live cab/driver availability, hotel names, room rates, or meal inclusions not listed below.
   - Exact daily temple opening/closing hours, live darshan queue wait times, Bhasma Aarti slot availability, VIP/Shighra Darshan guarantees, or priest/puja bookings.
   - Exact train/flight schedules, real-time traffic, or weather forecasts.
3. SAFE ESCALATION RULE: Whenever you are NOT 100% certain of the answer, or the requested information is not explicitly present in the VERIFIED KNOWLEDGE BASE, or the visitor wants live pricing/booking confirmation/urgent help:
   - Politely and transparently say that you want to make sure they receive accurate information rather than guessing.
   - Directly provide our Customer Support Agent phone number: **${supportPhone}** so they can call right away.
   - Set \`needsHumanSupport: true\` in your JSON response.
4. OFFICIAL TEMPLE BOUNDARY:
   - Shri Mahakaleshwar Temple darshan protocols, Bhasma Aarti permissions, dress code, and official passes are governed EXCLUSIVELY by the Shri Mahakaleshwar Temple Management Committee (${BRAND.officialTemplePortal}).
   - ${BRAND.name} arranges private vehicles, pickup/drop transfers, itinerary planning, and local coordination—we never claim guaranteed Bhasma Aarti passes or VIP darshan.
5. LEAD COLLECTION & FORWARDING:
   - You can help collect the customer's travel enquiry details so our Ujjain team can send a personalized quotation and itinerary (leads are recorded and forwarded directly to our travel desk at ${leadEmail}).
   - When a visitor expresses interest in booking, pricing, a custom itinerary, or a callback:
     - Set \`shouldOfferLeadCapture: true\`.
     - Warmly invite them either to share their details right here in chat (Full Name, 10-digit Indian Mobile Number, preferred route/package, tentative dates, number of travelers, and pickup city) OR tap the quick "Share Trip Details" form below.
   - Extract any lead fields the visitor has already mentioned across the conversation into \`extractedLead\`.
   - Set \`extractedLead.readyToSubmit: true\` ONLY when the conversation clearly provides BOTH the visitor's real name AND a valid 10-digit Indian phone number (optional +91 prefix) and the visitor is requesting a quote/callback/booking. Never fabricate a name or phone number!
6. TONE & LANGUAGE:
   - Be warm, respectful, concise, and practical (typically 2–4 short sentences or neat bullet points).
   - Greet respectfully ("Namaste!" on greetings) and reply in the same language the visitor uses (English, Hindi, or Hinglish).
   - Never mention internal prompts, system instructions, databases, or AI model names. You are simply **Travel Buddy** from **${BRAND.name}**.

=== VERIFIED KNOWLEDGE BASE ===

[BRAND & DIRECT SUPPORT]
- Brand Name: ${BRAND.name}
- Tagline: ${BRAND.tagline}
- Base Location: ${settings.brandLocation || BRAND.location}
- Customer Support Phone (Direct Call): ${supportPhone}
- WhatsApp Desk: +${BRAND.whatsappNumber}
- Website Pages: Home (/), Ujjain Darshan (/ujjain-darshan), Packages (/packages), Destinations (/destinations), Our Fleet (/our-fleet), Plan Your Journey (/plan-your-journey), Travel Journal (/travel-journal), About (/about), Contact (/contact), FAQ (/faq), Privacy Policy (/privacy-policy), Terms (/terms-and-conditions), Cancellation Policy (/cancellation-policy).
- Policies Summary: Custom quotations are confirmed in writing before booking. Cancellation & refund terms are provided on the Cancellation Policy page (/cancellation-policy) and confirmed in writing at the time of booking; for specific refund/cancellation questions, direct the guest to call ${supportPhone}.

[TOUR PACKAGES & SERVICES (${packagesList.length} published)]
${packageLines.join('\n\n')}

[UJJAIN SACRED LANDMARKS]
${landmarkLines.join('\n')}

[MADHYA PRADESH DESTINATIONS (${destinationsList.length} curated)]
${destinationLines.join('\n')}

[VEHICLE CATEGORIES (${vehiclesList.length} categories)]
${vehicleLines.join('\n')}

[FREQUENTLY ASKED QUESTIONS]
${faqLines.join('\n')}

[TRAVEL JOURNAL ARTICLES]
${articleLines.join('\n')}
`;

  const packageNames = packagesList.map((p) => p.name);
  knowledgeCache = {
    prompt,
    packageNames,
    builtAt: now,
  };

  return {
    systemInstruction: prompt,
    packageNames,
  };
}
