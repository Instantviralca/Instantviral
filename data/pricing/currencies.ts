import type { CurrencyCode, CurrencyDefinition } from '@/types/pricing';

/** Global currency registry — Document 10.01. USD is default. */
export const currencies: CurrencyDefinition[] = [
  { code: 'USD', label: 'US Dollar', symbol: '$', minorUnits: 100, active: true, default: true },
  { code: 'CAD', label: 'Canadian Dollar', symbol: 'CA$', minorUnits: 100, active: true },
  { code: 'EUR', label: 'Euro', symbol: '€', minorUnits: 100, active: true },
  { code: 'GBP', label: 'British Pound', symbol: '£', minorUnits: 100, active: true },
  { code: 'AUD', label: 'Australian Dollar', symbol: 'A$', minorUnits: 100, active: true },
  { code: 'PKR', label: 'Pakistani Rupee', symbol: 'Rs', minorUnits: 100, active: false },
];

export function getActiveCurrencies(): CurrencyDefinition[] {
  return currencies.filter((c) => c.active);
}

export function getDefaultCurrency(): CurrencyDefinition {
  return currencies.find((c) => c.default) ?? currencies[0];
}

export function getCurrency(code: CurrencyCode): CurrencyDefinition | undefined {
  return currencies.find((c) => c.code === code);
}
