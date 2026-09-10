import type { ReactNode } from 'react';

import { SiteLayout } from '@/components/layout/site-layout';

type CommerceLayoutProps = {
  children: ReactNode;
};

/** Commerce routes (cart / checkout / order-success) use the main site chrome. */
export default function CommerceLayout({ children }: CommerceLayoutProps) {
  return <SiteLayout>{children}</SiteLayout>;
}
