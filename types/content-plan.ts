/**
 * SEO Content Production Plan types — Document 16.01.
 * Planning architecture only — no article bodies.
 */

import type { ApprovedServiceSlug } from '@/data/linking/approved-services';
import type { LearnCategoryId } from '@/types/learn';

/** Platforms covered by the initial 50-article plan. */
export type ContentPlanPlatform =
  | 'instagram'
  | 'tiktok'
  | 'facebook'
  | 'youtube'
  | 'general';

export type ContentPlanPriority = 'P1' | 'P2' | 'P3' | 'P4';

export type ContentPlanBatch = 1 | 2 | 3 | 4;

/**
 * Editorial statuses for planned content.
 * This task only uses `planned` and `brief_ready`.
 */
export type ContentPlanStatus =
  | 'planned'
  | 'brief_ready'
  | 'draft'
  | 'in_review'
  | 'approved'
  | 'scheduled'
  | 'published'
  | 'updating'
  | 'archived';

export type ContentSearchIntent =
  | 'informational'
  | 'how_to'
  | 'beginner_guide'
  | 'strategy'
  | 'troubleshooting'
  | 'comparison'
  | 'commercial_investigation'
  | 'platform_update';

export type ContentTopicClusterId =
  | 'instagram-growth'
  | 'instagram-engagement'
  | 'tiktok-growth'
  | 'tiktok-discovery'
  | 'facebook-pages'
  | 'youtube-channel-growth'
  | 'social-media-fundamentals'
  | 'social-media-measurement';

export type ContentUpdateCadence =
  | 'algorithm_3_to_6_months'
  | 'evergreen_6_to_12_months'
  | 'policy_on_change'
  | 'statistics_on_source_update';

export type ContentCtaStrategy = {
  /** Max one prominent in-body service CTA when appropriate. */
  prominentServiceSlug?: ApprovedServiceSlug;
  /** Soft end-of-article CTA label (no guarantees). */
  closingCtaLabel: string;
  /** When false, do not force a service CTA. */
  allowServiceCta: boolean;
  notes: string;
};

export type ContentImageRequirements = {
  featuredImageRequired: true;
  altTextRequired: true;
  preferredFormat: 'webp' | 'avif';
  minWidth: number;
  minHeight: number;
  supportingIllustrations?: string[];
  notes: string;
};

export type ContentInternalLinkPlan = {
  categoryPath: string;
  relatedArticleSlugs: string[];
  relatedServiceSlugs: ApprovedServiceSlug[];
  faqOrLegalPaths: string[];
  externalSourceHints: string[];
};

export type ArticleBrief = {
  id: string;
  workingTitle: string;
  slug: string;
  platform: ContentPlanPlatform;
  category: Exclude<LearnCategoryId, 'news'>;
  topicCluster: ContentTopicClusterId;
  primaryKeyword: string;
  secondaryKeywords: string[];
  searchIntent: ContentSearchIntent;
  targetAudience: string;
  coreQuestion: string;
  shortAnswer: string;
  proposedH2s: string[];
  proposedH3s: string[];
  keyTakeaways: string[];
  relatedServices: ApprovedServiceSlug[];
  relatedArticles: string[];
  requiredSources: string[];
  faqOpportunities: string[];
  imageRequirements: ContentImageRequirements;
  ctaStrategy: ContentCtaStrategy;
  /** Empty until a real Author System record exists — do not invent authors. */
  authorId: string;
  priority: ContentPlanPriority;
  status: ContentPlanStatus;
  plannedPublicationDate: string;
  batch: ContentPlanBatch;
  updateCadence: ContentUpdateCadence;
  estimatedWordRange: { min: number; max: number };
  internalLinkPlan: ContentInternalLinkPlan;
};

export type TopicCluster = {
  id: ContentTopicClusterId;
  name: string;
  platform: ContentPlanPlatform;
  description: string;
  primaryCategory: Exclude<LearnCategoryId, 'news'>;
  pillarArticleSlugs: string[];
};

export type KeywordIntentEntry = {
  keyword: string;
  intent: ContentSearchIntent;
  articleSlug: string;
  isPrimary: boolean;
};

export type PublishingCalendarEntry = {
  articleId: string;
  slug: string;
  workingTitle: string;
  platform: ContentPlanPlatform;
  cluster: ContentTopicClusterId;
  priority: ContentPlanPriority;
  batch: ContentPlanBatch;
  status: ContentPlanStatus;
  authorId: string;
  draftDueDate: string;
  reviewDate: string;
  plannedPublicationDate: string;
  nextReviewDate: string;
};

export type ContentPlanSeverity =
  | 'blocker'
  | 'error'
  | 'warning'
  | 'recommendation';

export type ContentPlanIssue = {
  severity: ContentPlanSeverity;
  code: string;
  field?: string;
  articleId?: string;
  slug?: string;
  message: string;
};

export type ContentPlanValidationReport = {
  generatedAt: string;
  articleCount: number;
  valid: boolean;
  issues: ContentPlanIssue[];
  platformTotals: Record<ContentPlanPlatform, number>;
  batchTotals: Record<ContentPlanBatch, number>;
  priorityTotals: Record<ContentPlanPriority, number>;
};
