'use client';

import { useEffect, useState } from 'react';

import { PlatformDashboard } from '@/components/illustrations/dashboards';
import {
  getHeroVisualFrameClassName,
  type HeroVisualFrameProps,
} from '@/components/design-system/hero-visual-frame';
import type { HeroVisualContent } from '@/types/content';

export type DeferredHeroVisualProps = HeroVisualFrameProps & {
  alt: string;
  packagePreview?: { title: string; priceLabel: string } | null;
  visual?: HeroVisualContent;
};

function scheduleIdle(callback: () => void): () => void {
  if (typeof globalThis.requestIdleCallback === 'function') {
    const id = globalThis.requestIdleCallback(callback, { timeout: 2500 });
    return () => globalThis.cancelIdleCallback(id);
  }
  const id = setTimeout(callback, 1);
  return () => clearTimeout(id);
}

/**
 * Loads the heavy platform dashboard after first paint (LCP-safe text column).
 */
export function DeferredHeroVisual({
  alt,
  packagePreview,
  platform,
  className,
  instagramVariant,
  tiktokVariant,
  youtubeVariant,
  facebookVariant,
}: DeferredHeroVisualProps) {
  const [showDashboard, setShowDashboard] = useState(false);

  useEffect(() => {
    return scheduleIdle(() => setShowDashboard(true));
  }, []);

  const frameClass = getHeroVisualFrameClassName({
    platform,
    className,
    instagramVariant,
    tiktokVariant,
    youtubeVariant,
    facebookVariant,
  });

  return (
    <div className={frameClass}>
      <span className="sr-only">{alt}</span>
      {showDashboard ? (
        <PlatformDashboard
          platform={platform ?? 'instagram'}
          packagePreview={packagePreview}
          instagramVariant={instagramVariant}
          tiktokVariant={tiktokVariant}
          youtubeVariant={youtubeVariant}
          facebookVariant={facebookVariant}
        />
      ) : null}
    </div>
  );
}
