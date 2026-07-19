'use client';

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { InternalNotes } from '@/components/admin/orders/internal-notes';
import { OrderSummaryCard } from '@/components/admin/orders/order-summary-card';
import { OrderTimeline } from '@/components/admin/orders/order-timeline';
import { StatusSelector } from '@/components/admin/orders/status-selector';
import type { AdminOrderDetails } from '@/types/admin-orders';
import type { OrderStatus } from '@/types/order-status';

type OrderDetailsDrawerProps = {
  open: boolean;
  order: AdminOrderDetails | null;
  onOpenChange: (open: boolean) => void;
  onStatusChange?: (status: OrderStatus) => void;
  onAddNote?: (body: string) => void;
};

export function OrderDetailsDrawer({
  open,
  order,
  onOpenChange,
  onStatusChange,
  onAddNote,
}: OrderDetailsDrawerProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full overflow-y-auto sm:max-w-lg">
        <SheetHeader>
          <SheetTitle>{order ? `Order ${order.id}` : 'Order details'}</SheetTitle>
          <SheetDescription>Manual fulfillment workspace</SheetDescription>
        </SheetHeader>

        {order ? (
          <div className="mt-6 space-y-6">
            <section className="space-y-2">
              <h3 className="text-sm font-semibold">Status</h3>
              <StatusSelector
                current={order.orderStatus}
                onChange={(status) => onStatusChange?.(status)}
              />
            </section>
            <section className="space-y-2">
              <h3 className="text-sm font-semibold">Summary</h3>
              <OrderSummaryCard order={order} />
            </section>
            <section className="space-y-2">
              <h3 className="text-sm font-semibold">Timeline</h3>
              <OrderTimeline events={order.timeline} />
            </section>
            <section className="space-y-2">
              <h3 className="text-sm font-semibold">Internal notes</h3>
              <InternalNotes notes={order.internalNotes} onAdd={onAddNote} />
            </section>
          </div>
        ) : null}
      </SheetContent>
    </Sheet>
  );
}
