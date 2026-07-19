/**
 * Brief builder — expands planning seeds into full ArticleBrief records.
 * Planning only — never creates article bodies.
 */

import { learnCategoryPath } from '@/config/routes';
import {
  DEFAULT_IMAGE_REQUIREMENTS,
  shiftDays,
} from '@/data/content-plan/brief-defaults';
import type { ApprovedServiceSlug } from '@/data/linking/approved-services';
import type {
  ArticleBrief,
  ContentCtaStrategy,
  ContentPlanBatch,
  ContentPlanPlatform,
  ContentPlanPriority,
  ContentPlanStatus,
  ContentSearchIntent,
  ContentTopicClusterId,
  ContentUpdateCadence,
} from '@/types/content-plan';
import type { LearnCategoryId } from '@/types/learn';

export type ArticleBriefSeed = {
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
  keyTakeaways: [string, string, string, ...string[]];
  relatedServices: ApprovedServiceSlug[];
  relatedArticles: string[];
  requiredSources: string[];
  faqOpportunities: string[];
  ctaStrategy: ContentCtaStrategy;
  priority: ContentPlanPriority;
  status: ContentPlanStatus;
  plannedPublicationDate: string;
  batch: ContentPlanBatch;
  updateCadence: ContentUpdateCadence;
  estimatedWordRange?: { min: number; max: number };
  faqOrLegalPaths?: string[];
  imageNotes?: string;
};

export function buildArticleBrief(seed: ArticleBriefSeed): ArticleBrief {
  const categoryPath = learnCategoryPath(seed.category);
  return {
    id: seed.id,
    workingTitle: seed.workingTitle,
    slug: seed.slug,
    platform: seed.platform,
    category: seed.category,
    topicCluster: seed.topicCluster,
    primaryKeyword: seed.primaryKeyword,
    secondaryKeywords: [...seed.secondaryKeywords],
    searchIntent: seed.searchIntent,
    targetAudience: seed.targetAudience,
    coreQuestion: seed.coreQuestion,
    shortAnswer: seed.shortAnswer,
    proposedH2s: [...seed.proposedH2s],
    proposedH3s: [...seed.proposedH3s],
    keyTakeaways: [...seed.keyTakeaways],
    relatedServices: [...seed.relatedServices],
    relatedArticles: [...seed.relatedArticles],
    requiredSources: [...seed.requiredSources],
    faqOpportunities: [...seed.faqOpportunities],
    imageRequirements: {
      ...DEFAULT_IMAGE_REQUIREMENTS,
      notes: seed.imageNotes ?? DEFAULT_IMAGE_REQUIREMENTS.notes,
    },
    ctaStrategy: { ...seed.ctaStrategy },
    authorId: '',
    priority: seed.priority,
    status: seed.status,
    plannedPublicationDate: seed.plannedPublicationDate,
    batch: seed.batch,
    updateCadence: seed.updateCadence,
    estimatedWordRange: seed.estimatedWordRange ?? { min: 1300, max: 2000 },
    internalLinkPlan: {
      categoryPath,
      relatedArticleSlugs: [...seed.relatedArticles],
      relatedServiceSlugs: [...seed.relatedServices],
      faqOrLegalPaths: seed.faqOrLegalPaths ?? ['/faq', '/disclaimer'],
      externalSourceHints: [...seed.requiredSources],
    },
  };
}

export function draftAndReviewDates(publicationDate: string): {
  draftDueDate: string;
  reviewDate: string;
} {
  return {
    draftDueDate: shiftDays(publicationDate, -21),
    reviewDate: shiftDays(publicationDate, -7),
  };
}
