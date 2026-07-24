import { seoSiteConfig } from '@/config/seo';
import { getActiveLearnCategories } from '@/data/learn/categories';
import { absoluteUrl, buildCanonicalUrl } from '@/lib/seo/metadata/canonical';
import { sanitizeMetadataText } from '@/lib/seo/metadata/sanitize';
import type { MetadataEntry } from '@/types/seo-metadata';
import type { Metadata } from 'next';

export type OpenGraphBuildInput = {
  title: string;
  description: string;
  path: string;
  type?: 'website' | 'article';
  image?: string;
  imageAlt?: string;
};

function isLearnCategoryRoute(route: string): boolean {
  const match = route.match(/^\/learn\/([^/]+)$/);
  if (!match?.[1]) return false;
  return getActiveLearnCategories().some((category) => category.slug === match[1]);
}

function isLearnArticleRoute(route: string): boolean {
  const match = route.match(/^\/learn\/([^/]+)$/);
  if (!match?.[1] || match[1] === 'tag' || match[1] === 'preview') return false;
  return !isLearnCategoryRoute(route);
}

export function buildOpenGraphMetadata(
  input: OpenGraphBuildInput,
): NonNullable<Metadata['openGraph']> {
  const title = sanitizeMetadataText(input.title);
  const description = sanitizeMetadataText(input.description);
  const imagePath = input.image ?? seoSiteConfig.defaultOpenGraphImage;
  const imageUrl = imagePath.startsWith('http')
    ? imagePath
    : absoluteUrl(imagePath);

  return {
    title,
    description,
    url: buildCanonicalUrl(input.path),
    siteName: seoSiteConfig.siteName,
    locale: seoSiteConfig.defaultLocale,
    type: input.type ?? 'website',
    images: [
      {
        url: imageUrl,
        width: seoSiteConfig.defaultOpenGraphImageWidth,
        height: seoSiteConfig.defaultOpenGraphImageHeight,
        alt: sanitizeMetadataText(input.imageAlt ?? title),
      },
    ],
  };
}

export function buildOpenGraphFromEntry(
  entry: MetadataEntry,
): NonNullable<Metadata['openGraph']> {
  return buildOpenGraphMetadata({
    title: entry.openGraphTitle ?? entry.title,
    description: entry.openGraphDescription ?? entry.description,
    path: entry.canonicalPath,
    type: isLearnArticleRoute(entry.route) ? 'article' : 'website',
    image: entry.openGraphImage,
    imageAlt: entry.openGraphImageAlt ?? entry.openGraphTitle ?? entry.title,
  });
}
