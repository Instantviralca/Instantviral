import { ArticleCard } from '@/components/learn/ArticleCard';
import { Container } from '@/components/layout/container';
import { Section } from '@/components/layout/section';
import { Heading } from '@/components/typography/heading';
import { MutedText } from '@/components/typography/muted-text';
import type { PublicLearnArticle } from '@/types/learn';

type FeaturedArticlesProps = {
  title?: string;
  description?: string;
  articles: PublicLearnArticle[];
};

/**
 * Featured Learn articles grid — Document 15.01.
 * Renders nothing when the published set is empty (no placeholders).
 */
export function FeaturedArticles({
  title = 'Featured guides',
  description = 'Editor-selected Learn articles.',
  articles,
}: FeaturedArticlesProps) {
  if (articles.length === 0) return null;

  return (
    <Section>
      <Container>
        <div className="mb-8 max-w-2xl">
          <Heading as="h2">{title}</Heading>
          <MutedText className="mt-2">{description}</MutedText>
        </div>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <li key={article.id}>
              <ArticleCard article={article} />
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
