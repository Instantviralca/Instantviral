import { getCouponByCode } from '@/data/pricing/discounts';
import { resolveServicePackages, getPackageById } from '@/data/pricing/packages';
import type {
  CouponValidateApiRequest,
  CouponValidateApiResponse,
  PricingPackage,
} from '@/types/pricing';

export function listActivePackages(serviceSlug: string, packageIds?: string[]): PricingPackage[] {
  return resolveServicePackages(serviceSlug, packageIds);
}

export function findPackage(packageId: string): PricingPackage | undefined {
  return getPackageById(packageId);
}

/**
 * Coupon validation stub — Document 10.01.
 * Ready for API swap; does not invent discounts for inactive coupons.
 */
export function validateCoupon(input: CouponValidateApiRequest): CouponValidateApiResponse {
  const coupon = getCouponByCode(input.code);
  if (!coupon) {
    return { valid: false, discountAmount: 0, message: 'Coupon not found or inactive.' };
  }

  let discountAmount = 0;
  if (coupon.discountType === 'percentage') {
    discountAmount = Math.round((input.subtotal * coupon.value) / 100);
  } else {
    discountAmount = Math.min(coupon.value, input.subtotal);
  }

  return { valid: true, coupon, discountAmount };
}
