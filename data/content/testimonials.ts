import type { Testimonial } from '@/types/content';

/**
 * Shared testimonials pool (legacy). Pages historically referenced by id.
 *
 * Document 14.02 authentic reviews live in `data/reviews/` and power
 * `TestimonialsSection`. Do not migrate these placeholders into Approved reviews.
 *
 * Document 08.11 §10: do not publish fabricated testimonials on production.
 * Entries are clearly labelled development placeholders until genuine
 * review data is available. No Review / AggregateRating schema should be emitted.
 */
export const testimonials: Testimonial[] = [
  {
    id: 't-dev-placeholder-1',
    quote:
      '[Development placeholder] Genuine customer review content is not available yet. This card is not a real testimonial.',
    author: 'Development Placeholder',
    role: 'Not a real customer review',
  },
  {
    id: 't-dev-placeholder-2',
    quote:
      '[Development placeholder] Replace with an authentic review before publishing Review schema or production social proof.',
    author: 'Development Placeholder',
    role: 'Not a real customer review',
  },
  {
    id: 't-dev-placeholder-3',
    quote:
      '[Development placeholder] Keep this section hidden via empty testimonialIds if placeholders must not appear in production.',
    author: 'Development Placeholder',
    role: 'Not a real customer review',
  },
  // Legacy ids still referenced by company / service content shells
  {
    id: 't-creator-ig',
    quote:
      '[Development placeholder] Instagram growth review pending authentic customer content.',
    author: 'Development Placeholder',
    role: 'Not a real customer review',
    platformId: 'instagram',
    relatedServiceSlug: 'buy-instagram-followers',
  },
  {
    id: 't-brand-tt',
    quote:
      '[Development placeholder] TikTok growth review pending authentic customer content.',
    author: 'Development Placeholder',
    role: 'Not a real customer review',
    platformId: 'tiktok',
    relatedServiceSlug: 'buy-tiktok-followers',
  },
  {
    id: 't-creator-yt',
    quote:
      '[Development placeholder] YouTube growth review pending authentic customer content.',
    author: 'Development Placeholder',
    role: 'Not a real customer review',
    platformId: 'youtube',
    relatedServiceSlug: 'buy-youtube-subscribers',
  },
  {
    id: 't-business-fb',
    quote:
      '[Development placeholder] Facebook growth review pending authentic customer content.',
    author: 'Development Placeholder',
    role: 'Not a real customer review',
    platformId: 'facebook',
    relatedServiceSlug: 'buy-facebook-page-likes',
  },
  {
    id: 't-agency',
    quote:
      '[Development placeholder] Agency review pending authentic customer content.',
    author: 'Development Placeholder',
    role: 'Not a real customer review',
  },
];

export function getAllTestimonials(): Testimonial[] {
  return testimonials;
}

export function getTestimonialById(id: string): Testimonial | undefined {
  return testimonials.find((item) => item.id === id);
}

export function getTestimonialsByIds(ids: string[]): Testimonial[] {
  return ids
    .map((id) => getTestimonialById(id))
    .filter((item): item is Testimonial => Boolean(item));
}
