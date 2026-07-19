'use client';

import { Button } from '@/components/ui/button';

type BulkActionsBarProps = {
  selectedCount: number;
  disabled?: boolean;
};

/** Architecture only — actions stay disabled until backend bulk ops land. */
export function BulkActionsBar({ selectedCount, disabled = true }: BulkActionsBarProps) {
  if (selectedCount === 0) return null;

  return (
    <div
      className="flex flex-wrap items-center gap-2 rounded-lg border bg-background p-3"
      role="region"
      aria-label="Bulk actions"
    >
      <p className="text-sm">{selectedCount} selected</p>
      <Button type="button" size="sm" variant="outline" disabled={disabled}>
        Change status
      </Button>
      <Button type="button" size="sm" variant="outline" disabled={disabled}>
        Export
      </Button>
    </div>
  );
}
