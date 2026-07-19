/**
 * Content Analytics tests — Document 16.10.
 */

import { existsSync, mkdtempSync, readFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';

import { afterEach, beforeEach, describe, expect, it } from 'vitest';

import {
  resetAnalyticsConsentForTests,
  setAnalyticsConsent,
} from '@/lib/analytics';
import {
  buildContentDashboard,
  CONTENT_ANALYTICS_PRIVACY,
  exportContentMetrics,
  generateAndWriteMonthlyContentReport,
  generateMonthlyContentReport,
  identifyUpdateCandidates,
  importContentSeoMetrics,
  listContentEvents,
  recordContentEvent,
  resetContentAnalyticsForTests,
  validateContentEvent,
} from '@/lib/content-analytics';

const shouldWriteReport = process.env.SCAFFOLD_CONTENT_ANALYTICS_REPORT === '1';
const tempDirs: string[] = [];

beforeEach(() => {
  resetContentAnalyticsForTests();
  resetAnalyticsConsentForTests();
  setAnalyticsConsent({ analytics: true, marketing: false });
});

afterEach(() => {
  while (tempDirs.length) {
    const dir = tempDirs.pop();
    if (dir) rmSync(dir, { recursive: true, force: true });
  }
});

describe('16.10 Content Analytics', () => {
  it('validates event schema and requires article identifiers', () => {
    const issues = validateContentEvent({
      eventName: 'content_article_view',
      articleSlug: '',
      date: 'not-a-date',
      publishState: 'published',
    });
    expect(issues.some((i) => i.code === 'missing_article_identifier')).toBe(true);
    expect(issues.some((i) => i.code === 'invalid_date')).toBe(true);
  });

  it('records published events, rejects duplicates, and excludes unpublished from dashboards', () => {
    const published = recordContentEvent({
      eventName: 'content_article_view',
      articleSlug: 'how-to-get-more-instagram-followers',
      date: '2026-07-01',
      publishState: 'published',
      eventId: 'evt-1',
    });
    expect(published.ok).toBe(true);

    const dup = recordContentEvent({
      eventName: 'content_article_view',
      articleSlug: 'how-to-get-more-instagram-followers',
      date: '2026-07-01',
      publishState: 'published',
      eventId: 'evt-1',
    });
    expect(dup.ok).toBe(false);
    expect(dup.duplicate).toBe(true);

    recordContentEvent({
      eventName: 'content_article_view',
      articleSlug: 'draft-only-slug',
      date: '2026-07-01',
      publishState: 'unpublished',
      eventId: 'evt-draft',
    });

    recordContentEvent({
      eventName: 'content_engaged_session',
      articleSlug: 'how-to-get-more-instagram-followers',
      date: '2026-07-02',
      publishState: 'published',
      eventId: 'evt-2',
      engagementSeconds: 90,
    });
    recordContentEvent({
      eventName: 'content_scroll_depth',
      articleSlug: 'how-to-get-more-instagram-followers',
      date: '2026-07-02',
      publishState: 'published',
      eventId: 'evt-3',
      scrollDepthPercent: 75,
    });
    recordContentEvent({
      eventName: 'content_cta_click',
      articleSlug: 'how-to-get-more-instagram-followers',
      date: '2026-07-03',
      publishState: 'published',
      eventId: 'evt-4',
      ctaId: 'closing',
    });

    expect(listContentEvents({ publishedOnly: true })).toHaveLength(4);
    expect(listContentEvents()).toHaveLength(5);

    const dashboard = buildContentDashboard({
      periodStart: '2026-07-01',
      periodEnd: '2026-07-31',
    });
    expect(dashboard.overview.articleCount).toBe(1);
    expect(dashboard.overview.pageViews).toBe(1);
    expect(dashboard.topArticles[0]?.articleSlug).toBe(
      'how-to-get-more-instagram-followers',
    );
    expect(
      dashboard.topArticles.some((a) => a.articleSlug === 'draft-only-slug'),
    ).toBe(false);
    expect(CONTENT_ANALYTICS_PRIVACY.personalDataIncluded).toBe(false);
  });

  it('identifies update candidates and exports monthly reports', () => {
    for (let i = 0; i < 25; i += 1) {
      recordContentEvent({
        eventName: 'content_article_view',
        articleSlug: 'social-media-metrics-that-matter',
        date: '2026-07-05',
        publishState: 'published',
        eventId: `view-${i}`,
      });
    }
    recordContentEvent({
      eventName: 'content_engaged_session',
      articleSlug: 'social-media-metrics-that-matter',
      date: '2026-07-05',
      publishState: 'published',
      eventId: 'eng-1',
      engagementSeconds: 12,
    });
    recordContentEvent({
      eventName: 'content_scroll_depth',
      articleSlug: 'social-media-metrics-that-matter',
      date: '2026-07-05',
      publishState: 'published',
      eventId: 'scroll-1',
      scrollDepthPercent: 20,
    });

    importContentSeoMetrics([
      {
        articleSlug: 'social-media-metrics-that-matter',
        impressions: 500,
        clicks: 5,
        ctr: 0.01,
        averagePosition: 28,
        indexed: true,
        crawlIssues: 0,
      },
    ]);

    const exported = exportContentMetrics({
      periodStart: '2026-07-01',
      periodEnd: '2026-07-31',
    });
    const candidates = identifyUpdateCandidates(exported.metrics);
    expect(candidates.some((c) => c.articleSlug === 'social-media-metrics-that-matter')).toBe(
      true,
    );

    const monthly = generateMonthlyContentReport({ month: '2026-07' });
    expect(monthly.markdown).toContain('Monthly Content Report');
    expect(monthly.report.privacy.unpublishedExcluded).toBe(true);
  });

  it.skipIf(!shouldWriteReport)(
    'writes analytics-report.json and monthly-content-report.md',
    () => {
      const cwd = mkdtempSync(path.join(tmpdir(), 'iv-content-analytics-'));
      tempDirs.push(cwd);
      recordContentEvent({
        eventName: 'content_article_view',
        articleSlug: 'how-the-instagram-algorithm-works',
        date: '2026-07-10',
        publishState: 'published',
        eventId: 'write-1',
      });
      generateAndWriteMonthlyContentReport({
        month: '2026-07',
        cwd,
      });
      expect(existsSync(path.join(cwd, 'content/reports/analytics-report.json'))).toBe(
        true,
      );
      expect(
        existsSync(path.join(cwd, 'content/reports/monthly-content-report.md')),
      ).toBe(true);
      const json = JSON.parse(
        readFileSync(path.join(cwd, 'content/reports/analytics-report.json'), 'utf8'),
      );
      expect(json.privacy.aggregateOnly).toBe(true);
    },
  );
});
