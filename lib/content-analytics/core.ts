/**
 * Content Analytics core — Document 16.10.
 * Aggregate Learn Center performance. No personal data. No Node fs (client-safe).
 */

import { trackEvent } from '@/lib/analytics/core/track';
import { canTrackEvent } from '@/lib/analytics/core/consent';
import { PLANNED_ARTICLES } from '@/data/content-plan/articles';
import type {
  ContentAnalyticsEvent,
  ContentAnalyticsEventName,
  ContentAnalyticsReport,
  ContentAnalyticsValidationIssue,
  ContentArticleMetrics,
  ContentDashboard,
  ContentDashboardArticleRow,
  ContentSeoMetrics,
  ContentUpdateCandidate,
  MonthlyContentReport,
} from '@/types/content-analytics';
import type { AnalyticsTrackResult } from '@/types/analytics';

const EVENT_NAMES = new Set<ContentAnalyticsEventName>([
  'content_article_view',
  'content_engaged_session',
  'content_scroll_depth',
  'content_cta_click',
  'content_related_article_click',
  'content_faq_interaction',
  'content_internal_search',
  'content_organic_landing',
  'content_conversion_assist',
  'content_social_share',
]);

const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;
const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

type StoredEvent = ContentAnalyticsEvent & { recordedAt: string };

let eventLog: StoredEvent[] = [];
const seenEventIds = new Set<string>();
let seoImport: ContentSeoMetrics[] = [];

export const CONTENT_ANALYTICS_PRIVACY = {
  personalDataIncluded: false as const,
  unpublishedExcluded: true as const,
  consentRequired: true as const,
  aggregateOnly: true as const,
  notes: [
    'Never record emails, names, usernames, IPs, or raw search queries.',
    'Respect analytics consent before dispatching provider events.',
    'Dashboards and monthly reports exclude unpublished content.',
    'Only aggregate article-level metrics are retained for reporting.',
  ],
};

export function resetContentAnalyticsForTests(): void {
  eventLog = [];
  seenEventIds.clear();
  seoImport = [];
}

export function validateContentEvent(
  event: ContentAnalyticsEvent,
): ContentAnalyticsValidationIssue[] {
  const issues: ContentAnalyticsValidationIssue[] = [];

  if (!EVENT_NAMES.has(event.eventName)) {
    issues.push({
      severity: 'blocker',
      code: 'invalid_event_schema',
      field: 'eventName',
      message: `Unknown content event "${event.eventName}".`,
    });
  }

  if (!event.articleSlug?.trim()) {
    issues.push({
      severity: 'blocker',
      code: 'missing_article_identifier',
      field: 'articleSlug',
      message: 'articleSlug is required.',
    });
  } else if (!SLUG_RE.test(event.articleSlug)) {
    issues.push({
      severity: 'error',
      code: 'invalid_article_identifier',
      field: 'articleSlug',
      message: 'articleSlug must be a lowercase hyphenated slug.',
    });
  }

  if (!DATE_RE.test(event.date ?? '')) {
    issues.push({
      severity: 'blocker',
      code: 'invalid_date',
      field: 'date',
      message: 'date must be YYYY-MM-DD.',
    });
  } else {
    const parsed = new Date(`${event.date}T00:00:00.000Z`);
    if (Number.isNaN(parsed.getTime())) {
      issues.push({
        severity: 'blocker',
        code: 'invalid_date',
        field: 'date',
        message: 'date is not a valid calendar day.',
      });
    }
  }

  if (event.publishState !== 'published' && event.publishState !== 'unpublished') {
    issues.push({
      severity: 'error',
      code: 'invalid_event_schema',
      field: 'publishState',
      message: 'publishState must be published or unpublished.',
    });
  }

  if (
    event.scrollDepthPercent != null &&
    (event.scrollDepthPercent < 0 || event.scrollDepthPercent > 100)
  ) {
    issues.push({
      severity: 'error',
      code: 'invalid_event_schema',
      field: 'scrollDepthPercent',
      message: 'scrollDepthPercent must be 0–100.',
    });
  }

  if (event.eventId && seenEventIds.has(event.eventId)) {
    issues.push({
      severity: 'warning',
      code: 'duplicate_event',
      field: 'eventId',
      message: `Duplicate eventId "${event.eventId}".`,
    });
  }

  return issues;
}

