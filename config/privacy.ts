/**
 * Privacy Policy configuration — Document 13.04.
 *
 * Use verified values only. Leave optional fields undefined rather than inventing
 * business identity, contact, providers, retention, age, or processing locations.
 *
 * publicationStatus and readiness helpers are internal — do not expose checklist
 * notes on the public Privacy Policy page.
 */

import { brand } from '@/config/brand';
import { routes } from '@/config/routes';
import { site } from '@/config/site';
import { getAbandonedCartRetentionDays } from '@/config/abandoned-cart';
import {
  getAnalyticsEventRetentionDays,
  isFirstPartyAnalyticsEnabled,
} from '@/lib/analytics/analytics-runtime-config';
import type { PrivacyConfig, PrivacyToolEntry } from '@/types/legal';

function isPlaceholderEmail(email: string | undefined): boolean {
  if (!email?.trim()) return true;
  const value = email.trim().toLowerCase();
  return (
    value.endsWith('@example.com') ||
    value.endsWith('@example.org') ||
    value.endsWith('@example.net') ||
    value.includes('placeholder')
  );
}

function envFlagEnabled(key: string): boolean {
  const raw = process.env[key]?.trim().toLowerCase();
  return raw === '1' || raw === 'true' || raw === 'yes';
}

function envPresent(key: string): boolean {
  return Boolean(process.env[key]?.trim());
}

/** Analytics inventory from real enablement only (first-party + optional vendors). */
export function resolvePrivacyAnalyticsProviders(): PrivacyToolEntry[] {
  const providers: PrivacyToolEntry[] = [
    {
      id: 'first-party',
      displayName: 'InstantViral first-party analytics',
      enabled: isFirstPartyAnalyticsEnabled(),
    },
    {
      id: 'ga4',
      displayName: 'Google Analytics 4',
      enabled:
        envFlagEnabled('NEXT_PUBLIC_GA4_ENABLED') &&
        envPresent('NEXT_PUBLIC_GA4_MEASUREMENT_ID'),
    },
    {
      id: 'gtm',
      displayName: 'Google Tag Manager',
      enabled:
        envFlagEnabled('NEXT_PUBLIC_GTM_ENABLED') &&
        envPresent('NEXT_PUBLIC_GTM_CONTAINER_ID'),
    },
    {
      id: 'clarity',
      displayName: 'Microsoft Clarity',
      enabled:
        envFlagEnabled('NEXT_PUBLIC_CLARITY_ENABLED') &&
        envPresent('NEXT_PUBLIC_CLARITY_PROJECT_ID'),
    },
  ];
  return providers;
}

/**
 * Current privacy configuration.
 * Verified: InstantViral display name, instantviral.ca, support@instantviral.ca,
 * Mollie checkout (via payments config), first-party analytics, abandoned-cart retention defaults.
 */
export const privacyConfig: PrivacyConfig = {
  legalBusinessName: brand.legalName,
  operatingName: brand.name,
  websiteDomain: site.domain,

  privacyContactRole: 'Privacy contact',
  privacyContactName: undefined,
  privacyEmail: site.supportEmail,
  mailingAddress: undefined,
  effectiveDate: '2026-09-09',
  lastUpdatedDate: '2026-09-09',
  // Hosting may change over time — do not hard-code a provider or country here.
  hostingLocation: undefined,
  // Transactional email uses configured SMTP or temporary Resend — provider-neutral.
  emailProvider: undefined,
  minimumCustomerAge: undefined,

  cookiePreferenceToolEnabled: false,
  cookiePreferenceToolLabel: undefined,
  cookiePreferenceHref: undefined,
  cookiePolicyHref: routes.cookiePolicy,

  retentionScheduleVerified: true,
  retentionCategories: [
    {
      id: 'orders',
      label: 'Order, customer, and payment records',
      period:
        'Kept as long as reasonably needed for fulfilment, support, accounting, disputes, and legal obligations',
    },
    {
      id: 'abandoned-carts',
      label: 'Abandoned checkout / cart recovery records',
      period: `Approximately ${getAbandonedCartRetentionDays()} days under current operational configuration (unless recovered earlier or needed longer for support)`,
    },
    {
      id: 'analytics-events',
      label: 'First-party analytics events',
      period: `Approximately ${getAnalyticsEventRetentionDays()} days under current operational configuration`,
    },
  ],

  analyticsProviders: resolvePrivacyAnalyticsProviders(),
  // Meta Pixel / TikTok Pixel are not implemented.
  marketingTools: [],

  publicationStatus: 'published',
  legalReviewCompleted: false,
};

/** Privacy email only when configured and not a placeholder. */
export function getVerifiedPrivacyEmail(
  config: PrivacyConfig = privacyConfig,
): string | undefined {
  const email = config.privacyEmail?.trim() || site.supportEmail;
  if (!email || isPlaceholderEmail(email)) return undefined;
  return email;
}

export function getEnabledAnalyticsProviders(
  config: PrivacyConfig = privacyConfig,
): PrivacyConfig['analyticsProviders'] {
  // Prefer live env resolution so optional vendors stay accurate after config load.
  const live = resolvePrivacyAnalyticsProviders();
  if (config === privacyConfig) {
    return live.filter((provider) => provider.enabled);
  }
  return config.analyticsProviders.filter((provider) => provider.enabled);
}

export function getEnabledMarketingTools(
  config: PrivacyConfig = privacyConfig,
): PrivacyConfig['marketingTools'] {
  return config.marketingTools.filter((tool) => tool.enabled);
}
