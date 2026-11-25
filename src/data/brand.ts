import { IMAGE_ASSETS } from './imageRegistry.ts';

export const BRAND = {
  name: 'My Ujjain Darshan',
  tagline: 'Beyond Darshan. A Journey Within.',
  devanagariGreeting: 'महाकाल की नगरी में आपका स्वागत है',
  location: 'Ujjain, Madhya Pradesh, India',
  phoneDisplay: '+91 90093 36669 / +91 90093 46669',
  phoneHref: 'tel:+919009336669',
  whatsappNumber: '919009336669',
  contactPhones: [
    { display: '+91 90093 36669', href: 'tel:+919009336669', whatsappNumber: '919009336669' },
    { display: '+91 90093 46669', href: 'tel:+919009346669', whatsappNumber: '919009346669' },
  ],
  logoWordmark: '/assets/aistudio/F4EF5D88-E12D-4CE6-B306-162D7CF8255E_3b22a7af.PNG',
  logoEmblem: '/assets/aistudio/D55FF91E-6864-4966-9A29-0800E0A51B39_b2dc8462.PNG',
  officialTemplePortal: 'https://shrimahakaleshwar.com/',
} as const;

/**
 * Centralized verified photography references mapped directly from imageRegistry.ts.
 * Every entry points to a real, visually audited, locally served WebP asset.
 */
export const MEDIA = {
  // Ujjain & Temples
  mahakaleshwarHero: IMAGE_ASSETS.mahakaleshwarHero.src,
  mahakaleshwarTemple: IMAGE_ASSETS.mahakaleshwarTemple.src,
  mahakaleshwarDay: IMAGE_ASSETS.mahakaleshwarDay.src,
  mahakalCorridor: IMAGE_ASSETS.mahakalLok.src,
  mahakalLokSculpture: IMAGE_ASSETS.mahakalLokSculpture.src,
  heroRamGhat: IMAGE_ASSETS.ramGhatHero.src,
  ramGhatRiverfront: IMAGE_ASSETS.ramGhatRiverfront.src,
  ramGhatSteps: IMAGE_ASSETS.ramGhatSteps.src,
  harsiddhiTemple: IMAGE_ASSETS.harsiddhiTemple.src,
  harsiddhiEntrance: IMAGE_ASSETS.harsiddhiEntrance.src,
  kalBhairavTemple: IMAGE_ASSETS.kalBhairavTemple.src,
  mangalnathTemple: IMAGE_ASSETS.mangalnathTemple.src,
  sandipaniAshram: IMAGE_ASSETS.sandipaniAshram.src,
  chintamanGanesh: IMAGE_ASSETS.chintamanGanesh.src,
  gopalMandir: IMAGE_ASSETS.gopalMandir.src,
  gadkalikaTemple: IMAGE_ASSETS.gadkalikaTemple.src,
  iskconUjjain: IMAGE_ASSETS.iskconUjjain.src,
  vedhShalaUjjain: IMAGE_ASSETS.vedhShalaUjjain.src,
  // Legacy alias kept strictly pointing to real Mahakaleshwar Temple
  ujjainTemple: IMAGE_ASSETS.mahakaleshwarTemple.src,

  // Madhya Pradesh Destinations
  omkareshwarIsland: IMAGE_ASSETS.omkareshwarTemple.src,
  omkareshwarRiverView: IMAGE_ASSETS.omkareshwarRiverView.src,
  mamleshwarTemple: IMAGE_ASSETS.mamleshwarTemple.src,
  maheshwarGhat: IMAGE_ASSETS.maheshwarFort.src,
  maheshwarRiverfront: IMAGE_ASSETS.maheshwarRiverfront.src,
  manduPalace: IMAGE_ASSETS.manduJahazMahal.src,
  manduRoopmati: IMAGE_ASSETS.manduRoopmati.src,
  dewasTekri: IMAGE_ASSETS.dewasTekri.src,
  bhopalLake: IMAGE_ASSETS.bhopalLake.src,
  bhojpurTemple: IMAGE_ASSETS.bhojpurTemple.src,
  sanchiStupa: IMAGE_ASSETS.sanchiStupa.src,
  pachmarhiHills: IMAGE_ASSETS.pachmarhiCaves.src,
  pachmarhiValley: IMAGE_ASSETS.pachmarhiHills.src,
  amarkantakTemple: IMAGE_ASSETS.amarkantakTemple.src,
  amarkantakSarovar: IMAGE_ASSETS.amarkantakSarovar.src,

  // Airport Transfers (Devi Ahilyabai Holkar Airport, Indore)
  indoreAirportTerminal: IMAGE_ASSETS.indoreAirportTerminal.src,
  indoreAirportAircraft: IMAGE_ASSETS.indoreAirportAircraft.src,

  // Vehicles (Exact Models)
  vehicleSwift: IMAGE_ASSETS.vehicleSwift.src,
  vehicleDzire: IMAGE_ASSETS.vehicleDzire.src,
  vehicleErtiga: IMAGE_ASSETS.vehicleErtiga.src,
  vehicleInnovaCrysta: IMAGE_ASSETS.vehicleInnovaCrysta.src,
  vehicleTempoTraveller: IMAGE_ASSETS.vehicleTempoTraveller.src,
} as const;

