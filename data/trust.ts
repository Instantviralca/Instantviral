import type { TrustBarItemContent } from '@/types/content';

/**
 * Shared trust items (Document 08.03).
 * Homepage and other surfaces reference this pool — no duplicated strings in UI.
 */
export const trustItems: TrustBarItemContent[] = [
  {
    id: 'trust-secure',
    label: 'Secure Checkout',
    description: 'Payments are handled through secure and trusted checkout methods.',
    iconKey: 'ShieldCheck',
  },
  {
    id: 'trust-process',
    label: 'Transparent Process',
    description: 'Clear service information with straightforward ordering steps.',
    iconKey: 'BadgeCheck',
  },
  {
    id: 'trust-support',
    label: 'Helpful Support',
    description: 'Reach out whenever you need assistance before or after placing an order.',
    iconKey: 'Headphones',
  },
  {
    id: 'trust-platforms',
    label: 'Multiple Platforms',
    description:
      'Services and educational resources for Instagram, TikTok, YouTube and Facebook.',
    iconKey: 'Layers3',
  },
];

export function getAllTrustItems(): TrustBarItemContent[] {
  return trustItems;
}

export function getTrustItemsByIds(ids: string[]): TrustBarItemContent[] {
  return ids
    .map((id) => trustItems.find((item) => item.id === id))
    .filter((item): item is TrustBarItemContent => Boolean(item));
}
