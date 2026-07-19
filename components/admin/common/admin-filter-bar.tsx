import type { ReactNode } from 'react';

import { cn } from '@/lib/utils';

type AdminFilterBarProps = {
  children: ReactNode;
  className?: string;
};

export function AdminFilterBar({ children, className }: AdminFilterBarProps) {
  return (
    <div
      className={cn('flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center', className)}
      role="group"
      aria-label="Filters"
    >
      {children}
    </div>
  );
}
