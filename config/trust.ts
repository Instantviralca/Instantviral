/**
 * Trust Center badge enablement — Document 14.01.
 * Toggle badges individually without editing component code.
 * Refill / money-back badges stay conditional (eligible only).
 */

import type { TrustBadgeId } from '@/types/trust';

export type TrustBadgeFlags = Record<TrustBadgeId, boolean>;

/**
 * Per-badge enable flags. Content labels live in data/content/trust.ts.
 * Disabled badges are omitted from the Trust Center UI.
 */
export const trustBadgeFlags: TrustBadgeFlags = {
  'trusted-since-2018': true,
  'secure-checkout': true,
  'no-password-required': true,
  'support-24-7': true,
  'real-package-data': true,
  /** Eligible packages only — do not present as universal. */
  'refill-protection': true,
  /** Eligible purchases only — link to Refund Policy in content. */
  'money-back-guarantee': true,
};

export function isTrustBadgeEnabled(id: TrustBadgeId): boolean {
  return trustBadgeFlags[id] === true;
}
