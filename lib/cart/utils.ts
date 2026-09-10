import type { CurrencyCode } from '@/types/pricing';
import type { AppliedCoupon, CartItem, CartState, CartTotals } from '@/types/cart';
import { getDefaultCurrency } from '@/data/pricing/currencies';
import {
  normalizeCartItem,
  resolveCartQuantity,
  resolveLineTotal,
} from '@/lib/orders/line-items';

export const CART_STORAGE_KEY = 'instantviral.cart.v1';

export function createEmptyCart(currency?: CurrencyCode): CartState {
  return {
    items: [],
    coupon: null,
    currency: currency ?? getDefaultCurrency().code,
    updatedAt: null,
  };
}

export function createCartItemId(): string {
  return `cart_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
}

export function calculateCartTotals(
  items: CartItem[],
  coupon: AppliedCoupon | null,
  currency: CurrencyCode,
): CartTotals {
  const normalized = items.map(normalizeCartItem);
  const subtotalAmount = normalized.reduce((sum, item) => sum + resolveLineTotal(item), 0);
  const discountAmount = coupon
    ? Math.min(coupon.discountAmount, subtotalAmount)
    : 0;

  return {
    subtotal: { amount: subtotalAmount, currency },
    discount: { amount: discountAmount, currency },
    total: { amount: Math.max(subtotalAmount - discountAmount, 0), currency },
    itemCount: normalized.reduce((sum, item) => sum + resolveCartQuantity(item), 0),
  };
}

export function serializeCart(state: CartState): string {
  return JSON.stringify(state);
}

export function deserializeCart(raw: string | null): CartState | null {
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as CartState;
    if (!parsed || !Array.isArray(parsed.items)) return null;
    return {
      ...parsed,
      items: parsed.items.map((item) => normalizeCartItem(item)),
    };
  } catch {
    return null;
  }
}
