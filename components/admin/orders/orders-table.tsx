'use client';

import { OrderRow, OrderRowCard } from '@/components/admin/orders/order-row';
import { AdminEmptyState } from '@/components/admin/common/admin-empty-state';
import type { AdminOrderRow } from '@/types/admin-orders';

type OrdersTableProps = {
  orders: AdminOrderRow[];
  selectedIds: string[];
  onToggle: (id: string, checked: boolean) => void;
  onOpen: (id: string) => void;
  loading?: boolean;
};

export function OrdersTable({
  orders,
  selectedIds,
  onToggle,
  onOpen,
  loading,
}: OrdersTableProps) {
  if (loading) {
    return (
      <div className="space-y-2" aria-busy="true" aria-label="Loading orders">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="h-12 animate-pulse rounded bg-muted" />
        ))}
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <AdminEmptyState
        title="No orders found"
        description="Paid orders will appear here for manual fulfillment. Adjust search or filters if you expected results."
      />
    );
  }

  return (
    <>
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full min-w-[1100px] border-collapse text-sm">
          <thead>
            <tr className="border-b text-left">
              <th className="px-3 py-2" scope="col">
                <span className="sr-only">Select</span>
              </th>
              <th className="px-3 py-2 font-medium">Order ID</th>
              <th className="px-3 py-2 font-medium">Customer</th>
              <th className="px-3 py-2 font-medium">Platform</th>
              <th className="px-3 py-2 font-medium">Service</th>
              <th className="px-3 py-2 font-medium">Package</th>
              <th className="px-3 py-2 font-medium">Qty</th>
              <th className="px-3 py-2 font-medium">Total</th>
              <th className="px-3 py-2 font-medium">Payment</th>
              <th className="px-3 py-2 font-medium">Status</th>
              <th className="px-3 py-2 font-medium">Created</th>
              <th className="px-3 py-2 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <OrderRow
                key={order.id}
                order={order}
                selected={selectedIds.includes(order.id)}
                onSelect={(checked) => onToggle(order.id, checked)}
                onOpen={() => onOpen(order.id)}
              />
            ))}
          </tbody>
        </table>
      </div>

      <div className="grid gap-3 md:hidden">
        {orders.map((order) => (
          <OrderRowCard
            key={order.id}
            order={order}
            selected={selectedIds.includes(order.id)}
            onSelect={(checked) => onToggle(order.id, checked)}
            onOpen={() => onOpen(order.id)}
          />
        ))}
      </div>
    </>
  );
}
