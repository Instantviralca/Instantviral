import type { CouponDefinition, DiscountRule } from '@/types/pricing';
import { getRuntimeCouponByCode } from '@/lib/catalog/coupons-memory';

/**
 * Discount registry — Document 10.01.
 * Coupons are managed in admin (site_settings). Runtime lookup is memory-safe.
 */
export const discountRules: DiscountRule[] = [];

/** @deprecated Prefer runtime catalog via getCouponByCode / admin coupons API. */
export const coupons: CouponDefinition[] = [];

export function getActiveDiscountRules(): DiscountRule[] {
  return discountRules.filter((rule) => rule.active);
}

/** Active coupon lookup — uses hydrated admin catalog when available. */
export function getCouponByCode(code: string): CouponDefinition | undefined {
  return getRuntimeCouponByCode(code);
}
