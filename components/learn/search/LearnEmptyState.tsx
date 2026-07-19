'use client';

import Link from 'next/link';

import { ClearFiltersButton } from '@/components/learn/search/ClearFiltersButton';
import { Button } from '@/components/ui/button';
import { LEARN_EMPTY_SEARCH_COPY } from '@/config/learn-search';
import { routes } from '@/config/routes';
import { cn } from '@/lib/utils';

export type LearnEmptyStateProps = {
  onClearSearch?: () => void;
  onClearFilters?: () => void;
  hasQuery?: boolean;
  hasFilters?: boolean;
  className?: string;
};

/**
 * Empty search/filter state — Document 15.05 approved copy.
 */
export function LearnEmptyState({
  onClearSearch,
  onClearFilters,
  hasQuery,
  hasFilters,
  className,
}: LearnEmptyStateProps) {
  return (
    <div
      className={cn(
        'border border-dashed border-neutral-300 p-6 sm:p-8',
        className,
      )}
      data-learn-empty="true"
    >
      <h2 className="text-xl font-semibold text-neutral-900">
        {LEARN_EMPTY_SEARCH_COPY.heading}
      </h2>
      <p className="mt-2 max-w-2xl text-sm leading-relaxed text-neutral-600">
        {LEARN_EMPTY_SEARCH_COPY.body}
      </p>
      <div className="mt-6 flex flex-wrap gap-3">
        {hasQuery ? (
          <Button type="button" variant="outline" className="min-h-11" onClick={onClearSearch}>
            Clear Search
          </Button>
        ) : null}
        {hasFilters ? (
          <ClearFiltersButton onClick={() => onClearFilters?.()} />
        ) : null}
        <Button asChild variant="secondary" className="min-h-11">
          <Link href={routes.learn}>Browse Categories</Link>
        </Button>
      </div>
    </div>
  );
}
