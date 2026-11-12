import type {
  FacebookDashboardVariant,
  InstagramDashboardVariant,
  TikTokDashboardVariant,
  YouTubeDashboardVariant,
} from '@/components/illustrations/dashboards';
import { cn } from '@/lib/utils';
import type { PlatformId } from '@/types/platform';

export type HeroVisualFrameProps = {
  platform?: PlatformId;
  className?: string;
  instagramVariant?: InstagramDashboardVariant;
  tiktokVariant?: TikTokDashboardVariant;
  youtubeVariant?: YouTubeDashboardVariant;
  facebookVariant?: FacebookDashboardVariant;
};

/** Shared min-height / padding for hero dashboard placeholders (CLS-safe). */
export function getHeroVisualFrameClassName({
  platform = 'instagram',
  className,
  instagramVariant,
  tiktokVariant,
  youtubeVariant,
  facebookVariant,
}: HeroVisualFrameProps): string {
  const isCompactInstagram =
    instagramVariant === 'likes' ||
    instagramVariant === 'views' ||
    instagramVariant === 'comments';
  const isTikTokPhoneHero =
    platform === 'tiktok' &&
    (tiktokVariant === 'followers' ||
      tiktokVariant === 'likes' ||
      tiktokVariant === 'views');
  const isYouTubeHero =
    platform === 'youtube' &&
    (youtubeVariant === 'subscribers' || youtubeVariant === 'views');
  const isFacebookHero =
    platform === 'facebook' &&
    (facebookVariant === 'followers' ||
      facebookVariant === 'page-likes' ||
      facebookVariant === 'post-likes');

  return cn(
    'relative mx-auto flex w-full items-center justify-center overflow-visible',
    isCompactInstagram
      ? instagramVariant === 'comments'
        ? 'min-h-[20rem] px-2 py-3 sm:min-h-[22.5rem] sm:px-4 sm:py-4 lg:min-h-[24rem]'
        : 'min-h-[18rem] px-4 py-4 sm:min-h-[20.5rem] sm:px-6 sm:py-5 lg:min-h-[22rem] lg:px-8'
      : isTikTokPhoneHero
        ? 'min-h-[18.5rem] px-3 py-2 sm:min-h-[21rem] sm:px-4 sm:py-3 lg:min-h-[22.5rem] lg:px-5'
        : isYouTubeHero || isFacebookHero
          ? 'min-h-[20rem] px-3 py-2 sm:min-h-[22.5rem] sm:px-4 sm:py-3 lg:min-h-[24rem] lg:px-5'
          : 'min-h-[22rem] sm:min-h-[24rem]',
    className,
  );
}
