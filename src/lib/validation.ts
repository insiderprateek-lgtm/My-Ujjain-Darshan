import { z } from 'zod';

const INDIAN_PHONE_REGEX = /^(?:\+?91[\s-]?)?[6-9]\d{9}$/;

export const enquirySubmissionSchema = z.object({
  customerName: z
    .string()
    .trim()
    .min(2, 'Please enter your full name (at least 2 characters).')
    .max(120, 'Name is too long.'),
  contactPhone: z
    .string()
    .trim()
    .refine((val) => INDIAN_PHONE_REGEX.test(val.replace(/\s+/g, '')), {
      message: 'Please enter a valid 10-digit Indian mobile number (with optional +91).',
    }),
  email: z
    .string()
    .trim()
    .email('Please enter a valid email address.')
    .optional()
    .or(z.literal('')),
  preferredContactMethod: z.enum(['whatsapp', 'phone', 'email']).default('whatsapp'),
  interestedPackageSlug: z.string().trim().max(160).optional().or(z.literal('')),
  interestedPackageName: z
    .string()
    .trim()
    .min(2, 'Please select a package or custom journey.')
    .max(200),
  travelType: z
    .string()
    .trim()
    .min(2, 'Please select a travel type.')
    .max(100),
  durationDays: z.string().trim().max(60).optional().or(z.literal('')),
  arrivalDate: z.string().trim().max(40).optional().or(z.literal('')),
  returnDate: z.string().trim().max(40).optional().or(z.literal('')),
  adults: z.coerce.number().int().min(1).max(100).default(2),
  children: z.coerce.number().int().min(0).max(50).default(0),
  pickupLocation: z.string().trim().max(160).optional().or(z.literal('')),
  dropLocation: z.string().trim().max(160).optional().or(z.literal('')),
  vehiclePreference: z.string().trim().max(120).optional().or(z.literal('')),
  interests: z.array(z.string().trim().max(80)).max(15).default([]),
  templesOfInterest: z.array(z.string().trim().max(100)).max(20).default([]),
  seniorTravelers: z.boolean().default(false),
  accessibilityNotes: z.string().trim().max(500).optional().or(z.literal('')),
  hotelAssistance: z.boolean().default(false),
  guideRequired: z.boolean().default(false),
  specialRequirements: z.string().trim().max(1200).optional().or(z.literal('')),
  consentAccepted: z.boolean().refine((val) => val === true, {
    message: 'Please accept the privacy consent to submit your enquiry.',
  }),
  sourcePage: z.string().trim().max(240).default('/plan-your-journey'),
  honeypot: z.string().max(0).optional().or(z.literal('')),
});

export type EnquirySubmissionInput = z.infer<typeof enquirySubmissionSchema>;

export const adminPackageUpdateSchema = z.object({
  name: z.string().trim().min(2).max(200).optional(),
  subtitle: z.string().trim().min(2).max(240).optional(),
  summary: z.string().trim().min(10).max(1000).optional(),
  fullDescription: z.string().trim().min(20).max(8000).optional(),
  category: z.string().trim().min(2).max(80).optional(),
  duration: z.string().trim().min(2).max(120).optional(),
  startingLocation: z.string().trim().min(2).max(160).optional(),
  endingLocation: z.string().trim().min(2).max(160).optional(),
  publishedPrice: z.number().int().min(0).max(500000).nullable().optional(),
  pricingStatus: z.enum(['pending-approval', 'approved', 'request-only']).optional(),
  priceBasis: z.string().trim().min(2).max(80).optional(),
  isFeatured: z.boolean().optional(),
  publishingStatus: z.enum(['published', 'draft', 'archived']).optional(),
  seoTitle: z.string().trim().min(5).max(160).optional(),
  seoDescription: z.string().trim().min(10).max(320).optional(),
  destinations: z.array(z.string().trim().min(1).max(80)).optional(),
  highlights: z.array(z.string().trim().min(1).max(300)).optional(),
  exclusions: z.array(z.string().trim().min(1).max(350)).optional(),
  inclusions: z
    .array(
      z.object({
        item: z.string().trim().min(1).max(300),
        status: z.enum(['pending-operator-approval', 'confirmed']),
      })
    )
    .optional(),
});

