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

  const stored = coupon as {
    startAt?: string;
    expiresAt?: string;
  };
  const now = Date.now();
  if (stored.startAt && new Date(stored.startAt).getTime() > now) {
    return { valid: false, discountAmount: 0, message: 'Coupon is not active yet.' };
  }
  if (stored.expiresAt && new Date(stored.expiresAt).getTime() < now) {
    return { valid: false, discountAmount: 0, message: 'Coupon has expired.' };
  }
  if (coupon.minSubtotal != null && input.subtotal < coupon.minSubtotal) {
    return { valid: false, discountAmount: 0, message: 'Order does not meet the coupon minimum.' };
  }

  let discountAmount = 0;
  if (coupon.discountType === 'percentage') {
    discountAmount = Math.round((input.subtotal * coupon.value) / 100);
  } else {
    discountAmount = Math.min(coupon.value, input.subtotal);
  }

  return { valid: true, coupon, discountAmount };
}
