import type { TrustBarItemContent } from '@/types/content';

export type TrustIconProps = {
  iconKey: TrustBarItemContent['iconKey'];
  className?: string;
};

export type TrustCardProps = {
  id: string;
  title: string;
  description: string;
  iconKey: TrustBarItemContent['iconKey'];
  className?: string;
};

export type TrustGridProps = {
  items: TrustCardProps[];
  className?: string;
};

export type TrustBarSectionProps = {
  className?: string;
  /** Defaults to homepage trustBar.id */
  id?: string;
};
