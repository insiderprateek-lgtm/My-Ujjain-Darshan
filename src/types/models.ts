import type {
  ArticleSection,
  DestinationAttraction,
  FaqItem,
  PackageGalleryItem,
  PackageInclusionItem,
  PackageItineraryStep,
  PackagePlaceCovered,
  PackageTravelInfo,
} from '../db/schema.ts';

export interface PublicPackage {
  id: number;
  slug: string;
  name: string;
  subtitle: string;
  summary: string;
  fullDescription: string;
  category: string;
  catalogType: string;
  destinations: string[];
  duration: string;
  startingLocation: string;
  endingLocation: string;
  publishedPrice: number | null;
  priceBasis: string;
  pricingStatus: string;
  pricingCurrency: string;
  lastVerifiedAt: string | null;
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
  publishingStatus: string;
  publicPriceLabel: string;
}

export interface AdminPackage extends Omit<PublicPackage, 'publicPriceLabel'> {
  referencePrice: number | null;
  sourceUrl: string | null;
}

export interface DestinationRecord {
  id: number;
  slug: string;
  name: string;
  devanagariName: string | null;
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
  coordinates: { lat: number; lng: number } | null;
  relatedPackageSlugs: string[];
  seoTitle: string;
  seoDescription: string;
  displayOrder: number;
}

export interface VehicleRecord {
  id: number;
  slug: string;
  category: string;
  modelName: string;
  capacityLabel: string;
  luggageLabel: string;
  recommendedUse: string;
  acStatus: string;
  availabilityStatus: string;
  description: string;
  image: string;
  sourceNote: string | null;
  displayOrder: number;
}

export interface ArticleRecord {
  id: number;
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
  publishingStatus: string;
}

export interface FaqRecord {
  id: number;
  category: string;
  question: string;
  answer: string;
  displayOrder: number;
}

export interface TestimonialRecord {
  id: number;
  guestName: string;
  originCity: string;
  journeyTitle: string;
  quote: string;
  verifiedSource: string;
  isApproved: boolean;
  createdAt: string;
}

export interface EnquiryRecord {
  id: number;
  referenceCode: string;
  customerName: string;
  contactPhone: string;
  email: string | null;
  preferredContactMethod: string;
  interestedPackageSlug: string | null;
  interestedPackageName: string;
  travelType: string;
  durationDays: string | null;
  arrivalDate: string | null;
  returnDate: string | null;
  adults: number;
  children: number;
  pickupLocation: string | null;
  dropLocation: string | null;
  vehiclePreference: string | null;
  interests: string[];
  templesOfInterest: string[];
  seniorTravelers: boolean;
  accessibilityNotes: string | null;
  hotelAssistance: boolean;
  guideRequired: boolean;
  specialRequirements: string | null;
  sourcePage: string;
  leadStatus: string;
  followUpNotes: string | null;
  createdAt: string;
}
