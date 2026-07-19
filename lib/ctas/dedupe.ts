/**
 * Deduplicate CTAs for a single render surface — Document 14.06.
 */

import type { PublicCta } from '@/types/cta';

/**
 * Remove duplicate CTAs by id, then by destination+buttonLabel pairs.
 * Preserves first occurrence (already sorted by order).
 */
export function dedupeCtas(ctas: PublicCta[]): PublicCta[] {
  const seenIds = new Set<string>();
  const seenKeys = new Set<string>();
  const result: PublicCta[] = [];

  for (const cta of ctas) {
    if (seenIds.has(cta.id)) continue;
    const key = `${cta.destination}::${cta.buttonLabel.toLowerCase()}`;
    if (seenKeys.has(key)) continue;
    seenIds.add(cta.id);
    seenKeys.add(key);
    result.push(cta);
  }

  return result;
}

export function sortCtas(ctas: PublicCta[]): PublicCta[] {
  return [...ctas].sort((a, b) => {
    if (a.order !== b.order) return a.order - b.order;
    return a.id.localeCompare(b.id);
  });
}
