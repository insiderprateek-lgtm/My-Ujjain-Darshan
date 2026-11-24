import { MEDIA } from './brand.ts';
import type { ArticleSection } from '../db/schema.ts';

export interface SeedVehicle {
  slug: string;
  category: string;
  modelName: string;
  capacityLabel: string;
  luggageLabel: string;
  recommendedUse: string;
  acStatus: string;
  availabilityStatus: 'confirmed' | 'reference-unconfirmed';
  description: string;
  image: string;
  sourceNote: string;
  displayOrder: number;
}

export const SEED_VEHICLES: SeedVehicle[] = [
  {
    slug: 'sedan-swift-dzire',
    category: 'Compact Hatchback & Sedan Class',
    modelName: 'Maruti Suzuki Swift',
    capacityLabel: 'Up to 4 Passengers (Subject to Confirmation)',
    luggageLabel: '2 Medium Suitcases + Cabin Bags (Swift Dzire sedan option also available on request)',
    recommendedUse: 'Couples, solo pilgrims, Indore Airport transfers, and one-day Ujjain Darshan',
    acStatus: 'Air-Conditioned (Confirmed on Booking)',
    availabilityStatus: 'reference-unconfirmed',
    description:
      'Nimble across Ujjain’s approach roads and smooth along the Indore–Ujjain highway, the Maruti Suzuki Swift (with compact sedan Dzire variants available upon request) is a refined, practical choice for smaller pilgrimage parties.',
    image: MEDIA.vehicleSwift,
    sourceNote: 'Representative Maruti Suzuki Swift photograph shown; specific vehicle model and availability confirmed per booking.',
    displayOrder: 1,
  },
  {
    slug: 'mpv-maruti-ertiga',
    category: 'Family MPV',
    modelName: 'Maruti Suzuki Ertiga',
    capacityLabel: 'Up to 6 Passengers (Subject to Confirmation)',
    luggageLabel: '3–4 Medium Suitcases (With Last Row Adjust)',
    recommendedUse: 'Families traveling with parents and children across Ujjain, Omkareshwar, and Maheshwar',
    acStatus: 'Dual-Zone Air-Conditioned (Confirmed on Booking)',
    availabilityStatus: 'reference-unconfirmed',
    description:
      'Elevated three-row seating and generous headroom make the Maruti Suzuki Ertiga a dependable family companion for multi-generational journeys visiting Mahakaleshwar and descending into the Narmada valley.',
    image: MEDIA.vehicleErtiga,
    sourceNote: 'Representative Maruti Suzuki Ertiga photograph shown; specific vehicle model and availability confirmed per booking.',
    displayOrder: 2,
  },
  {
    slug: 'premium-innova-crysta',
    category: 'Executive Touring MPV',
    modelName: 'Toyota Innova Crysta',
    capacityLabel: 'Up to 6–7 Passengers (Subject to Confirmation)',
    luggageLabel: '4 Large Suitcases + Carry-Ons',
    recommendedUse: 'Senior-citizen comfort, multi-day Madhya Pradesh circuits, Pachmarhi & Amarkantak journeys',
    acStatus: 'Full Cabin Climate Control (Confirmed on Booking)',
    availabilityStatus: 'reference-unconfirmed',
    description:
      'Renowned across India for highway composure, spacious captain/bench comfort, and cushioned suspension, the Toyota Innova Crysta is our preferred recommendation for elders and long-distance heritage circuits.',
    image: MEDIA.vehicleInnovaCrysta,
    sourceNote: 'Representative Toyota Innova Crysta photograph shown; specific vehicle model and availability confirmed per booking.',
    displayOrder: 3,
  },
  {
    slug: 'group-tempo-traveller',
    category: 'Group Pilgrimage Minibus',
    modelName: 'Force Tempo Traveller',
    capacityLabel: '12 to 26 Seater Variants (Confirmed on Request)',
    luggageLabel: 'Dedicated Rear & Roof Carrier Group Luggage Space',
    recommendedUse: 'Extended family pilgrimages, spiritual groups, and multi-day Jyotirlinga yatras',
    acStatus: 'Air-Conditioned Variants Available on Request',
    availabilityStatus: 'reference-unconfirmed',
    description:
      'Keep extended families and spiritual groups together in one calm cabin with wide sightseeing windows, push-back seating, and organized group logistics across Ujjain, Omkareshwar, and Madhya Pradesh.',
    image: MEDIA.vehicleTempoTraveller,
    sourceNote: 'Representative Force Tempo Traveller photograph shown (larger tourist coaches, Tavera, or Toofan also confirmed upon enquiry).',
    displayOrder: 4,
  },
];

