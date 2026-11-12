import { DeferredHeroVisual } from '@/components/design-system/deferred-hero-visual';
import {
  getHeroVisualFrameClassName,
  type HeroVisualFrameProps,
} from '@/components/design-system/hero-visual-frame';
import type { PlatformId } from '@/types/platform';

type HeroVisualStackProps = HeroVisualFrameProps & {
  src: string;
  alt: string;
  width: number;
  height: number;
  platform?: PlatformId;
  priority?: boolean;
  badges?: Array<{ id: string; label: string }>;
  packagePreview?: { title: string; priceLabel: string } | null;
};

/**
 * Layered hero visual — defers client dashboard until after idle (see DeferredHeroVisual).
 */
export function HeroVisualStack({
  alt,
  platform = 'instagram',
  className,
  packagePreview,
  instagramVariant,
  tiktokVariant,
  youtubeVariant,
  facebookVariant,
}: HeroVisualStackProps) {
  return (
    <DeferredHeroVisual
      alt={alt}
      platform={platform}
      className={className}
      packagePreview={packagePreview}
      instagramVariant={instagramVariant}
      tiktokVariant={tiktokVariant}
      youtubeVariant={youtubeVariant}
      facebookVariant={facebookVariant}
    />
  );
}

export { getHeroVisualFrameClassName };
