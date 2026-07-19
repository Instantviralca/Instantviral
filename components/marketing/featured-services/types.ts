import type { PlatformId } from '@/types/platform';

export type ServicePlatformBadgeProps = {
  platformId: PlatformId;
  label: string;
  href?: string;
  className?: string;
};

export type ServiceCTAProps = {
  label: string;
  href: string;
  /** Accessible name when label alone is too generic. */
  ariaLabel?: string;
  className?: string;
};

export type FeaturedServiceCardProps = {
  platformId: PlatformId;
  platformName: string;
  platformHref?: string;
  title: string;
  description: string;
  benefit?: string;
  href: string;
  ctaLabel: string;
  badge?: string;
  className?: string;
};

export type FeaturedServicesGridProps = {
  cards: FeaturedServiceCardProps[];
  className?: string;
};

export type FeaturedServicesSectionProps = {
  className?: string;
  id?: string;
};
