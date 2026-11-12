import Link from 'next/link';

import { Container } from '@/components/layout/container';
import { Section } from '@/components/layout/section';
import { Heading } from '@/components/typography/heading';
import { MutedText } from '@/components/typography/muted-text';
import { cn } from '@/lib/utils';
import type { InternalLink } from '@/types/linking';

export type ServiceRelatedArticlesProps = {
  id?: string;
  title?: string;
  description?: string;
  articles: InternalLink[];
  className?: string;
  /** Simple one-link-per-line list — no card grid (Guides on this topic). */
  layout?: 'grid' | 'stack';
};

/**
 * Related Learn articles on commercial service pages.
 * Reuses existing section spacing/typography — no new visual system.
 */
export function ServiceRelatedArticles({
  id = 'related-articles',
  title = 'Related Articles',
  description = 'Guides from the InstantViral Learn Center that pair with this service.',
  articles,
  className,
  layout = 'grid',
}: ServiceRelatedArticlesProps) {
  if (articles.length === 0) return null;

  return (
    <Section id={id} className={cn('border-t border-neutral-200', className)}>
      <Container>
        <div className={cn(layout === 'stack' ? 'max-w-3xl' : 'mx-auto max-w-3xl text-center')}>
          <Heading as="h2" className="text-2xl font-semibold text-neutral-900 sm:text-3xl">
            {title}
          </Heading>
          {description ? (
            <MutedText className="mt-3 text-base text-neutral-600">
              {description}
            </MutedText>
          ) : null}
        </div>
        {layout === 'stack' ? (
          <ul className="mt-6 max-w-3xl space-y-2">
            {articles.map((article) => (
              <li key={article.slug}>
                <Link
                  href={article.href}
                  className="font-medium text-neutral-900 underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2"
                >
                  {article.label}
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <ul className="mx-auto mt-8 grid max-w-4xl gap-3 sm:grid-cols-2">
            {articles.map((article) => (
              <li key={article.slug}>
                <Link
                  href={article.href}
                  className="block border border-neutral-200 p-4 outline-none transition-colors hover:border-neutral-400 focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2"
                >
                  <p className="font-medium text-neutral-900">{article.label}</p>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </Container>
    </Section>
  );
}
