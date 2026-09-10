'use client';

import { CreditCard } from 'lucide-react';

import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import type { PaymentMethodId, PaymentMethodOption } from '@/types/checkout';
import { cn } from '@/lib/utils';

type PaymentMethodsProps = {
  methods: PaymentMethodOption[];
  value: PaymentMethodId | null;
  onChange: (id: PaymentMethodId) => void;
  error?: string;
  className?: string;
  /** Hide legend when parent already renders a heading. */
  hideLegend?: boolean;
};

const MOLLIE_HOSTED_PAYMENT_EXPLANATION =
  "You'll be redirected to Mollie's secure payment page to complete your payment. Card payments, Apple Pay and Google Pay are available where supported.";

/**
 * Payment method picker — method selection only.
 * Card / wallet details are entered on Mollie's hosted checkout after redirect.
 * No card inputs, brand chips, iframes, or Mollie Components are mounted here.
 */
export function PaymentMethods({
  methods,
  value,
  onChange,
  error,
  className,
  hideLegend = false,
}: PaymentMethodsProps) {
  const enabled = methods.filter((m) => m.enabled);

  return (
    <fieldset className={cn('space-y-4', className)}>
      {hideLegend ? <legend className="sr-only">Payment method</legend> : (
        <legend className="text-base font-bold">Payment method</legend>
      )}
      <RadioGroup
        value={value ?? undefined}
        onValueChange={(next) => onChange(next as PaymentMethodId)}
        aria-invalid={Boolean(error)}
        className="space-y-3"
      >
        {enabled.map((method) => {
          const selected = value === method.id;
          const showMollieExplanation =
            method.id === 'mollie-remote' || method.id === 'remote-payment';
          return (
            <div
              key={method.id}
              className={cn(
                'flex items-start gap-3 rounded-xl border p-4 transition-colors',
                selected
                  ? 'border-[var(--brand-primary)] bg-[var(--brand-accent-soft)]/50 shadow-[var(--shadow-xs)]'
                  : 'border-[var(--border-subtle)] bg-white hover:border-[var(--brand-primary)]/35',
              )}
            >
              <RadioGroupItem value={method.id} id={`pay-${method.id}`} className="mt-0.5" />
              <div className="min-w-0 flex-1">
                <Label htmlFor={`pay-${method.id}`} className="flex items-center gap-2 font-semibold">
                  <CreditCard className="size-4 text-[var(--brand-primary)]" aria-hidden="true" />
                  {method.label}
                </Label>
                {method.description ? (
                  <p className="mt-1 text-xs text-muted-foreground">{method.description}</p>
                ) : null}
                {showMollieExplanation ? (
                  <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                    {MOLLIE_HOSTED_PAYMENT_EXPLANATION}
                  </p>
                ) : null}
              </div>
            </div>
          );
        })}
      </RadioGroup>
      {error ? (
        <p className="text-xs text-destructive" role="alert">
          {error}
        </p>
      ) : null}
    </fieldset>
  );
}
