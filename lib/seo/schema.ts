import type { JsonLd } from '@/schemas';

/** Serialize JSON-LD for <script type="application/ld+json">. */
export function serializeJsonLd(data: JsonLd | JsonLd[]): string {
  return JSON.stringify(data).replace(/</g, '\\u003c');
}

export function asJsonLdGraph(items: Array<JsonLd | null | undefined>): JsonLd {
  const graph = items.filter(Boolean) as JsonLd[];
  return {
    '@context': 'https://schema.org',
    '@graph': graph.map((item) => {
      // Strip nested @context when embedding in @graph
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { '@context': _context, ...rest } = item;
      return rest;
    }),
  };
}
