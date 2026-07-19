import { ArticleContent } from '@/components/learn/article/ArticleContent';
import { ArticleFAQ } from '@/components/learn/article/ArticleFAQ';
import { ArticleFeaturedImage } from '@/components/learn/article/ArticleFeaturedImage';
import { ArticleHero } from '@/components/learn/article/ArticleHero';
import { ArticleShare } from '@/components/learn/article/ArticleShare';
import { ArticleSidebar } from '@/components/learn/article/ArticleSidebar';
import { AuthorBox } from '@/components/learn/article/AuthorBox';
import { KeyTakeaways } from '@/components/learn/article/KeyTakeaways';
import { ReadingProgress } from '@/components/learn/article/ReadingProgress';
import { RelatedArticles } from '@/components/learn/article/RelatedArticles';
import { RelatedServices } from '@/components/learn/article/RelatedServices';
import { TableOfContents } from '@/components/learn/article/TableOfContents';
import { CTASection } from '@/components/cta';
import { Container } from '@/components/layout/container';
import { Section } from '@/components/layout/section';
import { selectPageCtas } from '@/lib/ctas';
import {
  getArticleRelatedLinks,
  prepareArticleForRender,
} from '@/lib/learn/article';
import { absoluteUrl } from '@/seo/canonical';
import type { PublicLearnArticle } from '@/types/learn';

type ArticlePageProps = {
  article: PublicLearnArticle;
  /** Preview chrome for authorized editors only. */
  preview?: boolean;
};

/**
 * Reusable Learn article template — Document 15.02.
 * Optional sections render only when content exists.
 */
export function ArticlePage({ article, preview = false }: ArticlePageProps) {
  const prepared = prepareArticleForRender(article);
  const related = getArticleRelatedLinks(prepared.article);
  const ctas = selectPageCtas('learn');
  const canonical = absoluteUrl(prepared.article.href);

  return (
    <div className="overflow-x-hidden">
      <ReadingProgress />

      {preview ? (
        <div className="bg-amber-100 px-4 py-2 text-center text-sm text-amber-950">
          Preview mode — this draft is noindex and must not appear in the sitemap.
        </div>
      ) : null}

      <Section className="border-b border-neutral-200 bg-neutral-50">
        <Container>
          <div className="mx-auto max-w-[780px] py-10 md:py-14">
            <ArticleHero article={prepared.article} />
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_16rem]">
            <article
              data-learn-article
              className="mx-auto min-w-0 w-full max-w-[780px] space-y-10 lg:mx-0"
            >
              <div className="lg:hidden">
                <TableOfContents items={prepared.toc} />
              </div>

              {prepared.article.featuredImage ? (
                <ArticleFeaturedImage
                  image={prepared.article.featuredImage}
                  priority
                />
              ) : null}

              <ArticleContent blocks={prepared.blocks} />

              <KeyTakeaways items={prepared.article.keyTakeaways} />

              <RelatedServices
                services={related.services}
                prominentCta={prepared.article.serviceCta}
              />

              <ArticleFAQ items={prepared.article.faqs} />

              <AuthorBox authorId={prepared.article.authorId} />

              <RelatedArticles
                articles={related.articles}
                currentSlug={prepared.article.slug}
              />

              <ArticleShare url={canonical} title={prepared.article.title} />

              {ctas.primary ? (
                <CTASection
                  primary={ctas.primary}
                  secondary={ctas.secondary}
                  surface="learn"
                />
              ) : null}
            </article>

            <div className="hidden lg:block">
              <ArticleSidebar tocItems={prepared.toc} />
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}
