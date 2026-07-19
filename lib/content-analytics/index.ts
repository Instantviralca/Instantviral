/**
 * Content Analytics barrel — Document 16.10.
 * Prefer `@/lib/content-analytics/core` from client/analytics bridges (no Node fs).
 */

export {
  CONTENT_ANALYTICS_PRIVACY,
  resetContentAnalyticsForTests,
  validateContentEvent,
  recordContentEvent,
  importContentSeoMetrics,
  identifyUpdateCandidates,
  buildContentDashboard,
  exportContentMetrics,
  generateMonthlyContentReport,
  listContentEvents,
} from '@/lib/content-analytics/core';

export {
  writeContentAnalyticsReports,
  generateAndWriteMonthlyContentReport,
} from '@/lib/content-analytics/report';
