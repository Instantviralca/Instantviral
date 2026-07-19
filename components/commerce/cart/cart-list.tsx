'use client';

import { CartItemRow } from '@/components/commerce/cart/cart-item';
import type { CartItem } from '@/types/cart';
import { cn } from '@/lib/utils';

type CartListProps = {
  items: CartItem[];
  onRemove: (id: string) => void;
  className?: string;
};

export function CartList({ items, onRemove, className }: CartListProps) {
  return (
    <ul className={cn('space-y-4', className)} aria-label="Cart items">
      {items.map((item) => (
        <CartItemRow key={item.id} item={item} onRemove={onRemove} />
      ))}
    </ul>
  );
}
