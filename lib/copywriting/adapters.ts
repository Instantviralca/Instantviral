/**
 * Adapters between copywriting types, content-layer types, and component props.
 * Component APIs stay unchanged — mappers consume these helpers.
 */

import type {
  BenefitItem,
  CtaProps,
  FaqItem,
  FeatureItem,
  TestimonialItem,
} from '@/types/components';
import type {
  CTAContent as ContentCTA,
  FAQItem,
  HeroContent,
  SectionContent,
  Testimonial,
  ContentListItem,
} from '@/types/content';
import type {
  ArticleContent,
  BenefitContent,
  CTAContent,
  FAQContent,
  FeatureContent,
  HeroCopy,
  SectionCopy,
  TestimonialContent,
} from '@/types/copywriting';
import type { LearnArticleContent } from '@/types/content';

export function toCtaProps(cta: CTAContent | ContentCTA | undefined): CtaProps | undefined {
  if (!cta) return undefined;
  return { label: cta.label, href: cta.href };
}

export function toRequiredCtaProps(cta: CTAContent | ContentCTA): CtaProps {
  return { label: cta.label, href: cta.href };
}

/** Strip architecture metadata → pure HeroCopy. */
export function toHeroCopy(hero: HeroContent | HeroCopy): HeroCopy {
  return {
    eyebrow: hero.eyebrow,
    title: hero.title,
    description: hero.description,
    primaryCta: hero.primaryCta,
    secondaryCta: hero.secondaryCta,
    microcopy: hero.microcopy,
  };
}

/** HeroCopy → marketing / service hero props (no API change). */
export function heroCopyToProps(copy: HeroCopy): {
  eyebrow?: string;
  title: string;
  description?: string;
  primaryCta?: CtaProps;
  secondaryCta?: CtaProps;
  microcopy?: string;
} {
  return {
    eyebrow: copy.eyebrow,
    title: copy.title,
    description: copy.description,
    primaryCta: toCtaProps(copy.primaryCta),
    secondaryCta: toCtaProps(copy.secondaryCta),
    microcopy: copy.microcopy,
  };
}

export function toSectionCopy(
  section: Pick<SectionContent, 'title' | 'description'> | SectionCopy,
): SectionCopy {
  return {
    title: section.title,
    description: section.description,
  };
}

export function sectionCopyToProps(copy: SectionCopy): {
  title?: string;
  description?: string;
} {
  return {
    title: copy.title,
    description: copy.description,
  };
}

export function toFaqContent(item: FAQItem | FAQContent): FAQContent {
  return {
    id: item.id,
    question: item.question,
    answer: item.answer,
  };
}

export function faqContentToProps(items: Array<FAQContent | FAQItem>): FaqItem[] {
  return items.map((item) => {
    const filterCategory: FaqItem['filterCategory'] =
      'homepageFilter' in item
        ? item.homepageFilter
        : 'filterCategory' in item
          ? (item as FaqItem).filterCategory
          : undefined;

    return {
      id: item.id,
      question: item.question,
      answer: item.answer,
      filterCategory,
    };
  });
}

export function toFeatureContent(item: ContentListItem | FeatureContent): FeatureContent {
  return {
    id: item.id,
    title: item.title,
    description: item.description,
  };
}

export function featureContentToProps(
  items: Array<FeatureContent | ContentListItem>,
): FeatureItem[] {
  return items.map((item) => ({
    id: item.id,
    title: item.title,
    description: item.description,
  }));
}

export function toBenefitContent(item: ContentListItem | BenefitContent): BenefitContent {
  return {
    id: item.id,
    title: item.title,
    description: item.description,
  };
}

export function benefitContentToProps(
  items: Array<BenefitContent | ContentListItem>,
): BenefitItem[] {
  return items.map((item) => ({
    id: item.id,
    title: item.title,
    description: item.description,
  }));
}

export function toTestimonialContent(item: Testimonial | TestimonialContent): TestimonialContent {
  return {
    id: item.id,
    quote: item.quote,
    author: item.author,
    role: item.role,
    avatarSrc: item.avatarSrc,
  };
}

export function testimonialContentToProps(
  items: Array<TestimonialContent | Testimonial>,
): TestimonialItem[] {
  return items.map((item) => ({
    id: item.id,
    quote: item.quote,
    author: item.author,
    role: item.role,
    avatarSrc: item.avatarSrc,
  }));
}

/** Learn content document → ArticleContent for validation / writing tooling. */
export function toArticleContent(article: LearnArticleContent): ArticleContent {
  return {
    title: article.hero.title,
    summary: article.summary,
    introduction: article.introduction.text,
    faqs: article.faqs.items.map(toFaqContent),
    cta: {
      title: article.cta.title,
      description: article.cta.description,
      primaryCta: article.cta.primaryCta,
      secondaryCta: article.cta.secondaryCta,
    },
  };
}

export function finalCtaCopyToProps(input: {
  title: string;
  description?: string;
  primaryCta: CTAContent | ContentCTA;
  secondaryCta?: CTAContent | ContentCTA;
}): {
  title: string;
  description?: string;
  primaryCta: CtaProps;
  secondaryCta?: CtaProps;
} {
  return {
    title: input.title,
    description: input.description,
    primaryCta: toRequiredCtaProps(input.primaryCta),
    secondaryCta: toCtaProps(input.secondaryCta),
  };
}
