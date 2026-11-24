import { db } from './index.ts';
import {
  articles,
  destinations,
  faqs,
  packages,
  siteSettings,
  vehicles,
} from './schema.ts';
import { SEED_PACKAGES } from '../data/packagesSeed.ts';
import { SEED_DESTINATIONS } from '../data/destinationsSeed.ts';
import { SEED_ARTICLES, SEED_FAQS, SEED_VEHICLES } from '../data/editorialSeed.ts';
import { count, eq } from 'drizzle-orm';

let seedPromise: Promise<void> | null = null;
let seededSuccessfully = false;

function isManagedSeedMediaPath(url: string): boolean {
  return url.startsWith('/src/assets/') || url.startsWith('/images/');
}

async function syncVerifiedSeedMedia(): Promise<void> {
  // Safely upgrade seeded DB rows whose images reference legacy /src/assets/ paths
  // or earlier local seed assignments — never touches admin pricing, publishing status, or external custom URLs.
  const existingVehicles = await db.select().from(vehicles);
  for (const seedVeh of SEED_VEHICLES) {
    const row = existingVehicles.find((v) => v.slug === seedVeh.slug);
    if (
      row &&
      isManagedSeedMediaPath(row.image) &&
      (row.image !== seedVeh.image ||
        row.modelName !== seedVeh.modelName ||
        row.category !== seedVeh.category)
    ) {
      await db
        .update(vehicles)
        .set({
          category: seedVeh.category,
          modelName: seedVeh.modelName,
          capacityLabel: seedVeh.capacityLabel,
          luggageLabel: seedVeh.luggageLabel,
          description: seedVeh.description,
          image: seedVeh.image,
          sourceNote: seedVeh.sourceNote,
        })
        .where(eq(vehicles.slug, seedVeh.slug));
    }
  }

  const existingPackages = await db.select().from(packages);
  for (const seedPkg of SEED_PACKAGES) {
    const row = existingPackages.find((p) => p.slug === seedPkg.slug);
    if (
      row &&
      isManagedSeedMediaPath(row.featuredImage) &&
      (row.featuredImage !== seedPkg.featuredImage ||
        JSON.stringify(row.gallery) !== JSON.stringify(seedPkg.gallery) ||
        JSON.stringify(row.placesCovered) !== JSON.stringify(seedPkg.placesCovered))
    ) {
      await db
        .update(packages)
        .set({
          featuredImage: seedPkg.featuredImage,
          gallery: seedPkg.gallery,
          placesCovered: seedPkg.placesCovered,
        })
        .where(eq(packages.slug, seedPkg.slug));
    }
  }

  const existingDestinations = await db.select().from(destinations);
  for (const seedDest of SEED_DESTINATIONS) {
    const row = existingDestinations.find((d) => d.slug === seedDest.slug);
    if (
      row &&
      isManagedSeedMediaPath(row.featuredImage) &&
      (row.featuredImage !== seedDest.featuredImage ||
        JSON.stringify(row.gallery) !== JSON.stringify(seedDest.gallery))
    ) {
      await db
        .update(destinations)
        .set({
          featuredImage: seedDest.featuredImage,
          gallery: seedDest.gallery,
        })
        .where(eq(destinations.slug, seedDest.slug));
    }
  }

  const existingArticles = await db.select().from(articles);
  for (const seedArt of SEED_ARTICLES) {
    const row = existingArticles.find((a) => a.slug === seedArt.slug);
    if (
      row &&
      isManagedSeedMediaPath(row.coverImage) &&
      row.coverImage !== seedArt.coverImage
    ) {
      await db
        .update(articles)
        .set({ coverImage: seedArt.coverImage })
        .where(eq(articles.slug, seedArt.slug));
    }
  }
}

