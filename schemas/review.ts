import type { JsonLd } from '@/schemas/organization';

export type ReviewInput = {
  author: string;
  reviewBody: string;
  ratingValue: number;
  bestRating?: number;
  worstRating?: number;
  datePublished?: string;
  itemReviewed?: JsonLd;
};

/**
 * Single Review JSON-LD node.
 * Callers must only pass sanitized, eligible, public review fields.
 */
export function reviewSchema(input: ReviewInput): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'Review',
    author: {
      '@type': 'Person',
      name: input.author,
    },
    reviewBody: input.reviewBody,
    ...(input.datePublished ? { datePublished: input.datePublished } : {}),
    ...(input.itemReviewed ? { itemReviewed: input.itemReviewed } : {}),
    reviewRating: {
      '@type': 'Rating',
      ratingValue: input.ratingValue,
      bestRating: input.bestRating ?? 5,
      ...(input.worstRating != null ? { worstRating: input.worstRating } : {}),
    },
  };
}

export function aggregateRatingSchema(input: {
  ratingValue: number;
  reviewCount: number;
  bestRating?: number;
  worstRating?: number;
}): JsonLd {
  return {
    '@type': 'AggregateRating',
    ratingValue: input.ratingValue,
    reviewCount: input.reviewCount,
    bestRating: input.bestRating ?? 5,
    worstRating: input.worstRating ?? 1,
  };
}
