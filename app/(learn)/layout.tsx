import type { ReactNode } from 'react';

import { SiteLayout } from '@/components/layout/site-layout';

type LearnLayoutProps = {
  children: ReactNode;
};

export default function LearnLayout({ children }: LearnLayoutProps) {
  return <SiteLayout>{children}</SiteLayout>;
}
