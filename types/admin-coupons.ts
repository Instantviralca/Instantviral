import type { CurrencyCode } from '@/types/pricing';

export type AdminCouponDiscountType = 'percentage' | 'fixed';

export type AdminCouponStatus = 'active' | 'inactive' | 'expired';

/** Admin Coupon Management — Document 12.06. */
export type AdminCouponRow = {
  id: string;
  code: string;
  campaignName: string;
  description?: string;
  discountType: AdminCouponDiscountType;
  discountValue: number;
  currency?: CurrencyCode;
  minOrderAmount?: number;
  maxDiscount?: number;
  usageLimit?: number;
  usageCount: number;
  startAt?: string;
  expiresAt?: string;
  status: AdminCouponStatus;
  updatedAt: string;
};

export type AdminCouponFilters = {
  status?: AdminCouponStatus | 'all';
  discountType?: AdminCouponDiscountType | 'all';
};

export type AdminCouponStats = {
  timesUsed: number;
  totalDiscountGiven: string;
  revenueGenerated: string;
  lastUsedAt?: string;
};

export type AdminCouponEditorModel = AdminCouponRow & {
  stats: AdminCouponStats;
};
