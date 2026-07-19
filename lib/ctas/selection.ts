/**
 * Page-specific CTA selection — Document 14.06.
 */

import {
  getCtasByPage,
  getCtasByService,
} from '@/lib/ctas/getters';
import { dedupeCtas } from '@/lib/ctas/dedupe';
import type { CtaPageLocation, PublicCta } from '@/types/cta';

export type PageCtaSelection = {
  primary?: PublicCta;
  secondary?: PublicCta;
  informational?: PublicCta[];
  crossSell?: PublicCta[];
  all: PublicCta[];
};

/**
 * Select CTAs for a page surface without duplicates.
 */
export function selectPageCtas(
  location: CtaPageLocation,
  options?: {
    serviceSlug?: string;
    limit?: number;
  },
): PageCtaSelection {
  const fromPage = getCtasByPage(location, { limit: options?.limit ?? 8 });
  const fromService = options?.serviceSlug
    ? getCtasByService(options.serviceSlug, { limit: 6 })
    : [];

  const all = dedupeCtas([...fromService, ...fromPage]).slice(
    0,
    options?.limit ?? 8,
  );

  const primary = all.find((cta) => cta.variant === 'primary');
  const secondary = all.find(
    (cta) => cta.variant === 'secondary' && cta.id !== primary?.id,
  );
  const informational = all.filter((cta) => cta.variant === 'informational');
  const crossSell = all.filter((cta) => cta.variant === 'cross_sell');

  return {
    primary,
    secondary,
    informational,
    crossSell,
    all,
  };
}

/** Pair of primary + secondary for Final CTA sections. */
export function selectFinalCtaPair(location: CtaPageLocation): {
  primary: PublicCta;
  secondary?: PublicCta;
} | null {
  const selection = selectPageCtas(location, { limit: 6 });
  if (!selection.primary) return null;
  return {
    primary: selection.primary,
    secondary: selection.secondary,
  };
}
