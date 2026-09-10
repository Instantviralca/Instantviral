/**
 * Hosting-neutral first-party analytics configuration.
 */

function envInt(key: string, fallback: number): number {
  const raw = process.env[key]?.trim();
  if (!raw) return fallback;
  const n = Number.parseInt(raw, 10);
  return Number.isFinite(n) && n > 0 ? n : fallback;
}

/** Default 30 minutes of inactivity before a new session. */
export function getAnalyticsSessionTimeoutMinutes(): number {
  return envInt('ANALYTICS_SESSION_TIMEOUT_MINUTES', 30);
}

/** Raw analytics_events retention (days). Does not delete orders/payments. */
export function getAnalyticsEventRetentionDays(): number {
  return envInt('ANALYTICS_EVENT_RETENTION_DAYS', 180);
}

export function isFirstPartyAnalyticsEnabled(): boolean {
  const raw = process.env.ANALYTICS_ENABLED?.trim().toLowerCase();
  if (raw === '0' || raw === 'false' || raw === 'no') return false;
  // Fall back to public master switch when set.
  const pub = process.env.NEXT_PUBLIC_ANALYTICS_ENABLED?.trim().toLowerCase();
  if (pub === '0' || pub === 'false' || pub === 'no') return false;
  return true;
}
