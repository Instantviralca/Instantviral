import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { editorialStatusLabel } from '@/lib/learn/editorial';
import type { EditorialArticleStatus } from '@/types/learn-editorial';

const STATUS_STYLES: Record<EditorialArticleStatus, string> = {
  draft: 'border-neutral-300 bg-neutral-100 text-neutral-700',
  in_review: 'border-amber-300 bg-amber-50 text-amber-900',
  approved: 'border-sky-300 bg-sky-50 text-sky-900',
  scheduled: 'border-sky-300 bg-sky-50 text-sky-900',
  published: 'border-emerald-300 bg-emerald-50 text-emerald-900',
  updated: 'border-teal-300 bg-teal-50 text-teal-900',
  archived: 'border-neutral-400 bg-neutral-200 text-neutral-600',
};

type EditorialStatusBadgeProps = {
  status: EditorialArticleStatus;
  className?: string;
};

/**
 * Editorial status badge — Document 15.08.
 * For editorial surfaces only — never on public article pages.
 */
export function EditorialStatusBadge({
  status,
  className,
}: EditorialStatusBadgeProps) {
  return (
    <Badge
      variant="outline"
      className={cn(STATUS_STYLES[status], className)}
      data-editorial-status={status}
    >
      {editorialStatusLabel(status)}
    </Badge>
  );
}
