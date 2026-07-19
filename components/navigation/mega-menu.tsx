'use client';

import Link from 'next/link';
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

import { getMegaMenuServices } from '@/data/navigation';
import type { NavMegaMenuItem } from '@/types';
import { cn } from '@/lib/utils';

type MegaMenuProps = {
  item: NavMegaMenuItem;
  className?: string;
};

export function MegaMenu({ item, className }: MegaMenuProps) {
  const [open, setOpen] = useState(false);
  const services = getMegaMenuServices(item.platformId);

  return (
    <div
      className={cn('relative', className)}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <Link
        href={item.href}
        className="inline-flex items-center gap-1 rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        aria-expanded={open}
        aria-haspopup="true"
      >
        {item.label}
        <ChevronDown className="h-3.5 w-3.5 opacity-60" aria-hidden="true" />
      </Link>

      {open ? (
        <div className="absolute left-0 top-full z-20 min-w-56 rounded-lg border border-border bg-popover p-3 shadow-md">
          <ul className="space-y-1">
            {services.map((service) => (
              <li key={service.id}>
                <Link
                  href={service.url}
                  className="block rounded-md px-2 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                >
                  {service.navigationLabel}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}
