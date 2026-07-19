import Link from 'next/link';

import type { PublicLearnArticle } from '@/types/learn';

type RelatedArticlesProps = {
  title?: string;
  articles: PublicLearnArticle[];
  currentSlug?: string;
};

/**
 * Related articles — Document 15.02.
 * Excludes drafts and the current article (caller should already filter).
 */
export function RelatedArticles({
  title = 'Related articles',
  articles,
  currentSlug,
}: RelatedArticlesProps) {
  const items = articles.filter((article) => article.slug !== currentSlug);
  if (items.length === 0) return null;

  return (
    <section aria-labelledby="article-related-articles" className="space-y-4">
      <h2 id="article-related-articles" className="text-2xl font-semibold text-neutral-900">
        {title}
      </h2>
      <ul className="grid gap-3 sm:grid-cols-2">
        {items.map((article) => (
          <li key={article.id}>
            <Link
              href={article.href}
              className="block border border-neutral-200 p-4 outline-none transition-colors hover:border-neutral-400 focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2"
            >
              <p className="text-xs uppercase tracking-wide text-neutral-500">
                {article.categoryName}
              </p>
              <p className="mt-1 font-medium text-neutral-900">{article.title}</p>
              <p className="mt-2 text-sm text-neutral-600 line-clamp-2">
                {article.excerpt}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
