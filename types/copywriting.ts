/**
 * Copywriting system types (Document 07).
 * These describe writing-ready copy nodes. Page architecture lives in types/content.ts
 * and extends / composes these shapes.
 */

import type { FAQCategoryId } from '@/types/faq';

export type { FAQCategoryId } from '@/types/faq';

/** Call-to-action label + destination. */
export type CTAContent = {
  label: string;
  href: string;
};

/** Hero copy block (homepage, service, learn, company). */
export type HeroCopy = {
  eyebrow?: string;
  title: string;
  description: string;
  primaryCta?: CTAContent;
  secondaryCta?: CTAContent;
  /** Optional line under CTAs (e.g. login reassurance). */
  microcopy?: string;
};

/** Generic section intro copy. */
export type SectionCopy = {
  title: string;
  description?: string;
};

/** Single FAQ pair (legacy copywriting shape — prefer FaqRecord from types/faq). */
export type FAQContent = {
  id: string;
  question: string;
  answer: string;
  /**
   * FAQ hub category (Document 13.03 / 14.04).
   * When set and active, the item appears on the /faq page.
   */
  category?: FAQCategoryId;
  /**
   * Homepage / service FAQ filter chip label (UI only — not FAQ hub membership).
   */
  homepageFilter?:
    | 'General'
    | 'Orders'
    | 'Delivery'
    | 'Safety'
    | 'Platforms'
    | 'Packages'
    | 'Channel Requirements'
    | 'Video Requirements'
    | 'Page Requirements'
    | 'Post Requirements'
    | 'Support';
  keywords?: string[];
  relatedServiceSlugs?: string[];
  /** Ascending sort order within a category. */
  order?: number;
  /** Defaults to true when omitted. Maps to Approved vs Hidden in the FAQ system. */
  active?: boolean;
};

/** Feature card / feature block copy. */
export type FeatureContent = {
  id: string;
  title: string;
  description: string;
};

/** Benefit item copy (service pages). */
export type BenefitContent = {
  id: string;
  title: string;
  description: string;
};

/** Testimonial / social-proof quote. */
export type TestimonialContent = {
  id: string;
  quote: string;
  author: string;
  role?: string;
  avatarSrc?: string;
};

/**
 * Article body copy shell for Learn.
 * Structural blocks remain ContentBlock[] at the content layer;
 * this type captures writing-facing article fields.
 */
export type ArticleContent = {
  title: string;
  summary: string;
  introduction: string;
  /** Optional meta description draft for SEO validation. */
  metaDescription?: string;
  faqs?: FAQContent[];
  cta?: {
    title: string;
    description?: string;
    primaryCta: CTAContent;
    secondaryCta?: CTAContent;
  };
};

/** Word-count range used by validation + config. */
export type CopyWordRange = {
  min: number;
  max: number;
};

/** Character-count range (headings, meta, CTAs). */
export type CopyCharRange = {
  min: number;
  max: number;
};

/** Result of a single copywriting validation check. */
export type CopyValidationResult = {
  ok: boolean;
  rule: string;
  actual: number;
  min?: number;
  max?: number;
  message: string;
};
