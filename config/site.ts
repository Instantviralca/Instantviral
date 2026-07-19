/**
 * Environment-independent site configuration.
 * Brand identity fields delegate to config/brand.ts (Document 07.5).
 */

import { brand } from '@/config/brand';

export const site = {
  name: brand.name,
  domain: 'https://instantviral.ca',
  supportEmail: 'support@instantviral.ca',
  socialLinks: {
    /** Verified official InstantViral Instagram profile. */
    instagram: 'https://www.instagram.com/inst_antviral',
    /** No verified official TikTok profile — omit from sameAs / footer. */
    tiktok: '',
    /** No verified official YouTube profile — omit from sameAs / footer. */
    youtube: '',
    /** Verified official InstantViral Facebook page. */
    facebook: 'https://www.facebook.com/Instantviralcanada',
  },
  tagline: brand.tagline,
  mission: brand.mission,
  defaultMetadata: {
    title: `${brand.name} | Social Media Growth Services`,
    description:
      `${brand.name} helps creators and brands grow on Instagram, TikTok, YouTube, and Facebook with reliable, transparent social media growth services.`,
  },
} as const;

export type SiteConfig = typeof site;
