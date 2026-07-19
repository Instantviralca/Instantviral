/**
 * Learn Search & Filters tests — Document 15.05.
 */

import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { LearnEmptyState } from '@/components/learn/search/LearnEmptyState';
import { LearnFilterDrawer } from '@/components/learn/search/LearnFilterDrawer';
import {
  trackLearnSearchEvent,
  learnSearchAnalyticsEvents,
} from '@/lib/analytics/learn-search-events';
import {
  buildArticleSearchIndex,
  clearLearnFilters,
  filterArticles,
  getActiveFilterCount,
  getLearnDiscoveryCanonicalPath,
  getLearnDiscoveryRobots,
  parseLearnSearchParams,
  rankSearchResults,
  removeFilterFromState,
  runLearnSearch,
  sanitizeSearchQuery,
  searchArticles,
  serializeLearnSearchParams,
  sortArticles,
  validateLearnFilters,
} from '@/lib/learn/search';
import type { PublicLearnArticle } from '@/types/learn';
import type { ArticleSearchDocument } from '@/types/learn-search';

vi.mock('@/lib/analytics/core/track', () => ({
  trackEvent: vi.fn(() => ({ ok: true, blocked: false })),
}));

import { trackEvent } from '@/lib/analytics/core/track';

function makeDoc(
  overrides: Partial<ArticleSearchDocument> = {},
): ArticleSearchDocument {
  return {
    id: 'a1',
    slug: 'instagram-followers-guide',
    title: 'Instagram Followers Guide',
    excerpt: 'Grow followers with ethical habits.',
    categoryId: 'instagram',
    categorySlug: 'instagram',
    categoryName: 'Instagram',
    tags: ['followers', 'engagement'],
    platform: 'instagram',
    authorName: 'Jordan Lee',
    keywords: ['instagram', 'followers'],
    readingTime: 6,
    publishedAt: '2024-06-01T00:00:00.000Z',
    updatedAt: '2024-07-01T00:00:00.000Z',
    featured: true,
    href: '/learn/instagram-followers-guide',
    ...overrides,
  };
}

function makePublic(
  overrides: Partial<PublicLearnArticle> = {},
): PublicLearnArticle {
  return {
    id: 'pub-1',
    slug: 'tiktok-likes-basics',
    title: 'TikTok Likes Basics',
    excerpt: 'Understand likes on TikTok.',
    content: 'Full body should not be required for search index.',
    blocks: [],
    category: 'tiktok',
    categoryName: 'TikTok',
    tags: ['likes'],
    authorId: 'missing',
    readingTime: 3,
    publishedAt: '2024-05-01T00:00:00.000Z',
    updatedAt: '2024-05-02T00:00:00.000Z',
    showModifiedDate: false,
    seo: {
      title: 'TikTok Likes Basics',
      description: 'Understand likes on TikTok.',
      keywords: ['tiktok', 'likes'],
    },
    relatedServices: [],
    relatedArticles: [],
    featured: false,
    href: '/learn/tiktok-likes-basics',
    keyTakeaways: [],
    faqs: [],
    status: 'published',
    ...overrides,
  };
}

