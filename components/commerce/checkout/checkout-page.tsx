'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

import { useAnalyticsOptional } from '@/components/analytics/AnalyticsContext';
import { CheckoutSummary } from '@/components/commerce/checkout/checkout-summary';
import { CouponSection } from '@/components/commerce/checkout/coupon-section';
import { CustomerInformationForm } from '@/components/commerce/checkout/customer-information-form';
import { PaymentMethods } from '@/components/commerce/checkout/payment-methods';
import { PlaceOrderButton } from '@/components/commerce/checkout/place-order-button';
import { RECOVERY_CUSTOMER_STORAGE_KEY } from '@/lib/abandoned-cart/client-constants';
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
import { emitCheckoutStarted } from '@/lib/analytics/checkout-start';
import { useCart } from '@/lib/cart';
import { CART_QUERY_PARAM, locationHasCartTransfer } from '@/lib/cart/cart-hash';
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

function readRecoveredCustomer(): CustomerInformation | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = window.sessionStorage.getItem(RECOVERY_CUSTOMER_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as CustomerInformation;
    window.sessionStorage.removeItem(RECOVERY_CUSTOMER_STORAGE_KEY);
    if (parsed?.email && isValidEmail(parsed.email)) return parsed;
  } catch {
    // ignore
  }
  return null;
}

