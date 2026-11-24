import { MEDIA } from './brand.ts';
import type {
  FaqItem,
  PackageGalleryItem,
  PackageInclusionItem,
  PackageItineraryStep,
  PackagePlaceCovered,
  PackageTravelInfo,
} from '../db/schema.ts';

export interface SeedPackage {
  slug: string;
  name: string;
  subtitle: string;
  summary: string;
  fullDescription: string;
  category: string;
  catalogType: 'reference-catalog' | 'proposed-experience';
  destinations: string[];
  duration: string;
  startingLocation: string;
  endingLocation: string;
  referencePrice: number | null;
  publishedPrice: number | null;
  priceBasis: string;
  pricingStatus: 'pending-approval' | 'approved' | 'request-only';
  pricingCurrency: string;
  sourceUrl: string | null;
  lastVerifiedAt: string;
  featuredImage: string;
  gallery: PackageGalleryItem[];
  highlights: string[];
  itinerary: PackageItineraryStep[];
  placesCovered: PackagePlaceCovered[];
  inclusions: PackageInclusionItem[];
  exclusions: string[];
  travelInfo: PackageTravelInfo;
  faqs: FaqItem[];
  seoTitle: string;
  seoDescription: string;
  isFeatured: boolean;
  displayOrder: number;
  publishingStatus: 'published' | 'draft' | 'archived';
}

const STANDARD_PENDING_INCLUSIONS: PackageInclusionItem[] = [
  { item: 'Private vehicle allocation as confirmed in written quotation', status: 'pending-operator-approval' },
  { item: 'Driver allowance and local route coordination', status: 'pending-operator-approval' },
  { item: 'Flexible sightseeing pacing tailored to your group', status: 'pending-operator-approval' },
  { item: 'Tolls, state permits, and parking (to be confirmed per quotation)', status: 'pending-operator-approval' },
];

const STANDARD_EXCLUSIONS: string[] = [
  'Temple entry tickets, special darshan fees, Bhasma Aarti passes, or ritual offerings (administered directly by respective temple trusts)',
  'Hotel accommodation and meals unless explicitly added and confirmed in your personalized quotation',
  'Monument or ASI museum admission charges, ropeway tickets, boat rides, and local e-rickshaw shuttles inside pedestrian temple zones',
  'Personal expenses, photography permits, and licensed tour guide fees unless specifically requested',
];

