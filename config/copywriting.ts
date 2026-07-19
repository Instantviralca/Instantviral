/**
 * Writing mechanics (Document 07) — lengths, formatting, word-count targets.
 * Brand voice, tone, CTAs, EEAT, and AI search principles live in config/brand.ts
 * and are re-exported here so copy tooling has one import surface.
 */

import { brand } from '@/config/brand';
import type { CopyCharRange, CopyWordRange } from '@/types/copywriting';

export const copywriting = {
  /** Delegates to Brand Strategy (Document 07.5). */
  brandVoice: brand.voice.attributes,

  /** Delegates to Brand Strategy tone + explain-before-persuade. */
  tone: brand.tone.attributes,

  audience: brand.audience.summary,

  writingRules: [
    'Put the answer first.',
    'One idea per paragraph.',
    'Avoid fluff.',
    'Avoid keyword stuffing.',
    'Use descriptive H2/H3 headings.',
    'Write for humans first.',
    'Explain before persuading.',
  ] as const,

  /** Approved CTA labels — Brand Strategy is the source of truth. */
  ctaLabels: brand.ctaLabels,

  readingLevel: brand.readingLevel,

  formatting: {
    h1Once: true,
    preferBulletsWhereUseful: true,
    paragraphMaxSentences: 3,
    paragraphMaxWords: 60,
  },

  headings: {
    h1: { min: 20, max: 70 } satisfies CopyCharRange,
    h2: { min: 12, max: 60 } satisfies CopyCharRange,
    h3: { min: 10, max: 50 } satisfies CopyCharRange,
  },

  metaDescription: { min: 140, max: 160 } satisfies CopyCharRange,

  cta: {
    labelChars: { min: 2, max: 24 } satisfies CopyCharRange,
  },

  wordCounts: {
    homepage: {
      hero: { min: 80, max: 100 } satisfies CopyWordRange,
      sectionIntro: { min: 40, max: 70 } satisfies CopyWordRange,
      featureCard: { min: 20, max: 35 } satisfies CopyWordRange,
      faqAnswer: { min: 60, max: 120 } satisfies CopyWordRange,
    },
    service: {
      hero: { min: 100, max: 140 } satisfies CopyWordRange,
      benefit: { min: 60, max: 90 } satisfies CopyWordRange,
      featureBlock: { min: 40, max: 80 } satisfies CopyWordRange,
      faqAnswer: { min: 70, max: 150 } satisfies CopyWordRange,
    },
    learn: {
      introduction: { min: 80, max: 160 } satisfies CopyWordRange,
      summary: { min: 20, max: 40 } satisfies CopyWordRange,
      faqAnswer: { min: 60, max: 120 } satisfies CopyWordRange,
    },
  },

  seo: {
    onePrimaryKeywordPerPage: true,
    naturalSecondaryKeywords: true,
    descriptiveAnchorText: true,
    matchSearchIntent: true,
  },

  /** Brand Strategy AI search principles. */
  aiOverview: brand.aiSearchPrinciples.principles,

  /** Brand Strategy E-E-A-T principles. */
  eeat: brand.eeatPrinciples.principles,

  /** Brand vocabulary rules (preferred / restricted). */
  vocabulary: brand.vocabulary,

  messagingPillars: brand.messagingPillars,
} as const;

export type CopywritingConfig = typeof copywriting;
