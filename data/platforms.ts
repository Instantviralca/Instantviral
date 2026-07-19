import { getPlatformServices } from '@/data/services';
import type { Platform, PlatformId } from '@/types';

const PLATFORM_DEFINITIONS: Omit<Platform, 'serviceIds'>[] = [
  {
    id: 'instagram',
    name: 'Instagram',
    slug: 'instagram',
    icon: 'instagram',
    color: '#E1306C',
    description:
      'Instagram growth services with clear packages, secure checkout, and order tracking.',
  },
  {
    id: 'tiktok',
    name: 'TikTok',
    slug: 'tiktok',
    icon: 'music-2',
    color: '#000000',
    description:
      'TikTok growth services with clear packages, secure checkout, and order tracking.',
  },
  {
    id: 'youtube',
    name: 'YouTube',
    slug: 'youtube',
    icon: 'youtube',
    color: '#FF0000',
    description:
      'YouTube growth services with clear packages, secure checkout, and order tracking.',
  },
  {
    id: 'facebook',
    name: 'Facebook',
    slug: 'facebook',
    icon: 'facebook',
    color: '#1877F2',
    description:
      'Facebook growth services with clear packages, secure checkout, and order tracking.',
  },
];

export const platforms: Platform[] = PLATFORM_DEFINITIONS.map((platform) => ({
  ...platform,
  serviceIds: getPlatformServices(platform.id).map((service) => service.id),
}));

export function getAllPlatforms(): Platform[] {
  return platforms;
}

export function getPlatformById(id: PlatformId): Platform | undefined {
  return platforms.find((platform) => platform.id === id);
}

export function getPlatformBySlug(slug: string): Platform | undefined {
  return platforms.find((platform) => platform.slug === slug);
}
