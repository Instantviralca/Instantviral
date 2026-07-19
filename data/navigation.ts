import { routes } from '@/config/routes';
import { getAllPlatforms } from '@/data/platforms';
import { getNavigationServices, getServiceBySlug } from '@/data/services';
import { getPrimaryCTA, getSecondaryCTA } from '@/lib/brand/helpers';
import type { NavItem, NavMegaMenuItem, PlatformId, Service } from '@/types';

function primaryServiceHref(platformId: PlatformId): string {
  const services = getNavigationServices().filter((service) => service.platform === platformId);
  const featured = services.find((service) => service.featured);
  return (featured ?? services[0])?.url ?? routes.home;
}

function megaItem(platformId: PlatformId, label: string): NavMegaMenuItem {
  return {
    id: `nav-${platformId}`,
    type: 'mega',
    label,
    platformId,
    href: primaryServiceHref(platformId),
  };
}

/** Primary desktop navigation — structure only; links resolved from registry + config routes. */
export const mainNavigation: NavItem[] = [
  { id: 'nav-home', label: 'Home', href: routes.home },
  megaItem('instagram', 'Instagram'),
  megaItem('tiktok', 'TikTok'),
  megaItem('youtube', 'YouTube'),
  megaItem('facebook', 'Facebook'),
  { id: 'nav-learn', label: 'Learn', href: routes.learn },
  { id: 'nav-reviews', label: 'Reviews', href: routes.reviews },
  { id: 'nav-about', label: 'About', href: routes.about },
  { id: 'nav-contact', label: 'Contact', href: routes.contact },
];

const defaultCtaHref =
  getServiceBySlug('buy-instagram-followers')?.url ?? '/buy-instagram-followers';

const primary = getPrimaryCTA(defaultCtaHref);
const secondary = getSecondaryCTA(1, defaultCtaHref);

export const primaryCta = {
  id: 'cta-get-started',
  label: primary.label,
  href: primary.href,
} as const;

export const secondaryCta = {
  id: 'cta-view-services',
  label: secondary.label,
  href: secondary.href,
} as const;

export function getMainNavigation(): NavItem[] {
  return mainNavigation;
}

export function getMegaMenuServices(platformId: PlatformId): Service[] {
  return getNavigationServices().filter((service) => service.platform === platformId);
}

export function getPlatformNavItems() {
  return getAllPlatforms().map((platform) => ({
    platform,
    href: primaryServiceHref(platform.id),
    services: getMegaMenuServices(platform.id),
  }));
}

export function isMegaMenuItem(item: NavItem): item is NavMegaMenuItem {
  return 'type' in item && item.type === 'mega';
}
