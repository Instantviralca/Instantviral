'use client';

import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { useCart } from '@/lib/cart';
import { encodeCartHash } from '@/lib/cart/cart-hash';
import { writeCartCookie } from '@/lib/cart/cookie-store';
import { getCheckoutUrl } from '@/lib/config/hosts';
import { emitLegacyAnalyticsEvent } from '@/lib/analytics/core/bridge';
import { cn } from '@/lib/utils';

type CheckoutButtonProps = {
  disabled?: boolean;
  className?: string;
  label?: string;
  /** Called before navigating to checkout (e.g. close drawer). */
  onNavigate?: () => void;
};

/**
 * Instant checkout navigation — cart rides in the URL hash (no prepare API wait).
 */
export function CheckoutButton({
  disabled,
  className,
  label = 'Continue to Checkout',
  onNavigate,
}: CheckoutButtonProps) {
  const cart = useCart();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleClick = () => {
    if (busy || disabled || cart.items.length === 0) return;
    setBusy(true);
    setError(null);
    onNavigate?.();

    const cartState = {
      items: cart.items,
      coupon: cart.coupon,
      currency: cart.currency,
      updatedAt: cart.updatedAt,
    };

    writeCartCookie(cartState);

    const hash = encodeCartHash(cartState);
    const url = new URL(getCheckoutUrl('/'));

    if (hash) {
      url.hash = hash;
      emitLegacyAnalyticsEvent('checkout_click', { href: url.toString() });
      window.location.assign(url.toString());
      return;
    }

    // Oversized cart — fall back to server handoff (slower).
    void (async () => {
      try {
        const response = await fetch('/api/cart/prepare-checkout', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ cart: cartState }),
        });
        const data = (await response.json()) as {
          ok?: boolean;
          checkoutUrl?: string;
          error?: string;
        };
        if (!response.ok || !data.ok || !data.checkoutUrl) {
          throw new Error(data.error ?? 'Unable to continue to checkout.');
        }
        emitLegacyAnalyticsEvent('checkout_click', { href: data.checkoutUrl });
        window.location.assign(data.checkoutUrl);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unable to continue to checkout.');
        setBusy(false);
      }
    })();
  };

  return (
    <div className="space-y-2">
      {busy ? (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-white/90 backdrop-blur-sm"
          role="status"
          aria-live="polite"
        >
          <p className="text-sm font-medium text-[var(--text-secondary)]">
            Going to checkout…
          </p>
        </div>
      ) : null}
      <Button
        type="button"
        size="lg"
        className={cn('w-full min-h-11', className)}
        disabled={disabled || busy || cart.items.length === 0}
        data-analytics="checkout-click"
        onClick={handleClick}
      >
        {busy ? 'Continuing…' : label}
      </Button>
      {error ? (
        <p className="text-xs text-destructive" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
