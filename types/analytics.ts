/**
 * Analytics & Conversion Event System types — Document 14.09.
 */

import type { CurrencyCode } from '@/types/pricing';
import type { PlatformId } from '@/types/platform';

export type AnalyticsConsentCategory = 'essential' | 'analytics' | 'marketing';

export type AnalyticsEventCategory =
  | 'page'
  | 'engagement'
  | 'form'
  | 'homepage'
  | 'service'
  | 'package'
  | 'cart'
  | 'checkout'
  | 'purchase'
  | 'tracking'
  | 'contact'
  | 'faq'
  | 'trust'
  | 'cta'
  | 'review'
  | 'legal'
  | 'admin'
  | 'content';

export type AnalyticsPageType =
  | 'home'
  | 'service'
  | 'about'
  | 'contact'
  | 'faq'
  | 'track_order'
  | 'cart'
  | 'checkout'
  | 'order_success'
  | 'legal'
  | 'learn'
  | 'reviews'
  | 'admin'
  | 'other';

export type AnalyticsProviderId =
  | 'ga4'
  | 'gtm'
  | 'clarity'
  | 'debug'
  | 'internal';

export type AnalyticsConsentState = {
  essential: true;
  analytics: boolean;
  marketing: boolean;
  updatedAt: string | null;
};

export type PurchaseVerificationSource =
  | 'payment_confirmed'
  | 'order_created';

export type PurchaseVerification = {
  verified: true;
  source: PurchaseVerificationSource;
  /** Stable key used to prevent duplicate purchase events. */
  idempotencyKey: string;
  /** Privacy-safe anonymous reference — never a raw order ID. */
  anonymousTransactionRef?: string;
};

export type AnalyticsEventMetadata = Record<
  string,
  string | number | boolean | null | undefined
>;

/**
 * Canonical typed analytics event after enrichment.
 * Must never contain PII or forbidden fields.
 */
export type AnalyticsEvent = {
  eventName: string;
  category: AnalyticsEventCategory;
  action: string;
  label?: string;
  value?: number;
  currency?: CurrencyCode;
  platform?: PlatformId;
  serviceSlug?: string;
  packageId?: string;
  quantity?: number;
  displayedPrice?: number;
  pagePath: string;
  pageType: AnalyticsPageType;
  sessionId: string;
  timestamp: string;
  metadata?: AnalyticsEventMetadata;
  consentCategory: AnalyticsConsentCategory;
  /** Internal channel — admin events stay off public marketing providers. */
  channel: 'public' | 'admin';
  eventId: string;
  idempotencyKey?: string;
};

/** Input accepted by track helpers before enrichment. */
export type AnalyticsEventInput = {
  eventName: string;
  category?: AnalyticsEventCategory;
  action?: string;
  label?: string;
  value?: number;
  currency?: CurrencyCode;
  platform?: PlatformId;
  serviceSlug?: string;
  packageId?: string;
  quantity?: number;
  displayedPrice?: number;
  pagePath?: string;
  pageType?: AnalyticsPageType;
  metadata?: AnalyticsEventMetadata;
  consentCategory?: AnalyticsConsentCategory;
  channel?: 'public' | 'admin';
  idempotencyKey?: string;
  /** Required for purchase conversions. */
  verification?: PurchaseVerification;
};

export type AnalyticsValidationIssue = {
  code:
    | 'unapproved_event'
    | 'missing_field'
    | 'forbidden_field'
    | 'invalid_currency'
    | 'invalid_platform'
    | 'invalid_service_slug'
    | 'invalid_package_id'
    | 'invalid_value'
    | 'consent_denied'
    | 'duplicate'
    | 'purchase_not_verified'
    | 'analytics_disabled'
    | 'provider_error';
  field?: string;
  detail: string;
};

export type AnalyticsTrackResult = {
  tracked: boolean;
  event?: AnalyticsEvent;
  duplicate: boolean;
  consentAllowed: boolean;
  providers: AnalyticsProviderId[];
  issues: AnalyticsValidationIssue[];
};

export type AnalyticsDebugRecord = {
  id: string;
  at: string;
  eventName: string;
  sanitizedPayload: AnalyticsEvent | null;
  consentAllowed: boolean;
  providers: AnalyticsProviderId[];
  duplicate: boolean;
  issues: AnalyticsValidationIssue[];
};

export type AnalyticsConfig = {
  enabled: boolean;
  debugMode: boolean;
  consentMode: 'required' | 'optional';
  environment: 'development' | 'test' | 'production';
  ga4: {
    enabled: boolean;
    measurementId: string | null;
  };
  gtm: {
    enabled: boolean;
    containerId: string | null;
  };
  clarity: {
    enabled: boolean;
    projectId: string | null;
  };
};

export type AnalyticsProviderConsent = {
  analytics: boolean;
  marketing: boolean;
};

export type AnalyticsProviderAdapter = {
  id: AnalyticsProviderId;
  initialize: () => Promise<void> | void;
  trackPageView: (event: AnalyticsEvent) => Promise<void> | void;
  trackEvent: (event: AnalyticsEvent) => Promise<void> | void;
  trackConversion: (event: AnalyticsEvent) => Promise<void> | void;
  setConsent: (consent: AnalyticsProviderConsent) => Promise<void> | void;
  reset: () => Promise<void> | void;
};

export type EventRegistryEntry = {
  eventName: string;
  category: AnalyticsEventCategory;
  action: string;
  consentCategory: AnalyticsConsentCategory;
  channel: 'public' | 'admin';
  requiresPackageId?: boolean;
  requiresServiceSlug?: boolean;
  description: string;
};
