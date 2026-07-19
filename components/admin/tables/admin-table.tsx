import type { ReactNode } from 'react';

import { cn } from '@/lib/utils';

export type AdminTableColumn<T> = {
  id: string;
  header: string;
  cell: (row: T) => ReactNode;
  className?: string;
};

type AdminTableProps<T> = {
  columns: AdminTableColumn<T>[];
  rows: T[];
  rowKey: (row: T) => string;
  emptyMessage?: string;
  loading?: boolean;
  className?: string;
};

export function AdminTable<T>({
  columns,
  rows,
  rowKey,
  emptyMessage = 'No results.',
  loading,
  className,
}: AdminTableProps<T>) {
  if (loading) {
    return (
      <div className="space-y-2" aria-busy="true" aria-label="Loading table">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="h-10 animate-pulse rounded bg-muted" />
        ))}
      </div>
    );
  }

  if (rows.length === 0) {
    return <p className="text-sm text-muted-foreground">{emptyMessage}</p>;
  }

  return (
    <div className={cn('w-full overflow-x-auto', className)}>
      <table className="w-full min-w-[640px] border-collapse text-sm">
        <thead>
          <tr className="border-b text-left">
            {columns.map((col) => (
              <th key={col.id} className={cn('px-3 py-2 font-medium', col.className)}>
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={rowKey(row)} className="border-b last:border-0">
              {columns.map((col) => (
                <td key={col.id} className={cn('px-3 py-3 align-middle', col.className)}>
                  {col.cell(row)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
