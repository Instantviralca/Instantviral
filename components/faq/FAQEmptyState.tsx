import { Heading } from '@/components/typography/heading';
import { MutedText } from '@/components/typography/muted-text';
import { cn } from '@/lib/utils';

export type FAQEmptyStateProps = {
  title?: string;
  description?: string;
  className?: string;
};

/**
 * Empty results / empty FAQ state.
 */
export function FAQEmptyState({
  title = 'No matching questions',
  description = 'Try a different search term or browse another category.',
  className,
}: FAQEmptyStateProps) {
  return (
    <div
      role="status"
      className={cn(
        'rounded-lg border border-dashed border-border bg-muted/20 px-6 py-10 text-center',
        className,
      )}
    >
      <Heading as="h3" size="h4" className="mb-2">
        {title}
      </Heading>
      <MutedText>{description}</MutedText>
    </div>
  );
}