function emptyMetrics(slug: string): ContentArticleMetrics {
  return {
    articleSlug: slug,
    pageViews: 0,
    uniqueVisitors: 0,
    engagedSessions: 0,
    averageEngagementSeconds: 0,
    averageScrollDepthPercent: 0,
    ctaClicks: 0,
    relatedArticleClicks: 0,
    internalSearchUses: 0,
    organicLandings: 0,
    conversionAssistedSessions: 0,
    faqInteractions: 0,
    socialShares: 0,
    readingTimeSeconds: 0,
  };
}

function aggregateMetrics(
  events: StoredEvent[],
  options: { publishedOnly?: boolean } = {},
): ContentArticleMetrics[] {
  const publishedOnly = options.publishedOnly ?? true;
  const bySlug = new Map<
    string,
    {
      metrics: ContentArticleMetrics;
      engagementTotal: number;
      engagementCount: number;
      scrollTotal: number;
      scrollCount: number;
      visitorKeys: Set<string>;
    }
  >();

  for (const event of events) {
    if (publishedOnly && event.publishState !== 'published') continue;
    let bucket = bySlug.get(event.articleSlug);
    if (!bucket) {
      bucket = {
        metrics: emptyMetrics(event.articleSlug),
        engagementTotal: 0,
        engagementCount: 0,
        scrollTotal: 0,
        scrollCount: 0,
        visitorKeys: new Set(),
      };
      bySlug.set(event.articleSlug, bucket);
    }

    const m = bucket.metrics;
    // Anonymous visitor proxy: eventId or date+slug+eventName count unit — unique via eventId when present
    if (event.eventId) bucket.visitorKeys.add(event.eventId);
    else bucket.visitorKeys.add(`${event.date}:${event.eventName}:${m.pageViews + m.engagedSessions}`);

    switch (event.eventName) {
      case 'content_article_view':
        m.pageViews += 1;
        break;
      case 'content_engaged_session':
        m.engagedSessions += 1;
        if (event.engagementSeconds != null) {
          bucket.engagementTotal += event.engagementSeconds;
          bucket.engagementCount += 1;
          m.readingTimeSeconds += event.engagementSeconds;
        }
        break;
      case 'content_scroll_depth':
        if (event.scrollDepthPercent != null) {
          bucket.scrollTotal += event.scrollDepthPercent;
          bucket.scrollCount += 1;
        }
        break;
      case 'content_cta_click':
        m.ctaClicks += 1;
        break;
      case 'content_related_article_click':
        m.relatedArticleClicks += 1;
        break;
      case 'content_faq_interaction':
        m.faqInteractions += 1;
        break;
      case 'content_internal_search':
        m.internalSearchUses += 1;
        break;
      case 'content_organic_landing':
        m.organicLandings += 1;
        m.pageViews += 1;
        break;
      case 'content_conversion_assist':
        m.conversionAssistedSessions += event.assistCount ?? 1;
        break;
      case 'content_social_share':
        m.socialShares += 1;
        break;
      default:
        break;
    }
  }

  return [...bySlug.values()].map((bucket) => {
    const metrics = bucket.metrics;
    metrics.uniqueVisitors = bucket.visitorKeys.size;
    metrics.averageEngagementSeconds =
      bucket.engagementCount > 0
        ? Math.round((bucket.engagementTotal / bucket.engagementCount) * 10) / 10
        : 0;
    metrics.averageScrollDepthPercent =
      bucket.scrollCount > 0
        ? Math.round((bucket.scrollTotal / bucket.scrollCount) * 10) / 10
        : 0;
    return metrics;
  });
}

