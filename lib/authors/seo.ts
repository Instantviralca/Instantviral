/**
 * Author page metadata — Document 15.03.
 */

import type { Metadata } from 'next';

import { getAuthorBySlug } from '@/lib/authors/getters';
import { authorPath, authorsIndexPath } from '@/lib/authors/paths';
import { buildPageMetadata } from '@/lib/seo/metadata/build';
import { AUTHOR_INDEX_SEO } from '@/config/authors';

export function getAuthorMetadata(slug: string): Metadata | null {
  const author = getAuthorBySlug(slug);
  if (!author) {
    return null;
  }

  return buildPageMetadata({
    title: author.seo.title,
    description: author.seo.description,
    path: author.seo.canonicalPath || authorPath(author.slug),
    type: 'website',
    images: author.seo.ogImage
      ? [author.seo.ogImage]
      : author.avatar
        ? [author.avatar]
        : undefined,
    robots: { index: true, follow: true },
  });
}

export function getAuthorsIndexMetadata(): Metadata {
  return buildPageMetadata({
    title: AUTHOR_INDEX_SEO.title,
    description: AUTHOR_INDEX_SEO.description,
    path: authorsIndexPath(),
    type: 'website',
    robots: { index: true, follow: true },
  });
}
