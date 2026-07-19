/**
 * Planned article master list — Document 16.01.
 * Briefs only — LEARN_ARTICLES registry remains empty (no bodies).
 */

import { ARTICLE_BRIEF_SEEDS } from '@/data/content-plan/article-seeds-batch1';
import { ARTICLE_BRIEF_SEEDS_BATCH_2_TO_4 } from '@/data/content-plan/article-seeds-batch2';
import { ARTICLE_BRIEF_SEEDS_BATCH_3 } from '@/data/content-plan/article-seeds-batch3';
import { ARTICLE_BRIEF_SEEDS_BATCH_4 } from '@/data/content-plan/article-seeds-batch4';
import { buildArticleBrief } from '@/data/content-plan/build-brief';
import type { ArticleBrief } from '@/types/content-plan';

const ALL_SEEDS = [
  ...ARTICLE_BRIEF_SEEDS,
  ...ARTICLE_BRIEF_SEEDS_BATCH_2_TO_4,
  ...ARTICLE_BRIEF_SEEDS_BATCH_3,
  ...ARTICLE_BRIEF_SEEDS_BATCH_4,
];

export const PLANNED_ARTICLES: readonly ArticleBrief[] =
  ALL_SEEDS.map(buildArticleBrief);

export function getPlannedArticleBySlug(
  slug: string,
): ArticleBrief | undefined {
  return PLANNED_ARTICLES.find((article) => article.slug === slug);
}

export function getPlannedArticleById(id: string): ArticleBrief | undefined {
  return PLANNED_ARTICLES.find((article) => article.id === id);
}
