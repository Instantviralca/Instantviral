/**
 * Editorial Publishing Workflow types — Document 15.08.
 */

export type EditorialArticleStatus =
  | 'draft'
  | 'in_review'
  | 'approved'
  | 'scheduled'
  | 'published'
  | 'updated'
  | 'archived';

/** Statuses that may appear on public Learn surfaces and be indexable. */
export const PUBLIC_LIVE_ARTICLE_STATUSES: readonly EditorialArticleStatus[] = [
  'published',
  'updated',
] as const;

export type EditorialSeverity = 'blocker' | 'error' | 'warning' | 'recommendation';

export type EditorialIssue = {
  severity: EditorialSeverity;
  code: string;
  field?: string;
  message: string;
};

export type PublishingChecklistItem = {
  id: string;
  label: string;
  group: 'seo' | 'content' | 'links' | 'accessibility' | 'schema' | 'editorial';
  required: boolean;
  passed: boolean;
  detail?: string;
};

export type EditorialStatusSummary = {
  status: EditorialArticleStatus;
  label: string;
  publicVisible: boolean;
  indexable: boolean;
  scheduledAt?: string;
  publishedAt?: string;
  updatedAt?: string;
  lastEditorialUpdate?: string;
  /** Public-safe only — never includes reviewNotes or reviewer identities. */
  seoReviewed: boolean;
  contentReviewed: boolean;
};

export type PublishingEffects = {
  publicVisible: boolean;
  sitemapEligible: boolean;
  robotsIndex: boolean;
  robotsFollow: boolean;
  /** Prepared redirect target for archives — not auto-applied in V1. */
  redirectPrepared?: {
    fromPath: string;
    suggestedToPath: string;
    strategy: 'manual_future';
  };
  cacheTags: readonly string[];
  relatedArticlesDirty: boolean;
};

export type PublishingActionResult = {
  ok: boolean;
  article?: LearnArticleRecordMutable;
  previousStatus?: EditorialArticleStatus;
  nextStatus?: EditorialArticleStatus;
  issues: EditorialIssue[];
  checklist: PublishingChecklistItem[];
  effects: PublishingEffects;
};

/** Mutable editorial record shape used by workflow helpers (not the frozen registry). */
export type LearnArticleRecordMutable = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  blocks: import('@/types/learn-article-blocks').ArticleContentBlock[];
  category: import('@/types/learn').LearnCategoryId;
  tags: string[];
  authorId: string;
  featuredImage?: import('@/types/learn').LearnFeaturedImage;
  readingTime: number;
  publishedAt: string;
  updatedAt: string;
  showModifiedDate: boolean;
  seo: import('@/types/learn').LearnSeoFields;
  relatedServices: string[];
  relatedArticles: string[];
  featured: boolean;
  published: boolean;
  status: EditorialArticleStatus;
  keyTakeaways?: string[];
  faqs?: import('@/types/learn-article-blocks').ArticleFaqItem[];
  serviceCta?: import('@/types/learn').LearnArticleServiceCta;
  scheduledAt?: string;
  approvedBy?: string;
  reviewedBy?: string;
  reviewNotes?: string;
  seoReviewed?: boolean;
  contentReviewed?: boolean;
  lastEditorialUpdate?: string;
  /** Explicit gate — public only when true with a live status. */
  editorialApproved?: boolean;
};

export type ScheduleArticleInput = {
  scheduledAt: string;
  actorId?: string;
};

export type PublishArticleInput = {
  actorId?: string;
  publishedAt?: string;
};

export type UpdatePublishedArticleInput = {
  actorId?: string;
  updatedAt?: string;
  /** Meaningful content revision — sets showModifiedDate. */
  meaningfulRevision?: boolean;
};

export type ArchiveArticleInput = {
  actorId?: string;
  archivedAt?: string;
};
