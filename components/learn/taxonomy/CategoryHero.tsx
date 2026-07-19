import { LearnHero } from '@/components/learn/LearnHero';
import type { PublicLearnCategory } from '@/types/learn';
import type { BreadcrumbItem } from '@/types/shared';

type CategoryHeroProps = {
  category: PublicLearnCategory;
  breadcrumbs?: BreadcrumbItem[];
};

/**
 * Category page hero — Document 15.04.
 */
export function CategoryHero({ category, breadcrumbs }: CategoryHeroProps) {
  return (
    <LearnHero
      eyebrow="Learn category"
      title={category.name}
      description={category.description}
      breadcrumbs={breadcrumbs}
    />
  );
}
