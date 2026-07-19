'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  AdminTable,
  type AdminTableColumn,
} from '@/components/admin/tables/admin-table';
import { FAQ_CATEGORY_LABELS } from '@/data/faqs/categories';
import { statusLabel } from '@/lib/faqs/moderation';
import type { AdminFaqRow } from '@/types/admin-faqs';

export type FAQsTableProps = {
  rows: AdminFaqRow[];
  onSelect?: (id: string) => void;
  onApprove?: (id: string) => void;
  onHide?: (id: string) => void;
  loading?: boolean;
};

/**
 * Admin FAQs table — Document 14.04 architecture (no CRUD persistence).
 * Status uses text labels (not colour alone).
 */
export function FAQsTable({
  rows,
  onSelect,
  onApprove,
  onHide,
  loading,
}: FAQsTableProps) {
  const columns: AdminTableColumn<AdminFaqRow>[] = [
    {
      id: 'question',
      header: 'Question',
      cell: (row) => (
        <button
          type="button"
          className="min-h-11 text-left font-medium underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          onClick={() => onSelect?.(row.id)}
        >
          {row.question}
        </button>
      ),
    },
    {
      id: 'category',
      header: 'Category',
      cell: (row) => FAQ_CATEGORY_LABELS[row.category],
    },
    {
      id: 'status',
      header: 'Status',
      cell: (row) => (
        <span className="inline-flex items-center gap-2">
          <Badge variant="outline">{statusLabel(row.status)}</Badge>
          <span className="sr-only">Status: {statusLabel(row.status)}</span>
        </span>
      ),
    },
    {
      id: 'flags',
      header: 'Flags',
      cell: (row) => (
        <span className="text-muted-foreground">
          {[
            row.featured ? 'Featured' : null,
            row.schemaEligible ? 'Schema' : null,
            row.platform ? row.platform : null,
            row.serviceCount > 0 ? `${row.serviceCount} services` : null,
          ]
            .filter(Boolean)
            .join(' · ') || '—'}
        </span>
      ),
    },
    {
      id: 'actions',
      header: 'Actions',
      cell: (row) => (
        <div className="flex flex-wrap gap-2">
          <Button
            type="button"
            size="sm"
            variant="outline"
            className="min-h-11"
            onClick={() => onApprove?.(row.id)}
          >
            Approve
          </Button>
          <Button
            type="button"
            size="sm"
            variant="outline"
            className="min-h-11"
            onClick={() => onHide?.(row.id)}
          >
            Hide
          </Button>
        </div>
      ),
    },
  ];

  return (
    <AdminTable
      columns={columns}
      rows={rows}
      rowKey={(row) => row.id}
      loading={loading}
      emptyMessage="No FAQs match the current filters."
    />
  );
}
