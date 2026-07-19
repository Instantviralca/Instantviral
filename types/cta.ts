/**
 * Global CTA System types — Document 14.06.
 */

import type { PlatformId } from '@/types/platform';

export type CtaVariant = 'primary' | 'secondary' | 'cross_sell' | 'informational';

export type CtaPageLocation =
  | 'homepage'
  | 'service_page'
  | 'about'
  | 'contact'
  | 'faq'
  | 'legal'
  | 'track_order'
  | 'checkout'
  | 'learn'
  | 'footer';

/**
 * Canonical CTA record in the shared registry.
 * Components must not hardcode title / description / buttonLabel.
 */
export type CtaRecord = {
  id: string;
  title: string;
  description?: string;
  buttonLabel: string;
  /** Internal path only in Version 1 (e.g. `/contact`). */
  destination: string;
  variant: CtaVariant;
  icon?: string;
  platform?: PlatformId;
  serviceSlug?: string;
  pageLocations: CtaPageLocation[];
  active: boolean;
  order: number;
};

/** Safe public projection after validation + active filtering. */
export type PublicCta = {
  id: string;
  title: string;
  description?: string;
  buttonLabel: string;
  destination: string;
  variant: CtaVariant;
  icon?: string;
  platform?: PlatformId;
  serviceSlug?: string;
  pageLocations: CtaPageLocation[];
  order: number;
};

export type CtaDestinationValidation = {
  destination: string;
  valid: boolean;
  reason?: string;
};

export type CtaValidationIssue = {
  kind:
    | 'inactive'
    | 'invalid_destination'
    | 'external_destination'
    | 'empty_label'
    | 'duplicate_id'
    | 'generic_label';
  ctaId: string;
  detail: string;
};

export type CtaValidationReport = {
  issues: CtaValidationIssue[];
  invalidDestinationCount: number;
  duplicateIdCount: number;
  emptyLabelCount: number;
};
