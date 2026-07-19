/**
 * Re-export pricing package types. Prefer `@/types/pricing`.
 * @deprecated Use PricingPackage from types/pricing.
 */
export type {
  PricingPackage as ServicePackage,
  PackageSelectionPayload,
  CurrencyCode,
  PricingPackage,
} from '@/types/pricing';
