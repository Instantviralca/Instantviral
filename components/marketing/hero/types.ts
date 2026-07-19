import type { ReactNode } from 'react';

import type { CtaProps } from '@/types/components';
import type { HeroVisualContent, TrustBarItemContent } from '@/types/content';
import type { PlatformId } from '@/types/platform';

export type HeroContentProps = {
  eyebrow?: string;
  title: string;
  description: string;
  className?: string;
};

export type HeroActionsProps = {
  primaryCta?: CtaProps;
  secondaryCta?: CtaProps;
  /** Editable microcopy under CTAs (from homepage content). */
  microcopy?: string;
  className?: string;
};

export type HeroTrustBarProps = {
  items: TrustBarItemContent[];
  className?: string;
};

export type PlatformBadgeProps = {
  id: PlatformId | string;
  label: string;
  href: string;
  className?: string;
};

export type HeroVisualProps = {
  visual: HeroVisualContent;
  platforms: PlatformBadgeProps[];
  className?: string;
};

export type HeroSectionProps = {
  /** Optional override; defaults to data/content/homepage.ts */
  className?: string;
  /** Slot override for illustration (tests / future compositions). */
  visualSlot?: ReactNode;
};
