import Link from 'next/link';

import { FeatureCard } from '@/components/cards/feature-card';
import { Container } from '@/components/layout/container';
import { Grid } from '@/components/layout/grid';
import { Section } from '@/components/layout/section';
import { Heading } from '@/components/typography/heading';
import { MutedText } from '@/components/typography/muted-text';
import { learnArticlePath } from '@/config/routes';
import { cn } from '@/lib/utils';
import type { LearnArticle } from '@/types/blog';

export type RelatedArticleCard = LearnArticle & {
  /** From LearnArticleContent.summary when available. */
  summary?: string;
};

export type RelatedArticlesProps = {
  title?: string;
  description?: string;
  articles: RelatedArticleCard[];
  className?: string;
};

export function RelatedArticles({
  title,
  description,
  articles,
  className,
}: RelatedArticlesProps) {
  return (
    <Section className={cn(className)} aria-label="Related articles">
      <Container>
        {(title || description) && (
          <div className="mb-8 max-w-2xl space-y-2">
            {title ? (
              <Heading as="h2" size="h2">
                {title}
              </Heading>
            ) : null}
            {description ? <MutedText>{description}</MutedText> : null}
          </div>
        )}
        <Grid cols={3} className="gap-4">
          {articles.map((article) => (
            <Link
              key={article.slug}
              href={learnArticlePath(article.slug)}
              className="block h-full rounded-lg focus-visible:outline-none"
            >
              <FeatureCard
                title={article.title}
                description={article.summary ?? article.title}
                className="h-full"
              />
            </Link>
          ))}
        </Grid>
      </Container>
    </Section>
  );
}
