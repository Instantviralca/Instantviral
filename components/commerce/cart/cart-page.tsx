'use client';

import { CartList } from '@/components/commerce/cart/cart-list';
import { CartSummary } from '@/components/commerce/cart/cart-summary';
import { CheckoutButton } from '@/components/commerce/cart/checkout-button';
import { EmptyCart } from '@/components/commerce/cart/empty-cart';
import { CheckoutProgress } from '@/components/design-system/checkout-progress';
import { TrustStrip } from '@/components/design-system/trust-strip';
import { Container } from '@/components/layout/container';
import { Section } from '@/components/layout/section';
import { Heading } from '@/components/typography/heading';
import { MutedText } from '@/components/typography/muted-text';
import { useCart } from '@/lib/cart';
import { formatMoney } from '@/lib/pricing/format';

export function CartPage() {
  const cart = useCart();

  if (!cart.isHydrated) {
    return (
      <Section aria-label="Shopping cart" className="bg-hero-wash">
        <Container size="xl">
          <p className="text-sm text-muted-foreground">Loading cart…</p>
        </Container>
      </Section>
    );
  }

  if (cart.items.length === 0) {
    return (
      <Section aria-label="Shopping cart" className="bg-hero-wash">
        <Container size="xl" className="space-y-6">
          <Heading as="h1" size="h1">
            Cart
          </Heading>
          <EmptyCart />
        </Container>
      </Section>
    );
  }

  return (
    <Section aria-label="Shopping cart" data-analytics="cart-page" className="bg-hero-wash pb-28 lg:pb-16">
      <Container size="xl">
        <div className="mb-6 space-y-3">
          <Heading as="h1" size="h1">
            Your cart
          </Heading>
          <MutedText>Review your package details, then continue to secure checkout.</MutedText>
          <CheckoutProgress current="details" className="max-w-2xl" />
        </div>
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_22rem] xl:grid-cols-[minmax(0,1fr)_24rem]">
          <div className="space-y-6">
            <CartList items={cart.items} onRemove={cart.removeItem} />
            <TrustStrip className="rounded-2xl border border-[var(--border-subtle)] bg-white/80 p-4" />
          </div>
          <div className="hidden h-fit lg:sticky lg:top-24 lg:block">
            <CartSummary totals={cart.totals} />
          </div>
        </div>
      </Container>
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-[var(--border-subtle)] bg-white/95 p-4 shadow-[var(--shadow-lg)] backdrop-blur lg:hidden">
        <div className="mx-auto flex max-w-xl items-center justify-between gap-3">
          <div>
            <p className="text-xs text-[var(--text-secondary)]">Total</p>
            <p className="text-lg font-bold text-[var(--brand-primary)]" aria-live="polite">
              {formatMoney(cart.totals.total.amount, cart.totals.total.currency)}
            </p>
          </div>
          <CheckoutButton className="min-h-12 w-auto rounded-xl px-6 font-semibold" />
        </div>
      </div>
    </Section>
  );
}
