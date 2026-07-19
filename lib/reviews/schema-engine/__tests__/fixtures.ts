import type { Review } from '@/types/reviews';

export function makeReview(overrides: Partial<Review> = {}): Review {
  return {
    id: 'review-1',
    customerName: 'Alex Rivera',
    customerInitials: 'AR',
    platform: 'instagram',
    serviceSlug: 'buy-instagram-followers',
    rating: 5,
    title: 'Clear ordering',
    reviewText: 'The package options were clear and ordering was straightforward.',
    reviewDate: '2026-01-15',
    verifiedPurchase: true,
    source: 'verified_order_feedback',
    status: 'approved',
    featured: true,
    displayLocations: ['homepage', 'service_page', 'about'],
    consentConfirmed: true,
    createdAt: '2026-01-15T00:00:00.000Z',
    updatedAt: '2026-01-15T00:00:00.000Z',
    ...overrides,
  };
}
