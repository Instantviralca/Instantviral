'use client';

import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { PricingCTAProps } from '@/components/commerce/pricing/types';

export function PricingCTA({
  cta,
  packageId,
  emphasized,
  className,
  onSelect,
}: PricingCTAProps) {
  if (onSelect) {
    return (
      <Button
        type="button"
        size="lg"
        className={cn('w-full min-h-11', className)}
        variant={emphasized ? 'default' : 'default'}
        data-analytics="package-cta"
        data-package-id={packageId}
        aria-label={`${cta.label} for package ${packageId}`}
        onClick={() => onSelect(packageId)}
      >
        {cta.label}
      </Button>
    );
  }

  return (
    <Button asChild size="lg" className={cn('w-full min-h-11', className)}>
      <Link
        href={cta.href}
        data-analytics="package-cta"
        data-package-id={packageId}
        aria-label={`${cta.label} for package ${packageId}`}
      >
        {cta.label}
      </Link>
    </Button>
  );
}
