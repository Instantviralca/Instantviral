/**
 * Public marketing href for approved services.
 * Distinguishes internal service slug from public URL (e.g. IG followers → `/`).
 */

import { routes } from '@/config/routes';
import { getServiceBySlug } from '@/data/services';

export const IG_FOLLOWERS_SERVICE_SLUG = 'buy-instagram-followers' as const;
export const IG_FOLLOWERS_PRICING_HASH = '#pricing-packages' as const;

/** Labels that imply package/pricing selection rather than broad buy intent. */
export function isPackagesOrientedLabel(label?: string): boolean {
  if (!label?.trim()) return false;
  const lower = label.toLowerCase();
  return (
    lower.includes('package') ||
    lower.includes('pricing') ||
    lower.includes('plans')
  );
}

/**
 * Resolve the public href for a service slug.
 * Instagram Followers is consolidated on the homepage; package-oriented labels
 * deep-link to `#pricing-packages`.
 */
export function resolveServiceMarketingHref(
  slug: string,
  options?: { label?: string },
): string {
  const service = getServiceBySlug(slug);
  const base = service?.url ?? `/${slug}`;

  if (slug !== IG_FOLLOWERS_SERVICE_SLUG) {
    return base;
  }

  if (isPackagesOrientedLabel(options?.label)) {
    return `${routes.home}${IG_FOLLOWERS_PRICING_HASH}`;
  }

  return routes.home;
}
