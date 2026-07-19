'use client';

import { CheckoutButton } from '@/components/commerce/cart/checkout-button';
import { CouponForm } from '@/components/commerce/cart/coupon-form';
import { PaymentConfidence } from '@/components/design-system/payment-confidence';
import { formatMoney } from '@/lib/pricing/format';
import type { CartTotals } from '@/types/cart';
import { cn } from '@/lib/utils';

type CartSummaryProps = {
  totals: CartTotals;
  className?: string;
};

export function CartSummary({ totals, className }: CartSummaryProps) {
  return (
    <aside
      className={cn(
        'space-y-4 rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface-card)] p-6 shadow-[var(--shadow-md)]',
        className,
      )}
      aria-label="Order summary"
    >
      <h2 className="text-lg font-bold tracking-tight">Order summary</h2>
      <dl className="space-y-3 text-sm">
        <div className="flex justify-between text-[var(--text-secondary)]">
          <dt>Subtotal</dt>
          <dd className="font-medium text-[var(--text-primary)]">
            {formatMoney(totals.subtotal.amount, totals.subtotal.currency)}
          </dd>
        </div>
        {totals.discount.amount > 0 ? (
          <div className="flex justify-between text-[var(--color-success)]">
            <dt>Discount</dt>
            <dd className="font-medium">
              -{formatMoney(totals.discount.amount, totals.discount.currency)}
            </dd>
          </div>
        ) : null}
        <div className="flex justify-between border-t border-[var(--border-subtle)] pt-4 text-base">
          <dt className="text-lg font-semibold">Total</dt>
          <dd
            className="text-3xl font-bold tracking-tight text-[var(--brand-primary)]"
            aria-live="polite"
          >
            {formatMoney(totals.total.amount, totals.total.currency)}
          </dd>
        </div>
      </dl>
      <CouponForm />
      <CheckoutButton
        disabled={totals.itemCount === 0}
        className="min-h-12 w-full rounded-xl bg-[var(--brand-primary)] text-base font-semibold hover:bg-[var(--brand-primary-hover)]"
      />
      <PaymentConfidence className="border-t border-[var(--border-subtle)] pt-4" />
    </aside>
  );
}
