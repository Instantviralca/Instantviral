/**
 * Keyword / intent map — Document 16.01.
 */

import { PLANNED_ARTICLES } from '@/data/content-plan/articles';
import type { KeywordIntentEntry } from '@/types/content-plan';

export const KEYWORD_INTENT_MAP: readonly KeywordIntentEntry[] =
  PLANNED_ARTICLES.flatMap((article) => {
    const primary: KeywordIntentEntry = {
      keyword: article.primaryKeyword,
      intent: article.searchIntent,
      articleSlug: article.slug,
      isPrimary: true,
    };
    const secondary: KeywordIntentEntry[] = article.secondaryKeywords.map(
      (keyword) => ({
        keyword,
        intent: article.searchIntent,
        articleSlug: article.slug,
        isPrimary: false,
      }),
    );
    return [primary, ...secondary];
  });

export function getPrimaryKeywords(): string[] {
  return KEYWORD_INTENT_MAP.filter((entry) => entry.isPrimary).map(
    (entry) => entry.keyword,
  );
}
