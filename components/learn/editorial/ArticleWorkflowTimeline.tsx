import { cn } from '@/lib/utils';
import { getWorkflowTimeline } from '@/lib/learn/editorial';
import type { EditorialArticleStatus } from '@/types/learn-editorial';

type ArticleWorkflowTimelineProps = {
  status: EditorialArticleStatus;
  className?: string;
};

/**
 * Editorial lifecycle timeline — Document 15.08.
 */
export function ArticleWorkflowTimeline({
  status,
  className,
}: ArticleWorkflowTimelineProps) {
  const steps = getWorkflowTimeline(status);

  return (
    <ol
      className={cn('space-y-2 text-sm', className)}
      data-article-workflow-timeline
      data-current-status={status}
    >
      {steps.map((step) => (
        <li
          key={step.status}
          className={cn(
            'flex items-center gap-2',
            step.reached ? 'text-neutral-900' : 'text-neutral-400',
          )}
          data-step={step.status}
          data-reached={step.reached ? 'true' : 'false'}
        >
          <span
            aria-hidden
            className={cn(
              'h-2.5 w-2.5 shrink-0 rounded-full border',
              step.reached
                ? 'border-neutral-900 bg-neutral-900'
                : 'border-neutral-300 bg-white',
              step.status === status && 'ring-2 ring-neutral-400 ring-offset-1',
            )}
          />
          <span className={step.status === status ? 'font-semibold' : undefined}>
            {step.label}
          </span>
        </li>
      ))}
    </ol>
  );
}
