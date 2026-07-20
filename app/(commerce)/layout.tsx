import type { ReactNode } from 'react';
import { headers } from 'next/headers';

import { CheckoutShell } from '@/components/commerce/checkout/checkout-shell';
import { SiteLayout } from '@/components/layout/site-layout';
import { isCheckoutHostname } from '@/lib/config/hosts';

type CommerceLayoutProps = {
  children: ReactNode;
};

export default async function CommerceLayout({ children }: CommerceLayoutProps) {
  const headerList = await headers();
  const isCheckoutHost =
    headerList.get('x-iv-checkout-host') === '1' ||
    isCheckoutHostname(headerList.get('host'));

  if (isCheckoutHost) {
    return <CheckoutShell>{children}</CheckoutShell>;
  }

  return <SiteLayout>{children}</SiteLayout>;
}
