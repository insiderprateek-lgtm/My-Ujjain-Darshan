import { GoogleGenAI, ThinkingLevel } from '@google/genai';

export const CHAT_MODEL = 'gemini-4-hydrogen';

let cachedClient: GoogleGenAI | null = null;
let cachedKeyHash = '';

/**
 * Returns a server-side GoogleGenAI client configured with process.env.GEMINI_API_KEY
 * and the required User-Agent header. Re-initializes cleanly if the secret changes.
 */
export function getGeminiClient(): GoogleGenAI {
  const apiKey = process.env.GEMINI_API_KEY?.trim();
  if (!apiKey || apiKey === 'MY_GEMINI_API_KEY') {
    const err = new Error('GEMINI_API_KEY is not configured on the server.');
    (err as Error & { code?: string }).code = 'MISSING_GEMINI_API_KEY';
    throw err;
  }

  if (!cachedClient || cachedKeyHash !== `${apiKey.length}:${apiKey.slice(0, 4)}`) {
    cachedClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
    cachedKeyHash = `${apiKey.length}:${apiKey.slice(0, 4)}`;
  }

  return cachedClient;
}

/**
 * Retries transient Gemini API failures (429 / 5xx / network) with short
 * exponential backoff while immediately rethrowing auth/validation errors.
 */
export async function withGeminiRetry<T>(
  operation: () => Promise<T>,
  maxRetries = 2
): Promise<T> {
  let lastError: unknown;
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await operation();
    } catch (err: unknown) {
      lastError = err;
      const status =
        typeof (err as { status?: number })?.status === 'number'
          ? (err as { status: number }).status
          : undefined;
      const isRetryable =
        status === 429 ||
        (typeof status === 'number' && status >= 500) ||
        (status === undefined && (err as { code?: string })?.code !== 'MISSING_GEMINI_API_KEY');

      if (!isRetryable || attempt === maxRetries) {
        throw err;
      }

      const delayMs = 400 * Math.pow(2, attempt);
      await new Promise((resolve) => setTimeout(resolve, delayMs));
    }
  }
  throw lastError;
}

export { ThinkingLevel };
