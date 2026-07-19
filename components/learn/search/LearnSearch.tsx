'use client';

import { Search, X } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

export type LearnSearchProps = {
  id?: string;
  value: string;
  onChange: (value: string) => void;
  onClear?: () => void;
  onSubmit?: () => void;
  className?: string;
  placeholder?: string;
};

/**
 * Learn search field — Document 15.05.
 * Debouncing is owned by the parent; Escape clears when appropriate.
 */
export function LearnSearch({
  id = 'learn-search',
  value,
  onChange,
  onClear,
  onSubmit,
  className,
  placeholder = 'Search articles',
}: LearnSearchProps) {
  return (
    <div className={cn('w-full', className)}>
      <Label htmlFor={id} className="sr-only">
        Search articles
      </Label>
      <div className="relative">
        <Search
          className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-500"
          aria-hidden="true"
        />
        <Input
          id={id}
          type="search"
          value={value}
          placeholder={placeholder}
          autoComplete="off"
          enterKeyHint="search"
          className="min-h-11 pl-10 pr-10"
          onChange={(event) => onChange(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === 'Escape' && value) {
              event.preventDefault();
              onClear?.();
              onChange('');
            }
            if (event.key === 'Enter') {
              event.preventDefault();
              onSubmit?.();
            }
          }}
        />
        {value ? (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="absolute right-1 top-1/2 h-9 w-9 -translate-y-1/2"
            aria-label="Clear search"
            onClick={() => {
              onClear?.();
              onChange('');
            }}
          >
            <X className="h-4 w-4" />
          </Button>
        ) : null}
      </div>
    </div>
  );
}
