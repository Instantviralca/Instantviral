import { cn } from '@/lib/utils';
import type { QAIssue } from '@/types/learn-qa';

type EditorialWarningsProps = {
  issues: QAIssue[];
  className?: string;
};

/**
 * Editorial warnings panel — Document 15.09.
 * Surfaces warnings and recommendations only (not blockers/errors).
 */
export function EditorialWarnings({
  issues,
  className,
}: EditorialWarningsProps) {
  const warnings = issues.filter(
    (issue) =>
      issue.severity === 'warning' || issue.severity === 'recommendation',
  );

  if (warnings.length === 0) {
    return null;
  }

  return (
    <aside
      className={cn(
        'border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-950',
        className,
      )}
      data-editorial-warnings
      role="note"
    >
      <p className="font-semibold">Editorial warnings</p>
      <ul className="mt-2 space-y-1.5 text-amber-950/90">
        {warnings.map((issue, index) => (
          <li key={`${issue.code}-${index}`}>
            <span className="font-medium capitalize">{issue.severity}:</span>{' '}
            {issue.message}
          </li>
        ))}
      </ul>
    </aside>
  );
}
