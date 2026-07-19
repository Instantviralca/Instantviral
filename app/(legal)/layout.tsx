import type { ReactNode } from 'react';

import { SiteLayout } from '@/components/layout/site-layout';

type LegalLayoutProps = {
  children: ReactNode;
};

export default function LegalLayout({ children }: LegalLayoutProps) {
  return <SiteLayout>{children}</SiteLayout>;
}
