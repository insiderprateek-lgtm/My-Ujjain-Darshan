import { db } from './index.ts';
import { users } from './schema.ts';
import { eq } from 'drizzle-orm';

const DEFAULT_ADMIN_EMAILS = ['insiderprateek@gmail.com'];

export function isConfiguredAdminEmail(email: string): boolean {
  const envList = (process.env.ADMIN_EMAILS || '')
    .split(',')
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
  const allowed = new Set([...DEFAULT_ADMIN_EMAILS, ...envList]);
  return allowed.has(email.trim().toLowerCase());
}

export async function getOrCreateUser(
  uid: string,
  email: string,
  displayName?: string | null
) {
  const role = isConfiguredAdminEmail(email) ? 'admin' : 'user';
  try {
    const existing = await db.select().from(users).where(eq(users.uid, uid)).limit(1);
    const resolvedRole =
      role === 'admin' ? 'admin' : existing[0]?.role || 'user';

    const result = await db
      .insert(users)
      .values({
        uid,
        email,
        displayName: displayName || null,
        role: resolvedRole,
      })
      .onConflictDoUpdate({
        target: users.uid,
        set: {
          email,
          displayName: displayName || null,
          role: resolvedRole,
        },
      })
      .returning();

    return result[0];
  } catch (error) {
    console.error('User sync query failed:', error);
    throw new Error('Unable to synchronize user profile.', { cause: error });
  }
}
