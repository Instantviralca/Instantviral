import { absoluteUrl } from '@/seo/canonical';
import type { JsonLd } from '@/schemas/organization';

/** ContactPage JSON-LD (Document 13.02). */
export function contactPageSchema(input: {
  title: string;
  description: string;
  path: string;
}): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: input.title,
    description: input.description,
    url: absoluteUrl(input.path),
  };
}
