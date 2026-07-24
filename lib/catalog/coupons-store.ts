/**
 * Runtime coupon catalog persistence — server only.
 */

import 'server-only';

import {
  clearJsonSettingsMemoryForTests,
  readJsonSetting,
  writeJsonSetting,
} from '@/lib/catalog/json-settings';
import {
  getRuntimeCoupons,
  seedCoupons,
  setRuntimeCoupons,
  type CouponInput,
  type StoredCoupon,
} from '@/lib/catalog/coupons-memory';

export const COUPONS_SETTING_KEY = 'catalog_coupons_v1';

export type { CouponInput, StoredCoupon };

let hydratePromise: Promise<StoredCoupon[]> | null = null;
let hydrated = false;

export async function hydrateCoupons(): Promise<StoredCoupon[]> {
  if (hydrated) return getRuntimeCoupons();
  if (!hydratePromise) {
    hydratePromise = (async () => {
      const stored = await readJsonSetting<StoredCoupon[] | null>(COUPONS_SETTING_KEY, null);
      setRuntimeCoupons(
        stored && Array.isArray(stored) && stored.length > 0 ? stored : seedCoupons(),
      );
      hydrated = true;
      return getRuntimeCoupons();
    })().finally(() => {
      hydratePromise = null;
    });
  }
  return hydratePromise;
}

export function getRuntimeCouponByCode(code: string) {
  const normalized = code.trim().toUpperCase();
  return getRuntimeCoupons().find(
    (coupon) => coupon.code.toUpperCase() === normalized && coupon.active,
  );
}

export async function listStoredCoupons(): Promise<StoredCoupon[]> {
  return hydrateCoupons();
}

export async function saveCoupons(next: StoredCoupon[]): Promise<StoredCoupon[]> {
  setRuntimeCoupons(next);
  await writeJsonSetting(COUPONS_SETTING_KEY, next);
  return next;
}

function normalizeCode(code: string): string {
  return code.trim().toUpperCase().replace(/\s+/g, '');
}

function validateInput(input: CouponInput): void {
  const code = normalizeCode(input.code);
  if (!code || code.length < 3) {
    throw new Error('Coupon code must be at least 3 characters.');
  }
  if (input.discountType === 'percentage') {
    if (input.value <= 0 || input.value > 100) {
      throw new Error('Percentage discount must be between 1 and 100.');
    }
  } else if (input.value <= 0) {
    throw new Error('Fixed discount must be greater than 0 (minor units).');
  }
}

export async function createCoupon(input: CouponInput): Promise<StoredCoupon> {
  validateInput(input);
  const list = await hydrateCoupons();
  const code = normalizeCode(input.code);
  if (list.some((c) => c.code.toUpperCase() === code)) {
    throw new Error(`Coupon code ${code} already exists.`);
  }
  const now = new Date().toISOString();
  const coupon: StoredCoupon = {
    id: `coupon-${code.toLowerCase()}-${Date.now().toString(36)}`,
    code,
    campaignName: input.campaignName?.trim() || code,
    description: input.description?.trim() || undefined,
    discountType: input.discountType,
    value: Math.round(input.value),
    currency: input.currency,
    minSubtotal: input.minSubtotal,
    maxRedemptions: input.maxRedemptions,
    active: input.active,
    startAt: input.startAt,
    expiresAt: input.expiresAt,
    updatedAt: now,
  };
  await saveCoupons([coupon, ...list]);
  return coupon;
}

export async function updateCoupon(
  couponId: string,
  input: Partial<CouponInput>,
): Promise<StoredCoupon> {
  const list = await hydrateCoupons();
  const index = list.findIndex((c) => c.id === couponId);
  if (index < 0) throw new Error('Coupon not found.');
  const current = list[index]!;
  const merged: CouponInput = {
    code: input.code ?? current.code,
    campaignName: input.campaignName ?? current.campaignName,
    description: input.description ?? current.description,
    discountType: input.discountType ?? current.discountType,
    value: input.value ?? current.value,
    currency: input.currency ?? current.currency,
    minSubtotal: input.minSubtotal ?? current.minSubtotal,
    maxRedemptions: input.maxRedemptions ?? current.maxRedemptions,
    active: input.active ?? current.active,
    startAt: input.startAt ?? current.startAt,
    expiresAt: input.expiresAt ?? current.expiresAt,
  };
  validateInput(merged);
  const code = normalizeCode(merged.code);
  if (list.some((c, i) => i !== index && c.code.toUpperCase() === code)) {
    throw new Error(`Coupon code ${code} already exists.`);
  }
  const updated: StoredCoupon = {
    ...current,
    code,
    campaignName: merged.campaignName?.trim() || code,
    description: merged.description?.trim() || undefined,
    discountType: merged.discountType,
    value: Math.round(merged.value),
    currency: merged.currency,
    minSubtotal: merged.minSubtotal,
    maxRedemptions: merged.maxRedemptions,
    active: merged.active,
    startAt: merged.startAt,
    expiresAt: merged.expiresAt,
    updatedAt: new Date().toISOString(),
  };
  const next = [...list];
  next[index] = updated;
  await saveCoupons(next);
  return updated;
}

export function resetCouponsCacheForTests(): void {
  hydrated = false;
  hydratePromise = null;
  setRuntimeCoupons(seedCoupons());
  clearJsonSettingsMemoryForTests();
}
