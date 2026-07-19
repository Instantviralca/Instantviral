import type { ReactNode } from 'react';

import { Footer } from '@/components/navigation/footer';
import { Navbar } from '@/components/navigation/navbar';
import { cn } from '@/lib/utils';

type SiteLayoutProps = {
  children: ReactNode;
  className?: string;
};

export function SiteLayout({ children, className }: SiteLayoutProps) {
  return (
    <div className={cn('flex min-h-screen flex-col bg-background text-foreground', className)}>
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
