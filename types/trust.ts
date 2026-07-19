/**
 * Global Trust Center types — Document 14.01.
 * Content lives in data/content/trust.ts; components must not hardcode trust copy.
 */

import type { CTAContent } from '@/types/copywriting';

export type TrustBadgeId =
  | 'trusted-since-2018'
  | 'secure-checkout'
  | 'no-password-required'
  | 'support-24-7'
  | 'real-package-data'
  | 'refill-protection'
  | 'money-back-guarantee';

export type TrustBadgeContent = {
  id: TrustBadgeId;
  label: string;
  /** Individually toggled via configuration / content. */
  enabled: boolean;
  /**
   * Optional short note for conditional badges
   * (e.g. eligible packages / eligible purchases only).
   */
  note?: string;
};

export type TrustFeatureItem = {
  id: string;
  title: string;
  description: string;
};

export type TrustDetailBlock = {
  id: string;
  title: string;
  description: string;
};

export type TrustCenterContent = {
  id: 'trust-center';
  header: {
    title: string;
    subtitle: string;
  };
  badges: TrustBadgeContent[];
  whyChoose: {
    title: string;
    description: string;
    items: TrustFeatureItem[];
  };
  secureCheckout: TrustDetailBlock;
  noPasswordRequired: TrustDetailBlock;
  refundAndRefill: TrustDetailBlock & {
    refundPolicyCta: CTAContent;
  };
  customerSupport: TrustDetailBlock & {
    supportCta: CTAContent;
  };
  finalCta: {
    title: string;
    description: string;
    primaryCta: CTAContent;
    secondaryCta?: CTAContent;
  };
};
