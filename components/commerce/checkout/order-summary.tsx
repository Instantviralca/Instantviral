'use client';

import { Lock, ShieldCheck } from 'lucide-react';

import { formatMoney } from '@/lib/pricing/format';
import type { CartItem, CartTotals } from '@/types/cart';
import { cn } from '@/lib/utils';

type CheckoutOrderSummaryProps = {
  items: CartItem[];
  totals: CartTotals;
  className?: string;
};

export function CheckoutOrderSummary({
  items,
  totals,
  className,
}: CheckoutOrderSummaryProps) {
  return (
    <aside
      className={cn(
        'space-y-5 rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface-card)] p-6 shadow-[var(--shadow-md)]',
        className,
      )}
      aria-label="Checkout order summary"
    >
      <h2 className="text-lg font-bold tracking-tight">Order summary</h2>
      <ul className="space-y-3 text-sm">
        {items.map((item) => (
          <li
            key={item.id}
            className="rounded-xl border border-[var(--border-subtle)] bg-[var(--surface-muted)] p-3"
          >
            <p className="text-xs font-semibold tracking-wide text-[var(--brand-primary)] uppercase">
              {item.serviceName}
            </p>
            <p className="mt-1 text-lg font-bold">{item.quantityLabel}</p>
            <p className="text-[var(--text-secondary)]">{item.packageTitle}</p>
            {item.deliveryTime ? (
              <p className="mt-1 text-xs text-[var(--text-secondary)]">
                Delivery: {item.deliveryTime}
              </p>
            ) : null}
            <p className="mt-2 font-semibold text-[var(--brand-primary)]">
              {formatMoney(item.unitPrice, item.currency)}
            </p>
          </li>
        ))}
      </ul>
      <dl className="space-y-2 text-sm">
        <div className="flex justify-between text-[var(--text-secondary)]">
          <dt>Subtotal</dt>
          <dd>{formatMoney(totals.subtotal.amount, totals.subtotal.currency)}</dd>
        </div>
        {totals.discount.amount > 0 ? (
          <div className="flex justify-between text-[var(--color-success)]">
            <dt>Discount</dt>
            <dd>-{formatMoney(totals.discount.amount, totals.discount.currency)}</dd>
          </div>
        ) : null}
        <div className="flex justify-between border-t border-[var(--border-subtle)] pt-4">
          <dt className="text-lg font-semibold">Total</dt>
          <dd className="text-3xl font-bold tracking-tight text-[var(--brand-primary)]" aria-live="polite">
            {formatMoney(totals.total.amount, totals.total.currency)}
          </dd>
        </div>
      </dl>
      <div className="space-y-2 border-t border-[var(--border-subtle)] pt-4 text-xs font-medium text-[var(--text-secondary)]">
        <p className="inline-flex items-center gap-2">
          <ShieldCheck className="size-4 text-[var(--brand-primary)]" aria-hidden="true" />
          Secure checkout
        </p>
        <p className="inline-flex items-center gap-2">
          <Lock className="size-4 text-[var(--brand-primary)]" aria-hidden="true" />
          No password required · public profile only
        </p>
      </div>
    </aside>
  );
}