export interface SeedArticle {
  slug: string;
  title: string;
  category: string;
  readTime: string;
  excerpt: string;
  content: ArticleSection[];
  authorName: string;
  coverImage: string;
  tags: string[];
  relatedPackageSlugs: string[];
  seoTitle: string;
  seoDescription: string;
  publishedDate: string;
  publishingStatus: 'published' | 'draft';
}

export const SEED_ARTICLES: SeedArticle[] = [
  {
    slug: 'complete-guide-to-ujjain-darshan',
    title: 'A Complete Guide to Ujjain Darshan: Pacing, Geography, and Living Heritage',
    category: 'Pilgrimage Planning',
    readTime: '6 min read',
    excerpt:
      'How to organize a meaningful, unhurried journey through ancient Avanti—understanding Ujjain’s three sacred zones, darshan preparation, and thoughtful travel pacing.',
    authorName: 'My Ujjain Darshan Editorial Desk',
    coverImage: MEDIA.heroRamGhat,
    tags: ['Ujjain Darshan', 'Mahakaleshwar', 'Travel Planning'],
    relatedPackageSlugs: ['ujjain-darshan', 'mahakaleshwar-spiritual-journey'],
    seoTitle: 'A Complete Guide to Ujjain Darshan | My Ujjain Darshan Journal',
    seoDescription:
      'Plan a calm, well-paced Ujjain Darshan with our guide to Ujjain’s three temple zones, Mahakal Lok, Ram Ghat, and practical travel etiquette.',
    publishedDate: '2026-10-14',
    publishingStatus: 'published',
    content: [
      {
        heading: 'Seeing Ujjain as a Living Sacred Landscape',
        paragraphs: [
          'For more than two millennia, Ujjain—ancient Ujjayini of the Avanti kingdom—has welcomed pilgrims, scholars, astronomers, and poets to the eastern curve of the Shipra River. Approaching the city as a rapid checklist of shrines often leaves visitors exhausted. Approaching it by its natural sacred geography transforms the day into something quietly restorative.',
          'Nearly all of Ujjain’s defining landmarks fall into three intuitive clusters: the Central Rudra Sagar & Shipra Core (Mahakaleshwar, Mahakal Lok, Harsiddhi Mata, Ram Ghat, and Gopal Mandir), the Northern Shipra Bend (Kal Bhairav, Gadkalika, Mangalnath, and Sandipani Ashram), and the Southwestern Approach (Chintaman Ganesh).',
        ],
      },
      {
        heading: 'Preparing Honestly for Shri Mahakaleshwar Darshan',
        paragraphs: [
          'Shri Mahakaleshwar is India’s only south-facing (Dakshinamurti) Jyotirlinga, and temple footfall fluctuates substantially across weekdays, Mondays, Shravan month, and major festivals. Official darshan entry rules, queue alignments, dress expectations, and Bhasma Aarti permissions are administered solely by the Shri Mahakaleshwar Temple Management Committee.',
          'Always verify current guidelines directly on the official temple portal before finalizing your itinerary. Keep personal belongings light—mobile phones and large bags must be deposited at official cloak counters—and wear breathable traditional attire with easily removable footwear.',
        ],
      },
      {
        heading: 'Allowing Space for Twilight Along the Shipra',
        paragraphs: [
          'Reserve your final afternoon hours for Harsiddhi Mata Temple and the broad stone steps of Ram Ghat. As dusk settles over the Shipra and brass oil lamps flicker along ancient pavilions, the unhurried soul of Ujjain reveals itself most clearly.',
        ],
      },
    ],
  },
  {
    slug: 'important-temples-to-visit-in-ujjain',
    title: 'Ten Sacred Landmarks That Define the Spiritual Map of Ujjain',
    category: 'Sacred Heritage',
    readTime: '7 min read',
    excerpt:
      'Beyond Mahakaleshwar lies a layered mandala of Shakti Peethas, guardian Bhairava shrines, astronomical hillocks, and Krishna’s ancient gurukul.',
    authorName: 'My Ujjain Darshan Editorial Desk',
    coverImage: MEDIA.harsiddhiTemple,
    tags: ['Temples of Ujjain', 'Shakti Peeth', 'Heritage'],
    relatedPackageSlugs: ['ujjain-darshan', 'ujjain-family-pilgrimage-experience'],
    seoTitle: 'Important Temples to Visit in Ujjain | Sacred Landmarks Guide',
    seoDescription:
      'Explore Ujjain’s essential temples: Mahakaleshwar, Harsiddhi Mata, Kal Bhairav, Mangalnath, Sandipani Ashram, Chintaman Ganesh, Gopal Mandir, and Gadkalika.',
    publishedDate: '2026-10-22',
    publishingStatus: 'published',
    content: [
      {
        heading: 'The Shaiva and Shakta Heart of Avanti',
        paragraphs: [
          'While Shri Mahakaleshwar Jyotirlinga anchors every pilgrimage to Ujjain, classical texts describe the city as a complete spiritual mandala where Shiva, Shakti, Bhairava, Ganesha, and Vishnu traditions converse harmoniously.',
          'Steps away from Mahakal’s precinct rises Harsiddhi Mata Temple, revered as a Shakti Peeth and framed by two soaring Maratha-era lamp pillars. To the north stands Kal Bhairav—Ujjain’s Kshetrapala (guardian deity)—and nearby Gadkalika Mata, cherished in literary memory as the patron goddess of poet Kalidasa.',
        ],
      },
      {
        heading: 'Astronomy, Learning, and Quiet Courtyards',
        paragraphs: [
          'Continue along the northern curve of the Shipra to Mangalnath Temple, revered in the Matsya Purana as the birthplace of Mars and historically intertwined with Ujjain’s role as India’s ancient prime meridian. Just minutes away lies Sandipani Ashram, remembered in Bhagavata tradition as the peaceful hermitage where Krishna, Balarama, and Sudama studied under Guru Sandipani.',
          'Rounding out the journey are Dwarkadhish Gopal Mandir’s silver-sheathed doors in the historic bazaar and the finely carved Paramara stonework of Swayambhu Chintaman Ganesh Temple on the southwestern approach.',
        ],
      },
    ],
  },
  {
    slug: 'ujjain-and-omkareshwar-jyotirlinga-journey',
    title: 'Ujjain and Omkareshwar: Planning Madhya Pradesh’s Twin Jyotirlinga Journey',
    category: 'Jyotirlinga Routes',
    readTime: '6 min read',
    excerpt:
      'How to link Shri Mahakaleshwar on the Shipra with Shri Omkareshwar on the Narmada—choosing the right duration, flight hub, and optional Maheshwar stop.',
    authorName: 'My Ujjain Darshan Editorial Desk',
    coverImage: MEDIA.omkareshwarIsland,
    tags: ['Omkareshwar', 'Jyotirlinga', 'Narmada'],
    relatedPackageSlugs: [
      'omkareshwar',
      'omkareshwar-maheshwar-mamleshwar-shani-temple',
      'ujjain-omkareshwar-jyotirlinga-journey',
    ],
    seoTitle: 'Planning a Ujjain and Omkareshwar Jyotirlinga Journey',
    seoDescription:
      'Practical pacing, route tips, and twin-bank darshan advice for combining Ujjain Mahakaleshwar and Omkareshwar Jyotirlinga.',
    publishedDate: '2026-11-01',
    publishingStatus: 'published',
    content: [
      {
        heading: 'Two Sacred Rivers, One Cohesive Pilgrimage',
        paragraphs: [
          'Connecting Ujjain and Omkareshwar lets devotees experience two of India’s twelve Jyotirlingas across dramatically contrasting landscapes: the historic plains of Malwa and the wooded river valley of the Narmada.',
          'Most air travelers fly into Devi Ahilya Bai Holkar Airport in Indore, which sits conveniently between Ujjain to the north and Omkareshwar to the south. Allowing two to three full days ensures neither sacred city feels rushed.',
        ],
      },
      {
        heading: 'Remembering Both Banks at Omkareshwar',
        paragraphs: [
          'Traditional pilgrimage practice honors both Shri Omkareshwar on Mandhata Island and Shri Mamleshwar on the mainland south bank. Arriving early in the morning softens sun exposure along the bridges and leaves unhurried afternoon light to add the riverside fort and ghats of Maheshwar.',
        ],
      },
    ],
  },
  {
    slug: 'exploring-mahakal-lok',
    title: 'Walking Through Shri Mahakal Lok: Architecture, Light, and Visitor Tips',
    category: 'Ujjain Heritage',
    readTime: '5 min read',
    excerpt:
      'What to look for along the sculpted sandstone colonnades overlooking Rudra Sagar, the finest hours to visit, and comfort tips for families and elders.',
    authorName: 'My Ujjain Darshan Editorial Desk',
    coverImage: MEDIA.mahakalCorridor,
    tags: ['Mahakal Lok', 'Architecture', 'Ujjain'],
    relatedPackageSlugs: ['ujjain-darshan', 'indore-airport-ujjain-darshan-transfer'],
    seoTitle: 'Exploring Shri Mahakal Lok in Ujjain — Visitor Guide & Tips',
    seoDescription:
      'Discover the sandstone gateways, murals, evening lighting, and senior-friendly walking tips for visiting Shri Mahakal Lok in Ujjain.',
    publishedDate: '2026-11-05',
    publishingStatus: 'published',
    content: [
      {
        heading: 'An Open-Air Narrative Prelude to Mahakaleshwar',
        paragraphs: [
          'Stretching beside the restored waters of Rudra Sagar, Shri Mahakal Lok welcomes visitors through grand carved gateways into long colonnades of sculpted sandstone pillars and mythological murals drawn from the Shiva Purana.',
          'Unlike narrow bazaar approaches of decades past, the corridor encourages families to pause, read inscriptions, and absorb the iconography at an unhurried rhythm.',
        ],
      },
      {
        heading: 'Choosing Dawn or Twilight for the Finest Experience',
        paragraphs: [
          'Morning light reveals the crisp craftsmanship of the carved stone pillars in cooler air, while twilight transforms the entire precinct under warm architectural illumination. Senior visitors who prefer shorter walks should enquire at official corridor desks regarding electric shuttle carts.',
        ],
      },
    ],
  },
  {
    slug: 'planning-a-family-pilgrimage-to-ujjain',
    title: 'How to Plan a Restorative Family & Senior-Friendly Pilgrimage to Ujjain',
    category: 'Family Travel',
    readTime: '5 min read',
    excerpt:
      'Thoughtful ways to structure arrival times, vehicle choice, midday rest intervals, and walking transitions when traveling with elderly parents and children.',
    authorName: 'My Ujjain Darshan Editorial Desk',
    coverImage: MEDIA.sandipaniAshram,
    tags: ['Senior Travel', 'Family Pilgrimage', 'Ujjain Tips'],
    relatedPackageSlugs: ['ujjain-senior-citizen-friendly-darshan', 'ujjain-family-pilgrimage-experience'],
    seoTitle: 'Family & Senior-Friendly Pilgrimage Guide to Ujjain',
    seoDescription:
      'Practical tips for visiting Ujjain with elderly parents and children: pacing, spacious vehicles, midday breaks, and calm shrines.',
    publishedDate: '2026-11-11',
    publishingStatus: 'published',
    content: [
      {
        heading: 'Designing Around Energy, Not Just Distance',
        paragraphs: [
          'On paper, Ujjain’s shrines appear close together, yet walking barefoot across warm stone courtyards and navigating devotional queues can tire elderly family members quickly. Splitting sightseeing into a calm morning window and a late-afternoon riverfront window—with a proper midday hotel break—makes an enormous difference.',
          'Selecting a spacious MPV or Innova Crysta with gentle step-in height and air conditioning ensures transfers between temples act as refreshing pauses rather than cramped rides.',
        ],
      },
      {
        heading: 'Honest Expectations Create Peace of Mind',
        paragraphs: [
          'Confirm all official darshan guidelines directly with temple authorities ahead of time, carry refillable water bottles and simple slip-on footwear, and share any mobility considerations voluntarily when requesting your custom travel itinerary.',
        ],
      },
    ],
  },
  {
    slug: 'spiritual-destinations-beyond-ujjain',
    title: 'Beyond Ujjain: Sacred Rivers, Stone Stupas, and Highlands of Madhya Pradesh',
    category: 'Madhya Pradesh',
    readTime: '6 min read',
    excerpt:
      'How to extend your Ujjain pilgrimage to Maheshwar’s Narmada ghats, Mandu’s medieval palaces, Sanchi’s UNESCO Stupa, and the forested hills of Pachmarhi and Amarkantak.',
    authorName: 'My Ujjain Darshan Editorial Desk',
    coverImage: MEDIA.manduPalace,
    tags: ['Maheshwar', 'Mandu', 'Sanchi', 'Pachmarhi'],
    relatedPackageSlugs: ['maheshwar', 'mandu', 'sanchi', 'pachmarhi', 'amarkantak'],
    seoTitle: 'Spiritual & Heritage Destinations Beyond Ujjain in Madhya Pradesh',
    seoDescription:
      'Extend your Ujjain visit to Maheshwar, Mandu, Dewas, Bhopal, Sanchi Stupa, Pachmarhi, and Amarkantak with curated private journeys.',
    publishedDate: '2026-11-16',
    publishingStatus: 'published',
    content: [
      {
        heading: 'From Malwa Temples to Narmada Riverfronts',
        paragraphs: [
          'Ujjain sits at the geographic heart of a remarkably diverse heritage region. Within a day’s private drive lie Dewas Tekri’s hilltop Devi shrines, Maharani Ahilyabai’s riverfront citadel at Maheshwar, and the poetic sandstone palaces of Mandu perched above the Vindhya cliffs.',
        ],
      },
      {
        heading: 'UNESCO Sanctuaries and Sacred Highlands',
        paragraphs: [
          'Travelers with three to six days can widen the circle eastward to Emperor Ashoka’s Great Stupa at Sanchi, Bhopal’s historic lakes and Bhojpur Shiva Temple, the misty Satpura cave shrines of Pachmarhi, or the revered Narmada origin spring at Amarkantak.',
        ],
      },
    ],
  },
];

