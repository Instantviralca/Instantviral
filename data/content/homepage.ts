import { routes } from '@/config/routes';
import { resolveCta } from '@/data/content/cta';
import type { HomepageContent } from '@/types/content';

/**
 * Homepage content document — Document 08.11 (final authority).
 * Section components consume this via HomePageView / mappers (not hardcoded in UI).
 */
export const homepageContent: HomepageContent = {
  hero: {
    eyebrow:
      'Instagram Growth Services for Creators, Businesses & Brands Across Canada',
    title: 'Buy Instagram Followers with Confidence',
    description:
      'Grow your Instagram presence with a secure ordering experience designed for creators, businesses and brands across Canada. Choose the follower package that fits your goals, place your order using only your public Instagram username, and track every step from checkout to delivery—with dedicated support whenever you need it.',
    primaryMessage:
      'Choose an Instagram follower package, order with your public username, and track delivery — no password required.',
    purpose: 'Explain value proposition',
    primaryKeyword: 'buy instagram followers',
    supportingKeywords: [
      'instagram growth services',
      'instagram followers Canada',
      'secure instagram ordering',
      'instagram follower packages',
    ],
    suggestedWordCount: 90,
    primaryCta: resolveCta('getStarted', {
      label: 'Buy Instagram Followers',
      href: '/buy-instagram-followers',
    }),
    secondaryCta: resolveCta('browseServices', {
      label: 'Explore Platforms',
      href: '#platform-selector',
    }),
    visual: {
      src: '/assets/images/illustrations/hero-growth-phone.png',
      alt: 'InstantViral floating phone showing social profile growth with rising followers and live order updates',
      width: 1536,
      height: 1024,
    },
  },
  /** Hero trust labels (Document 08.11 §4) — not a separate homepage Trust Bar section. */
  trustBar: {
    id: 'home-hero-trust',
    title: 'Trust labels',
    purpose: 'Hero credibility signals',
    items: [
      {
        id: 'trust-no-password',
        label: 'No Password Required',
        description: 'Orders use your public username or content URL only.',
        iconKey: 'ShieldCheck',
      },
      {
        id: 'trust-secure',
        label: 'Secure Checkout',
        description: 'Complete checkout through a secure payment flow.',
        iconKey: 'ShieldCheck',
      },
      {
        id: 'trust-since-2018',
        label: 'Trusted Since 2018',
        description: 'InstantViral has served customers since 2018.',
        iconKey: 'CalendarCheck',
      },
      {
        id: 'trust-support',
        label: 'Canadian Support',
        description: 'Support for creators and brands across Canada.',
        iconKey: 'Headphones',
      },
    ],
  },
  platformGrid: {
    id: 'platform-selector',
    title: 'Choose Your Platform',
    description:
      'Choose the social platform that matches your goals. Explore available services for Instagram, TikTok, YouTube and Facebook, then view the packages available for your account or content.',
    purpose: 'Route users by platform',
    primaryKeyword: 'social media growth',
    suggestedWordCount: 50,
    platformIds: ['instagram', 'tiktok', 'youtube', 'facebook'],
    internalLinks: [
      { label: 'Instagram', href: '/buy-instagram-followers' },
      { label: 'TikTok', href: '/buy-tiktok-followers' },
      { label: 'YouTube', href: '/buy-youtube-subscribers' },
      { label: 'Facebook', href: '/buy-facebook-followers' },
    ],
    cards: [
      {
        platformId: 'instagram',
        description:
          'Explore Instagram services for followers, likes, views and comments. Choose packages that support creators, businesses and brands building an audience.',
        ctaLabel: 'View Instagram Packages',
        href: '#featured-services-instagram',
        previewServiceSlugs: [
          'buy-instagram-followers',
          'buy-instagram-likes',
          'buy-instagram-views',
          'buy-instagram-comments',
        ],
      },
      {
        platformId: 'tiktok',
        description:
          'Discover TikTok services for followers, likes and views. Select packages that help creators and businesses expand reach on short-form video.',
        ctaLabel: 'View TikTok Packages',
        href: '#featured-services-tiktok',
        previewServiceSlugs: [
          'buy-tiktok-followers',
          'buy-tiktok-likes',
          'buy-tiktok-views',
        ],
      },
      {
        platformId: 'youtube',
        description:
          'Support your YouTube channel with subscriber and view packages. Built for creators, businesses and brands focused on channel and video growth.',
        ctaLabel: 'View YouTube Packages',
        href: '#featured-services-youtube',
        previewServiceSlugs: ['buy-youtube-subscribers', 'buy-youtube-views'],
      },
      {
        platformId: 'facebook',
        description:
          'Grow Facebook with followers, page likes and post likes. Packages suited to businesses, creators and brands building page presence.',
        ctaLabel: 'View Facebook Packages',
        href: '#featured-services-facebook',
        previewServiceSlugs: [
          'buy-facebook-followers',
          'buy-facebook-page-likes',
          'buy-facebook-post-likes',
        ],
      },
    ],
  },
  servicesGrid: {
    id: 'featured-services',
    title: 'Popular Social Media Growth Services',
    description:
      'Browse popular services for Instagram, TikTok, YouTube and Facebook. Compare available packages and choose the service that best matches your platform and growth goals.',
    purpose: 'Highlight curated mixed-platform services',
    suggestedWordCount: 30,
    ctaLabel: 'View Packages',
    serviceSlugs: [
      'buy-instagram-followers',
      'buy-instagram-likes',
      'buy-tiktok-followers',
      'buy-tiktok-views',
      'buy-youtube-subscribers',
      'buy-youtube-views',
      'buy-facebook-followers',
      'buy-facebook-page-likes',
    ],
    descriptions: {
      'buy-instagram-followers':
        'Build your Instagram audience with follower packages for creators, businesses and brands. Choose an option that matches your current goals.',
      'buy-instagram-likes':
        'Support engagement and social proof on Instagram posts with like packages available in several quantities.',
      'buy-tiktok-followers':
        'Grow your TikTok audience with follower packages designed for creators, businesses and developing accounts.',
      'buy-tiktok-views':
        'Increase visibility on TikTok videos with view packages that support wider content reach.',
      'buy-youtube-subscribers':
        'Support your YouTube channel with subscriber packages for creators, businesses and growing brands.',
      'buy-youtube-views':
        'Increase visibility on YouTube videos with view packages available for different channel and campaign needs.',
      'buy-facebook-followers':
        'Grow your Facebook audience with follower packages designed for businesses, creators and brands.',
      'buy-facebook-page-likes':
        'Strengthen your Facebook page presence with page-like packages available for different business and branding goals.',
    },
    badges: {
      'buy-instagram-followers': 'Best Seller',
      'buy-instagram-likes': 'Popular',
      'buy-tiktok-followers': 'Trending',
      'buy-tiktok-views': 'Popular',
      'buy-youtube-subscribers': 'Recommended',
      'buy-youtube-views': 'Trending',
      'buy-facebook-followers': 'Popular',
      'buy-facebook-page-likes': 'Recommended',
    },
  },
  whyChooseUs: {
    id: 'home-why',
    title: 'What Makes Ordering Simple',
    description:
      'InstantViral keeps the ordering process straightforward, from choosing a service to tracking delivery. Each feature below addresses a practical part of the customer journey.',
    purpose: 'Explain practical ordering features',
    suggestedWordCount: 200,
    cta: {
      label: 'Learn How Ordering Works',
      href: '#home-how',
    },
    items: [
      {
        id: 'why-public-info',
        title: 'Public Information Only',
        description:
          'We only request the public username, profile URL or content link required for the selected service.',
      },
      {
        id: 'why-delivery-options',
        title: 'Clear Delivery Options',
        description:
          'Delivery information and available timing options are displayed on the relevant service page before checkout.',
      },
      {
        id: 'why-support',
        title: 'Customer Assistance',
        description:
          'Support is available for questions about packages, checkout, delivery and existing orders.',
      },
      {
        id: 'why-money-back',
        title: '30-Day Money-Back Guarantee',
        description:
          'Eligible purchases are covered according to the refund policy and terms displayed for the selected service.',
      },
      {
        id: 'why-refill',
        title: 'Refill Protection',
        description:
          'Selected services include refill coverage where stated. Eligibility and refill terms vary by package.',
      },
      {
        id: 'why-tracking',
        title: 'Order Tracking',
        description:
          'Customers can use their order ID and email address to review available order status updates.',
      },
    ],
  },
  howItWorks: {
    id: 'home-how',
    title: 'Getting Started Is Simple',
    description:
      'Follow five clear steps from choosing a service to tracking delivery after checkout.',
    purpose: 'Explain ordering process',
    suggestedWordCount: 150,
    cta: resolveCta('getStarted', { href: '#platform-selector' }),
    steps: [
      {
        id: 'step-choose-service',
        title: 'Choose a Service',
        description:
          'Select Instagram, TikTok, YouTube or Facebook, then open the service that matches your goal.',
      },
      {
        id: 'step-select-package',
        title: 'Choose a Package',
        description:
          'Compare available packages and choose the option that matches your needs and budget.',
      },
      {
        id: 'step-enter-info',
        title: 'Enter Required Information',
        description:
          'Provide the public username or content link required for the selected service.',
      },
      {
        id: 'step-checkout',
        title: 'Complete Checkout',
        description:
          'Review your order, complete payment and receive an order confirmation.',
      },
      {
        id: 'step-track',
        title: 'Track Your Order',
        description:
          'Use your order ID and email address to review available tracking updates.',
      },
    ],
  },
  stats: {
    id: 'home-stats',
    title: 'Experience You Can Verify',
    purpose: 'Reinforce trust with approved claims only',
    statIds: ['stat-founded', 'stat-customers', 'stat-delivered', 'stat-support'],
  },
  testimonials: {
    id: 'home-testimonials',
    title: 'Trusted by Thousands of Happy Customers',
    description:
      'Creators, businesses, and brands trust InstantViral for secure ordering, transparent delivery, and reliable customer support.',
    purpose: 'Social proof',
    testimonialIds: [],
  },
  faq: {
    id: 'home-faq',
    title: 'Questions We Hear Most Often',
    purpose: 'Answer buying questions',
    primaryKeyword: 'social media growth services',
    faqIds: [
      'faq-home-how-works',
      'faq-home-choose-package',
      'faq-home-password',
      'faq-home-public-account',
      'faq-home-multiple-services',
      'faq-home-order-start',
      'faq-home-track-order',
      'faq-home-gradual-delivery',
      'faq-home-refill',
      'faq-home-money-back',
      'faq-home-platforms',
      'faq-home-need-help',
    ],
  },
  finalCta: {
    id: 'home-final-cta',
    title: 'Ready to Grow Your Social Media Presence?',
    description:
      'Choose your platform, review the available packages and place your order through a clear, trackable process.',
    purpose: 'Drive conversions',
    primaryCta: {
      label: 'Buy Instagram Followers',
      href: '/buy-instagram-followers',
    },
    secondaryCta: {
      label: 'Contact Support',
      href: routes.contact,
    },
  },
};

export function getHomepageContent(): HomepageContent {
  return homepageContent;
}
