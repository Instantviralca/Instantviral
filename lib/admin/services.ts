import { getAllServices } from '@/data/services';
import { getActivePackagesByServiceSlug } from '@/data/pricing/packages';
import type { AdminServiceEditorModel, AdminServiceRow } from '@/types/admin-services';

/**
 * Admin services — Document 12.04.
 * Reads Service Registry + package counts. No CRUD persistence yet.
 */
export function getAdminServiceRows(): AdminServiceRow[] {
  return getAllServices().map((service) => {
    const packages = getActivePackagesByServiceSlug(service.slug);
    return {
      id: service.id,
      name: service.name,
      slug: service.slug,
      platformId: service.platform,
      category: service.category,
      status: service.comingSoon ? 'draft' : 'published',
      featured: service.featured,
      packageCount: packages.length,
      seoTitle: service.name,
      seoDescription: service.description,
      primaryKeyword: service.primaryKeyword,
      secondaryKeywords: service.secondaryKeywords,
      updatedAt: new Date().toISOString().slice(0, 10),
      url: service.url,
    };
  });
}

export function getAdminServiceEditor(slug: string): AdminServiceEditorModel | null {
  const row = getAdminServiceRows().find((s) => s.slug === slug);
  if (!row) return null;
  const packages = getActivePackagesByServiceSlug(slug);
  return {
    ...row,
    relatedServiceIds: [],
    learnArticleSlugs: [],
    faqIds: [],
    packageIds: packages.map((p) => p.id),
  };
}
