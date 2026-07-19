import Image from 'next/image';
import Link from 'next/link';

import { Container } from '@/components/layout/container';
import { Section } from '@/components/layout/section';
import { FadeUp } from '@/components/motion/fade-up';
import { Heading } from '@/components/typography/heading';
import { MutedText } from '@/components/typography/muted-text';
import { Button } from '@/components/ui/button';
import { learnArticlePath } from '@/config/routes';
import {
  getLatestPublicArticles,
  getPopularPublicArticles,
} from '@/lib/learn/contextual-links';
import { cn } from '@/lib/utils';
import type { PublicLearnArticle } from '@/types/learn';

function formatGuideDate(iso?: string) {
  if (!iso) return null;
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return null;
  return date.toLocaleDateString('en-CA', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

function excerptWords(text: string, maxWords = 22) {
  const words = text.trim().split(/\s+/).filter(Boolean);
  if (words.length <= maxWords) return text.trim();
  return `${words.slice(0, maxWords).join(' ')}…`;
}

function ctaLabel(article: PublicLearnArticle): string {
  switch (article.category) {
    case 'instagram':
      return 'Instagram growth guide';
    case 'tiktok':
      return 'TikTok growth guide';
    case 'facebook':
      return 'Facebook growth guide';
    case 'youtube':
      return 'YouTube growth guide';
    case 'guides':
      return 'Social media guide';
    default:
      return 'Marketing guide';
  }
}

function ArticleGrid({
  id,
  title,
  description,
  articles,
  className,
}: {
  id: string;
  title: string;
  description: string;
  articles: PublicLearnArticle[];
  className?: string;
}) {
  if (articles.length === 0) return null;

  return (
    <Section
      id={id}
      spacing="lg"
      className={cn('bg-hero-wash', className)}
      aria-labelledby={`${id}-heading`}
    >
      <Container size="xl">
        <FadeUp className="mb-8 max-w-2xl space-y-2">
          <Heading as="h2" size="h2" id={`${id}-heading`}>
            {title}
          </Heading>
          <MutedText>{description}</MutedText>
        </FadeUp>

        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((article, index) => {
            const href = learnArticlePath(article.slug);
            const dateLabel = formatGuideDate(
              article.showModifiedDate ? article.updatedAt : article.publishedAt,
            );
            const excerpt = excerptWords(article.excerpt, 22);
            const image = article.featuredImage;

            return (
              <li key={`${id}-${article.id}`}>
                <FadeUp delay={0.04 * index} className="h-full">
                  <article className="flex h-full flex-col overflow-hidden rounded-[20px] border border-[var(--border-subtle)] bg-white shadow-[var(--shadow-sm)] transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-[var(--shadow-md)]">
                    <div className="relative aspect-video overflow-hidden bg-[var(--surface-muted)]">
                      {image ? (
                        <Image
                          src={image.src}
                          alt={image.alt}
                          width={image.width}
                          height={image.height}
                          className="h-full w-full object-cover"
                          loading="lazy"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                      ) : null}
                    </div>
                    <div className="flex flex-1 flex-col p-5">
                      <p className="text-[11px] font-semibold tracking-wide text-[var(--brand-primary)] uppercase">
                        {article.categoryName}
                      </p>
                      <h3 className="mt-1.5 text-base font-bold leading-snug text-[var(--text-primary)]">
                        {article.title}
                      </h3>
                      {excerpt ? (
                        <p className="mt-2 flex-1 text-sm leading-relaxed text-[var(--text-secondary)]">
                          {excerpt}
                        </p>
                      ) : (
                        <div className="flex-1" />
                      )}
                      <p className="mt-3 text-xs text-[var(--text-muted)]">
                        {[dateLabel, `${article.readingTime} min read`]
                          .filter(Boolean)
                          .join(' · ')}
                      </p>
                      <Button
                        asChild
                        variant="outline"
                        className="mt-4 min-h-11 w-full rounded-xl"
                      >
                        <Link href={href} aria-label={`Read ${article.title}`}>
                          {ctaLabel(article)}
                        </Link>
                      </Button>
                    </div>
                  </article>
                </FadeUp>
              </li>
            );
          })}
        </ul>
      </Container>
    </Section>
  );
}

/**
 * Homepage Learn discovery — Latest Articles + Popular Guides.
 * Reuses existing card styling from GuidesSection (no redesign).
 */
export function HomepageLearnSections({ className }: { className?: string }) {
  const latest = getLatestPublicArticles(6);
  const popular = getPopularPublicArticles(6).filter(
    (article) => !latest.some((item) => item.slug === article.slug),
  );
  // Prefer full popular set; fill from latest leftovers if needed to reach 6 without dupes in popular section only
  const popularUnique = getPopularPublicArticles(12)
    .filter((article) => !latest.slice(0, 3).some((item) => item.slug === article.slug))
    .slice(0, 6);

  const popularCards = popularUnique.length >= 4 ? popularUnique : popular.length ? popular : latest;

  return (
    <>
      <ArticleGrid
        id="home-latest-articles"
        title="Latest Articles"
        description="Recently updated InstantViral Learn guides across Instagram, TikTok, YouTube, Facebook and social media marketing."
        articles={latest}
        className={className}
      />
      <ArticleGrid
        id="home-popular-guides"
        title="Popular Guides"
        description="High-demand growth guides readers use to build audiences and improve social media performance."
        articles={popularCards.slice(0, 6)}
      />
    </>
  );
}
