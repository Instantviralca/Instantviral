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
  clearCartLocationHash,
  readCartFromLocationHash,
} from '@/lib/cart/cart-hash';
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
    /** True while applying hash/handoff — checkout must show loading, never empty. */
    isBootstrapping: boolean;
  };

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<CartState>(() => createEmptyCart());
  const [isHydrated, setIsHydrated] = useState(false);
  const [isBootstrapping, setIsBootstrapping] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function hydrate() {
      setIsBootstrapping(true);

      // 1) Instant hash transfer (preferred — no network).
      const fromHash = readCartFromLocationHash();
      if (fromHash) {
        if (!cancelled) {
          setState(fromHash);
          writeCartCookie(fromHash);
          clearCartLocationHash();
          setIsHydrated(true);
          setIsBootstrapping(false);
        }
        return;
      }

      // 2) DB handoff token (oversized carts).
      const params = new URLSearchParams(window.location.search);
      const handoffId = params.get('cartHandoff');
      if (handoffId) {
        try {
          const response = await fetch(
            `/api/cart/handoff?id=${encodeURIComponent(handoffId)}`,
          );
          const data = (await response.json()) as {
            ok?: boolean;
            cart?: CartState;
            error?: string;
          };
          if (!cancelled && response.ok && data.ok && data.cart?.items?.length) {
            setState(data.cart);
            writeCartCookie(data.cart);
            params.delete('cartHandoff');
            const next = `${window.location.pathname}${params.toString() ? `?${params}` : ''}`;
            window.history.replaceState({}, '', next);
            setIsHydrated(true);
            setIsBootstrapping(false);
            return;
          }
          console.error('[cart] handoff failed', data.error ?? response.status);
        } catch (error) {
          console.error('[cart] handoff request failed', error);
        }
      }

      if (cancelled) return;
      const stored = hydrateCartFromStores();
      if (stored) setState(stored);
      setIsHydrated(true);
      setIsBootstrapping(false);
    }

    void hydrate();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!isHydrated || typeof window === 'undefined') return;
    window.sessionStorage.setItem(CART_STORAGE_KEY, serializeCart(state));
    if (state.items.length > 0) {
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
    clearCartCookie();
    if (typeof window !== 'undefined') {
      window.sessionStorage.removeItem(CART_STORAGE_KEY);
    }
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
      isBootstrapping,
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
      isBootstrapping,
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
