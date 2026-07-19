import { FinalCTA } from '@/components/marketing/final-cta';
import { MarketingFaq } from '@/components/marketing/faq';
import {
  ArticleHero,
  ContentBlocks,
  RelatedArticles,
  TableOfContents,
} from '@/components/sections/learn';
import { RelatedServices } from '@/components/sections/service/related-services';
import { Container } from '@/components/layout/container';
import { Section } from '@/components/layout/section';
import { Heading } from '@/components/typography/heading';
import { MutedText } from '@/components/typography/muted-text';
import { getLearnContentBySlug } from '@/data/content/learn';
import {
  resolveRelatedArticles,
  resolveRelatedServicesFromLearn,
} from '@/lib/content/linking';
import { mapLearnArticleContent } from '@/lib/content/mappers';
import { buildBreadcrumb } from '@/lib/linking';
import type { LearnArticleContent } from '@/types/content';

type LearnArticleViewProps = {
  slug: string;
  /** Optional override for tests / previews. */
  content?: LearnArticleContent;
};

/**
 * Learn article presentation driven by data/content/learn.ts.
 * Structure only — production article copy is Document 07+.
 */
export function LearnArticleView({ slug, content: contentProp }: LearnArticleViewProps) {
  const content = contentProp ?? getLearnContentBySlug(slug);

  if (!content) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-10">
        <p className="text-sm text-muted-foreground">
          Missing learn content for {slug}. Add it under data/content/learn.ts.
        </p>
      </div>
    );
  }

  const vm = mapLearnArticleContent(content);
  const relatedServices = resolveRelatedServicesFromLearn(content);
  const relatedArticles = resolveRelatedArticles(content.relatedArticles.articleSlugs, {
    excludeSlug: content.slug,
    platformId: content.platformId,
  });
  const breadcrumbs = buildBreadcrumb(`learn/${content.slug}`);

  const articleCards = relatedArticles.map((article) => {
    const relatedContent = getLearnContentBySlug(article.slug);
    return {
      ...article,
      summary: relatedContent?.summary,
    };
  });

  return (
    <>
      <ArticleHero
        title={vm.hero.title}
        description={vm.hero.description}
        breadcrumbs={breadcrumbs}
      />

      <Section aria-label={vm.introduction.title}>
        <Container className="max-w-3xl space-y-3">
          <Heading as="h2" size="h2">
            {vm.introduction.title}
          </Heading>
          <MutedText>{vm.introduction.text}</MutedText>
        </Container>
      </Section>

      <TableOfContents title={vm.tableOfContents.title} items={vm.tableOfContents.items} />
      <ContentBlocks blocks={vm.mainContent.blocks} />
      <MarketingFaq title={vm.faqs.title} items={vm.faqs.items} />
      <RelatedServices
        title={vm.relatedServices.title}
        description={vm.relatedServices.description}
        services={relatedServices}
      />
      <RelatedArticles
        title={vm.relatedArticles.title}
        description={vm.relatedArticles.description}
        articles={articleCards}
      />
      <FinalCTA {...vm.cta} />
    </>
  );
}
