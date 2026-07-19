import { AuthorArticleList } from '@/components/authors/AuthorArticleList';
import { AuthorHero } from '@/components/authors/AuthorHero';
import { AuthorSidebar } from '@/components/authors/AuthorSidebar';
import { Container } from '@/components/layout/container';
import { Section } from '@/components/layout/section';
import type { PublicAuthor } from '@/types/author';
import type { LearnCategory, PublicLearnArticle } from '@/types/learn';

type AuthorPageViewProps = {
  author: PublicAuthor;
  articles: PublicLearnArticle[];
  relatedCategories: LearnCategory[];
};

/**
 * Full author profile layout — Document 15.03.
 */
export function AuthorPageView({
  author,
  articles,
  relatedCategories,
}: AuthorPageViewProps) {
  return (
    <>
      <AuthorHero author={author} />
      <Section>
        <Container>
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_16rem]">
            <AuthorArticleList articles={articles} authorName={author.name} />
            <AuthorSidebar
              author={author}
              relatedCategories={relatedCategories}
              className="lg:border-l lg:border-neutral-200 lg:pl-8"
            />
          </div>
        </Container>
      </Section>
    </>
  );
}
