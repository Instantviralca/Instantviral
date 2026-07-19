/**
 * Search ranking — Document 15.05.
 */

import { normalizeSearchToken, tokenizeQuery } from '@/lib/learn/search/sanitize';
import type {
  ArticleSearchDocument,
  RankedSearchHit,
} from '@/types/learn-search';

function includesNormalized(haystack: string, needle: string): boolean {
  if (!needle) return false;
  return normalizeSearchToken(haystack).includes(needle);
}

function allTokensMatch(haystack: string, tokens: string[]): boolean {
  const normalized = normalizeSearchToken(haystack);
  return tokens.every((token) => normalized.includes(token));
}

/**
 * Rank documents for a sanitized query.
 * Priority: exact title → title tokens → category/tag → excerpt → other metadata.
 * Equal scores sort by title then id (deterministic).
 */
export function rankSearchResults(
  documents: readonly ArticleSearchDocument[],
  query: string,
): RankedSearchHit[] {
  const tokens = tokenizeQuery(query);
  if (tokens.length === 0) {
    return documents.map((document) => ({
      document,
      score: 0,
      reasons: [],
    }));
  }

  const fullQuery = tokens.join(' ');
  const hits: RankedSearchHit[] = [];

  for (const document of documents) {
    let score = 0;
    const reasons: string[] = [];
    const titleNorm = normalizeSearchToken(document.title);

    if (titleNorm === fullQuery) {
      score += 1000;
      reasons.push('exact_title');
    } else if (allTokensMatch(document.title, tokens)) {
      score += 500;
      reasons.push('title_keywords');
    } else if (tokens.some((token) => titleNorm.includes(token))) {
      score += 350;
      reasons.push('title_partial');
    }

    const categoryHit =
      includesNormalized(document.categoryName, fullQuery) ||
      includesNormalized(document.categorySlug, fullQuery) ||
      tokens.some(
        (token) =>
          includesNormalized(document.categoryName, token) ||
          includesNormalized(document.categorySlug, token),
      );
    const tagHit = document.tags.some(
      (tag) =>
        includesNormalized(tag, fullQuery) ||
        tokens.some((token) => includesNormalized(tag, token)),
    );
    if (categoryHit || tagHit) {
      score += 200;
      reasons.push(categoryHit ? 'category' : 'tag');
    }

    if (
      allTokensMatch(document.excerpt, tokens) ||
      tokens.some((token) => includesNormalized(document.excerpt, token))
    ) {
      score += 100;
      reasons.push('excerpt');
    }

    const otherFields = [
      document.authorName,
      document.platform,
      document.summary ?? '',
      ...document.keywords,
    ].join(' ');
    if (tokens.some((token) => includesNormalized(otherFields, token))) {
      score += 40;
      reasons.push('metadata');
    }

    if (score > 0) {
      hits.push({ document, score, reasons });
    }
  }

  return hits.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    const titleCmp = a.document.title.localeCompare(b.document.title);
    if (titleCmp !== 0) return titleCmp;
    return a.document.id.localeCompare(b.document.id);
  });
}

export function searchArticles(
  documents: readonly ArticleSearchDocument[],
  query: string,
): ArticleSearchDocument[] {
  const tokens = tokenizeQuery(query);
  if (tokens.length === 0) {
    return [...documents];
  }
  return rankSearchResults(documents, query).map((hit) => hit.document);
}
