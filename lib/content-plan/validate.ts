/**
 * Content plan validation — Document 16.01.
 * Detects issues; does not invent editorial decisions or authors.
 */

import { TOPIC_CLUSTERS } from '@/data/content-plan/clusters';
import { PLANNED_ARTICLES } from '@/data/content-plan/articles';
import {
  assertApprovedServicesOnly,
  isSkippedServiceSlug,
} from '@/data/content-plan/services';
import { SERVICES_BY_PLATFORM } from '@/data/content-plan/services';
import type {
  ArticleBrief,
  ContentPlanIssue,
  ContentPlanValidationReport,
  ContentSearchIntent,
} from '@/types/content-plan';
import {
  getBatchTotals,
  getPlatformTotals,
} from '@/lib/content-plan/getters';

const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

function normalizeKeyword(value: string): string {
  return value.trim().toLowerCase().replace(/\s+/g, ' ');
}

export function validateArticleBrief(article: ArticleBrief): ContentPlanIssue[] {
  const issues: ContentPlanIssue[] = [];
  const base = { articleId: article.id, slug: article.slug };

  if (!article.workingTitle.trim()) {
    issues.push({
      severity: 'blocker',
      code: 'missing_title',
      field: 'workingTitle',
      message: 'Working title is required.',
      ...base,
    });
  }
  if (!article.slug.trim() || !SLUG_PATTERN.test(article.slug)) {
    issues.push({
      severity: 'blocker',
      code: 'invalid_slug',
      field: 'slug',
      message: 'Slug must be lowercase kebab-case.',
      ...base,
    });
  }
  if (!article.primaryKeyword.trim()) {
    issues.push({
      severity: 'blocker',
      code: 'missing_primary_keyword',
      field: 'primaryKeyword',
      message: 'Primary keyword is required.',
      ...base,
    });
  }
  if (!article.category) {
    issues.push({
      severity: 'blocker',
      code: 'missing_category',
      field: 'category',
      message: 'Category is required.',
      ...base,
    });
  }
  if (!article.authorId.trim()) {
    issues.push({
      severity: 'error',
      code: 'missing_author',
      field: 'authorId',
      message:
        'Author is unassigned. Assign a real Author System id before drafting — do not invent credentials.',
      ...base,
    });
  }
  if (!TOPIC_CLUSTERS.some((c) => c.id === article.topicCluster)) {
    issues.push({
      severity: 'blocker',
      code: 'invalid_cluster',
      field: 'topicCluster',
      message: `Unknown topic cluster "${article.topicCluster}".`,
      ...base,
    });
  }
  if (article.proposedH2s.length < 3) {
    issues.push({
      severity: 'error',
      code: 'insufficient_h2s',
      field: 'proposedH2s',
      message: 'Brief needs at least three proposed H2 sections.',
      ...base,
    });
  }
  if (article.keyTakeaways.length < 3) {
    issues.push({
      severity: 'error',
      code: 'insufficient_takeaways',
      field: 'keyTakeaways',
      message: 'Brief needs at least three key takeaways.',
      ...base,
    });
  }
  if (article.requiredSources.length === 0) {
    issues.push({
      severity: 'error',
      code: 'missing_source_plan',
      field: 'requiredSources',
      message: 'Required sources plan is missing.',
      ...base,
    });
  }
  if (!article.ctaStrategy?.closingCtaLabel?.trim()) {
    issues.push({
      severity: 'error',
      code: 'missing_cta_strategy',
      field: 'ctaStrategy',
      message: 'CTA strategy is incomplete.',
      ...base,
    });
  }
  if (!article.imageRequirements?.featuredImageRequired) {
    issues.push({
      severity: 'error',
      code: 'missing_image_plan',
      field: 'imageRequirements',
      message: 'Image requirements plan is missing.',
      ...base,
    });
  }
  if (
    article.platform !== 'general' &&
    article.relatedServices.length === 0 &&
    article.ctaStrategy.allowServiceCta
  ) {
    issues.push({
      severity: 'warning',
      code: 'missing_service_relationship',
      field: 'relatedServices',
      message:
        'Service CTA allowed but no relatedServices listed — confirm intentional.',
      ...base,
    });
  }

  const serviceCheck = assertApprovedServicesOnly(article.relatedServices);
  if (!serviceCheck.ok) {
    for (const slug of serviceCheck.skipped) {
      issues.push({
        severity: 'blocker',
        code: 'skipped_service_content',
        field: 'relatedServices',
        message: `Skipped service "${slug}" must not be targeted.`,
        ...base,
      });
    }
    for (const slug of serviceCheck.invalid) {
      issues.push({
        severity: 'blocker',
        code: 'unsupported_service_target',
        field: 'relatedServices',
        message: `Unsupported service "${slug}" is outside the approved 12.`,
        ...base,
      });
    }
  }

  if (article.ctaStrategy.prominentServiceSlug) {
    if (isSkippedServiceSlug(article.ctaStrategy.prominentServiceSlug)) {
      issues.push({
        severity: 'blocker',
        code: 'skipped_service_cta',
        field: 'ctaStrategy.prominentServiceSlug',
        message: 'CTA targets a skipped service.',
        ...base,
      });
    }
  }

  // Platform articles should not attach another platform's services.
  if (article.platform !== 'general') {
    const allowed = new Set<string>(SERVICES_BY_PLATFORM[article.platform]);
    for (const service of article.relatedServices) {
      if (!allowed.has(service)) {
        issues.push({
          severity: 'error',
          code: 'cross_platform_service',
          field: 'relatedServices',
          message: `Service "${service}" does not belong to platform "${article.platform}".`,
          ...base,
        });
      }
    }
  }

  for (const related of article.relatedArticles) {
    if (related === article.slug) {
      issues.push({
        severity: 'error',
        code: 'self_related_article',
        field: 'relatedArticles',
        message: 'Related articles must not include self.',
        ...base,
      });
    }
  }

  if (article.status !== 'planned' && article.status !== 'brief_ready') {
    issues.push({
      severity: 'warning',
      code: 'unexpected_status',
      field: 'status',
      message: `Status "${article.status}" is beyond planning scope for this registry.`,
      ...base,
    });
  }

  return issues;
}

