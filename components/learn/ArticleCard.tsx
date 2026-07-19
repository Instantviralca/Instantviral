import Link from 'next/link';

import { cn } from '@/lib/utils';
import type { PublicLearnArticle } from '@/types/learn';

type ArticleCardProps = {
  article: PublicLearnArticle;
  className?: string;
};

/**
 * Learn article card — Document 15.01.
 * Keyboard-focusable link wrapping semantic article summary.
 */
export function ArticleCard({ article, className }: ArticleCardProps) {
  return (
    <article
      className={cn(
        'group flex h-full flex-col border border-neutral-200 bg-white p-5 transition-colors hover:border-neutral-400',
        className,
      )}
    >
      <p className="text-xs font-medium uppercase tracking-wide text-neutral-500">
        {article.categoryName}
      </p>
      <h3 className="mt-2 text-lg font-semibold text-neutral-900">
        <Link
          href={article.href}
          className="rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2"
        >
          <span className="group-hover:underline">{article.title}</span>
        </Link>
      </h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-neutral-600">
        {article.excerpt}
      </p>
      <p className="mt-4 text-xs text-neutral-500">
        {article.readingTime} min read
      </p>
    </article>
  );
}
