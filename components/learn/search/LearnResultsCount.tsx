'use client';

export type LearnResultsCountProps = {
  count: number;
  id?: string;
};

/**
 * Live region for result counts — Document 15.05.
 */
export function LearnResultsCount({
  count,
  id = 'learn-results-count',
}: LearnResultsCountProps) {
  return (
    <p id={id} className="text-sm text-neutral-600" aria-live="polite" aria-atomic="true">
      {count === 1 ? '1 article' : `${count} articles`}
    </p>
  );
}
