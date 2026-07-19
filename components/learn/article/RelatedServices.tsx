import Link from 'next/link';

import type { InternalLink } from '@/types/linking';
import type { LearnArticleServiceCta } from '@/types/learn';

type RelatedServicesProps = {
  title?: string;
  services: InternalLink[];
  /** Optional single prominent CTA from article data. */
  prominentCta?: LearnArticleServiceCta;
};

/**
 * Related services — Document 15.02 + 14.05.
 * Max one prominent CTA; additional links are restrained.
 */
export function RelatedServices({
  title = 'Related services',
  services,
  prominentCta,
}: RelatedServicesProps) {
  if (!prominentCta && services.length === 0) return null;

  return (
    <section aria-labelledby="article-related-services" className="space-y-4">
      <h2 id="article-related-services" className="text-2xl font-semibold text-neutral-900">
        {title}
      </h2>

      {prominentCta ? (
        <Link
          href={`/${prominentCta.serviceSlug}`}
          className="block border border-neutral-900 bg-neutral-900 px-5 py-4 text-white outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2"
        >
          <p className="font-semibold">{prominentCta.label}</p>
          {prominentCta.description ? (
            <p className="mt-1 text-sm text-neutral-200">{prominentCta.description}</p>
          ) : null}
        </Link>
      ) : null}

      {services.length > 0 ? (
        <ul className="grid gap-3 sm:grid-cols-2">
          {services.map((service) => (
            <li key={service.href}>
              <Link
                href={service.href}
                className="block border border-neutral-200 px-4 py-3 text-sm font-medium text-neutral-900 outline-none hover:border-neutral-400 focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2"
              >
                {service.label}
              </Link>
            </li>
          ))}
        </ul>
      ) : null}
    </section>
  );
}
