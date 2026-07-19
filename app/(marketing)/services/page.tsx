import type { Metadata } from 'next';

import {
  FeaturedServicesSection,
  PlatformSelectorSection,
} from '@/components/marketing';
import { routes } from '@/config/routes';
import { buildPageMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = buildPageMetadata({
  title: 'Services | InstantViral',
  description:
    'Choose your platform and browse InstantViral social media growth packages for Instagram, TikTok, YouTube, and Facebook.',
  path: routes.services,
  robots: { index: false, follow: true },
});

/**
 * Lightweight services landing for the homepage final CTA.
 * Reuses existing platform + featured service sections (no new visual design).
 */
export default function ServicesPage() {
  return (
    <>
      <PlatformSelectorSection id="platform-selector" />
      <FeaturedServicesSection />
    </>
  );
}
