import { brand } from '@/config/brand';
import { routes } from '@/config/routes';
import { getCtaById } from '@/lib/ctas';
import type { CTAContent, SharedCtaCatalog } from '@/types/content';

/**
 * Legacy named CTA catalog — Document 14.06 bridges to the shared registry.
 */
function fromRegistry(
  id: string,
  fallback: CTAContent,
): CTAContent {
  const cta = getCtaById(id);
  if (!cta) return fallback;
  return {
    label: cta.buttonLabel,
    href: cta.destination,
  };
}

export const ctaCatalog: SharedCtaCatalog = {
  getStarted: fromRegistry('cta-get-started', {
    label: brand.ctaLabels.primary,
    href: routes.home,
  }),
  contactSupport: fromRegistry('cta-contact-support', {
    label: brand.ctaLabels.secondary[2],
    href: routes.contact,
  }),
  browseServices: fromRegistry('cta-browse-services', {
    label: 'Browse Services',
    href: '/buy-instagram-followers',
  }),
  readLearn: fromRegistry('cta-learn-more', {
    label: brand.ctaLabels.secondary[0],
    href: routes.learn,
  }),
  viewReviews: {
    label: 'Read Reviews',
    href: routes.reviews,
  },
};

export function getCtaCatalog(): SharedCtaCatalog {
  return ctaCatalog;
}

/** Resolve a named CTA, optionally overriding href (e.g. service-specific). */
export function resolveCta(
  key: keyof SharedCtaCatalog,
  overrides?: Partial<CTAContent>,
): CTAContent {
  return { ...ctaCatalog[key], ...overrides };
}

/** Brand-approved CTA label list (for content tooling). */
export function getApprovedCtaLabels(): string[] {
  return [brand.ctaLabels.primary, ...brand.ctaLabels.secondary];
}