async function runSeed(): Promise<void> {
  // Check packages count first — if already populated, skip re-inserting to respect admin edits
  const [pkgCount] = await db.select({ total: count() }).from(packages);
  if ((pkgCount?.total ?? 0) === 0) {
    for (const pkg of SEED_PACKAGES) {
      await db
        .insert(packages)
        .values({
          slug: pkg.slug,
          name: pkg.name,
          subtitle: pkg.subtitle,
          summary: pkg.summary,
          fullDescription: pkg.fullDescription,
          category: pkg.category,
          catalogType: pkg.catalogType,
          destinations: pkg.destinations,
          duration: pkg.duration,
          startingLocation: pkg.startingLocation,
          endingLocation: pkg.endingLocation,
          referencePrice: pkg.referencePrice,
          publishedPrice: pkg.publishedPrice,
          priceBasis: pkg.priceBasis,
          pricingStatus: pkg.pricingStatus,
          pricingCurrency: pkg.pricingCurrency,
          sourceUrl: pkg.sourceUrl,
          lastVerifiedAt: pkg.lastVerifiedAt,
          featuredImage: pkg.featuredImage,
          gallery: pkg.gallery,
          highlights: pkg.highlights,
          itinerary: pkg.itinerary,
          placesCovered: pkg.placesCovered,
          inclusions: pkg.inclusions,
          exclusions: pkg.exclusions,
          travelInfo: pkg.travelInfo,
          faqs: pkg.faqs,
          seoTitle: pkg.seoTitle,
          seoDescription: pkg.seoDescription,
          isFeatured: pkg.isFeatured,
          displayOrder: pkg.displayOrder,
          publishingStatus: pkg.publishingStatus,
        })
        .onConflictDoNothing({ target: packages.slug });
    }
  }

  const [destCount] = await db.select({ total: count() }).from(destinations);
  if ((destCount?.total ?? 0) === 0) {
    for (const dest of SEED_DESTINATIONS) {
      await db
        .insert(destinations)
        .values({
          slug: dest.slug,
          name: dest.name,
          devanagariName: dest.devanagariName,
          region: dest.region,
          tagline: dest.tagline,
          summary: dest.summary,
          culturalSignificance: dest.culturalSignificance,
          historicalContext: dest.historicalContext,
          attractions: dest.attractions,
          featuredImage: dest.featuredImage,
          gallery: dest.gallery,
          transportInfo: dest.transportInfo,
          travelTips: dest.travelTips,
          coordinates: dest.coordinates,
          relatedPackageSlugs: dest.relatedPackageSlugs,
          seoTitle: dest.seoTitle,
          seoDescription: dest.seoDescription,
          displayOrder: dest.displayOrder,
        })
        .onConflictDoNothing({ target: destinations.slug });
    }
  }

  const [vehCount] = await db.select({ total: count() }).from(vehicles);
  if ((vehCount?.total ?? 0) === 0) {
    for (const veh of SEED_VEHICLES) {
      await db
        .insert(vehicles)
        .values(veh)
        .onConflictDoNothing({ target: vehicles.slug });
    }
  }

  const [artCount] = await db.select({ total: count() }).from(articles);
  if ((artCount?.total ?? 0) === 0) {
    for (const art of SEED_ARTICLES) {
      await db
        .insert(articles)
        .values(art)
        .onConflictDoNothing({ target: articles.slug });
    }
  }

  const [faqCount] = await db.select({ total: count() }).from(faqs);
  if ((faqCount?.total ?? 0) === 0) {
    for (const item of SEED_FAQS) {
      await db.insert(faqs).values(item);
    }
  }

  const defaultSettings: { key: string; value: string }[] = [
    { key: 'brandPhone', value: '+91 95222 33375' },
    { key: 'brandWhatsapp', value: '919522233375' },
    { key: 'brandLocation', value: 'Ujjain, Madhya Pradesh, India' },
    { key: 'contactEmail', value: '' },
    { key: 'instagramUrl', value: '' },
    { key: 'facebookUrl', value: '' },
    { key: 'youtubeUrl', value: '' },
  ];

  for (const setting of defaultSettings) {
    await db
      .insert(siteSettings)
      .values(setting)
      .onConflictDoNothing({ target: siteSettings.key });
  }

  await syncVerifiedSeedMedia();
  seededSuccessfully = true;
}

export async function ensureSeeded(): Promise<void> {
  if (seededSuccessfully) return;
  if (!seedPromise) {
    seedPromise = runSeed().catch((err) => {
      seedPromise = null;
      throw err;
    });
  }
  await seedPromise;
}
