import type { Metadata } from 'next';
import { Suspense } from 'react';

import { CheckoutPage } from '@/components/commerce/checkout';
import { checkoutMetadata } from '@/seo/metadata';

export const metadata: Metadata = checkoutMetadata();

export default function CheckoutRoutePage() {
  return (
    <Suspense fallback={<p className="p-6 text-sm text-muted-foreground">Loading checkout…</p>}>
      <CheckoutPage />
    </Suspense>
  );
}
