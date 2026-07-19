import type { PlatformId } from '@/types/platform';

import type { PlatformSelectorPreviewItem } from '@/lib/content/platform-selector';

export type PlatformIconProps = {
  platformId: PlatformId;
  /** Lucide / registry icon key from data/platforms.ts */
  iconKey: string;
  className?: string;
};

export type PlatformServicesPreviewProps = {
  items: PlatformSelectorPreviewItem[];
  className?: string;
};

export type PlatformCTAProps = {
  label: string;
  href: string;
  className?: string;
};

export type PlatformCardProps = {
  platformId: PlatformId;
  name: string;
  description: string;
  iconKey: string;
  href: string;
  ctaLabel: string;
  previewServices: PlatformSelectorPreviewItem[];
  className?: string;
};

export type PlatformSelectorGridProps = {
  cards: PlatformCardProps[];
  className?: string;
};

export type PlatformSelectorSectionProps = {
  className?: string;
  /** Optional id override; defaults to homepage platformGrid.id */
  id?: string;
};
