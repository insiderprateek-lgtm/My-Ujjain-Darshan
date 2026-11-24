import {
  boolean,
  integer,
  jsonb,
  pgTable,
  serial,
  text,
  timestamp,
} from 'drizzle-orm/pg-core';

export interface PackageGalleryItem {
  url: string;
  caption: string;
  alt: string;
}

export interface PackageItineraryStep {
  segment: string;
  title: string;
  duration?: string;
  summary: string;
  details: string;
  walkingNote?: string;
  visitorAdvice?: string;
}

export interface PackagePlaceCovered {
  name: string;
  slug?: string;
  significance: string;
  highlights: string;
  visitNote: string;
  recommendedDuration?: string;
  image: string;
}

export interface PackageInclusionItem {
  item: string;
  status: 'pending-operator-approval' | 'confirmed';
}

export interface PackageTravelInfo {
  bestSeason: string;
  departureGuidance: string;
  suitableVehicles: string[];
  familySeniorNote: string;
  coverageNote: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface DestinationAttraction {
  name: string;
  summary: string;
  visitNote: string;
}

export interface ArticleSection {
  heading: string;
  paragraphs: string[];
}

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  uid: text('uid').notNull().unique(),
  email: text('email').notNull(),
  role: text('role').notNull().default('user'),
  displayName: text('display_name'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const packages = pgTable('packages', {
  id: serial('id').primaryKey(),
  slug: text('slug').notNull().unique(),
  name: text('name').notNull(),
  subtitle: text('subtitle').notNull(),
  summary: text('summary').notNull(),
  fullDescription: text('full_description').notNull(),
  category: text('category').notNull(),
  catalogType: text('catalog_type').notNull().default('reference-catalog'),
  destinations: jsonb('destinations').$type<string[]>().notNull(),
  duration: text('duration').notNull(),
  startingLocation: text('starting_location').notNull(),
  endingLocation: text('ending_location').notNull(),
  referencePrice: integer('reference_price'),
  publishedPrice: integer('published_price'),
  priceBasis: text('price_basis').notNull().default('custom-quote'),
  pricingStatus: text('pricing_status').notNull().default('pending-approval'),
  pricingCurrency: text('pricing_currency').notNull().default('INR'),
  sourceUrl: text('source_url'),
  lastVerifiedAt: text('last_verified_at'),
  featuredImage: text('featured_image').notNull(),
  gallery: jsonb('gallery').$type<PackageGalleryItem[]>().notNull(),
  highlights: jsonb('highlights').$type<string[]>().notNull(),
  itinerary: jsonb('itinerary').$type<PackageItineraryStep[]>().notNull(),
  placesCovered: jsonb('places_covered').$type<PackagePlaceCovered[]>().notNull(),
  inclusions: jsonb('inclusions').$type<PackageInclusionItem[]>().notNull(),
  exclusions: jsonb('exclusions').$type<string[]>().notNull(),
  travelInfo: jsonb('travel_info').$type<PackageTravelInfo>().notNull(),
  faqs: jsonb('faqs').$type<FaqItem[]>().notNull(),
  seoTitle: text('seo_title').notNull(),
  seoDescription: text('seo_description').notNull(),
  isFeatured: boolean('is_featured').notNull().default(false),
  displayOrder: integer('display_order').notNull().default(0),
  publishingStatus: text('publishing_status').notNull().default('published'),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const destinations = pgTable('destinations', {
  id: serial('id').primaryKey(),
  slug: text('slug').notNull().unique(),
  name: text('name').notNull(),
  devanagariName: text('devanagari_name'),
  region: text('region').notNull(),
  tagline: text('tagline').notNull(),
  summary: text('summary').notNull(),
  culturalSignificance: text('cultural_significance').notNull(),
  historicalContext: text('historical_context').notNull(),
  attractions: jsonb('attractions').$type<DestinationAttraction[]>().notNull(),
  featuredImage: text('featured_image').notNull(),
  gallery: jsonb('gallery').$type<PackageGalleryItem[]>().notNull(),
  transportInfo: text('transport_info').notNull(),
  travelTips: jsonb('travel_tips').$type<string[]>().notNull(),
  coordinates: jsonb('coordinates').$type<{ lat: number; lng: number }>(),
  relatedPackageSlugs: jsonb('related_package_slugs').$type<string[]>().notNull(),
  seoTitle: text('seo_title').notNull(),
  seoDescription: text('seo_description').notNull(),
  displayOrder: integer('display_order').notNull().default(0),
});

export const enquiries = pgTable('enquiries', {
  id: serial('id').primaryKey(),
  referenceCode: text('reference_code').notNull().unique(),
  customerName: text('customer_name').notNull(),
  contactPhone: text('contact_phone').notNull(),
  email: text('email'),
  preferredContactMethod: text('preferred_contact_method').notNull().default('whatsapp'),
  interestedPackageSlug: text('interested_package_slug'),
  interestedPackageName: text('interested_package_name').notNull(),
  travelType: text('travel_type').notNull(),
  durationDays: text('duration_days'),
  arrivalDate: text('arrival_date'),
  returnDate: text('return_date'),
  adults: integer('adults').notNull().default(2),
  children: integer('children').notNull().default(0),
  pickupLocation: text('pickup_location'),
  dropLocation: text('drop_location'),
  vehiclePreference: text('vehicle_preference'),
  interests: jsonb('interests').$type<string[]>().notNull(),
  templesOfInterest: jsonb('temples_of_interest').$type<string[]>().notNull(),
  seniorTravelers: boolean('senior_travelers').notNull().default(false),
  accessibilityNotes: text('accessibility_notes'),
  hotelAssistance: boolean('hotel_assistance').notNull().default(false),
  guideRequired: boolean('guide_required').notNull().default(false),
  specialRequirements: text('special_requirements'),
  consentAccepted: boolean('consent_accepted').notNull().default(true),
  consentTimestamp: timestamp('consent_timestamp').defaultNow().notNull(),
  sourcePage: text('source_page').notNull(),
  leadStatus: text('lead_status').notNull().default('new'),
  followUpNotes: text('follow_up_notes'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const vehicles = pgTable('vehicles', {
  id: serial('id').primaryKey(),
  slug: text('slug').notNull().unique(),
  category: text('category').notNull(),
  modelName: text('model_name').notNull(),
  capacityLabel: text('capacity_label').notNull(),
  luggageLabel: text('luggage_label').notNull(),
  recommendedUse: text('recommended_use').notNull(),
  acStatus: text('ac_status').notNull(),
  availabilityStatus: text('availability_status').notNull().default('reference-unconfirmed'),
  description: text('description').notNull(),
  image: text('image').notNull(),
  sourceNote: text('source_note'),
  displayOrder: integer('display_order').notNull().default(0),
});

export const articles = pgTable('articles', {
  id: serial('id').primaryKey(),
  slug: text('slug').notNull().unique(),
  title: text('title').notNull(),
  category: text('category').notNull(),
  readTime: text('read_time').notNull(),
  excerpt: text('excerpt').notNull(),
  content: jsonb('content').$type<ArticleSection[]>().notNull(),
  authorName: text('author_name').notNull(),
  coverImage: text('cover_image').notNull(),
  tags: jsonb('tags').$type<string[]>().notNull(),
  relatedPackageSlugs: jsonb('related_package_slugs').$type<string[]>().notNull(),
  seoTitle: text('seo_title').notNull(),
  seoDescription: text('seo_description').notNull(),
  publishedDate: text('published_date').notNull(),
  publishingStatus: text('publishing_status').notNull().default('published'),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const faqs = pgTable('faqs', {
  id: serial('id').primaryKey(),
  category: text('category').notNull(),
  question: text('question').notNull(),
  answer: text('answer').notNull(),
  displayOrder: integer('display_order').notNull().default(0),
});

export const testimonials = pgTable('testimonials', {
  id: serial('id').primaryKey(),
  guestName: text('guest_name').notNull(),
  originCity: text('origin_city').notNull(),
  journeyTitle: text('journey_title').notNull(),
  quote: text('quote').notNull(),
  verifiedSource: text('verified_source').notNull(),
  isApproved: boolean('is_approved').notNull().default(false),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const siteSettings = pgTable('site_settings', {
  key: text('key').primaryKey(),
  value: text('value').notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});
