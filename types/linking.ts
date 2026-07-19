/**
 * Internal Linking Engine types — Document 14.05.
 */

import type { PlatformId } from '@/types/platform';
import type { BreadcrumbItem } from '@/types/shared';

export type LinkPageCategory =
  | 'homepage'
  | 'service'
  | 'platform'
  | 'company'
  | 'support'
  | 'legal'
  | 'learn'
  | 'commerce';

export type PolicyLinkId =
  | 'privacy-policy'
  | 'terms-and-conditions'
  | 'refund-policy'
  | 'cookie-policy'
  | 'disclaimer'
  | 'faq'
  | 'contact';

export type PolicyLinkContext =
  | 'checkout'
  | 'refund'
  | 'privacy'
  | 'service'
  | 'footer'
  | 'legal'
  | 'support'
  | 'cookie';

/**
 * Shared link-registry page record.
 * All internal destinations must be registered here.
 */
export type LinkPage = {
  /** Path without leading slash (`buy-instagram-followers`, `privacy-policy`). Home uses `home`. */
  slug: string;
  title: string;
  category: LinkPageCategory;
  platform?: PlatformId;
  keywords: string[];
  relatedServices: string[];
  relatedArticles: string[];
  relatedPolicies: PolicyLinkId[];
  breadcrumbParent?: string;
  active: boolean;
  /** Service category / intent key when category === 'service'. */
  serviceIntent?: string;
};

export type InternalLink = {
  slug: string;
  href: string;
  label: string;
};

export type LinkValidationKind =
  | 'broken_route'
  | 'inactive_destination'
  | 'duplicate_link'
  | 'circular_reference'
  | 'generic_anchor'
  | 'empty_anchor'
  | 'skipped_service';

export type LinkValidationIssue = {
  kind: LinkValidationKind;
  sourceSlug: string;
  targetSlug?: string;
  href?: string;
  detail: string;
};

export type LinkValidationReport = {
  issues: LinkValidationIssue[];
  brokenCount: number;
  inactiveCount: number;
  duplicateCount: number;
  circularCount: number;
  skippedServiceCount: number;
};

export type OrphanPageReport = {
  slug: string;
  title: string;
  category: LinkPageCategory;
  detail: string;
};

export type RecommendedAnchor = {
  slug: string;
  href: string;
  label: string;
  context: string;
};

export type { BreadcrumbItem };
