import { routes } from '@/config/routes';
import type { ServiceContent } from '@/types/content';

const PRICING_ANCHOR = '#pricing-packages';

/**
 * Buy YouTube Subscribers Canada — Document 09.41 production content.
 * Other YouTube services remain factory placeholders until their production docs land.
 */
function buildBuyYouTubeSubscribersContent(): ServiceContent {
  return {
    slug: 'buy-youtube-subscribers',
    platformId: 'youtube',
    seo: {
      title: 'Buy YouTube Subscribers Canada | Packages & Pricing',
      description:
        'Compare YouTube subscriber packages, review pricing and delivery information, and order using your public channel URL with checkout and order tracking.',
    },
    hero: {
      eyebrow:
        'YOUTUBE SUBSCRIBER PACKAGES FOR CANADIAN CREATORS, BRANDS & BUSINESSES',
      title: 'Buy YouTube Subscribers Canada',
      description:
        'Grow your YouTube channel with subscriber packages created for creators, businesses and brands across Canada. Choose the package that matches your goals, place your order securely using your public YouTube channel URL and follow every stage of delivery with transparent order tracking. We never ask for your YouTube password, making the ordering process simple, secure and straightforward.',
      purpose: 'Convert for YouTube subscriber packages in Canada',
      primaryKeyword: 'buy YouTube subscribers Canada',
      supportingKeywords: [
        'Buy YouTube Subscribers',
        'YouTube Subscribers Packages',
        'Real YouTube Subscribers',
        'Increase YouTube Subscribers',
        'YouTube Growth Canada',
      ],
      suggestedWordCount: 120,
      primaryCta: {
        label: 'Choose Subscribers Package',
        href: PRICING_ANCHOR,
      },
      secondaryCta: {
        label: 'View Delivery Information',
        href: '#channel-link-and-delivery',
      },
      trustLabels: [
        { id: 'yt-s-trust-url', label: 'Public Channel URL Only' },
        { id: 'yt-s-trust-checkout', label: 'Secure Checkout' },
        { id: 'yt-s-trust-track', label: 'Order Tracking' },
        { id: 'yt-s-trust-ca', label: 'Canadian Support' },
        { id: 'yt-s-trust-password', label: 'No Password Required' },
      ],
      visual: {
        src: '/assets/images/illustrations/youtube-dashboard.svg',
        alt: 'YouTube Creator Studio subscribers growth dashboard illustration',
        width: 1000,
        height: 800,
      },
    },
    pricing: {
      id: 'pricing-packages',
      title: 'Choose Your YouTube Subscribers Package',
      description:
        "Whether you're launching your first YouTube channel or growing an established audience, choose the subscriber package that best fits your goals. Every package includes secure checkout, transparent delivery updates and dedicated customer support throughout your order.",
      purpose: 'Present real InstantViral.ca YouTube subscribers packages',
      primaryKeyword: 'YouTube subscribers packages',
      suggestedWordCount: 40,
      packageIds: [],
      primaryCtaLabel: 'Order Now',
      emptyMessage: 'YouTube Subscribers packages are temporarily unavailable.',
    },
    benefits: {
      id: 'why-buy-youtube-subscribers',
      title: 'Build A More Credible YouTube Channel',
      description:
        "A growing subscriber count helps create stronger first impressions and encourages new visitors to explore more of your content. Combined with valuable videos and consistent uploads, subscriber growth can support your long-term YouTube strategy and strengthen your channel's overall credibility.",
      purpose: 'Explain informed use of YouTube subscribers packages',
      primaryKeyword: 'buy YouTube subscribers',
      suggestedWordCount: 180,
      items: [
        {
          id: 'yt-s-build-credibility',
          title: 'Build Credibility',
          description:
            'A larger subscriber base helps your channel appear more established to first-time visitors.',
        },
        {
          id: 'yt-s-long-term-growth',
          title: 'Support Long-Term Growth',
          description:
            'Designed for creators, educators, businesses and brands building a lasting YouTube presence.',
        },
        {
          id: 'yt-s-flexible-packages',
          title: 'Flexible Packages',
          description:
            'Choose a subscriber package that matches your current audience size and growth objectives.',
        },
        {
          id: 'yt-s-private-secure',
          title: 'Private & Secure',
          description:
            'Only your public YouTube channel URL is required. Your account password is never requested.',
        },
      ],
    },
    whyInstantViral: {
      id: 'why-choose-instantviral-youtube-subscribers',
      title: 'A Straightforward Way to Order YouTube Subscribers',
      description:
        'The ordering experience is designed to remove unnecessary steps. Package details are available before checkout, only public channel information is required and delivery progress can be reviewed after the purchase is confirmed.',
      purpose: 'Build trust with conditional policy wording',
      primaryKeyword: 'YouTube growth service Canada',
      suggestedWordCount: 150,
      items: [
        {
          id: 'yt-s-why-channel',
          title: 'Public Channel Information',
          description:
            'We only need the public URL of the YouTube channel receiving the selected subscriber package.',
        },
        {
          id: 'yt-s-why-package',
          title: 'Clear Package Selection',
          description:
            'Compare the available quantities and choose an option suited to your current channel size and objectives.',
        },
        {
          id: 'yt-s-why-checkout',
          title: 'Secure Checkout',
          description:
            'Review your channel and package details before completing payment through the existing checkout process.',
        },
        {
          id: 'yt-s-why-delivery-info',
          title: 'Delivery Information',
          description:
            'The current delivery estimate and relevant package details are displayed before the order is placed.',
        },
        {
          id: 'yt-s-why-tracking',
          title: 'Order Tracking',
          description:
            'Use your order ID and checkout email to review available progress updates after confirmation.',
        },
        {
          id: 'yt-s-why-assistance',
          title: 'Customer Assistance',
          description:
            'Contact support for help with package selection, checkout, delivery or an existing subscriber order.',
        },
      ],
    },
    features: {
      id: 'youtube-subscriber-delivery',
      title: 'YouTube Subscriber Delivery',
      description:
        'Delivery begins after the order has been confirmed and follows the timing displayed for the selected package. Processing speed may vary by quantity and current demand, while available updates can be reviewed through the order tracking page.',
      purpose: 'Explain subscriber delivery stages without unsupported guarantees',
      primaryKeyword: 'YouTube subscriber delivery',
      suggestedWordCount: 120,
      items: [
        {
          id: 'yt-s-del-review',
          title: 'Order Review',
          description:
            'The channel URL, package and checkout details are checked before processing begins.',
        },
        {
          id: 'yt-s-del-begins',
          title: 'Delivery Begins',
          description:
            'Subscribers begin arriving according to the current estimate shown for the selected package.',
        },
        {
          id: 'yt-s-del-progress',
          title: 'Progress Updates',
          description:
            'Use the tracking page to review the latest available order status.',
        },
        {
          id: 'yt-s-del-completed',
          title: 'Delivery Completed',
          description:
            'The order is marked complete after the full selected quantity has been processed.',
        },
      ],
    },
    howItWorks: {
      id: 'how-it-works',
      title: 'How to Order YouTube Subscribers',
      description: 'Choose a package and complete your order in five straightforward steps.',
      purpose: 'Explain the five-step ordering process',
      primaryKeyword: 'buy YouTube subscribers',
      suggestedWordCount: 140,
      steps: [
        {
          id: 'yt-s-step-1',
          title: 'Choose a Subscriber Package',
          description:
            'Review the available quantities and select the package that matches your channel goals.',
        },
        {
          id: 'yt-s-step-2',
          title: 'Provide Your Channel URL',
          description:
            'Enter the exact public URL of the YouTube channel receiving the subscribers.',
        },
        {
          id: 'yt-s-step-3',
          title: 'Review the Details',
          description:
            'Confirm the selected package, channel URL and order information before continuing.',
        },
        {
          id: 'yt-s-step-4',
          title: 'Complete Checkout',
          description:
            'Finish payment through the existing secure checkout and receive your order confirmation.',
        },
        {
          id: 'yt-s-step-5',
          title: 'Track Delivery',
          description:
            'Use your order ID and email address to review available status updates until completion.',
        },
      ],
    },
    deliveryAndSafety: {
      id: 'channel-link-and-delivery',
      title: 'What We Need to Process Your Order',
      description:
        'Only the details required to identify your channel and confirm the purchase are needed. Private login information, passwords and recovery codes are never part of the ordering process.',
      purpose: 'Explain channel URL and order requirements',
      primaryKeyword: 'YouTube subscribers delivery',
      suggestedWordCount: 140,
      items: [
        {
          id: 'yt-s-req-url',
          title: 'Public YouTube Channel URL',
          description:
            'Submit the exact public channel URL so the selected package reaches the correct destination.',
        },
        {
          id: 'yt-s-req-package',
          title: 'Selected Subscriber Package',
          description:
            'Choose a quantity that suits your present audience size, campaign and channel objectives.',
        },
        {
          id: 'yt-s-req-public',
          title: 'Publicly Accessible Channel',
          description:
            'Keep the channel publicly accessible while delivery is being processed.',
        },
        {
          id: 'yt-s-req-email',
          title: 'Valid Email Address',
          description:
            'Use an active email address to receive confirmation and access order tracking.',
        },
      ],
    },
    reviews: {
      id: 'yt-subscribers-reviews',
      title: 'What Customers Say About InstantViral',
      description:
        'Customer reviews for this InstantViral service.',
      purpose: 'Social proof from approved customer reviews',
      testimonialIds: [],
    },
    faq: {
      id: 'yt-subscribers-faq',
      title: 'YouTube Subscriber Package FAQs',
      description:
        'Review common questions about package selection, channel requirements, checkout, delivery and tracking before placing an order.',
      purpose: 'Answer buying questions with FAQPage schema',
      primaryKeyword: 'buy YouTube subscribers Canada',
      faqIds: [
        'faq-yt-subscribers-choose-package',
        'faq-yt-subscribers-password',
        'faq-yt-subscribers-public',
        'faq-yt-subscribers-delivery-begin',
        'faq-yt-subscribers-track',
        'faq-yt-subscribers-another-order',
        'faq-yt-subscribers-change-url',
        'faq-yt-subscribers-after-checkout',
        'faq-yt-subscribers-gradual',
        'faq-yt-subscribers-support',
      ],
    },
    relatedServices: {
      id: 'related-youtube-services-subscribers',
      title: 'Explore More YouTube Growth Services',
      description:
        'Combine subscriber growth with video visibility by reviewing the available YouTube views packages.',
      purpose: 'Internal links to sibling YouTube offers (no skipped services)',
      serviceSlugs: ['buy-youtube-views'],
    },
    finalCta: {
      id: 'yt-subscribers-final-cta',
      title: 'Ready to Grow Your YouTube Audience?',
      description:
        'Choose the YouTube subscriber package that matches your channel goals, submit your public channel URL and complete the existing checkout process. After confirmation, use order tracking to review available delivery updates.',
      purpose: 'Drive conversion to pricing packages',
      primaryCta: {
        label: 'Choose YouTube Subscribers Package',
        href: PRICING_ANCHOR,
      },
      secondaryCta: {
        label: 'Contact Support',
        href: routes.contact,
      },
    },
  };
}

