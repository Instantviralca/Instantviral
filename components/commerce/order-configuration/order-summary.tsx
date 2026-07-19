import { formatMoney } from '@/lib/pricing/format';
import type { PricingPackage } from '@/types/pricing';

type OrderSummaryProps = {
  pkg: PricingPackage;
  className?: string;
};

export function OrderSummary({ pkg, className }: OrderSummaryProps) {
  return (
    <aside className={className} aria-label="Order summary">
      <div className="rounded-lg border p-4 space-y-2">
        <p className="text-sm font-medium text-foreground">{pkg.title}</p>
        {pkg.quantityLabel !== pkg.title ? (
          <p className="text-sm text-muted-foreground">{pkg.quantityLabel}</p>
        ) : null}
        <p className="text-lg font-semibold">{formatMoney(pkg.price, pkg.currency)}</p>
        {pkg.deliveryTime ? (
          <p className="text-xs text-muted-foreground">Delivery: {pkg.deliveryTime}</p>
        ) : null}
      </div>
    </aside>
  );
}
