'use client';

import { useEffect, useMemo, useState } from 'react';

import { AdminEmptyState } from '@/components/admin/common/admin-empty-state';
import { AdminFilterBar } from '@/components/admin/common/admin-filter-bar';
import { AdminSearch } from '@/components/admin/common/admin-search';
import { AdminTable } from '@/components/admin/tables/admin-table';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useDebouncedValue } from '@/lib/admin/list-utils';
import {
  trackReviewEvent,
  reviewAnalyticsEvents,
} from '@/lib/analytics/review-events';
import {
  filterAdminReviews,
  statusLabel,
  toAdminReviewRow,
} from '@/lib/reviews/moderation';
import type { AdminReviewFilters, AdminReviewRow } from '@/types/admin-reviews';
import type { Review } from '@/types/reviews';

export function ReviewSearch({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  const [local, setLocal] = useState(value);
  const debounced = useDebouncedValue(local);
  useEffect(() => onChange(debounced), [debounced]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <AdminSearch
      value={local}
      onChange={setLocal}
      label="Search reviews"
      placeholder="Customer name or review text…"
    />
  );
}

export function ReviewFilters({
  filters,
  onChange,
}: {
  filters: AdminReviewFilters;
  onChange: (next: AdminReviewFilters) => void;
}) {
  return (
    <AdminFilterBar>
      <div className="space-y-1">
        <Label>Status</Label>
        <Select
          value={filters.status ?? 'all'}
          onValueChange={(value) =>
            onChange({ ...filters, status: value as AdminReviewFilters['status'] })
          }
        >
          <SelectTrigger className="w-[160px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="draft">Draft</SelectItem>
            <SelectItem value="pending_review">Pending Review</SelectItem>
            <SelectItem value="approved">Approved</SelectItem>
            <SelectItem value="rejected">Rejected</SelectItem>
            <SelectItem value="hidden">Hidden</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-1">
        <Label>Verified</Label>
        <Select
          value={
            filters.verifiedPurchase === true
              ? 'yes'
              : filters.verifiedPurchase === false
                ? 'no'
                : 'all'
          }
          onValueChange={(value) =>
            onChange({
              ...filters,
              verifiedPurchase: value === 'all' ? 'all' : value === 'yes',
            })
          }
        >
          <SelectTrigger className="w-[140px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="yes">Verified</SelectItem>
            <SelectItem value="no">Not verified</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-1">
        <Label>Sort</Label>
        <Select
          value={filters.sort ?? 'newest'}
          onValueChange={(value) =>
            onChange({ ...filters, sort: value as AdminReviewFilters['sort'] })
          }
        >
          <SelectTrigger className="w-[160px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">Newest</SelectItem>
            <SelectItem value="oldest">Oldest</SelectItem>
            <SelectItem value="highest_rating">Highest rating</SelectItem>
            <SelectItem value="lowest_rating">Lowest rating</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </AdminFilterBar>
  );
}

export function ReviewsTable({
  reviews,
  filters,
  onSelect,
}: {
  reviews: Review[];
  filters: AdminReviewFilters;
  onSelect?: (reviewId: string) => void;
}) {
  const rows = useMemo(
    () => filterAdminReviews(reviews, filters).map(toAdminReviewRow),
    [reviews, filters],
  );

  if (rows.length === 0) {
    return (
      <AdminEmptyState
        title="No reviews match"
        description="Adjust filters or add a genuine review. Do not create fabricated testimonials."
      />
    );
  }

  return (
    <AdminTable<AdminReviewRow>
      rowKey={(row) => row.id}
      columns={[
        {
          id: 'customer',
          header: 'Customer',
          cell: (row) => (
            <div>
              <div className="font-medium">{row.customerName}</div>
              <div className="text-xs text-muted-foreground">{row.reviewPreview}</div>
            </div>
          ),
        },
        {
          id: 'rating',
          header: 'Rating',
          cell: (row) => row.rating,
        },
        {
          id: 'status',
          header: 'Status',
          cell: (row) => statusLabel(row.status),
        },
        {
          id: 'flags',
          header: 'Flags',
          cell: (row) =>
            [
              row.featured ? 'Featured' : null,
              row.verifiedPurchase ? 'Verified' : null,
              row.consentConfirmed ? 'Consent' : null,
            ]
              .filter(Boolean)
              .join(' · ') || '—',
        },
        {
          id: 'updated',
          header: 'Updated',
          cell: (row) => row.updatedAt.slice(0, 10),
        },
        {
          id: 'actions',
          header: '',
          cell: (row) => (
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="min-h-9"
              onClick={() => onSelect?.(row.id)}
            >
              Open
            </Button>
          ),
        },
      ]}
      rows={rows}
    />
  );
}

export function ReviewEditor({ review }: { review: Review | null }) {
  if (!review) {
    return (
      <AdminEmptyState
        title="Select a review"
        description="Choose a review from the table to inspect fields. Backend save is not implemented yet."
      />
    );
  }

  return (
    <div className="space-y-4 rounded-lg border border-border bg-card p-4">
      <h3 className="text-lg font-semibold">Review editor (architecture)</h3>
      <dl className="grid gap-3 text-sm sm:grid-cols-2">
        <div>
          <dt className="text-muted-foreground">Customer</dt>
          <dd className="font-medium">{review.customerName}</dd>
        </div>
        <div>
          <dt className="text-muted-foreground">Status</dt>
          <dd className="font-medium">{statusLabel(review.status)}</dd>
        </div>
        <div>
          <dt className="text-muted-foreground">Rating</dt>
          <dd className="font-medium">{review.rating}</dd>
        </div>
        <div>
          <dt className="text-muted-foreground">Service</dt>
          <dd className="font-medium">{review.serviceSlug ?? '—'}</dd>
        </div>
        <div className="sm:col-span-2">
          <dt className="text-muted-foreground">Review text</dt>
          <dd className="mt-1 whitespace-pre-wrap">{review.reviewText}</dd>
        </div>
        <div className="sm:col-span-2">
          <dt className="text-muted-foreground">Internal order reference</dt>
          <dd className="font-mono text-xs">
            {review.orderIdReference ?? '— (never public)'}
          </dd>
        </div>
        <div className="sm:col-span-2">
          <dt className="text-muted-foreground">Moderation notes (internal)</dt>
          <dd className="mt-1 text-muted-foreground">
            {(review.moderationNotes ?? []).join(' · ') || 'None'}
          </dd>
        </div>
      </dl>
    </div>
  );
}

export function ReviewModerationPanel({
  review,
  onAction,
}: {
  review: Review | null;
  onAction?: (action: 'approve' | 'reject' | 'feature') => void;
}) {
  if (!review) return null;

  return (
    <div className="flex flex-wrap gap-2 rounded-lg border border-border bg-card p-4">
      <Button
        type="button"
        className="min-h-11"
        onClick={() => {
          trackReviewEvent(reviewAnalyticsEvents.review_admin_approve, {
            reviewId: review.id,
          });
          onAction?.('approve');
        }}
      >
        Approve
      </Button>
      <Button
        type="button"
        variant="outline"
        className="min-h-11"
        onClick={() => {
          trackReviewEvent(reviewAnalyticsEvents.review_admin_reject, {
            reviewId: review.id,
          });
          onAction?.('reject');
        }}
      >
        Reject
      </Button>
      <Button
        type="button"
        variant="secondary"
        className="min-h-11"
        onClick={() => {
          trackReviewEvent(reviewAnalyticsEvents.review_admin_feature, {
            reviewId: review.id,
          });
          onAction?.('feature');
        }}
      >
        Feature
      </Button>
      <p className="basis-full text-xs text-muted-foreground">
        Moderation actions are prepared for admin boundaries. Persistence requires future backend
        CRUD. Internal notes and order references stay private.
      </p>
    </div>
  );
}
