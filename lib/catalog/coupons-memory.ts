/**
 * In-memory coupon catalog — safe for client + server lookups.
 * Persistence/hydration lives in coupons-store (server only).
 */

import type { CouponDefinition, CurrencyCode } from '@/types/pricing';

export type StoredCoupon = CouponDefinition & {
  campaignName?: string;
  description?: string;
  startAt?: string;
  expiresAt?: string;
  updatedAt: string;
};

export type CouponInput = {
  code: string;
  campaignName?: string;
  description?: string;
  discountType: 'percentage' | 'fixed';
  value: number;
  currency?: CurrencyCode;
  minSubtotal?: number;
  maxRedemptions?: number;
  active: boolean;
  startAt?: string;
  expiresAt?: string;
};

const SEED_COUPONS: StoredCoupon[] = [
  {
    id: 'coupon-welcome',
    code: 'WELCOME10',
    campaignName: 'Welcome',
    discountType: 'percentage',
    value: 10,
    active: false,
    updatedAt: '2026-01-01T00:00:00.000Z',
  },
];

let coupons: StoredCoupon[] = SEED_COUPONS.map((c) => ({ ...c }));

export function getRuntimeCoupons(): StoredCoupon[] {
  return coupons;
}

export function setRuntimeCoupons(next: StoredCoupon[]): void {
  coupons = Array.isArray(next) ? next : seedCoupons();
}

export function seedCoupons(): StoredCoupon[] {
  return SEED_COUPONS.map((c) => ({ ...c }));
}

export function getRuntimeCouponByCode(code: string): StoredCoupon | undefined {
  const normalized = code.trim().toUpperCase();
  return getRuntimeCoupons().find(
    (coupon) => coupon.code.toUpperCase() === normalized && coupon.active,
  );
}

export function resetCouponsMemoryForTests(): void {
  coupons = seedCoupons();
}
