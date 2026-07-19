import { ArticleSidebar } from '@/components/learn/ArticleSidebar';
import { NewsletterCTA } from '@/components/learn/NewsletterCTA';
import { ReadingProgress } from '@/components/learn/ReadingProgress';
import { RelatedArticles } from '@/components/learn/RelatedArticles';
import { RelatedServices } from '@/components/learn/RelatedServices';
import { Container } from '@/components/layout/container';
import { Section } from '@/components/layout/section';
import { Breadcrumb } from '@/components/navigation/breadcrumb';
import { Heading } from '@/components/typography/heading';
import { Lead } from '@/components/typography/lead';
import { MutedText } from '@/components/typography/muted-text';
import {
  getLearnArticleBreadcrumbs,
  getLearnRelatedArticlesForArticle,
  getLearnRelatedServicesForArticle,
} from '@/lib/learn';
import type { LearnTocItem, PublicLearnArticle } from '@/types/learn';
import type { ReactNode } from 'react';

type LearnArticleLayoutProps = {
  article: PublicLearnArticle;
  tocItems?: LearnTocItem[];
  /** Body content supplied by the future Article Template System. */
  children?: ReactNode;
};

/**
 * Semantic Learn article shell — Document 15.01 architecture only.
 * Does not invent article body copy; children come from the content layer / template.
 */
export function LearnArticleLayout({
  article,
  tocItems = [],
  children,
}: LearnArticleLayoutProps) {
  const breadcrumbs = getLearnArticleBreadcrumbs(article.slug);
  const relatedArticles = getLearnRelatedArticlesForArticle(article);
  const relatedServices = getLearnRelatedServicesForArticle(article);

  return (
    <div className="overflow-x-hidden">
      <ReadingProgress />
      <Section className="border-b border-neutral-200 bg-neutral-50">
        <Container>
          <div className="max-w-3xl space-y-4 py-10 md:py-14">
            <Breadcrumb items={breadcrumbs} />
            <MutedText className="text-xs uppercase tracking-wide">
              {article.categoryName} · {article.readingTime} min read
            </MutedText>
            <Heading as="h1">{article.title}</Heading>
            <Lead className="text-neutral-600">{article.excerpt}</Lead>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_16rem]">
            <article data-learn-article className="min-w-0 space-y-10">
              {children ?? (
                <MutedText>
                  Article body will render from the shared content layer via the
                  Article Template System. No placeholder copy is injected here.
                </MutedText>
              )}

              <RelatedServices services={relatedServices} />
              <RelatedArticles articles={relatedArticles} />
              <NewsletterCTA />
            </article>

            <ArticleSidebar tocItems={tocItems} />
          </div>
        </Container>
      </Section>
    </div>
  );
}
