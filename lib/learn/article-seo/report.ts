/**
 * Duplicate metadata, keyword conflicts, orphans — Document 15.07.
 * Produces editorial reports; never auto-merges articles.
 */

import { LEARN_ARTICLES } from '@/data/learn/articles';
import { getLinkRegistry } from '@/data/linking/registry';
import { isPublicLiveArticle } from '@/lib/learn/editorial/status';
import { toArticleSeoRecord } from '@/lib/learn/article-seo/record';
import { validateArticleSeo } from '@/lib/learn/article-seo/validate';
import { buildArticleCanonical } from '@/lib/learn/article-seo/canonical';
import type { LearnArticleRecord } from '@/types/learn';
import type {
  ArticleSeoEditorialReport,
  ArticleSeoIssue,
} from '@/types/learn-article-seo';

function normalizeText(value: string): string {
  return value.trim().toLowerCase().replace(/\s+/g, ' ');
}

export function findDuplicateArticleMetadata(
  articles: readonly LearnArticleRecord[] = LEARN_ARTICLES,
): {
  duplicateTitles: string[];
  duplicateDescriptions: string[];
  duplicateCanonicals: string[];
  duplicateSlugs: string[];
  issues: ArticleSeoIssue[];
} {
  const titles = new Map<string, string[]>();
  const descriptions = new Map<string, string[]>();
  const canonicals = new Map<string, string[]>();
  const slugs = new Map<string, string[]>();
  const issues: ArticleSeoIssue[] = [];

  for (const article of articles) {
    const seo = toArticleSeoRecord(article);
    const titleKey = normalizeText(seo.metaTitle);
    const descKey = normalizeText(seo.metaDescription);
    const rawCanonical = seo.canonicalPath.trim();
    const declaredCanon = rawCanonical.startsWith('http')
      ? rawCanonical.replace(/\/$/, '')
      : rawCanonical.startsWith('/learn/')
        ? buildArticleCanonical(rawCanonical.replace(/^\/learn\//, ''))
        : buildArticleCanonical(seo.slug);
    const slugKey = seo.slug.toLowerCase();

    titles.set(titleKey, [...(titles.get(titleKey) ?? []), seo.slug]);
    descriptions.set(descKey, [...(descriptions.get(descKey) ?? []), seo.slug]);
    canonicals.set(declaredCanon, [
      ...(canonicals.get(declaredCanon) ?? []),
      seo.slug,
    ]);
    slugs.set(slugKey, [...(slugs.get(slugKey) ?? []), seo.slug]);
  }

  const duplicateTitles = [...titles.entries()]
    .filter(([, list]) => list.length > 1)
    .map(([key]) => key);
  const duplicateDescriptions = [...descriptions.entries()]
    .filter(([, list]) => list.length > 1 && list[0])
    .map(([key]) => key);
  const duplicateCanonicals = [...canonicals.entries()]
    .filter(([, list]) => list.length > 1)
    .map(([key]) => key);
  const duplicateSlugs = [...slugs.entries()]
    .filter(([, list]) => list.length > 1)
    .map(([key]) => key);

  for (const title of duplicateTitles) {
    issues.push({
      severity: 'warning',
      code: 'duplicate_title',
      field: 'metaTitle',
      message: `Duplicate meta title cluster: "${title}"`,
    });
  }
  for (const desc of duplicateDescriptions) {
    issues.push({
      severity: 'warning',
      code: 'duplicate_description',
      field: 'metaDescription',
      message: `Duplicate meta description detected.`,
    });
    void desc;
  }
  for (const canon of duplicateCanonicals) {
    issues.push({
      severity: 'blocker',
      code: 'duplicate_canonical',
      field: 'canonicalPath',
      message: `Duplicate canonical: ${canon}`,
    });
  }
  for (const slug of duplicateSlugs) {
    issues.push({
      severity: 'blocker',
      code: 'duplicate_slug',
      field: 'slug',
      message: `Duplicate slug: ${slug}`,
    });
  }

  return {
    duplicateTitles,
    duplicateDescriptions,
    duplicateCanonicals,
    duplicateSlugs,
    issues,
  };
}

export function findArticleKeywordConflicts(
  articles: readonly LearnArticleRecord[] = LEARN_ARTICLES,
): Array<{ primaryKeyword: string; slugs: string[] }> {
  const map = new Map<string, string[]>();
  for (const article of articles) {
    const seo = toArticleSeoRecord(article);
    if (!seo.primaryKeyword) continue;
    const key = normalizeText(seo.primaryKeyword);
    map.set(key, [...(map.get(key) ?? []), seo.slug]);
  }
  return [...map.entries()]
    .filter(([, slugs]) => slugs.length > 1)
    .map(([primaryKeyword, slugs]) => ({ primaryKeyword, slugs }));
}

/**
 * Orphan articles: published Learn articles with no inbound link from the
 * linking registry (excluding self).
 */
export function findOrphanArticles(
  articles: readonly LearnArticleRecord[] = LEARN_ARTICLES,
): string[] {
  const pages = getLinkRegistry();
  const inbound = new Set<string>();

  for (const page of pages) {
    for (const related of page.relatedArticles) {
      inbound.add(related.replace(/^learn\//, ''));
    }
  }

  return articles
    .filter(
      (article) => isPublicLiveArticle(article) && !inbound.has(article.slug),
    )
    .map((article) => article.slug);
}

export function buildArticleSeoEditorialReport(
  articles: readonly LearnArticleRecord[] = LEARN_ARTICLES,
): ArticleSeoEditorialReport {
  const duplicates = findDuplicateArticleMetadata(articles);
  const keywordConflicts = findArticleKeywordConflicts(articles);
  const orphanSlugs = findOrphanArticles(articles);
  const issues: ArticleSeoIssue[] = [...duplicates.issues];

  for (const conflict of keywordConflicts) {
    issues.push({
      severity: 'warning',
      code: 'keyword_conflict',
      field: 'primaryKeyword',
      message: `Multiple articles share primary keyword "${conflict.primaryKeyword}": ${conflict.slugs.join(', ')}`,
    });
  }
  for (const slug of orphanSlugs) {
    issues.push({
      severity: 'warning',
      code: 'orphan_article',
      field: 'internalLinks',
      message: `Published article "${slug}" has no inbound Learn links in the linking registry.`,
      slug,
    });
  }

  let indexableCount = 0;
  for (const article of articles) {
    const result = validateArticleSeo(article);
    issues.push(...result.issues);
    if (result.indexable) indexableCount += 1;
  }

  return {
    generatedAt: new Date().toISOString(),
    articleCount: articles.length,
    indexableCount,
    duplicateTitles: duplicates.duplicateTitles,
    duplicateDescriptions: duplicates.duplicateDescriptions,
    duplicateCanonicals: duplicates.duplicateCanonicals,
    duplicateSlugs: duplicates.duplicateSlugs,
    keywordConflicts,
    orphanSlugs,
    issues,
  };
}
