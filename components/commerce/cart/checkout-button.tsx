'use client';

import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { useCart } from '@/lib/cart';
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
 * Syncs cart to a shared cookie (or handoff token), then goes to checkout host.
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

  const handleClick = async () => {
    if (busy || disabled || cart.items.length === 0) return;
    setBusy(true);
    setError(null);
    onNavigate?.();

    try {
      const response = await fetch('/api/cart/prepare-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cart: {
            items: cart.items,
            coupon: cart.coupon,
            currency: cart.currency,
            updatedAt: cart.updatedAt,
          },
        }),
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
  };

  return (
    <div className="space-y-2">
      <Button
        type="button"
        size="lg"
        className={cn('w-full min-h-11', className)}
        disabled={disabled || busy || cart.items.length === 0}
        data-analytics="checkout-click"
        onClick={() => {
          void handleClick();
        }}
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
