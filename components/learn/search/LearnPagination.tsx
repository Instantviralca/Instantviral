'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export type LearnPaginationProps = {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
};

/**
 * Accessible pagination — Document 15.05.
 * Preserves search params via parent state updates (no inaccessible infinite scroll).
 */
export function LearnPagination({
  page,
  totalPages,
  onPageChange,
  className,
}: LearnPaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <nav
      className={cn('flex flex-wrap items-center justify-between gap-3', className)}
      aria-label="Article pagination"
    >
      <Button
        type="button"
        variant="outline"
        className="min-h-11"
        disabled={page <= 1}
        aria-label="Previous page"
        onClick={() => onPageChange(page - 1)}
      >
        Previous
      </Button>
      <p className="text-sm text-neutral-600" aria-live="polite">
        Page {page} of {totalPages}
      </p>
      <Button
        type="button"
        variant="outline"
        className="min-h-11"
        disabled={page >= totalPages}
        aria-label="Next page"
        onClick={() => onPageChange(page + 1)}
      >
        Next
      </Button>
    </nav>
  );
}
