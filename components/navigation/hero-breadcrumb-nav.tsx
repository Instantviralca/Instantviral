import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';

import type { BreadcrumbItem } from '@/types';
import { cn } from '@/lib/utils';

type HeroBreadcrumbNavProps = {
  items: BreadcrumbItem[];
  className?: string;
};

/**
 * Server-rendered subtle breadcrumb for service heroes (no client hydration).
 */
export function HeroBreadcrumbNav({ items, className }: HeroBreadcrumbNavProps) {
  if (!items.length) return null;

  return (
    <nav
      aria-label="Breadcrumb"
      className={cn(
        'mb-3 max-w-full overflow-x-auto text-[12px] leading-none text-[var(--text-secondary)] [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden',
        className,
      )}
    >
      <ol className="flex min-w-0 flex-nowrap items-center gap-1.5 whitespace-nowrap sm:flex-wrap sm:whitespace-normal">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          const isHome =
            index === 0 && (item.label.toLowerCase() === 'home' || item.href === '/');
          return (
            <li key={`${item.label}-${index}`} className="flex items-center gap-1.5">
              {index > 0 ? (
                <ChevronRight className="size-3 shrink-0 opacity-50" aria-hidden="true" />
              ) : null}
              {item.href && !isLast ? (
                <Link
                  href={item.href}
                  className="inline-flex min-h-8 items-center gap-1 rounded-sm hover:text-[var(--text-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  {isHome ? (
                    <Home className="size-3.5 shrink-0 opacity-70" aria-hidden="true" />
                  ) : null}
                  <span className={isHome ? 'sr-only sm:not-sr-only' : undefined}>{item.label}</span>
                </Link>
              ) : (
                <span
                  className={cn(
                    'inline-flex min-h-8 items-center',
                    isLast ? 'font-medium text-[var(--text-primary)]' : undefined,
                    !item.label.trim() && 'sr-only',
                  )}
                  aria-current={isLast ? 'page' : undefined}
                >
                  {item.label || 'Untitled'}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
