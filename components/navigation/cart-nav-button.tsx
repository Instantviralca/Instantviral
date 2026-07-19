'use client';

import { useEffect, useRef, useState } from 'react';
import { ShoppingCart } from 'lucide-react';

import { useCart } from '@/lib/cart';
import { useCartUi } from '@/lib/cart/cart-ui-context';
import { cn } from '@/lib/utils';

/**
 * Navbar cart icon — opens soft cart drawer (Buzzoid-style).
 */
export function CartNavButton({ className }: { className?: string }) {
  const { totals, isHydrated } = useCart();
  const { openCart } = useCartUi();
  const count = isHydrated ? totals.itemCount : 0;
  const prevCount = useRef(count);
  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    if (count > prevCount.current) {
      setPulse(true);
      const t = window.setTimeout(() => setPulse(false), 600);
      prevCount.current = count;
      return () => window.clearTimeout(t);
    }
    prevCount.current = count;
  }, [count]);

  return (
    <button
      type="button"
      onClick={openCart}
      className={cn(
        'relative inline-flex size-10 items-center justify-center rounded-md text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
        className,
      )}
      aria-label={count > 0 ? `Cart, ${count} items` : 'Open cart'}
      data-analytics="nav-cart"
    >
      <ShoppingCart className="size-5" aria-hidden="true" />
      {count > 0 ? (
        <span
          className={cn(
            'absolute -right-0.5 -top-0.5 inline-flex min-w-4 items-center justify-center rounded-full bg-[var(--brand-primary)] px-1 text-[10px] font-bold leading-4 text-white',
            pulse && 'motion-safe:animate-[cart-badge-pulse_0.6s_ease-out]',
          )}
          data-cart-count={count}
        >
          {count > 99 ? '99+' : count}
        </span>
      ) : null}
    </button>
  );
}
