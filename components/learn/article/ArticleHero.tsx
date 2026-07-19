import { ArticleMeta } from '@/components/learn/article/ArticleMeta';
import { Breadcrumb } from '@/components/navigation/breadcrumb';
import { Eyebrow } from '@/components/typography/eyebrow';
import { Heading } from '@/components/typography/heading';
import { Lead } from '@/components/typography/lead';
import { getLearnArticleBreadcrumbs } from '@/lib/learn';
import type { PublicLearnArticle } from '@/types/learn';

type ArticleHeroProps = {
  article: PublicLearnArticle;
};

/**
 * Article hero — Document 15.02.
 * Single H1 from article data.
 */
export function ArticleHero({ article }: ArticleHeroProps) {
  const breadcrumbs = getLearnArticleBreadcrumbs(article.slug);

  return (
    <header className="space-y-4">
      <Breadcrumb items={breadcrumbs} />
      <Eyebrow>{article.categoryName}</Eyebrow>
      {article.featured ? (
        <p className="text-xs font-medium uppercase tracking-wide text-neutral-500">
          Featured
        </p>
      ) : null}
      <Heading as="h1" className="text-balance">
        {article.title}
      </Heading>
      <Lead className="text-pretty text-neutral-600">{article.excerpt}</Lead>
      <ArticleMeta article={article} />
    </header>
  );
}
