'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

import { getCouponByCode } from '@/data/pricing/discounts';
import {
  clearCartCookie,
  hydrateCartFromStores,
  writeCartCookie,
} from '@/lib/cart/cookie-store';
import {
  calculateCartTotals,
  CART_STORAGE_KEY,
  createCartItemId,
  createEmptyCart,
  serializeCart,
} from '@/lib/cart/utils';
import { validateCoupon } from '@/lib/pricing/resolve';
import type { AppliedCoupon, CartActions, CartItem, CartState, CartTotals } from '@/types/cart';

type CartContextValue = CartState &
  CartActions & {
    totals: CartTotals;
    isHydrated: boolean;
  };

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<CartState>(() => createEmptyCart());
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    const stored = hydrateCartFromStores();
    if (stored) setState(stored);
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (!isHydrated || typeof window === 'undefined') return;
    window.sessionStorage.setItem(CART_STORAGE_KEY, serializeCart(state));
    if (state.items.length === 0) {
      clearCartCookie();
    } else {
      writeCartCookie(state);
    }
  }, [state, isHydrated]);

  const addItem = useCallback((item: Omit<CartItem, 'id' | 'addedAt'>) => {
    setState((prev) => ({
      ...prev,
      items: [
        ...prev.items,
        {
          ...item,
          id: createCartItemId(),
          addedAt: new Date().toISOString(),
        },
      ],
      updatedAt: new Date().toISOString(),
    }));
  }, []);

  const removeItem = useCallback((itemId: string) => {
    setState((prev) => ({
      ...prev,
      items: prev.items.filter((item) => item.id !== itemId),
      updatedAt: new Date().toISOString(),
    }));
  }, []);

  const updateItemConfiguration = useCallback(
    (itemId: string, configuration: CartItem['configuration']) => {
      setState((prev) => ({
        ...prev,
        items: prev.items.map((item) =>
          item.id === itemId ? { ...item, configuration } : item,
        ),
        updatedAt: new Date().toISOString(),
      }));
    },
    [],
  );

  const applyCoupon = useCallback((coupon: AppliedCoupon) => {
    setState((prev) => ({
      ...prev,
      coupon,
      updatedAt: new Date().toISOString(),
    }));
  }, []);

  const removeCoupon = useCallback(() => {
    setState((prev) => ({
      ...prev,
      coupon: null,
      updatedAt: new Date().toISOString(),
    }));
  }, []);

  const clearCart = useCallback(() => {
    setState(createEmptyCart(state.currency));
  }, [state.currency]);

  const totals = useMemo(
    () => calculateCartTotals(state.items, state.coupon, state.currency),
    [state.items, state.coupon, state.currency],
  );

  const value = useMemo<CartContextValue>(
    () => ({
      ...state,
      totals,
      isHydrated,
      addItem,
      removeItem,
      updateItemConfiguration,
      applyCoupon,
      removeCoupon,
      clearCart,
    }),
    [
      state,
      totals,
      isHydrated,
      addItem,
      removeItem,
      updateItemConfiguration,
      applyCoupon,
      removeCoupon,
      clearCart,
    ],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error('useCart must be used within CartProvider');
  }
  return ctx;
}

/** Apply a coupon code via the pricing layer. */
export function useApplyCouponCode() {
  const cart = useCart();
  return (code: string) => {
    const result = validateCoupon({
      code,
      currency: cart.currency,
      packageIds: cart.items.map((i) => i.packageId),
      subtotal: cart.totals.subtotal.amount,
    });
    if (!result.valid || !result.coupon) {
      return { ok: false as const, message: result.message ?? 'Invalid coupon.' };
    }
    const definition = getCouponByCode(code);
    if (!definition) {
      return { ok: false as const, message: 'Invalid coupon.' };
    }
    cart.applyCoupon({
      code: definition.code,
      discountType: definition.discountType,
      value: definition.value,
      discountAmount: result.discountAmount,
    });
    return { ok: true as const };
  };
}
