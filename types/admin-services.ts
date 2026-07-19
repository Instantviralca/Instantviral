import type { PlatformId } from '@/types/platform';
import type { ServiceCategory } from '@/types/service';

export type AdminServiceStatus = 'draft' | 'published' | 'hidden';

/** Admin Service Management — Document 12.04. */
export type AdminServiceRow = {
  id: string;
  name: string;
  slug: string;
  platformId: PlatformId;
  category: ServiceCategory;
  status: AdminServiceStatus;
  featured: boolean;
  packageCount: number;
  seoTitle: string;
  seoDescription: string;
  primaryKeyword: string;
  secondaryKeywords: string[];
  updatedAt: string;
  url: string;
};

export type AdminServiceFilters = {
  platform?: PlatformId | 'all';
  status?: AdminServiceStatus | 'all';
  featured?: 'all' | 'yes' | 'no';
};

export type AdminServiceEditorModel = AdminServiceRow & {
  relatedServiceIds: string[];
  learnArticleSlugs: string[];
  faqIds: string[];
  packageIds: string[];
  homepageDisplayOrder?: number;
};
