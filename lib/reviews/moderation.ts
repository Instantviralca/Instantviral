/**
 * Admin moderation architecture — Document 14.02.
 * Actions and audit logging are prepared; backend CRUD is not implemented.
 */

import type {
  Review,
  ReviewAuditEvent,
  ReviewModerationAction,
  ReviewModerationActionId,
  ReviewStatus,
} from '@/types/reviews';
import type { AdminReviewFilters, AdminReviewRow } from '@/types/admin-reviews';

export const reviewModerationActions: ReviewModerationAction[] = [
  { id: 'approve', label: 'Approve', adminOnly: true },
  { id: 'reject', label: 'Reject', adminOnly: true },
  { id: 'hide', label: 'Hide', adminOnly: true },
  { id: 'feature', label: 'Feature', adminOnly: true },
  { id: 'unfeature', label: 'Unfeature', adminOnly: true },
  { id: 'assign_platform', label: 'Assign platform', adminOnly: true },
  { id: 'assign_service', label: 'Assign service', adminOnly: true },
  { id: 'confirm_verified_purchase', label: 'Confirm verified purchase', adminOnly: true },
  { id: 'confirm_consent', label: 'Confirm consent', adminOnly: true },
  { id: 'add_moderation_note', label: 'Add internal moderation note', adminOnly: true },
];

/** In-memory audit log placeholder — replace with persistent admin logging later. */
const reviewAuditLog: ReviewAuditEvent[] = [];

export function getReviewAuditLog(): readonly ReviewAuditEvent[] {
  return reviewAuditLog;
}

export function appendReviewAuditEvent(
  event: Omit<ReviewAuditEvent, 'id' | 'createdAt'> & { id?: string; createdAt?: string },
): ReviewAuditEvent {
  const record: ReviewAuditEvent = {
    id: event.id ?? `audit_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    reviewId: event.reviewId,
    action: event.action,
    actorId: event.actorId,
    previousStatus: event.previousStatus,
    nextStatus: event.nextStatus,
    note: event.note,
    createdAt: event.createdAt ?? new Date().toISOString(),
  };
  reviewAuditLog.push(record);
  return record;
}

/**
 * Apply a moderation action in memory for architecture / UI previews.
 * Does not persist — backend CRUD is intentionally not implemented.
 */
export function applyReviewModerationAction(
  review: Review,
  action: ReviewModerationActionId,
  actorId: string,
  payload?: {
    platform?: Review['platform'];
    serviceSlug?: string;
    note?: string;
  },
): Review {
  const previousStatus = review.status;
  let next: Review = { ...review, updatedAt: new Date().toISOString() };

  switch (action) {
    case 'approve':
      next = { ...next, status: 'approved' };
      break;
    case 'reject':
      next = { ...next, status: 'rejected' };
      break;
    case 'hide':
      next = { ...next, status: 'hidden' };
      break;
    case 'feature':
      next = { ...next, featured: true };
      break;
    case 'unfeature':
      next = { ...next, featured: false };
      break;
    case 'assign_platform':
      next = { ...next, platform: payload?.platform };
      break;
    case 'assign_service':
      next = { ...next, serviceSlug: payload?.serviceSlug };
      break;
    case 'confirm_verified_purchase':
      // Only set true when caller has verified a completed order match.
      next = { ...next, verifiedPurchase: true };
      break;
    case 'confirm_consent':
      next = { ...next, consentConfirmed: true };
      break;
    case 'add_moderation_note':
      next = {
        ...next,
        moderationNotes: [...(next.moderationNotes ?? []), payload?.note ?? ''].filter(Boolean),
      };
      break;
    default:
      break;
  }

  appendReviewAuditEvent({
    reviewId: review.id,
    action,
    actorId,
    previousStatus,
    nextStatus: next.status,
    note: payload?.note,
  });

  return next;
}

export function toAdminReviewRow(review: Review): AdminReviewRow {
  return {
    id: review.id,
    customerName: review.customerName,
    rating: review.rating,
    platform: review.platform,
    serviceSlug: review.serviceSlug,
    status: review.status,
    featured: review.featured,
    verifiedPurchase: review.verifiedPurchase,
    consentConfirmed: review.consentConfirmed,
    source: review.source,
    reviewDate: review.reviewDate,
    updatedAt: review.updatedAt,
    reviewPreview: review.reviewText.slice(0, 120),
  };
}

export function filterAdminReviews(
  reviews: Review[],
  filters: AdminReviewFilters,
): Review[] {
  let result = [...reviews];

  if (filters.query?.trim()) {
    const q = filters.query.trim().toLowerCase();
    result = result.filter(
      (review) =>
        review.customerName.toLowerCase().includes(q) ||
        review.reviewText.toLowerCase().includes(q) ||
        review.title?.toLowerCase().includes(q),
    );
  }

  if (filters.status && filters.status !== 'all') {
    result = result.filter((review) => review.status === filters.status);
  }
  if (filters.platform && filters.platform !== 'all') {
    result = result.filter((review) => review.platform === filters.platform);
  }
  if (filters.serviceSlug && filters.serviceSlug !== 'all') {
    result = result.filter((review) => review.serviceSlug === filters.serviceSlug);
  }
  if (typeof filters.rating === 'number') {
    result = result.filter((review) => review.rating === filters.rating);
  }
  if (filters.verifiedPurchase === true || filters.verifiedPurchase === false) {
    result = result.filter((review) => review.verifiedPurchase === filters.verifiedPurchase);
  }
  if (filters.featured === true || filters.featured === false) {
    result = result.filter((review) => review.featured === filters.featured);
  }
  if (filters.consentConfirmed === true || filters.consentConfirmed === false) {
    result = result.filter((review) => review.consentConfirmed === filters.consentConfirmed);
  }

  switch (filters.sort) {
    case 'oldest':
      result.sort(
        (a, b) => new Date(a.reviewDate).getTime() - new Date(b.reviewDate).getTime(),
      );
      break;
    case 'highest_rating':
      result.sort((a, b) => b.rating - a.rating);
      break;
    case 'lowest_rating':
      result.sort((a, b) => a.rating - b.rating);
      break;
    case 'newest':
    default:
      result.sort(
        (a, b) => new Date(b.reviewDate).getTime() - new Date(a.reviewDate).getTime(),
      );
      break;
  }

  return result;
}

export function statusLabel(status: ReviewStatus): string {
  switch (status) {
    case 'draft':
      return 'Draft';
    case 'pending_review':
      return 'Pending Review';
    case 'approved':
      return 'Approved';
    case 'rejected':
      return 'Rejected';
    case 'hidden':
      return 'Hidden';
    default:
      return status;
  }
}
