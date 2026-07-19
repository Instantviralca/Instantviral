/**
 * Future server-side search rate limiting — Document 15.05.
 * Version 1 search is client-side metadata only; this stub prepares endpoints.
 */

export type SearchRateLimitDecision = {
  allowed: boolean;
  retryAfterSeconds?: number;
  reason?: string;
};

/**
 * Placeholder for protecting future `/api/learn/search` endpoints.
 * Always allows in Version 1 (no remote search yet).
 */
export function prepareSearchRateLimit(input?: {
  ipHash?: string;
  windowMs?: number;
  maxRequests?: number;
}): SearchRateLimitDecision {
  void input;
  return { allowed: true };
}
