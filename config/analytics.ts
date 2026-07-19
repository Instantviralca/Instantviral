/**
 * Analytics environment configuration — Document 14.09.
 * Provider IDs come from env only; never hardcode measurement IDs.
 */

import type { AnalyticsConfig } from '@/types/analytics';

function resolveEnvironment(
  env: NodeJS.ProcessEnv,
): AnalyticsConfig['environment'] {
  const nodeEnv = env.NODE_ENV?.trim();
  if (nodeEnv === 'test') return 'test';
  if (nodeEnv === 'production') return 'production';
  return 'development';
}

/**
 * Resolve analytics config from environment.
 * Providers are enabled only when both the enable flag and ID are present.
 */
export function getAnalyticsConfig(
  env: NodeJS.ProcessEnv = typeof process !== 'undefined' ? process.env : ({} as NodeJS.ProcessEnv),
): AnalyticsConfig {
  const environment = resolveEnvironment(env);
  const ga4Id = env.NEXT_PUBLIC_GA4_MEASUREMENT_ID?.trim() || null;
  const gtmId = env.NEXT_PUBLIC_GTM_CONTAINER_ID?.trim() || null;
  const clarityId = env.NEXT_PUBLIC_CLARITY_PROJECT_ID?.trim() || null;

  const ga4Flag = readBoolFrom(env, 'NEXT_PUBLIC_GA4_ENABLED', false);
  const gtmFlag = readBoolFrom(env, 'NEXT_PUBLIC_GTM_ENABLED', false);
  const clarityFlag = readBoolFrom(env, 'NEXT_PUBLIC_CLARITY_ENABLED', false);

  const consentModeRaw = env.NEXT_PUBLIC_ANALYTICS_CONSENT_MODE?.trim().toLowerCase();
  const consentMode: AnalyticsConfig['consentMode'] =
    consentModeRaw === 'optional' ? 'optional' : 'required';

  const debugFlag = readBoolFrom(
    env,
    'NEXT_PUBLIC_ANALYTICS_DEBUG',
    environment === 'development',
  );

  return {
    enabled: readBoolFrom(env, 'NEXT_PUBLIC_ANALYTICS_ENABLED', true),
    debugMode: debugFlag && environment !== 'production',
    consentMode,
    environment,
    ga4: {
      enabled: ga4Flag && Boolean(ga4Id),
      measurementId: ga4Flag ? ga4Id : null,
    },
    gtm: {
      enabled: gtmFlag && Boolean(gtmId),
      containerId: gtmFlag ? gtmId : null,
    },
    clarity: {
      enabled: clarityFlag && Boolean(clarityId),
      projectId: clarityFlag ? clarityId : null,
    },
  };
}

function readBoolFrom(
  env: NodeJS.ProcessEnv,
  name: string,
  fallback: boolean,
): boolean {
  const value = env[name]?.trim();
  if (value === undefined || value === '') return fallback;
  return value === '1' || value.toLowerCase() === 'true' || value.toLowerCase() === 'yes';
}

/** Cached default config for runtime helpers. */
export const analyticsConfig: AnalyticsConfig = getAnalyticsConfig();

export function isAnalyticsDebugEnabled(
  config: AnalyticsConfig = analyticsConfig,
): boolean {
  return config.debugMode && config.environment !== 'production';
}

export function isProviderConfigured(
  provider: 'ga4' | 'gtm' | 'clarity',
  config: AnalyticsConfig = analyticsConfig,
): boolean {
  if (provider === 'ga4') return config.ga4.enabled && Boolean(config.ga4.measurementId);
  if (provider === 'gtm') return config.gtm.enabled && Boolean(config.gtm.containerId);
  return config.clarity.enabled && Boolean(config.clarity.projectId);
}

/** Env var names documented for operators — do not hardcode IDs. */
export const ANALYTICS_ENV_KEYS = {
  enabled: 'NEXT_PUBLIC_ANALYTICS_ENABLED',
  debug: 'NEXT_PUBLIC_ANALYTICS_DEBUG',
  consentMode: 'NEXT_PUBLIC_ANALYTICS_CONSENT_MODE',
  ga4Enabled: 'NEXT_PUBLIC_GA4_ENABLED',
  ga4MeasurementId: 'NEXT_PUBLIC_GA4_MEASUREMENT_ID',
  gtmEnabled: 'NEXT_PUBLIC_GTM_ENABLED',
  gtmContainerId: 'NEXT_PUBLIC_GTM_CONTAINER_ID',
  clarityEnabled: 'NEXT_PUBLIC_CLARITY_ENABLED',
  clarityProjectId: 'NEXT_PUBLIC_CLARITY_PROJECT_ID',
} as const;
