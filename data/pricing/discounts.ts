import type { CouponDefinition, DiscountRule } from '@/types/pricing';

/**
 * Discount + coupon registry stubs — Document 10.01.
 * Replace with API/CMS. No fabricated runtime discounts in UI.
 */
export const discountRules: DiscountRule[] = [];

export const coupons: CouponDefinition[] = [
  // Example shape only — inactive so UI never invents discounts
  {
    id: 'coupon-welcome',
    code: 'WELCOME10',
    discountType: 'percentage',
    value: 10,
    active: false,
  },
];

export function getActiveDiscountRules(): DiscountRule[] {
  return discountRules.filter((rule) => rule.active);
}

export function getCouponByCode(code: string): CouponDefinition | undefined {
  const normalized = code.trim().toUpperCase();
  return coupons.find((c) => c.code.toUpperCase() === normalized && c.active);
}
