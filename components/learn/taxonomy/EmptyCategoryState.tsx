import { MutedText } from '@/components/typography/muted-text';
import { cn } from '@/lib/utils';

type EmptyCategoryStateProps = {
  categoryName: string;
  className?: string;
};

/**
 * Empty category state — Document 15.04.
 * Used when an active category has no published articles.
 */
export function EmptyCategoryState({
  categoryName,
  className,
}: EmptyCategoryStateProps) {
  return (
    <div
      className={cn(
        'border border-dashed border-neutral-300 p-6',
        className,
      )}
      data-empty-category="true"
    >
      <MutedText>
        No published articles in {categoryName} yet. Content will appear here when
        approved in the shared Learn registry.
      </MutedText>
    </div>
  );
}
