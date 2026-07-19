/**
 * Author Person + page JSON-LD — Document 15.03.
 * Never includes private email or internal notes.
 */

import { absoluteUrl } from '@/seo/canonical';
import { brand } from '@/config/brand';
import { site } from '@/config/site';
import { authorPath, authorsIndexPath } from '@/lib/authors/paths';
import type { PublicAuthor } from '@/types/author';
import type { BreadcrumbItem } from '@/types/shared';
import type { JsonLd } from '@/schemas/organization';
import { breadcrumbSchema } from '@/schemas/breadcrumb';

function sameAsFromAuthor(author: PublicAuthor): string[] {
  const links: string[] = [];
  if (author.website) links.push(author.website);
  if (author.socialLinks) {
    for (const value of Object.values(author.socialLinks)) {
      if (value) links.push(value);
    }
  }
  return links;
}

/**
 * Person schema for an active public author.
 * Omits email intentionally (private).
 */
export function getAuthorSchema(author: PublicAuthor): JsonLd {
  const sameAs = sameAsFromAuthor(author);

  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: author.name,
    description: author.bio,
    jobTitle: author.role,
    url: absoluteUrl(author.profilePath || authorPath(author.slug)),
    image: author.avatar ? absoluteUrl(author.avatar) : undefined,
    knowsAbout: author.expertise.length ? [...author.expertise] : undefined,
    sameAs: sameAs.length ? sameAs : undefined,
    worksFor: {
      '@type': 'Organization',
      name: brand.name,
      url: absoluteUrl('/'),
    },
  };
}

export function getAuthorBreadcrumbs(author: PublicAuthor): BreadcrumbItem[] {
  return [
    { label: 'Home', href: '/' },
    { label: 'Authors', href: authorsIndexPath() },
    { label: author.name, href: author.profilePath },
  ];
}

export function getAuthorPageJsonLd(author: PublicAuthor): JsonLd[] {
  const crumbs = breadcrumbSchema(getAuthorBreadcrumbs(author));
  return [
    getAuthorSchema(author),
    ...(crumbs ? [crumbs] : []),
  ];
}

export function getAuthorsIndexJsonLd(): JsonLd[] {
  const crumbs = breadcrumbSchema([
    { label: 'Home', href: '/' },
    { label: 'Authors', href: authorsIndexPath() },
  ]);
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: 'Authors',
      description: `Contributors to ${site.name} Learn.`,
      url: absoluteUrl(authorsIndexPath()),
      isPartOf: {
        '@type': 'WebSite',
        name: site.name,
        url: absoluteUrl('/'),
      },
    },
    ...(crumbs ? [crumbs] : []),
  ];
}