export function CheckoutPage() {
  const cart = useCart();
  const analytics = useAnalyticsOptional();
  const checkoutViewSent = useRef(false);
  const checkoutStartedSent = useRef(false);
  const emailEnteredSent = useRef(false);
  const searchParams = useSearchParams();
  const paymentCancelled = searchParams.get('cancelled') === '1';
  const cartTransferPending = Boolean(
    searchParams.get(CART_QUERY_PARAM) || searchParams.get('cartHandoff'),
  );
  const cartHref = getSiteUrlPath(routes.cart);
  const [customer, setCustomer] = useState<CustomerInformation>({ email: '' });
  const [paymentMethodId, setPaymentMethodId] = useState<PaymentMethodId | null>(() => {
    const enabled = getEnabledPaymentProviders().filter((p) => p.enabled);
    return enabled.length === 1 ? (enabled[0]!.id as PaymentMethodId) : null;
  });
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [errors, setErrors] = useState<{
    email?: string;
    payment?: string;
    terms?: string;
    form?: string;
  }>({});
  const [submitting, setSubmitting] = useState(false);
  const trackTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastTrackedSignature = useRef<string>('');

  useEffect(() => {
    const recovered = readRecoveredCustomer();
    if (recovered) setCustomer(recovered);
  }, []);

  const trackCheckout = useCallback(
    (nextCustomer: CustomerInformation) => {
      if (!isValidEmail(nextCustomer.email) || cart.items.length === 0 || !cart.isHydrated) {
        return;
      }
      const signature = JSON.stringify({
        email: nextCustomer.email.trim().toLowerCase(),
        firstName: nextCustomer.firstName ?? '',
        lastName: nextCustomer.lastName ?? '',
        items: cart.items.map((item) => ({
          id: item.id,
          packageId: item.packageId,
          configuration: item.configuration,
        })),
        total: cart.totals.total.amount,
        coupon: cart.coupon?.code ?? null,
      });
      if (signature === lastTrackedSignature.current) return;
      lastTrackedSignature.current = signature;

      void fetch('/api/checkout/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customer: nextCustomer,
          items: cart.items,
          coupon: cart.coupon,
          currency: cart.currency,
          totals: cart.totals,
        }),
      }).catch(() => {
        // Tracking must never block checkout.
      });
    },
    [cart.coupon, cart.currency, cart.isHydrated, cart.items, cart.totals],
  );

  const handleCustomerChange = useCallback(
    (next: CustomerInformation) => {
      setCustomer(next);
      if (
        analytics?.ready &&
        !emailEnteredSent.current &&
        isValidEmail(next.email)
      ) {
        emailEnteredSent.current = true;
        analytics.track({
          eventName: 'checkout_email_entered',
          pageType: 'checkout',
          pagePath: '/checkout',
        });
      }
      if (trackTimer.current) clearTimeout(trackTimer.current);
      trackTimer.current = setTimeout(() => trackCheckout(next), 600);
    },
    [analytics, trackCheckout],
  );

  useEffect(() => {
    return () => {
      if (trackTimer.current) clearTimeout(trackTimer.current);
    };
  }, []);

  // Keep tracked cart in sync when items/totals change after email is known.
  useEffect(() => {
    if (!isValidEmail(customer.email)) return;
    if (trackTimer.current) clearTimeout(trackTimer.current);
    trackTimer.current = setTimeout(() => trackCheckout(customer), 800);
  }, [cart.items, cart.totals.total.amount, cart.coupon, customer, trackCheckout]);

  const paymentMethods: PaymentMethodOption[] = useMemo(
    () =>
      getEnabledPaymentProviders().map((provider) => ({
        id: provider.id as PaymentMethodId,
        label: provider.displayName,
        enabled: provider.enabled,
        // No on-page card fields — Continue to Payment redirects to Mollie hosted checkout.
      })),
    [],
  );

  // Sole enabled method — select by default so the user never has to tap it.
  useEffect(() => {
    if (paymentMethodId) return;
    const enabled = paymentMethods.filter((m) => m.enabled);
    if (enabled.length === 1 && enabled[0]) {
      setPaymentMethodId(enabled[0].id);
    }
  }, [paymentMethods, paymentMethodId]);

  // Checkout start = entered /checkout with a non-empty valid cart (not add-to-cart).
  useEffect(() => {
    if (!analytics?.ready) return;
    if (!cart.isHydrated || cart.isBootstrapping || cart.items.length === 0) return;
    if (checkoutViewSent.current) return;
    checkoutViewSent.current = true;
    analytics.track({
      eventName: 'checkout_view',
      pageType: 'checkout',
      pagePath: '/checkout',
    });
    if (!checkoutStartedSent.current) {
      checkoutStartedSent.current = true;
      emitCheckoutStarted(
        {
          isHydrated: cart.isHydrated,
          isBootstrapping: cart.isBootstrapping,
          items: cart.items,
        },
        analytics.track,
      );
    }
  }, [
    analytics,
    cart.isBootstrapping,
    cart.isHydrated,
    cart.items,
  ]);

  // Never flash empty cart while transfer/bootstrap is in progress.
  const waitingForCart =
    !cart.isHydrated ||
    cart.isBootstrapping ||
    (cartTransferPending && cart.items.length === 0) ||
    (locationHasCartTransfer() && cart.items.length === 0);

  if (waitingForCart) {
    return (
      <Section aria-label="Checkout" className="bg-hero-wash">
        <Container size="xl">
          <div
            className="flex min-h-[40vh] flex-col items-center justify-center gap-2"
            role="status"
            aria-live="polite"
          >
            <p className="text-sm font-medium text-muted-foreground">
              Loading checkout…
            </p>
          </div>
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
    analytics?.track({
      eventName: 'place_order_clicked',
      pageType: 'checkout',
      pagePath: '/checkout',
    });
    analytics?.track({
      eventName: 'checkout_submit',
      pageType: 'checkout',
      pagePath: '/checkout',
    });
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
          marketingOptIn: Boolean(customer.marketingOptIn),
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
        analytics?.track({
          eventName: 'payment_failed',
          pageType: 'checkout',
          pagePath: '/checkout',
        });
        return;
      }
      // Hosted Mollie only: require absolute checkout URL, then top-level redirect.
      // Never collect card details on InstantViral; never treat local success as paid.
      if (!data.redirectUrl || !/^https?:\/\//i.test(data.redirectUrl)) {
        setErrors({
          form: 'Unable to start payment. Please try again.',
        });
        setSubmitting(false);
        analytics?.track({
          eventName: 'payment_failed',
          pageType: 'checkout',
          pagePath: '/checkout',
        });
        return;
      }
      analytics?.track({
        eventName: 'payment_started',
        pageType: 'checkout',
        pagePath: '/checkout',
      });
      cart.clearCart();
      window.location.assign(data.redirectUrl);
    } catch {
      setErrors({ form: 'Unable to place order. Please try again.' });
      setSubmitting(false);
      analytics?.track({
        eventName: 'payment_failed',
        pageType: 'checkout',
        pagePath: '/checkout',
      });
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
                onChange={handleCustomerChange}
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
                  label={submitting ? 'Continuing to payment…' : 'Continue to Payment'}
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
            label={submitting ? 'Continuing to payment…' : 'Continue to Payment'}
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
