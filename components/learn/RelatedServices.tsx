import Link from 'next/link';

import { Heading } from '@/components/typography/heading';
import { MutedText } from '@/components/typography/muted-text';
import type { InternalLink } from '@/types/linking';

type RelatedServicesProps = {
  title?: string;
  description?: string;
  services: InternalLink[];
};

/**
 * Related services for Learn articles — Document 15.01 + 14.05.
 * Links come from the Internal Linking Engine.
 */
export function RelatedServices({
  title = 'Related services',
  description,
  services,
}: RelatedServicesProps) {
  if (services.length === 0) return null;

  return (
    <section aria-labelledby="learn-related-services-heading" className="overflow-x-hidden">
      <Heading as="h2" id="learn-related-services-heading">
        {title}
      </Heading>
      {description ? <MutedText className="mt-2">{description}</MutedText> : null}
      <ul className="mt-6 grid gap-3 sm:grid-cols-2">
        {services.map((service) => (
          <li key={service.href}>
            <Link
              href={service.href}
              className="block border border-neutral-200 px-4 py-3 text-sm font-medium text-neutral-900 outline-none transition-colors hover:border-neutral-400 focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2"
            >
              {service.label}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
