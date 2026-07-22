import { site } from '@/config/site';
import type { LearnArticle } from '@/types/blog';
import type { Service } from '@/types/service';

/** Title formulas from Document 05 / 09.11. */
export const titles = {
  home: () => `Buy Instagram Followers Canada | Real Followers – ${site.name}`,

  service: (service: Service) => {
    if (service.slug === 'buy-instagram-followers') {
      return `Instagram Followers Packages & Pricing | ${site.name}`;
    }
    if (service.slug === 'buy-instagram-likes') {
      return `Buy Instagram Likes | ${site.name}`;
    }
    if (service.slug === 'buy-instagram-views') {
      return `Buy Instagram Views Canada | ${site.name}`;
    }
    if (service.slug === 'buy-instagram-comments') {
      return `Buy Instagram Comments Canada | ${site.name}`;
    }
    if (service.slug === 'buy-tiktok-followers') {
      return `Buy TikTok Followers Canada | ${site.name}`;
    }
    if (service.slug === 'buy-tiktok-likes') {
      return `Buy TikTok Likes Canada | ${site.name}`;
    }
    if (service.slug === 'buy-tiktok-views') {
      return `Buy TikTok Views Canada | ${site.name}`;
    }
    if (service.slug === 'buy-facebook-followers') {
      return `Buy Facebook Followers Canada | Packages & Pricing`;
    }
    if (service.slug === 'buy-facebook-page-likes') {
      return `Buy Facebook Page Likes Canada | ${site.name}`;
    }
    if (service.slug === 'buy-facebook-post-likes') {
      return `Buy Facebook Post Likes Canada | ${site.name}`;
    }
    if (service.slug === 'buy-youtube-subscribers') {
      return `Buy YouTube Subscribers Canada | Packages & Pricing`;
    }
    if (service.slug === 'buy-youtube-views') {
      return `Buy YouTube Views Canada | Packages & Pricing`;
    }
    return `${service.name} | ${site.name}`;
  },

  learnIndex: () => `Learn | ${site.name}`,

  learnArticle: (article: LearnArticle) => `${article.title} | Learn | ${site.name}`,

  company: (pageName: string) => {
    if (pageName === 'About') {
      return 'About InstantViral Canada | Social Media Growth Since 2018';
    }
    if (pageName === 'Contact') {
      return 'Contact InstantViral Canada | Customer Support';
    }
    if (pageName === 'FAQ') {
      return 'InstantViral FAQ | Orders, Delivery, Payments & Support';
    }
    return `${pageName} | ${site.name}`;
  },

  legal: (pageName: string) => {
    if (pageName === 'Privacy Policy') {
      return 'Privacy Policy | InstantViral Canada';
    }
    if (pageName === 'Terms & Conditions') {
      return 'Terms & Conditions | InstantViral Canada';
    }
    if (pageName === 'Refund Policy') {
      return 'Refund Policy | InstantViral Canada';
    }
    if (pageName === 'Cookie Policy') {
      return 'Cookie Policy | InstantViral Canada';
    }
    if (pageName === 'Disclaimer') {
      return 'Disclaimer | InstantViral Canada';
    }
    return `${pageName} | ${site.name}`;
  },

  fallback: () => site.name,
} as const;
