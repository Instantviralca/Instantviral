import { absoluteUrl } from '@/seo/canonical';
import { site } from '@/config/site';
import { routes } from '@/config/routes';
import type { JsonLd } from '@/schemas/organization';

export function websiteSchema(): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: site.name,
    url: absoluteUrl('/'),
    publisher: {
      '@type': 'Organization',
      name: site.name,
      url: absoluteUrl('/'),
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${absoluteUrl(routes.learn)}?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

export function webPageSchema(input: {
  title: string;
  description: string;
  path: string;
  /** Optional absolute URL override — must match metadata canonical. */
  url?: string;
}): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: input.title,
    description: input.description,
    url: input.url ?? absoluteUrl(input.path),
    isPartOf: {
      '@type': 'WebSite',
      name: site.name,
      url: absoluteUrl('/'),
    },
  };
}

export function collectionPageSchema(input: {
  title: string;
  description: string;
  path: string;
  url?: string;
}): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: input.title,
    description: input.description,
    url: input.url ?? absoluteUrl(input.path),
    isPartOf: {
      '@type': 'WebSite',
      name: site.name,
      url: absoluteUrl('/'),
    },
  };
}
