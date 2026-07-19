import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { qaStatusLabel } from '@/lib/learn/qa';
import type { QAStatus } from '@/types/learn-qa';

const STATUS_STYLES: Record<QAStatus, string> = {
  not_started: 'border-neutral-300 bg-neutral-100 text-neutral-700',
  in_progress: 'border-sky-300 bg-sky-50 text-sky-900',
  passed: 'border-emerald-300 bg-emerald-50 text-emerald-900',
  failed: 'border-red-300 bg-red-50 text-red-900',
  requires_review: 'border-amber-300 bg-amber-50 text-amber-900',
};

type QAStatusBadgeProps = {
  status: QAStatus;
  className?: string;
};

/**
 * Editorial QA status badge — Document 15.09.
 */
export function QAStatusBadge({ status, className }: QAStatusBadgeProps) {
  return (
    <Badge
      variant="outline"
      className={cn(STATUS_STYLES[status], className)}
      data-qa-status={status}
    >
      {qaStatusLabel(status)}
    </Badge>
  );
}
