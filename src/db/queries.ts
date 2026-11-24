import { db } from './index.ts';
import {
  articles,
  destinations,
  enquiries,
  faqs,
  packages,
  siteSettings,
  testimonials,
  vehicles,
} from './schema.ts';
import { asc, desc, eq } from 'drizzle-orm';
import { ensureSeeded } from './seed.ts';

export type PublicPackage = Omit<
  typeof packages.$inferSelect,
  'referencePrice' | 'sourceUrl'
> & {
  publicPriceLabel: string;
};

export function sanitizePublicPackage(
  row: typeof packages.$inferSelect
): PublicPackage {
  const { referencePrice: _ref, sourceUrl: _src, ...safe } = row;
  const isApproved =
    safe.pricingStatus === 'approved' &&
    typeof safe.publishedPrice === 'number' &&
    safe.publishedPrice > 0;

  return {
    ...safe,
    publishedPrice: isApproved ? safe.publishedPrice : null,
    publicPriceLabel: isApproved
      ? `Starting from ₹${safe.publishedPrice!.toLocaleString('en-IN')}`
      : 'Pricing available on request',
  };
}

export async function getPublicPackages(): Promise<PublicPackage[]> {
  try {
    await ensureSeeded();
    const rows = await db
      .select()
      .from(packages)
      .where(eq(packages.publishingStatus, 'published'))
      .orderBy(asc(packages.displayOrder), asc(packages.id));
    return rows.map(sanitizePublicPackage);
  } catch (error) {
    console.error('Failed to load public packages:', error);
    throw new Error('Unable to load tour packages at this moment.', { cause: error });
  }
}

export async function getPublicPackageBySlug(
  slug: string
): Promise<PublicPackage | null> {
  try {
    await ensureSeeded();
    const rows = await db
      .select()
      .from(packages)
      .where(eq(packages.slug, slug))
      .limit(1);
    const row = rows[0];
    if (!row || row.publishingStatus !== 'published') return null;
    return sanitizePublicPackage(row);
  } catch (error) {
    console.error('Failed to load package by slug:', error);
    throw new Error('Unable to load package details.', { cause: error });
  }
}

export async function getDestinations() {
  try {
    await ensureSeeded();
    return await db
      .select()
      .from(destinations)
      .orderBy(asc(destinations.displayOrder), asc(destinations.id));
  } catch (error) {
    console.error('Failed to load destinations:', error);
    throw new Error('Unable to load destinations.', { cause: error });
  }
}

export async function getDestinationBySlug(slug: string) {
  try {
    await ensureSeeded();
    const rows = await db
      .select()
      .from(destinations)
      .where(eq(destinations.slug, slug))
      .limit(1);
    return rows[0] || null;
  } catch (error) {
    console.error('Failed to load destination:', error);
    throw new Error('Unable to load destination guide.', { cause: error });
  }
}

export async function getVehicles() {
  try {
    await ensureSeeded();
    return await db
      .select()
      .from(vehicles)
      .orderBy(asc(vehicles.displayOrder), asc(vehicles.id));
  } catch (error) {
    console.error('Failed to load vehicles:', error);
    throw new Error('Unable to load vehicle categories.', { cause: error });
  }
}

export async function getPublishedArticles() {
  try {
    await ensureSeeded();
    return await db
      .select()
      .from(articles)
      .where(eq(articles.publishingStatus, 'published'))
      .orderBy(desc(articles.publishedDate), asc(articles.id));
  } catch (error) {
    console.error('Failed to load articles:', error);
    throw new Error('Unable to load travel journal articles.', { cause: error });
  }
}

export async function getArticleBySlug(slug: string) {
  try {
    await ensureSeeded();
    const rows = await db
      .select()
      .from(articles)
      .where(eq(articles.slug, slug))
      .limit(1);
    const row = rows[0];
    if (!row || row.publishingStatus !== 'published') return null;
    return row;
  } catch (error) {
    console.error('Failed to load article:', error);
    throw new Error('Unable to load journal article.', { cause: error });
  }
}

export async function getFaqs() {
  try {
    await ensureSeeded();
    return await db
      .select()
      .from(faqs)
      .orderBy(asc(faqs.displayOrder), asc(faqs.id));
  } catch (error) {
    console.error('Failed to load FAQs:', error);
    throw new Error('Unable to load frequently asked questions.', { cause: error });
  }
}

export async function getApprovedTestimonials() {
  try {
    await ensureSeeded();
    return await db
      .select()
      .from(testimonials)
      .where(eq(testimonials.isApproved, true))
      .orderBy(desc(testimonials.createdAt));
  } catch (error) {
    console.error('Failed to load testimonials:', error);
    throw new Error('Unable to load guest reviews.', { cause: error });
  }
}

export async function getSiteSettingsMap(): Promise<Record<string, string>> {
  try {
    await ensureSeeded();
    const rows = await db.select().from(siteSettings);
    return rows.reduce<Record<string, string>>((acc, row) => {
      acc[row.key] = row.value;
      return acc;
    }, {});
  } catch (error) {
    console.error('Failed to load site settings:', error);
    throw new Error('Unable to load site configuration.', { cause: error });
  }
}

export async function createEnquiryRecord(
  values: typeof enquiries.$inferInsert
) {
  try {
    await ensureSeeded();
    const inserted = await db.insert(enquiries).values(values).returning();
    return inserted[0];
  } catch (error) {
    console.error('Failed to save enquiry:', error);
    throw new Error('We could not record your enquiry right now. Please try again or reach us on WhatsApp.', {
      cause: error,
    });
  }
}
