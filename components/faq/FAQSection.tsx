'use client';

import { useEffect, useRef } from 'react';

import { FAQAccordion } from '@/components/faq/FAQAccordion';
import { FAQEmptyState } from '@/components/faq/FAQEmptyState';
import { Heading } from '@/components/typography/heading';
import { MutedText } from '@/components/typography/muted-text';
import { faqAnalyticsEvents, trackFaqEvent } from '@/lib/analytics/faq-events';
import { cn } from '@/lib/utils';
import type { PublicFaq } from '@/types/faq';

export type FAQSectionProps = {
  title?: string;
  description?: string;
  items: PublicFaq[];
  emptyTitle?: string;
  emptyDescription?: string;
  headingAs?: 'h2' | 'h3';
  titleId?: string;
  surface?: string;
  onItemOpen?: (faqId: string) => void;
  className?: string;
};

/**
 * Public FAQ section wrapper — Document 14.04.
 */
export function FAQSection({
  title,
  description,
  items,
  emptyTitle = 'No questions available',
  emptyDescription = 'Check back soon or contact support for help.',
  headingAs = 'h2',
  titleId,
  surface = 'section',
  onItemOpen,
  className,
}: FAQSectionProps) {
  const viewed = useRef(false);

  useEffect(() => {
    if (viewed.current || items.length === 0) return;
    viewed.current = true;
    trackFaqEvent(faqAnalyticsEvents.faq_section_view, {
      surface,
      resultCount: items.length,
    });
  }, [items.length, surface]);

  return (
    <div className={cn('w-full', className)}>
      {title || description ? (
        <div className="mb-8 max-w-2xl space-y-2">
          {title ? (
            <Heading as={headingAs} size="h2" id={titleId}>
              {title}
            </Heading>
          ) : null}
          {description ? <MutedText>{description}</MutedText> : null}
        </div>
      ) : null}

      {items.length === 0 ? (
        <FAQEmptyState title={emptyTitle} description={emptyDescription} />
      ) : (
        <FAQAccordion items={items} onItemOpen={onItemOpen} />
      )}
    </div>
  );
}
