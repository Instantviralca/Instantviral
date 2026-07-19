/**
 * CTA destination validation — Document 14.06 (internal links only).
 */

import { routes } from '@/config/routes';
import { isApprovedServiceSlug } from '@/data/linking/approved-services';
import { getLinkPageBySlug } from '@/data/linking/registry';
import type { CtaDestinationValidation } from '@/types/cta';

const STATIC_INTERNAL = new Set<string>(Object.values(routes));

function pathOnly(destination: string): string {
  return destination.trim().split(/[?#]/)[0] ?? '';
}

/**
 * Version 1: internal destinations only; must resolve to an active route/page.
 */
export function validateCtaDestination(destination: string): CtaDestinationValidation {
  const trimmed = destination.trim();

  if (!trimmed) {
    return { destination: trimmed, valid: false, reason: 'Empty destination' };
  }

  if (trimmed.startsWith('http://') || trimmed.startsWith('https://') || trimmed.startsWith('//')) {
    return {
      destination: trimmed,
      valid: false,
      reason: 'External destinations are not allowed in Version 1',
    };
  }

  // In-page anchors (service pricing, etc.) — internal only
  if (trimmed.startsWith('#') && trimmed.length > 1 && !trimmed.includes('://')) {
    return { destination: trimmed, valid: true };
  }

  if (!trimmed.startsWith('/')) {
    return {
      destination: trimmed,
      valid: false,
      reason: 'Destination must be an internal path starting with /',
    };
  }

  const path = pathOnly(trimmed);

  if (STATIC_INTERNAL.has(path) || path === '/') {
    return { destination: trimmed, valid: true };
  }

  if (path.startsWith('/buy-')) {
    const slug = path.slice(1);
    if (!isApprovedServiceSlug(slug)) {
      return {
        destination: trimmed,
        valid: false,
        reason: `Skipped or unknown service destination "${slug}"`,
      };
    }
    const page = getLinkPageBySlug(slug);
    if (page && !page.active) {
      return {
        destination: trimmed,
        valid: false,
        reason: `Inactive service destination "${slug}"`,
      };
    }
    return { destination: trimmed, valid: true };
  }

  if (path.startsWith('/learn/')) {
    const articleSlug = path.slice('/learn/'.length);
    const page = getLinkPageBySlug(`learn/${articleSlug}`);
    if (!page || !page.active) {
      return {
        destination: trimmed,
        valid: false,
        reason: `Unknown or inactive learn destination "${path}"`,
      };
    }
    return { destination: trimmed, valid: true };
  }

  const slug = path === '/' ? 'home' : path.replace(/^\//, '');
  const page = getLinkPageBySlug(slug);
  if (page?.active) {
    return { destination: trimmed, valid: true };
  }

  return {
    destination: trimmed,
    valid: false,
    reason: `Unknown or inactive internal destination "${path}"`,
  };
}

export function isValidCtaDestination(destination: string): boolean {
  return validateCtaDestination(destination).valid;
}
