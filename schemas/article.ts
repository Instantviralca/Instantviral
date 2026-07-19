import { absoluteUrl } from '@/seo/canonical';
import { site } from '@/config/site';
import type { LearnArticle } from '@/types/blog';
import type { JsonLd } from '@/schemas/organization';

export function articleSchema(input: {
  article: LearnArticle;
  description: string;
  path: string;
}): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: input.article.title,
    description: input.description,
    mainEntityOfPage: absoluteUrl(input.path),
    author: {
      '@type': 'Organization',
      name: site.name,
    },
    publisher: {
      '@type': 'Organization',
      name: site.name,
      url: absoluteUrl('/'),
    },
  };
}
