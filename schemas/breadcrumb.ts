import { absoluteUrl } from '@/seo/canonical';
import type { BreadcrumbItem } from '@/types/shared';
import type { JsonLd } from '@/schemas/organization';

export function breadcrumbSchema(items: BreadcrumbItem[]): JsonLd | null {
  const list = items.filter((item) => item.label);
  if (!list.length) return null;

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: list.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      ...(item.href
        ? { item: absoluteUrl(item.href) }
        : index === list.length - 1
          ? {}
          : {}),
    })),
  };
}
