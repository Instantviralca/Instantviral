/**
 * Category & tag validation — Document 15.04.
 */

import { LEARN_CATEGORIES } from '@/data/learn/categories';
import { LEARN_ARTICLES } from '@/data/learn/articles';
import { LEARN_TAGS } from '@/data/learn/tags';
import { isPublicLiveArticle } from '@/lib/learn/editorial/status';
import type { LearnCategory, LearnTag } from '@/types/learn';
import type {
  CategoryValidationResult,
  TagValidationResult,
  TaxonomyValidationIssue,
  TaxonomyValidationReport,
} from '@/types/learn-taxonomy';

const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export function validateCategory(category: LearnCategory): CategoryValidationResult {
  const issues: CategoryValidationResult['issues'] = [];

  if (!category.id) {
    issues.push({ level: 'error', field: 'id', message: 'Category id is required.' });
  }
  if (!category.name.trim()) {
    issues.push({ level: 'error', field: 'name', message: 'Category name is required.' });
  }
  if (!category.slug.trim() || !SLUG_PATTERN.test(category.slug)) {
    issues.push({
      level: 'error',
      field: 'slug',
      message: 'Category slug must be lowercase kebab-case.',
    });
  }
  if (!category.description.trim()) {
    issues.push({
      level: 'error',
      field: 'description',
      message: 'Category description is required.',
    });
  }
  if (!category.seo.title.trim() || !category.seo.description.trim()) {
    issues.push({
      level: 'error',
      field: 'seo',
      message: 'Category SEO title and description are required.',
    });
  }
  if (
    category.seo.canonicalPath &&
    category.seo.canonicalPath !== `/learn/${category.slug}`
  ) {
    issues.push({
      level: 'error',
      field: 'seo.canonicalPath',
      message: 'Canonical path must match /learn/{slug}.',
    });
  }
  if (category.active !== (category.status === 'active')) {
    issues.push({
      level: 'warning',
      field: 'active',
      message: 'active and status are out of sync.',
    });
  }

  return {
    valid: issues.every((issue) => issue.level !== 'error'),
    issues,
  };
}

export function validateTag(tag: LearnTag): TagValidationResult {
  const issues: TagValidationResult['issues'] = [];

  if (!tag.id.trim()) {
    issues.push({ level: 'error', field: 'id', message: 'Tag id is required.' });
  }
  if (!tag.name.trim()) {
    issues.push({ level: 'error', field: 'name', message: 'Tag name is required.' });
  }
  if (!tag.slug.trim() || !SLUG_PATTERN.test(tag.slug)) {
    issues.push({
      level: 'error',
      field: 'slug',
      message: 'Tag slug must be lowercase kebab-case.',
    });
  }
  if (!tag.description.trim()) {
    issues.push({
      level: 'warning',
      field: 'description',
      message: 'Tag description is missing.',
    });
  }

  return {
    valid: issues.every((issue) => issue.level !== 'error'),
    issues,
  };
}

export function detectDuplicateCategories(
  categories: readonly LearnCategory[] = LEARN_CATEGORIES,
): string[] {
  const seen = new Map<string, number>();
  for (const category of categories) {
    seen.set(category.slug, (seen.get(category.slug) ?? 0) + 1);
  }
  return [...seen.entries()]
    .filter(([, count]) => count > 1)
    .map(([slug]) => slug)
    .sort();
}

export function detectDuplicateTags(
  tags: readonly LearnTag[] = LEARN_TAGS,
): string[] {
  const seen = new Map<string, number>();
  for (const tag of tags) {
    seen.set(tag.slug, (seen.get(tag.slug) ?? 0) + 1);
  }
  return [...seen.entries()]
    .filter(([, count]) => count > 1)
    .map(([slug]) => slug)
    .sort();
}

function detectDuplicateIds(
  items: readonly { id: string }[],
): string[] {
  const seen = new Map<string, number>();
  for (const item of items) {
    seen.set(item.id, (seen.get(item.id) ?? 0) + 1);
  }
  return [...seen.entries()]
    .filter(([, count]) => count > 1)
    .map(([id]) => id);
}

/**
 * Full taxonomy validation report — never silently ignores issues.
 */
