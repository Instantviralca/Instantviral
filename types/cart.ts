import type { CurrencyCode, MoneyAmount } from '@/types/pricing';
import type { OrderConfigurationValues } from '@/types/order-fields';

/**
 * Shopping cart — Document 10.04
 * Pricing math stays in the pricing layer; cart only stores selections.
 */

export type CartItemId = string;

export type CartItem = {
  id: CartItemId;
  packageId: string;
  serviceId: string;
  serviceSlug: string;
  serviceName: string;
  platformId: string;
  packageTitle: string;
  /** Package size from catalog (e.g. 1000 followers) — not cart buy count. */
  quantity: number;
  quantityLabel: string;
  /** How many of this package were added (defaults to 1). */
  cartQuantity?: number;
  unitPrice: number;
  /** unitPrice × cartQuantity in minor units. */
  lineTotal?: number;
  currency: CurrencyCode;
  deliveryTime: string;
  configuration: OrderConfigurationValues;
  addedAt: string;
};

export type AppliedCoupon = {
  code: string;
  discountType: 'percentage' | 'fixed';
  value: number;
  discountAmount: number;
};

export type CartTotals = {
  subtotal: MoneyAmount;
  discount: MoneyAmount;
  total: MoneyAmount;
  itemCount: number;
};

export type CartState = {
  items: CartItem[];
  coupon: AppliedCoupon | null;
  currency: CurrencyCode;
  updatedAt: string | null;
};

export type CartActions = {
  addItem: (item: Omit<CartItem, 'id' | 'addedAt'>) => void;
  removeItem: (itemId: CartItemId) => void;
  updateItemConfiguration: (itemId: CartItemId, configuration: OrderConfigurationValues) => void;
  applyCoupon: (coupon: AppliedCoupon) => void;
  removeCoupon: () => void;
  clearCart: () => void;
};
