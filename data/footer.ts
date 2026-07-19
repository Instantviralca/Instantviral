import { routes, learnCategoryPath } from '@/config/routes';
import { getActiveLearnCategories } from '@/data/learn';
import { getFooterServices, getPlatformServices } from '@/data/services';
import type { FooterColumn, PlatformId } from '@/types';

function platformServiceLinks(platformId: PlatformId) {
  return getPlatformServices(platformId)
    .filter((service) => service.showInFooter)
    .map((service) => ({
      label: service.navigationLabel,
      href: service.url,
    }));
}

function learnCategoryFooterLinks() {
  const labels: Record<string, string> = {
    instagram: 'Instagram Guide',
    facebook: 'Facebook Guide',
    tiktok: 'TikTok Guide',
    youtube: 'YouTube Guide',
    'social-media-marketing': 'Social Media Marketing',
    guides: 'Guides',
  };

  return getActiveLearnCategories()
    .filter((category) => category.slug !== 'news')
    .map((category) => ({
      label: labels[category.slug] ?? category.name,
      href: learnCategoryPath(category.slug),
    }));
}

/**
 * Footer columns — company/resources/legal use config routes;
 * platform columns are generated from the Service Registry.
 */
export function getFooterColumns(): FooterColumn[] {
  return [
    {
      id: 'company',
      title: 'Company',
      links: [
        { label: 'About', href: routes.about },
        { label: 'Reviews', href: routes.reviews },
        { label: 'Contact', href: routes.contact },
      ],
    },
    {
      id: 'instagram',
      title: 'Instagram',
      links: platformServiceLinks('instagram'),
    },
    {
      id: 'tiktok',
      title: 'TikTok',
      links: platformServiceLinks('tiktok'),
    },
    {
      id: 'youtube',
      title: 'YouTube',
      links: platformServiceLinks('youtube'),
    },
    {
      id: 'facebook',
      title: 'Facebook',
      links: platformServiceLinks('facebook'),
    },
    {
      id: 'resources',
      title: 'Resources',
      links: [
        { label: 'Learn', href: routes.learn },
        ...learnCategoryFooterLinks(),
        { label: 'FAQ', href: routes.faq },
        { label: 'Track Order', href: routes.trackOrder },
      ],
    },
    {
      id: 'legal',
      title: 'Legal',
      links: [
        { label: 'Privacy Policy', href: routes.privacyPolicy },
        { label: 'Cookie Policy', href: routes.cookiePolicy },
        { label: 'Refund Policy', href: routes.refundPolicy },
        { label: 'Terms & Conditions', href: routes.termsAndConditions },
        { label: 'Disclaimer', href: routes.disclaimer },
      ],
    },
  ];
}

export function getFooterRegistryServices() {
  return getFooterServices();
}