export function detectKeywordOverlap(
  articles: readonly ArticleBrief[] = PLANNED_ARTICLES,
): ContentPlanIssue[] {
  const issues: ContentPlanIssue[] = [];
  const primary = new Map<string, string[]>();

  for (const article of articles) {
    const key = normalizeKeyword(article.primaryKeyword);
    primary.set(key, [...(primary.get(key) ?? []), article.slug]);
  }

  for (const [keyword, slugs] of primary) {
    if (slugs.length > 1) {
      issues.push({
        severity: 'blocker',
        code: 'keyword_cannibalization',
        field: 'primaryKeyword',
        message: `Primary keyword "${keyword}" shared by: ${slugs.join(', ')}`,
      });
    }
  }

  // Secondary vs other primaries
  const primarySet = new Map(
    articles.map((a) => [normalizeKeyword(a.primaryKeyword), a.slug]),
  );
  for (const article of articles) {
    for (const secondary of article.secondaryKeywords) {
      const key = normalizeKeyword(secondary);
      const owner = primarySet.get(key);
      if (owner && owner !== article.slug) {
        issues.push({
          severity: 'warning',
          code: 'secondary_primary_overlap',
          field: 'secondaryKeywords',
          articleId: article.id,
          slug: article.slug,
          message: `Secondary keyword "${secondary}" matches primary of "${owner}".`,
        });
      }
    }
  }

  return issues;
}

export function detectIntentConflicts(
  articles: readonly ArticleBrief[] = PLANNED_ARTICLES,
): ContentPlanIssue[] {
  const issues: ContentPlanIssue[] = [];
  const byKeyword = new Map<
    string,
    Array<{ slug: string; intent: ContentSearchIntent }>
  >();

  for (const article of articles) {
    const key = normalizeKeyword(article.primaryKeyword);
    byKeyword.set(key, [
      ...(byKeyword.get(key) ?? []),
      { slug: article.slug, intent: article.searchIntent },
    ]);
  }

  for (const [keyword, entries] of byKeyword) {
    const intents = new Set(entries.map((e) => e.intent));
    if (entries.length > 1 && intents.size > 1) {
      issues.push({
        severity: 'blocker',
        code: 'conflicting_intent',
        field: 'searchIntent',
        message: `Conflicting intents for "${keyword}": ${entries
          .map((e) => `${e.slug}=${e.intent}`)
          .join('; ')}`,
      });
    }
  }

  // Near-duplicate titles with different intents still flagged as overlap risk
  const titleMap = new Map<string, ArticleBrief[]>();
  for (const article of articles) {
    const key = normalizeKeyword(article.workingTitle);
    titleMap.set(key, [...(titleMap.get(key) ?? []), article]);
  }
  for (const [title, list] of titleMap) {
    if (list.length > 1) {
      issues.push({
        severity: 'blocker',
        code: 'duplicate_title',
        field: 'workingTitle',
        message: `Duplicate working title "${title}" across ${list
          .map((a) => a.slug)
          .join(', ')}`,
      });
    }
  }

  return issues;
}

