/**
 * Admin coupons — Document 12.06.
 * Reads/writes runtime coupon catalog (site_settings).
 */

import {
  createCoupon,
  hydrateCoupons,
  listStoredCoupons,
  updateCoupon,
  type CouponInput,
  type StoredCoupon,
} from '@/lib/catalog/coupons-store';
import type {
  AdminCouponEditorModel,
  AdminCouponRow,
  AdminCouponStatus,
} from '@/types/admin-coupons';

function deriveStatus(coupon: StoredCoupon): AdminCouponStatus {
  if (coupon.expiresAt && new Date(coupon.expiresAt).getTime() < Date.now()) return 'expired';
  return coupon.active ? 'active' : 'inactive';
}

function toRow(coupon: StoredCoupon): AdminCouponRow {
  return {
    id: coupon.id,
    code: coupon.code,
    campaignName: coupon.campaignName || coupon.code,
    description: coupon.description,
    discountType: coupon.discountType,
    discountValue: coupon.value,
    currency: coupon.currency,
    minOrderAmount: coupon.minSubtotal,
    usageLimit: coupon.maxRedemptions,
    usageCount: 0,
    startAt: coupon.startAt,
    expiresAt: coupon.expiresAt,
    status: deriveStatus(coupon),
    updatedAt: coupon.updatedAt.slice(0, 10),
  };
}

export async function getAdminCouponRows(): Promise<AdminCouponRow[]> {
  const coupons = await listStoredCoupons();
  return coupons.map(toRow);
}

export async function getAdminCouponEditor(
  couponId: string,
): Promise<AdminCouponEditorModel | null> {
  const rows = await getAdminCouponRows();
  const row = rows.find((c) => c.id === couponId);
  if (!row) return null;
  return {
    ...row,
    stats: {
      timesUsed: row.usageCount,
      totalDiscountGiven: '$0',
      revenueGenerated: '$0',
    },
  };
}

export async function createAdminCoupon(input: CouponInput) {
  await hydrateCoupons();
  return createCoupon(input);
}

export async function updateAdminCoupon(couponId: string, input: Partial<CouponInput>) {
  await hydrateCoupons();
  return updateCoupon(couponId, input);
}
