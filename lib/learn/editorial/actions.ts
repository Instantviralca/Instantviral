/**
 * Editorial publishing actions — Document 15.08.
 * Pure helpers: return next record + effects. Not a CMS.
 */

import { buildPublishingEffects } from '@/lib/learn/editorial/effects';
import { syncPublishedFlag } from '@/lib/learn/editorial/status';
import { validatePublishingState } from '@/lib/learn/editorial/transitions';
import { validateArticleForPublishing } from '@/lib/learn/editorial/validate';
import type {
  ArchiveArticleInput,
  EditorialArticleStatus,
  LearnArticleRecordMutable,
  PublishArticleInput,
  PublishingActionResult,
  ScheduleArticleInput,
  UpdatePublishedArticleInput,
} from '@/types/learn-editorial';

function cloneArticle(
  article: LearnArticleRecordMutable,
): LearnArticleRecordMutable {
  return structuredClone(article);
}

function emptyEffects(article: LearnArticleRecordMutable) {
  return buildPublishingEffects(article.status, {
    slug: article.slug,
    category: article.category,
    noindex: Boolean(article.seo?.noindex),
    editorialApproved: article.editorialApproved,
  });
}

function fail(
  article: LearnArticleRecordMutable,
  issues: PublishingActionResult['issues'],
  checklist: PublishingActionResult['checklist'] = [],
): PublishingActionResult {
  return {
    ok: false,
    article: cloneArticle(article),
    previousStatus: article.status,
    nextStatus: article.status,
    issues,
    checklist,
    effects: emptyEffects(article),
  };
}

function succeed(
  previous: LearnArticleRecordMutable,
  next: LearnArticleRecordMutable,
  checklist: PublishingActionResult['checklist'],
): PublishingActionResult {
  const effects = buildPublishingEffects(next.status, {
    slug: next.slug,
    category: next.category,
    noindex: Boolean(next.seo?.noindex),
    editorialApproved: next.editorialApproved,
  });
  return {
    ok: true,
    article: next,
    previousStatus: previous.status,
    nextStatus: next.status,
    issues: [],
    checklist,
    effects,
  };
}

function applyStatus(
  article: LearnArticleRecordMutable,
  status: EditorialArticleStatus,
  editorialAt: string,
): LearnArticleRecordMutable {
  return {
    ...article,
    status,
    published: syncPublishedFlag(status),
    lastEditorialUpdate: editorialAt,
  };
}

/**
 * Move an approved (or due scheduled) article to Published.
 * Blocks when publishing validation fails.
 */
export function publishArticle(
  article: LearnArticleRecordMutable,
  input: PublishArticleInput = {},
): PublishingActionResult {
  const target: EditorialArticleStatus = 'published';
  const transitionIssues = validatePublishingState(article.status, target);
  if (transitionIssues.length) {
    return fail(article, transitionIssues);
  }

  const { ok, issues, checklist } = validateArticleForPublishing(article);
  if (!ok) {
    return fail(article, issues, checklist);
  }

  const now = input.publishedAt ?? new Date().toISOString();
  const next = applyStatus(cloneArticle(article), target, now);
  // Preserve original publishedAt when activating from scheduled with a set date.
  if (article.status === 'scheduled' && article.scheduledAt) {
    next.publishedAt = article.scheduledAt;
  } else if (article.status !== 'published' && article.status !== 'updated') {
    next.publishedAt = now;
  }
  next.updatedAt = next.publishedAt;
  next.showModifiedDate = false;
  next.scheduledAt = undefined;
  next.editorialApproved = true;
  if (next.seo) {
    next.seo = { ...next.seo, noindex: false };
  }
  if (input.actorId) {
    next.approvedBy = next.approvedBy ?? input.actorId;
  }

  return succeed(article, next, checklist);
}

/**
 * Schedule an approved article for future publication.
 * Remains private until activated.
 */
