'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams, useSearchParams } from 'next/navigation';

import { Container } from '@/components/layout/container';
import { Section } from '@/components/layout/section';
import { Heading } from '@/components/typography/heading';
import { MutedText } from '@/components/typography/muted-text';
import { Button } from '@/components/ui/button';
import { routes } from '@/config/routes';
import { RECOVERY_CUSTOMER_STORAGE_KEY } from '@/lib/abandoned-cart/client-constants';
import { writeCartCookie } from '@/lib/cart/cookie-store';
import { CART_STORAGE_KEY, serializeCart } from '@/lib/cart/utils';
import type { AbandonedCartCheckoutSnapshot } from '@/lib/abandoned-cart/types';
import type { CartState } from '@/types/cart';

type RestoreResponse =
  | {
      ok: true;
      snapshot: AbandonedCartCheckoutSnapshot;
      checkoutSessionId: string;
    }
  | {
      ok: false;
      error?: string;
      message?: string;
    };

export function RecoverCheckoutClient() {
  const params = useParams<{ token: string }>();
  const searchParams = useSearchParams();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const token = params.token;
      if (!token) {
        setError('Invalid recovery link.');
        setLoading(false);
        return;
      }

      try {
        const step = searchParams.get('step');
        const qs = step ? `?step=${encodeURIComponent(step)}` : '';
        const response = await fetch(`/api/checkout/recover/${encodeURIComponent(token)}${qs}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
        });
        const data = (await response.json()) as RestoreResponse;
        if (!response.ok || !data.ok) {
          if (!cancelled) {
            setError(
              (!data.ok && 'message' in data && data.message) ||
                'This recovery link is invalid or expired.',
            );
            setLoading(false);
          }
          return;
        }

        const nextCart: CartState = {
          items: data.snapshot.items,
          coupon: data.snapshot.coupon,
          currency: data.snapshot.currency,
          updatedAt: new Date().toISOString(),
        };
        writeCartCookie(nextCart);
        window.sessionStorage.setItem(CART_STORAGE_KEY, serializeCart(nextCart));
        window.sessionStorage.setItem(
          RECOVERY_CUSTOMER_STORAGE_KEY,
          JSON.stringify(data.snapshot.customer),
        );

        if (!cancelled) {
          window.location.assign(routes.checkout);
        }
      } catch {
        if (!cancelled) {
          setError('Unable to restore checkout. Please try again.');
          setLoading(false);
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [params.token, searchParams]);

  if (loading && !error) {
    return (
      <Section aria-label="Recover checkout" className="bg-hero-wash">
        <Container size="xl">
          <div className="flex min-h-[40vh] items-center justify-center">
            <p className="text-sm text-muted-foreground" role="status">
              Restoring your checkout…
            </p>
          </div>
        </Container>
      </Section>
    );
  }

  return (
    <Section aria-label="Recover checkout" className="bg-hero-wash">
      <Container size="xl" className="space-y-4 py-12">
        <Heading as="h1" size="h1">
          Unable to restore checkout
        </Heading>
        <MutedText>{error}</MutedText>
        <Button asChild>
          <Link href={routes.services}>Browse services</Link>
        </Button>
      </Container>
    </Section>
  );
}
