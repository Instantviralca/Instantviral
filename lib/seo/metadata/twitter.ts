/**
 * Twitter/X card metadata — Document 14.07.
 * Only includes a handle when verified in configuration.
 */

import { seoSiteConfig } from '@/config/seo';
import { absoluteUrl } from '@/lib/seo/metadata/canonical';
import { sanitizeMetadataText } from '@/lib/seo/metadata/sanitize';
import type { MetadataEntry } from '@/types/seo-metadata';
import type { Metadata } from 'next';

export type TwitterBuildInput = {
  title: string;
  description: string;
  image?: string;
  imageAlt?: string;
};

export function buildTwitterMetadata(
  input: TwitterBuildInput,
): NonNullable<Metadata['twitter']> {
  const imagePath = input.image ?? seoSiteConfig.defaultOpenGraphImage;
  const imageUrl = imagePath.startsWith('http')
    ? imagePath
    : absoluteUrl(imagePath);

  const base: NonNullable<Metadata['twitter']> = {
    card: seoSiteConfig.twitterCard,
    title: sanitizeMetadataText(input.title),
    description: sanitizeMetadataText(input.description),
    images: [imageUrl],
  };

  if (seoSiteConfig.twitterHandle) {
    return {
      ...base,
      site: seoSiteConfig.twitterHandle,
    };
  }

  return base;
}

export function buildTwitterFromEntry(
  entry: MetadataEntry,
): NonNullable<Metadata['twitter']> {
  return buildTwitterMetadata({
    title: entry.twitterTitle ?? entry.title,
    description: entry.twitterDescription ?? entry.description,
    image: entry.twitterImage ?? entry.openGraphImage,
    imageAlt: entry.twitterTitle ?? entry.title,
  });
}
