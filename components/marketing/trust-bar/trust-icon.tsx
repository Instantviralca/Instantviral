import { BadgeCheck, Headphones, Layers3, ShieldCheck, type LucideIcon } from 'lucide-react';

import { cn } from '@/lib/utils';
import type { TrustIconProps } from '@/components/marketing/trust-bar/types';

const ICONS: Record<string, LucideIcon> = {
  ShieldCheck,
  BadgeCheck,
  Headphones,
  Layers3,
};

/** Decorative Lucide icon — title/description convey meaning for a11y. */
export function TrustIcon({ iconKey, className }: TrustIconProps) {
  const Icon = ICONS[iconKey] ?? ShieldCheck;

  return (
    <span
      className={cn(
        'inline-flex size-10 items-center justify-center rounded-md bg-background text-foreground',
        className,
      )}
      aria-hidden="true"
    >
      <Icon className="size-5" />
    </span>
  );
}