export function buildWhatsAppUrl(message?: string): string {
  const defaultMessage =
    'Namaste! I would like to know more about My Ujjain Darshan travel packages. Please help me plan my journey.';
  const text = encodeURIComponent(message || defaultMessage);
  return `https://wa.me/${BRAND.whatsappNumber}?text=${text}`;
}

export function buildPackageWhatsAppMessage(params: {
  packageName: string;
  dates?: string;
  travelers?: string;
  pickup?: string;
  vehicle?: string;
  notes?: string;
}): string {
  const lines = [
    `Namaste My Ujjain Darshan Team,`,
    `I would like a personalized quotation for: ${params.packageName}`,
  ];
  if (params.dates) lines.push(`Preferred Dates: ${params.dates}`);
  if (params.travelers) lines.push(`Travelers: ${params.travelers}`);
  if (params.pickup) lines.push(`Pickup Location: ${params.pickup}`);
  if (params.vehicle) lines.push(`Vehicle Preference: ${params.vehicle}`);
  if (params.notes) lines.push(`Notes: ${params.notes}`);
  lines.push('Please share itinerary details and available options.');
  return lines.join('\n');
}

export interface SacredLandmark {
  id: string;
  order: number;
  name: string;
  devanagari: string;
  zone: string;
  shortTitle: string;
  summary: string;
  heritageNote: string;
  visitorGuidance: string;
  coordinates: { lat: number; lng: number };
  mapPosition: { x: number; y: number };
  image: string;
  photoCredit: string;
  photoSourceUrl: string;
  destinationSlug: string;
}

const commonsImage = (filename: string) =>
  `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(filename)}?width=1600`;

