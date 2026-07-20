'use client';

import * as React from 'react';
import { CheckCircle2, X } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { CheckoutButton } from '@/components/commerce/cart/checkout-button';
import { routes } from '@/config/routes';
import { useCartUi } from '@/lib/cart/cart-ui-context';
import { emitLegacyAnalyticsEvent } from '@/lib/analytics/core/bridge';
import { cn } from '@/lib/utils';

export type CartToastInput = {
  title: string;
  quantityLabel?: string;
  priceLabel?: string;
  serviceName?: string;
};

type CartToastItem = CartToastInput & {
  id: string;
};

type CartToastContextValue = {
  showCartToast: (input: CartToastInput) => void;
  dismiss: (id: string) => void;
};

const CartToastContext = React.createContext<CartToastContextValue | null>(null);

const AUTO_DISMISS_MS = 8000;

export function CartToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = React.useState<CartToastItem[]>([]);
  const timers = React.useRef<Map<string, number>>(new Map());
  const lastKey = React.useRef<string | null>(null);
  const lastAt = React.useRef(0);

  const clearTimer = React.useCallback((id: string) => {
    const existing = timers.current.get(id);
    if (existing) {
      window.clearTimeout(existing);
      timers.current.delete(id);
    }
  }, []);

  const dismiss = React.useCallback(
    (id: string) => {
      clearTimer(id);
      setToasts((current) => current.filter((item) => item.id !== id));
    },
    [clearTimer],
  );

  const scheduleDismiss = React.useCallback(
    (id: string) => {
      clearTimer(id);
      const handle = window.setTimeout(() => dismiss(id), AUTO_DISMISS_MS);
      timers.current.set(id, handle);
    },
    [clearTimer, dismiss],
  );

  const showCartToast = React.useCallback(
    (input: CartToastInput) => {
      const dedupeKey = `${input.title}|${input.quantityLabel ?? ''}`;
      const now = Date.now();
      if (lastKey.current === dedupeKey && now - lastAt.current < 800) {
        return;
      }
      lastKey.current = dedupeKey;
      lastAt.current = now;

      const id = `${now}-${Math.random().toString(36).slice(2, 8)}`;
      setToasts((current) => {
        current.forEach((item) => clearTimer(item.id));
        return [{ ...input, id }];
      });
      scheduleDismiss(id);
    },
    [clearTimer, scheduleDismiss],
  );

  React.useEffect(() => {
    const activeTimers = timers.current;
    return () => {
      activeTimers.forEach((handle) => window.clearTimeout(handle));
      activeTimers.clear();
    };
  }, []);

  return (
    <CartToastContext.Provider value={{ showCartToast, dismiss }}>
      {children}
      <div
        className={cn(
          'pointer-events-none fixed z-[60] flex w-full max-w-sm flex-col gap-2 px-3',
          'bottom-[max(1rem,env(safe-area-inset-bottom))] left-1/2 -translate-x-1/2',
          'sm:bottom-4 sm:left-auto sm:right-4 sm:translate-x-0',
        )}
        aria-live="polite"
        aria-relevant="additions"
      >
        {toasts.map((item) => (
          <CartToast
            key={item.id}
            item={item}
            onDismiss={() => dismiss(item.id)}
            onPause={() => clearTimer(item.id)}
            onResume={() => scheduleDismiss(item.id)}
          />
        ))}
      </div>
    </CartToastContext.Provider>
  );
}

function CartToast({
  item,
  onDismiss,
  onPause,
  onResume,
}: {
  item: CartToastItem;
  onDismiss: () => void;
  onPause: () => void;
  onResume: () => void;
}) {
  const { openCart } = useCartUi();

  return (
    <div
      role="status"
      className="pointer-events-auto rounded-xl border border-border bg-background p-3.5 shadow-lg"
      onMouseEnter={onPause}
      onMouseLeave={onResume}
      onFocusCapture={onPause}
      onBlurCapture={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
          onResume();
        }
      }}
      data-analytics="cart-toast"
    >
      <div className="flex items-start gap-3">
        <CheckCircle2
          className="mt-0.5 size-5 shrink-0 text-[var(--color-success)]"
          aria-hidden="true"
        />
        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium text-foreground">{item.title}</p>
          {item.priceLabel ? (
            <p className="mt-0.5 text-xs text-muted-foreground">{item.priceLabel}</p>
          ) : null}
          <div className="mt-2.5 flex flex-wrap gap-2">
            <CheckoutButton
              label="Checkout"
              className="min-h-9 w-auto px-3 text-sm"
              onNavigate={onDismiss}
            />
            <Button
              type="button"
              size="sm"
              variant="secondary"
              className="min-h-9"
              onClick={() => {
                emitLegacyAnalyticsEvent('cart_view_click', {
                  href: routes.cart,
                  serviceSlug: undefined,
                });
                onDismiss();
                openCart();
              }}
            >
              View Cart
            </Button>
          </div>
        </div>
        <button
          type="button"
          onClick={onDismiss}
          className="rounded-sm opacity-70 hover:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          aria-label="Dismiss"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

export function useCartToast() {
  const context = React.useContext(CartToastContext);
  if (!context) {
    throw new Error('useCartToast must be used within a CartToastProvider');
  }
  return context;
}
