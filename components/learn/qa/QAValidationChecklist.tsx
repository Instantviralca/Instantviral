import { cn } from '@/lib/utils';
import type { QAChecklistItem } from '@/types/learn-qa';

type QAValidationChecklistProps = {
  items: QAChecklistItem[];
  className?: string;
};

/**
 * QA validation checklist — Document 15.09.
 */
export function QAValidationChecklist({
  items,
  className,
}: QAValidationChecklistProps) {
  return (
    <ul
      className={cn('space-y-2 text-sm text-neutral-800', className)}
      data-qa-validation-checklist
    >
      {items.map((item) => (
        <li
          key={item.id}
          className="flex items-start gap-2"
          data-checklist-id={item.id}
          data-passed={item.passed ? 'true' : 'false'}
        >
          <span
            aria-hidden
            className={cn(
              'mt-0.5 inline-flex h-4 w-4 shrink-0 items-center justify-center border text-[10px]',
              item.passed
                ? 'border-emerald-600 text-emerald-700'
                : item.required
                  ? 'border-red-500 text-red-600'
                  : 'border-amber-500 text-amber-700',
            )}
          >
            {item.passed ? '✓' : item.required ? '!' : '·'}
          </span>
          <span>
            <span className="font-medium">{item.label}</span>
            {item.required ? (
              <span className="ml-1 text-xs text-neutral-500">required</span>
            ) : null}
            {item.detail && !item.passed ? (
              <span className="mt-0.5 block text-xs text-neutral-600">
                {item.detail}
              </span>
            ) : null}
          </span>
        </li>
      ))}
    </ul>
  );
}
