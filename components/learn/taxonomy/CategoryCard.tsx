import Link from 'next/link';

import { cn } from '@/lib/utils';
import type { PublicLearnCategory } from '@/types/learn';

type CategoryCardProps = {
  category: PublicLearnCategory;
  className?: string;
};

/**
 * Category card — Document 15.04.
 * Href comes from the shared registry projection.
 */
export function CategoryCard({ category, className }: CategoryCardProps) {
  return (
    <article
      className={cn(
        'flex h-full flex-col border border-neutral-200 bg-white p-5 transition-colors hover:border-neutral-400',
        className,
      )}
      data-category-id={category.id}
    >
      <h3 className="text-lg font-semibold text-neutral-900">
        <Link
          href={category.href}
          className="rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2"
        >
          <span className="hover:underline">{category.name}</span>
        </Link>
      </h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-neutral-600">
        {category.description}
      </p>
      <p className="mt-4 text-xs text-neutral-500">
        {category.articleCount === 0
          ? 'Guides coming soon'
          : `${category.articleCount} article${category.articleCount === 1 ? '' : 's'}`}
      </p>
    </article>
  );
}
