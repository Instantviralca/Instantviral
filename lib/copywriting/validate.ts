import { copywriting } from '@/config/copywriting';
import {
  validateApprovedCtaLabel,
  validateHeadingTone,
  validateRestrictedVocabulary,
} from '@/lib/brand/validation';
import {
  allValid,
  summarizeValidation,
  validateCharCount,
  validateWordCount,
} from '@/lib/copywriting/count';
import type {
  ArticleContent,
  BenefitContent,
  CopyValidationResult,
  CTAContent,
  FAQContent,
  FeatureContent,
  HeroCopy,
  SectionCopy,
} from '@/types/copywriting';

export type PageCopyContext = 'homepage' | 'service' | 'learn';

/** Validate heading length against config (H1 / H2 / H3). */
export function validateHeadingLength(
  heading: string,
  level: 1 | 2 | 3 = 2,
): CopyValidationResult {
  const range =
    level === 1
      ? copywriting.headings.h1
      : level === 3
        ? copywriting.headings.h3
        : copywriting.headings.h2;

  return validateCharCount(heading, range, `heading-h${level}`);
}

/** Validate meta description length (140–160 chars). */
export function validateMetaDescriptionLength(description: string): CopyValidationResult {
  return validateCharCount(description, copywriting.metaDescription, 'meta-description');
}

/** Validate CTA label length. */
export function validateCtaLength(cta: CTAContent | string): CopyValidationResult {
  const label = typeof cta === 'string' ? cta : cta.label;
  return validateCharCount(label, copywriting.cta.labelChars, 'cta-label');
}

/** Validate hero description word count for a page context. */
export function validateHeroWordCount(
  hero: HeroCopy | string,
  context: PageCopyContext = 'homepage',
): CopyValidationResult {
  const text = typeof hero === 'string' ? hero : hero.description;
  const range =
    context === 'service'
      ? copywriting.wordCounts.service.hero
      : context === 'learn'
        ? copywriting.wordCounts.learn.introduction
        : copywriting.wordCounts.homepage.hero;

  return validateWordCount(text, range, `hero-${context}`);
}

/** Validate FAQ answer length for a page context. */
export function validateFaqAnswerLength(
  faq: FAQContent | string,
  context: PageCopyContext = 'homepage',
): CopyValidationResult {
  const text = typeof faq === 'string' ? faq : faq.answer;
  const range =
    context === 'service'
      ? copywriting.wordCounts.service.faqAnswer
      : context === 'learn'
        ? copywriting.wordCounts.learn.faqAnswer
        : copywriting.wordCounts.homepage.faqAnswer;

  return validateWordCount(text, range, `faq-answer-${context}`);
}

export function validateSectionIntro(
  section: SectionCopy | string,
  context: PageCopyContext = 'homepage',
): CopyValidationResult {
  const text = typeof section === 'string' ? section : (section.description ?? '');
  const range =
    context === 'service'
      ? copywriting.wordCounts.service.featureBlock
      : copywriting.wordCounts.homepage.sectionIntro;

  return validateWordCount(text, range, `section-intro-${context}`);
}

export function validateFeatureCopy(
  feature: FeatureContent | string,
  context: PageCopyContext = 'homepage',
): CopyValidationResult {
  const text = typeof feature === 'string' ? feature : feature.description;
  const range =
    context === 'service'
      ? copywriting.wordCounts.service.featureBlock
      : copywriting.wordCounts.homepage.featureCard;

  return validateWordCount(text, range, `feature-${context}`);
}

export function validateBenefitCopy(benefit: BenefitContent | string): CopyValidationResult {
  const text = typeof benefit === 'string' ? benefit : benefit.description;
  return validateWordCount(text, copywriting.wordCounts.service.benefit, 'benefit');
}

/** Validate a full hero block (title + description + CTAs) including brand rules. */
export function validateHeroCopy(
  hero: HeroCopy,
  context: PageCopyContext = 'homepage',
): CopyValidationResult[] {
  const results: CopyValidationResult[] = [
    ...validateHeadingTone(hero.title, 1),
    validateHeroWordCount(hero, context),
    validateRestrictedVocabulary(hero.description),
  ];

  if (hero.primaryCta) {
    results.push(validateCtaLength(hero.primaryCta));
    results.push(validateApprovedCtaLabel(hero.primaryCta));
  }
  if (hero.secondaryCta) {
    results.push(validateCtaLength(hero.secondaryCta));
    results.push(validateApprovedCtaLabel(hero.secondaryCta));
  }

  return results;
}

export function validateFaqCopy(
  faq: FAQContent,
  context: PageCopyContext = 'homepage',
): CopyValidationResult[] {
  return [
    validateHeadingLength(faq.question, 3),
    validateFaqAnswerLength(faq, context),
  ];
}

export function validateArticleCopy(article: ArticleContent): CopyValidationResult[] {
  const results: CopyValidationResult[] = [
    validateHeadingLength(article.title, 1),
    validateWordCount(
      article.summary,
      copywriting.wordCounts.learn.summary,
      'article-summary',
    ),
    validateWordCount(
      article.introduction,
      copywriting.wordCounts.learn.introduction,
      'article-introduction',
    ),
  ];

  if (article.metaDescription) {
    results.push(validateMetaDescriptionLength(article.metaDescription));
  }

  for (const faq of article.faqs ?? []) {
    results.push(...validateFaqCopy(faq, 'learn'));
  }

  if (article.cta?.primaryCta) {
    results.push(validateCtaLength(article.cta.primaryCta));
  }

  return results;
}

export function isCopyValid(results: CopyValidationResult[]): boolean {
  return allValid(results);
}

export { summarizeValidation };
