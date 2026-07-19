/**
 * Analytics dispatcher — Document 14.09.
 * Isolates provider failures so the site never breaks.
 */

import {
  getEnabledAnalyticsAdapters,
  getInternalAdapters,
  getPublicMarketingAdapters,
} from '@/lib/analytics/providers';
import { recordDebugDispatch } from '@/lib/analytics/providers/debug';
import type {
  AnalyticsEvent,
  AnalyticsProviderId,
  AnalyticsTrackResult,
  AnalyticsValidationIssue,
} from '@/types/analytics';

function safeCall(
  label: string,
  fn: () => void | Promise<void>,
  issues: AnalyticsValidationIssue[],
): void {
  try {
    const result = fn();
    if (result && typeof (result as Promise<void>).then === 'function') {
      void (result as Promise<void>).catch((error: unknown) => {
        issues.push({
          code: 'provider_error',
          detail: `${label} async failure: ${error instanceof Error ? error.message : 'unknown'}`,
        });
      });
    }
  } catch (error) {
    issues.push({
      code: 'provider_error',
      detail: `${label} failure: ${error instanceof Error ? error.message : 'unknown'}`,
    });
  }
}

/**
 * Dispatch a validated event to enabled provider adapters.
 * Admin-channel events never go to public marketing providers.
 */
export function dispatchToProviders(
  event: AnalyticsEvent,
  mode: 'event' | 'page_view' | 'conversion' = 'event',
): AnalyticsTrackResult {
  const issues: AnalyticsValidationIssue[] = [];
  const all = getEnabledAnalyticsAdapters();

  const targets =
    event.channel === 'admin'
      ? getInternalAdapters(all)
      : [...getPublicMarketingAdapters(all), ...getInternalAdapters(all)];

  // Deduplicate by id
  const unique = new Map(targets.map((adapter) => [adapter.id, adapter]));
  const providers: AnalyticsProviderId[] = [];

  for (const adapter of unique.values()) {
    providers.push(adapter.id);
    if (mode === 'page_view') {
      safeCall(`${adapter.id}.trackPageView`, () => adapter.trackPageView(event), issues);
    } else if (mode === 'conversion') {
      safeCall(`${adapter.id}.trackConversion`, () => adapter.trackConversion(event), issues);
    } else {
      safeCall(`${adapter.id}.trackEvent`, () => adapter.trackEvent(event), issues);
    }
  }

  recordDebugDispatch({
    event,
    eventName: event.eventName,
    consentAllowed: true,
    providers,
    duplicate: false,
    issues,
  });

  return {
    tracked: providers.length > 0 && !issues.some((issue) => issue.code === 'provider_error'),
    event,
    duplicate: false,
    consentAllowed: true,
    providers,
    issues,
  };
}

/**
 * Initialize enabled adapters. Failures are isolated.
 */
export function initializeAnalyticsProviders(): AnalyticsValidationIssue[] {
  const issues: AnalyticsValidationIssue[] = [];
  for (const adapter of getEnabledAnalyticsAdapters()) {
    safeCall(`${adapter.id}.initialize`, () => adapter.initialize(), issues);
  }
  return issues;
}

export function syncProviderConsent(consent: {
  analytics: boolean;
  marketing: boolean;
}): void {
  const issues: AnalyticsValidationIssue[] = [];
  for (const adapter of getEnabledAnalyticsAdapters()) {
    safeCall(`${adapter.id}.setConsent`, () => adapter.setConsent(consent), issues);
  }
  void issues;
}
