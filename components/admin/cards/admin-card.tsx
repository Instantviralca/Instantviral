import type { ReactNode } from 'react';

import { cn } from '@/lib/utils';

type AdminCardProps = {
  children: ReactNode;
  className?: string;
  title?: string;
  description?: string;
};

export function AdminCard({ children, className, title, description }: AdminCardProps) {
  return (
    <section className={cn('rounded-lg border bg-background p-4 md:p-6', className)}>
      {(title || description) && (
        <header className="mb-4 space-y-1">
          {title ? <h2 className="text-base font-semibold">{title}</h2> : null}
          {description ? (
            <p className="text-sm text-muted-foreground">{description}</p>
          ) : null}
        </header>
      )}
      {children}
    </section>
  );
}