/**
 * Buy YouTube Views Canada — Document 09.42 production content.
 */
function buildBuyYouTubeViewsContent(): ServiceContent {
  return {
    slug: 'buy-youtube-views',
    platformId: 'youtube',
    seo: {
      title: 'Buy YouTube Views Canada | Packages & Pricing',
      description:
        'Buy YouTube Views Canada with clear package options, public video URL checkout, gradual delivery details and order tracking. No password required.',
    },
    hero: {
      eyebrow:
        'YOUTUBE VIDEO VIEW PACKAGES FOR CANADIAN CREATORS, BRANDS & BUSINESSES',
      title: 'Buy YouTube Views Canada',
      description:
        'Increase the visibility of your YouTube videos with view packages designed for creators, businesses and brands across Canada. Choose the package that matches your campaign, submit your public YouTube video URL and follow your order from checkout to delivery with transparent tracking. We never ask for your YouTube password, making the process simple and secure.',
      purpose: 'Convert for YouTube views packages in Canada',
      primaryKeyword: 'buy YouTube views Canada',
      supportingKeywords: [
        'Buy YouTube Views',
        'Real YouTube Views',
        'Increase YouTube Views',
        'YouTube Video Views',
        'YouTube Views Packages',
      ],
      suggestedWordCount: 120,
      primaryCta: {
        label: 'Choose Views Package',
        href: PRICING_ANCHOR,
      },
      secondaryCta: {
        label: 'View Delivery Information',
        href: '#video-link-and-delivery',
      },
      trustLabels: [
        { id: 'yt-v-trust-url', label: 'Public Video URL Only' },
        { id: 'yt-v-trust-checkout', label: 'Secure Checkout' },
        { id: 'yt-v-trust-track', label: 'Order Tracking' },
        { id: 'yt-v-trust-gradual', label: 'Gradual Delivery' },
        { id: 'yt-v-trust-ca', label: 'Canadian Support' },
      ],
      visual: {
        src: '/assets/images/illustrations/youtube-dashboard.svg',
        alt: 'YouTube Creator Studio video views analytics dashboard illustration',
        width: 1000,
        height: 800,
      },
    },
    pricing: {
      id: 'pricing-packages',
      title: 'Choose Your YouTube Views Package',
      description:
        'Choose the number of video views that matches your campaign goals. Every package includes secure checkout, transparent delivery updates and order tracking.',
      purpose: 'Present real InstantViral.ca YouTube views packages',
      primaryKeyword: 'YouTube views packages',
      suggestedWordCount: 40,
      packageIds: [],
      primaryCtaLabel: 'Order Now',
      emptyMessage: 'YouTube Views packages are temporarily unavailable.',
    },
    benefits: {
      id: 'why-buy-youtube-views',
      title: 'Help More People Discover Your Videos',
      description:
        'Video views are one of the first metrics viewers notice when evaluating content. Higher view counts can improve social proof, encourage additional viewers to watch and support the visibility of your videos alongside consistent publishing and quality content.',
      purpose: 'Explain informed use of YouTube views packages',
      primaryKeyword: 'buy YouTube views',
      suggestedWordCount: 180,
      items: [
        {
          id: 'yt-v-increase-visibility',
          title: 'Increase Visibility',
          description: 'Higher view counts can make videos appear more active.',
        },
        {
          id: 'yt-v-social-proof',
          title: 'Strengthen Social Proof',
          description: 'An active video can encourage more people to press play.',
        },
        {
          id: 'yt-v-flexible-packages',
          title: 'Flexible Packages',
          description: 'Select a package that suits your campaign objectives.',
        },
        {
          id: 'yt-v-private-secure',
          title: 'Private & Secure',
          description: 'Only your public YouTube video URL is required.',
        },
      ],
    },
    whyInstantViral: {
      id: 'why-choose-instantviral-youtube-views',
      title: 'Why Buy YouTube Views From InstantViral?',
      description:
        'Video views help demonstrate that content is being watched and discovered. Combined with valuable videos, strong thumbnails and consistent publishing, additional views can improve social proof and encourage more people to explore your content.',
      purpose: 'Build trust with conditional policy wording',
      primaryKeyword: 'YouTube promotion service Canada',
      suggestedWordCount: 150,
      items: [
        {
          id: 'yt-v-why-visibility',
          title: 'Improve Video Visibility',
          description: 'Higher view counts help videos appear more active.',
        },
        {
          id: 'yt-v-why-social-proof',
          title: 'Support Social Proof',
          description: 'Visible engagement can encourage additional viewers.',
        },
        {
          id: 'yt-v-why-checkout',
          title: 'Secure Checkout',
          description: 'Protected ordering with secure payment processing.',
        },
        {
          id: 'yt-v-why-password',
          title: 'No Password Required',
          description: 'Only your public YouTube video URL is needed.',
        },
        {
          id: 'yt-v-why-track',
          title: 'Track Every Order',
          description: 'Review delivery progress using your order details.',
        },
        {
          id: 'yt-v-why-support',
          title: 'Canadian Support',
          description:
            'Our support team is available whenever assistance is required.',
        },
      ],
    },
    features: {
      id: 'youtube-views-delivery',
      title: 'YouTube Views Delivery',
      description:
        'Delivery begins after your order has been reviewed and confirmed. Processing time varies depending on the selected package and current demand. Progress updates remain available through order tracking until delivery is complete.',
      purpose: 'Explain views delivery stages without unsupported guarantees',
      primaryKeyword: 'YouTube views delivery',
      suggestedWordCount: 120,
      items: [
        {
          id: 'yt-v-del-review',
          title: 'Order Review',
          description:
            'Your video URL and package are verified before processing.',
        },
        {
          id: 'yt-v-del-begins',
          title: 'Delivery Begins',
          description:
            'Views begin according to the estimated delivery schedule.',
        },
        {
          id: 'yt-v-del-progress',
          title: 'Views Increasing',
          description: 'Monitor your order using the tracking page.',
        },
        {
          id: 'yt-v-del-complete',
          title: 'Order Complete',
          description:
            'The order is completed once the selected quantity has been delivered.',
        },
      ],
    },
    howItWorks: {
      id: 'how-it-works',
      title: 'How To Buy YouTube Views',
      description: 'Ordering YouTube views only takes a few simple steps.',
      purpose: 'Explain the five-step ordering process',
      primaryKeyword: 'buy YouTube views',
      suggestedWordCount: 140,
      steps: [
        {
          id: 'yt-v-step-1',
          title: 'Choose Your Views Package',
          description: 'Select the package that best suits your campaign.',
        },
        {
          id: 'yt-v-step-2',
          title: 'Paste Your Public Video URL',
          description: 'Enter the public URL of the YouTube video.',
        },
        {
          id: 'yt-v-step-3',
          title: 'Review Your Order',
          description: 'Confirm the package and destination before checkout.',
        },
        {
          id: 'yt-v-step-4',
          title: 'Complete Secure Checkout',
          description: 'Finish payment through the secure ordering system.',
        },
        {
          id: 'yt-v-step-5',
          title: 'Track Delivery',
          description: 'Use your order ID to review delivery progress.',
        },
      ],
    },
    deliveryAndSafety: {
      id: 'video-link-and-delivery',
      title: 'What We Need To Process Your Order',
      description:
        'We only require the information necessary to identify your video and complete the purchase. Private account access is never requested.',
      purpose: 'Explain video URL and order requirements',
      primaryKeyword: 'YouTube views delivery',
      suggestedWordCount: 140,
      items: [
        {
          id: 'yt-v-req-url',
          title: 'Public YouTube Video URL',
          description:
            'Submit the public URL of the video receiving the selected package.',
        },
        {
          id: 'yt-v-req-package',
          title: 'Selected Views Package',
          description: 'Choose the quantity that matches your promotion goals.',
        },
        {
          id: 'yt-v-req-public',
          title: 'Public Video',
          description: 'Keep the video publicly available during delivery.',
        },
        {
          id: 'yt-v-req-email',
          title: 'Valid Email Address',
          description: 'Used for confirmation and order tracking.',
        },
      ],
    },
    reviews: {
      id: 'yt-views-reviews',
      title: 'What Customers Say About InstantViral',
      description:
        'Customer reviews for this InstantViral service.',
      purpose: 'Social proof from approved customer reviews',
      testimonialIds: [],
    },
    faq: {
      id: 'yt-views-faq',
      title: 'Frequently Asked Questions About YouTube Views',
      purpose: 'Answer buying questions with FAQPage schema',
      primaryKeyword: 'buy YouTube views Canada',
      faqIds: [
        'faq-yt-views-choose-package',
        'faq-yt-views-password',
        'faq-yt-views-public',
        'faq-yt-views-delivery-begin',
        'faq-yt-views-track',
        'faq-yt-views-order-again',
        'faq-yt-views-change-url',
        'faq-yt-views-after-checkout',
        'faq-yt-views-gradual',
        'faq-yt-views-support',
      ],
    },
    relatedServices: {
      id: 'related-youtube-services-views',
      title: 'Explore More YouTube Growth Services',
      purpose: 'Internal links to sibling YouTube offers (no skipped services)',
      serviceSlugs: ['buy-youtube-subscribers'],
    },
    finalCta: {
      id: 'yt-views-final-cta',
      title: 'Ready To Increase Your YouTube Video Reach?',
      description:
        'Choose the YouTube views package that matches your campaign, submit your public video URL and complete your secure order. Track your delivery from confirmation to completion.',
      purpose: 'Drive conversion to pricing packages',
      primaryCta: {
        label: 'Choose YouTube Views Package',
        href: PRICING_ANCHOR,
      },
      secondaryCta: {
        label: 'Contact Support',
        href: routes.contact,
      },
    },
  };
}

/** YouTube service page content — keyed by buy-* slug. */
export const youtubeContent: Record<string, ServiceContent> = {
  'buy-youtube-subscribers': buildBuyYouTubeSubscribersContent(),
  'buy-youtube-views': buildBuyYouTubeViewsContent(),
};

export function getYouTubeContent(slug: string): ServiceContent | undefined {
  return youtubeContent[slug];
}