export const adminPackageCreateSchema = z.object({
  slug: z
    .string()
    .trim()
    .min(3)
    .max(120)
    .regex(/^[a-z0-9-]+$/, 'Slug must contain lowercase letters, numbers, and hyphens only.'),
  name: z.string().trim().min(2).max(200),
  subtitle: z.string().trim().min(2).max(240),
  summary: z.string().trim().min(10).max(1000),
  fullDescription: z.string().trim().min(20).max(8000),
  category: z.string().trim().min(2).max(80),
  catalogType: z.enum(['reference-catalog', 'proposed-experience']).default('proposed-experience'),
  destinations: z.array(z.string().trim().min(1)).min(1),
  duration: z.string().trim().min(2).max(120),
  startingLocation: z.string().trim().min(2).max(160),
  endingLocation: z.string().trim().min(2).max(160),
  publishedPrice: z.number().int().min(0).max(500000).nullable().default(null),
  pricingStatus: z.enum(['pending-approval', 'approved', 'request-only']).default('request-only'),
  featuredImage: z.string().trim().min(1).max(400),
  seoTitle: z.string().trim().min(5).max(160),
  seoDescription: z.string().trim().min(10).max(320),
});

export const adminEnquiryUpdateSchema = z.object({
  leadStatus: z.enum(['new', 'contacted', 'quoted', 'confirmed', 'closed']),
  followUpNotes: z.string().trim().max(2000).nullable().optional(),
});

export const adminFaqSchema = z.object({
  category: z.string().trim().min(2).max(80),
  question: z.string().trim().min(5).max(300),
  answer: z.string().trim().min(10).max(2000),
  displayOrder: z.number().int().min(0).max(999).optional(),
});

export const adminArticleCreateSchema = z.object({
  slug: z
    .string()
    .trim()
    .min(3)
    .max(140)
    .regex(/^[a-z0-9-]+$/),
  title: z.string().trim().min(5).max(200),
  category: z.string().trim().min(2).max(80),
  readTime: z.string().trim().min(2).max(40),
  excerpt: z.string().trim().min(15).max(500),
  bodyText: z.string().trim().min(40).max(12000),
  coverImage: z.string().trim().min(1).max(400),
  publishingStatus: z.enum(['published', 'draft']).default('published'),
});

export const adminTestimonialSchema = z.object({
  guestName: z.string().trim().min(2).max(120),
  originCity: z.string().trim().min(2).max(100),
  journeyTitle: z.string().trim().min(2).max(160),
  quote: z.string().trim().min(15).max(1000),
  verifiedSource: z.string().trim().min(2).max(120),
  isApproved: z.boolean().default(false),
});

export const chatMessageItemSchema = z.object({
  role: z.enum(['user', 'assistant']),
  content: z.string().trim().min(1).max(1500),
});

export const chatRequestSchema = z.object({
  message: z
    .string()
    .trim()
    .min(1, 'Please type a message.')
    .max(1000, 'Message is too long (maximum 1000 characters).'),
  history: z.array(chatMessageItemSchema).max(20).default([]),
  leadAlreadyCaptured: z.boolean().default(false),
});

export type ChatRequestInput = z.infer<typeof chatRequestSchema>;

export const chatLeadSchema = z.object({
  customerName: z
    .string()
    .trim()
    .min(2, 'Please enter your name (at least 2 characters).')
    .max(120, 'Name is too long.'),
  contactPhone: z
    .string()
    .trim()
    .refine((val) => INDIAN_PHONE_REGEX.test(val.replace(/\s+/g, '')), {
      message: 'Please enter a valid 10-digit Indian mobile number (with optional +91).',
    }),
  email: z
    .string()
    .trim()
    .email('Please enter a valid email address.')
    .optional()
    .or(z.literal('')),
  interestedPackageName: z
    .string()
    .trim()
    .min(2, 'Please specify a package or journey.')
    .max(200)
    .default('Custom Ujjain Darshan Journey'),
  arrivalDate: z.string().trim().max(40).optional().or(z.literal('')),
  adults: z.coerce.number().int().min(1).max(100).default(2),
  children: z.coerce.number().int().min(0).max(50).default(0),
  pickupLocation: z.string().trim().max(160).optional().or(z.literal('')),
  vehiclePreference: z.string().trim().max(120).optional().or(z.literal('')),
  specialRequirements: z.string().trim().max(1200).optional().or(z.literal('')),
  chatSummary: z.string().trim().max(3000).optional().or(z.literal('')),
  consentAccepted: z.boolean().refine((val) => val === true, {
    message: 'Please confirm permission for our team to contact you.',
  }),
  honeypot: z.string().max(0).optional().or(z.literal('')),
});

export type ChatLeadInput = z.infer<typeof chatLeadSchema>;

