import type { ReactNode } from 'react';

import { SiteLayout } from '@/components/layout/site-layout';

type MarketingLayoutProps = {
  children: ReactNode;
};

export default function MarketingLayout({ children }: MarketingLayoutProps) {
  return <SiteLayout>{children}</SiteLayout>;
}
