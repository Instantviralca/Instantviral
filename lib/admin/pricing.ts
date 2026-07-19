import { getAllServices, getServiceBySlug } from '@/data/services';
import {
  getActivePackagesByServiceSlug,
  getPackageById,
  getPackagesByServiceSlug,
} from '@/data/pricing/packages';
import type { AdminPackageEditorModel, AdminPricingRow } from '@/types/admin-pricing';

/**
 * Admin pricing — Document 12.05.
 * Reads ONLY existing InstantViral.ca packages. Never invents values.
 */
export function getAdminPricingRows(): AdminPricingRow[] {
  return getAllServices().flatMap((service) => {
    const packages = getPackagesByServiceSlug(service.slug);
    return packages.map((pkg) => ({
      id: pkg.id,
      packageName: pkg.packageName,
      platformId: service.platform,
      serviceSlug: service.slug,
      serviceName: service.name,
      quantity: pkg.quantity,
      price: pkg.price,
      compareAtPrice: pkg.compareAtPrice,
      currency: pkg.currency,
      badge: pkg.badge,
      deliveryTime: pkg.deliveryTime,
      features: pkg.features,
      active: pkg.active && pkg.availability === 'active',
      displayOrder: pkg.displayOrder,
      updatedAt: new Date().toISOString().slice(0, 10),
    }));
  });
}

export function getAdminPackageEditor(packageId: string): AdminPackageEditorModel | null {
  const pkg = getPackageById(packageId);
  if (!pkg) return null;
  const service = getServiceBySlug(pkg.serviceSlug);
  if (!service) return null;

  return {
    id: pkg.id,
    packageName: pkg.packageName,
    platformId: service.platform,
    serviceSlug: service.slug,
    serviceName: service.name,
    quantity: pkg.quantity,
    price: pkg.price,
    compareAtPrice: pkg.compareAtPrice,
    currency: pkg.currency,
    badge: pkg.badge,
    deliveryTime: pkg.deliveryTime,
    features: pkg.features,
    active: pkg.active && pkg.availability === 'active',
    displayOrder: pkg.displayOrder,
    updatedAt: new Date().toISOString().slice(0, 10),
    source: pkg,
  };
}

export function getAdminPricingServiceOptions() {
  return getAllServices()
    .map((s) => ({
      slug: s.slug,
      name: s.name,
      platformId: s.platform,
      count: getActivePackagesByServiceSlug(s.slug).length,
    }))
    .filter((s) => s.count > 0);
}
