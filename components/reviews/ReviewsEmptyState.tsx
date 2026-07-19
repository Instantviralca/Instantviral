import { MutedText } from '@/components/typography/muted-text';
import { Heading } from '@/components/typography/heading';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export type ReviewsEmptyStateProps = {
  title?: string;
  description?: string;
  /** Admin-only actions (e.g. add/import). Not used on public pages by default. */
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
};

export function ReviewsEmptyState({
  title = 'No approved reviews yet',
  description = 'Genuine customer reviews will appear here after they are approved and consented for publication. Placeholder reviews are not shown.',
  actionLabel,
  onAction,
  className,
}: ReviewsEmptyStateProps) {
  return (
    <div
      className={cn(
        'rounded-lg border border-dashed border-border bg-card px-6 py-10 text-center',
        className,
      )}
      role="status"
    >
      <Heading as="h3" size="h4">
        {title}
      </Heading>
      <MutedText className="mx-auto mt-2 max-w-md">{description}</MutedText>
      {actionLabel && onAction ? (
        <Button type="button" className="mt-4 min-h-11" onClick={onAction}>
          {actionLabel}
        </Button>
      ) : null}
    </div>
  );
}
