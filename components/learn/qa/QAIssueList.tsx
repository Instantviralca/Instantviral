import { cn } from '@/lib/utils';
import type { QAIssue } from '@/types/learn-qa';

type QAIssueListProps = {
  issues: QAIssue[];
  className?: string;
  /** Limit to severe findings for compact editorial views. */
  minSeverity?: 'blocker' | 'error' | 'warning' | 'recommendation';
};

const SEVERITY_ORDER = {
  blocker: 0,
  error: 1,
  warning: 2,
  recommendation: 3,
} as const;

/**
 * QA issue list — Document 15.09.
 */
export function QAIssueList({
  issues,
  className,
  minSeverity = 'recommendation',
}: QAIssueListProps) {
  const threshold = SEVERITY_ORDER[minSeverity];
  const visible = issues
    .filter((issue) => SEVERITY_ORDER[issue.severity] <= threshold)
    .sort(
      (a, b) => SEVERITY_ORDER[a.severity] - SEVERITY_ORDER[b.severity],
    );

  if (visible.length === 0) {
    return (
      <p
        className={cn('text-sm text-neutral-600', className)}
        data-qa-issue-list="empty"
      >
        No QA findings at this severity.
      </p>
    );
  }

  return (
    <ul
      className={cn('space-y-2 text-sm text-neutral-800', className)}
      data-qa-issue-list
    >
      {visible.map((issue, index) => (
        <li
          key={`${issue.code}-${issue.field ?? ''}-${index}`}
          className="border-l-2 border-neutral-300 pl-3"
          data-severity={issue.severity}
          data-area={issue.area}
        >
          <span className="text-xs font-semibold uppercase tracking-wide text-neutral-500">
            {issue.severity} · {issue.area}
          </span>
          <p className="mt-0.5">{issue.message}</p>
        </li>
      ))}
    </ul>
  );
}
