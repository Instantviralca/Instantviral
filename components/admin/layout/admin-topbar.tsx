'use client';

import { Menu } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type AdminTopbarProps = {
  title?: string;
  onOpenNav?: () => void;
  onLogout?: () => void;
  className?: string;
};

export function AdminTopbar({
  title = 'Admin',
  onOpenNav,
  onLogout,
  className,
}: AdminTopbarProps) {
  return (
    <header
      className={cn(
        'sticky top-0 z-30 flex h-14 items-center gap-3 border-b bg-background/95 px-4 backdrop-blur',
        className,
      )}
    >
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="lg:hidden"
        onClick={onOpenNav}
        aria-label="Open navigation"
      >
        <Menu className="h-5 w-5" />
      </Button>
      <p className="text-sm font-semibold">{title}</p>
      <div className="ml-auto flex items-center gap-3">
        <span className="text-xs text-muted-foreground">v1 · Manual fulfillment</span>
        {onLogout ? (
          <Button type="button" variant="outline" size="sm" onClick={onLogout}>
            Sign out
          </Button>
        ) : null}
      </div>
    </header>
  );
}
