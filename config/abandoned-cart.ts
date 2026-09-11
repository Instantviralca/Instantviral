/**
 * Abandoned cart recovery — hosting-neutral configuration.
 * Timings live here (and optional env overrides), not scattered across components.
 *
 * Contabo-ready: the same values drive the Node recovery processor whether
 * invoked by protected API cron, Linux cron, or a long-running worker.
 */

export type AbandonedCartStatus = 'active' | 'abandoned' | 'recovered' | 'lost';

export type RecoveryEmailStepConfig = {
  /** 1-based sequence number */
  step: number;
  /** Minutes after the cart becomes abandoned */
  delayMinutes: number;
  /**
   * Reserved for a future discount feature (not applied in v1).
   * Example: { type: 'percentage', value: 10, couponCode: 'SAVE10' }
   */
  futureDiscount?: {
    type: 'percentage' | 'fixed';
    value: number;
    couponCode?: string;
  } | null;
};

function envInt(key: string, fallback: number): number {
  const raw = process.env[key]?.trim();
  if (!raw) return fallback;
  const n = Number.parseInt(raw, 10);
  return Number.isFinite(n) && n > 0 ? n : fallback;
}

/** Inactivity before an active checkout is marked abandoned (default 60 minutes). */
export function getAbandonedCartInactivityMinutes(): number {
  return envInt('ABANDONED_CART_INACTIVITY_MINUTES', 60);
}

/** Days to keep abandoned-cart tracking rows (default 90). Never deletes orders. */
export function getAbandonedCartRetentionDays(): number {
  return envInt('ABANDONED_CART_RETENTION_DAYS', 90);
}

/** Recovery token lifetime (default 14 days). */
export function getAbandonedCartTokenTtlDays(): number {
  return envInt('ABANDONED_CART_TOKEN_TTL_DAYS', 14);
}

/**
 * Recovery email schedule — minutes after `abandoned_at`.
 * Defaults: 1h, 24h, 72h.
 */
export function getRecoveryEmailSequence(): RecoveryEmailStepConfig[] {
  const step1 = envInt('ABANDONED_CART_EMAIL_1_DELAY_MINUTES', 60);
  const step2 = envInt('ABANDONED_CART_EMAIL_2_DELAY_MINUTES', 24 * 60);
  const step3 = envInt('ABANDONED_CART_EMAIL_3_DELAY_MINUTES', 72 * 60);
  return [
    { step: 1, delayMinutes: step1, futureDiscount: null },
    { step: 2, delayMinutes: step2, futureDiscount: null },
    { step: 3, delayMinutes: step3, futureDiscount: null },
  ];
}

export const ABANDONED_CART_COOKIE = 'iv_ac_session';
export const ABANDONED_CART_COOKIE_MAX_AGE_SECONDS = 60 * 60 * 24 * 14;

/** Shared secret for the recovery job endpoint (provider-neutral). */
export function getAbandonedCartCronSecret(): string | undefined {
  const value =
    process.env.ABANDONED_CART_CRON_SECRET?.trim() ||
    process.env.CRON_SECRET?.trim();
  return value || undefined;
}