export function validateLearnTaxonomy(): TaxonomyValidationReport {
  const issues: TaxonomyValidationIssue[] = [];
  const duplicateCategorySlugs = detectDuplicateCategories();
  const duplicateTagSlugs = detectDuplicateTags();
  const duplicateCategoryIds = detectDuplicateIds(LEARN_CATEGORIES);
  const duplicateTagIds = detectDuplicateIds(LEARN_TAGS);

  for (const slug of duplicateCategorySlugs) {
    issues.push({
      level: 'error',
      code: 'duplicate_category_slug',
      entity: 'registry',
      id: slug,
      field: 'slug',
      message: `Duplicate category slug: ${slug}`,
    });
  }
  for (const id of duplicateCategoryIds) {
    issues.push({
      level: 'error',
      code: 'duplicate_category_id',
      entity: 'registry',
      id,
      field: 'id',
      message: `Duplicate category id: ${id}`,
    });
  }
  for (const slug of duplicateTagSlugs) {
    issues.push({
      level: 'error',
      code: 'duplicate_tag_slug',
      entity: 'registry',
      id: slug,
      field: 'slug',
      message: `Duplicate tag slug: ${slug}`,
    });
  }
  for (const id of duplicateTagIds) {
    issues.push({
      level: 'error',
      code: 'duplicate_tag_id',
      entity: 'registry',
      id,
      field: 'id',
      message: `Duplicate tag id: ${id}`,
    });
  }

  for (const category of LEARN_CATEGORIES) {
    const result = validateCategory(category);
    for (const issue of result.issues) {
      issues.push({
        level: issue.level,
        code:
          issue.field === 'description'
            ? 'missing_description'
            : issue.field === 'seo' || issue.field.startsWith('seo.')
              ? 'invalid_seo'
              : issue.field === 'slug'
                ? 'invalid_slug'
                : 'invalid_relationship',
        entity: 'category',
        id: category.id,
        field: issue.field,
        message: issue.message,
      });
    }

    if (category.active) {
      const count = LEARN_ARTICLES.filter(
        (article) =>
          article.category === category.id && isPublicLiveArticle(article),
      ).length;
      if (count === 0) {
        issues.push({
          level: 'warning',
          code: 'empty_category',
          entity: 'category',
          id: category.id,
          message: `Active category "${category.name}" has no published articles yet.`,
        });
      }
    }
  }

  for (const tag of LEARN_TAGS) {
    const result = validateTag(tag);
    for (const issue of result.issues) {
      issues.push({
        level: issue.level,
        code:
          issue.field === 'description'
            ? 'missing_description'
            : issue.field === 'slug'
              ? 'invalid_slug'
              : 'invalid_relationship',
        entity: 'tag',
        id: tag.id,
        field: issue.field,
        message: issue.message,
      });
    }
  }

  const categoryIds = new Set(LEARN_CATEGORIES.map((c) => c.id));
  const tagSlugs = new Map(LEARN_TAGS.map((t) => [t.slug, t]));

  for (const article of LEARN_ARTICLES) {
    if (!categoryIds.has(article.category)) {
      issues.push({
        level: 'error',
        code: 'unknown_category',
        entity: 'article',
        id: article.id,
        field: 'category',
        message: `Article "${article.slug}" references unknown category "${article.category}".`,
      });
    } else {
      const category = LEARN_CATEGORIES.find((c) => c.id === article.category);
      if (category && !category.active && isPublicLiveArticle(article)) {
        issues.push({
          level: 'error',
          code: 'inactive_category_assignment',
          entity: 'article',
          id: article.id,
          field: 'category',
          message: `Published article "${article.slug}" is assigned to inactive category "${category.slug}".`,
        });
      }
    }

    for (const tagSlug of article.tags) {
      const tag = tagSlugs.get(tagSlug);
      if (!tag) {
        issues.push({
          level: 'error',
          code: 'unknown_tag',
          entity: 'article',
          id: article.id,
          field: 'tags',
          message: `Article "${article.slug}" references unknown tag "${tagSlug}".`,
        });
        continue;
      }
      if (!tag.active && isPublicLiveArticle(article)) {
        issues.push({
          level: 'error',
          code: 'inactive_tag_assignment',
          entity: 'article',
          id: article.id,
          field: 'tags',
          message: `Published article "${article.slug}" is assigned to inactive tag "${tagSlug}".`,
        });
      }
    }
  }

  const activeCategoryCount = LEARN_CATEGORIES.filter((c) => c.active).length;
  const activeTagCount = LEARN_TAGS.filter((t) => t.active).length;

  return {
    valid: issues.every((issue) => issue.level !== 'error'),
    generatedAt: new Date().toISOString(),
    categoryCount: LEARN_CATEGORIES.length,
    tagCount: LEARN_TAGS.length,
    activeCategoryCount,
    activeTagCount,
    issues,
    duplicateCategorySlugs,
    duplicateTagSlugs,
  };
}
