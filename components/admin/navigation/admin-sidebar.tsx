'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { getAdminNavItems } from '@/config/admin-nav';
import { cn } from '@/lib/utils';

type AdminSidebarProps = {
  onNavigate?: () => void;
  className?: string;
};

export function AdminSidebar({ onNavigate, className }: AdminSidebarProps) {
  const pathname = usePathname();
  const items = getAdminNavItems();

  return (
    <nav className={cn('flex flex-col gap-1 p-3', className)} aria-label="Admin">
      {items.map((item) => {
        const active =
          item.href === '/admin'
            ? pathname === '/admin' || pathname === '/admin/dashboard'
            : pathname.startsWith(item.href);

        return (
          <Link
            key={item.id}
            href={item.href}
            onClick={onNavigate}
            className={cn(
              'rounded-md px-3 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
              active
                ? 'bg-primary text-primary-foreground'
                : 'text-muted-foreground hover:bg-muted hover:text-foreground',
            )}
            aria-current={active ? 'page' : undefined}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
