/**
 * Publishing effects — Document 15.08.
 * Sitemap / robots / cache implications derived from status.
 */

import { learnArticlePath, learnCategoryPath } from '@/config/routes';
import { getLearnCategoryById } from '@/data/learn/categories';
import type { EditorialArticleStatus, PublishingEffects } from '@/types/learn-editorial';
import { isPublicLiveArticleStatus } from '@/lib/learn/editorial/status';

export function buildPublishingEffects(
  status: EditorialArticleStatus,
  article: {
    slug: string;
    category: string;
    noindex?: boolean;
    editorialApproved?: boolean;
  },
): PublishingEffects {
  const live =
    isPublicLiveArticleStatus(status) && article.editorialApproved === true;
  const noindex = Boolean(article.noindex) || status === 'archived' || !live;
  const category = getLearnCategoryById(article.category);

  const effects: PublishingEffects = {
    publicVisible: live,
    sitemapEligible: live && !noindex,
    robotsIndex: live && !noindex,
    robotsFollow: live && status !== 'archived',
    cacheTags: [
      `learn-article:${article.slug}`,
      `learn-category:${article.category}`,
      'learn-index',
      'learn-sitemap',
    ],
    relatedArticlesDirty: status === 'updated' || status === 'archived' || live,
  };

  if (status === 'archived') {
    effects.redirectPrepared = {
      fromPath: learnArticlePath(article.slug),
      suggestedToPath: category
        ? learnCategoryPath(category.slug)
        : '/learn',
      strategy: 'manual_future',
    };
    effects.robotsIndex = false;
    effects.robotsFollow = false;
    effects.sitemapEligible = false;
    effects.publicVisible = false;
  }

  return effects;
}

/** Robots directive for an article given editorial status. */
export function getEditorialRobots(
  status: EditorialArticleStatus,
  noindex = false,
  editorialApproved = true,
) {
  const live =
    isPublicLiveArticleStatus(status) && editorialApproved === true;
  if (!live || noindex || status === 'archived') {
    return { index: false, follow: false } as const;
  }
  return { index: true, follow: true } as const;
}