function scoreArticle(m: ContentArticleMetrics): number {
  return (
    m.pageViews * 1 +
    m.engagedSessions * 3 +
    m.ctaClicks * 4 +
    m.relatedArticleClicks * 2 +
    m.organicLandings * 2 +
    m.conversionAssistedSessions * 5 +
    m.averageEngagementSeconds * 0.1 +
    m.averageScrollDepthPercent * 0.05
  );
}

export type RecordContentEventOptions = {
  /** When false, skip provider dispatch (aggregate store only). Default true. */
  dispatch?: boolean;
};

export function recordContentEvent(
  event: ContentAnalyticsEvent,
  options: RecordContentEventOptions = {},
): {
  ok: boolean;
  duplicate: boolean;
  issues: ContentAnalyticsValidationIssue[];
  trackResult?: AnalyticsTrackResult;
} {
  const issues = validateContentEvent(event);
  const blockers = issues.filter(
    (i) => i.severity === 'blocker' || i.severity === 'error',
  );
  if (blockers.length) {
    return { ok: false, duplicate: false, issues };
  }

  const duplicate = Boolean(event.eventId && seenEventIds.has(event.eventId));
  if (duplicate) {
    return {
      ok: false,
      duplicate: true,
      issues: [
        ...issues,
        {
          severity: 'warning',
          code: 'duplicate_event',
          field: 'eventId',
          message: 'Event was not recorded again.',
        },
      ],
    };
  }

  if (event.eventId) seenEventIds.add(event.eventId);

  eventLog.push({
    ...event,
    recordedAt: new Date().toISOString(),
  });

  let trackResult: AnalyticsTrackResult | undefined;
  if (options.dispatch !== false) {
    // Unpublished events may be stored for QA tooling but never dispatched.
    if (
      event.publishState === 'published' &&
      canTrackEvent({ consentCategory: 'analytics', channel: 'public' })
    ) {
      trackResult = trackEvent({
        eventName: event.eventName,
        category: 'content',
        pageType: 'learn',
        pagePath: `/learn/${event.articleSlug}`,
        metadata: {
          articleSlug: event.articleSlug,
          date: event.date,
          engagementSeconds: event.engagementSeconds,
          scrollDepthPercent: event.scrollDepthPercent,
          relatedSlug: event.relatedSlug,
          ctaId: event.ctaId,
          faqId: event.faqId,
          queryLength: event.queryLength,
          isOrganic: event.isOrganic,
          assistCount: event.assistCount,
        },
      });
    }
  }

  return { ok: true, duplicate: false, issues, trackResult };
}

export function importContentSeoMetrics(rows: ContentSeoMetrics[]): void {
  const bySlug = new Map(seoImport.map((r) => [r.articleSlug, r]));
  for (const row of rows) {
    bySlug.set(row.articleSlug, row);
  }
  seoImport = [...bySlug.values()];
}

export function identifyUpdateCandidates(
  metrics: ContentArticleMetrics[],
  options: {
    minPageViews?: number;
    maxAvgEngagementSeconds?: number;
    maxAvgScrollDepthPercent?: number;
  } = {},
): ContentUpdateCandidate[] {
  const minViews = options.minPageViews ?? 20;
  const maxEngagement = options.maxAvgEngagementSeconds ?? 45;
  const maxScroll = options.maxAvgScrollDepthPercent ?? 40;

  const candidates: ContentUpdateCandidate[] = [];
  for (const m of metrics) {
    const reasons: string[] = [];
    if (m.pageViews >= minViews && m.averageEngagementSeconds < maxEngagement) {
      reasons.push('Low average engagement time relative to traffic');
    }
    if (m.pageViews >= minViews && m.averageScrollDepthPercent < maxScroll) {
      reasons.push('Low scroll depth suggests weak content completion');
    }
    if (m.pageViews >= minViews && m.ctaClicks === 0) {
      reasons.push('Traffic without CTA engagement');
    }
    if (m.organicLandings >= 10 && m.engagedSessions / Math.max(m.pageViews, 1) < 0.2) {
      reasons.push('Organic landings with weak engagement rate');
    }

    const seo = seoImport.find((s) => s.articleSlug === m.articleSlug);
    if (seo && seo.impressions >= 100 && seo.ctr < 0.02) {
      reasons.push('Low organic CTR — title/meta refresh candidate');
    }
    if (seo && seo.averagePosition != null && seo.averagePosition > 20) {
      reasons.push('Average position outside top 20 — deepen coverage');
    }
    if (seo && seo.crawlIssues > 0) {
      reasons.push('Crawl issues reported');
    }

    if (!reasons.length) continue;
    const priority: ContentUpdateCandidate['priority'] =
      reasons.length >= 3 || (seo?.crawlIssues ?? 0) > 0
        ? 'high'
        : reasons.length === 2
          ? 'medium'
          : 'low';
    candidates.push({
      articleSlug: m.articleSlug,
      reasons,
      priority,
      pageViews: m.pageViews,
      averageEngagementSeconds: m.averageEngagementSeconds,
      averageScrollDepthPercent: m.averageScrollDepthPercent,
    });
  }

  return candidates.sort((a, b) => {
    const order = { high: 0, medium: 1, low: 2 } as const;
    return order[a.priority] - order[b.priority] || b.pageViews - a.pageViews;
  });
}

