/**
 * Editorial status helpers — Document 15.08.
 */

import type { LearnArticleStatus } from '@/types/learn';
import {
  PUBLIC_LIVE_ARTICLE_STATUSES,
  type EditorialArticleStatus,
  type EditorialStatusSummary,
} from '@/types/learn-editorial';

const STATUS_LABELS: Record<EditorialArticleStatus, string> = {
  draft: 'Draft',
  in_review: 'In Review',
  approved: 'Approved',
  scheduled: 'Scheduled',
  published: 'Published',
  updated: 'Updated',
  archived: 'Archived',
};

export function isEditorialArticleStatus(
  value: string,
): value is EditorialArticleStatus {
  return value in STATUS_LABELS;
}

export function isPublicLiveArticleStatus(
  status: LearnArticleStatus | EditorialArticleStatus,
): boolean {
  return (PUBLIC_LIVE_ARTICLE_STATUSES as readonly string[]).includes(status);
}

export function isPublicLiveArticle(article: {
  status: LearnArticleStatus | EditorialArticleStatus;
  published?: boolean;
  /** Required for public visibility — drafts must never leak. */
  editorialApproved?: boolean;
}): boolean {
  return (
    isPublicLiveArticleStatus(article.status) &&
    article.editorialApproved === true
  );
}

export function editorialStatusLabel(
  status: EditorialArticleStatus | LearnArticleStatus,
): string {
  return STATUS_LABELS[status as EditorialArticleStatus] ?? status;
}

export function getEditorialStatus(article: {
  status: LearnArticleStatus | EditorialArticleStatus;
  scheduledAt?: string;
  publishedAt?: string;
  updatedAt?: string;
  lastEditorialUpdate?: string;
  seoReviewed?: boolean;
  contentReviewed?: boolean;
  editorialApproved?: boolean;
}): EditorialStatusSummary {
  const status = article.status as EditorialArticleStatus;
  const publicVisible = isPublicLiveArticle(article);
  return {
    status,
    label: editorialStatusLabel(status),
    publicVisible,
    indexable: publicVisible,
    scheduledAt: article.scheduledAt,
    publishedAt: article.publishedAt,
    updatedAt: article.updatedAt,
    lastEditorialUpdate: article.lastEditorialUpdate,
    seoReviewed: Boolean(article.seoReviewed),
    contentReviewed: Boolean(article.contentReviewed),
  };
}

/** Sync deprecated `published` flag with live statuses. */
export function syncPublishedFlag(
  status: EditorialArticleStatus,
): boolean {
  return isPublicLiveArticleStatus(status);
}
