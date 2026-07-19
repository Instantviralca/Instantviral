'use client';

import { useMemo, useState } from 'react';

import { AdminPageHeader } from '@/components/admin/layout/admin-page-header';
import {
  ReviewEditor,
  ReviewFilters,
  ReviewModerationPanel,
  ReviewSearch,
  ReviewsTable,
} from '@/components/admin/reviews';
import { ReviewsEmptyState } from '@/components/reviews/ReviewsEmptyState';
import { getAllReviews } from '@/data/reviews';
import type { AdminReviewFilters } from '@/types/admin-reviews';

/**
 * Admin testimonials / reviews architecture shell — Document 14.02.
 * Backend CRUD is not implemented; data store starts empty (authentic reviews only).
 */
export function ReviewsAdminPage() {
  const reviews = useMemo(() => getAllReviews(), []);
  const [filters, setFilters] = useState<AdminReviewFilters>({
    query: '',
    status: 'all',
    sort: 'newest',
  });
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selected = reviews.find((review) => review.id === selectedId) ?? null;

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Testimonials & Reviews"
        description="Moderate genuine customer reviews. Fabricated testimonials are not allowed."
      />

      {reviews.length === 0 ? (
        <ReviewsEmptyState
          title="No reviews in the catalogue"
          description="The authentic reviews store is empty by design. Add only genuine, consented reviews — never placeholders that appear real."
        />
      ) : (
        <>
          <div className="space-y-3">
            <ReviewSearch
              value={filters.query ?? ''}
              onChange={(query) => setFilters((current) => ({ ...current, query }))}
            />
            <ReviewFilters filters={filters} onChange={setFilters} />
          </div>
          <ReviewsTable reviews={reviews} filters={filters} onSelect={setSelectedId} />
          <ReviewModerationPanel review={selected} />
          <ReviewEditor review={selected} />
        </>
      )}
    </div>
  );
}
