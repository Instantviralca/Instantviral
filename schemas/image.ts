import { absoluteUrl } from '@/seo/canonical';
import type { JsonLd } from '@/schemas/organization';

export function imageObjectSchema(input: {
  url: string;
  alt: string;
  width?: number;
  height?: number;
}): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'ImageObject',
    contentUrl: input.url.startsWith('http') ? input.url : absoluteUrl(input.url),
    description: input.alt,
    ...(input.width ? { width: input.width } : {}),
    ...(input.height ? { height: input.height } : {}),
  };
}

/** Reserved for future VideoObject schema. */
export function videoObjectSchema(input: {
  name: string;
  description: string;
  thumbnailUrl: string;
  contentUrl?: string;
}): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name: input.name,
    description: input.description,
    thumbnailUrl: input.thumbnailUrl.startsWith('http')
      ? input.thumbnailUrl
      : absoluteUrl(input.thumbnailUrl),
    ...(input.contentUrl ? { contentUrl: input.contentUrl } : {}),
  };
}
