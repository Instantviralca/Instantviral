import { routes } from '@/config/routes';
import type { ServiceContent } from '@/types/content';

const PRICING_ANCHOR = '#pricing-packages';

/**
 * Buy TikTok Followers Canada — Document 09.21 production content.
 * Other TikTok services remain factory placeholders until their production docs land.
 */
function buildBuyTikTokFollowersContent(): ServiceContent {
  return {
    slug: 'buy-tiktok-followers',
    platformId: 'tiktok',
    seo: {
      title: 'Buy TikTok Followers Canada | InstantViral',
      description:
        'Buy TikTok followers in Canada using real package options from InstantViral.ca, with no password required, clear delivery details, 24/7 support, and eligible refill coverage.',
    },
    hero: {
      eyebrow:
        'TIKTOK FOLLOWER SERVICES FOR CREATORS, BRANDS & BUSINESSES ACROSS CANADA',
      title: 'Buy TikTok Followers Canada',
      description:
        'Grow your TikTok audience with a secure follower service designed for creators, businesses and brands across Canada. Choose the follower package that fits your goals, place your order using only your public TikTok username, and track every stage from checkout to delivery. With secure ordering, transparent updates and dedicated customer support, growing your TikTok profile is simple, safe and straightforward.',
      purpose: 'Convert for TikTok follower packages in Canada',
      primaryKeyword: 'buy TikTok followers Canada',
      supportingKeywords: [
        'TikTok followers Canada',
        'Buy real TikTok followers',
        'Canadian TikTok followers',
        'TikTok follower packages',
        'TikTok growth service Canada',
        'Buy TikTok followers online',
      ],
      suggestedWordCount: 120,
      primaryCta: {
        label: 'Choose TikTok Package',
        href: PRICING_ANCHOR,
      },
      secondaryCta: {
        label: 'View Delivery Information',
        href: '#username-and-delivery',
      },
      trustLabels: [
        { id: 'tt-f-trust-public', label: 'Public Username Only' },
        { id: 'tt-f-trust-checkout', label: 'Secure Checkout' },
        { id: 'tt-f-trust-track', label: 'Order Tracking' },
        { id: 'tt-f-trust-support', label: 'Dedicated Support' },
      ],
      visual: {
        src: '/assets/images/illustrations/tiktok-dashboard.svg',
        alt: 'TikTok followers growth service dashboard illustration',
        width: 1000,
        height: 800,
      },
    },
    pricing: {
      id: 'pricing-packages',
      title: 'Choose Your TikTok Followers Package',
      description:
        "Whether you're growing a new TikTok profile or expanding an established audience, choose the follower package that best matches your goals. Every package includes secure ordering, transparent delivery updates and dedicated customer support throughout the process.",
      purpose: 'Present real InstantViral.ca TikTok follower packages',
      primaryKeyword: 'TikTok follower packages',
      suggestedWordCount: 40,
      packageIds: [],
      primaryCtaLabel: 'Order Now',
      emptyMessage: 'TikTok Followers packages are temporarily unavailable.',
    },
    benefits: {
      id: 'why-buy-tiktok-followers',
      title: 'Support the TikTok Presence You Are Building',
      description:
        'A stronger follower count helps create a better first impression, improves profile credibility and supports long-term growth on TikTok. Our follower packages are designed for creators, influencers, businesses and brands looking for a simple, secure and transparent ordering experience.',
      purpose: 'Explain informed use of TikTok follower packages',
      primaryKeyword: 'buy TikTok followers',
      suggestedWordCount: 180,
      items: [
        {
          id: 'tt-f-social-proof',
          title: 'Build Social Proof',
          description:
            'A larger audience helps your profile appear more established and creates stronger first impressions for new visitors.',
        },
        {
          id: 'tt-f-creator-friendly',
          title: 'Creator Friendly',
          description:
            'Suitable for creators, influencers, businesses and brands looking to grow their TikTok presence.',
        },
        {
          id: 'tt-f-flexible',
          title: 'Flexible Packages',
          description:
            'Choose from multiple package sizes that match your goals, audience and budget.',
        },
        {
          id: 'tt-f-private-secure',
          title: 'Private & Secure',
          description:
            'Ordering only requires your public TikTok username. Your password is never requested.',
        },
      ],
    },
    whyInstantViral: {
      id: 'why-choose-instantviral-tiktok-followers',
      title: 'A Clearer Way to Buy TikTok Followers',
      description:
        "We've designed our ordering process to be straightforward and transparent. Every step is explained clearly so you can choose a package, complete checkout and monitor delivery with confidence.",
      purpose: 'Build trust with conditional policy wording',
      primaryKeyword: 'TikTok growth service Canada',
      suggestedWordCount: 150,
      items: [
        {
          id: 'tt-f-why-username',
          title: 'Public Username Only',
          description: 'We only require your public TikTok username to process your order.',
        },
        {
          id: 'tt-f-why-payments',
          title: 'Secure Payments',
          description: 'Your order is completed through a secure checkout process.',
        },
        {
          id: 'tt-f-why-gradual',
          title: 'Gradual Delivery',
          description:
            'Delivery begins according to the selected package and current delivery schedule.',
        },
        {
          id: 'tt-f-why-tracking',
          title: 'Order Tracking',
          description: 'Monitor available progress updates using your order information.',
        },
        {
          id: 'tt-f-why-support',
          title: 'Dedicated Support',
          description:
            'Our support team is available if you need assistance before or after placing an order.',
        },
        {
          id: 'tt-f-why-creators',
          title: 'Designed For Creators',
          description:
            'Suitable for creators, influencers, businesses and brands looking to grow their TikTok presence.',
        },
      ],
      cta: {
        label: 'View TikTok Followers Packages',
        href: PRICING_ANCHOR,
      },
    },
    features: {
      id: 'buy-tiktok-followers-features',
      title: 'Features',
      description: '',
      purpose: 'Unused on 09.21 — Username and Delivery Requirements is separate',
      items: [],
    },
    howItWorks: {
      id: 'how-it-works',
      title: 'How to Buy TikTok Followers',
      description: 'Placing an order is simple and takes just a few steps.',
      purpose: 'Explain the five-step ordering process',
      primaryKeyword: 'buy TikTok followers',
      suggestedWordCount: 140,
      steps: [
        {
          id: 'tt-f-step-1',
          title: 'Choose a Package',
          description: 'Select the follower package that matches your goals.',
        },
        {
          id: 'tt-f-step-2',
          title: 'Enter Your Username',
          description: 'Provide your public TikTok username.',
        },
        {
          id: 'tt-f-step-3',
          title: 'Review Your Order',
          description: 'Confirm your package and account information.',
        },
        {
          id: 'tt-f-step-4',
          title: 'Complete Checkout',
          description: 'Finish your purchase using our secure checkout.',
        },
        {
          id: 'tt-f-step-5',
          title: 'Track Delivery',
          description:
            'Use your order details to monitor progress until delivery is complete.',
        },
      ],
      cta: {
        label: 'Select a Package',
        href: PRICING_ANCHOR,
      },
    },
    deliveryAndSafety: {
      id: 'username-and-delivery',
      title: 'What We Need to Process Your Order',
      description:
        "We keep the ordering process simple by requesting only the information needed to deliver your selected package. There is no need to share sensitive account details or login credentials. Once your order is confirmed, you'll be able to follow its progress using your order information.",
      purpose: 'Explain username and delivery requirements',
      primaryKeyword: 'TikTok followers delivery',
      suggestedWordCount: 120,
      items: [
        {
          id: 'tt-f-req-username',
          title: 'Public TikTok Username',
          description:
            "Enter the exact public username where you'd like your followers delivered.",
        },
        {
          id: 'tt-f-req-package',
          title: 'Selected Package',
          description:
            'Choose the follower package that matches your growth goals before completing checkout.',
        },
        {
          id: 'tt-f-req-public',
          title: 'Public Profile',
          description:
            'Your TikTok profile should remain public until delivery has finished successfully.',
        },
        {
          id: 'tt-f-req-email',
          title: 'Valid Email Address',
          description:
            'Use a valid email address so you can receive your order confirmation and tracking information.',
        },
      ],
    },
    reviews: {
      id: 'tt-followers-reviews',
      title: 'What Customers Say About InstantViral',
      description:
        'Customer reviews for this InstantViral service.',
      purpose: 'Social proof from approved customer reviews',
      testimonialIds: [],
    },
    faq: {
      id: 'tt-followers-faq',
      title: 'TikTok Followers Packages FAQs',
      description:
        'Find answers to the most common questions about choosing a TikTok followers package, placing an order, delivery and account requirements.',
      purpose: 'Answer buying questions with FAQPage schema',
      primaryKeyword: 'buy TikTok followers Canada',
      faqIds: [
        'faq-tt-followers-choose',
        'faq-tt-followers-password',
        'faq-tt-followers-public',
        'faq-tt-followers-delivery-begin',
        'faq-tt-followers-track',
        'faq-tt-followers-another-order',
        'faq-tt-followers-required-info',
        'faq-tt-followers-who-for',
      ],
    },
    relatedServices: {
      id: 'related-tiktok-services-followers',
      title: 'Explore More TikTok Growth Services',
      description:
        'Combine different TikTok services to support your overall content strategy and create a stronger profile experience.',
      purpose: 'Internal links to sibling TikTok offers',
      serviceSlugs: [
        'buy-tiktok-likes',
        'buy-tiktok-views',
      ],
    },
    finalCta: {
      id: 'tt-followers-final-cta',
      title: 'Ready to Grow Your TikTok Audience?',
      description:
        'Choose the TikTok followers package that matches your goals, complete your order securely and track every stage from confirmation to delivery. Our streamlined ordering process makes it simple to get started.',
      purpose: 'Drive conversion to pricing packages',
      primaryCta: {
        label: 'Choose TikTok Followers Package',
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
 * Buy TikTok Likes Canada — Document 09.22 production content.
 */
function buildBuyTikTokLikesContent(): ServiceContent {
  return {
    slug: 'buy-tiktok-likes',
    platformId: 'tiktok',
    seo: {
      title: 'Buy TikTok Likes Canada | InstantViral',
      description:
        'Buy TikTok likes Canada with real packages for creators and businesses. Public video URL only, secure checkout, gradual delivery options, and order tracking.',
    },
    hero: {
      eyebrow: 'REAL TIKTOK LIKES FOR CANADIAN CREATORS & BUSINESSES',
      title: 'Buy TikTok Likes Canada',
      description:
        'Increase engagement on your TikTok videos with real likes delivered through a secure ordering process. Choose the package that matches your content, place your order using only your public video link, and follow your order from checkout to completion. Designed for creators, brands and businesses across Canada.',
      purpose: 'Convert for TikTok likes packages in Canada',
      primaryKeyword: 'buy TikTok likes Canada',
      supportingKeywords: [
        'Buy Real TikTok Likes',
        'TikTok Likes Packages',
        'Increase TikTok Likes',
        'TikTok Engagement Canada',
      ],
      suggestedWordCount: 120,
      primaryCta: {
        label: 'Choose TikTok Likes Package',
        href: PRICING_ANCHOR,
      },
      secondaryCta: {
        label: 'View Delivery Information',
        href: '#video-link-and-delivery',
      },
      trustLabels: [
        { id: 'tt-l-trust-url', label: 'Public Video URL Only' },
        { id: 'tt-l-trust-checkout', label: 'Secure Checkout' },
        { id: 'tt-l-trust-gradual', label: 'Gradual Delivery' },
        { id: 'tt-l-trust-track', label: 'Order Tracking' },
        { id: 'tt-l-trust-ca', label: 'Canadian Support' },
      ],
      visual: {
        src: '/assets/images/illustrations/tiktok-dashboard.svg',
        alt: 'TikTok video likes engagement dashboard illustration',
        width: 1000,
        height: 800,
      },
    },
    pricing: {
      id: 'pricing-packages',
      title: 'Choose Your TikTok Likes Package',
      description:
        'Select the number of likes that fits your campaign. Every package includes secure checkout, gradual delivery options and order tracking.',
      purpose: 'Present real InstantViral.ca TikTok likes packages',
      primaryKeyword: 'TikTok likes packages',
      suggestedWordCount: 40,
      packageIds: [],
      primaryCtaLabel: 'Order Now',
      emptyMessage: 'TikTok Likes packages are temporarily unavailable.',
    },
    benefits: {
      id: 'why-buy-tiktok-likes',
      title: 'Support Better TikTok Engagement',
      description:
        "Likes help strengthen the appearance of active content and encourage stronger engagement signals. Whether you're promoting a product, growing a creator account or increasing visibility for a campaign, choosing the right package can support your overall TikTok strategy.",
      purpose: 'Explain informed use of TikTok likes packages',
      primaryKeyword: 'buy TikTok likes',
      suggestedWordCount: 180,
      items: [
        {
          id: 'tt-l-higher-engagement',
          title: 'Higher Engagement',
          description: 'Likes help create stronger social proof on public videos.',
        },
        {
          id: 'tt-l-natural-appearance',
          title: 'Natural Appearance',
          description:
            'Gradual delivery helps maintain a realistic engagement pattern.',
        },
        {
          id: 'tt-l-creator-friendly',
          title: 'Creator Friendly',
          description: 'Suitable for influencers, brands and businesses.',
        },
        {
          id: 'tt-l-public-video',
          title: 'Public Video Only',
          description: 'No login credentials are ever required.',
        },
      ],
    },
    whyInstantViral: {
      id: 'why-choose-instantviral-tiktok-likes',
      title: 'Why Choose TikTok Likes From InstantViral?',
      description:
        "Whether you're launching a new video, promoting a product or building a creator profile, increasing engagement can help strengthen the first impression your content makes. Our service focuses on gradual delivery, secure ordering and a straightforward buying experience.",
      purpose: 'Build trust with unique TikTok likes value props',
      primaryKeyword: 'buy real TikTok likes',
      suggestedWordCount: 150,
      items: [
        {
          id: 'tt-l-why-engagement',
          title: 'Real Engagement Support',
          description:
            'Likes help reinforce visible engagement on your public videos.',
        },
        {
          id: 'tt-l-why-gradual',
          title: 'Gradual Delivery',
          description:
            'Packages can be delivered naturally for a balanced appearance.',
        },
        {
          id: 'tt-l-why-checkout',
          title: 'Secure Checkout',
          description: 'Safe ordering process with encrypted payment.',
        },
        {
          id: 'tt-l-why-password',
          title: 'No Password Needed',
          description: 'Only your public TikTok video link is required.',
        },
        {
          id: 'tt-l-why-support',
          title: 'Canadian Support',
          description:
            'Friendly customer support whenever you need assistance.',
        },
        {
          id: 'tt-l-why-track',
          title: 'Track Your Order',
          description:
            'Follow your order status from confirmation through delivery.',
        },
      ],
      cta: {
        label: 'View TikTok Likes Packages',
        href: PRICING_ANCHOR,
      },
    },
    features: {
      id: 'buy-tiktok-likes-features',
      title: 'Features',
      description: '',
      purpose: 'Unused on 09.22 — Video Link and Delivery Requirements is separate',
      items: [],
    },
    howItWorks: {
      id: 'how-it-works',
      title: 'How To Buy TikTok Likes',
      description: '',
      purpose: 'Explain the five-step ordering process',
      primaryKeyword: 'buy TikTok likes',
      suggestedWordCount: 140,
      steps: [
        {
          id: 'tt-l-step-1',
          title: 'Choose Your Package',
          description:
            'Select the likes quantity that fits your video and campaign goals.',
        },
        {
          id: 'tt-l-step-2',
          title: 'Paste Your Public TikTok Video URL',
          description:
            'Add the public link for the TikTok video that should receive likes.',
        },
        {
          id: 'tt-l-step-3',
          title: 'Review Your Order',
          description:
            'Confirm the package, video URL and checkout details before paying.',
        },
        {
          id: 'tt-l-step-4',
          title: 'Complete Secure Checkout',
          description:
            'Finish payment through encrypted checkout without sharing account credentials.',
        },
        {
          id: 'tt-l-step-5',
          title: 'Track Delivery Progress',
          description:
            'Monitor available updates from confirmation through completed delivery.',
        },
      ],
      cta: {
        label: 'Select a Package',
        href: PRICING_ANCHOR,
      },
    },
    deliveryAndSafety: {
      id: 'video-link-and-delivery',
      title: 'What We Need To Process Your Order',
      description:
        'To begin processing your order quickly, we only need a few public details.',
      purpose: 'Explain video URL and processing requirements',
      primaryKeyword: 'TikTok likes packages',
      suggestedWordCount: 120,
      items: [
        {
          id: 'tt-l-req-url',
          title: 'Public Video URL',
          description: 'The public TikTok video you want to promote.',
        },
        {
          id: 'tt-l-req-package',
          title: 'Package Selection',
          description: 'Choose the number of likes that matches your campaign.',
        },
        {
          id: 'tt-l-req-email',
          title: 'Valid Email Address',
          description: 'Used for order updates and tracking.',
        },
        {
          id: 'tt-l-req-payment',
          title: 'Secure Payment',
          description:
            'Complete checkout safely without sharing account credentials.',
        },
      ],
    },
    reviews: {
      id: 'tt-likes-reviews',
      title: 'What Customers Say About InstantViral',
      description:
        'Customer reviews for this InstantViral service.',
      purpose: 'Social proof from approved customer reviews',
      testimonialIds: [],
    },
    faq: {
      id: 'tt-likes-faq',
      title: 'Things To Know Before Ordering',
      description: '',
      purpose: 'Answer buying questions with FAQPage schema',
      primaryKeyword: 'buy TikTok likes Canada',
      faqIds: [
        'faq-tt-likes-password',
        'faq-tt-likes-repeat',
        'faq-tt-likes-packages',
        'faq-tt-likes-delivery-speed',
        'faq-tt-likes-track',
      ],
    },
    relatedServices: {
      id: 'related-tiktok-services-likes',
      title: 'Explore More TikTok Growth Services',
      description: '',
      purpose: 'Internal links to sibling TikTok offers',
      serviceSlugs: [
        'buy-tiktok-followers',
        'buy-tiktok-views',
      ],
    },
    finalCta: {
      id: 'tt-likes-final-cta',
      title: 'Ready To Increase Your TikTok Engagement?',
      description:
        'Choose the TikTok Likes package that fits your goals, complete your secure order and start building stronger engagement on your public videos.',
      purpose: 'Drive conversion to pricing packages',
      primaryCta: {
        label: 'Choose TikTok Likes Package',
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
 * Buy TikTok Views Canada — Document 09.23 production content.
 * Packages resolved from InstantViral catalog (Buzzoid-synced HQ + Premium tiers).
 */
function buildBuyTikTokViewsContent(): ServiceContent {
  return {
    slug: 'buy-tiktok-views',
    platformId: 'tiktok',
    seo: {
      title: 'Buy TikTok Views Canada | InstantViral',
      description:
        'Buy TikTok Views Canada with real video views packages. Public video URL only, secure checkout, gradual delivery and order tracking for creators and businesses.',
    },
    hero: {
      eyebrow: 'REAL TIKTOK VIDEO VIEWS FOR CANADIAN CREATORS & BUSINESSES',
      title: 'Buy TikTok Views Canada',
      description:
        'Increase visibility for your TikTok videos with real views delivered through a secure ordering process. Choose the package that fits your campaign, submit your public TikTok video link and monitor every stage of your order. Built for creators, brands and businesses across Canada.',
      purpose: 'Convert for TikTok views packages in Canada',
      primaryKeyword: 'buy TikTok views Canada',
      supportingKeywords: [
        'Buy TikTok Views',
        'Real TikTok Views',
        'Increase TikTok Video Views',
        'TikTok Views Packages',
        'TikTok Video Promotion',
      ],
      suggestedWordCount: 120,
      primaryCta: {
        label: 'Choose TikTok Views Package',
        href: PRICING_ANCHOR,
      },
      secondaryCta: {
        label: 'View Delivery Information',
        href: '#video-link-and-delivery',
      },
      trustLabels: [
        { id: 'tt-v-trust-url', label: 'Public Video URL Only' },
        { id: 'tt-v-trust-checkout', label: 'Secure Checkout' },
        { id: 'tt-v-trust-gradual', label: 'Gradual Delivery' },
        { id: 'tt-v-trust-track', label: 'Order Tracking' },
        { id: 'tt-v-trust-ca', label: 'Canadian Support' },
      ],
      visual: {
        src: '/assets/images/illustrations/tiktok-dashboard.svg',
        alt: 'TikTok video views and reach analytics illustration',
        width: 1000,
        height: 800,
      },
    },
    pricing: {
      id: 'pricing-packages',
      title: 'Choose Your TikTok Views Package',
      description:
        'Select the number of video views that matches your campaign goals. Every package includes secure checkout, gradual delivery and order tracking.',
      purpose: 'Present real InstantViral.ca TikTok views packages',
      primaryKeyword: 'TikTok views packages',
      suggestedWordCount: 40,
      packageIds: [],
      primaryCtaLabel: 'Order Now',
      emptyMessage: 'TikTok Views packages are temporarily unavailable.',
    },
    benefits: {
      id: 'why-buy-tiktok-views',
      title: 'Help More People Discover Your Videos',
      description:
        'Video views are one of the first engagement signals on TikTok. A healthy view count can strengthen first impressions, make videos appear more active and support your overall content strategy when combined with quality videos.',
      purpose: 'Explain informed use of TikTok views packages',
      primaryKeyword: 'buy TikTok views',
      suggestedWordCount: 180,
      items: [
        {
          id: 'tt-v-increase-visibility',
          title: 'Increase Visibility',
          description: 'Higher view counts create stronger social proof.',
        },
        {
          id: 'tt-v-support-campaigns',
          title: 'Support Campaigns',
          description: 'Useful for product launches and promotions.',
        },
        {
          id: 'tt-v-natural-delivery',
          title: 'Natural Delivery',
          description: 'Gradual delivery helps maintain realistic activity.',
        },
        {
          id: 'tt-v-creator-friendly',
          title: 'Creator Friendly',
          description: 'Suitable for influencers, brands and businesses.',
        },
      ],
    },
    whyInstantViral: {
      id: 'why-choose-instantviral-tiktok-views',
      title: 'Why Buy TikTok Views From InstantViral?',
      description:
        "Whether you're launching a new video, promoting a product or growing your creator profile, video views help create stronger first impressions. Our service focuses on secure ordering, gradual delivery and a smooth customer experience.",
      purpose: 'Build trust with unique TikTok views value props',
      primaryKeyword: 'buy TikTok views',
      suggestedWordCount: 150,
      items: [
        {
          id: 'tt-v-why-real',
          title: 'Real Video Views',
          description: 'Packages designed for public TikTok videos.',
        },
        {
          id: 'tt-v-why-checkout',
          title: 'Secure Checkout',
          description: 'Encrypted payment process with safe ordering.',
        },
        {
          id: 'tt-v-why-gradual',
          title: 'Gradual Delivery',
          description: 'Views delivered naturally over time.',
        },
        {
          id: 'tt-v-why-password',
          title: 'No Password Needed',
          description: 'Only your public video URL is required.',
        },
        {
          id: 'tt-v-why-track',
          title: 'Order Tracking',
          description: 'Track your order from checkout until delivery.',
        },
        {
          id: 'tt-v-why-support',
          title: 'Canadian Support',
          description: 'Friendly support whenever assistance is needed.',
        },
      ],
      cta: {
        label: 'View TikTok Views Packages',
        href: PRICING_ANCHOR,
      },
    },
    features: {
      id: 'buy-tiktok-views-features',
      title: 'Features',
      description: '',
      purpose: 'Unused on 09.23 — Video Link and Delivery Requirements is separate',
      items: [],
    },
    howItWorks: {
      id: 'how-it-works',
      title: 'How To Buy TikTok Views',
      description: '',
      purpose: 'Explain the five-step ordering process',
      primaryKeyword: 'buy TikTok views',
      suggestedWordCount: 140,
      steps: [
        {
          id: 'tt-v-step-1',
          title: 'Choose Your Package',
          description: 'Select the view package that matches your campaign.',
        },
        {
          id: 'tt-v-step-2',
          title: 'Paste Your Public TikTok Video URL',
          description: 'No login credentials are required.',
        },
        {
          id: 'tt-v-step-3',
          title: 'Review Your Order',
          description: 'Confirm package details before checkout.',
        },
        {
          id: 'tt-v-step-4',
          title: 'Complete Secure Checkout',
          description: 'Finish payment through our secure ordering system.',
        },
        {
          id: 'tt-v-step-5',
          title: 'Track Delivery',
          description: 'Monitor your order until delivery is complete.',
        },
      ],
      cta: {
        label: 'Select a Package',
        href: PRICING_ANCHOR,
      },
    },
    deliveryAndSafety: {
      id: 'video-link-and-delivery',
      title: 'What We Need To Process Your Order',
      description:
        'To begin processing your order quickly, we only need a few public details.',
      purpose: 'Explain video URL and processing requirements',
      primaryKeyword: 'TikTok views packages',
      suggestedWordCount: 120,
      items: [
        {
          id: 'tt-v-req-url',
          title: 'Public Video URL',
          description: 'The TikTok video you want to promote.',
        },
        {
          id: 'tt-v-req-package',
          title: 'Selected Package',
          description: 'Choose the number of views you need.',
        },
        {
          id: 'tt-v-req-email',
          title: 'Email Address',
          description: 'Receive delivery updates and tracking information.',
        },
        {
          id: 'tt-v-req-payment',
          title: 'Secure Payment',
          description:
            'Complete checkout safely without sharing account credentials.',
        },
      ],
    },
    reviews: {
      id: 'tt-views-reviews',
      title: 'What Customers Say About InstantViral',
      description:
        'Customer reviews for this InstantViral service.',
      purpose: 'Social proof from approved customer reviews',
      testimonialIds: [],
    },
    faq: {
      id: 'tt-views-faq',
      title: 'Things To Know Before Ordering',
      description: 'Clear answers before you choose a TikTok Views package.',
      purpose: 'Answer buying questions with FAQPage schema',
      primaryKeyword: 'buy TikTok views Canada',
      faqIds: [
        'faq-tt-views-password',
        'faq-tt-views-repeat',
        'faq-tt-views-packages',
        'faq-tt-views-delivery-speed',
        'faq-tt-views-track',
      ],
    },
    relatedServices: {
      id: 'related-tiktok-services-views',
      title: 'Explore More TikTok Growth Services',
      description:
        'Views are one part of TikTok video promotion. Explore follower and likes packages that can support the same campaign.',
      purpose: 'Internal links to sibling TikTok offers',
      serviceSlugs: [
        'buy-tiktok-followers',
        'buy-tiktok-likes',
      ],
      cta: {
        label: 'Explore TikTok Services',
        href: PRICING_ANCHOR,
      },
    },
    finalCta: {
      id: 'tt-views-final-cta',
      title: 'Ready To Increase Your TikTok Video Reach?',
      description:
        'Choose the TikTok Views package that fits your campaign, complete your secure order and start building stronger visibility for your public videos.',
      purpose: 'Drive conversion to pricing packages',
      primaryCta: {
        label: 'Choose TikTok Views Package',
        href: PRICING_ANCHOR,
      },
      secondaryCta: {
        label: 'Contact Support',
        href: routes.contact,
      },
    },
  };
}


/** TikTok service page content — keyed by buy-* slug. */
export const tiktokContent: Record<string, ServiceContent> = {
  'buy-tiktok-followers': buildBuyTikTokFollowersContent(),
  'buy-tiktok-likes': buildBuyTikTokLikesContent(),
  'buy-tiktok-views': buildBuyTikTokViewsContent(),
};

export function getTikTokContent(slug: string): ServiceContent | undefined {
  return tiktokContent[slug];
}
