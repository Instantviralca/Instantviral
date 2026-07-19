'use client';

import { FAQ_CATEGORIES } from '@/data/faqs/categories';
import { faqAnalyticsEvents, trackFaqEvent } from '@/lib/analytics/faq-events';
import { cn } from '@/lib/utils';
import type { FAQCategoryId } from '@/types/faq';

export type FAQCategoryNavProps = {
  activeCategory: FAQCategoryId | 'all';
  onSelect: (category: FAQCategoryId | 'all') => void;
  /** Optional subset of categories to show (e.g. those with results). */
  categoryIds?: FAQCategoryId[];
  className?: string;
};

/**
 * Category navigation for the main FAQ page.
 */
export function FAQCategoryNav({
  activeCategory,
  onSelect,
  categoryIds,
  className,
}: FAQCategoryNavProps) {
  const categories = categoryIds
    ? FAQ_CATEGORIES.filter((category) => categoryIds.includes(category.id))
    : FAQ_CATEGORIES;

  return (
    <nav aria-label="FAQ categories" className={cn('space-y-2', className)}>
      <p className="text-sm font-medium text-foreground">Categories</p>
      <ul className="flex flex-wrap gap-2 lg:flex-col lg:gap-1">
        <li>
          <button
            type="button"
            className={cn(
              'min-h-11 rounded-md px-3 py-2 text-left text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
              activeCategory === 'all'
                ? 'bg-foreground text-background'
                : 'bg-muted/60 text-foreground hover:bg-muted',
            )}
            aria-current={activeCategory === 'all' ? 'true' : undefined}
            onClick={() => {
              onSelect('all');
              trackFaqEvent(faqAnalyticsEvents.faq_category_select, {
                categoryId: 'all',
              });
            }}
          >
            All questions
          </button>
        </li>
        {categories.map((category) => (
          <li key={category.id}>
            <button
              type="button"
              className={cn(
                'min-h-11 w-full rounded-md px-3 py-2 text-left text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
                activeCategory === category.id
                  ? 'bg-foreground text-background'
                  : 'bg-muted/60 text-foreground hover:bg-muted',
              )}
              aria-current={activeCategory === category.id ? 'true' : undefined}
              onClick={() => {
                onSelect(category.id);
                trackFaqEvent(faqAnalyticsEvents.faq_category_select, {
                  categoryId: category.id,
                });
              }}
            >
              {category.label}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
