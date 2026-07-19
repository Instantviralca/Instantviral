import type { PublicOrderTimelineStep } from '@/types/tracking';
import { cn } from '@/lib/utils';

type OrderTimelineProps = {
  steps: PublicOrderTimelineStep[];
  className?: string;
};

export function OrderTimeline({ steps, className }: OrderTimelineProps) {
  return (
    <ol className={cn('space-y-4', className)} aria-label="Order timeline">
      {steps.map((step) => (
        <li key={step.id} className="flex gap-3">
          <span
            className={cn(
              'mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border text-xs',
              step.status === 'complete' && 'border-primary bg-primary text-primary-foreground',
              step.status === 'current' && 'border-primary text-primary',
              step.status === 'upcoming' && 'border-muted-foreground/40 text-muted-foreground',
            )}
            aria-hidden
          >
            {step.status === 'complete' ? '✓' : step.status === 'current' ? '●' : '○'}
          </span>
          <div>
            <p className="font-medium">
              <span className="sr-only">
                {step.status === 'complete'
                  ? 'Completed: '
                  : step.status === 'current'
                    ? 'Current: '
                    : 'Upcoming: '}
              </span>
              {step.label}
            </p>
            {step.message ? (
              <p className="text-sm text-muted-foreground">{step.message}</p>
            ) : null}
            {step.at ? (
              <time className="text-xs text-muted-foreground" dateTime={step.at}>
                {new Date(step.at).toLocaleString()}
              </time>
            ) : null}
          </div>
        </li>
      ))}
    </ol>
  );
}
