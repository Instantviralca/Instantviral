import { formatMoney } from '@/lib/pricing/format';
import { cn } from '@/lib/utils';
import type { PriceDisplayProps } from '@/components/commerce/pricing/types';

export function PriceDisplay({
  price,
  currency,
  compareAtPrice,
  className,
}: PriceDisplayProps) {
  const current = formatMoney(price, currency);
  const compare =
    compareAtPrice !== undefined && compareAtPrice > price
      ? formatMoney(compareAtPrice, currency)
      : null;

  return (
    <div className={cn('flex flex-wrap items-baseline gap-2', className)}>
      {compare ? (
        <span className="text-sm text-muted-foreground line-through" aria-hidden>
          {compare}
        </span>
      ) : null}
      <p
        className="text-3xl font-semibold tracking-tight text-foreground"
        aria-label={compare ? `Sale price ${current}, was ${compare}` : `Price ${current}`}
      >
        {current}
      </p>
    </div>
  );
}