export function scheduleArticle(
  article: LearnArticleRecordMutable,
  input: ScheduleArticleInput,
): PublishingActionResult {
  const target: EditorialArticleStatus = 'scheduled';
  const transitionIssues = validatePublishingState(article.status, target);
  if (transitionIssues.length) {
    return fail(article, transitionIssues);
  }

  const when = Date.parse(input.scheduledAt);
  if (Number.isNaN(when)) {
    return fail(article, [
      {
        severity: 'blocker',
        code: 'invalid_scheduled_at',
        field: 'scheduledAt',
        message: 'scheduledAt must be a valid ISO date.',
      },
    ]);
  }
  if (when <= Date.now()) {
    return fail(article, [
      {
        severity: 'blocker',
        code: 'scheduled_not_future',
        field: 'scheduledAt',
        message: 'scheduledAt must be in the future.',
      },
    ]);
  }

  const { ok, issues, checklist } = validateArticleForPublishing(article);
  if (!ok) {
    return fail(article, issues, checklist);
  }

  const now = new Date().toISOString();
  const next = applyStatus(cloneArticle(article), target, now);
  next.scheduledAt = input.scheduledAt;
  if (input.actorId) {
    next.approvedBy = next.approvedBy ?? input.actorId;
  }

  return succeed(article, next, checklist);
}

/**
 * Activate scheduled articles whose scheduledAt has arrived.
 * Triggers sitemap/robots/metadata eligibility via effects.
 */
export function activateScheduledArticles(
  articles: readonly LearnArticleRecordMutable[],
  now: Date | string = new Date(),
): PublishingActionResult[] {
  const nowMs = typeof now === 'string' ? Date.parse(now) : now.getTime();
  return articles
    .filter((article) => article.status === 'scheduled' && article.scheduledAt)
    .filter((article) => {
      const when = Date.parse(article.scheduledAt!);
      return !Number.isNaN(when) && when <= nowMs;
    })
    .map((article) =>
      publishArticle(article, {
        publishedAt: article.scheduledAt,
      }),
    );
}

/**
 * Meaningful revision of a live article.
 * Preserves datePublished; bumps dateModified / sitemap lastModified.
 */
export function updatePublishedArticle(
  article: LearnArticleRecordMutable,
  input: UpdatePublishedArticleInput = {},
): PublishingActionResult {
  const target: EditorialArticleStatus = 'updated';
  if (article.status !== 'published' && article.status !== 'updated') {
    return fail(article, [
      {
        severity: 'blocker',
        code: 'not_live',
        field: 'status',
        message: 'Only published or updated articles can receive revisions.',
      },
      ...validatePublishingState(article.status, target),
    ]);
  }

  const { ok, issues, checklist } = validateArticleForPublishing(article);
  if (!ok) {
    return fail(article, issues, checklist);
  }

  const publishedAt = article.publishedAt;
  const now = input.updatedAt ?? new Date().toISOString();
  const next = applyStatus(cloneArticle(article), target, now);
  next.publishedAt = publishedAt;
  next.updatedAt = now;
  next.showModifiedDate = input.meaningfulRevision !== false;
  next.scheduledAt = undefined;
  next.editorialApproved = true;

  return succeed(article, next, checklist);
}

/**
 * Archive a live article — remove from Learn, sitemap, search, related.
 * Prepares redirect strategy without applying it.
 */
export function archiveArticle(
  article: LearnArticleRecordMutable,
  input: ArchiveArticleInput = {},
): PublishingActionResult {
  const target: EditorialArticleStatus = 'archived';
  const transitionIssues = validatePublishingState(article.status, target);
  if (transitionIssues.length) {
    return fail(article, transitionIssues);
  }

  const now = input.archivedAt ?? new Date().toISOString();
  const next = applyStatus(cloneArticle(article), target, now);
  next.updatedAt = now;
  next.scheduledAt = undefined;
  next.editorialApproved = false;
  next.seo = {
    ...next.seo,
    noindex: true,
  };

  const checklist = validateArticleForPublishing(article).checklist;
  return succeed(article, next, checklist);
}

/** Submit draft for review. */
export function submitForReview(
  article: LearnArticleRecordMutable,
  actorId?: string,
): PublishingActionResult {
  const issues = validatePublishingState(article.status, 'in_review');
  if (issues.length) return fail(article, issues);
  const now = new Date().toISOString();
  const next = applyStatus(cloneArticle(article), 'in_review', now);
  if (actorId) next.reviewedBy = actorId;
  return succeed(article, next, []);
}

/** Approve an in-review article. */
export function approveArticle(
  article: LearnArticleRecordMutable,
  actorId?: string,
  reviewNotes?: string,
): PublishingActionResult {
  const issues = validatePublishingState(article.status, 'approved');
  if (issues.length) return fail(article, issues);
  const now = new Date().toISOString();
  const next = applyStatus(cloneArticle(article), 'approved', now);
  if (actorId) next.approvedBy = actorId;
  if (reviewNotes !== undefined) next.reviewNotes = reviewNotes;
  return succeed(article, next, []);
}