export const UJJAIN_LANDMARKS: SacredLandmark[] = [
  {
    id: 'mahakaleshwar',
    order: 1,
    name: 'Shri Mahakaleshwar Jyotirlinga',
    devanagari: 'श्री महाकालेश्वर ज्योतिर्लिंग',
    zone: 'Old City Sacred Core',
    shortTitle: 'The Dakshinamurti Jyotirlinga',
    summary:
      'One of the twelve revered Jyotirlingas of India, uniquely enshrined facing south (Dakshinamurti). The three-tiered temple complex stands beside Rudra Sagar and anchors the devotional life of Avanti.',
    heritageNote:
      'Mentioned in ancient Puranas and celebrated by the Sanskrit poet Kalidasa in Meghaduta, the present Maratha-era structure was rebuilt in the 18th century under Ranoji Shinde.',
    visitorGuidance:
      'Darshan queues, dress etiquette, and special ritual permissions (including Bhasma Aarti) are managed exclusively by the Shri Mahakaleshwar Temple Management Committee via its official portal.',
    coordinates: { lat: 23.1828, lng: 75.7682 },
    mapPosition: { x: 46, y: 54 },
    image: commonsImage('Mahakaleshwar Temple, Ujjain.jpg'),
    photoCredit: 'Ashverse · CC BY-SA 4.0',
    photoSourceUrl: 'https://commons.wikimedia.org/wiki/File:Mahakaleshwar_Temple,_Ujjain.jpg',
    destinationSlug: 'ujjain',
  },
  {
    id: 'mahakal-lok',
    order: 2,
    name: 'Shri Mahakal Lok Corridor',
    devanagari: 'श्री महाकाल लोक',
    zone: 'Rudra Sagar Waterfront',
    shortTitle: 'Sandstone Colonnades & Sacred Narrative',
    summary:
      'An expansive open-air sandstone precinct stretching along Rudra Sagar, featuring carved Nandi Dwar gateways, monumental colonnades, sculptural murals depicting narratives from the Shiva Purana, and serene evening illumination.',
    heritageNote:
      'Designed as an unhurried pedestrian prelude to Mahakaleshwar, allowing families and pilgrims to walk through classical iconography before entering the temple precinct.',
    visitorGuidance:
      'Best experienced during early morning light or after dusk when the sandstone pillars and Shiva sculptures are warmly illuminated; electric shuttle carts are often available inside the corridor for senior visitors.',
    coordinates: { lat: 23.1811, lng: 75.7661 },
    mapPosition: { x: 42, y: 60 },
    image: commonsImage('CORRIDOR OF UJJAIN.jpg'),
    photoCredit: 'Imakanksha · CC BY-SA 4.0',
    photoSourceUrl: 'https://commons.wikimedia.org/wiki/File:CORRIDOR_OF_UJJAIN.jpg',
    destinationSlug: 'ujjain',
  },
  {
    id: 'harsiddhi',
    order: 3,
    name: 'Harsiddhi Mata Temple',
    devanagari: 'हरसिद्धि माता मंदिर',
    zone: 'Near Rudra Sagar',
    shortTitle: 'Shakti Peeth & Twin Deep Stambhas',
    summary:
      'Revered in Hindu tradition as one of the sacred Shakti Peethas and closely associated with King Vikramaditya, Harsiddhi Mata Temple is instantly recognized by its vermilion Nagara spire and two towering Maratha-era lamp pillars.',
    heritageNote:
      'Inside the sanctum rests the vermilion idol of Annapurna flanked by Mahalakshmi and Mahasaraswati, accompanied by the sacred Shri Yantra.',
    visitorGuidance:
      'Located a short walk from Mahakaleshwar and Ram Ghat. Evening lighting of the deep stambhas on auspicious occasions creates a memorable devotional atmosphere.',
    coordinates: { lat: 23.1856, lng: 75.7652 },
    mapPosition: { x: 39, y: 47 },
    image: commonsImage('Harsiddhi Temple, Ujjain 01.jpg'),
    photoCredit: 'Wikimedia Commons · CC BY-SA',
    photoSourceUrl: 'https://commons.wikimedia.org/wiki/Category:Harsiddhi_Mata_Temple',
    destinationSlug: 'ujjain',
  },
  {
    id: 'ram-ghat',
    order: 4,
    name: 'Ram Ghat on the Shipra',
    devanagari: 'राम घाट, शिप्रा तट',
    zone: 'East Bank of Shipra',
    shortTitle: 'Timeless Riverfront & Evening Aarti',
    summary:
      'The oldest and most venerated bathing ghat along the sacred Shipra River, lined with centuries-old shrines and stone steps where devotees gather at dawn and twilight for prayers and river aarti.',
    heritageNote:
      'Ram Ghat serves as a central gathering ground during Simhastha Kumbh Mela, held in Ujjain once every twelve years when Jupiter enters Leo.',
    visitorGuidance:
      'Plan a calm twilight visit after Harsiddhi Mata darshan. Wear easily removable footwear and exercise care on damp stone steps along the river edge.',
    coordinates: { lat: 23.1869, lng: 75.7629 },
    mapPosition: { x: 30, y: 46 },
    image: commonsImage('Ram Ghat, Ujjain 01.jpg'),
    photoCredit: 'Wikimedia Commons · CC BY-SA',
    photoSourceUrl: 'https://commons.wikimedia.org/wiki/Category:Ram_Ghat,_Ujjain',
    destinationSlug: 'ujjain',
  },
  {
    id: 'kal-bhairav',
    order: 5,
    name: 'Kal Bhairav Temple',
    devanagari: 'काल भैरव मंदिर',
    zone: 'Northern Bank of Shipra',
    shortTitle: 'Guardian Deity of Ancient Ujjain',
    summary:
      'Dedicated to Kal Bhairav, regarded in Shaiva tradition as the fierce guardian (Kshetrapala) of the sacred city, standing on a quiet stretch overlooking the Shipra River.',
    heritageNote:
      'Built upon the site of an older Paramara-period temple, the shrine once held exquisite Malwa wall paintings and remains deeply tied to the Tantric and Kapalika history of Avanti.',
    visitorGuidance:
      'Best grouped with Mangalnath Temple, Gadkalika Temple, and Sandipani Ashram on the northern sightseeing loop to minimize city traffic crossings.',
    coordinates: { lat: 23.2192, lng: 75.7746 },
    mapPosition: { x: 56, y: 20 },
    image: commonsImage('Kal Bhairav temple Ujjain.jpg'),
    photoCredit: 'Utkarsh Atmaram · CC BY-SA 4.0',
    photoSourceUrl: 'https://commons.wikimedia.org/wiki/File:Kal_Bhairav_temple_Ujjain.jpg',
    destinationSlug: 'ujjain',
  },
  {
    id: 'mangalnath',
    order: 6,
    name: 'Mangalnath Temple',
    devanagari: 'मंगलनाथ मंदिर',
    zone: 'Northern Shipra Bend',
    shortTitle: 'Sacred Astronomy & Birthplace of Mars',
    summary:
      'Perched above a tranquil curve of the Shipra River, Mangalnath Temple is revered in the Matsya Purana as the traditional birthplace of Mangal (Mars) and marks a historic astronomical meridian.',
    heritageNote:
      'Ancient Indian astronomers referenced Ujjain as the prime meridian (Madhyarekha) for timekeeping, and the temple courtyard still evokes that quiet connection between sky and river.',
    visitorGuidance:
      'Tuesdays see higher devotional footfall. Morning visits offer clearer river views and cooler stone courtyards.',
    coordinates: { lat: 23.2248, lng: 75.7764 },
    mapPosition: { x: 63, y: 14 },
    image: commonsImage('Mangalnath Ujjain.JPG'),
    photoCredit: 'V. Narsikar · CC BY-SA 3.0',
    photoSourceUrl: 'https://commons.wikimedia.org/wiki/File:Mangalnath_Ujjain.JPG',
    destinationSlug: 'ujjain',
  },
  {
    id: 'sandipani-ashram',
    order: 7,
    name: 'Sandipani Ashram',
    devanagari: 'सांदीपनि आश्रम',
    zone: 'Ankpat Road',
    shortTitle: 'Ancient Gurukul of Krishna & Sudama',
    summary:
      'Revered in Bhagavata tradition as the hermitage where Lord Krishna, Balarama, and Sudama received their formal education under Maharishi Sandipani.',
    heritageNote:
      'Within the peaceful courtyard sits the Gomti Kund stepped water tank and a historic stone tablet inscribed with numerals 1 to 100, traditionally linked to Guru Sandipani.',
    visitorGuidance:
      'A calm, shade-filled stop ideal for families traveling with children and elderly pilgrims seeking unhurried reflection between major temples.',
    coordinates: { lat: 23.214, lng: 75.7809 },
    mapPosition: { x: 70, y: 28 },
    image: commonsImage('Sandipani ashram of ujjain.jpg'),
    photoCredit: 'Snay015 · CC BY-SA 4.0',
    photoSourceUrl: 'https://commons.wikimedia.org/wiki/File:Sandipani_ashram_of_ujjain.jpg',
    destinationSlug: 'ujjain',
  },
  {
    id: 'chintaman-ganesh',
    order: 8,
    name: 'Chintaman Ganesh Temple',
    devanagari: 'चिंतामन गणेश मंदिर',
    zone: 'Fatehabad Road (South-West)',
    shortTitle: 'Swayambhu Shrine Beyond the Old City',
    summary:
      'One of the oldest Ganesh temples in the Malwa region, housing a self-manifested (Swayambhu) idol flanked by Riddhi and Siddhi within finely carved Paramara-style stone pillars.',
    heritageNote:
      'Historically visited by travelers and residents alike to seek clarity before new beginnings; the assembly hall displays intricate medieval stonework.',
    visitorGuidance:
      'Located outside the dense central bazaar along the southwestern approach, making it a natural opening or closing stop for journeys connecting with Indore Airport.',
    coordinates: { lat: 23.1494, lng: 75.7294 },
    mapPosition: { x: 20, y: 80 },
    image: commonsImage('Chintaman Ganesh.jpg'),
    photoCredit: 'Ankursoni003 · CC BY-SA 4.0',
    photoSourceUrl: 'https://commons.wikimedia.org/wiki/File:Chintaman_Ganesh.jpg',
    destinationSlug: 'ujjain',
  },
  {
    id: 'gopal-mandir',
    order: 9,
    name: 'Dwarkadhish Gopal Mandir',
    devanagari: 'द्वारकाधीश गोपाल मंदिर',
    zone: 'Central Heritage Market',
    shortTitle: '19th-Century Maratha Architecture',
    summary:
      'Built in the 19th century by Bayajibai Shinde, Gopal Mandir is a striking marble-spired Krishna temple famed for its silver-plated sanctum doors and serene courtyard amid the lively old bazaar.',
    heritageNote:
      'Represents Ujjain’s Vaishnava heritage alongside its dominant Shaiva traditions, illustrating the city’s layered spiritual tapestry.',
    visitorGuidance:
      'Best reached by walking or e-rickshaw from the Mahakal area due to narrow heritage market lanes.',
    coordinates: { lat: 23.1843, lng: 75.7712 },
    mapPosition: { x: 55, y: 52 },
    image: commonsImage('Shikhara of Shri Dwarkadhish Gopal Mandir.jpg'),
    photoCredit: 'Kirti benal · CC BY-SA 4.0',
    photoSourceUrl: 'https://commons.wikimedia.org/wiki/File:Shikhara_of_Shri_Dwarkadhish_Gopal_Mandir.jpg',
    destinationSlug: 'ujjain',
  },
  {
    id: 'gadkalika',
    order: 10,
    name: 'Gadkalika Mata Temple',
    devanagari: 'गढ़कालिका माता मंदिर',
    zone: 'Old Ujjain Mound (Garh)',
    shortTitle: 'Shrine Revered by Poet Kalidasa',
    summary:
      'Situated near the archaeological mound of ancient Avanti, Gadkalika Mata Temple is traditionally regarded as the patron deity of the great Sanskrit poet and dramatist Kalidasa.',
    heritageNote:
      'Renovated across centuries from the time of Emperor Harshavardhana to the Gwalior Scindias, the shrine connects Ujjain’s literary legacy with living Shakti worship.',
    visitorGuidance:
      'Conveniently paired with Kal Bhairav and Bhartrihari Caves on the northern heritage circuit.',
    coordinates: { lat: 23.2116, lng: 75.7688 },
    mapPosition: { x: 48, y: 29 },
    image: commonsImage('GARH KALIKA OVERVIEW.jpg'),
    photoCredit: 'Sunil Ujjain · CC BY-SA 4.0',
    photoSourceUrl: 'https://commons.wikimedia.org/wiki/File:GARH_KALIKA_OVERVIEW.jpg',
    destinationSlug: 'ujjain',
  },
];

export const PACKAGE_CATEGORIES = [
  { id: 'all', label: 'All Packages' },
  { id: 'ujjain-experiences', label: 'Ujjain Experiences' },
  { id: 'jyotirlinga-journeys', label: 'Jyotirlinga Journeys' },
  { id: 'spiritual-circuits', label: 'Spiritual Circuits' },
  { id: 'heritage-escapes', label: 'Heritage Escapes' },
  { id: 'family-journeys', label: 'Family Journeys' },
  { id: 'airport-transport', label: 'Airport & Transport' },
] as const;
