import type { CurrencyCode } from '@/types/pricing';

/**
 * Format money from minor units for display.
 * Document 10.01 / 10.02 — keep formatting out of components.
 */
export function formatMoney(
  amountMinor: number,
  currency: CurrencyCode = 'USD',
  locale = 'en-US',
): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: amountMinor % 100 === 0 ? 0 : 2,
    maximumFractionDigits: 2,
  }).format(amountMinor / 100);
}

/** @deprecated Prefer formatMoney */
export function formatPackagePrice(
  priceCents: number,
  currency: CurrencyCode = 'USD',
  locale = 'en-US',
): string {
  return formatMoney(priceCents, currency, locale);
}
