/**
 * Internal linking SEO report — enterprise crawl graph snapshot.
 */

import { describe, expect, it } from 'vitest';

import { APPROVED_SERVICE_SLUGS } from '@/data/linking/approved-services';
import { getFooterColumns } from '@/data/footer';
import { listPublicLearnArticles, toPublicLearnArticle } from '@/lib/learn/getters';
import {
  applyContextualLinksToBlocks,
  countContextualInlineLinks,
} from '@/lib/learn/contextual-links';
import { getRelatedArticles } from '@/lib/linking/related-articles';
import { getPublishedLearnArticleRecords } from '@/data/learn/articles';
import { findOrphanSitemapPages, buildSitemapEntries } from '@/lib/seo/sitemap';

describe('Enterprise internal linking quality', () => {
  it('annotates every Learn article with at least 8 contextual in-body links', () => {
    const short: string[] = [];
    for (const record of getPublishedLearnArticleRecords()) {
      const article = toPublicLearnArticle(record);
      const { blocks, appliedCount } = applyContextualLinksToBlocks(
        article,
        article.blocks,
        8,
      );
      const counted = countContextualInlineLinks(blocks);
      if (appliedCount < 8 || counted < 8) {
        short.push(`${article.slug}: applied=${appliedCount} counted=${counted}`);
      }
    }
    expect(short).toEqual([]);
  });

  it('provides Related Learn (6) and People Also Read (4) without duplicates for services', () => {
    for (const slug of APPROVED_SERVICE_SLUGS) {
      const related = getRelatedArticles(slug, { limit: 6 });
      expect(related.length).toBeGreaterThanOrEqual(6);
      const relatedHrefs = new Set(related.map((item) => item.href));
      const people = getRelatedArticles(slug, { limit: 16 }).filter(
        (item) => !relatedHrefs.has(item.href),
      );
      expect(people.length).toBeGreaterThanOrEqual(4);
      const overlap = people
        .slice(0, 4)
        .filter((item) => relatedHrefs.has(item.href));
      expect(overlap).toHaveLength(0);
    }
  });

  it('exposes Learn category crawl paths in the footer Resources column', () => {
    const resources = getFooterColumns().find((column) => column.id === 'resources');
    expect(resources).toBeTruthy();
    const hrefs = new Set(resources!.links.map((link) => link.href));
    expect(hrefs.has('/learn')).toBe(true);
    expect(hrefs.has('/learn/instagram')).toBe(true);
    expect(hrefs.has('/learn/tiktok')).toBe(true);
    expect(hrefs.has('/learn/facebook')).toBe(true);
    expect(hrefs.has('/learn/youtube')).toBe(true);
    expect(hrefs.has('/learn/social-media-marketing')).toBe(true);
    expect(hrefs.has('/learn/guides')).toBe(true);
  });

  it('keeps sitemap orphans empty', () => {
    expect(findOrphanSitemapPages(buildSitemapEntries())).toHaveLength(0);
  });

  it('publishes a Learn corpus of 56 live articles for link graph density', () => {
    expect(listPublicLearnArticles().length).toBe(56);
  });
});
