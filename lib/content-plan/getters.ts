/**
 * Content plan getters — Document 16.01.
 */

import { PLANNED_ARTICLES } from '@/data/content-plan/articles';
import { PUBLISHING_CALENDAR } from '@/data/content-plan/calendar';
import type {
  ArticleBrief,
  ContentPlanBatch,
  ContentPlanPlatform,
  ContentPlanPriority,
  ContentTopicClusterId,
  PublishingCalendarEntry,
} from '@/types/content-plan';

export function getPlannedArticles(): ArticleBrief[] {
  return [...PLANNED_ARTICLES];
}

export function getArticlesByPriority(
  priority: ContentPlanPriority,
): ArticleBrief[] {
  return PLANNED_ARTICLES.filter((article) => article.priority === priority);
}

export function getArticlesByCluster(
  cluster: ContentTopicClusterId,
): ArticleBrief[] {
  return PLANNED_ARTICLES.filter((article) => article.topicCluster === cluster);
}

export function getArticlesByPlatform(
  platform: ContentPlanPlatform,
): ArticleBrief[] {
  return PLANNED_ARTICLES.filter((article) => article.platform === platform);
}

export function getArticlesByBatch(batch: ContentPlanBatch): ArticleBrief[] {
  return PLANNED_ARTICLES.filter((article) => article.batch === batch);
}

export function buildPublishingQueue(
  options: { batch?: ContentPlanBatch; priority?: ContentPlanPriority } = {},
): ArticleBrief[] {
  return PLANNED_ARTICLES.filter((article) => {
    if (options.batch !== undefined && article.batch !== options.batch) {
      return false;
    }
    if (options.priority !== undefined && article.priority !== options.priority) {
      return false;
    }
    return article.status === 'planned' || article.status === 'brief_ready';
  }).sort((a, b) => {
    const priorityOrder = { P1: 0, P2: 1, P3: 2, P4: 3 } as const;
    const p = priorityOrder[a.priority] - priorityOrder[b.priority];
    if (p !== 0) return p;
    return a.plannedPublicationDate.localeCompare(b.plannedPublicationDate);
  });
}

export function buildContentCalendar(
  batch?: ContentPlanBatch,
): PublishingCalendarEntry[] {
  const entries =
    batch === undefined
      ? [...PUBLISHING_CALENDAR]
      : PUBLISHING_CALENDAR.filter((entry) => entry.batch === batch);
  return entries.sort((a, b) =>
    a.plannedPublicationDate.localeCompare(b.plannedPublicationDate),
  );
}

export function getPlatformTotals(): Record<ContentPlanPlatform, number> {
  const totals: Record<ContentPlanPlatform, number> = {
    instagram: 0,
    tiktok: 0,
    facebook: 0,
    youtube: 0,
    general: 0,
  };
  for (const article of PLANNED_ARTICLES) {
    totals[article.platform] += 1;
  }
  return totals;
}

export function getBatchTotals(): Record<ContentPlanBatch, number> {
  const totals: Record<ContentPlanBatch, number> = { 1: 0, 2: 0, 3: 0, 4: 0 };
  for (const article of PLANNED_ARTICLES) {
    totals[article.batch] += 1;
  }
  return totals;
}
