'use client';

import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { routes } from '@/config/routes';
import { cn } from '@/lib/utils';

type EmptyCartProps = {
  className?: string;
};

export function EmptyCart({ className }: EmptyCartProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center gap-4 rounded-lg border border-dashed p-12 text-center',
        className,
      )}
      role="status"
    >
      <p className="text-lg font-medium">Your cart is empty</p>
      <p className="max-w-sm text-sm text-muted-foreground">
        Browse our growth services and add a package when you are ready.
      </p>
      <Button asChild size="lg">
        <Link href={routes.home}>Browse Services</Link>
      </Button>
    </div>
  );
}