describe('Learn Search & Filters — Document 15.05', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('sanitizes queries', () => {
    expect(sanitizeSearchQuery('  Hello   World  ')).toBe('Hello World');
    expect(sanitizeSearchQuery('<script>alert(1)</script>')).not.toContain('<');
    expect(sanitizeSearchQuery('a'.repeat(200)).length).toBeLessThanOrEqual(120);
  });

  it('searches by title', () => {
    const docs = [
      makeDoc({ keywords: [] }),
      makeDoc({
        id: 'a2',
        slug: 'other',
        title: 'Facebook Page Tips',
        excerpt: 'Unrelated page advice',
        tags: [],
        keywords: [],
        categoryName: 'Facebook',
        categorySlug: 'facebook',
        platform: 'facebook',
        authorName: '',
      }),
    ];
    const results = searchArticles(docs, 'Instagram Followers');
    expect(results).toHaveLength(1);
    expect(results[0]?.slug).toBe('instagram-followers-guide');
  });

  it('searches by tag', () => {
    const docs = [
      makeDoc({ keywords: [] }),
      makeDoc({
        id: 'a2',
        tags: ['views'],
        title: 'Views Guide',
        keywords: [],
        excerpt: 'About video views only',
        authorName: '',
      }),
    ];
    expect(searchArticles(docs, 'followers')).toHaveLength(1);
  });

  it('filters by category, platform, reading time, and featured', () => {
    const docs = [
      makeDoc(),
      makeDoc({
        id: 'a2',
        categorySlug: 'tiktok',
        platform: 'tiktok',
        readingTime: 20,
        featured: false,
        tags: ['views'],
      }),
    ];

    expect(filterArticles(docs, { category: 'instagram' })).toHaveLength(1);
    expect(filterArticles(docs, { platform: 'tiktok' })).toHaveLength(1);
    expect(filterArticles(docs, { readingTime: 'over-15' })).toHaveLength(1);
    expect(filterArticles(docs, { featured: true })).toHaveLength(1);
  });

  it('supports multiple filters and removing one', () => {
    const docs = [
      makeDoc(),
      makeDoc({
        id: 'a2',
        tags: ['followers'],
        featured: false,
        title: 'Other Followers',
      }),
    ];
    const filtered = filterArticles(docs, {
      tag: 'followers',
      featured: true,
    });
    expect(filtered).toHaveLength(1);

    const state = validateLearnFilters({
      tag: 'followers',
      featured: 'true',
      category: 'instagram',
    }).state;
    expect(getActiveFilterCount(state)).toBe(3);
    const removed = removeFilterFromState(state, 'tag');
    expect(removed.tag).toBeUndefined();
    expect(removed.featured).toBe(true);
  });

  it('clears all filters', () => {
    const cleared = clearLearnFilters({ lockedCategory: 'instagram' });
    expect(cleared.q).toBe('');
    expect(cleared.tag).toBeUndefined();
    expect(cleared.category).toBe('instagram');
    expect(cleared.page).toBe(1);
  });

  it('ranks relevance and sorts newest / updated', () => {
    const docs = [
      makeDoc({
        id: 'b',
        title: 'Growth tips',
        excerpt: 'instagram followers appear here',
        publishedAt: '2024-01-01T00:00:00.000Z',
        updatedAt: '2024-08-01T00:00:00.000Z',
      }),
      makeDoc({
        id: 'a',
        title: 'Instagram Followers Guide',
        publishedAt: '2024-06-01T00:00:00.000Z',
        updatedAt: '2024-06-02T00:00:00.000Z',
      }),
    ];
    const ranked = rankSearchResults(docs, 'Instagram Followers Guide');
    expect(ranked[0]?.document.id).toBe('a');
    expect(ranked[0]?.score).toBeGreaterThan(ranked[1]?.score ?? 0);

    const newest = sortArticles(docs, 'newest');
    expect(newest[0]?.id).toBe('a');
    const updated = sortArticles(docs, 'updated');
    expect(updated[0]?.id).toBe('b');
  });

  it('ignores unsupported parameters safely', () => {
    const parsed = parseLearnSearchParams({
      q: '  likes  ',
      category: 'not-real',
      tag: 'also-fake',
      platform: 'myspace',
      sort: 'popular',
      readingTime: 'forever',
      featured: 'maybe',
      page: '0',
      evil: '<script>',
    });
    expect(parsed.state.q).toBe('likes');
    expect(parsed.state.category).toBeUndefined();
    expect(parsed.state.tag).toBeUndefined();
    expect(parsed.state.platform).toBeUndefined();
    expect(parsed.state.sort).toBe('relevance');
    expect(parsed.state.page).toBe(1);
    expect(parsed.ignored.length).toBeGreaterThan(0);
  });

  it('returns empty results without inventing articles', () => {
    const page = runLearnSearch([makeDoc()], {
      q: 'zzzz-no-match',
      sort: 'relevance',
      page: 1,
    });
    expect(page.total).toBe(0);
    expect(page.items).toEqual([]);
    const html = renderToStaticMarkup(createElement(LearnEmptyState, {}));
    expect(html).toContain('No articles found');
    expect(html).toContain('data-learn-empty="true"');
  });

  it('excludes drafts from the search index builder', () => {
    const published = makePublic();
    // PublicLearnArticle is always status published; builder still guards.
    const index = buildArticleSearchIndex([published]);
    expect(index).toHaveLength(1);
    expect(index[0]).not.toHaveProperty('content');
    expect(JSON.stringify(index[0])).not.toContain('Full body');
  });

  it('serializes and re-parses URL state (shareable / back-forward)', () => {
    const state = validateLearnFilters({
      q: 'reels',
      category: 'instagram',
      tag: 'reels',
      platform: 'instagram',
      readingTime: '5-10',
      featured: 'true',
      sort: 'newest',
      page: '2',
    }).state;
    const params = serializeLearnSearchParams(state);
    const roundTrip = parseLearnSearchParams(params).state;
    expect(roundTrip.q).toBe('reels');
    expect(roundTrip.category).toBe('instagram');
    expect(roundTrip.tag).toBe('reels');
    expect(roundTrip.platform).toBe('instagram');
    expect(roundTrip.readingTime).toBe('5-10');
    expect(roundTrip.featured).toBe(true);
    expect(roundTrip.sort).toBe('newest');
    expect(roundTrip.page).toBe(2);
  });

  it('keeps clean canonical and noindexes dedicated search route', () => {
    expect(getLearnDiscoveryCanonicalPath('/learn?q=test')).toBe('/learn');
    expect(
      getLearnDiscoveryRobots({ pathname: '/learn', isFiltered: true }),
    ).toEqual({ index: true, follow: true });
    expect(
      getLearnDiscoveryRobots({ pathname: '/learn/search', isFiltered: true }),
    ).toEqual({ index: false, follow: false });
  });

  it('prepares an accessible filter drawer trigger', () => {
    const state = clearLearnFilters();
    const html = renderToStaticMarkup(
      createElement(LearnFilterDrawer, {
        state,
        draft: state,
        onDraftChange: () => undefined,
        onApply: () => undefined,
        onClear: () => undefined,
        categories: [],
        tags: [],
        resultCount: 0,
      }),
    );
    expect(html).toContain('Open filters');
    expect(html).toContain('min-h-11');
  });

  it('never sends raw search queries in analytics payloads', () => {
    trackLearnSearchEvent(learnSearchAnalyticsEvents.learn_search_submit, {
      query: 'my email is person@example.com',
      queryLength: 30,
      resultCount: 0,
      category: 'instagram',
    });
    expect(trackEvent).toHaveBeenCalled();
    const arg = vi.mocked(trackEvent).mock.calls[0]?.[0];
    expect(arg?.metadata).not.toHaveProperty('query');
    expect(JSON.stringify(arg)).not.toContain('person@example.com');
    expect(arg?.metadata?.queryLength).toBe(30);
  });
});
