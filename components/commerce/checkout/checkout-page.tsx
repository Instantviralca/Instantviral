'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';

import { CheckoutSummary } from '@/components/commerce/checkout/checkout-summary';
import { CouponSection } from '@/components/commerce/checkout/coupon-section';
import { CustomerInformationForm } from '@/components/commerce/checkout/customer-information-form';
import { PaymentMethods } from '@/components/commerce/checkout/payment-methods';
import { PlaceOrderButton } from '@/components/commerce/checkout/place-order-button';
import { TermsAgreement } from '@/components/commerce/checkout/terms-agreement';
import { CheckoutProgress } from '@/components/design-system/checkout-progress';
import { PaymentConfidence } from '@/components/design-system/payment-confidence';
import { TrustStrip } from '@/components/design-system/trust-strip';
import { Container } from '@/components/layout/container';
import { Section } from '@/components/layout/section';
import { Heading } from '@/components/typography/heading';
import { MutedText } from '@/components/typography/muted-text';
import { Button } from '@/components/ui/button';
import { getEnabledPaymentProviders } from '@/config/payments';
import { routes } from '@/config/routes';
import { useCart } from '@/lib/cart';
import { getSiteUrlPath } from '@/lib/config/hosts';
import { formatMoney } from '@/lib/pricing/format';
import type {
  CustomerInformation,
  PaymentMethodId,
  PaymentMethodOption,
} from '@/types/checkout';

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function CheckoutPage() {
  const cart = useCart();
  const router = useRouter();
  const searchParams = useSearchParams();
  const paymentCancelled = searchParams.get('cancelled') === '1';
  const cartHref = getSiteUrlPath(routes.cart);
  const [customer, setCustomer] = useState<CustomerInformation>({ email: '' });
  const [paymentMethodId, setPaymentMethodId] = useState<PaymentMethodId | null>(null);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [errors, setErrors] = useState<{
    email?: string;
    payment?: string;
    terms?: string;
    form?: string;
  }>({});
  const [submitting, setSubmitting] = useState(false);

  const paymentMethods: PaymentMethodOption[] = useMemo(
    () =>
      getEnabledPaymentProviders().map((provider) => ({
        id: provider.id as PaymentMethodId,
        label: provider.displayName,
        enabled: provider.enabled,
        description: 'Secure card payment via our payment page.',
      })),
    [],
  );

  if (!cart.isHydrated) {
    return (
      <Section aria-label="Checkout" className="bg-hero-wash">
        <Container size="xl">
          <p className="text-sm text-muted-foreground">Loading checkout…</p>
        </Container>
      </Section>
    );
  }

  if (cart.items.length === 0) {
    return (
      <Section aria-label="Checkout" className="bg-hero-wash">
        <Container size="xl" className="space-y-4">
          <Heading as="h1" size="h1">
            Checkout
          </Heading>
          <MutedText>Your cart is empty.</MutedText>
          <Button asChild>
            <Link href={cartHref}>Return to cart</Link>
          </Button>
        </Container>
      </Section>
    );
  }

  const handlePlaceOrder = async () => {
    const nextErrors: typeof errors = {};
    if (!isValidEmail(customer.email)) {
      nextErrors.email = 'Enter a valid email address.';
    }
    if (!paymentMethodId) {
      nextErrors.payment = 'Select a payment method.';
    }
    if (!termsAccepted) {
      nextErrors.terms = 'Please accept the terms to continue.';
    }

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    setErrors({});
    setSubmitting(true);
    try {
      const response = await fetch('/api/checkout/place-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customer,
          paymentMethodId,
          items: cart.items,
          totals: cart.totals,
          coupon: cart.coupon,
          termsAccepted,
        }),
      });
      const data = (await response.json()) as {
        ok?: boolean;
        orderId?: string;
        email?: string;
        error?: string;
        redirectUrl?: string;
      };
      if (!response.ok || !data.ok || !data.orderId) {
        setErrors({ form: data.error ?? 'Unable to place order.' });
        setSubmitting(false);
        return;
      }
      cart.clearCart();
      if (data.redirectUrl) {
        window.location.assign(data.redirectUrl);
        return;
      }
      const qs = new URLSearchParams({
        orderId: data.orderId,
        email: data.email ?? customer.email,
      });
      router.push(`${routes.orderSuccess}?${qs.toString()}`);
    } catch {
      setErrors({ form: 'Unable to place order. Please try again.' });
      setSubmitting(false);
    }
  };

  return (
    <Section
      aria-label="Checkout"
      data-analytics="checkout-page"
      className="bg-hero-wash pb-28 lg:pb-16"
    >
      <Container size="xl">
        <div className="mb-6 space-y-3">
          <Heading as="h1" size="h1">
            Checkout
          </Heading>
          <MutedText>Confirm your details and complete payment securely.</MutedText>
          {paymentCancelled ? (
            <p
              className="rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-900"
              role="status"
            >
              Payment was cancelled. Your cart is still available — you can try checkout again when
              ready.
            </p>
          ) : null}
          <CheckoutProgress current="payment" className="max-w-2xl" />
        </div>
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_22rem] xl:grid-cols-[minmax(0,1fr)_24rem]">
          <div className="space-y-5">
            <div className="rounded-2xl border border-[var(--border-subtle)] bg-white p-5 shadow-[var(--shadow-sm)] sm:p-6">
              <h2 className="mb-4 text-base font-bold">Customer information</h2>
              <CustomerInformationForm
                value={customer}
                errors={{ email: errors.email }}
                onChange={setCustomer}
                hideLegend
              />
            </div>
            <div className="rounded-2xl border border-[var(--border-subtle)] bg-white p-5 shadow-[var(--shadow-sm)] sm:p-6">
              <h2 className="mb-4 text-base font-bold">Payment method</h2>
              <PaymentMethods
                methods={paymentMethods}
                value={paymentMethodId}
                onChange={setPaymentMethodId}
                error={errors.payment}
                hideLegend
              />
            </div>
            <div className="rounded-2xl border border-[var(--border-subtle)] bg-white p-6 shadow-[var(--shadow-sm)]">
              <CouponSection />
              <div className="mt-6">
                <TermsAgreement
                  checked={termsAccepted}
                  onCheckedChange={setTermsAccepted}
                  error={errors.terms}
                />
              </div>
              {errors.form ? (
                <p className="mt-4 text-sm text-destructive" role="alert">
                  {errors.form}
                </p>
              ) : null}
              <div className="mt-6 hidden lg:block">
                <PlaceOrderButton
                  onClick={handlePlaceOrder}
                  disabled={submitting}
                  label={submitting ? 'Placing order…' : 'Place Order'}
                  className="min-h-12 w-full rounded-xl bg-[var(--brand-primary)] text-base font-semibold hover:bg-[var(--brand-primary-hover)]"
                />
                <PaymentConfidence className="mt-4" />
              </div>
            </div>
            <TrustStrip className="rounded-2xl border border-[var(--border-subtle)] bg-white/80 p-4" />
          </div>
          <div className="hidden h-fit lg:sticky lg:top-24 lg:block">
            <CheckoutSummary items={cart.items} totals={cart.totals} />
          </div>
        </div>
      </Container>
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-[var(--border-subtle)] bg-white/95 p-4 shadow-[var(--shadow-lg)] backdrop-blur lg:hidden">
        <div className="mx-auto flex max-w-xl flex-col gap-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-[var(--text-secondary)]">Total</span>
            <span className="text-lg font-bold text-[var(--brand-primary)]">
              {formatMoney(cart.totals.total.amount, cart.totals.total.currency)}
            </span>
          </div>
          <PlaceOrderButton
            onClick={handlePlaceOrder}
            disabled={submitting}
            label={submitting ? 'Placing order…' : 'Place Order'}
            className="min-h-12 w-full rounded-xl bg-[var(--brand-primary)] font-semibold hover:bg-[var(--brand-primary-hover)]"
          />
          <p className="text-center text-[11px] text-[var(--text-secondary)]">
            Secure checkout · 30-Day Money-Back Guarantee
          </p>
        </div>
      </div>
    </Section>
  );
}
