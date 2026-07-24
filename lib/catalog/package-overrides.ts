/**
 * In-memory package overrides — safe for client + server.
 * Persistence/hydration lives in package-overrides-store (server only).
 */

import type { PackageBadgeId, PricingPackage } from '@/types/pricing';

export type PackageOverride = {
  packageId: string;
  /** Selling price in minor units. */
  price?: number;
  /** Compare-at price in minor units. */
  compareAtPrice?: number | null;
  quantity?: number;
  deliveryTime?: string;
  active?: boolean;
  badge?: PackageBadgeId | null;
  updatedAt: string;
};

let overrides: Record<string, PackageOverride> = {};

export function getPackageOverridesMap(): Record<string, PackageOverride> {
  return overrides;
}

export function setPackageOverridesMap(next: Record<string, PackageOverride>): void {
  overrides = next && typeof next === 'object' ? next : {};
}

export function applyPackageOverride(pkg: PricingPackage): PricingPackage {
  const override = overrides[pkg.id];
  if (!override) return pkg;

  const price = override.price ?? pkg.price;
  const compareAt =
    override.compareAtPrice === null
      ? undefined
      : (override.compareAtPrice ?? pkg.compareAtPrice);
  const active = override.active ?? pkg.active;

  return {
    ...pkg,
    price,
    regularPrice: price,
    compareAtPrice: compareAt && compareAt > price ? compareAt : undefined,
    quantity: override.quantity ?? pkg.quantity,
    deliveryTime: override.deliveryTime ?? pkg.deliveryTime,
    active,
    availability: active ? 'active' : 'hidden',
    badge: override.badge === null ? undefined : (override.badge ?? pkg.badge),
  };
}

export function resetPackageOverridesMemoryForTests(): void {
  overrides = {};
}
