/**
 * CTA getters — Document 14.06.
 */

import { getCtaRegistry } from '@/data/ctas/registry';
import { dedupeCtas, sortCtas } from '@/lib/ctas/dedupe';
import { sanitizeCtasForPublic } from '@/lib/ctas/sanitize';
import type { CtaPageLocation, CtaRecord, CtaVariant, PublicCta } from '@/types/cta';
import type { PlatformId } from '@/types/platform';

function activePublic(source?: CtaRecord[]): PublicCta[] {
  return sortCtas(dedupeCtas(sanitizeCtasForPublic(source ?? getCtaRegistry())));
}

export function getActiveCtas(source?: CtaRecord[]): PublicCta[] {
  return activePublic(source);
}

export function getCtasByPage(
  location: CtaPageLocation,
  options?: {
    source?: CtaRecord[];
    variant?: CtaVariant;
    limit?: number;
  },
): PublicCta[] {
  let result = activePublic(options?.source).filter((cta) =>
    cta.pageLocations.includes(location),
  );

  if (options?.variant) {
    result = result.filter((cta) => cta.variant === options.variant);
  }

  if (typeof options?.limit === 'number') {
    result = result.slice(0, options.limit);
  }

  return result;
}

export function getCtasByService(
  serviceSlug: string,
  options?: { source?: CtaRecord[]; limit?: number },
): PublicCta[] {
  let result = activePublic(options?.source).filter(
    (cta) =>
      cta.serviceSlug === serviceSlug ||
      cta.pageLocations.includes('service_page'),
  );

  // Prefer exact service matches first
  result = [
    ...result.filter((cta) => cta.serviceSlug === serviceSlug),
    ...result.filter((cta) => cta.serviceSlug !== serviceSlug),
  ];

  result = dedupeCtas(result);

  if (typeof options?.limit === 'number') {
    result = result.slice(0, options.limit);
  }

  return result;
}

export function getCtasByPlatform(
  platform: PlatformId,
  options?: { source?: CtaRecord[]; limit?: number },
): PublicCta[] {
  let result = activePublic(options?.source).filter(
    (cta) => cta.platform === platform || (!cta.platform && !cta.serviceSlug),
  );

  // Prefer platform-specific
  result = [
    ...result.filter((cta) => cta.platform === platform),
    ...result.filter((cta) => cta.platform !== platform),
  ];

  result = dedupeCtas(result);

  if (typeof options?.limit === 'number') {
    result = result.slice(0, options.limit);
  }

  return result;
}

export function getCtasByVariant(
  variant: CtaVariant,
  source?: CtaRecord[],
): PublicCta[] {
  return activePublic(source).filter((cta) => cta.variant === variant);
}

export function getCtaById(id: string, source?: CtaRecord[]): PublicCta | null {
  return activePublic(source).find((cta) => cta.id === id) ?? null;
}
