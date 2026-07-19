import { CONSTANTS } from '@/config/constants';
import { getCtaCatalog, resolveCta } from '@/data/content/cta';
import { getFaqItemsByIds } from '@/data/content/faq';
import { getLearnContentBySlug } from '@/data/content/learn';
import { getServiceContentBySlug } from '@/data/content/services';
import { getAllLearnArticles } from '@/data/learn';
import {
  filterApprovedServiceSlugs,
  getRelatedArticles as getEngineRelatedArticles,
  getRelatedServiceEntities,
} from '@/lib/linking';
import { getServiceBySlug } from '@/data/services';
import type { CTAContent, FAQItem, LearnArticleContent } from '@/types/content';
import type { LearnArticle } from '@/types/blog';
import type { Service } from '@/types/service';
import type { SharedCtaCatalog } from '@/types/content';

/**
 * Related services via Internal Linking Engine (Document 14.05).
 * Content overrides are filtered to approved active services only.
 */
export function resolveRelatedServices(
  service: Service,
  contentSlugs?: string[],
  limit: number = CONSTANTS.maxRelatedServices > 3 ? 3 : CONSTANTS.maxRelatedServices,
): Service[] {
  const preferred = contentSlugs
    ? filterApprovedServiceSlugs(contentSlugs)
    : undefined;

  return getRelatedServiceEntities(service.slug, {
    surface: 'service',
    limit: Math.min(limit, 3),
    preferredSlugs: preferred,
  });
}

/** Related learn articles from content slug list (or same-platform fallback). */
export function resolveRelatedArticles(
  articleSlugs: string[],
  options?: {
    platformId?: LearnArticleContent['platformId'];
    excludeSlug?: string;
    limit?: number;
  },
): LearnArticle[] {
  const limit = options?.limit ?? 3;
  const sourceSlug = options?.excludeSlug
    ? `learn/${options.excludeSlug}`
    : 'learn';

  const links = getEngineRelatedArticles(sourceSlug, {
    platform: options?.platformId,
    limit,
    preferredSlugs: articleSlugs,
  });

  return links
    .map((link) => {
      const slug = link.slug.replace(/^learn\//, '');
      return getAllLearnArticles().find((article) => article.slug === slug);
    })
    .filter((item): item is LearnArticle => Boolean(item))
    .slice(0, limit);
}

/** Related service registry entries from learn content. */
export function resolveRelatedServicesFromLearn(
  content: LearnArticleContent,
  limit = 3,
): Service[] {
  return getRelatedServiceEntities(`learn/${content.slug}`, {
    surface: 'service',
    limit: Math.min(limit, 3),
    preferredSlugs: filterApprovedServiceSlugs(
      content.relatedServices.serviceSlugs,
    ),
  });
}

/** CTA targets catalog + page-specific overrides. */
export function resolveCtaTargets(
  overrides?: Partial<SharedCtaCatalog>,
): SharedCtaCatalog {
  return {
    ...getCtaCatalog(),
    ...overrides,
  };
}

export function resolvePrimaryServiceCta(serviceSlug: string): CTAContent {
  return resolveCta('getStarted', { href: `/${serviceSlug}` });
}

/**
 * Map FAQ ids → FAQ items, optionally attach related service CTAs
 * for FAQ → Services internal linking.
 */
export function mapFaqWithServiceLinks(faqIds: string[]): Array<
  FAQItem & { relatedServices: Service[] }
> {
  return getFaqItemsByIds(faqIds).map((faq) => {
    const fromTestimonials = inferServicesFromFaq(faq.id);
    return {
      ...faq,
      relatedServices: fromTestimonials,
    };
  });
}

function inferServicesFromFaq(faqId: string): Service[] {
  if (faqId.includes('followers')) {
    return getRelatedServiceEntities('buy-instagram-followers', {
      limit: 2,
      preferredSlugs: ['buy-instagram-followers', 'buy-tiktok-followers'],
    }).filter((service) => service.category === 'followers').slice(0, 2);
  }
  if (faqId.includes('engagement')) {
    return getRelatedServiceEntities('buy-instagram-likes', {
      limit: 2,
      preferredSlugs: ['buy-instagram-likes', 'buy-instagram-views'],
    });
  }
  return [];
}

/** Learn content + registry article for a slug. */
export function resolveLearnArticleBundle(slug: string): {
  registry: LearnArticle | undefined;
  content: LearnArticleContent | undefined;
} {
  return {
    registry: getAllLearnArticles().find((article) => article.slug === slug),
    content: getLearnContentBySlug(slug),
  };
}

/** Service registry + content document for a buy-* slug. */
export function resolveServiceBundle(slug: string): {
  service: Service | undefined;
  content: ReturnType<typeof getServiceContentBySlug>;
} {
  return {
    service: getServiceBySlug(slug),
    content: getServiceContentBySlug(slug),
  };
}
