/**
 * Expand bridge payload for CTA / linking metadata safely.
 */

import { trackEvent } from '@/lib/analytics/core/track';
import type { AnalyticsEventInput, AnalyticsTrackResult } from '@/types/analytics';
import type { PlatformId } from '@/types/platform';

function inferPlatform(serviceSlug?: string): PlatformId | undefined {
  if (!serviceSlug) return undefined;
  if (serviceSlug.includes('instagram')) return 'instagram';
  if (serviceSlug.includes('tiktok')) return 'tiktok';
  if (serviceSlug.includes('facebook')) return 'facebook';
  if (serviceSlug.includes('youtube')) return 'youtube';
  return undefined;
}

export type LegacyAnalyticsPayload = {
  href?: string;
  platformId?: string;
  platform?: string;
  serviceSlug?: string;
  packageId?: string;
  faqId?: string;
  cta?: string;
  label?: string;
  quantity?: number;
  displayedPrice?: number;
  currency?: AnalyticsEventInput['currency'];
  value?: number;
  ctaId?: string;
  variant?: string;
  surface?: string;
  reviewId?: string;
  location?: string;
  hasOrderId?: boolean;
  slug?: string;
  sourceSlug?: string;
  warningKind?: string;
  linkId?: string;
};

/**
 * Emit a legacy named event through the canonical analytics pipeline.
 * Username/URL/email fields must never be passed — only safe context.
 */
export function emitLegacyAnalyticsEvent(
  eventName: string,
  payload?: LegacyAnalyticsPayload,
): AnalyticsTrackResult {
  const serviceSlug = payload?.serviceSlug;
  const metadata: AnalyticsEventInput['metadata'] = {};

  if (payload?.faqId) metadata.faqId = payload.faqId;
  if (payload?.cta) metadata.cta = payload.cta;
  if (payload?.ctaId) metadata.ctaId = payload.ctaId;
  if (payload?.variant) metadata.variant = payload.variant;
  if (payload?.surface) metadata.surface = payload.surface;
  if (payload?.reviewId) metadata.reviewId = payload.reviewId;
  if (payload?.location) metadata.location = payload.location;
  if (payload?.hasOrderId !== undefined) metadata.hasOrderId = payload.hasOrderId;
  if (payload?.slug) metadata.slug = payload.slug;
  if (payload?.sourceSlug) metadata.sourceSlug = payload.sourceSlug;
  if (payload?.warningKind) metadata.warningKind = payload.warningKind;
  if (payload?.linkId) metadata.linkId = payload.linkId;
  if (payload?.href && payload.href.startsWith('/')) metadata.href = payload.href;

  const platform =
    (payload?.platform as PlatformId | undefined) ??
    (payload?.platformId as PlatformId | undefined) ??
    inferPlatform(serviceSlug);

  return trackEvent({
    eventName,
    serviceSlug,
    packageId: payload?.packageId,
    platform,
    label: payload?.label,
    quantity: payload?.quantity,
    displayedPrice: payload?.displayedPrice,
    currency: payload?.currency,
    value: payload?.value,
    metadata: Object.keys(metadata).length > 0 ? metadata : undefined,
  });
}
