/**
 * Learn internal-linking helpers — Document 15.01 + 14.05.
 */

import { learnCategoryPath, routes } from '@/config/routes';
import { getLearnCategoryById } from '@/data/learn';
import { buildBreadcrumb } from '@/lib/linking/breadcrumbs';
import { getRelatedServices } from '@/lib/linking/related-services';
import {
  getPublicLearnArticleBySlug,
  getRelatedPublicArticles,
  listPublicLearnCategories,
} from '@/lib/learn/getters';
import { getCategoryBreadcrumbs } from '@/lib/learn/taxonomy/schema';
import type { PublicLearnArticle } from '@/types/learn';
import type { BreadcrumbItem } from '@/types/shared';
import type { InternalLink } from '@/types/linking';

export function getLearnIndexBreadcrumbs(): BreadcrumbItem[] {
  const fromRegistry = buildBreadcrumb('learn');
  if (fromRegistry.length > 1) return fromRegistry;
  return [
    { label: 'Home', href: routes.home },
    { label: 'Learn' },
  ];
}

export function getLearnCategoryBreadcrumbs(categorySlug: string): BreadcrumbItem[] {
  const category = listPublicLearnCategories().find((item) => item.slug === categorySlug);
  if (category) {
    return getCategoryBreadcrumbs(category);
  }
  return [
    { label: 'Home', href: routes.home },
    { label: 'Learn', href: routes.learn },
    { label: categorySlug },
  ];
}

export function getLearnArticleBreadcrumbs(articleSlug: string): BreadcrumbItem[] {
  const article = getPublicLearnArticleBySlug(articleSlug);
  if (!article) {
    return [
      { label: 'Home', href: routes.home },
      { label: 'Learn', href: routes.learn },
    ];
  }

  const category = getLearnCategoryById(article.category);

  return [
    { label: 'Home', href: routes.home },
    { label: 'Learn', href: routes.learn },
    {
      label: article.categoryName,
      href: category ? learnCategoryPath(category.slug) : undefined,
    },
    { label: article.title },
  ];
}

export function getLearnRelatedServicesForArticle(
  article: PublicLearnArticle,
): InternalLink[] {
  if (article.relatedServices.length === 0) return [];
  const seed = article.relatedServices[0]!;
  return getRelatedServices(seed, {
    limit: 4,
    preferredSlugs: article.relatedServices,
  });
}

export function getLearnRelatedArticlesForArticle(
  article: PublicLearnArticle,
  limit = 4,
): PublicLearnArticle[] {
  return getRelatedPublicArticles(article, limit);
}
