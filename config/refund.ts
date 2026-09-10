/**
 * Refund Policy configuration — Document 13.06.
 *
 * Use verified values only. Do not invent refund windows, refill periods,
 * processing SLAs, or contact details.
 */

import { brand } from '@/config/brand';
import { site } from '@/config/site';
import type { RefundConfig } from '@/types/legal';

function isPlaceholderEmail(email: string | undefined): boolean {
  if (!email?.trim()) return true;
  const value = email.trim().toLowerCase();
  return (
    value.endsWith('@example.com') ||
    value.endsWith('@example.org') ||
    value.endsWith('@example.net') ||
    value.includes('placeholder')
  );
}

/**
 * Current Refund Policy configuration.
 * Verified: InstantViral display name, instantviral.ca, support@instantviral.ca,
 * and the site-wide 30-day money-back guarantee already published in FAQ, trust
 * strips, and checkout (subject to this policy and package conditions).
 * Refill durations come from real package data on service pages — not from this file.
 */
export const refundConfig: RefundConfig = {
  legalBusinessName: brand.legalName,
  operatingName: brand.name,
  websiteDomain: site.domain,

  supportEmail: site.supportEmail,
  mailingAddress: undefined,
  effectiveDate: '2026-09-09',
  lastUpdatedDate: '2026-09-09',
  processingTimeDescription:
    'Eligible refund and refill requests are reviewed after InstantViral receives the order ID, checkout email, and a clear description of the issue. Timing can vary with order status and operational workload. InstantViral does not promise a fixed approval timeframe on this page.',
  eligibleMoneyBackWindowLabel: '30 days',

  operationalPolicyVerified: true,
  publicationStatus: 'published',
  legalReviewCompleted: false,
};

/** Support/contact email only when configured and not a placeholder. */
export function getVerifiedRefundContactEmail(
  config: RefundConfig = refundConfig,
): string | undefined {
  const email = config.supportEmail?.trim() || site.supportEmail;
  if (!email || isPlaceholderEmail(email)) return undefined;
  return email;
}
