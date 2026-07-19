'use client';

import { FAQItem } from '@/components/faq/FAQItem';
import { cn } from '@/lib/utils';
import type { PublicFaq } from '@/types/faq';

export type FAQAccordionProps = {
  items: PublicFaq[];
  headingLevel?: 'h3' | 'h4';
  onItemOpen?: (faqId: string) => void;
  className?: string;
};

/**
 * Accessible FAQ accordion list — no hardcoded Q&A.
 */
export function FAQAccordion({
  items,
  headingLevel = 'h3',
  onItemOpen,
  className,
}: FAQAccordionProps) {
  if (items.length === 0) return null;

  return (
    <div className={cn('rounded-lg border border-border bg-card', className)}>
      {items.map((faq) => (
        <FAQItem
          key={faq.id}
          faq={faq}
          headingLevel={headingLevel}
          onOpen={onItemOpen}
        />
      ))}
    </div>
  );
}
