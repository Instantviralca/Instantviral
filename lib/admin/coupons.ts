import { coupons } from '@/data/pricing/discounts';
import type {
  AdminCouponEditorModel,
  AdminCouponRow,
  AdminCouponStatus,
} from '@/types/admin-coupons';

/**
 * Admin coupons — Document 12.06.
 * Reads pricing coupon registry. No CRUD persistence yet.
 */
function deriveStatus(active: boolean, expiresAt?: string): AdminCouponStatus {
  if (expiresAt && new Date(expiresAt).getTime() < Date.now()) return 'expired';
  return active ? 'active' : 'inactive';
}

export function getAdminCouponRows(): AdminCouponRow[] {
  return coupons.map((coupon) => ({
    id: coupon.id,
    code: coupon.code,
    campaignName: coupon.code,
    discountType: coupon.discountType,
    discountValue: coupon.value,
    currency: coupon.currency,
    minOrderAmount: coupon.minSubtotal,
    usageLimit: coupon.maxRedemptions,
    usageCount: 0,
    status: deriveStatus(coupon.active),
    updatedAt: new Date().toISOString().slice(0, 10),
  }));
}

export function getAdminCouponEditor(couponId: string): AdminCouponEditorModel | null {
  const row = getAdminCouponRows().find((c) => c.id === couponId);
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
