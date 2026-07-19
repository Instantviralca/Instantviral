/**
 * Analytics components barrel — Document 14.09.
 */

export { AnalyticsProvider } from '@/components/analytics/AnalyticsProvider';
export {
  AnalyticsContext,
  useAnalytics,
  useAnalyticsOptional,
} from '@/components/analytics/AnalyticsContext';
export { AnalyticsConsentGuard } from '@/components/analytics/AnalyticsConsentGuard';
export {
  AnalyticsDebugPanel,
  isAnalyticsDebugPanelEnabled,
} from '@/components/analytics/AnalyticsDebugPanel';
export { AnalyticsErrorBoundary } from '@/components/analytics/AnalyticsErrorBoundary';
export { PageViewTracker } from '@/components/analytics/PageViewTracker';
export { ConversionTracker } from '@/components/analytics/ConversionTracker';
