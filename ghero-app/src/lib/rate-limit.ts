/**
 * Rate limiter for API routes (fixed window per key).
 *
 * Uses Upstash Redis (REST) when UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN are set, so limits
 * hold across serverless instances. Without them, or if Redis is unreachable, it falls back to an
 * in-memory map, which is only per-instance (fine for local development, weak on Vercel).
 */

interface RateLimitEntry {
  count: number;
  resetAt: number;
}

const rateLimitMap = new Map<string, RateLimitEntry>();

// Clean up expired entries every 5 minutes
setInterval(() => {
  const now = Date.now();
  for (const [key, entry] of rateLimitMap) {
    if (entry.resetAt < now) {
      rateLimitMap.delete(key);
    }
  }
}, 5 * 60 * 1000);

interface RateLimitOptions {
  /** Unique key for the rate limit (e.g., email, IP) */
  key: string;
  /** Maximum number of requests allowed in the window */
  limit: number;
  /** Time window in seconds */
  windowSeconds: number;
}

interface RateLimitResult {
  success: boolean;
  remaining: number;
  resetAt: number;
}

/**
 * Check and enforce rate limiting.
 *
 * @example
 * const result = await rateLimit({ key: `otp:${email}`, limit: 5, windowSeconds: 3600 });
 * if (!result.success) {
 *   return Response.json({ error: "Too many requests" }, { status: 429 });
 * }
 */
async function redisRateLimit(key: string, limit: number, windowSeconds: number): Promise<RateLimitResult> {
  const url = process.env.UPSTASH_REDIS_REST_URL!;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN!;
  const res = await fetch(`${url.replace(/\/+$/, "")}/pipeline`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify([
      ["INCR", key],
      ["EXPIRE", key, String(windowSeconds), "NX"],
      ["PTTL", key],
    ]),
    signal: AbortSignal.timeout(1500),
  });
  if (!res.ok) throw new Error(`Upstash responded ${res.status}`);
  const [incr, , pttl] = (await res.json()) as { result: number }[];
  const count = incr.result;
  return { success: count <= limit, remaining: Math.max(0, limit - count), resetAt: Date.now() + Math.max(0, pttl.result) };
}

export async function rateLimit(options: RateLimitOptions): Promise<RateLimitResult> {
  if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
    try {
      return await redisRateLimit(`rl:${options.key}`, options.limit, options.windowSeconds);
    } catch (error) {
      console.error("[rate-limit] Redis unavailable, using in-memory fallback:", error);
    }
  }
  return memoryRateLimit(options);
}

function memoryRateLimit({ key, limit, windowSeconds }: RateLimitOptions): RateLimitResult {
  const now = Date.now();
  const windowMs = windowSeconds * 1000;
  const prefixedKey = `rl:${key}`;

  const entry = rateLimitMap.get(prefixedKey);

  if (!entry || entry.resetAt < now) {
    // New window
    const resetAt = now + windowMs;
    rateLimitMap.set(prefixedKey, { count: 1, resetAt });
    return { success: true, remaining: limit - 1, resetAt };
  }

  if (entry.count >= limit) {
    return { success: false, remaining: 0, resetAt: entry.resetAt };
  }

  entry.count++;
  return { success: true, remaining: limit - entry.count, resetAt: entry.resetAt };
}