export function detectMissingServiceSupport(
  articles: readonly ArticleBrief[] = PLANNED_ARTICLES,
): ContentPlanIssue[] {
  const issues: ContentPlanIssue[] = [];
  const covered = new Set<string>();
  for (const article of articles) {
    for (const service of article.relatedServices) {
      covered.add(service);
    }
  }

  const required = [
    ...SERVICES_BY_PLATFORM.instagram,
    ...SERVICES_BY_PLATFORM.tiktok,
    ...SERVICES_BY_PLATFORM.facebook,
    ...SERVICES_BY_PLATFORM.youtube,
  ];

  for (const service of required) {
    if (!covered.has(service)) {
      issues.push({
        severity: 'error',
        code: 'missing_service_support',
        field: 'relatedServices',
        message: `Approved service "${service}" has no planned article relationship yet.`,
      });
    }
  }

  return issues;
}

export function detectOverlappingBriefs(
  articles: readonly ArticleBrief[] = PLANNED_ARTICLES,
): ContentPlanIssue[] {
  const issues: ContentPlanIssue[] = [];
  const slugMap = new Map<string, string[]>();
  const idMap = new Map<string, string[]>();

  for (const article of articles) {
    slugMap.set(article.slug, [...(slugMap.get(article.slug) ?? []), article.id]);
    idMap.set(article.id, [...(idMap.get(article.id) ?? []), article.slug]);
  }

  for (const [slug, ids] of slugMap) {
    if (ids.length > 1) {
      issues.push({
        severity: 'blocker',
        code: 'duplicate_slug',
        field: 'slug',
        message: `Duplicate slug "${slug}" on ids: ${ids.join(', ')}`,
      });
    }
  }
  for (const [id, slugs] of idMap) {
    if (slugs.length > 1) {
      issues.push({
        severity: 'blocker',
        code: 'duplicate_id',
        field: 'id',
        message: `Duplicate id "${id}" on slugs: ${slugs.join(', ')}`,
      });
    }
  }

  // Unknown related article references within the plan
  const known = new Set(articles.map((a) => a.slug));
  for (const article of articles) {
    for (const related of article.relatedArticles) {
      if (!known.has(related)) {
        issues.push({
          severity: 'warning',
          code: 'unknown_related_article',
          field: 'relatedArticles',
          articleId: article.id,
          slug: article.slug,
          message: `Related slug "${related}" is not in the 50-article plan.`,
        });
      }
    }
  }

  return issues;
}

export function validateContentPlan(
  articles: readonly ArticleBrief[] = PLANNED_ARTICLES,
): ContentPlanValidationReport {
  const issues: ContentPlanIssue[] = [
    ...articles.flatMap(validateArticleBrief),
    ...detectKeywordOverlap(articles),
    ...detectIntentConflicts(articles),
    ...detectMissingServiceSupport(articles),
    ...detectOverlappingBriefs(articles),
  ];

  if (articles.length !== 50) {
    issues.push({
      severity: 'blocker',
      code: 'incorrect_article_count',
      message: `Expected exactly 50 planned articles, found ${articles.length}.`,
    });
  }

  const platformTotals = getPlatformTotals();
  const expectedPlatforms = {
    instagram: 12,
    tiktok: 10,
    facebook: 8,
    youtube: 10,
    general: 10,
  } as const;
  for (const platform of Object.keys(expectedPlatforms) as Array<
    keyof typeof expectedPlatforms
  >) {
    if (platformTotals[platform] !== expectedPlatforms[platform]) {
      issues.push({
        severity: 'blocker',
        code: 'incorrect_platform_total',
        message: `Expected ${expectedPlatforms[platform]} ${platform} articles, found ${platformTotals[platform]}.`,
      });
    }
  }

  const batchTotals = getBatchTotals();
  const expectedBatches = { 1: 10, 2: 12, 3: 14, 4: 14 } as const;
  for (const batch of [1, 2, 3, 4] as const) {
    if (batchTotals[batch] !== expectedBatches[batch]) {
      issues.push({
        severity: 'blocker',
        code: 'incorrect_batch_total',
        message: `Expected batch ${batch} to have ${expectedBatches[batch]} articles, found ${batchTotals[batch]}.`,
      });
    }
  }

  const priorityTotals = { P1: 0, P2: 0, P3: 0, P4: 0 } as ContentPlanValidationReport['priorityTotals'];
  for (const article of articles) {
    priorityTotals[article.priority] += 1;
  }

  const valid = !issues.some(
    (i) => i.severity === 'blocker' || i.severity === 'error',
  );

  return {
    generatedAt: new Date().toISOString(),
    articleCount: articles.length,
    valid,
    issues,
    platformTotals,
    batchTotals,
    priorityTotals,
  };
}
