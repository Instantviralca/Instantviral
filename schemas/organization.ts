/**
 * Organization schema — Document 14.06.
 * Never emits placeholder "#" social URLs.
 */

import { absoluteUrl } from '@/seo/canonical';
import { brand } from '@/config/brand';
import { site } from '@/config/site';

export type JsonLd = Record<string, unknown>;

function officialSameAs(): string[] {
  return Object.values(site.socialLinks).filter((url) => {
    if (typeof url !== 'string') return false;
    const value = url.trim();
    return value.length > 0 && value !== '#' && /^https?:\/\//i.test(value);
  });
}

export function organizationSchema(): JsonLd {
  const sameAs = officialSameAs();
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: brand.name,
    alternateName: brand.legalName,
    description: brand.mission,
    slogan: brand.tagline,
    url: absoluteUrl('/'),
    email: site.supportEmail,
    ...(sameAs.length > 0 ? { sameAs } : {}),
  };
}