export interface SeedFaq {
  category: string;
  question: string;
  answer: string;
  displayOrder: number;
}

export const SEED_FAQS: SeedFaq[] = [
  {
    category: 'Ujjain Planning',
    question: 'How much time is generally needed for Ujjain sightseeing?',
    answer:
      'A well-paced Ujjain Darshan covering Shri Mahakaleshwar, Mahakal Lok, Harsiddhi Mata, Ram Ghat, Kal Bhairav, Mangalnath, Sandipani Ashram, and Chintaman Ganesh typically takes one full day (8 to 10 hours). Travelers wishing to experience both dawn and twilight rituals comfortably—or traveling with elderly family members—often prefer 1.5 to 2 days.',
    displayOrder: 1,
  },
  {
    category: 'Customization',
    question: 'Can I customize my Ujjain Darshan package or combine Omkareshwar?',
    answer:
      'Yes. Every journey is arranged privately around your schedule. You may choose specific temples, adjust start times, add Dewas Tekri, or extend smoothly to Omkareshwar, Mamleshwar, Maheshwar, and Mandu.',
    displayOrder: 2,
  },
  {
    category: 'Transport & Airport',
    question: 'Is pickup and drop from Indore Airport available?',
    answer:
      'Yes. We arrange private door-to-door pickups and drops between Devi Ahilya Bai Holkar Airport (Indore) and Ujjain, as well as flight-synchronized same-day Ujjain Darshan return transfers.',
    displayOrder: 3,
  },
  {
    category: 'Temple Administration',
    question: 'Are Mahakaleshwar Bhasma Aarti bookings or temple entry tickets included?',
    answer:
      'No. Bhasma Aarti permissions, special darshan passes, ritual offerings, and temple entry schedules are administered exclusively by the Shri Mahakaleshwar Temple Management Committee via its official portal. My Ujjain Darshan provides private travel, itinerary planning, and local logistical guidance around your confirmed plans—never unauthorized or guaranteed VIP entry.',
    displayOrder: 4,
  },
  {
    category: 'Pricing & Quotations',
    question: 'How do I receive an accurate quotation for my journey?',
    answer:
      'Because vehicle category, travel dates, pickup hub, and customization vary by family, pricing is shared transparently on request until published rates are officially approved. Submit your preferences via our Plan Your Journey form or WhatsApp (+91 95222 33375) to receive a clear written quotation.',
    displayOrder: 5,
  },
  {
    category: 'Family & Seniors',
    question: 'Is the journey comfortable for elderly family members?',
    answer:
      'Yes. We recommend spacious MPVs or Innova vehicles, split morning/evening sightseeing with a shaded midday break, and sequence drop points as close as local traffic regulations permit.',
    displayOrder: 6,
  },
  {
    category: 'Inclusions',
    question: 'Are hotel bookings and meals included automatically?',
    answer:
      'No. Our core service centers on curated itineraries and private ground transportation. If you would like hotel guidance or assistance alongside your travel plan, simply check "Optional hotel assistance" in the trip planner and our team will advise clearly during quotation.',
    displayOrder: 7,
  },
  {
    category: 'Booking Lead Time',
    question: 'How far in advance should I enquire?',
    answer:
      'For regular weekdays, enquiring 5 to 7 days in advance is generally comfortable. For Mondays, Shravan month, Mahashivratri, long weekends, or winter peak season (November–February), we advise reaching out 2 to 4 weeks ahead.',
    displayOrder: 8,
  },
];
