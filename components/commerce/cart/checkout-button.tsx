'use client';

import Link from 'next/link';

import { Button } from '@/components/ui/button';
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
 * Continues to the external checkout origin (checkout.instantviral.ca when configured).
 */
export function CheckoutButton({
  disabled,
  className,
  label = 'Continue to Checkout',
  onNavigate,
}: CheckoutButtonProps) {
  const href = getCheckoutUrl('/');

  return (
    <Button
      asChild
      size="lg"
      className={cn('w-full min-h-11', className)}
      disabled={disabled}
      data-analytics="checkout-click"
    >
      <Link
        href={href}
        onClick={() => {
          onNavigate?.();
          emitLegacyAnalyticsEvent('checkout_click', { href });
        }}
      >
        {label}
      </Link>
    </Button>
  );
}
