import type { ReactNode } from 'react';

import type { BreadcrumbItem } from '@/types/shared';

/** Shared CTA shape used across marketing + service sections. */
export type CtaProps = {
  label: string;
  href: string;
};

export type FaqItem = {
  id: string;
  question: string;
  answer: string;
  /** FAQ filter chip for service/homepage FAQ UI. */
  filterCategory?:
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
};

export type StatItem = {
  id: string;
  label: string;
  value: string;
};

export type TestimonialItem = {
  id: string;
  quote: string;
  author: string;
  role?: string;
  avatarSrc?: string;
};

export type ProcessStep = {
  id: string;
  title: string;
  description: string;
  icon?: ReactNode;
};

export type FeatureItem = {
  id: string;
  title: string;
  description: string;
  icon?: ReactNode;
};

export type BenefitItem = {
  id: string;
  title: string;
  description: string;
  icon?: ReactNode;
};

export type TocItem = {
  id: string;
  label: string;
  href: string;
};

export type ContentBlock =
  | { id: string; type: 'paragraph'; text: string }
  | { id: string; type: 'heading'; text: string; level?: 2 | 3 }
  | { id: string; type: 'list'; items: string[] };

export type SeoHeaderProps = {
  title: string;
  description?: string;
  breadcrumbs?: BreadcrumbItem[];
};