export function buildContentDashboard(options: {
  periodStart: string;
  periodEnd: string;
  topLimit?: number;
  underperformingLimit?: number;
  plannedRemaining?: number;
}): ContentDashboard {
  const inPeriod = eventLog.filter(
    (e) =>
      e.publishState === 'published' &&
      e.date >= options.periodStart &&
      e.date <= options.periodEnd,
  );
  const metrics = aggregateMetrics(inPeriod, { publishedOnly: true });
  const rows: ContentDashboardArticleRow[] = metrics.map((m) => ({
    ...m,
    score: scoreArticle(m),
    seo: seoImport.find((s) => s.articleSlug === m.articleSlug),
  }));

  const sorted = [...rows].sort((a, b) => b.score - a.score);
  const topLimit = options.topLimit ?? 10;
  const underLimit = options.underperformingLimit ?? 10;
  const topArticles = sorted.slice(0, topLimit);
  const underperformingArticles = [...rows]
    .filter((r) => r.pageViews > 0)
    .sort((a, b) => a.score - b.score)
    .slice(0, underLimit);

  const updateCandidates = identifyUpdateCandidates(metrics);

  const overview = rows.reduce(
    (acc, row) => {
      acc.pageViews += row.pageViews;
      acc.uniqueVisitors += row.uniqueVisitors;
      acc.engagedSessions += row.engagedSessions;
      acc.ctaClicks += row.ctaClicks;
      acc.organicLandings += row.organicLandings;
      acc.conversionAssistedSessions += row.conversionAssistedSessions;
      return acc;
    },
    {
      articleCount: rows.length,
      pageViews: 0,
      uniqueVisitors: 0,
      engagedSessions: 0,
      ctaClicks: 0,
      organicLandings: 0,
      conversionAssistedSessions: 0,
    },
  );

  const publishedInPeriod = new Set(
    inPeriod
      .filter((e) => e.eventName === 'content_article_view')
      .map((e) => e.articleSlug),
  ).size;

  return {
    generatedAt: new Date().toISOString(),
    periodStart: options.periodStart,
    periodEnd: options.periodEnd,
    overview,
    topArticles,
    underperformingArticles,
    updateCandidates,
    publishingCadence: {
      publishedInPeriod,
      plannedRemaining:
        options.plannedRemaining ??
        PLANNED_ARTICLES.length - overview.articleCount,
      note:
        'Cadence counts published Learn articles with analytics in-period only. Unpublished packages are excluded.',
    },
  };
}

