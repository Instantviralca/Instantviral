import { cn } from '@/lib/utils';
import type {
  EditorialIssue,
  PublishingChecklistItem,
} from '@/types/learn-editorial';

type PublishingValidationSummaryProps = {
  ok: boolean;
  issues: EditorialIssue[];
  checklist: PublishingChecklistItem[];
  className?: string;
};

/**
 * Publishing validation summary — Document 15.08.
 */
export function PublishingValidationSummary({
  ok,
  issues,
  checklist,
  className,
}: PublishingValidationSummaryProps) {
  const blockers = issues.filter((i) => i.severity === 'blocker');
  const errors = issues.filter((i) => i.severity === 'error');
  const requiredFailed = checklist.filter((i) => i.required && !i.passed).length;
  const requiredTotal = checklist.filter((i) => i.required).length;

  return (
    <div
      className={cn(
        'border border-neutral-200 bg-white p-4 text-sm text-neutral-800',
        className,
      )}
      data-publishing-validation={ok ? 'ok' : 'blocked'}
      role="status"
    >
      <p className="font-semibold tracking-tight">
        {ok ? 'Ready to publish' : 'Publishing blocked'}
      </p>
      <p className="mt-1 text-neutral-600">
        {requiredTotal - requiredFailed}/{requiredTotal} required checks passed
        {blockers.length || errors.length
          ? ` · ${blockers.length} blocker(s), ${errors.length} error(s)`
          : null}
      </p>
      {issues.length > 0 ? (
        <ul className="mt-3 space-y-1.5">
          {issues.map((issue) => (
            <li key={`${issue.code}-${issue.field ?? ''}`}>
              <span className="font-medium uppercase tracking-wide text-xs text-neutral-500">
                {issue.severity}
              </span>
              <span className="ml-2">{issue.message}</span>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
