'use client';

import Link from 'next/link';
import { useState, type ReactNode } from 'react';

import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { site } from '@/config/site';
import {
  getMainNavigation,
  getMegaMenuServices,
  isMegaMenuItem,
  primaryCta,
} from '@/data/navigation';

type MobileDrawerProps = {
  trigger: ReactNode;
};

export function MobileDrawer({ trigger }: MobileDrawerProps) {
  const [open, setOpen] = useState(false);
  const items = getMainNavigation();

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>{trigger}</SheetTrigger>
      <SheetContent side="right" className="w-full max-w-sm overflow-y-auto">
        <SheetHeader>
          <SheetTitle>{site.name}</SheetTitle>
        </SheetHeader>

        <nav aria-label="Mobile" className="mt-6 space-y-4">
          {items.map((item) => {
            if (!isMegaMenuItem(item)) {
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  className="block text-sm text-foreground"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              );
            }

            const services = getMegaMenuServices(item.platformId);

            return (
              <div key={item.id} className="space-y-2">
                <Link
                  href={item.href}
                  className="block text-sm font-medium text-foreground"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
                <ul className="space-y-2 border-l border-border pl-3">
                  {services.map((service) => (
                    <li key={service.id}>
                      <Link
                        href={service.url}
                        className="block text-sm text-muted-foreground"
                        onClick={() => setOpen(false)}
                      >
                        {service.navigationLabel}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}

          <Button asChild className="w-full">
            <Link href={primaryCta.href} onClick={() => setOpen(false)}>
              {primaryCta.label}
            </Link>
          </Button>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
