import { ArticleCard } from '@/components/learn/ArticleCard';
import { Heading } from '@/components/typography/heading';
import { MutedText } from '@/components/typography/muted-text';
import type { PublicLearnArticle } from '@/types/learn';

type RelatedArticlesProps = {
  title?: string;
  description?: string;
  articles: PublicLearnArticle[];
};

/**
 * Related Learn articles — Document 15.01 + 14.05.
 * Articles supplied by the linking/helpers layer (not hardcoded).
 */
export function RelatedArticles({
  title = 'Related articles',
  description,
  articles,
}: RelatedArticlesProps) {
  if (articles.length === 0) return null;

  return (
    <section aria-labelledby="learn-related-articles-heading" className="overflow-x-hidden">
      <Heading as="h2" id="learn-related-articles-heading">
        {title}
      </Heading>
      {description ? <MutedText className="mt-2">{description}</MutedText> : null}
      <ul className="mt-6 grid gap-4 sm:grid-cols-2">
        {articles.map((article) => (
          <li key={article.id}>
            <ArticleCard article={article} />
          </li>
        ))}
      </ul>
    </section>
  );
}
