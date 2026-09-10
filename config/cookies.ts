/**
 * Cookie Policy configuration — Document 13.07.
 *
 * Disclose only technologies that are actually used. Do not invent cookie names,
 * analytics tools, advertising pixels, or consent features.
 *
 * Analytics / marketing inventories stay aligned with privacyConfig.
 */

import { brand } from '@/config/brand';
import {
  getEnabledAnalyticsProviders,
  privacyConfig,
} from '@/config/privacy';
import { site } from '@/config/site';
import type { CookieConfig } from '@/types/legal';

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

/**
 * Current Cookie Policy configuration.
 * Essential purposes reflect core InstantViral commerce and analytics flows.
 */
export const cookieConfig: CookieConfig = {
  legalBusinessName: brand.legalName,
  operatingName: brand.name,
  websiteDomain: site.domain,

  supportEmail: site.supportEmail,
  mailingAddress: undefined,
  effectiveDate: '2026-09-09',
  lastUpdatedDate: '2026-09-09',

  essentialPurposes: [
    {
      id: 'cart',
      label: 'Cart',
      description:
        'Maintains selected packages and cart contents while you shop and move to checkout.',
      enabled: true,
      technologyNote:
        'Uses a first-party cart cookie (iv_cart_v1) and may also use browser session storage as a local cache.',
    },
    {
      id: 'checkout',
      label: 'Checkout continuity',
      description:
        'Supports checkout continuity so an order can be completed after package selection and configuration.',
      enabled: true,
      technologyNote:
        'May use cookies, session storage, or one-time server handoff tokens for oversized carts.',
    },
    {
      id: 'abandoned-cart',
      label: 'Abandoned checkout session',
      description:
        'Links an in-progress checkout to InstantViral’s abandoned-cart recovery system when enough customer information is provided.',
      enabled: true,
      technologyNote: 'Uses a first-party cookie (iv_ac_session).',
    },
    {
      id: 'session',
      label: 'Session continuity',
      description:
        'Supports browsing continuity on InstantViral.ca for cart, checkout, and related flows.',
      enabled: true,
    },
    {
      id: 'security',
      label: 'Security',
      description:
        'Supports security-related website operation and protection of the ordering experience, including secure admin sessions where applicable.',
      enabled: true,
    },
  ],

  analyticsProviders: privacyConfig.analyticsProviders,
  marketingTools: privacyConfig.marketingTools,

  consentManagerEnabled: privacyConfig.cookiePreferenceToolEnabled,
  consentManagerLabel: privacyConfig.cookiePreferenceToolLabel,
  consentManagerHref: privacyConfig.cookiePreferenceHref,

  cookieInventoryVerified: true,
  publicationStatus: 'published',
  legalReviewCompleted: false,
};

export function getVerifiedCookieContactEmail(
  config: CookieConfig = cookieConfig,
): string | undefined {
  const email = config.supportEmail?.trim() || site.supportEmail;
  if (!email || isPlaceholderEmail(email)) return undefined;
  return email;
}

export function getEnabledEssentialPurposes(
  config: CookieConfig = cookieConfig,
): CookieConfig['essentialPurposes'] {
  return config.essentialPurposes.filter((purpose) => purpose.enabled);
}

export function getEnabledCookieAnalyticsProviders(
  config: CookieConfig = cookieConfig,
): CookieConfig['analyticsProviders'] {
  if (config === cookieConfig) {
    return getEnabledAnalyticsProviders(privacyConfig);
  }
  return config.analyticsProviders.filter((provider) => provider.enabled);
}

export function getEnabledCookieMarketingTools(
  config: CookieConfig = cookieConfig,
): CookieConfig['marketingTools'] {
  return config.marketingTools.filter((tool) => tool.enabled);
}
