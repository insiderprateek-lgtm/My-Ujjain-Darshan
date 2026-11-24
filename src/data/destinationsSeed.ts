import { MEDIA } from './brand.ts';
import type { DestinationAttraction, PackageGalleryItem } from '../db/schema.ts';

export interface SeedDestination {
  slug: string;
  name: string;
  devanagariName: string;
  region: string;
  tagline: string;
  summary: string;
  culturalSignificance: string;
  historicalContext: string;
  attractions: DestinationAttraction[];
  featuredImage: string;
  gallery: PackageGalleryItem[];
  transportInfo: string;
  travelTips: string[];
  coordinates: { lat: number; lng: number };
  relatedPackageSlugs: string[];
  seoTitle: string;
  seoDescription: string;
  displayOrder: number;
}

export const SEED_DESTINATIONS: SeedDestination[] = [
  {
    slug: 'ujjain',
    name: 'Ujjain',
    devanagariName: 'उज्जैन',
    region: 'Malwa Plateau, Madhya Pradesh',
    tagline: 'Ancient Avanti on the banks of the sacred Shipra',
    summary:
      'One of India’s seven sacred Moksha-giving cities (Sapta Puri), Ujjain is home to Shri Mahakaleshwar Jyotirlinga, the grand Mahakal Lok corridor, historic Shakti shrines, and the quiet stone steps of Ram Ghat.',
    culturalSignificance:
      'For millennia, Ujjain has stood at the crossroads of devotion, classical Sanskrit literature, and Indian astronomy. Every twelve years, the city hosts Simhastha Kumbh Mela along the Shipra. Daily life revolves around temple bells, morning rituals at Ram Ghat, and the enduring Shaiva, Shakta, and Vaishnava traditions woven through the old city lanes.',
    historicalContext:
      'Known in antiquity as Ujjayini and capital of the Avanti kingdom, the city flourished under Emperor Ashoka (who served here as viceroy), the legendary King Vikramaditya, the Gupta Empire, and the Paramara rulers. Classical astronomers treated Ujjain as India’s prime meridian (Madhyarekha), a legacy still visible at the 18th-century Vedh Shala observatory built by Sawai Jai Singh II.',
    attractions: [
      {
        name: 'Shri Mahakaleshwar Jyotirlinga',
        summary: 'South-facing Jyotirlinga enshrined in a historic three-level temple complex beside Rudra Sagar.',
        visitNote: 'Official darshan slots and Bhasma Aarti permissions are administered directly by the temple trust.',
      },
      {
        name: 'Shri Mahakal Lok',
        summary: 'Monumental sandstone colonnades, carved gateways, and Shiva Purana murals overlooking Rudra Sagar.',
        visitNote: 'Allow unhurried walking time during morning hours or illuminated evening hours.',
      },
      {
        name: 'Harsiddhi Mata Temple',
        summary: 'Revered Shakti Peeth known for its towering twin Maratha lamp pillars and serene inner courtyard.',
        visitNote: 'Easy walking distance from Mahakaleshwar and Ram Ghat.',
      },
      {
        name: 'Ram Ghat & Shipra Riverfront',
        summary: 'Historic stepped ghats hosting quiet dawn prayers and luminous evening Shipra Aarti.',
        visitNote: 'Ideal as a restorative late-afternoon or twilight stop.',
      },
      {
        name: 'Kal Bhairav & Mangalnath Temples',
        summary: 'Northern riverside shrines honoring Ujjain’s guardian deity and the ancient astronomical meridian.',
        visitNote: 'Best visited together in a single morning or late-afternoon northern loop.',
      },
      {
        name: 'Sandipani Ashram & Chintaman Ganesh',
        summary: 'Peaceful hermitage linked to Krishna’s gurukul years and a Swayambhu Ganesh shrine with Paramara stonework.',
        visitNote: 'Calm, family-friendly stops with minimal stair climbing.',
      },
    ],
    featuredImage: MEDIA.mahakaleshwarTemple,
    gallery: [
      {
        url: MEDIA.mahakaleshwarTemple,
        caption: 'Illuminated shikhara of Shri Mahakaleshwar Jyotirlinga Temple in Ujjain at twilight',
        alt: 'Shri Mahakaleshwar Jyotirlinga Temple in Ujjain illuminated at twilight',
      },
      {
        url: MEDIA.mahakalCorridor,
        caption: 'Illuminated meditative Shiva sculpture and water pavilion inside Shri Mahakal Lok',
        alt: 'Shri Mahakal Lok illuminated Shiva sculpture and fountain in Ujjain',
      },
      {
        url: MEDIA.harsiddhiTemple,
        caption: 'Historic vermilion Nagara spire of Harsiddhi Mata Temple near Rudra Sagar',
        alt: 'Harsiddhi Mata Temple exterior shikhara in Ujjain',
      },
      {
        url: MEDIA.ramGhatRiverfront,
        caption: 'Sacred Ram Ghat and temple skyline along the Shipra River in Ujjain',
        alt: 'Ram Ghat stone steps and temple skyline along the Shipra River in Ujjain',
      },
      {
        url: MEDIA.kalBhairavTemple,
        caption: 'Kal Bhairav Temple on the northern bank of the Shipra River',
        alt: 'Kal Bhairav Temple exterior and steps in Ujjain',
      },
      {
        url: MEDIA.iskconUjjain,
        caption: 'White marble portico of ISKCON Temple (Sri Sri Radha Madan Mohan Mandir), Ujjain',
        alt: 'ISKCON Temple marble facade in Ujjain',
      },
    ],
    transportInfo:
      'Ujjain is well connected by rail via Ujjain Junction and by road from Indore’s Devi Ahilya Bai Holkar Airport. Within the old city, private vehicles drop travelers near designated temple zones, from where short walks or local e-rickshaws connect smoothly to inner shrines.',
    travelTips: [
      'Plan temple visits in geographical clusters (Central Core, Northern Loop, Southwestern Approach) to save travel time.',
      'Check the official Shri Mahakaleshwar Temple portal well in advance for current darshan guidelines and ritual rules.',
      'Carry modest, comfortable cotton clothing and easy-to-remove footwear for temple courtyards.',
      'October through March offers the most pleasant daytime walking weather; early morning starts are advisable in summer.',
    ],
    coordinates: { lat: 23.1765, lng: 75.7885 },
    relatedPackageSlugs: [
      'ujjain-darshan',
      'indore-airport-ujjain-darshan-transfer',
      'mahakaleshwar-spiritual-journey',
      'ujjain-omkareshwar-jyotirlinga-journey',
    ],
    seoTitle: 'Ujjain Travel Guide — Temples, Mahakaleshwar, Ram Ghat & Spiritual Heritage',
    seoDescription:
      'Explore Ujjain with My Ujjain Darshan: Shri Mahakaleshwar Jyotirlinga, Mahakal Lok, Harsiddhi Mata, Ram Ghat, Kal Bhairav, and thoughtful local travel advice.',
    displayOrder: 1,
  },
  {
    slug: 'omkareshwar',
    name: 'Omkareshwar',
    devanagariName: 'ओंकारेश्वर',
    region: 'Nimar Region, Narmada Valley',
    tagline: 'Sacred Mandhata island shaped by the confluence of the Narmada',
    summary:
      'Nestled where the Narmada River parts around the forested island of Mandhata, Omkareshwar houses one of India’s twelve Jyotirlingas alongside the ancient Mamleshwar shrine on the southern bank.',
    culturalSignificance:
      'Pilgrims traditionally visit both Omkareshwar (on Mandhata Island) and Mamleshwar (on the mainland south bank) to complete the Jyotirlinga darshan. The gentle rhythm of boat crossings, forested hill trails, and parikrama paths around the island lends Omkareshwar a deeply contemplative calm.',
    historicalContext:
      'The island of Mandhata—also known in classical texts as Shivapuri—carries layers of Paramara and Holkar patronage, as well as the historic association with Adi Shankaracharya, who is traditionally believed to have met his guru Govinda Bhagavatpada in a riverside cave here.',
    attractions: [
      {
        name: 'Shri Omkareshwar Jyotirlinga',
        summary: 'Five-storied sandstone shrine overlooking the Narmada on Mandhata Island.',
        visitNote: 'Reached via pedestrian suspension bridge or regulated riverside boat crossing.',
      },
      {
        name: 'Shri Mamleshwar Temple',
        summary: 'Protected archaeological temple complex on the south bank with intricate stonework and quiet courtyards.',
        visitNote: 'Less crowded than the island sanctum and essential to the complete pilgrimage.',
      },
      {
        name: 'Narmada Ghats & Parikrama Trail',
        summary: 'Scenic stone embankments and hillside viewpoints framing the emerald river bends.',
        visitNote: 'Wear supportive walking shoes if undertaking part of the island circumambulation.',
      },
    ],
    featuredImage: MEDIA.omkareshwarIsland,
    gallery: [
      {
        url: MEDIA.omkareshwarIsland,
        caption: 'White spire of Shri Omkareshwar Jyotirlinga rising on Mandhata Island above the Narmada River',
        alt: 'Omkareshwar Jyotirlinga Temple and boats on the Narmada River',
      },
      {
        url: MEDIA.omkareshwarRiverView,
        caption: 'Terraced shrines and riverside ghats of Mandhata Island in Omkareshwar',
        alt: 'Omkareshwar hillside shrines overlooking the Narmada',
      },
      {
        url: MEDIA.mamleshwarTemple,
        caption: 'Ancient carved stone pillars of Shri Mamleshwar Temple on the south bank of the Narmada',
        alt: 'Shri Mamleshwar Temple stone colonnade in Omkareshwar',
      },
    ],
    transportInfo:
      'Most travelers reach Omkareshwar by private road journey from Ujjain or Indore across the Malwa-Nimar Vindhya ghat road. Parking is positioned on the approach road, followed by a brief local transfer or walk to the river bridges.',
    travelTips: [
      'Start early from Ujjain so you experience both Omkareshwar and Mamleshwar before midday heat.',
      'Combine Omkareshwar with Maheshwar for an enriching Narmada Valley spiritual and heritage circuit.',
      'Keep valuables minimal while crossing pedestrian bridges and river ghats.',
    ],
    coordinates: { lat: 22.2455, lng: 76.151 },
    relatedPackageSlugs: [
      'omkareshwar',
      'omkareshwar-maheshwar-mamleshwar-shani-temple',
      'ujjain-omkareshwar-jyotirlinga-journey',
    ],
    seoTitle: 'Omkareshwar Travel Guide — Jyotirlinga, Mamleshwar & Narmada Ghats',
    seoDescription:
      'Plan a serene pilgrimage to Omkareshwar and Mamleshwar from Ujjain with travel insights on Mandhata Island, Narmada ghats, and route pacing.',
    displayOrder: 2,
  },
  {
    slug: 'maheshwar',
    name: 'Maheshwar',
    devanagariName: 'महेश्वर',
    region: 'Khargone, Narmada Riverfront',
    tagline: 'Ahilya Fort, graceful river ghats, and living handloom artistry',
    summary:
      'Once the serene river capital of Maharani Ahilyabai Holkar, Maheshwar pairs soaring sandstone fort ramparts and carved riverside temples with centuries-old handloom weaving along the widest expanse of the Narmada.',
    culturalSignificance:
      'Identified in ancient Indian epics with Mahishmati, Maheshwar remains one of central India’s most graceful heritage towns. At sunset, the reflection of Ahilya Fort’s spires and stone stairways across the calm Narmada creates an atmosphere of rare stillness.',
    historicalContext:
      'In the 18th century, Maharani Ahilyabai Holkar transformed Maheshwar into a center of enlightened governance, temple architecture, and textile patronage—inviting master weavers whose descendants still craft fine Maheshwari silk-cotton sarees in the fort workshops.',
    attractions: [
      {
        name: 'Ahilya Fort & Rajwada Courtyard',
        summary: 'Historic hilltop citadel housing Maharani Ahilyabai’s modest royal residence, throne room, and shrine.',
        visitNote: 'Panoramic viewpoints overlook the entire Narmada riverfront.',
      },
      {
        name: 'Ahilyeshwar Temple & Narmada Ghats',
        summary: 'Exquisitely sculpted Maratha sandstone temples descending to sweeping ceremonial steps.',
        visitNote: 'A gentle boat ride near sunset reveals the full architectural silhouette of the fort.',
      },
      {
        name: 'Rehwa Society Handloom Workshops',
        summary: 'Historic weaving center preserving authentic Maheshwari handloom craftsmanship.',
        visitNote: 'Ideal cultural stop for visitors interested in traditional textiles.',
      },
    ],
    featuredImage: MEDIA.maheshwarGhat,
    gallery: [
      {
        url: MEDIA.maheshwarGhat,
        caption: 'Sandstone ramparts and ceremonial steps of Ahilya Fort rising above Maheshwar',
        alt: 'Ahilya Fort ramparts and stone steps at Maheshwar',
      },
      {
        url: MEDIA.maheshwarRiverfront,
        caption: 'Sculpted Maratha spires of Ahilya Fort overlooking the wide Narmada River',
        alt: 'Ahilya Fort shrines overlooking the Narmada River in Maheshwar',
      },
    ],
    transportInfo:
      'Accessible via scenic highways from Ujjain, Indore, and Omkareshwar. A private vehicle allows seamless movement between Maheshwar, Omkareshwar, and Mandu.',
    travelTips: [
      'Schedule Maheshwar in the afternoon so you stay through golden hour on the ghats.',
      'Step carefully on stone stairs descending from Ahilya Fort toward the waterfront.',
      'Allow unhurried time to observe local weavers working on wooden pit looms.',
    ],
    coordinates: { lat: 22.1771, lng: 75.5889 },
    relatedPackageSlugs: ['maheshwar', 'omkareshwar-maheshwar-mamleshwar-shani-temple'],
    seoTitle: 'Maheshwar Travel Guide — Ahilya Fort, Narmada Ghats & Heritage Craft',
    seoDescription:
      'Discover Maheshwar from Ujjain: Ahilya Fort, Ahilyeshwar Temple, Narmada sunset ghats, and authentic Maheshwari handloom heritage.',
    displayOrder: 3,
  },
  {
    slug: 'mandu',
    name: 'Mandu',
    devanagariName: 'मांडू',
    region: 'Vindhya Plateau, Dhar District',
    tagline: 'Medieval sandstone palaces suspended above the Malwa plains',
    summary:
      'Crowned atop a green escarpment of the Vindhya hills, the historic fortress city of Mandu (Mandavgad) showcases poetic Afghan-Malwa architecture, water pavilions, baobab trees, and sweeping valley panoramas.',
    culturalSignificance:
      'Known historically as Shadiabad (the City of Joy), Mandu blends architectural ingenuity with lyrical folklore—most famously the musical and romantic legacy of Sultan Baz Bahadur and Rani Roopmati gazing out over the distant Narmada plains.',
    historicalContext:
      'Developed under the Paramaras and expanded into a monumental royal citadel during the 15th and 16th centuries under the Malwa Sultanate, Mandu’s monuments are celebrated for rainwater harvesting lakes, arched audience halls, and grand marble tombs.',
    attractions: [
      {
        name: 'Jahaz Mahal (Ship Palace)',
        summary: 'Iconic double-storied palace poised between Munj Talao and Kapur Talao lakes.',
        visitNote: 'Morning light creates mirror-like architectural reflections in the surrounding tanks.',
      },
      {
        name: 'Hindola Mahal & Royal Enclave',
        summary: 'Gracefully sloping sandstone walls and historic water channels across the central citadel.',
        visitNote: 'Spread across landscaped grounds—wear comfortable walking footwear.',
      },
      {
        name: 'Rani Roopmati Pavilion & Baz Bahadur Palace',
        summary: 'Elevated hilltop pavilions commanding dramatic sunset views over the Nimar valley.',
        visitNote: 'Ideal finale for a full-day Mandu heritage excursion.',
      },
    ],
    featuredImage: MEDIA.manduPalace,
    gallery: [
      {
        url: MEDIA.manduPalace,
        caption: '15th-century sandstone architecture of Jahaz Mahal beside historic water tanks in Mandu',
        alt: 'Jahaz Mahal sandstone palace and rooftop pavilions in Mandu',
      },
      {
        url: MEDIA.manduRoopmati,
        caption: 'Rani Roopmati Pavilion rising above emerald hillsides on the Vindhya plateau in Mandu',
        alt: 'Rani Roopmati Pavilion in monsoon mist at Mandu',
      },
    ],
    transportInfo:
      'Mandu’s monuments span a wide plateau divided into Royal Enclave, Village Group, and Rewa Kund Group, making a dedicated private vehicle indispensable for comfortable touring.',
    travelTips: [
      'Monsoon (July–September) and winter (October–February) bring lush greenery and cool breezes across the plateau.',
      'Carry drinking water and sun protection as the open stone complexes involve moderate walking.',
      'Pairs naturally with Maheshwar on a two-day Malwa-Nimar heritage itinerary.',
    ],
    coordinates: { lat: 22.3627, lng: 75.398 },
    relatedPackageSlugs: ['mandu', 'personalized-multi-day-spiritual-journey'],
    seoTitle: 'Mandu Travel Guide — Jahaz Mahal, Hindola Mahal & Rani Roopmati Pavilion',
    seoDescription:
      'Explore Mandu’s timeless sandstone architecture from Ujjain or Indore: Jahaz Mahal, Royal Enclave, Hindola Mahal, and hilltop valley views.',
    displayOrder: 4,
  },
  {
    slug: 'dewas',
    name: 'Dewas',
    devanagariName: 'देवास',
    region: 'Malwa Plateau, Madhya Pradesh',
    tagline: 'Twin hilltop Devi shrines overlooking the Malwa horizon',
    summary:
      'Rising gently above the plains between Ujjain and Indore, Dewas Tekri is a revered hill shrine dedicated to Goddess Tulja Bhavani and Goddess Chamunda, cherished by devotees across central India.',
    culturalSignificance:
      'For generations, pilgrims visiting Mahakaleshwar in Ujjain have included Dewas Tekri in their Shakti darshan circuit. The hilltop sanctuary blends quiet morning chants with panoramic views of the surrounding Malwa landscape.',
    historicalContext:
      'Dewas holds a rich royal and musical heritage—formerly the seat of two Maratha princely states and home to classical vocal maestro Pandit Kumar Gandharva.',
    attractions: [
      {
        name: 'Maa Chamunda & Maa Tulja Bhavani Temple (Dewas Tekri)',
        summary: 'Sacred hilltop twin sanctums reached via stone stairway, motorable path, or ropeway.',
        visitNote: 'Ropeway availability and operating hours are managed locally; check on arrival.',
      },
      {
        name: 'Meetha Talab & Heritage Town',
        summary: 'Peaceful lakeside stretch at the foot of the hill suitable for a quiet rest stop.',
        visitNote: 'Ideal half-day spiritual outing paired with Ujjain.',
      },
    ],
    featuredImage: MEDIA.dewasTekri,
    gallery: [
      {
        url: MEDIA.dewasTekri,
        caption: 'Panoramic Malwa plains and Meetha Talab viewed from the sacred Dewas Tekri hilltop',
        alt: 'View of Dewas city and Meetha Talab from Dewas Tekri hilltop',
      },
    ],
    transportInfo:
      'Located along a smooth highway corridor linking Ujjain and Indore, Dewas is easily visited as a dedicated half-day darshan trip or an en-route stop.',
    travelTips: [
      'Early mornings and weekday afternoons offer the calmest darshan experience on Dewas Tekri.',
      'Senior travelers should enquire locally regarding ropeway or paved hill-road access.',
    ],
    coordinates: { lat: 22.9676, lng: 76.0534 },
    relatedPackageSlugs: ['dewas-darshan', 'ujjain-darshan'],
    seoTitle: 'Dewas Darshan Guide — Maa Chamunda & Tulja Bhavani Tekri from Ujjain',
    seoDescription:
      'Plan a comfortable Dewas Tekri Devi Darshan journey from Ujjain with private transport and unhurried scheduling.',
    displayOrder: 5,
  },
  {
    slug: 'bhopal',
    name: 'Bhopal',
    devanagariName: 'भोपाल',
    region: 'Central Madhya Pradesh',
    tagline: 'Historic lakes, royal heritage, and world-class museums',
    summary:
      'Known as the City of Lakes, Bhopal weaves together 11th-century Paramara roots, Begum-era palaces and mosques, expansive waterfront promenades, and India’s finest ethnographic and tribal art museums.',
    culturalSignificance:
      'Bhopal balances tranquil lakeside landscapes with deep cultural depth—from the serene Bhojtal (Upper Lake) credited to Raja Bhoj to Bharat Bhavan and the State Tribal Museum.',
    historicalContext:
      'Founded in the 11th century by Paramara king Raja Bhoja and later shaped by the Begums of Bhopal in the 19th century, the city reflects an architectural dialogue between heritage gates, quiet hills, and lush green reserves.',
    attractions: [
      {
        name: 'Bhojtal (Upper Lake) & VIP Road Promenade',
        summary: 'Expansive historic lake framing sunset reflections and tranquil boat vistas.',
        visitNote: 'Best enjoyed during late afternoon breeze.',
      },
      {
        name: 'Bhojeshwar Temple (Bhojpur)',
        summary: 'Monumental 11th-century unfinished Shiva temple housing one of India’s tallest stone lingas.',
        visitNote: 'Located on the outskirts of Bhopal; a remarkable spiritual and architectural stop.',
      },
      {
        name: 'Madhya Pradesh Tribal Museum & Bharat Bhavan',
        summary: 'Celebrated contemporary cultural institutions showcasing indigenous crafts and arts.',
        visitNote: 'Verify weekly museum closing days before planning your visit.',
      },
    ],
    featuredImage: MEDIA.bhopalLake,
    gallery: [
      {
        url: MEDIA.bhopalLake,
        caption: 'Expansive waters of historic Bhojtal (Upper Lake) in Bhopal',
        alt: 'Upper Lake Bhojtal panoramic waterfront view in Bhopal',
      },
      {
        url: MEDIA.bhojpurTemple,
        caption: 'Monumental 11th-century Bhojeshwar Shiva Temple at Bhojpur on the outskirts of Bhopal',
        alt: 'Red sandstone Bhojeshwar Shiva Temple in Bhojpur near Bhopal',
      },
    ],
    transportInfo:
      'Well connected to Ujjain via four-lane highway, making Bhopal a comfortable day excursion or multi-day hub paired with Sanchi and Bhojpur.',
    travelTips: [
      'Confirm museum operating days in advance (many state museums close on Mondays).',
      'Consider pairing Bhopal with Bhojpur Shiva Temple or Sanchi Stupa on a two-day itinerary.',
    ],
    coordinates: { lat: 23.2599, lng: 77.4126 },
    relatedPackageSlugs: ['bhopal', 'sanchi'],
    seoTitle: 'Bhopal Travel Guide — Bhojtal, Bhojpur Temple & Cultural Museums',
    seoDescription:
      'Travel comfortably from Ujjain to Bhopal for historic lakes, Bhojpur Shiva Temple, cultural museums, and personalized private itineraries.',
    displayOrder: 6,
  },
  {
    slug: 'sanchi',
    name: 'Sanchi',
    devanagariName: 'साँची',
    region: 'Raisen District, near Bhopal',
    tagline: 'Emperor Ashoka’s enduring stone sanctuary of peace',
    summary:
      'A UNESCO World Heritage Site crowned by the Great Stupa commissioned in the 3rd century BCE by Emperor Ashoka, Sanchi stands among the oldest and best-preserved stone sanctuaries in India.',
    culturalSignificance:
      'Set atop a quiet sandstone hill, Sanchi’s four intricately carved gateways (Toranas) narrate Jataka tales and symbolic episodes from the life of the Buddha in extraordinary stone relief.',
    historicalContext:
      'Flourishing as a monastic center from the Mauryan period through the Shunga, Satavahana, and Gupta dynasties, Sanchi represents over a millennium of Buddhist architectural evolution.',
    attractions: [
      {
        name: 'The Great Stupa (Stupa No. 1) & Four Toranas',
        summary: 'Monumental stone hemisphere surrounded by ornate carved gateways and circumambulatory paths.',
        visitNote: 'Allow at least two unhurried hours to study the carvings and hilltop ruins.',
      },
      {
        name: 'Ashokan Pillar & Gupta Temple 17',
        summary: 'Polished Chunar sandstone pillar fragments and one of India’s earliest surviving classical shrines.',
        visitNote: 'Positioned directly beside the Great Stupa.',
      },
      {
        name: 'Sanchi Archaeological Museum',
        summary: 'Houses the finely preserved Ashokan lion capital and ancient sculptural artifacts.',
        visitNote: 'Located at the base of the hill; check ASI visiting hours.',
      },
    ],
    featuredImage: MEDIA.sanchiStupa,
    gallery: [
      {
        url: MEDIA.sanchiStupa,
        caption: 'The Great Stupa and intricately sculpted stone gateway atop Sanchi Hill',
        alt: 'Ancient stone Buddhist Great Stupa and carved Torana gateway in Sanchi at golden afternoon',
      },
    ],
    transportInfo:
      'Reached smoothly by private car from Ujjain or Bhopal. An early morning departure from Ujjain allows relaxed exploration of both Sanchi Hill and the museum.',
    travelTips: [
      'Entry tickets to the UNESCO monument are administered by the Archaeological Survey of India (ASI).',
      'Carry sun hats and water—the hilltop monument complex is open to the sky.',
      'Late afternoon sunlight brings out the sculptural depth of the Torana reliefs.',
    ],
    coordinates: { lat: 23.4793, lng: 77.7399 },
    relatedPackageSlugs: ['sanchi', 'bhopal'],
    seoTitle: 'Sanchi Stupa Travel Guide — UNESCO Buddhist Heritage Tour from Ujjain',
    seoDescription:
      'Plan a private heritage journey from Ujjain to Sanchi Stupa with insights on the Great Stupa, Torana gateways, Ashokan Pillar, and travel pacing.',
    displayOrder: 7,
  },
  {
    slug: 'pachmarhi',
    name: 'Pachmarhi',
    devanagariName: 'पचमढ़ी',
    region: 'Satpura Range, Narmadapuram',
    tagline: 'Misty sandstone plateaus, forest waterfalls, and sacred mountain caves',
    summary:
      'Known affectionately as the Queen of Satpura, Pachmarhi is Madhya Pradesh’s serene highland sanctuary—blending ancient rock-cut Pandav Caves, Jatashankar and Gupt Mahadev shrines, deep valleys, and cascading waterfalls.',
    culturalSignificance:
      'Beyond its tranquil hill-station charm, Pachmarhi carries rich Shaiva and epic heritage—including hill shrines nestled inside dramatic sandstone clefts and prehistoric rock shelters.',
    historicalContext:
      'Preserved within the Pachmarhi Biosphere Reserve, the plateau retains quiet colonial-era architecture alongside centuries-old forest pilgrimage paths.',
    attractions: [
      {
        name: 'Jatashankar & Gupt Mahadev Shrines',
        summary: 'Natural rock-shelter Shiva sanctuaries framed by forested ravines and perennial streams.',
        visitNote: 'Involve stone steps and narrow passages; take unhurried pacing.',
      },
      {
        name: 'Bee Falls & Dhoopgarh Sunrise/Sunset Point',
        summary: 'Refreshing Satpura waterfall canyon and the highest viewpoint in central India.',
        visitNote: 'Local forest-entry permits and authorized Gypsy vehicles apply inside designated reserve zones.',
      },
      {
        name: 'Pandav Caves & Handi Khoh Gorge',
        summary: 'Ancient rock-cut sandstone caves set in landscaped gardens and dramatic 300-foot forest canyons.',
        visitNote: 'Ideal for relaxed family sightseeing.',
      },
    ],
    featuredImage: MEDIA.pachmarhiHills,
    gallery: [
      {
        url: MEDIA.pachmarhiHills,
        caption: 'Ancient rock-cut sandstone chambers of Pandav Caves in Pachmarhi',
        alt: 'Rock-cut Pandav Caves in the Satpura hills of Pachmarhi',
      },
      {
        url: MEDIA.pachmarhiValley,
        caption: 'Verdant Satpura plateau gardens beneath Pandav Caves in Pachmarhi',
        alt: 'Landscaped Satpura hill gardens at Pandav Caves, Pachmarhi',
      },
    ],
    transportInfo:
      'Best planned as a multi-day journey (2 to 4 days) from Ujjain or Bhopal. Note that internal Satpura reserve viewpoints often require authorized local forest vehicles arranged on-site.',
    travelTips: [
      'Pack light woolens for winter mornings and comfortable walking shoes for rock trails.',
      'Plan at least two nights in Pachmarhi to appreciate both sacred cave shrines and natural overlooks without rushing.',
    ],
    coordinates: { lat: 22.4674, lng: 78.4346 },
    relatedPackageSlugs: ['pachmarhi', 'personalized-multi-day-spiritual-journey'],
    seoTitle: 'Pachmarhi Travel Guide — Satpura Hills, Cave Shrines & Waterfalls',
    seoDescription:
      'Plan a serene multi-day Satpura highland journey from Ujjain to Pachmarhi covering Jatashankar, Pandav Caves, Bee Falls, and Dhoopgarh.',
    displayOrder: 8,
  },
  {
    slug: 'amarkantak',
    name: 'Amarkantak',
    devanagariName: 'अमरकंटक',
    region: 'Maikal Hills, Anuppur',
    tagline: 'Teerthraj — where the sacred Narmada and Son rivers are born',
    summary:
      'Set high in the forested Maikal hills where the Vindhya and Satpura ranges meet, Amarkantak is revered as Teerthraj—the sacred highland birthplace of the Narmada, Son, and Johila rivers.',
    culturalSignificance:
      'For devotees of Maa Narmada, Amarkantak is the spiritual wellspring of central India. White marble-framed Narmada Udgam Kund, serene forest ashrams, and ancient Kalachuri stone temples create an atmosphere of deep stillness.',
    historicalContext:
      'Rich with medieval Kalachuri dynasty temples dating back to the 10th–11th centuries and closely associated with saints such as Adi Shankaracharya and Sant Kabir.',
    attractions: [
      {
        name: 'Narmada Udgam Temple & Kund',
        summary: 'Sacred walled complex marking the origin spring of the Narmada River.',
        visitNote: 'Peaceful morning and evening aarti traditions anchor the pilgrimage.',
      },
      {
        name: 'Ancient Kalachuri Temples',
        summary: 'Finely carved medieval stone temples preserved by the Archaeological Survey of India.',
        visitNote: 'Located directly opposite the Narmada Kund complex.',
      },
      {
        name: 'Kapildhara & Dudhdhara Waterfalls',
        summary: 'The first dramatic cascades of the young Narmada flowing through dense Sal forests.',
        visitNote: 'Wear sturdy footwear for forest viewpoints.',
      },
    ],
    featuredImage: MEDIA.amarkantakTemple,
    gallery: [
      {
        url: MEDIA.amarkantakTemple,
        caption: 'Misty Sal forests framing sacred temple architecture in Amarkantak',
        alt: 'Hindu temple surrounded by forested Maikal hills in Amarkantak',
      },
      {
        url: MEDIA.amarkantakSarovar,
        caption: 'Sacred Pushkar Sarovar and riverside shrines in the highland pilgrimage town of Amarkantak',
        alt: 'Pushkar Sarovar and Narmada shrine in Amarkantak, Madhya Pradesh',
      },
    ],
    transportInfo:
      'Amarkantak is a long-distance pilgrimage from Ujjain best planned across multiple days with comfortable overnight halts and a reliable SUV or Tempo Traveller.',
    travelTips: [
      'Plan 3 to 5 days when traveling overland from Ujjain to avoid fatigue.',
      'Evenings in the Maikal hills remain cool much of the year—carry a light layer.',
    ],
    coordinates: { lat: 22.6758, lng: 81.7586 },
    relatedPackageSlugs: ['amarkantak', 'personalized-multi-day-spiritual-journey'],
    seoTitle: 'Amarkantak Pilgrimage Guide — Narmada Udgam, Kalachuri Temples & Kapildhara',
    seoDescription:
      'Plan a meaningful pilgrimage to Amarkantak from Ujjain: Narmada Udgam Kund, ancient Kalachuri temples, Kapildhara Falls, and custom multi-day travel.',
    displayOrder: 9,
  },
];