export const SEED_PACKAGES: SeedPackage[] = [
  {
    slug: 'ujjain-darshan',
    name: 'Ujjain Darshan',
    subtitle: 'The Signature Sacred Circuit of Ancient Avanti',
    summary:
      'An unhurried full-day private spiritual circuit through Ujjain’s defining temples—linking Shri Mahakaleshwar, Mahakal Lok, Harsiddhi Mata, Ram Ghat, Kal Bhairav, Mangalnath, Sandipani Ashram, and Chintaman Ganesh.',
    fullDescription:
      'Begin your exploration of Ujjain at the revered Mahakaleshwar Jyotirlinga, where centuries of living devotion shape the quiet pulse of the city. Designed as My Ujjain Darshan’s signature experience, this thoughtfully sequenced local circuit moves beyond hurried checklist sightseeing. Rather than crisscrossing congested bazaar lanes, the day unfolds in natural geographical clusters: the sacred central core around Rudra Sagar and the Shipra riverfront, followed by the historic northern shrines along the river bend, and concluding with calm heritage stops outside the old city.\n\nWhether you are visiting Ujjain for the first time, traveling with parents and children, or returning for quiet reflection along Ram Ghat, our route planning accounts for walking transitions near pedestrian temple zones, unhurried rest breaks, and honest local guidance. Official temple darshan slots and Bhasma Aarti permissions remain directly managed by the Shri Mahakaleshwar Temple Management Committee; our team focuses on making your ground movement, sequence, and comfort effortless.',
    category: 'ujjain-experiences',
    catalogType: 'reference-catalog',
    destinations: ['Ujjain'],
    duration: '1 Full Day (Approx. 8–10 Hours)',
    startingLocation: 'Ujjain Hotel / Ujjain Railway Station',
    endingLocation: 'Ujjain Hotel / Ujjain Railway Station',
    referencePrice: 2000,
    publishedPrice: null,
    priceBasis: 'per-vehicle-reference',
    pricingStatus: 'pending-approval',
    pricingCurrency: 'INR',
    sourceUrl: 'https://ujjaintourtravels.in/',
    lastVerifiedAt: '2026-11-23',
    featuredImage: MEDIA.mahakaleshwarTemple,
    gallery: [
      {
        url: MEDIA.mahakaleshwarTemple,
        caption: 'Illuminated shikhara of Shri Mahakaleshwar Jyotirlinga Temple in Ujjain at twilight',
        alt: 'Shri Mahakaleshwar Jyotirlinga Temple shikhara illuminated at twilight in Ujjain',
      },
      {
        url: MEDIA.mahakalCorridor,
        caption: 'Evening glow across the illuminated Shiva sculpture and colonnades of Shri Mahakal Lok',
        alt: 'Shri Mahakal Lok corridor sculpture illuminated at twilight in Ujjain',
      },
      {
        url: MEDIA.harsiddhiTemple,
        caption: 'Vermilion Nagara shikhara of Harsiddhi Mata Temple near Rudra Sagar',
        alt: 'Harsiddhi Mata Shakti Peeth Temple shikhara in Ujjain',
      },
      {
        url: MEDIA.ramGhatRiverfront,
        caption: 'Stone steps and riverfront shrines along Ram Ghat on the Shipra River',
        alt: 'Ram Ghat on the sacred Shipra River in Ujjain',
      },
      {
        url: MEDIA.kalBhairavTemple,
        caption: 'Kal Bhairav Temple along the northern bank of the Shipra River',
        alt: 'Kal Bhairav Temple entrance and dome in Ujjain',
      },
      {
        url: MEDIA.sandipaniAshram,
        caption: 'Historic stepped Gomti Kund courtyard at Maharishi Sandipani Ashram',
        alt: 'Gomti Kund courtyard at Sandipani Ashram in Ujjain',
      },
    ],
    highlights: [
      'Logical cluster-based sequencing that minimizes city traffic and backtracking',
      'Unhurried time for Shri Mahakaleshwar Jyotirlinga and the sculpted colonnades of Shri Mahakal Lok',
      'Northern Shipra heritage loop uniting Kal Bhairav, Mangalnath, Gadkalika, and Sandipani Ashram',
      'Peaceful late-afternoon transition from Harsiddhi Mata to the stone steps of Ram Ghat',
      'Customizable pacing for elderly family members and first-time visitors',
    ],
    itinerary: [
      {
        segment: 'Morning · Segment 01',
        title: 'Shri Mahakaleshwar Jyotirlinga & Shri Mahakal Lok',
        duration: 'Approx. 2.5 – 3.5 Hours',
        summary: 'Enter the sacred heart of Ujjain beside Rudra Sagar.',
        details:
          'Your vehicle drops you at the designated access point near Mahakal Lok. Walk through the sculpted sandstone colonnades and Nandi Dwar before proceeding into the Shri Mahakaleshwar temple precinct according to your official darshan plan.',
        walkingNote: 'Moderate pedestrian stretch through Mahakal Lok; local battery carts are typically available at official counters for elderly visitors.',
        visitorAdvice: 'Check current entry and mobile-locker rules on the official temple portal before arrival.',
      },
      {
        segment: 'Late Morning · Segment 02',
        title: 'Chintaman Ganesh & Heritage Transition',
        duration: 'Approx. 1 – 1.5 Hours',
        summary: 'Visit the self-manifested Swayambhu Ganesh shrine with Paramara stone pillars.',
        details:
          'After completing morning darshan, drive smoothly toward the quieter southwestern edge of Ujjain to visit Chintaman Ganesh Temple, followed by a relaxed local refreshment or lunch break.',
        walkingNote: 'Minimal stairs; calm courtyard access.',
      },
      {
        segment: 'Afternoon · Segment 03',
        title: 'Northern Shipra Loop: Kal Bhairav, Gadkalika, Mangalnath & Sandipani Ashram',
        duration: 'Approx. 2.5 – 3 Hours',
        summary: 'Discover Ujjain’s guardian shrines, astronomical heritage, and ancient gurukul.',
        details:
          'Explore Kal Bhairav Temple above the northern Shipra bank, continue to Gadkalika Mata Temple near the ancient Avanti mound, pause overlooking the river bend at Mangalnath Temple, and reflect quietly beside Gomti Kund at Sandipani Ashram.',
        walkingNote: 'Direct vehicle drop close to each temple entrance; comfortable for families.',
        visitorAdvice: 'Mangalnath sees higher devotee turnout on Tuesdays; we adjust order accordingly.',
      },
      {
        segment: 'Twilight · Segment 04',
        title: 'Harsiddhi Mata Temple & Ram Ghat on the Shipra',
        duration: 'Approx. 1.5 – 2 Hours',
        summary: 'Conclude the day with Shakti Peeth darshan and quiet riverfront prayers.',
        details:
          'Return to the historic waterfront for darshan at Harsiddhi Mata Temple, admired for its twin Maratha deep stambhas, then stroll down to Ram Ghat as evening bells and brass lamps illuminate the Shipra.',
        walkingNote: 'Short walk between Harsiddhi and Ram Ghat; caution advised on damp stone steps.',
      },
    ],
    placesCovered: [
      {
        name: 'Shri Mahakaleshwar Jyotirlinga',
        slug: 'ujjain',
        significance: 'South-facing Jyotirlinga anchoring Ujjain’s ancient Shaiva identity.',
        highlights: 'Three-level sanctum architecture beside Rudra Sagar.',
        visitNote: 'Official darshan managed solely by the Temple Management Committee.',
        recommendedDuration: '1.5 – 2.5 hrs',
        image: MEDIA.mahakaleshwarDay,
      },
      {
        name: 'Shri Mahakal Lok',
        slug: 'ujjain',
        significance: 'Grand contemporary sandstone corridor depicting classical Shiva narratives.',
        highlights: 'Carved pillars, Nandi Dwar, lotus pond, and evening illumination.',
        visitNote: 'Allow extra time at twilight for atmospheric walks.',
        recommendedDuration: '1 – 1.5 hrs',
        image: MEDIA.mahakalCorridor,
      },
      {
        name: 'Ram Ghat & Harsiddhi Mata',
        slug: 'ujjain',
        significance: 'Simhastha Kumbh riverfront paired with an ancient Shakti Peeth.',
        highlights: 'Twin Maratha lamp pillars and evening Shipra Aarti.',
        visitNote: 'Ideal closing chapter of your day in Ujjain.',
        recommendedDuration: '1.5 hrs',
        image: MEDIA.harsiddhiTemple,
      },
      {
        name: 'Kal Bhairav, Mangalnath & Sandipani Ashram',
        slug: 'ujjain',
        significance: 'Guardian shrine, prime-meridian hillock, and traditional gurukul of Krishna.',
        highlights: 'Shipra river bends, ancient Gomti Kund, and historic stone courtyards.',
        visitNote: 'Grouped together for smooth private-vehicle touring.',
        recommendedDuration: '2.5 hrs',
        image: MEDIA.kalBhairavTemple,
      },
    ],
    inclusions: STANDARD_PENDING_INCLUSIONS,
    exclusions: STANDARD_EXCLUSIONS,
    travelInfo: {
      bestSeason: 'October to March offers cool, comfortable temple walks; April–June favors early morning starts.',
      departureGuidance: 'A morning pickup between 7:30 AM and 8:30 AM allows unhurried pacing before evening Shipra Aarti.',
      suitableVehicles: ['Sedan (Dzire or equivalent)', 'MPV (Ertiga or equivalent)', 'Innova / Innova Crysta', 'Tempo Traveller'],
      familySeniorNote: 'We sequence minimal-walking drops and build shaded midday rest intervals when traveling with seniors.',
      coverageNote: 'Covers major central, northern, and southwestern shrines across Ujjain.',
    },
    faqs: [
      {
        question: 'Does the Ujjain Darshan package include Mahakaleshwar Bhasma Aarti permission?',
        answer:
          'No. Bhasma Aarti permissions and special darshan passes are issued exclusively by the Shri Mahakaleshwar Temple Management Committee through its official portal. We assist with travel scheduling around your confirmed temple slot.',
      },
      {
        question: 'Can we customize which temples are included in our one-day Ujjain Darshan?',
        answer:
          'Yes. Every journey is arranged privately, allowing you to prioritize specific temples, extend time at Mahakal Lok, or add quieter rest breaks for elderly travelers.',
      },
      {
        question: 'Can vehicles drive directly to the Mahakaleshwar sanctum gate?',
        answer:
          'Local traffic regulations maintain pedestrian corridors around Mahakaleshwar and Mahakal Lok. Our driver drops you at the nearest permitted point and coordinates pickup once your darshan concludes.',
      },
    ],
    seoTitle: 'Ujjain Darshan Tour Package — Full-Day Guided Temple & Heritage Journey',
    seoDescription:
      'Experience Ujjain Darshan with My Ujjain Darshan: Mahakaleshwar, Mahakal Lok, Harsiddhi Mata, Ram Ghat, Kal Bhairav, Mangalnath, and Sandipani Ashram.',
    isFeatured: true,
    displayOrder: 1,
    publishingStatus: 'published',
  },
  {
    slug: 'airport-pickup-drop',
    name: 'Airport Pickup & Drop',
    subtitle: 'Seamless Private Transfers Between Indore Airport and Ujjain',
    summary:
      'Reliable, punctual door-to-door private transfers connecting Devi Ahilya Bai Holkar Airport (Indore) with your hotel, ashram, or railway station in Ujjain.',
    fullDescription:
      'Arriving for a pilgrimage should feel calm from the moment you step out of the terminal. Our Indore Airport Pickup & Drop service provides clean, private, pre-coordinated road transfers between Devi Ahilya Bai Holkar Airport in Indore and any residence, hotel, or temple-zone drop point in Ujjain.\n\nInstead of negotiating last-minute terminal cabs or worrying about late-night flight arrivals, your driver tracks your scheduled arrival details, greets you outside the arrival lane, assists with luggage, and navigates the highway smoothly to Ujjain. Ideal for solo pilgrims, couples, families with luggage, and senior travelers requiring dependable assistance.',
    category: 'airport-transport',
    catalogType: 'reference-catalog',
    destinations: ['Indore', 'Ujjain'],
    duration: 'One-Way Transfer (Highway Journey)',
    startingLocation: 'Indore Airport (IDR) or Ujjain',
    endingLocation: 'Ujjain or Indore Airport (IDR)',
    referencePrice: 1800,
    publishedPrice: null,
    priceBasis: 'per-vehicle-reference',
    pricingStatus: 'pending-approval',
    pricingCurrency: 'INR',
    sourceUrl: 'https://ujjaintourtravels.in/',
    lastVerifiedAt: '2026-11-23',
    featuredImage: MEDIA.indoreAirportTerminal,
    gallery: [
      {
        url: MEDIA.indoreAirportTerminal,
        caption: 'Devi Ahilyabai Holkar Airport terminal building in Indore — the primary air gateway to Ujjain',
        alt: 'Devi Ahilyabai Holkar Airport passenger terminal facade in Indore, Madhya Pradesh',
      },
      {
        url: MEDIA.indoreAirportAircraft,
        caption: 'Commercial domestic flight arrivals at Devi Ahilyabai Holkar Airport, Indore (IDR)',
        alt: 'Commercial passenger aircraft parked on the tarmac at Devi Ahilyabai Holkar Airport, Indore',
      },
      {
        url: MEDIA.vehicleInnovaCrysta,
        caption: 'Representative private touring MPV available for pre-coordinated airport pickups and drops',
        alt: 'White Toyota Innova Crysta private transfer vehicle',
      },
    ],
    highlights: [
      'Direct private transfer with zero ride-sharing detours',
      'Coordinated around flight arrival or departure schedules',
      'Clean vehicle options sized for family luggage and elderly comfort',
      'Optional en-route stop at Chintaman Ganesh Temple upon advance request',
    ],
    itinerary: [
      {
        segment: 'Stage 01 · Arrival Meet',
        title: 'Coordinated Pickup at Indore Airport or Ujjain Hotel',
        summary: 'Driver details shared ahead of your pickup window.',
        details:
          'Upon landing at Devi Ahilya Bai Holkar Airport (or departing from Ujjain), connect directly with your assigned driver at the arrival pickup bay for luggage loading and immediate departure.',
      },
      {
        segment: 'Stage 02 · Highway Transit',
        title: 'Smooth Malwa Highway Drive to Ujjain',
        summary: 'Comfortable air-conditioned highway travel with optional refreshment halt.',
        details:
          'Travel along the Indore–Ujjain highway corridor directly to your hotel entrance or nearest accessible point in Ujjain’s heritage zone.',
      },
    ],
    placesCovered: [
      {
        name: 'Indore Airport to Ujjain Corridor',
        slug: 'ujjain',
        significance: 'Primary air gateway serving pilgrims bound for Mahakaleshwar.',
        highlights: 'Smooth four-lane Malwa road connection with optional temple approach stops.',
        visitNote: 'Share flight number and luggage count while requesting a quote.',
        image: MEDIA.indoreAirportTerminal,
      },
    ],
    inclusions: STANDARD_PENDING_INCLUSIONS,
    exclusions: [
      'Airport parking charges or waiting charges beyond confirmed grace period (confirmed in written quote)',
      'Local sightseeing detours unless pre-arranged in the quotation',
    ],
    travelInfo: {
      bestSeason: 'Available year-round with 24-hour advance coordination for early-morning or late-night flights.',
      departureGuidance: 'For return airport drops, allow generous buffer time for city traffic and terminal security.',
      suitableVehicles: ['Sedan (Dzire or equivalent)', 'MPV (Ertiga or equivalent)', 'Innova / Innova Crysta', 'Tempo Traveller'],
      familySeniorNote: 'Choose an MPV or Innova when traveling with multiple large suitcases or wheelchair-folding equipment.',
      coverageNote: 'Direct point-to-point airport transfer between Indore (IDR) and Ujjain.',
    },
    faqs: [
      {
        question: 'Can we book an early-morning or late-night Indore Airport pickup?',
        answer: 'Yes. Share your flight number and arrival time in advance so our team can confirm vehicle allocation and driver contact details beforehand.',
      },
      {
        question: 'Can we convert our airport transfer into a same-day Ujjain Darshan tour?',
        answer: 'Yes. Our dedicated Indore Airport → Ujjain Darshan → Indore Airport package is specifically designed for same-day flyers.',
      },
    ],
    seoTitle: 'Indore Airport to Ujjain Cab & Pickup Drop Service | My Ujjain Darshan',
    seoDescription:
      'Request a private, punctual Indore Airport to Ujjain pickup or drop transfer with My Ujjain Darshan.',
    isFeatured: false,
    displayOrder: 2,
    publishingStatus: 'published',
  },
  {
    slug: 'omkareshwar',
    name: 'Omkareshwar',
    subtitle: 'Pilgrimage to Mandhata Island & the Narmada Jyotirlinga',
    summary:
      'A dedicated full-day sacred road journey from Ujjain across the Vindhya hills to the river island of Omkareshwar and the historic Mamleshwar Temple along the Narmada.',
    fullDescription:
      'Few spiritual journeys in India rival the landscape shift from the Malwa plains of Ujjain to the forested river valley of Omkareshwar. Here, the sacred Narmada divides around the island of Mandhata, cradling Shri Omkareshwar Jyotirlinga on one bank and the ancient, archaeologically preserved Mamleshwar Temple on the other.\n\nThis full-day private excursion is paced to give you unhurried time for both temples, quiet contemplation along the stone Narmada ghats, and a comfortable return drive to Ujjain or onward transfer to Indore. Our drivers know the Vindhya ghat road well and advise practical early departures so families avoid afternoon fatigue.',
    category: 'jyotirlinga-journeys',
    catalogType: 'reference-catalog',
    destinations: ['Ujjain', 'Omkareshwar'],
    duration: '1 Full Day Excursion',
    startingLocation: 'Ujjain (or Indore by customization)',
    endingLocation: 'Ujjain (or Indore by customization)',
    referencePrice: 3200,
    publishedPrice: null,
    priceBasis: 'per-vehicle-reference',
    pricingStatus: 'pending-approval',
    pricingCurrency: 'INR',
    sourceUrl: 'https://ujjaintourtravels.in/',
    lastVerifiedAt: '2026-11-23',
    featuredImage: MEDIA.omkareshwarIsland,
    gallery: [
      {
        url: MEDIA.omkareshwarIsland,
        caption: 'Shri Omkareshwar Jyotirlinga Temple rising above Mandhata Island on the Narmada',
        alt: 'Shri Omkareshwar Jyotirlinga Temple on Mandhata Island beside the Narmada River',
      },
      {
        url: MEDIA.omkareshwarRiverView,
        caption: 'Sacred Narmada riverfront and temple shikhara view at Omkareshwar',
        alt: 'Omkareshwar riverside temples overlooking the Narmada River',
      },
      {
        url: MEDIA.mamleshwarTemple,
        caption: 'Ancient stone shikhara of Shri Mamleshwar Temple on the southern bank',
        alt: 'Shri Mamleshwar Temple complex on the southern Narmada bank at Omkareshwar',
      },
    ],
    highlights: [
      'Complete twin-bank darshan covering both Shri Omkareshwar Jyotirlinga and Shri Mamleshwar Temple',
      'Scenic drive across the Vindhya escarpment descending into the Narmada valley',
      'Unhurried riverside pause along the serene Narmada ghats',
      'Flexible return drop to Ujjain or Indore Airport/Railway Station',
    ],
    itinerary: [
      {
        segment: 'Morning · Segment 01',
        title: 'Early Departure from Ujjain Across the Vindhya Ghat Road',
        summary: 'Begin early to reach the Narmada riverfront in cool morning light.',
        details:
          'Depart Ujjain after an early breakfast, traveling south past Indore and descending through the scenic Vindhya hill corridor into the Narmada valley with an optional highway tea stop.',
      },
      {
        segment: 'Late Morning · Segment 02',
        title: 'Shri Omkareshwar Jyotirlinga on Mandhata Island',
        summary: 'Cross onto the sacred island for Jyotirlinga darshan.',
        details:
          'Park near the regulated approach zone and proceed via pedestrian bridge or local boat to Mandhata Island for darshan at Shri Omkareshwar Jyotirlinga and quiet observation of the Narmada confluence.',
        walkingNote: 'Involves bridge crossing and temple steps; take steady pacing and carry light water.',
      },
      {
        segment: 'Afternoon · Segment 03',
        title: 'Shri Mamleshwar Temple & Narmada Ghats',
        summary: 'Complete the traditional Jyotirlinga visit on the southern bank.',
        details:
          'Visit the tranquil, intricately carved Mamleshwar Temple complex on the mainland south bank, followed by a relaxed vegetarian lunch break before the comfortable evening drive back to Ujjain.',
      },
    ],
    placesCovered: [
      {
        name: 'Shri Omkareshwar Jyotirlinga',
        slug: 'omkareshwar',
        significance: 'Fourth of India’s twelve Jyotirlingas, perched on sacred Mandhata Island.',
        highlights: 'Carved stone pillars, hilltop sanctuaries, and sweeping river views.',
        visitNote: 'Bridge and local boat access operate under local administration guidelines.',
        image: MEDIA.omkareshwarIsland,
      },
      {
        name: 'Shri Mamleshwar Temple',
        slug: 'omkareshwar',
        significance: 'Ancient mainland shrine regarded as inseparable from Omkareshwar darshan.',
        highlights: 'Protected stone courtyard and serene spiritual ambience.',
        visitNote: 'Easier walking access than the island hill climb.',
        image: MEDIA.mamleshwarTemple,
      },
    ],
    inclusions: STANDARD_PENDING_INCLUSIONS,
    exclusions: STANDARD_EXCLUSIONS,
    travelInfo: {
      bestSeason: 'October to March is ideal; monsoon brings dramatic green hills and full Narmada waters.',
      departureGuidance: 'Leaving Ujjain around 6:30–7:00 AM ensures calm morning darshan.',
      suitableVehicles: ['Sedan (Dzire or equivalent)', 'MPV (Ertiga or equivalent)', 'Innova / Innova Crysta', 'Tempo Traveller'],
      familySeniorNote: 'Innova or Ertiga provides added suspension comfort across the hill-road descent.',
      coverageNote: 'Round-trip pilgrimage between Ujjain and Omkareshwar.',
    },
    faqs: [
      {
        question: 'Can we visit both Omkareshwar and Mamleshwar in a single day from Ujjain?',
        answer: 'Yes. With an early morning departure from Ujjain, travelers comfortably visit both Omkareshwar on Mandhata Island and Mamleshwar on the south bank and return by evening.',
      },
      {
        question: 'Can we add Maheshwar to our Omkareshwar trip?',
        answer: 'Yes! See our combined Omkareshwar + Maheshwar + Mamleshwar + Shani Temple circuit, or plan a relaxed overnight stay along the Narmada.',
      },
    ],
    seoTitle: 'Omkareshwar Tour from Ujjain — Private Jyotirlinga Day Pilgrimage',
    seoDescription:
      'Plan a serene day journey from Ujjain to Omkareshwar Jyotirlinga and Mamleshwar Temple with comfortable private transport.',
    isFeatured: false,
    displayOrder: 3,
    publishingStatus: 'published',
  },
  {
    slug: 'maheshwar',
    name: 'Maheshwar',
    subtitle: 'Ahilya Fort, Narmada Sunset Ghats & Living Handloom Craft',
    summary:
      'Journey from Ujjain to Maharani Ahilyabai Holkar’s riverside heritage capital—exploring sandstone ramparts, sculpted ghats, temple architecture, and authentic Maheshwari looms.',
    fullDescription:
      'Perched gracefully above a broad, calm stretch of the Narmada, Maheshwar is among central India’s most evocative heritage towns. Once the capital of the revered 18th-century ruler Maharani Ahilyabai Holkar, Maheshwar marries devotional stonework with quiet architectural grandeur.\n\nThis full-day private journey lets you step inside Ahilya Fort’s tranquil courtyards, descend the grand ceremonial steps of Ahilya Ghat, admire the exquisite carvings of Ahilyeshwar Temple, and watch master weavers crafting Maheshwari silk-cotton textiles on traditional wooden looms before twilight bathes the riverfront in amber light.',
    category: 'heritage-escapes',
    catalogType: 'reference-catalog',
    destinations: ['Ujjain', 'Maheshwar'],
    duration: '1 Full Day Heritage Excursion',
    startingLocation: 'Ujjain',
    endingLocation: 'Ujjain',
    referencePrice: 4000,
    publishedPrice: null,
    priceBasis: 'per-vehicle-reference',
    pricingStatus: 'pending-approval',
    pricingCurrency: 'INR',
    sourceUrl: 'https://ujjaintourtravels.in/',
    lastVerifiedAt: '2026-11-23',
    featuredImage: MEDIA.maheshwarGhat,
    gallery: [
      {
        url: MEDIA.maheshwarGhat,
        caption: 'Ahilya Fort sandstone ramparts and ceremonial ghats overlooking the Narmada River',
        alt: 'Ahilya Fort and riverside ghats of Maheshwar on the Narmada River',
      },
      {
        url: MEDIA.maheshwarRiverfront,
        caption: 'Carved Maratha shrines and riverfront steps at Maheshwar',
        alt: 'Historic temples along the Narmada riverfront at Maheshwar',
      },
    ],
    highlights: [
      'Explore Ahilya Fort, Rajwada courtyard, and Maharani Ahilyabai’s royal shrine',
      'Walk the serene stone ghats and carved Maratha spires of Ahilyeshwar Temple',
      'Observe centuries-old Maheshwari handloom weaving traditions at local workshops',
      'Optional tranquil riverside boat vista along the Narmada during late afternoon',
    ],
    itinerary: [
      {
        segment: 'Morning · Segment 01',
        title: 'Scenic Highway Drive from Ujjain to Maheshwar',
        summary: 'Descend from the Malwa plateau to the wide Narmada riverfront.',
        details:
          'Depart Ujjain in a comfortable private vehicle, enjoying countryside views and a relaxed breakfast halt along the highway before arriving at historic Maheshwar.',
      },
      {
        segment: 'Midday · Segment 02',
        title: 'Ahilya Fort, Rajwada & Handloom Heritage',
        summary: 'Discover Holkar architecture and living Maheshwari craftsmanship.',
        details:
          'Tour the fort courtyards, royal throne room, and historic Rehwa Society weaving workshops, followed by a calm local lunch overlooking the town.',
      },
      {
        segment: 'Late Afternoon · Segment 03',
        title: 'Ahilyeshwar Temple & Golden Hour at Narmada Ghats',
        summary: 'Experience Maheshwar at its most photogenic hour.',
        details:
          'Stroll along the ceremonial ghats framed by cenotaphs and temples, watch wooden boats glide across the sunlit river, and depart comfortably back to Ujjain.',
      },
    ],
    placesCovered: [
      {
        name: 'Ahilya Fort & Rajwada',
        slug: 'maheshwar',
        significance: '18th-century riverfront seat of Maharani Ahilyabai Holkar.',
        highlights: 'Elevated sandstone bastions, inner shrine, and Narmada panoramas.',
        visitNote: 'Stone stairways lead from the fort down to the waterfront ghats.',
        image: MEDIA.maheshwarGhat,
      },
    ],
    inclusions: STANDARD_PENDING_INCLUSIONS,
    exclusions: STANDARD_EXCLUSIONS,
    travelInfo: {
      bestSeason: 'October to March; late afternoons are particularly pleasant by the river breeze.',
      departureGuidance: 'An 8:00 AM start allows you to linger until golden sunset on the ghats.',
      suitableVehicles: ['Sedan (Dzire or equivalent)', 'MPV (Ertiga or equivalent)', 'Innova / Innova Crysta'],
      familySeniorNote: 'Vehicles access the fort entrance directly, minimizing uphill walking.',
      coverageNote: 'Full-day private return journey from Ujjain to Maheshwar.',
    },
    faqs: [
      {
        question: 'Are Maheshwari handloom workshops open every day?',
        answer: 'Most workshops and weaver cooperatives welcome visitors during daytime hours, though operating schedules can vary on local holidays.',
      },
      {
        question: 'Can Maheshwar be combined with Mandu or Omkareshwar?',
        answer: 'Yes. Maheshwar pairs wonderfully with Omkareshwar for a Narmada spiritual circuit or with Mandu for a two-day architectural escape.',
      },
    ],
    seoTitle: 'Maheshwar Tour from Ujjain — Ahilya Fort & Narmada Ghats Heritage Trip',
    seoDescription:
      'Explore Maheshwar from Ujjain with private transport: Ahilya Fort, Ahilyeshwar Temple, serene Narmada ghats, and traditional Maheshwari weavers.',
    isFeatured: false,
    displayOrder: 4,
    publishingStatus: 'published',
  },
  {
    slug: 'mandu',
    name: 'Mandu',
    subtitle: 'Medieval Sandstone Palaces & Vindhya Plateau Heritage',
    summary:
      'Step into the poetic fortress city of Mandu (Mandavgad), discovering Jahaz Mahal, Hindola Mahal, Hoshang Shah’s Tomb, and Rani Roopmati Pavilion perched above the Nimar plains.',
    fullDescription:
      'Set high on a fortified green escarpment of the Vindhya hills, Mandu is one of India’s most atmospheric medieval monument landscapes. Across three distinct heritage zones—the Royal Enclave, Village Group, and Rewa Kund Group—sandstone pavilions, arched audience halls, baobab groves, and engineered water lakes narrate centuries of Malwa Sultanate artistry.\n\nBecause Mandu’s monuments span a wide hilltop plateau, exploring with a dedicated private vehicle ensures you move effortlessly from the morning reflections of Jahaz Mahal to the sweeping valley panoramas of Rani Roopmati Pavilion without rushing or fatigue.',
    category: 'heritage-escapes',
    catalogType: 'reference-catalog',
    destinations: ['Ujjain', 'Mandu'],
    duration: '1 Full Day Architectural Excursion',
    startingLocation: 'Ujjain',
    endingLocation: 'Ujjain',
    referencePrice: 4000,
    publishedPrice: null,
    priceBasis: 'per-vehicle-reference',
    pricingStatus: 'pending-approval',
    pricingCurrency: 'INR',
    sourceUrl: 'https://ujjaintourtravels.in/',
    lastVerifiedAt: '2026-11-23',
    featuredImage: MEDIA.manduPalace,
    gallery: [
      {
        url: MEDIA.manduPalace,
        caption: 'Jahaz Mahal reflected in tranquil palace water tanks on the Mandu plateau',
        alt: 'Historic sandstone arches and domed pavilions of Jahaz Mahal reflected in water at Mandu',
      },
      {
        url: MEDIA.manduRoopmati,
        caption: 'Rani Roopmati Pavilion perched above the green Vindhya escarpment in Mandu',
        alt: 'Rani Roopmati Pavilion arches overlooking the Nimar valley at Mandu',
      },
    ],
    highlights: [
      'Explore Jahaz Mahal (Ship Palace) flanked by historic Munj Talao and Kapur Talao lakes',
      'Admire the sloping sandstone arches of Hindola Mahal and Champa Baoli water engineering',
      'Visit Hoshang Shah’s marble tomb and the grand courtyard of Jami Masjid',
      'Take in expansive Nimar valley views from Baz Bahadur Palace and Rani Roopmati Pavilion',
    ],
    itinerary: [
      {
        segment: 'Morning · Segment 01',
        title: 'Drive from Ujjain to the Vindhya Plateau of Mandu',
        summary: 'Ascend through historic stone gateways into the fortified hilltop town.',
        details:
          'Depart Ujjain in the morning and travel toward Dhar and the scenic ascent into Mandu, passing medieval fortifications and ancient baobab trees.',
      },
      {
        segment: 'Midday · Segment 02',
        title: 'Royal Enclave & Central Heritage Group',
        summary: 'Discover Jahaz Mahal, Hindola Mahal, Jami Masjid, and Hoshang Shah’s Tomb.',
        details:
          'Spend unhurried hours wandering the Royal Enclave’s gardens and stone pavilions before pausing for a relaxed regional lunch.',
        walkingNote: 'Open stone courtyards involve comfortable walking; carry sun protection and water.',
      },
      {
        segment: 'Afternoon · Segment 03',
        title: 'Rewa Kund, Baz Bahadur Palace & Rani Roopmati Pavilion',
        summary: 'Close the afternoon gazing across the distant Narmada plains.',
        details:
          'Drive to the southern escarpment for panoramic vistas from Rani Roopmati Pavilion before beginning your relaxed return drive to Ujjain.',
      },
    ],
    placesCovered: [
      {
        name: 'Jahaz Mahal & Royal Enclave',
        slug: 'mandu',
        significance: 'Crown jewel of 15th-century Malwa palace water architecture.',
        highlights: 'Double-storied pavilions mirrored in flanking stone pools.',
        visitNote: 'ASI monument admission is payable directly at official counters.',
        image: MEDIA.manduPalace,
      },
    ],
    inclusions: STANDARD_PENDING_INCLUSIONS,
    exclusions: STANDARD_EXCLUSIONS,
    travelInfo: {
      bestSeason: 'July–September (lush misty monsoon) and October–February (pleasant clear skies).',
      departureGuidance: 'A 7:30 AM departure gives generous time across all three monument clusters.',
      suitableVehicles: ['Sedan (Dzire or equivalent)', 'MPV (Ertiga or equivalent)', 'Innova / Innova Crysta'],
      familySeniorNote: 'Your vehicle waits at each monument zone so seniors avoid long distances between sites.',
      coverageNote: 'Full-day private architectural excursion from Ujjain to Mandu.',
    },
    faqs: [
      {
        question: 'Are ASI monument tickets included in the Mandu package?',
        answer: 'No. Archaeological Survey of India monument entry fees are paid directly by visitors at official ticket counters or via official ASI online portals.',
      },
    ],
    seoTitle: 'Mandu Day Tour from Ujjain — Jahaz Mahal & Heritage Sightseeing',
    seoDescription:
      'Discover Mandu’s medieval sandstone palaces from Ujjain with private transport covering Jahaz Mahal, Hindola Mahal, and Rani Roopmati Pavilion.',
    isFeatured: false,
    displayOrder: 5,
    publishingStatus: 'published',
  },
  {
    slug: 'dewas-darshan',
    name: 'Dewas Darshan',
    subtitle: 'Sacred Hilltop Darshan of Maa Chamunda & Maa Tulja Bhavani',
    summary:
      'A peaceful half-day Shakti pilgrimage from Ujjain to Dewas Tekri, revered for its twin hilltop Devi shrines overlooking the Malwa plains.',
    fullDescription:
      'Rising cleanly above the plains between Ujjain and Indore, Dewas Tekri holds a cherished place in the devotional life of Malwa. Devotees visiting Shri Mahakaleshwar frequently extend their pilgrimage to seek blessings from both Maa Tulja Bhavani (Badi Mata) and Maa Chamunda (Chhoti Mata) enshrined atop the sacred hill.\n\nThis calm half-day private journey offers punctual pickup from your Ujjain hotel, unhurried time for hilltop darshan—whether via the traditional steps, paved hill road, or locally operated ropeway—and a smooth return to Ujjain or onward transfer toward Indore.',
    category: 'ujjain-experiences',
    catalogType: 'reference-catalog',
    destinations: ['Ujjain', 'Dewas'],
    duration: 'Half Day (Approx. 4–5 Hours)',
    startingLocation: 'Ujjain',
    endingLocation: 'Ujjain (or Indore by request)',
    referencePrice: 2000,
    publishedPrice: null,
    priceBasis: 'per-vehicle-reference',
    pricingStatus: 'pending-approval',
    pricingCurrency: 'INR',
    sourceUrl: 'https://ujjaintourtravels.in/',
    lastVerifiedAt: '2026-11-23',
    featuredImage: MEDIA.dewasTekri,
    gallery: [
      {
        url: MEDIA.dewasTekri,
        caption: 'Panoramic Malwa plains vista from the sacred hilltop of Dewas Tekri',
        alt: 'View of Dewas plains from the sacred Mata Tekri hilltop in Madhya Pradesh',
      },
    ],
    highlights: [
      'Unhurried Shakti darshan at both Maa Tulja Bhavani and Maa Chamunda shrines',
      'Flexible morning or late-afternoon departure suited to your Ujjain itinerary',
      'Comfortable private road drive along the smooth Ujjain–Dewas corridor',
    ],
    itinerary: [
      {
        segment: 'Stage 01 · Departure',
        title: 'Smooth Drive from Ujjain to Dewas Tekri',
        summary: 'Short scenic Malwa drive reaching the base of the sacred hill.',
        details: 'Pickup from your hotel in Ujjain and direct drive to Dewas Tekri parking or ropeway base.',
      },
      {
        segment: 'Stage 02 · Hilltop Darshan',
        title: 'Maa Chamunda & Maa Tulja Bhavani Sanctums',
        summary: 'Seek blessings at both hilltop shrines with panoramic plateau views.',
        details:
          'Ascend via steps, local ropeway (subject to local operation), or hill access path for calm darshan and quiet reflection overlooking Dewas before returning to Ujjain.',
      },
    ],
    placesCovered: [
      {
        name: 'Dewas Tekri Devi Temples',
        slug: 'dewas',
        significance: 'Revered twin hilltop Shakti shrines deeply linked with Malwa pilgrimage traditions.',
        highlights: 'Peaceful twin sanctums and sweeping views of the surrounding plains.',
        visitNote: 'Ropeway tickets, if used, are purchased directly at the official counter.',
        image: MEDIA.dewasTekri,
      },
    ],
    inclusions: STANDARD_PENDING_INCLUSIONS,
    exclusions: STANDARD_EXCLUSIONS,
    travelInfo: {
      bestSeason: 'Pleasant year-round; early mornings and weekday afternoons remain especially peaceful.',
      departureGuidance: 'Pairs effortlessly with a half-day arrival or departure schedule in Ujjain.',
      suitableVehicles: ['Sedan (Dzire or equivalent)', 'MPV (Ertiga or equivalent)', 'Innova / Innova Crysta'],
      familySeniorNote: 'Check local ropeway availability for elderly travelers preferring to avoid steps.',
      coverageNote: 'Return spiritual excursion between Ujjain and Dewas Tekri.',
    },
    faqs: [
      {
        question: 'Is Dewas Tekri suitable for elderly visitors?',
        answer: 'Yes, many senior visitors use the local ropeway or paved hill access path depending on local operating conditions on the day of travel.',
      },
    ],
    seoTitle: 'Dewas Darshan from Ujjain — Maa Chamunda & Tulja Bhavani Tekri Tour',
    seoDescription:
      'Plan a comfortable half-day Dewas Tekri Devi Darshan trip from Ujjain with My Ujjain Darshan.',
    isFeatured: false,
    displayOrder: 6,
    publishingStatus: 'published',
  },
  {
    slug: 'bhopal',
    name: 'Bhopal',
    subtitle: 'Historic Lakes, Bhojpur Shiva Temple & Cultural Museums',
    summary:
      'Travel privately from Ujjain to Madhya Pradesh’s graceful lakeside capital—uniting historic Bhojtal vistas, the monumental Bhojeshwar Shiva Temple, and celebrated art museums.',
    fullDescription:
      'Bhopal offers a rewarding counterpoint to Ujjain’s ancient temple lanes: sweeping 11th-century lakes, Begum-era heritage gateways, verdant hills, and two of India’s most thoughtfully curated cultural institutions—the Madhya Pradesh Tribal Museum and Bharat Bhavan.\n\nThis private full-day or customizable journey from Ujjain can be tailored toward spiritual architecture (highlighting the colossal 11th-century Bhojeshwar Shiva Temple at Bhojpur on the city’s outskirts), museum heritage, or relaxed lakeside exploration along Bhojtal.',
    category: 'heritage-escapes',
    catalogType: 'reference-catalog',
    destinations: ['Ujjain', 'Bhopal'],
    duration: '1 Full Day (or Overnight Option)',
    startingLocation: 'Ujjain',
    endingLocation: 'Ujjain or Bhopal',
    referencePrice: 4100,
    publishedPrice: null,
    priceBasis: 'per-vehicle-reference',
    pricingStatus: 'pending-approval',
    pricingCurrency: 'INR',
    sourceUrl: 'https://ujjaintourtravels.in/',
    lastVerifiedAt: '2026-11-23',
    featuredImage: MEDIA.bhopalLake,
    gallery: [
      {
        url: MEDIA.bhopalLake,
        caption: 'Sweeping tranquil waters of Bhojtal (Upper Lake) in Bhopal',
        alt: 'Bhojtal Upper Lake waterfront and skyline in Bhopal, Madhya Pradesh',
      },
      {
        url: MEDIA.bhojpurTemple,
        caption: 'Monumental 11th-century stone architecture of Bhojeshwar Shiva Temple near Bhopal',
        alt: 'Bhojeshwar Shiva Temple historic sandstone facade at Bhojpur near Bhopal',
      },
    ],
    highlights: [
      'Customizable cultural itinerary covering Bhojtal (Upper Lake) and Old Bhopal heritage',
      'Optional spiritual excursion to the monumental 11th-century Bhojeshwar Shiva Temple',
      'Unhurried visits to the Madhya Pradesh Tribal Museum or Bharat Bhavan',
      'Comfortable private highway travel with flexible drop options',
    ],
    itinerary: [
      {
        segment: 'Morning · Segment 01',
        title: 'Highway Drive from Ujjain to Bhopal',
        summary: 'Smooth four-lane journey across central Malwa to the City of Lakes.',
        details: 'Morning pickup from Ujjain with a relaxed roadside breakfast stop en route to Bhopal.',
      },
      {
        segment: 'Midday · Segment 02',
        title: 'Bhojtal Promenade & Cultural Museums',
        summary: 'Explore Bhopal’s lakes and acclaimed indigenous arts museums.',
        details:
          'Visit the Madhya Pradesh Tribal Museum and scenic Upper Lake viewpoints (confirming weekly museum open days in advance), followed by lunch.',
      },
      {
        segment: 'Afternoon · Segment 03',
        title: 'Bhojeshwar Shiva Temple (Optional) & Return',
        summary: 'Marvel at Raja Bhoj’s monumental carved stone sanctum.',
        details:
          'Choose between an afternoon drive to the awe-inspiring Bhojpur Shiva Temple or Old Bhopal heritage landmarks before returning comfortably to Ujjain.',
      },
    ],
    placesCovered: [
      {
        name: 'Bhopal & Bhojpur Heritage',
        slug: 'bhopal',
        significance: 'Historic lakes, royal heritage, and Paramara temple architecture.',
        highlights: 'Bhojtal Upper Lake, Tribal Museum, and Bhojeshwar Shiva Temple.',
        visitNote: 'Check Monday museum closure schedules before confirming your itinerary.',
        image: MEDIA.bhojpurTemple,
      },
    ],
    inclusions: STANDARD_PENDING_INCLUSIONS,
    exclusions: STANDARD_EXCLUSIONS,
    travelInfo: {
      bestSeason: 'October to March offers crisp lakeside mornings and pleasant sightseeing.',
      departureGuidance: 'An early start around 7:00 AM maximizes sightseeing time in Bhopal.',
      suitableVehicles: ['Sedan (Dzire or equivalent)', 'MPV (Ertiga or equivalent)', 'Innova / Innova Crysta'],
      familySeniorNote: 'Flat museum galleries and lakeside drives make Bhopal accessible for multi-generational groups.',
      coverageNote: 'Private full-day excursion or one-way/round-trip custom journey between Ujjain and Bhopal.',
    },
    faqs: [
      {
        question: 'Can we combine Bhopal with Sanchi Stupa?',
        answer: 'Yes. While both can be explored rapidly in a long day, we recommend an overnight stay in Bhopal to enjoy Sanchi, Bhojpur, and the museums at an unhurried pace.',
      },
    ],
    seoTitle: 'Bhopal Tour from Ujjain — Lakes, Bhojpur Temple & Museum Journey',
    seoDescription:
      'Plan a private tour from Ujjain to Bhopal covering Bhojtal Upper Lake, Bhojeshwar Temple, and Madhya Pradesh’s premier cultural museums.',
    isFeatured: false,
    displayOrder: 7,
    publishingStatus: 'published',
  },
  {
    slug: 'sanchi',
    name: 'Sanchi',
    subtitle: 'Emperor Ashoka’s UNESCO World Heritage Sanctuary',
    summary:
      'An inspiring cultural pilgrimage from Ujjain to the hilltop Great Stupa of Sanchi, renowned for its 3rd-century BCE origins, carved Torana gateways, and serene monastic ruins.',
    fullDescription:
      'Rising peacefully above the green plains northeast of Bhopal, Sanchi stands among the world’s finest surviving monuments of early Buddhist art and architecture. Commissioned by Emperor Ashoka in the 3rd century BCE and enriched across subsequent dynasties, the hilltop precinct radiates timeless stillness.\n\nThis full-day private excursion from Ujjain allows travelers to study the four intricately sculpted stone gateways (Toranas), walk the circumambulatory path around the Great Stupa, explore the Ashokan Pillar and Gupta-era shrines, and visit the Archaeological Museum at the foot of the hill before returning in comfort.',
    category: 'heritage-escapes',
    catalogType: 'reference-catalog',
    destinations: ['Ujjain', 'Sanchi'],
    duration: '1 Full Day UNESCO Excursion',
    startingLocation: 'Ujjain',
    endingLocation: 'Ujjain',
    referencePrice: 5000,
    publishedPrice: null,
    priceBasis: 'per-vehicle-reference',
    pricingStatus: 'pending-approval',
    pricingCurrency: 'INR',
    sourceUrl: 'https://ujjaintourtravels.in/',
    lastVerifiedAt: '2026-11-23',
    featuredImage: MEDIA.sanchiStupa,
    gallery: [
      {
        url: MEDIA.sanchiStupa,
        caption: 'Warm afternoon sunlight across the Great Stupa and sculpted Torana gateway at Sanchi',
        alt: 'UNESCO World Heritage Great Stupa and carved stone gateway at Sanchi in Madhya Pradesh',
      },
    ],
    highlights: [
      'Unhurried exploration of the Great Stupa (Stupa No. 1) and its four sculpted Torana gateways',
      'See the Ashokan Pillar, Stupa No. 3, and classical Gupta Temple No. 17',
      'Visit the Sanchi Archaeological Museum housing the historic Ashokan lion capital',
      'Optional stop at nearby Udayagiri Caves upon customized request',
    ],
    itinerary: [
      {
        segment: 'Morning · Segment 01',
        title: 'Early Highway Departure from Ujjain Toward Sanchi',
        summary: 'Comfortable morning road travel across central Madhya Pradesh.',
        details: 'Depart Ujjain early in a private vehicle with planned tea and breakfast halts en route.',
      },
      {
        segment: 'Midday · Segment 02',
        title: 'Sanchi Hilltop UNESCO Monument Precinct',
        summary: 'Walk through over a millennium of Buddhist stone artistry.',
        details:
          'Explore the Great Stupa, carved gateways depicting Jataka narratives, monastic ruins, and surrounding viewpoints at your own contemplative pace.',
        walkingNote: 'Gentle hilltop walkways; carry sun protection and comfortable walking shoes.',
      },
      {
        segment: 'Afternoon · Segment 03',
        title: 'Sanchi Archaeological Museum & Return to Ujjain',
        summary: 'View preserved Mauryan and Shunga sculptures before the return drive.',
        details:
          'Conclude with the museum gallery at the base of the hill (subject to ASI operating days) and relax during the evening highway drive back to Ujjain.',
      },
    ],
    placesCovered: [
      {
        name: 'Great Stupa & Sanchi Hill',
        slug: 'sanchi',
        significance: 'UNESCO World Heritage sanctuary rooted in Emperor Ashoka’s patronage.',
        highlights: 'Carved stone Toranas, circumambulatory terrace, and tranquil vistas.',
        visitNote: 'ASI admission tickets are purchased directly on-site or via official portals.',
        image: MEDIA.sanchiStupa,
      },
    ],
    inclusions: STANDARD_PENDING_INCLUSIONS,
    exclusions: STANDARD_EXCLUSIONS,
    travelInfo: {
      bestSeason: 'October to March provides clear skies and comfortable walking temperatures.',
      departureGuidance: 'Early morning departure around 6:30–7:00 AM is recommended for a same-day return.',
      suitableVehicles: ['Sedan (Dzire or equivalent)', 'MPV (Ertiga or equivalent)', 'Innova / Innova Crysta'],
      familySeniorNote: 'Vehicles ascend close to the upper monument ticket gate, reducing climbing effort.',
      coverageNote: 'Full-day private return heritage tour from Ujjain to Sanchi.',
    },
    faqs: [
      {
        question: 'Is Sanchi doable as a day trip from Ujjain?',
        answer: 'Yes, with an early morning departure. Travelers wanting an unhurried schedule or wishing to include Bhopal and Udayagiri Caves may prefer an overnight plan.',
      },
    ],
    seoTitle: 'Sanchi Stupa Tour from Ujjain — UNESCO Buddhist Heritage Excursion',
    seoDescription:
      'Plan a private heritage journey from Ujjain to Sanchi Stupa covering the Great Stupa, Torana gateways, Ashokan Pillar, and Archaeological Museum.',
    isFeatured: false,
    displayOrder: 8,
    publishingStatus: 'published',
  },
  {
    slug: 'pachmarhi',
    name: 'Pachmarhi',
    subtitle: 'Satpura Forest Valleys, Waterfalls & Sacred Cave Shrines',
    summary:
      'A restorative multi-day highland journey from Ujjain to the Queen of Satpura—blending Jatashankar and Gupt Mahadev shrines with forested gorges, Pandav Caves, and Dhoopgarh sunsets.',
    fullDescription:
      'When travelers seek cool mountain air, lush Sal forests, and serene rock-cut Shiva shrines after visiting the plains of Malwa, Pachmarhi offers an extraordinary sanctuary. Set high within the Satpura Biosphere Reserve, this tranquil plateau combines deep natural beauty with living spiritual heritage.\n\nOur multi-day Pachmarhi travel plan from Ujjain provides dependable outstation private transport tailored to your group size, realistic highway pacing, and practical local coordination advice—including guidance on reserve-zone Gypsy permits required inside protected Satpura viewpoints.',
    category: 'spiritual-circuits',
    catalogType: 'reference-catalog',
    destinations: ['Ujjain', 'Pachmarhi'],
    duration: 'Multi-Day Journey (Suggested 3–4 Days)',
    startingLocation: 'Ujjain',
    endingLocation: 'Ujjain (or Bhopal)',
    referencePrice: 10500,
    publishedPrice: null,
    priceBasis: 'per-vehicle-reference',
    pricingStatus: 'pending-approval',
    pricingCurrency: 'INR',
    sourceUrl: 'https://ujjaintourtravels.in/',
    lastVerifiedAt: '2026-11-23',
    featuredImage: MEDIA.pachmarhiHills,
    gallery: [
      {
        url: MEDIA.pachmarhiHills,
        caption: 'Ancient rock-cut Pandav Caves framed by gardens in Pachmarhi',
        alt: 'Ancient rock-cut Pandav Caves sanctuary in Pachmarhi, Satpura Hills',
      },
      {
        url: MEDIA.pachmarhiValley,
        caption: 'Verdant Satpura ridges and highland gardens overlooking Pachmarhi',
        alt: 'Green Satpura plateau gardens and hills in Pachmarhi, Madhya Pradesh',
      },
    ],
    highlights: [
      'Visit natural rock-cleft Shiva sanctuaries at Jatashankar and Gupt Mahadev',
      'Explore ancient rock-cut Pandav Caves and dramatic Handi Khoh canyon overlooks',
      'Experience Bee Falls and sunset horizons from Dhoopgarh, Satpura’s highest peak',
      'Relaxed multi-day itinerary paced for families and nature lovers',
    ],
    itinerary: [
      {
        segment: 'Day 01 · Ascent',
        title: 'Overland Drive from Ujjain to Pachmarhi Plateau',
        summary: 'Travel across central Madhya Pradesh into the cool Satpura hills.',
        details:
          'Depart Ujjain in the morning, enjoying scenic countryside and a leisurely highway lunch before ascending the winding forest road to Pachmarhi for evening rest.',
      },
      {
        segment: 'Day 02 · Shrines & Viewpoints',
        title: 'Jatashankar, Gupt Mahadev, Pandav Caves & Handi Khoh',
        summary: 'Blend sacred mountain sanctuaries with geological wonders.',
        details:
          'Explore accessible plateau attractions by private vehicle or authorized local forest Gypsy (for protected reserve zones), taking unhurried breaks amid quiet pine and bamboo groves.',
      },
      {
        segment: 'Day 03 · Cascades & Return Planning',
        title: 'Bee Falls, Dhoopgarh & Relaxed Return Journey',
        summary: 'Experience Satpura waterfalls and highland panoramas before heading back.',
        details:
          'Enjoy an optional extra night or begin your scenic descent back toward Ujjain or Bhopal according to your travel dates.',
      },
    ],
    placesCovered: [
      {
        name: 'Pachmarhi Biosphere & Shrines',
        slug: 'pachmarhi',
        significance: 'Madhya Pradesh’s premier forested hill sanctuary and sacred cave landscape.',
        highlights: 'Jatashankar, Pandav Caves, Bee Falls, and Dhoopgarh.',
        visitNote: 'Protected forest zones require locally regulated Gypsy vehicles and forest permits.',
        image: MEDIA.pachmarhiHills,
      },
    ],
    inclusions: STANDARD_PENDING_INCLUSIONS,
    exclusions: [
      ...STANDARD_EXCLUSIONS,
      'Mandatory local Satpura Forest Reserve Gypsy transfers and park entry permits inside restricted viewpoints',
    ],
    travelInfo: {
      bestSeason: 'October to June for clear trails; post-monsoon (September–November) showcases vibrant waterfalls.',
      departureGuidance: 'Plan at least 2 nights in Pachmarhi for comfortable exploration.',
      suitableVehicles: ['MPV (Ertiga or equivalent)', 'Innova / Innova Crysta', 'Tempo Traveller'],
      familySeniorNote: 'We highlight low-step viewpoints such as Pandav Caves and Handi Khoh for elderly guests.',
      coverageNote: 'Outstation multi-day highland tour from Ujjain to Pachmarhi.',
    },
    faqs: [
      {
        question: 'Can our highway vehicle enter all viewpoints inside Pachmarhi?',
        answer: 'Several protected forest viewpoints (such as Bee Falls approach and Dhoopgarh) are regulated by the Forest Department and require authorized local Gypsy vehicles, which are hired directly at official counters.',
      },
    ],
    seoTitle: 'Pachmarhi Tour Package from Ujjain — Satpura Hills & Sacred Shrines',
    seoDescription:
      'Plan a serene multi-day journey from Ujjain to Pachmarhi covering Jatashankar, Pandav Caves, Bee Falls, and Dhoopgarh.',
    isFeatured: false,
    displayOrder: 9,
    publishingStatus: 'published',
  },
  {
    slug: 'amarkantak',
    name: 'Amarkantak',
    subtitle: 'Teerthraj Pilgrimage to the Sacred Source of Maa Narmada',
    summary:
      'An extended spiritual expedition across Madhya Pradesh to Amarkantak in the Maikal Hills—home to Narmada Udgam Kund, ancient Kalachuri temples, and forested waterfalls.',
    fullDescription:
      'Known with deep reverence as Teerthraj—the King of Pilgrimages—Amarkantak rests in the lush Maikal highlands where the Vindhya and Satpura ranges meet. Here rises the sacred Narmada River, honored across central India as a living embodiment of grace, alongside the Son and Johila rivers.\n\nBecause Amarkantak lies across the state from Ujjain, this journey is crafted as a relaxed multi-day pilgrimage with comfortable highway seating, planned overnight halts, and ample time at Narmada Udgam Temple, the 10th-century Kalachuri stone shrines, Kabir Chabutra, and Kapildhara Falls.',
    category: 'spiritual-circuits',
    catalogType: 'reference-catalog',
    destinations: ['Ujjain', 'Amarkantak'],
    duration: 'Multi-Day Pilgrimage (Suggested 4–5 Days)',
    startingLocation: 'Ujjain',
    endingLocation: 'Ujjain (or Jabalpur / Bhopal)',
    referencePrice: 11500,
    publishedPrice: null,
    priceBasis: 'per-vehicle-reference',
    pricingStatus: 'pending-approval',
    pricingCurrency: 'INR',
    sourceUrl: 'https://ujjaintourtravels.in/',
    lastVerifiedAt: '2026-11-23',
    featuredImage: MEDIA.amarkantakTemple,
    gallery: [
      {
        url: MEDIA.amarkantakTemple,
        caption: 'Ancient carved Kalachuri stone temple architecture in Amarkantak',
        alt: 'Ancient Kalachuri stone temple shikhara in Amarkantak, Madhya Pradesh',
      },
      {
        url: MEDIA.amarkantakSarovar,
        caption: 'Sacred Narmada shrine and tranquil stepped water tank in Amarkantak',
        alt: 'Sacred temple and stepped Sarovar water pool in Amarkantak',
      },
    ],
    highlights: [
      'Attend quiet morning or evening prayers at the sacred Narmada Udgam Kund',
      'Walk among 10th–11th century Kalachuri stone temples preserved beside the origin complex',
      'Visit Sonmuda sunrise viewpoint, Mai Ki Bagiya, and Kapildhara & Dudhdhara Waterfalls',
      'Custom multi-day pacing with optional stops at Jabalpur (Bhedaghat) en route',
    ],
    itinerary: [
      {
        segment: 'Day 01–02 · Eastward Pilgrimage',
        title: 'Overland Journey from Ujjain Toward Maikal Hills',
        summary: 'Comfortable paced drive across central Madhya Pradesh with overnight rest.',
        details:
          'Travel comfortably across the state with a recommended mid-route overnight halt (such as Bhopal or Jabalpur) before ascending into the tranquil Sal forests of Amarkantak.',
      },
      {
        segment: 'Day 03 · Sacred Wellspring',
        title: 'Narmada Udgam Temple, Kalachuri Shrines & Kapildhara',
        summary: 'Experience the spiritual heart of Teerthraj.',
        details:
          'Begin at Narmada Udgam Kund and the adjoining Kalachuri temple complex, then visit Sonmuda, Mai Ki Bagiya, and the forest cascades of Kapildhara and Dudhdhara.',
      },
      {
        segment: 'Day 04–05 · Return Journey',
        title: 'Serene Morning Prayers & Return Transit',
        summary: 'Unhurried return to Ujjain or optional drop at Jabalpur Airport/Station.',
        details: 'Conclude with a peaceful morning visit before returning westward according to your custom schedule.',
      },
    ],
    placesCovered: [
      {
        name: 'Narmada Udgam & Kalachuri Temples',
        slug: 'amarkantak',
        significance: 'Sacred source spring of the Narmada River framed by medieval stone artistry.',
        highlights: 'White-walled Narmada Kund, ancient Shiva temples, and tranquil Sal forests.',
        visitNote: 'Pack light woolens for cool highland mornings and evenings.',
        image: MEDIA.amarkantakSarovar,
      },
    ],
    inclusions: STANDARD_PENDING_INCLUSIONS,
    exclusions: STANDARD_EXCLUSIONS,
    travelInfo: {
      bestSeason: 'October to March offers crisp highland air and serene forest views.',
      departureGuidance: 'We strongly recommend planning 4 to 5 days to keep highway drives restful.',
      suitableVehicles: ['MPV (Ertiga or equivalent)', 'Innova / Innova Crysta', 'Tempo Traveller'],
      familySeniorNote: 'An Innova Crysta with planned overnight halts makes this long pilgrimage gentle for elders.',
      coverageNote: 'Extended multi-day pilgrimage from Ujjain to Amarkantak.',
    },
    faqs: [
      {
        question: 'Can we add Jabalpur and Bhedaghat Marble Rocks to our Amarkantak trip?',
        answer: 'Yes. Jabalpur sits naturally along the route and makes an ideal overnight halt with Bhedaghat’s Narmada canyon.',
      },
    ],
    seoTitle: 'Amarkantak Tour from Ujjain — Narmada Udgam Multi-Day Pilgrimage',
    seoDescription:
      'Plan a meaningful multi-day pilgrimage from Ujjain to Amarkantak covering Narmada Udgam Kund, Kalachuri temples, and Kapildhara Falls.',
    isFeatured: false,
    displayOrder: 10,
    publishingStatus: 'published',
  },
  {
    slug: 'omkareshwar-maheshwar-mamleshwar-shani-temple',
    name: 'Omkareshwar + Maheshwar + Mamleshwar + Shani Temple',
    subtitle: 'Complete Narmada Valley Jyotirlinga & Heritage Circuit',
    summary:
      'One of central India’s most cherished devotional circuits—combining Shani Temple, Shri Omkareshwar Jyotirlinga, Shri Mamleshwar, and the sunset river ghats of Maheshwar.',
    fullDescription:
      'For travelers wishing to experience the depth of the Narmada valley in a single cohesive route, this beloved four-landmark circuit brings together ancient Vedic devotion and royal Maratha architectural beauty. Departing from Ujjain, the journey begins with a peaceful morning stop at Shani Temple along the approach corridor before descending to the emerald waters of Omkareshwar.\n\nAfter completing darshan at both Shri Omkareshwar Jyotirlinga on Mandhata Island and Shri Mamleshwar Temple on the southern bank, the road follows the Narmada valley westward to Maheshwar—where Ahilya Fort and its timeless stone ghats welcome you in warm late-afternoon light. Ideal as an ambitious full-day circuit or elevated into a serene two-day itinerary.',
    category: 'jyotirlinga-journeys',
    catalogType: 'reference-catalog',
    destinations: ['Ujjain', 'Omkareshwar', 'Maheshwar'],
    duration: '1 Extended Day (or 2 Days Recommended)',
    startingLocation: 'Ujjain',
    endingLocation: 'Ujjain (or Indore)',
    referencePrice: 5000,
    publishedPrice: null,
    priceBasis: 'per-vehicle-reference',
    pricingStatus: 'pending-approval',
    pricingCurrency: 'INR',
    sourceUrl: 'https://ujjaintourtravels.in/',
    lastVerifiedAt: '2026-11-23',
    featuredImage: MEDIA.omkareshwarRiverView,
    gallery: [
      {
        url: MEDIA.omkareshwarIsland,
        caption: 'Shri Omkareshwar Jyotirlinga rising above Mandhata Island on the Narmada',
        alt: 'Omkareshwar island temples and Narmada river',
      },
      {
        url: MEDIA.mamleshwarTemple,
        caption: 'Shri Mamleshwar Temple on the southern Narmada bank',
        alt: 'Shri Mamleshwar Temple complex in Omkareshwar',
      },
      {
        url: MEDIA.maheshwarGhat,
        caption: 'Late-afternoon serenity beneath Ahilya Fort at Maheshwar Ghat',
        alt: 'Ahilya Fort and stone ghats along the Narmada River in Maheshwar',
      },
    ],
    highlights: [
      'Unites four landmark sacred stops in one thoughtfully sequenced Narmada valley loop',
      'Seek blessings at Navgraha Shani Temple, Shri Omkareshwar Jyotirlinga, and Mamleshwar',
      'Transition from island pilgrimage to the sunset architecture of Ahilya Fort in Maheshwar',
      'Easily upgraded to a restful 2-day itinerary with an overnight stay along the Narmada',
    ],
    itinerary: [
      {
        segment: 'Early Morning · Segment 01',
        title: 'Departure from Ujjain & Shani Temple Darshan',
        summary: 'Begin early along the Triveni / Malwa–Nimar route.',
        details:
          'Depart Ujjain around 6:00 AM with a calm opening stop at the revered Shani Temple before heading south through Indore toward the Vindhya hills.',
      },
      {
        segment: 'Late Morning · Segment 02',
        title: 'Omkareshwar Jyotirlinga & Mamleshwar Temple',
        summary: 'Complete both island and south-bank Jyotirlinga darshans.',
        details:
          'Cross onto Mandhata Island for Shri Omkareshwar Jyotirlinga darshan, then visit the serene Mamleshwar Temple complex and pause for a refreshing lunch.',
      },
      {
        segment: 'Late Afternoon · Segment 03',
        title: 'Maheshwar Ahilya Fort & Narmada Sunset Ghats',
        summary: 'Conclude the circuit in golden light along the riverfront.',
        details:
          'Drive west along the Narmada valley to Maheshwar, exploring Ahilya Fort, Ahilyeshwar Temple, and the sweeping stone ghats before your comfortable return journey to Ujjain.',
      },
    ],
    placesCovered: [
      {
        name: 'Omkareshwar & Mamleshwar',
        slug: 'omkareshwar',
        significance: 'Twin sanctuaries forming the complete Narmada Jyotirlinga pilgrimage.',
        highlights: 'Island temples, suspension bridge, and carved south-bank shrine.',
        visitNote: 'Early arrival keeps temple queue times gentler.',
        image: MEDIA.omkareshwarIsland,
      },
      {
        name: 'Maheshwar Ghats & Ahilya Fort',
        slug: 'maheshwar',
        significance: 'Royal Maratha temple citadel overlooking the Narmada.',
        highlights: 'Sandstone ramparts, sunset ghats, and handloom weaving.',
        visitNote: 'Late afternoon light showcases the fort at its finest.',
        image: MEDIA.maheshwarGhat,
      },
    ],
    inclusions: STANDARD_PENDING_INCLUSIONS,
    exclusions: STANDARD_EXCLUSIONS,
    travelInfo: {
      bestSeason: 'October to March offers comfortable full-day touring across Malwa and Nimar.',
      departureGuidance: 'A 6:00 AM departure is advisable for single-day completion; seniors often prefer a 2-day pace.',
      suitableVehicles: ['Sedan (Dzire or equivalent)', 'MPV (Ertiga or equivalent)', 'Innova / Innova Crysta', 'Tempo Traveller'],
      familySeniorNote: 'We happily split this circuit across two restful days when traveling with elderly family members.',
      coverageNote: 'Full Narmada spiritual and heritage loop from Ujjain.',
    },
    faqs: [
      {
        question: 'Is this four-site circuit tiring in a single day?',
        answer: 'It is a full, rewarding day requiring an early morning start. Families with senior citizens or young children often prefer turning it into a relaxed 2-day journey.',
      },
    ],
    seoTitle: 'Omkareshwar, Maheshwar, Mamleshwar & Shani Temple Tour from Ujjain',
    seoDescription:
      'Experience Omkareshwar Jyotirlinga, Mamleshwar, Maheshwar Ahilya Fort, and Shani Temple in one thoughtfully paced private circuit from Ujjain.',
    isFeatured: true,
    displayOrder: 11,
    publishingStatus: 'published',
  },
  {
    slug: 'indore-airport-ujjain-darshan-transfer',
    name: 'Indore Airport → Ujjain → Ujjain Darshan → Indore Airport',
    subtitle: 'Complete Same-Day Fly-In Spiritual Journey to Mahakaleshwar',
    summary:
      'Designed specifically for travelers flying into Indore—combining punctual airport pickup, full Ujjain Darshan sightseeing, and timely return drop to Indore Airport.',
    fullDescription:
      'Many devotees fly into Indore’s Devi Ahilya Bai Holkar Airport on a tight weekend or single-day schedule wishing to seek blessings at Shri Mahakaleshwar without the stress of coordinating separate cabs and luggage storage. This dedicated all-in-one transfer and darshan circuit takes care of every ground link seamlessly.\n\nYour driver meets you directly at Indore Airport, keeps your luggage securely inside your private vehicle throughout your Ujjain temple visits, paces your Mahakaleshwar, Mahakal Lok, Harsiddhi, Kal Bhairav, and Ram Ghat visits around your evening flight schedule, and delivers you back to the terminal with comfortable check-in buffer.',
    category: 'airport-transport',
    catalogType: 'reference-catalog',
    destinations: ['Indore', 'Ujjain'],
    duration: '1 Full Day (Flight-Synchronized)',
    startingLocation: 'Indore Airport (IDR)',
    endingLocation: 'Indore Airport (IDR)',
    referencePrice: 4100,
    publishedPrice: null,
    priceBasis: 'per-vehicle-reference',
    pricingStatus: 'pending-approval',
    pricingCurrency: 'INR',
    sourceUrl: 'https://ujjaintourtravels.in/',
    lastVerifiedAt: '2026-11-23',
    featuredImage: MEDIA.indoreAirportAircraft,
    gallery: [
      {
        url: MEDIA.indoreAirportTerminal,
        caption: 'Direct pickup from Devi Ahilyabai Holkar Airport terminal in Indore',
        alt: 'Devi Ahilyabai Holkar Airport terminal in Indore',
      },
      {
        url: MEDIA.mahakaleshwarTemple,
        caption: 'Same-day darshan journey to Shri Mahakaleshwar Jyotirlinga in Ujjain',
        alt: 'Shri Mahakaleshwar Temple shikhara in Ujjain',
      },
      {
        url: MEDIA.mahakalCorridor,
        caption: 'Walk through the sculpted precinct of Shri Mahakal Lok before your return flight',
        alt: 'Illuminated Shiva sculpture and colonnade at Shri Mahakal Lok in Ujjain',
      },
    ],
    highlights: [
      'Synchronized strictly to your incoming and departing Indore flight timings',
      'Private vehicle holds your cabin luggage safely while you visit temples',
      'Focused Ujjain Darshan sequence prioritizing Mahakaleshwar, Mahakal Lok, and key shrines',
      'Built-in highway and airport-security buffer so you never feel rushed for boarding',
    ],
    itinerary: [
      {
        segment: 'Arrival · Segment 01',
        title: 'Indore Airport Greeting & Direct Drive to Ujjain',
        summary: 'Zero waiting at the terminal—straight onto the Ujjain highway.',
        details:
          'Meet your driver at Indore Airport arrival lane and proceed directly to Ujjain, with an optional refreshment stop or Chintaman Ganesh visit along the approach.',
      },
      {
        segment: 'Midday · Segment 02',
        title: 'Shri Mahakaleshwar, Mahakal Lok & Essential Temples',
        summary: 'Curated sightseeing adapted to your available hours.',
        details:
          'Complete Shri Mahakaleshwar darshan and walk Mahakal Lok, followed by Harsiddhi Mata, Ram Ghat, Kal Bhairav, and Mangalnath based on your confirmed return flight window.',
      },
      {
        segment: 'Departure · Segment 03',
        title: 'Timely Return Transfer to Indore Airport',
        summary: 'Arrive calmly ahead of boarding.',
        details:
          'Depart Ujjain with conservative buffer time for highway movement and terminal check-in at Devi Ahilya Bai Holkar Airport.',
      },
    ],
    placesCovered: [
      {
        name: 'Ujjain Sacred Circuit (Flight-Paced)',
        slug: 'ujjain',
        significance: 'Streamlined spiritual coverage tailored for same-day air travelers.',
        highlights: 'Mahakaleshwar, Mahakal Lok, Harsiddhi Mata, Kal Bhairav, and Ram Ghat.',
        visitNote: 'Share both arrival and departure flight numbers when requesting your quote.',
        image: MEDIA.indoreAirportTerminal,
      },
    ],
    inclusions: STANDARD_PENDING_INCLUSIONS,
    exclusions: STANDARD_EXCLUSIONS,
    travelInfo: {
      bestSeason: 'Operates year-round; ideal for weekend morning arrivals and late-evening departures.',
      departureGuidance: 'We recommend at least 8–9 hours between landing and return departure for unhurried darshan.',
      suitableVehicles: ['Sedan (Dzire or equivalent)', 'MPV (Ertiga or equivalent)', 'Innova / Innova Crysta'],
      familySeniorNote: 'We customize the number of temple stops so seniors enjoy Mahakaleshwar without rushing.',
      coverageNote: 'Round-trip Indore Airport transfer integrated with private Ujjain Darshan.',
    },
    faqs: [
      {
        question: 'How many hours between flights are ideal for same-day Ujjain Darshan?',
        answer: 'We generally advise a morning landing and late-evening return flight (at least 8–10 hours total) to accommodate highway transit, Mahakaleshwar darshan queues, and relaxed meals.',
      },
    ],
    seoTitle: 'Indore Airport to Ujjain Darshan Same-Day Return Package',
    seoDescription:
      'Fly into Indore Airport for a seamless same-day Ujjain Darshan and return airport transfer with a private vehicle and flight-synced itinerary.',
    isFeatured: true,
    displayOrder: 12,
    publishingStatus: 'published',
  },
  // --- PROPOSED UJJAIN-FIRST CURATED EXPERIENCES (CLEARLY LABELED AS PROPOSED CUSTOM ITINERARIES) ---
  {
    slug: 'mahakaleshwar-spiritual-journey',
    name: 'Mahakaleshwar Spiritual Journey',
    subtitle: 'Proposed Custom Itinerary · Focused Devotional Immersion in Ujjain',
    summary:
      'A proposed Ujjain-first itinerary centered on unhurried devotion around Shri Mahakaleshwar, Mahakal Lok, Harsiddhi Mata, and dawn/dusk contemplation at Ram Ghat.',
    fullDescription:
      'Crafted as a proposed custom experience for travelers whose foremost intention is quiet, unhurried time around Mahakaleshwar rather than rapid sightseeing. This itinerary allows for two tranquil visits to the temple corridor—once in early morning light and again after twilight illumination—paired with nearby Shakti and riverfront shrines within the historic Avanti core.\n\nPlease note: This is a proposed custom itinerary offered strictly on quotation. All official temple darshan schedules, entry permissions, and ritual slots remain exclusively under the administration of the Shri Mahakaleshwar Temple Management Committee.',
    category: 'ujjain-experiences',
    catalogType: 'proposed-experience',
    destinations: ['Ujjain'],
    duration: '1–2 Days (Custom Paced)',
    startingLocation: 'Ujjain or Indore Airport',
    endingLocation: 'Ujjain or Indore Airport',
    referencePrice: null,
    publishedPrice: null,
    priceBasis: 'custom-quote',
    pricingStatus: 'request-only',
    pricingCurrency: 'INR',
    sourceUrl: null,
    lastVerifiedAt: '2026-11-23',
    featuredImage: MEDIA.mahakaleshwarDay,
    gallery: [
      {
        url: MEDIA.mahakaleshwarDay,
        caption: 'Sunlight across the traditional spire of Shri Mahakaleshwar Jyotirlinga Temple',
        alt: 'Shri Mahakaleshwar Jyotirlinga Temple spire in daylight, Ujjain',
      },
      {
        url: MEDIA.mahakalCorridor,
        caption: 'Evening reflection along the illuminated colonnades of Shri Mahakal Lok',
        alt: 'Illuminated sculpture at Shri Mahakal Lok in Ujjain',
      },
      {
        url: MEDIA.harsiddhiEntrance,
        caption: 'Devotional gateway and courtyard of Harsiddhi Mata Temple in Ujjain',
        alt: 'Harsiddhi Mata Temple sanctum entrance in Ujjain',
      },
    ],
    highlights: [
      'Unhurried devotional rhythm with zero rush between shrines',
      'Dedicated morning and evening access windows around Mahakal Lok and Ram Ghat',
      'Optional northern circuit add-on (Kal Bhairav, Mangalnath, Sandipani Ashram)',
      'Honest orientation on official temple procedures without false VIP claims',
    ],
    itinerary: [
      {
        segment: 'Day 01 · Arrival & Evening Sanctuary',
        title: 'Mahakal Lok Twilight Walk, Harsiddhi Mata & Shipra Aarti',
        summary: 'Ease into Ujjain’s spiritual cadence without rushing.',
        details:
          'Arrive and settle comfortably before exploring Harsiddhi Mata Temple, twilight Shipra Aarti at Ram Ghat, and the warmly illuminated colonnades of Mahakal Lok.',
      },
      {
        segment: 'Day 02 · Morning Darshan & Heritage',
        title: 'Shri Mahakaleshwar Darshan & Selected Ancient Shrines',
        summary: 'Centered morning devotion followed by optional quiet shrines.',
        details:
          'Attend your independently booked or general darshan at Shri Mahakaleshwar, then choose calm visits to Chintaman Ganesh, Sandipani Ashram, or Kal Bhairav before departure.',
      },
    ],
    placesCovered: [
      {
        name: 'Mahakaleshwar & Old Avanti Core',
        slug: 'ujjain',
        significance: 'Deep devotional focus on Ujjain’s defining shrines.',
        highlights: 'Mahakaleshwar, Mahakal Lok, Harsiddhi Mata, and Ram Ghat.',
        visitNote: 'Proposed custom itinerary; transport and optional hotel assistance confirmed upon enquiry.',
        image: MEDIA.mahakaleshwarDay,
      },
    ],
    inclusions: STANDARD_PENDING_INCLUSIONS,
    exclusions: STANDARD_EXCLUSIONS,
    travelInfo: {
      bestSeason: 'Year-round; weekdays outside major festival peaks offer the quietest reflection.',
      departureGuidance: 'Ideal as a 1-night / 2-day stay in Ujjain.',
      suitableVehicles: ['Sedan (Dzire or equivalent)', 'MPV (Ertiga or equivalent)', 'Innova / Innova Crysta'],
      familySeniorNote: 'Paced specifically to avoid midday exhaustion.',
      coverageNote: 'Proposed custom Ujjain-first devotional experience.',
    },
    faqs: [
      {
        question: 'Is this a fixed group tour or a private custom itinerary?',
        answer: 'It is a proposed private custom itinerary tailored to your exact travel dates, pace, and vehicle preference.',
      },
    ],
    seoTitle: 'Mahakaleshwar Spiritual Journey — Proposed Custom Ujjain Itinerary',
    seoDescription:
      'Request a custom Mahakaleshwar Spiritual Journey in Ujjain with unhurried pacing around Mahakal Lok, Harsiddhi Mata, and Ram Ghat.',
    isFeatured: false,
    displayOrder: 13,
    publishingStatus: 'published',
  },
  {
    slug: 'ujjain-omkareshwar-jyotirlinga-journey',
    name: 'Ujjain & Omkareshwar Jyotirlinga Journey',
    subtitle: 'Proposed Custom Itinerary · Madhya Pradesh’s Twin Jyotirlingas',
    summary:
      'A proposed 2-to-3 day sacred circuit uniting Madhya Pradesh’s two revered Jyotirlingas—Shri Mahakaleshwar in Ujjain and Shri Omkareshwar on the Narmada—with optional Maheshwar.',
    fullDescription:
      'Madhya Pradesh is blessed with two of India’s twelve Jyotirlingas—Mahakaleshwar along the Shipra and Omkareshwar cradled by the Narmada. This proposed multi-day itinerary brings both sacred cities together at a deeply respectful, family-friendly rhythm.\n\nSpend your first day immersing in Ujjain’s shrines and Ram Ghat, then travel south across the Vindhya hills on Day Two for Omkareshwar and Mamleshwar darshan, with the option to linger along Maheshwar’s sunset ghats before concluding comfortably at Indore Airport or Ujjain.',
    category: 'jyotirlinga-journeys',
    catalogType: 'proposed-experience',
    destinations: ['Ujjain', 'Omkareshwar', 'Maheshwar'],
    duration: '2–3 Days (Custom Paced)',
    startingLocation: 'Indore Airport or Ujjain',
    endingLocation: 'Indore Airport or Ujjain',
    referencePrice: null,
    publishedPrice: null,
    priceBasis: 'custom-quote',
    pricingStatus: 'request-only',
    pricingCurrency: 'INR',
    sourceUrl: null,
    lastVerifiedAt: '2026-11-23',
    featuredImage: MEDIA.omkareshwarIsland,
    gallery: [
      {
        url: MEDIA.mahakaleshwarTemple,
        caption: 'Begin your Twin Jyotirlinga pilgrimage at Shri Mahakaleshwar in Ujjain',
        alt: 'Shri Mahakaleshwar Jyotirlinga Temple in Ujjain',
      },
      {
        url: MEDIA.omkareshwarIsland,
        caption: 'Continue southward to Shri Omkareshwar on the sacred Narmada island',
        alt: 'Shri Omkareshwar Jyotirlinga Temple on Mandhata Island',
      },
      {
        url: MEDIA.maheshwarGhat,
        caption: 'Optional sunset extension to Ahilya Fort and Maheshwar Ghats',
        alt: 'Ahilya Fort and Maheshwar riverfront on the Narmada',
      },
    ],
    highlights: [
      'Unites both Shri Mahakaleshwar and Shri Omkareshwar Jyotirlingas in one cohesive plan',
      'Balanced multi-day pacing ideal for families flying into Indore',
      'Optional golden-hour extension to Maheshwar’s Ahilya Fort and ghats',
      'Dedicated private vehicle throughout the entire journey',
    ],
    itinerary: [
      {
        segment: 'Day 01 · Ujjain',
        title: 'Arrival & Complete Ujjain Sacred Circuit',
        summary: 'Mahakaleshwar, Mahakal Lok, Harsiddhi Mata, and Ram Ghat.',
        details: 'Pickup from Indore Airport or Ujjain station, followed by relaxed Ujjain temple exploration and evening Shipra Aarti.',
      },
      {
        segment: 'Day 02 · Narmada Valley',
        title: 'Omkareshwar Jyotirlinga & Mamleshwar Darshan',
        summary: 'Journey south to Mandhata Island along the Narmada.',
        details: 'Early departure to Omkareshwar for island Jyotirlinga and south-bank Mamleshwar darshan, followed by scenic drive to Maheshwar or return to Indore/Ujjain.',
      },
      {
        segment: 'Day 03 · Optional Extension',
        title: 'Maheshwar Ghats & Departure Transfer',
        summary: 'Unhurried morning along the Narmada before airport or station drop.',
        details: 'Explore Ahilya Fort and handloom workshops if staying overnight before concluding smoothly at Indore Airport or railway station.',
      },
    ],
    placesCovered: [
      {
        name: 'Ujjain & Omkareshwar',
        slug: 'omkareshwar',
        significance: 'Twin Jyotirlinga sanctuaries of Madhya Pradesh.',
        highlights: 'Shipra and Narmada riverfronts, Mahakal Lok, and Mandhata Island.',
        visitNote: 'Proposed custom itinerary; finalize exact nights and pickup details with our team.',
        image: MEDIA.omkareshwarIsland,
      },
    ],
    inclusions: STANDARD_PENDING_INCLUSIONS,
    exclusions: STANDARD_EXCLUSIONS,
    travelInfo: {
      bestSeason: 'October to March is ideal across both Malwa and Nimar.',
      departureGuidance: 'Most flyers choose a Friday–Sunday 3-day schedule via Indore Airport.',
      suitableVehicles: ['Sedan (Dzire or equivalent)', 'MPV (Ertiga or equivalent)', 'Innova / Innova Crysta', 'Tempo Traveller'],
      familySeniorNote: 'Splitting Ujjain and Omkareshwar across separate days keeps travel restorative for elders.',
      coverageNote: 'Proposed custom Twin Jyotirlinga spiritual journey.',
    },
    faqs: [
      {
        question: 'Can we start and end this Twin Jyotirlinga journey at Indore Airport?',
        answer: 'Yes. Indore Airport is the most convenient entry and exit hub for combining Ujjain, Omkareshwar, and Maheshwar.',
      },
    ],
    seoTitle: 'Ujjain & Omkareshwar Jyotirlinga Journey — Proposed Custom Itinerary',
    seoDescription:
      'Plan a serene 2-to-3 day Twin Jyotirlinga pilgrimage uniting Ujjain’s Mahakaleshwar and Omkareshwar on the Narmada.',
    isFeatured: false,
    displayOrder: 14,
    publishingStatus: 'published',
  },
  {
    slug: 'ujjain-senior-citizen-friendly-darshan',
    name: 'Ujjain Senior-Citizen-Friendly Darshan',
    subtitle: 'Proposed Custom Itinerary · Gentle Pacing & Comfort-First Planning',
    summary:
      'A proposed, thoughtfully paced Ujjain pilgrimage designed for elderly parents and multi-generational families—prioritizing minimal walking, shaded midday rest, and high-comfort vehicles.',
    fullDescription:
      'Traveling with elderly parents or grandparents calls for patience, honest route awareness, and gentle pacing. This proposed custom itinerary reimagines Ujjain Darshan around senior comfort: unhurried morning starts, spacious Innova or Ertiga seating, carefully prioritized shrines with minimal stairs, shaded afternoon hotel rest, and clear guidance on local e-rickshaws and corridor battery carts.\n\nWe never make unrealistic promises about bypassing temple rules; instead, we plan realistic timings and restful transitions so elders experience Ujjain with dignity, serenity, and joy.',
    category: 'family-journeys',
    catalogType: 'proposed-experience',
    destinations: ['Ujjain'],
    duration: '1–2 Days (Gentle Pace)',
    startingLocation: 'Ujjain or Indore Airport',
    endingLocation: 'Ujjain or Indore Airport',
    referencePrice: null,
    publishedPrice: null,
    priceBasis: 'custom-quote',
    pricingStatus: 'request-only',
    pricingCurrency: 'INR',
    sourceUrl: null,
    lastVerifiedAt: '2026-11-23',
    featuredImage: MEDIA.sandipaniAshram,
    gallery: [
      {
        url: MEDIA.sandipaniAshram,
        caption: 'Shaded, tranquil courtyard and stepped Gomti Kund at Sandipani Ashram',
        alt: 'Gomti Kund courtyard at Sandipani Ashram in Ujjain',
      },
      {
        url: MEDIA.chintamanGanesh,
        caption: 'Calm open-courtyard access at ancient Chintaman Ganesh Temple',
        alt: 'Chintaman Ganesh Temple facade in Ujjain',
      },
      {
        url: MEDIA.ramGhatSteps,
        caption: 'Gentle afternoon atmosphere along Ram Ghat on the Shipra River',
        alt: 'Stone steps and riverfront at Ram Ghat, Ujjain',
      },
    ],
    highlights: [
      'Split morning and evening schedule with a restful midday hotel break',
      'Priority selection of shrines with direct vehicle access and gentle steps',
      'Practical orientation on official corridor battery carts and senior facilities',
      'Spacious, easy-entry MPV or Innova vehicle recommendations',
    ],
    itinerary: [
      {
        segment: 'Morning · Calm Start',
        title: 'Mahakaleshwar Darshan (Paced) & Hotel Rest',
        summary: 'Early cool-hour visit followed by unhurried midday rest.',
        details:
          'Arrive during cooler morning hours, utilize official pedestrian-zone shuttle options where available, and return to your hotel for lunch and afternoon recovery.',
      },
      {
        segment: 'Late Afternoon · Accessible Shrines',
        title: 'Sandipani Ashram, Chintaman Ganesh & Ram Ghat Vista',
        summary: 'Calm, flat-courtyard shrines and gentle twilight atmosphere.',
        details:
          'Visit serene, less crowded shrines with close vehicle drop points, ending with a peaceful seated twilight view near Ram Ghat or Harsiddhi Mata.',
      },
    ],
    placesCovered: [
      {
        name: 'Accessible Ujjain Temple Selection',
        slug: 'ujjain',
        significance: 'Curated sequence minimizing steep stairs and midday heat exposure.',
        highlights: 'Mahakaleshwar, Sandipani Ashram, Chintaman Ganesh, and Harsiddhi Mata.',
        visitNote: 'Share any voluntary mobility preferences so we can plan appropriate drop points.',
        image: MEDIA.sandipaniAshram,
      },
    ],
    inclusions: STANDARD_PENDING_INCLUSIONS,
    exclusions: STANDARD_EXCLUSIONS,
    travelInfo: {
      bestSeason: 'November to February offers the gentlest daytime temperatures for senior travelers.',
      departureGuidance: 'A 2-day stay is strongly recommended over a rushed single-day visit.',
      suitableVehicles: ['MPV (Ertiga or equivalent)', 'Innova / Innova Crysta'],
      familySeniorNote: 'Midday rest intervals and low-step vehicle entry are built into the itinerary.',
      coverageNote: 'Proposed senior-friendly Ujjain pilgrimage itinerary.',
    },
    faqs: [
      {
        question: 'Can we share wheelchair or walking-aid requirements while enquiring?',
        answer: 'Yes. You may voluntarily share mobility notes in our trip planner so we recommend a vehicle with adequate boot space and advise on accessible drop points.',
      },
    ],
    seoTitle: 'Ujjain Senior-Citizen-Friendly Darshan — Gentle Custom Pilgrimage Plan',
    seoDescription:
      'Plan a comfortable, unhurried Ujjain Darshan for elderly parents with gentle pacing, midday rest, and spacious private vehicles.',
    isFeatured: false,
    displayOrder: 15,
    publishingStatus: 'published',
  },
  {
    slug: 'ujjain-family-pilgrimage-experience',
    name: 'Ujjain Family Pilgrimage Experience',
    subtitle: 'Proposed Custom Itinerary · Multi-Generational Heritage & Devotion',
    summary:
      'A proposed family-oriented Ujjain journey blending sacred temple darshan with engaging storytelling stops like Sandipani Ashram, Mahakal Lok murals, and serene evening ghats.',
    fullDescription:
      'A great family pilgrimage speaks to every generation—honoring the devotion of elders while sparking curiosity in younger travelers. This proposed itinerary weaves together Mahakaleshwar and Harsiddhi Mata with Ujjain’s rich mythological and historical stories: Krishna’s gurukul days at Sandipani Ashram, the sculptural gallery of Mahakal Lok, and the ancient astronomical legacy near Mangalnath and Vedh Shala.\n\nDesigned with comfortable meal pauses, spacious MPV or Tempo Traveller options, and flexible timing, it transforms a traditional temple trip into a warm, shared family memory.',
    category: 'family-journeys',
    catalogType: 'proposed-experience',
    destinations: ['Ujjain'],
    duration: '2 Days (Custom Family Pace)',
    startingLocation: 'Ujjain or Indore',
    endingLocation: 'Ujjain or Indore',
    referencePrice: null,
    publishedPrice: null,
    priceBasis: 'custom-quote',
    pricingStatus: 'request-only',
    pricingCurrency: 'INR',
    sourceUrl: null,
    lastVerifiedAt: '2026-11-23',
    featuredImage: MEDIA.mahakalCorridor,
    gallery: [
      {
        url: MEDIA.mahakalCorridor,
        caption: 'Illuminated mythological sculptures along Shri Mahakal Lok in Ujjain',
        alt: 'Shri Mahakal Lok sculpture and walkway in Ujjain',
      },
      {
        url: MEDIA.iskconUjjain,
        caption: 'Serene marble courtyard of ISKCON Temple Ujjain ideal for families',
        alt: 'ISKCON Temple marble domes in Ujjain',
      },
      {
        url: MEDIA.vedhShalaUjjain,
        caption: 'Historic 18th-century astronomical instruments at Jantar Mantar Vedh Shala, Ujjain',
        alt: 'Vedh Shala astronomical observatory in Ujjain',
      },
    ],
    highlights: [
      'Engaging mix of sacred temples, Krishna’s Sandipani Ashram, and ancient Ujjain astronomy',
      'Spacious group seating in Ertiga, Innova Crysta, or Tempo Traveller',
      'Built-in family dining recommendations and unhurried photo stops',
      'Optional day extension to Dewas Tekri or Indore heritage',
    ],
    itinerary: [
      {
        segment: 'Day 01 · Devotion & Corridor',
        title: 'Shri Mahakaleshwar, Mahakal Lok & Ram Ghat Aarti',
        summary: 'Shared family discovery of Ujjain’s grand spiritual center.',
        details: 'Explore Mahakaleshwar and walk unhurriedly through the storytelling sculptures of Mahakal Lok before gathering at Ram Ghat at dusk.',
      },
      {
        segment: 'Day 02 · Stories of Ancient Avanti',
        title: 'Sandipani Ashram, Mangalnath, Kal Bhairav & Chintaman Ganesh',
        summary: 'Mythology, astronomy, and peaceful heritage courtyards.',
        details: 'Visit Krishna’s ancient gurukul at Sandipani Ashram, the northern Shipra shrines, and historic Vedh Shala observatory before departing.',
      },
    ],
    placesCovered: [
      {
        name: 'Ujjain Family Heritage Trail',
        slug: 'ujjain',
        significance: 'Balances deep devotion with cultural storytelling for all ages.',
        highlights: 'Mahakal Lok, Sandipani Ashram, Ram Ghat, and Chintaman Ganesh.',
        visitNote: 'Fully customizable around school holidays and family arrival times.',
        image: MEDIA.iskconUjjain,
      },
    ],
    inclusions: STANDARD_PENDING_INCLUSIONS,
    exclusions: STANDARD_EXCLUSIONS,
    travelInfo: {
      bestSeason: 'October to March and winter school holiday windows.',
      departureGuidance: 'Book vehicle preferences early during school vacations and long weekends.',
      suitableVehicles: ['MPV (Ertiga or equivalent)', 'Innova / Innova Crysta', 'Tempo Traveller'],
      familySeniorNote: 'Flexible meal and rest intervals keep both children and elders comfortable.',
      coverageNote: 'Proposed custom family pilgrimage across Ujjain.',
    },
    faqs: [
      {
        question: 'Can larger extended families travel together in one vehicle?',
        answer: 'Yes. Share your total passenger count in our trip planner so our team can confirm Tempo Traveller or multi-vehicle options.',
      },
    ],
    seoTitle: 'Ujjain Family Pilgrimage Experience — Proposed Custom Family Tour',
    seoDescription:
      'Plan a warm, multi-generational Ujjain family pilgrimage combining Mahakaleshwar, Mahakal Lok, Sandipani Ashram, and Ram Ghat.',
    isFeatured: false,
    displayOrder: 16,
    publishingStatus: 'published',
  },
  {
    slug: 'personalized-multi-day-spiritual-journey',
    name: 'Personalized Multi-Day Spiritual Journey',
    subtitle: 'Proposed Custom Itinerary · Bespoke Madhya Pradesh Grand Circuit',
    summary:
      'Build your own multi-day spiritual and architectural journey across Ujjain, Omkareshwar, Maheshwar, Mandu, Sanchi, or Pachmarhi with dedicated private transport.',
    fullDescription:
      'Some journeys deserve more than a fixed template. Whether you envision a five-day Malwa-Nimar pilgrimage uniting Ujjain, Omkareshwar, Maheshwar, and Mandu, or a week-long exploration reaching Sanchi Stupa, Bhopal, and the Satpura hills of Pachmarhi, our team crafts a tailored route around your dates, arrival airport, and preferred pace.\n\nUse our interactive Trip Planner to pick your exact destinations, travel dates, and vehicle preferences, and receive a transparent, custom-built itinerary and quotation directly from our Ujjain team.',
    category: 'spiritual-circuits',
    catalogType: 'proposed-experience',
    destinations: ['Ujjain', 'Omkareshwar', 'Maheshwar', 'Mandu', 'Sanchi', 'Pachmarhi'],
    duration: '3 to 7+ Days (Bespoke)',
    startingLocation: 'Indore Airport / Ujjain / Bhopal',
    endingLocation: 'Indore Airport / Ujjain / Bhopal',
    referencePrice: null,
    publishedPrice: null,
    priceBasis: 'custom-quote',
    pricingStatus: 'request-only',
    pricingCurrency: 'INR',
    sourceUrl: null,
    lastVerifiedAt: '2026-11-23',
    featuredImage: MEDIA.manduRoopmati,
    gallery: [
      {
        url: MEDIA.mahakaleshwarTemple,
        caption: 'Begin at Shri Mahakaleshwar Jyotirlinga in Ujjain',
        alt: 'Shri Mahakaleshwar Jyotirlinga Temple in Ujjain',
      },
      {
        url: MEDIA.omkareshwarIsland,
        caption: 'Continue southward to Omkareshwar on the Narmada',
        alt: 'Omkareshwar Temple on Mandhata Island',
      },
      {
        url: MEDIA.maheshwarGhat,
        caption: 'Linger along the Narmada at Maheshwar’s Ahilya Fort',
        alt: 'Ahilya Fort and Maheshwar ghats',
      },
      {
        url: MEDIA.manduRoopmati,
        caption: 'Explore medieval sandstone pavilions in Mandu',
        alt: 'Rani Roopmati Pavilion overlooking the Vindhya valley in Mandu',
      },
      {
        url: MEDIA.sanchiStupa,
        caption: 'Extend eastward to the UNESCO World Heritage Great Stupa at Sanchi',
        alt: 'Great Stupa and sculpted Torana gateway at Sanchi',
      },
    ],
    highlights: [
      'Complete freedom to combine Jyotirlingas, UNESCO heritage, and Satpura hill retreats',
      'Single dedicated private vehicle and driver across your entire route',
      'Honest pacing advice preventing overpacked highway days',
      'Optional hotel guidance and local sightseeing coordination upon request',
    ],
    itinerary: [
      {
        segment: 'Days 01–02 · Ujjain',
        title: 'Sacred Foundations in Ancient Avanti',
        summary: 'Mahakaleshwar, Mahakal Lok, northern shrines, and Ram Ghat.',
        details: 'Begin your circuit in Ujjain with comfortable pacing across the central and northern temple loops.',
      },
      {
        segment: 'Days 03–04 · Narmada & Malwa Heritage',
        title: 'Omkareshwar, Maheshwar & Mandu',
        summary: 'Jyotirlinga devotion paired with Holkar ghats and medieval palaces.',
        details: 'Travel south to Omkareshwar and Maheshwar before ascending to the historic plateau of Mandu.',
      },
      {
        segment: 'Day 05+ · Optional Central Highlands',
        title: 'Sanchi Stupa, Bhopal or Pachmarhi Extension',
        summary: 'Extend eastward to UNESCO monuments or misty Satpura hills.',
        details: 'Customize final days based on your departure flight or train from Indore or Bhopal.',
      },
    ],
    placesCovered: [
      {
        name: 'Custom Madhya Pradesh Circuit',
        slug: 'ujjain',
        significance: 'Your personal sequence of sacred rivers, Jyotirlingas, and UNESCO monuments.',
        highlights: 'Ujjain, Omkareshwar, Maheshwar, Mandu, Sanchi, and Pachmarhi.',
        visitNote: 'Proposed bespoke journey crafted on request.',
        image: MEDIA.manduRoopmati,
      },
    ],
    inclusions: STANDARD_PENDING_INCLUSIONS,
    exclusions: STANDARD_EXCLUSIONS,
    travelInfo: {
      bestSeason: 'October to March offers the finest weather across the full state circuit.',
      departureGuidance: 'Share your preferred cities and dates 2–4 weeks ahead during peak winter season.',
      suitableVehicles: ['Sedan (Dzire or equivalent)', 'MPV (Ertiga or equivalent)', 'Innova / Innova Crysta', 'Tempo Traveller'],
      familySeniorNote: 'Every multi-day plan balances scenic drives with restful evenings.',
      coverageNote: 'Bespoke multi-day circuit across Madhya Pradesh.',
    },
    faqs: [
      {
        question: 'How do I receive a custom multi-day quotation?',
        answer: 'Use our Plan Your Journey tool to select your destinations, travel dates, group size, and vehicle preference. Our team responds via WhatsApp or phone with a tailored itinerary and written quote.',
      },
    ],
    seoTitle: 'Personalized Multi-Day Madhya Pradesh Spiritual Journey | My Ujjain Darshan',
    seoDescription:
      'Design a bespoke multi-day spiritual and heritage circuit across Ujjain, Omkareshwar, Maheshwar, Mandu, Sanchi, and Pachmarhi.',
    isFeatured: false,
    displayOrder: 17,
    publishingStatus: 'published',
  },
];
