import Link from 'next/link';
import type { ReactNode } from 'react';

import { Logo } from '@/components/common/logo';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type StatusPageShellProps = {
  children: ReactNode;
  className?: string;
  showHomeLink?: boolean;
};

/**
 * Minimal branded full-page shell for 404 / unavailable states.
 */
export function StatusPageShell({
  children,
  className,
  showHomeLink = true,
}: StatusPageShellProps) {
  return (
    <div className="flex min-h-screen flex-col bg-hero-wash text-foreground">
      <header className="border-b border-[var(--border-subtle)] bg-white/90 backdrop-blur">
        <div className="mx-auto flex h-14 max-w-3xl items-center px-4 sm:px-6">
          <Logo href={showHomeLink ? '/' : null} />
        </div>
      </header>
      <main
        className={cn(
          'mx-auto flex w-full max-w-3xl flex-1 flex-col justify-center px-4 py-16 sm:px-6',
          className,
        )}
      >
        {children}
      </main>
    </div>
  );
}

type StatusPageActionsProps = {
  homeHref?: string;
  homeLabel?: string;
};

export function StatusPageHomeButton({
  homeHref = '/',
  homeLabel = 'Go to homepage',
}: StatusPageActionsProps) {
  return (
    <Button asChild className="mt-8 min-h-11 w-fit">
      <Link href={homeHref}>{homeLabel}</Link>
    </Button>
  );
}
