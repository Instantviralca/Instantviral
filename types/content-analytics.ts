/**
 * Content Analytics types — Document 16.10.
 * Aggregate Learn Center performance only. No personal data.
 */

export type ContentAnalyticsEventName =
  | 'content_article_view'
  | 'content_engaged_session'
  | 'content_scroll_depth'
  | 'content_cta_click'
  | 'content_related_article_click'
  | 'content_faq_interaction'
  | 'content_internal_search'
  | 'content_organic_landing'
  | 'content_conversion_assist'
  | 'content_social_share';

export type ContentPublishVisibility = 'published' | 'unpublished';

export type ContentAnalyticsEvent = {
  eventName: ContentAnalyticsEventName;
  /** Required article identifier (slug). */
  articleSlug: string;
  /** ISO date (YYYY-MM-DD) for aggregation windows. */
  date: string;
  /** Only published content may enter dashboards and reports. */
  publishState: ContentPublishVisibility;
  eventId?: string;
  /** Engagement seconds for this event, when applicable. */
  engagementSeconds?: number;
  /** Scroll depth percent 0–100. */
  scrollDepthPercent?: number;
  /** Related destination slug for related-article clicks. */
  relatedSlug?: string;
  /** CTA id (no PII). */
  ctaId?: string;
  /** FAQ id (no question text required). */
  faqId?: string;
  /** Sanitized search length only — never raw query. */
  queryLength?: number;
  /** Optional SEO channel flag for organic landings. */
  isOrganic?: boolean;
  /** Conversion assist value (count), not monetary PII. */
  assistCount?: number;
};

export type ContentAnalyticsValidationIssue = {
  severity: 'blocker' | 'error' | 'warning';
  code: string;
  field?: string;
  message: string;
};

export type ContentArticleMetrics = {
  articleSlug: string;
  pageViews: number;
  uniqueVisitors: number;
  engagedSessions: number;
  averageEngagementSeconds: number;
  averageScrollDepthPercent: number;
  ctaClicks: number;
  relatedArticleClicks: number;
  internalSearchUses: number;
  organicLandings: number;
  conversionAssistedSessions: number;
  faqInteractions: number;
  socialShares: number;
  /** Estimated reading-time interest proxy from engagement. */
  readingTimeSeconds: number;
};

export type ContentSeoMetrics = {
  articleSlug: string;
  impressions: number;
  clicks: number;
  ctr: number;
  averagePosition: number | null;
  indexed: boolean | null;
  crawlIssues: number;
};

export type ContentDashboardArticleRow = ContentArticleMetrics & {
  score: number;
  seo?: ContentSeoMetrics;
};

export type ContentDashboard = {
  generatedAt: string;
  periodStart: string;
  periodEnd: string;
  overview: {
    articleCount: number;
    pageViews: number;
    uniqueVisitors: number;
    engagedSessions: number;
    ctaClicks: number;
    organicLandings: number;
    conversionAssistedSessions: number;
  };
  topArticles: ContentDashboardArticleRow[];
  underperformingArticles: ContentDashboardArticleRow[];
  updateCandidates: ContentUpdateCandidate[];
  publishingCadence: {
    publishedInPeriod: number;
    plannedRemaining: number;
    note: string;
  };
};

export type ContentUpdateCandidate = {
  articleSlug: string;
  reasons: string[];
  priority: 'high' | 'medium' | 'low';
  pageViews: number;
  averageEngagementSeconds: number;
  averageScrollDepthPercent: number;
};

export type ContentAnalyticsReport = {
  generatedAt: string;
  periodStart: string;
  periodEnd: string;
  dashboard: ContentDashboard;
  metrics: ContentArticleMetrics[];
  seo: ContentSeoMetrics[];
  privacy: {
    personalDataIncluded: false;
    unpublishedExcluded: true;
    consentRequired: true;
    aggregateOnly: true;
  };
};

export type MonthlyContentReport = {
  month: string;
  generatedAt: string;
  markdown: string;
  report: ContentAnalyticsReport;
};
