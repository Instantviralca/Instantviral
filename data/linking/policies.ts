/**
 * Contextual policy / support link sets — Document 14.05.
 * Do not dump every legal link on every page.
 */

import type { PolicyLinkContext, PolicyLinkId } from '@/types/linking';

export const POLICY_LINK_SETS: Record<PolicyLinkContext, PolicyLinkId[]> = {
  checkout: ['refund-policy', 'terms-and-conditions', 'privacy-policy', 'contact'],
  refund: ['refund-policy', 'faq', 'contact'],
  privacy: ['privacy-policy', 'cookie-policy', 'terms-and-conditions'],
  cookie: ['cookie-policy', 'privacy-policy'],
  service: ['faq', 'refund-policy', 'contact'],
  footer: [
    'privacy-policy',
    'terms-and-conditions',
    'refund-policy',
    'cookie-policy',
    'disclaimer',
    'faq',
    'contact',
  ],
  legal: [
    'privacy-policy',
    'terms-and-conditions',
    'refund-policy',
    'cookie-policy',
    'disclaimer',
  ],
  support: ['faq', 'contact', 'refund-policy'],
};

export const POLICY_ANCHOR_LABELS: Record<PolicyLinkId, string> = {
  'privacy-policy': 'Privacy Policy',
  'terms-and-conditions': 'Terms & Conditions',
  'refund-policy': 'Refund Policy',
  'cookie-policy': 'Cookie Policy',
  disclaimer: 'Disclaimer',
  faq: 'FAQ',
  contact: 'Contact Support',
};
