import Link from 'next/link';

import { CategoryCard } from '@/components/learn/taxonomy/CategoryCard';
import { PopularTags } from '@/components/learn/taxonomy/PopularTags';
import { cn } from '@/lib/utils';
import type { PublicLearnCategory, PublicLearnTag } from '@/types/learn';
import type { InternalLink } from '@/types/linking';

type CategorySidebarProps = {
  category: PublicLearnCategory;
  relatedCategories: PublicLearnCategory[];
  relatedServices: InternalLink[];
  popularTags?: PublicLearnTag[];
  className?: string;
};

/**
 * Category sidebar — Document 15.04.
 * Related links come from taxonomy + linking helpers (never hardcoded).
 */
export function CategorySidebar({
  category,
  relatedCategories,
  relatedServices,
  popularTags = [],
  className,
}: CategorySidebarProps) {
  return (
    <aside
      className={cn('flex flex-col gap-8', className)}
      aria-label={`${category.name} details`}
    >
      <div>
        <h2 className="text-sm font-semibold uppercase tracking-wide text-neutral-500">
          About
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-neutral-700">
          {category.description}
        </p>
        <p className="mt-2 text-xs text-neutral-500">
          {category.articleCount} published{' '}
          {category.articleCount === 1 ? 'article' : 'articles'}
        </p>
      </div>

      {relatedCategories.length > 0 ? (
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wide text-neutral-500">
            Related categories
          </h2>
          <ul className="mt-3 space-y-3">
            {relatedCategories.map((item) => (
              <li key={item.id}>
                <CategoryCard category={item} className="p-3" />
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {relatedServices.length > 0 ? (
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wide text-neutral-500">
            Related services
          </h2>
          <ul className="mt-3 space-y-2">
            {relatedServices.map((service) => (
              <li key={service.href}>
                <Link
                  href={service.href}
                  className="text-sm font-medium text-neutral-900 underline-offset-2 outline-none hover:underline focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2"
                >
                  {service.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {popularTags.length > 0 ? (
        <PopularTags tags={popularTags} title="Popular tags" />
      ) : null}
    </aside>
  );
}
