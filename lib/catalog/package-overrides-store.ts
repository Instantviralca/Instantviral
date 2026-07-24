/**
 * Package override persistence — server only (site_settings / memory).
 */

import 'server-only';

import {
  clearJsonSettingsMemoryForTests,
  readJsonSetting,
  writeJsonSetting,
} from '@/lib/catalog/json-settings';
import {
  getPackageOverridesMap,
  setPackageOverridesMap,
  type PackageOverride,
} from '@/lib/catalog/package-overrides';

export const PACKAGE_OVERRIDES_SETTING_KEY = 'catalog_package_overrides_v1';

let hydratePromise: Promise<Record<string, PackageOverride>> | null = null;
let hydrated = false;

export async function hydratePackageOverrides(): Promise<Record<string, PackageOverride>> {
  if (hydrated) return getPackageOverridesMap();
  if (!hydratePromise) {
    hydratePromise = (async () => {
      const stored = await readJsonSetting<Record<string, PackageOverride>>(
        PACKAGE_OVERRIDES_SETTING_KEY,
        {},
      );
      setPackageOverridesMap(stored && typeof stored === 'object' ? stored : {});
      hydrated = true;
      return getPackageOverridesMap();
    })().finally(() => {
      hydratePromise = null;
    });
  }
  return hydratePromise;
}

export async function listPackageOverrides(): Promise<Record<string, PackageOverride>> {
  return hydratePackageOverrides();
}

export async function upsertPackageOverride(
  packageId: string,
  patch: Omit<PackageOverride, 'packageId' | 'updatedAt'>,
): Promise<PackageOverride> {
  if (patch.price != null && patch.price < 0) {
    throw new Error('Price cannot be negative.');
  }
  if (patch.compareAtPrice != null && patch.compareAtPrice < 0) {
    throw new Error('Compare-at price cannot be negative.');
  }
  if (patch.quantity != null && patch.quantity <= 0) {
    throw new Error('Quantity must be greater than 0.');
  }

  const map = await hydratePackageOverrides();
  const current = map[packageId];
  const next: PackageOverride = {
    packageId,
    price: patch.price ?? current?.price,
    compareAtPrice:
      patch.compareAtPrice !== undefined ? patch.compareAtPrice : current?.compareAtPrice,
    quantity: patch.quantity ?? current?.quantity,
    deliveryTime: patch.deliveryTime ?? current?.deliveryTime,
    active: patch.active ?? current?.active,
    badge: patch.badge !== undefined ? patch.badge : current?.badge,
    updatedAt: new Date().toISOString(),
  };
  const updated = { ...map, [packageId]: next };
  setPackageOverridesMap(updated);
  await writeJsonSetting(PACKAGE_OVERRIDES_SETTING_KEY, updated);
  return next;
}

export async function ensureCatalogHydrated(): Promise<void> {
  await hydratePackageOverrides();
}

export function resetPackageOverridesCacheForTests(): void {
  hydrated = false;
  hydratePromise = null;
  setPackageOverridesMap({});
  clearJsonSettingsMemoryForTests();
}
