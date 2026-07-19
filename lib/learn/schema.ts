/**
 * Learn Article JSON-LD — Document 15.01.
 */

import { absoluteUrl } from '@/seo/canonical';
import { site } from '@/config/site';
import { getAuthorById } from '@/lib/authors';
import type { PublicLearnArticle } from '@/types/learn';
import type { JsonLd } from '@/schemas/organization';

export function learnArticleJsonLd(article: PublicLearnArticle): JsonLd {
  const author = getAuthorById(article.authorId);

  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.excerpt || article.seo.description,
    datePublished: article.publishedAt,
    dateModified: article.updatedAt,
    mainEntityOfPage: absoluteUrl(article.href),
    image: article.featuredImage
      ? absoluteUrl(article.featuredImage.src)
      : undefined,
    author: author
      ? {
          '@type': 'Person',
          name: author.name,
          url: absoluteUrl(author.profilePath),
        }
      : {
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
