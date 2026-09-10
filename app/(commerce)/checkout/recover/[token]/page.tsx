import type { Metadata } from 'next';
import { Suspense } from 'react';

import { RecoverCheckoutClient } from '@/components/commerce/checkout/recover-checkout-client';

export const metadata: Metadata = {
  title: 'Complete your order',
  robots: { index: false, follow: false },
};

export default function RecoverCheckoutPage() {
  return (
    <Suspense
      fallback={<p className="p-6 text-sm text-muted-foreground">Restoring your checkout…</p>}
    >
      <RecoverCheckoutClient />
    </Suspense>
  );
}
