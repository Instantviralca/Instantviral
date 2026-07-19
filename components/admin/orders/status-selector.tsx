'use client';

import { Button } from '@/components/ui/button';
import { getAllowedTransitions, getAdminStatusLabel } from '@/lib/orders/status';
import type { OrderStatus } from '@/types/order-status';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

type StatusSelectorProps = {
  current: OrderStatus;
  onChange: (next: OrderStatus) => void;
  disabled?: boolean;
};

export function StatusSelector({ current, onChange, disabled }: StatusSelectorProps) {
  const allowed = getAllowedTransitions(current);

  return (
    <div className="flex flex-wrap items-center gap-2">
      <Select
        value={current}
        disabled={disabled || allowed.length === 0}
        onValueChange={(value) => onChange(value as OrderStatus)}
      >
        <SelectTrigger aria-label="Order status" className="w-[180px]">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value={current}>{getAdminStatusLabel(current)}</SelectItem>
          {allowed.map((status) => (
            <SelectItem key={status} value={status}>
              {getAdminStatusLabel(status)}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {allowed.length === 0 ? (
        <Button type="button" size="sm" variant="outline" disabled>
          Terminal status
        </Button>
      ) : null}
    </div>
  );
}
