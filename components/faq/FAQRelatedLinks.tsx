'use client';

import Link from 'next/link';

import { faqAnalyticsEvents, trackFaqEvent } from '@/lib/analytics/faq-events';
import { cn } from '@/lib/utils';
import type { FaqRelatedLink } from '@/types/faq';

export type FAQRelatedLinksProps = {
  links: FaqRelatedLink[];
  faqId?: string;
  className?: string;
};

/**
 * Data-driven related links for an FAQ answer.
 */
export function FAQRelatedLinks({
  links,
  faqId,
  className,
}: FAQRelatedLinksProps) {
  if (links.length === 0) return null;

  return (
    <ul className={cn('flex flex-wrap gap-2', className)}>
      {links.map((link) => (
        <li key={link.id}>
          <Link
            href={link.href}
            className="inline-flex min-h-11 items-center rounded-md border border-border bg-background px-3 text-sm text-foreground underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            data-analytics={faqAnalyticsEvents.faq_related_link_click}
            onClick={() =>
              trackFaqEvent(faqAnalyticsEvents.faq_related_link_click, {
                faqId,
                linkId: link.id,
                href: link.href,
              })
            }
          >
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}
