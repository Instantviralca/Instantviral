import { ArticleCard } from '@/components/learn/ArticleCard';
import { Heading } from '@/components/typography/heading';
import { MutedText } from '@/components/typography/muted-text';
import { cn } from '@/lib/utils';
import type { PublicLearnArticle } from '@/types/learn';

type AuthorArticleListProps = {
  articles: PublicLearnArticle[];
  authorName: string;
  className?: string;
  title?: string;
};

/**
 * Published articles by author — Document 15.03.
 * Callers must pass published-only articles from getAuthorArticles().
 */
export function AuthorArticleList({
  articles,
  authorName,
  className,
  title = 'Published articles',
}: AuthorArticleListProps) {
  return (
    <section className={cn(className)} aria-labelledby="author-articles-heading">
      <Heading as="h2" id="author-articles-heading">
        {title}
      </Heading>
      {articles.length === 0 ? (
        <MutedText className="mt-3">
          No published articles by {authorName} yet.
        </MutedText>
      ) : (
        <ul className="mt-6 grid gap-4 sm:grid-cols-2">
          {articles.map((article) => (
            <li key={article.id}>
              <ArticleCard article={article} />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
