import { Check } from 'lucide-react';

import { cn } from '@/lib/utils';
import type { PackageFeaturesProps } from '@/components/commerce/pricing/types';

export function PackageFeatures({ features, className }: PackageFeaturesProps) {
  if (features.length === 0) return null;

  return (
    <ul className={cn('space-y-2 text-sm text-[var(--text-secondary)]', className)}>
      {features.map((feature) => (
        <li key={feature} className="flex items-start gap-2">
          <Check
            className="mt-0.5 size-4 shrink-0 text-[var(--brand-primary)]"
            aria-hidden="true"
          />
          <span>{feature}</span>
        </li>
      ))}
    </ul>
  );
}