export function exportContentMetrics(options: {
  periodStart: string;
  periodEnd: string;
}): ContentAnalyticsReport {
  const dashboard = buildContentDashboard(options);
  const inPeriod = eventLog.filter(
    (e) =>
      e.publishState === 'published' &&
      e.date >= options.periodStart &&
      e.date <= options.periodEnd,
  );
  const metrics = aggregateMetrics(inPeriod, { publishedOnly: true });
  const metricSlugs = new Set(metrics.map((m) => m.articleSlug));
  return {
    generatedAt: new Date().toISOString(),
    periodStart: options.periodStart,
    periodEnd: options.periodEnd,
    dashboard,
    metrics,
    seo: seoImport.filter((s) => metricSlugs.has(s.articleSlug)),
    privacy: {
      personalDataIncluded: false,
      unpublishedExcluded: true,
      consentRequired: true,
      aggregateOnly: true,
    },
  };
}

export function generateMonthlyContentReport(options: {
  month: string;
}): MonthlyContentReport {
  if (!/^\d{4}-\d{2}$/.test(options.month)) {
    throw new Error('month must be YYYY-MM');
  }
  const periodStart = `${options.month}-01`;
  const endDate = new Date(`${options.month}-01T00:00:00.000Z`);
  endDate.setUTCMonth(endDate.getUTCMonth() + 1);
  endDate.setUTCDate(0);
  const periodEnd = endDate.toISOString().slice(0, 10);

  const report = exportContentMetrics({ periodStart, periodEnd });
  const { dashboard } = report;

  const lines = [
    `# Monthly Content Report — ${options.month}`,
    '',
    `Generated: ${report.generatedAt}`,
    '',
    '## Privacy',
    '',
    '- No personal data',
    '- Consent-gated provider dispatch',
    '- Aggregate reporting only',
    '- Unpublished content excluded',
    '',
    '## Overview',
    '',
    `- Articles with traffic: ${dashboard.overview.articleCount}`,
    `- Page views: ${dashboard.overview.pageViews}`,
    `- Unique visitors (approx): ${dashboard.overview.uniqueVisitors}`,
    `- Engaged sessions: ${dashboard.overview.engagedSessions}`,
    `- CTA clicks: ${dashboard.overview.ctaClicks}`,
    `- Organic landings: ${dashboard.overview.organicLandings}`,
    `- Conversion-assisted sessions: ${dashboard.overview.conversionAssistedSessions}`,
    '',
    '## Top articles',
    '',
  ];

  if (!dashboard.topArticles.length) {
    lines.push('_No published article traffic in this period._', '');
  } else {
    for (const row of dashboard.topArticles) {
      lines.push(
        `- **${row.articleSlug}** — views ${row.pageViews}, engagement ${row.averageEngagementSeconds}s, CTA ${row.ctaClicks}`,
      );
    }
    lines.push('');
  }

  lines.push('## Underperforming', '');
  if (!dashboard.underperformingArticles.length) {
    lines.push('_None flagged._', '');
  } else {
    for (const row of dashboard.underperformingArticles.slice(0, 5)) {
      lines.push(
        `- **${row.articleSlug}** — score ${Math.round(row.score)}, scroll ${row.averageScrollDepthPercent}%`,
      );
    }
    lines.push('');
  }

  lines.push('## Update candidates', '');
  if (!dashboard.updateCandidates.length) {
    lines.push('_No update candidates._', '');
  } else {
    for (const c of dashboard.updateCandidates) {
      lines.push(`- **${c.articleSlug}** (${c.priority}): ${c.reasons.join('; ')}`);
    }
    lines.push('');
  }

  lines.push(
    '## Publishing cadence',
    '',
    `- Published articles with views in period: ${dashboard.publishingCadence.publishedInPeriod}`,
    `- Planned remaining (approx): ${dashboard.publishingCadence.plannedRemaining}`,
    '',
    dashboard.publishingCadence.note,
    '',
  );

  return {
    month: options.month,
    generatedAt: report.generatedAt,
    markdown: `${lines.join('\n')}\n`,
    report,
  };
}

/** Test/helper accessor — published events only when requested. */
export function listContentEvents(options: { publishedOnly?: boolean } = {}): StoredEvent[] {
  if (options.publishedOnly) {
    return eventLog.filter((e) => e.publishState === 'published');
  }
  return [...eventLog];
}
