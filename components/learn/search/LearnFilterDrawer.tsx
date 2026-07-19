'use client';

import { useRef, useState } from 'react';
import { SlidersHorizontal } from 'lucide-react';

import { LearnFilters } from '@/components/learn/search/LearnFilters';
import { ClearFiltersButton } from '@/components/learn/search/ClearFiltersButton';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import type { PublicLearnCategory, PublicLearnTag } from '@/types/learn';
import type { LearnSearchState } from '@/types/learn-search';

export type LearnFilterDrawerProps = {
  state: LearnSearchState;
  draft: LearnSearchState;
  onDraftChange: (next: Partial<LearnSearchState>) => void;
  onApply: () => void;
  onClear: () => void;
  onOpenChange?: (open: boolean) => void;
  categories: PublicLearnCategory[];
  tags: PublicLearnTag[];
  lockedCategory?: string;
  resultCount: number;
};

/**
 * Mobile filter drawer — Document 15.05.
 * Sheet traps focus, locks scroll, and returns focus to the trigger.
 */
export function LearnFilterDrawer({
  state,
  draft,
  onDraftChange,
  onApply,
  onClear,
  onOpenChange,
  categories,
  tags,
  lockedCategory,
  resultCount,
}: LearnFilterDrawerProps) {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);

  return (
    <Sheet
      open={open}
      onOpenChange={(next) => {
        setOpen(next);
        onOpenChange?.(next);
        if (!next) {
          // Radix returns focus to trigger; keep an explicit fallback.
          queueMicrotask(() => triggerRef.current?.focus());
        }
      }}
    >
      <SheetTrigger asChild>
        <Button
          ref={triggerRef}
          type="button"
          variant="outline"
          className="min-h-11 gap-2 lg:hidden"
          aria-label="Open filters"
        >
          <SlidersHorizontal className="h-4 w-4" aria-hidden="true" />
          Filters
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="flex w-full flex-col sm:max-w-md">
        <SheetHeader>
          <SheetTitle>Filters</SheetTitle>
          <SheetDescription>
            Narrow Learn articles. {resultCount}{' '}
            {resultCount === 1 ? 'result' : 'results'} with current filters.
          </SheetDescription>
        </SheetHeader>
        <div className="flex-1 overflow-y-auto py-4">
          <LearnFilters
            state={draft}
            categories={categories}
            tags={tags}
            onChange={onDraftChange}
            lockedCategory={lockedCategory}
            idPrefix="learn-drawer-filter"
          />
        </div>
        <SheetFooter className="gap-2 sm:flex-col">
          <Button
            type="button"
            className="min-h-11 w-full"
            onClick={() => {
              onApply();
              setOpen(false);
            }}
          >
            Apply Filters
          </Button>
          <ClearFiltersButton
            onClick={() => {
              onClear();
            }}
            className="min-h-11 w-full"
            disabled={
              !state.q &&
              !state.tag &&
              !state.platform &&
              !state.readingTime &&
              !state.featured &&
              (!state.category || Boolean(lockedCategory))
            }
          />
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
