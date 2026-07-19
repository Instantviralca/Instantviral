'use client';

import { X } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { ActiveFilterChip } from '@/types/learn-search';

export type ActiveFilterChipsProps = {
  chips: ActiveFilterChip[];
  onRemove: (chip: ActiveFilterChip) => void;
  className?: string;
};

/**
 * Active filter chips — Document 15.05.
 */
export function ActiveFilterChips({
  chips,
  onRemove,
  className,
}: ActiveFilterChipsProps) {
  if (chips.length === 0) return null;

  return (
    <ul className={cn('flex flex-wrap gap-2', className)} aria-label="Active filters">
      {chips.map((chip) => (
        <li key={chip.id}>
          <span className="inline-flex min-h-11 items-center gap-1 border border-neutral-200 bg-white pl-3 text-sm text-neutral-800">
            <span className="text-neutral-500">{chip.label}:</span>
            <span>{chip.value}</span>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="h-9 w-9"
              aria-label={chip.removeLabel}
              onClick={() => onRemove(chip)}
            >
              <X className="h-3.5 w-3.5" aria-hidden="true" />
            </Button>
          </span>
        </li>
      ))}
    </ul>
  );
}
