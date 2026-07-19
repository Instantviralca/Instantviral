'use client';

import { buildReviewSchemaAdminPreview } from '@/lib/reviews/schema-engine';
import type { ReviewedEntity, ReviewSchemaEngineOptions } from '@/types/review-schema';
import type { Review } from '@/types/reviews';

export type ReviewSchemaPreviewPanelProps = {
  reviews: Review[];
  entity: ReviewedEntity;
  visibleReviewIds?: string[];
  reviewSectionVisible?: boolean;
  reviewSchemaEnabled?: boolean;
  aggregateSchemaEnabled?: boolean;
};

/**
 * Admin schema preview architecture — Document 14.03.
 * Shows eligibility, exclusions, and calculated aggregates.
 * No manual override of calculated rating values (V1).
 */
export function ReviewSchemaPreviewPanel({
  reviews,
  entity,
  visibleReviewIds,
  reviewSectionVisible = true,
  reviewSchemaEnabled = true,
  aggregateSchemaEnabled = true,
}: ReviewSchemaPreviewPanelProps) {
  const options: ReviewSchemaEngineOptions = {
    entity,
    visibleReviewIds,
    reviewSectionVisible,
    reviewSchemaEnabled,
    aggregateSchemaEnabled,
  };
  const preview = buildReviewSchemaAdminPreview(reviews, options);

  return (
    <div className="space-y-4 rounded-lg border border-border bg-card p-4 text-sm">
      <h3 className="text-base font-semibold">Review schema preview</h3>
      <dl className="grid gap-2 sm:grid-cols-2">
        <div>
          <dt className="text-muted-foreground">Review schema</dt>
          <dd className="font-medium">
            {preview.reviewSchemaEnabled ? 'Enabled' : 'Disabled'} —{' '}
            {preview.canGenerateReviewSchema ? 'ready' : 'blocked'}
          </dd>
        </div>
        <div>
          <dt className="text-muted-foreground">Aggregate schema</dt>
          <dd className="font-medium">
            {preview.aggregateSchemaEnabled ? 'Enabled' : 'Disabled'} —{' '}
            {preview.canGenerateAggregateRating ? 'ready' : 'blocked'}
          </dd>
        </div>
        <div>
          <dt className="text-muted-foreground">Entity valid</dt>
          <dd className="font-medium">{preview.entityValid ? 'Yes' : 'No'}</dd>
        </div>
        <div>
          <dt className="text-muted-foreground">Calculated aggregate</dt>
          <dd className="font-medium">
            {preview.aggregate
              ? `${preview.aggregate.ratingValue} / ${preview.aggregate.bestRating} (${preview.aggregate.reviewCount} reviews)`
              : 'None'}
          </dd>
        </div>
      </dl>

      <div>
        <h4 className="font-medium">Eligible reviews</h4>
        {preview.eligibleReviews.length === 0 ? (
          <p className="text-muted-foreground">No eligible reviews.</p>
        ) : (
          <ul className="mt-1 list-disc space-y-1 pl-5">
            {preview.eligibleReviews.map((review) => (
              <li key={review.id}>
                {review.customerName} — {review.rating}/5
                {review.serviceSlug ? ` (${review.serviceSlug})` : ''}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div>
        <h4 className="font-medium">Excluded reviews</h4>
        {preview.excludedReviews.length === 0 ? (
          <p className="text-muted-foreground">No exclusions.</p>
        ) : (
          <ul className="mt-1 list-disc space-y-1 pl-5">
            {preview.excludedReviews.map((review) => (
              <li key={review.id}>
                {review.customerName}: {review.reasons.join(', ')}
              </li>
            ))}
          </ul>
        )}
      </div>

      <p className="text-xs text-muted-foreground">
        Version 1 does not allow manual override of calculated aggregate values. Internal order IDs,
        emails, and moderation notes are never included in schema output.
      </p>
    </div>
  );
}
