'use client';

import Link from 'next/link';
import { Menu } from 'lucide-react';

import { Logo } from '@/components/common/logo';
import { CartNavButton } from '@/components/navigation/cart-nav-button';
import { MegaMenu } from '@/components/navigation/mega-menu';
import { MobileDrawer } from '@/components/navigation/mobile-drawer';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/layout/container';
import { site } from '@/config/site';
import {
  getMainNavigation,
  isMegaMenuItem,
  primaryCta,
} from '@/data/navigation';
import { cn } from '@/lib/utils';

export function Navbar({ className }: { className?: string }) {
  const items = getMainNavigation();

  return (
    <header
      className={cn(
        'sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur-sm',
        className,
      )}
    >
      <Container className="flex h-14 items-center justify-between gap-4">
        <Logo />

        <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
          {items.map((item) => {
            if (isMegaMenuItem(item)) {
              return <MegaMenu key={item.id} item={item} />;
            }

            return (
              <Link
                key={item.id}
                href={item.href}
                className="rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {item.label}
              </Link>
            );
          })}

          <CartNavButton className="ml-1" />
          <Button asChild size="sm" className="ml-1">
            <Link href={primaryCta.href}>{primaryCta.label}</Link>
          </Button>
        </nav>

        <div className="flex items-center gap-1 lg:hidden">
          <CartNavButton />
          <Button asChild size="sm" variant="outline">
            <Link href={primaryCta.href}>{primaryCta.label}</Link>
          </Button>
          <MobileDrawer
            trigger={
              <Button variant="ghost" size="icon" aria-label={`Open ${site.name} menu`}>
                <Menu />
              </Button>
            }
          />
        </div>
      </Container>
    </header>
  );
}
