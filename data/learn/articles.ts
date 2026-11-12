/**
 * Learn articles registry — Document 15.01.
 * Published Learn Center articles only — no placeholders.
 *
 * Add new manually written articles here when editorial approves them.
 * Each entry should be a LearnArticleRecord (≈1000–2000 words).
 */

import { BEST_TIME_TO_POST_ON_INSTAGRAM_ARTICLE } from '@/data/learn/articles/best-time-to-post-on-instagram';
import { BEST_TIME_TO_POST_ON_TIKTOK_ARTICLE } from '@/data/learn/articles/best-time-to-post-on-tiktok';
import { HOW_TO_GET_MORE_INSTAGRAM_LIKES_ARTICLE } from '@/data/learn/articles/how-to-get-more-instagram-likes';
import { HOW_TO_GET_MORE_TIKTOK_FOLLOWERS_ARTICLE } from '@/data/learn/articles/how-to-get-more-tiktok-followers';
import { HOW_TO_GROW_INSTAGRAM_FOLLOWERS_ORGANICALLY_ARTICLE } from '@/data/learn/articles/how-to-grow-instagram-followers-organically';
import { INSTAGRAM_ALGORITHM_EXPLAINED_ARTICLE } from '@/data/learn/articles/instagram-algorithm-explained';
import { INSTAGRAM_MARKETING_FOR_SMALL_BUSINESSES_ARTICLE } from '@/data/learn/articles/instagram-marketing-for-small-businesses';
import { TIKTOK_SEO_GUIDE_ARTICLE } from '@/data/learn/articles/tiktok-seo-guide';
import { HOW_TO_GET_MORE_TIKTOK_LIKES_ARTICLE } from '@/data/learn/articles/how-to-get-more-tiktok-likes';
import { HOW_TO_GET_MORE_TIKTOK_VIEWS_ARTICLE } from '@/data/learn/articles/how-to-get-more-tiktok-views';
import { TIKTOK_FOR_BUSINESS_ARTICLE } from '@/data/learn/articles/tiktok-for-business';
import { HOW_TO_CREATE_A_TIKTOK_CONTENT_CALENDAR_ARTICLE } from '@/data/learn/articles/how-to-create-a-tiktok-content-calendar';
import { HOW_TO_GET_MORE_FACEBOOK_FOLLOWERS_ARTICLE } from '@/data/learn/articles/how-to-get-more-facebook-followers';
import { HOW_TO_INCREASE_FACEBOOK_ENGAGEMENT_ARTICLE } from '@/data/learn/articles/how-to-increase-facebook-engagement';
import { HOW_TO_GET_MORE_YOUTUBE_SUBSCRIBERS_ARTICLE } from '@/data/learn/articles/how-to-get-more-youtube-subscribers';
import { HOW_TO_GET_MORE_YOUTUBE_VIEWS_ARTICLE } from '@/data/learn/articles/how-to-get-more-youtube-views';
import { SOCIAL_MEDIA_MARKETING_MISTAKES_ARTICLE } from '@/data/learn/articles/social-media-marketing-mistakes';
import { ORGANIC_VS_PAID_SOCIAL_MEDIA_GROWTH_ARTICLE } from '@/data/learn/articles/organic-vs-paid-social-media-growth';
import { isPublicLiveArticle } from '@/lib/learn/editorial/status';
import type { LearnArticleRecord } from '@/types/learn';

export const LEARN_ARTICLES: readonly LearnArticleRecord[] = [
  HOW_TO_GROW_INSTAGRAM_FOLLOWERS_ORGANICALLY_ARTICLE,
  INSTAGRAM_ALGORITHM_EXPLAINED_ARTICLE,
  BEST_TIME_TO_POST_ON_INSTAGRAM_ARTICLE,
  HOW_TO_GET_MORE_INSTAGRAM_LIKES_ARTICLE,
  INSTAGRAM_MARKETING_FOR_SMALL_BUSINESSES_ARTICLE,
  HOW_TO_GET_MORE_TIKTOK_FOLLOWERS_ARTICLE,
  BEST_TIME_TO_POST_ON_TIKTOK_ARTICLE,
  TIKTOK_SEO_GUIDE_ARTICLE,
  HOW_TO_GET_MORE_TIKTOK_LIKES_ARTICLE,
  HOW_TO_GET_MORE_TIKTOK_VIEWS_ARTICLE,
  TIKTOK_FOR_BUSINESS_ARTICLE,
  HOW_TO_CREATE_A_TIKTOK_CONTENT_CALENDAR_ARTICLE,
  HOW_TO_GET_MORE_FACEBOOK_FOLLOWERS_ARTICLE,
  HOW_TO_INCREASE_FACEBOOK_ENGAGEMENT_ARTICLE,
  HOW_TO_GET_MORE_YOUTUBE_SUBSCRIBERS_ARTICLE,
  HOW_TO_GET_MORE_YOUTUBE_VIEWS_ARTICLE,
  SOCIAL_MEDIA_MARKETING_MISTAKES_ARTICLE,
  ORGANIC_VS_PAID_SOCIAL_MEDIA_GROWTH_ARTICLE,
];

export function getAllLearnArticleRecords(): LearnArticleRecord[] {
  return [...LEARN_ARTICLES];
}

/** Live public articles only (`published` | `updated`). */
export function getPublishedLearnArticleRecords(): LearnArticleRecord[] {
  return LEARN_ARTICLES.filter(isPublicLiveArticle);
}

export function getLearnArticleRecordBySlug(
  slug: string,
): LearnArticleRecord | undefined {
  return LEARN_ARTICLES.find((article) => article.slug === slug);
}

export function getPublishedLearnArticleBySlug(
  slug: string,
): LearnArticleRecord | undefined {
  return LEARN_ARTICLES.find(
    (article) => article.slug === slug && isPublicLiveArticle(article),
  );
}

export function getDraftLearnArticleBySlug(
  slug: string,
): LearnArticleRecord | undefined {
  return LEARN_ARTICLES.find(
    (article) => article.slug === slug && article.status === 'draft',
  );
}

export function getFeaturedLearnArticles(): LearnArticleRecord[] {
  return getPublishedLearnArticleRecords().filter((article) => article.featured);
}

export function getLearnArticlesByCategory(
  categoryId: string,
): LearnArticleRecord[] {
  return getPublishedLearnArticleRecords().filter(
    (article) => article.category === categoryId,
  );
}

export function getPublishedLearnArticleSlugs(): string[] {
  return getPublishedLearnArticleRecords().map((article) => article.slug);
}
