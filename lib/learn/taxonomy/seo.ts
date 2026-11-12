/**
 * Category & tag SEO metadata — Documents 15.04 + 14.07.
 */

import type { Metadata } from 'next';

import { LEARN_TAG_PAGES_ENABLED } from '@/config/learn-taxonomy';
import {
  getCategoryBySlug,
  getTagBySlug,
} from '@/lib/learn/taxonomy/getters';
import { categoryPath, tagPath } from '@/lib/learn/taxonomy/paths';
import { buildPageMetadata } from '@/lib/seo/metadata/build';

export function getCategoryMetadata(slug: string): Metadata {
  const category = getCategoryBySlug(slug);
  if (!category) {
    return buildPageMetadata({
      title: 'Learn | InstantViral',
      description: 'InstantViral Learn Center.',
      path: categoryPath(slug),
      robots: { index: false, follow: false },
    });
  }

  return buildPageMetadata({
    title: category.seo.title,
    description: category.seo.description,
    path: category.seo.canonicalPath ?? categoryPath(category.slug),
    type: 'website',
    images: category.seo.ogImage
      ? [category.seo.ogImage]
      : category.featuredImage
        ? [category.featuredImage]
        : undefined,
    keywords: category.seo.keywords,
    robots: { index: true, follow: true },
  });
}

function buildTagArchiveMetadata(input: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  const metadata = buildPageMetadata({
    ...input,
    type: 'website',
    robots: { index: false, follow: true },
  });
  delete metadata.alternates;
  return metadata;
}

export function getTagMetadata(slug: string): Metadata {
  const tag = getTagBySlug(slug);
  if (!tag || !LEARN_TAG_PAGES_ENABLED) {
    return buildTagArchiveMetadata({
      title: 'Learn | InstantViral',
      description: 'InstantViral Learn Center.',
      path: tagPath(slug),
    });
  }

  if (tag.articleCount < 1) {
    return buildTagArchiveMetadata({
      title: `${tag.name} Guides | Learn | InstantViral`,
      description: tag.description,
      path: tagPath(tag.slug),
    });
  }

  return buildTagArchiveMetadata({
    title: `${tag.name} Guides | Learn | InstantViral`,
    description: tag.description,
    path: tagPath(tag.slug),
  });
}
