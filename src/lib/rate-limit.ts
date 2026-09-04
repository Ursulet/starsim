/**
 * Simple in-memory sliding-window rate limiter.
 * No external dependencies — uses a Map with periodic cleanup.
 *
 * NOTE: This works per-process. In a multi-instance deployment,
 * replace with Redis-based rate limiting.
 */

type RateLimitEntry = {
  timestamps: number[];
};

const store = new Map<string, RateLimitEntry>();

// Cleanup stale entries every 5 minutes
const CLEANUP_INTERVAL_MS = 5 * 60 * 1000;
let lastCleanup = Date.now();

function cleanup(windowMs: number) {
  const now = Date.now();
  if (now - lastCleanup < CLEANUP_INTERVAL_MS) return;
  lastCleanup = now;

  const cutoff = now - windowMs;
  for (const [key, entry] of store) {
    entry.timestamps = entry.timestamps.filter((t) => t > cutoff);
    if (entry.timestamps.length === 0) store.delete(key);
  }
}

/**
 * Check if a request should be rate-limited.
 *
 * @param key - Unique identifier (e.g., IP address, email)
 * @param maxRequests - Maximum number of requests allowed in the window
 * @param windowMs - Window size in milliseconds
 * @returns `true` if the request is allowed, `false` if rate-limited
 */
export function rateLimit(
  key: string,
  maxRequests: number,
  windowMs: number
): boolean {
  cleanup(windowMs);

  const now = Date.now();
  const cutoff = now - windowMs;
  const entry = store.get(key);

  if (!entry) {
    store.set(key, { timestamps: [now] });
    return true;
  }

  // Remove expired timestamps
  entry.timestamps = entry.timestamps.filter((t) => t > cutoff);

  if (entry.timestamps.length >= maxRequests) {
    return false; // Rate limited
  }

  entry.timestamps.push(now);
  return true;
}

/** Rate limit presets */
export const RATE_LIMITS = {
  /** 5 login attempts per minute per email */
  LOGIN: { maxRequests: 5, windowMs: 60_000 },
  /** 5 contact messages per minute per IP */
  CONTACT: { maxRequests: 5, windowMs: 60_000 },
  /** 5 newsletter subscriptions per minute per IP */
  NEWSLETTER: { maxRequests: 5, windowMs: 60_000 }
} as const;
