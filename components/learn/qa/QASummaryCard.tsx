import { cn } from '@/lib/utils';
import type { QAReport } from '@/types/learn-qa';
import { QAStatusBadge } from '@/components/learn/qa/QAStatusBadge';

type QASummaryCardProps = {
  report: QAReport;
  className?: string;
};

/**
 * QA summary card — Document 15.09.
 * Editorial-only surface.
 */
export function QASummaryCard({ report, className }: QASummaryCardProps) {
  return (
    <div
      className={cn(
        'border border-neutral-200 bg-white p-4 text-sm text-neutral-800',
        className,
      )}
      data-qa-summary
      data-can-publish={report.canPublish ? 'true' : 'false'}
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="font-semibold tracking-tight">Editorial QA</p>
          <p className="mt-1 text-neutral-600">
            {report.slug || 'Untitled article'} · {report.counts.total} finding(s)
          </p>
        </div>
        <QAStatusBadge status={report.status} />
      </div>

      <dl className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <div>
          <dt className="text-xs uppercase tracking-wide text-neutral-500">
            Blockers
          </dt>
          <dd className="mt-1 text-lg font-semibold tabular-nums">
            {report.counts.blocker}
          </dd>
        </div>
        <div>
          <dt className="text-xs uppercase tracking-wide text-neutral-500">
            Errors
          </dt>
          <dd className="mt-1 text-lg font-semibold tabular-nums">
            {report.counts.error}
          </dd>
        </div>
        <div>
          <dt className="text-xs uppercase tracking-wide text-neutral-500">
            Warnings
          </dt>
          <dd className="mt-1 text-lg font-semibold tabular-nums">
            {report.counts.warning}
          </dd>
        </div>
        <div>
          <dt className="text-xs uppercase tracking-wide text-neutral-500">
            Publish
          </dt>
          <dd className="mt-1 text-lg font-semibold">
            {report.canPublish ? 'Allowed' : 'Blocked'}
          </dd>
        </div>
      </dl>
    </div>
  );
}
