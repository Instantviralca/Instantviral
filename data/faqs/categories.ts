/**
 * FAQ category navigation metadata — Documents 13.03 + 14.04.
 */

import type { FAQCategoryId } from '@/types/faq';

export type FAQCategoryMeta = {
  id: FAQCategoryId;
  label: string;
  /** Anchor id for in-page navigation. */
  anchor: string;
};

/** FAQ hub category navigation — Document 14.04. */
export const FAQ_CATEGORIES: FAQCategoryMeta[] = [
  { id: 'general', label: 'General', anchor: 'general' },
  { id: 'ordering', label: 'Ordering & Packages', anchor: 'ordering-packages' },
  { id: 'delivery', label: 'Delivery & Processing', anchor: 'delivery-processing' },
  { id: 'payments', label: 'Payments & Checkout', anchor: 'payments-checkout' },
  { id: 'refunds', label: 'Refunds & Refill', anchor: 'refunds-refill' },
  { id: 'tracking', label: 'Order Tracking', anchor: 'order-tracking' },
  { id: 'instagram', label: 'Instagram', anchor: 'instagram' },
  { id: 'tiktok', label: 'TikTok', anchor: 'tiktok' },
  { id: 'facebook', label: 'Facebook', anchor: 'facebook' },
  { id: 'youtube', label: 'YouTube', anchor: 'youtube' },
  { id: 'privacy_legal', label: 'Privacy & Legal', anchor: 'privacy-legal' },
  { id: 'account_security', label: 'Account & Security', anchor: 'account-security' },
  { id: 'contact_support', label: 'Contact & Support', anchor: 'contact-support' },
];

export const FAQ_CATEGORY_LABELS: Record<FAQCategoryId, string> = Object.fromEntries(
  FAQ_CATEGORIES.map((category) => [category.id, category.label]),
) as Record<FAQCategoryId, string>;

export function getFaqCategoryMeta(id: FAQCategoryId): FAQCategoryMeta | undefined {
  return FAQ_CATEGORIES.find((category) => category.id === id);
}
