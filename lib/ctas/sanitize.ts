/**
 * Public CTA projection — Document 14.06.
 */

import { isValidCtaDestination } from '@/data/ctas/destinations';
import type { CtaRecord, PublicCta } from '@/types/cta';

export function sanitizeCtaForPublic(cta: CtaRecord): PublicCta | null {
  if (!cta.active) return null;
  if (!cta.buttonLabel.trim()) return null;
  if (!isValidCtaDestination(cta.destination)) return null;

  return {
    id: cta.id,
    title: cta.title.trim(),
    description: cta.description?.trim() || undefined,
    buttonLabel: cta.buttonLabel.trim(),
    destination: cta.destination.trim(),
    variant: cta.variant,
    icon: cta.icon,
    platform: cta.platform,
    serviceSlug: cta.serviceSlug,
    pageLocations: [...cta.pageLocations],
    order: cta.order,
  };
}

export function sanitizeCtasForPublic(ctas: CtaRecord[]): PublicCta[] {
  return ctas
    .map(sanitizeCtaForPublic)
    .filter((cta): cta is PublicCta => cta !== null);
}
