import type { PlatformId } from '@/types/platform';
import type { BreadcrumbItem, PageType } from '@/types/shared';

export type ServiceCategory =
  | 'followers'
  | 'likes'
  | 'views'
  | 'comments'
  | 'subscribers'
  | 'page-likes'
  | 'post-likes';

export type Service = {
  id: string;
  platform: PlatformId;
  platformSlug: string;
  name: string;
  shortName: string;
  slug: string;
  url: string;
  primaryKeyword: string;
  secondaryKeywords: string[];
  category: ServiceCategory;
  pageType: PageType;
  icon: string;
  themeColor: string;
  description: string;
  breadcrumb: BreadcrumbItem[];
  navigationLabel: string;
  showInNavigation: boolean;
  showInFooter: boolean;
  featured: boolean;
  comingSoon: boolean;
};
