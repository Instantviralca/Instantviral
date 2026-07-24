/**
 * Enabled analytics provider registry — Document 14.09.
 */

import { createClarityAdapter } from '@/lib/analytics/providers/clarity';
import { createDebugAdapter } from '@/lib/analytics/providers/debug';
import { createGa4Adapter } from '@/lib/analytics/providers/ga4';
import { createGtmAdapter } from '@/lib/analytics/providers/gtm';
import { createInternalAdapter } from '@/lib/analytics/providers/internal';
import type { AnalyticsProviderAdapter } from '@/types/analytics';

let cachedAdapters: AnalyticsProviderAdapter[] | null = null;
let testOverrideAdapters: AnalyticsProviderAdapter[] | null = null;

/**
 * Build the list of adapters that are both enabled and configured.
 * Unconfigured providers are omitted (not initialized as no-ops publicly).
 */
export function getEnabledAnalyticsAdapters(
  forceRefresh = false,
): AnalyticsProviderAdapter[] {
  if (testOverrideAdapters) return testOverrideAdapters;
  if (cachedAdapters && !forceRefresh) return cachedAdapters;

  const adapters: AnalyticsProviderAdapter[] = [];

  const ga4 = createGa4Adapter();
  if (ga4) adapters.push(ga4);

  const gtm = createGtmAdapter();
  if (gtm) adapters.push(gtm);

  const clarity = createClarityAdapter();
  if (clarity) adapters.push(clarity);

  const debug = createDebugAdapter();
  if (debug) adapters.push(debug);

  // First-party funnel sink for Admin → Analytics (always when analytics enabled).
  const internal = createInternalAdapter();
  if (internal) adapters.push(internal);

  cachedAdapters = adapters;
  return adapters;
}

export function resetAnalyticsAdaptersForTests(): void {
  cachedAdapters = null;
  testOverrideAdapters = null;
}

/** Test-only adapter injection for failure isolation. */
export function setAnalyticsAdaptersForTests(
  adapters: AnalyticsProviderAdapter[] | null,
): void {
  testOverrideAdapters = adapters;
}

export function getPublicMarketingAdapters(
  adapters: AnalyticsProviderAdapter[] = getEnabledAnalyticsAdapters(),
): AnalyticsProviderAdapter[] {
  return adapters.filter((adapter) => adapter.id === 'ga4' || adapter.id === 'gtm' || adapter.id === 'clarity');
}

export function getInternalAdapters(
  adapters: AnalyticsProviderAdapter[] = getEnabledAnalyticsAdapters(),
): AnalyticsProviderAdapter[] {
  return adapters.filter((adapter) => adapter.id === 'debug' || adapter.id === 'internal');
}
