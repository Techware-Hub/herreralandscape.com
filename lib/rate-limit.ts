/**
 * Minimal in-memory rate limiter for API routes. This is a basic structure
 * suitable for a single-instance deployment. For production at scale, replace
 * with a shared store (e.g. Upstash Redis / Vercel KV via the Marketplace).
 */
type Entry = { count: number; resetAt: number };

const store = new Map<string, Entry>();

export function rateLimit(
  key: string,
  { limit = 5, windowMs = 60_000 }: { limit?: number; windowMs?: number } = {}
): { ok: boolean; remaining: number } {
  const now = Date.now();
  const entry = store.get(key);

  if (!entry || now > entry.resetAt) {
    store.set(key, { count: 1, resetAt: now + windowMs });
    return { ok: true, remaining: limit - 1 };
  }

  if (entry.count >= limit) {
    return { ok: false, remaining: 0 };
  }

  entry.count += 1;
  return { ok: true, remaining: limit - entry.count };
}

/** Best-effort client IP from request headers. */
export function getClientIp(req: Request): string {
  const fwd = req.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0].trim();
  return req.headers.get("x-real-ip") ?? "unknown";
}
