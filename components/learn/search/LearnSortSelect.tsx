'use client';

import { LEARN_SORT_OPTIONS } from '@/config/learn-search';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import type { LearnSortOption } from '@/types/learn-search';

export type LearnSortSelectProps = {
  value: LearnSortOption;
  onChange: (value: LearnSortOption) => void;
  id?: string;
  className?: string;
  hasQuery?: boolean;
};

/**
 * Sort control — Document 15.05.
 * Popular is intentionally omitted until a real popularity metric exists.
 */
export function LearnSortSelect({
  value,
  onChange,
  id = 'learn-sort',
  className,
  hasQuery = false,
}: LearnSortSelectProps) {
  return (
    <div className={cn('flex min-w-[12rem] flex-col gap-2 sm:flex-row sm:items-center', className)}>
      <Label htmlFor={id} className="shrink-0 text-sm text-neutral-600">
        Sort by
      </Label>
      <select
        id={id}
        value={value}
        aria-label="Sort articles"
        className="min-h-11 w-full rounded-md border border-neutral-200 bg-white px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2"
        onChange={(event) => onChange(event.target.value as LearnSortOption)}
      >
        {LEARN_SORT_OPTIONS.map((option) => (
          <option
            key={option.value}
            value={option.value}
            disabled={option.value === 'relevance' && !hasQuery}
          >
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
