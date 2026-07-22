import { routes } from '@/config/routes';
import type { ServiceContent } from '@/types/content';

const PRICING_ANCHOR = '#pricing-packages';
const HOW_IT_WORKS_ANCHOR = '#how-it-works';

/**
 * Buy Facebook Followers Canada — Document 09.31 production content.
 * Other Facebook services remain factory placeholders until their production docs land.
 */
function buildBuyFacebookFollowersContent(): ServiceContent {
  return {
    slug: 'buy-facebook-followers',
    platformId: 'facebook',
    seo: {
      title: 'Buy Facebook Followers Canada | Packages & Pricing',
      description:
        'Buy Facebook Followers Canada with clear package options, public page URL checkout, gradual delivery details and order tracking. No password required.',
    },
    hero: {
      eyebrow: 'FACEBOOK FOLLOWER PACKAGES FOR CANADIAN BUSINESSES, CREATORS & BRANDS',
      title: 'Buy Facebook Followers Canada',
      description:
        'Grow your Facebook presence with follower packages designed for creators, businesses and brands across Canada. Choose the package that fits your goals, submit your public Facebook page URL and complete your order through our secure checkout. Track your order from confirmation through delivery without ever sharing your Facebook password.',
      purpose: 'Convert for Facebook follower packages in Canada',
      primaryKeyword: 'buy Facebook followers Canada',
      supportingKeywords: [
        'Buy Facebook Followers',
        'Real Facebook Followers',
        'Facebook Followers Packages',
        'Increase Facebook Followers',
        'Facebook Page Followers',
      ],
      suggestedWordCount: 120,
      primaryCta: {
        label: 'Choose Followers Package',
        href: PRICING_ANCHOR,
      },
      secondaryCta: {
        label: 'View Delivery Information',
        href: '#what-we-need-from-you',
      },
      trustLabels: [
        { id: 'fb-f-trust-url', label: 'Public Facebook Page URL Only' },
        { id: 'fb-f-trust-checkout', label: 'Secure Checkout' },
        { id: 'fb-f-trust-track', label: 'Order Tracking' },
        { id: 'fb-f-trust-gradual', label: 'Gradual Delivery' },
        { id: 'fb-f-trust-ca', label: 'Canadian Support' },
      ],
      visual: {
        src: '/assets/images/illustrations/facebook-dashboard.svg',
        alt: 'Facebook Business Suite page followers analytics dashboard illustration',
        width: 1000,
        height: 800,
      },
    },
    pricing: {
      id: 'pricing-packages',
      title: 'Choose Your Facebook Followers Package',
      description:
        'Select the follower package that matches your business or community goals. Every package includes secure checkout, transparent delivery updates and order tracking from start to finish.',
      purpose: 'Present real InstantViral.ca Facebook followers packages',
      primaryKeyword: 'Facebook follower packages',
      suggestedWordCount: 40,
      packageIds: [],
      primaryCtaLabel: 'Order Now',
      emptyMessage: 'Facebook Followers packages are temporarily unavailable.',
    },
    benefits: {
      id: 'why-buy-facebook-followers',
      title: 'Build A Stronger Facebook Community',
      description:
        "A growing follower count can help strengthen your Facebook page's credibility and encourage more visitors to explore your content. Combined with consistent posting and valuable updates, follower growth supports long-term community building and brand visibility.",
      purpose: 'Explain informed use of Facebook followers packages',
      primaryKeyword: 'buy Facebook followers',
      suggestedWordCount: 180,
      items: [
        {
          id: 'fb-f-credibility',
          title: 'Build Credibility',
          description: 'A larger follower base creates a stronger first impression.',
        },
        {
          id: 'fb-f-community',
          title: 'Support Community Growth',
          description: 'Suitable for businesses, creators, organisations and brands.',
        },
        {
          id: 'fb-f-flexible',
          title: 'Flexible Packages',
          description: 'Choose a package that matches your current audience and objectives.',
        },
        {
          id: 'fb-f-secure',
          title: 'Private & Secure',
          description: 'Only your public Facebook page URL is required.',
        },
      ],
    },
    whyInstantViral: {
      id: 'why-choose-instantviral-facebook-followers',
      title: 'Why Buy Facebook Followers From InstantViral?',
      description:
        "A larger follower base can strengthen your Facebook page's credibility and help create a stronger first impression for new visitors. Combined with regular posting and valuable content, follower growth supports long-term community building and brand awareness.",
      purpose: 'Build trust with clear ordering benefits',
      primaryKeyword: 'Facebook growth service Canada',
      suggestedWordCount: 150,
      items: [
        {
          id: 'fb-f-why-community',
          title: 'Build Community',
          description: 'Grow a stronger audience around your Facebook page.',
        },
        {
          id: 'fb-f-why-credibility',
          title: 'Improve Credibility',
          description: 'A larger follower count can help establish trust.',
        },
        {
          id: 'fb-f-why-checkout',
          title: 'Secure Checkout',
          description: 'Protected ordering with secure payment processing.',
        },
        {
          id: 'fb-f-why-password',
          title: 'No Password Required',
          description: 'Only your public Facebook page URL is needed.',
        },
        {
          id: 'fb-f-why-track',
          title: 'Track Every Order',
          description: 'Monitor delivery progress using your order details.',
        },
        {
          id: 'fb-f-why-support',
          title: 'Canadian Support',
          description: 'Our support team is available whenever assistance is required.',
        },
      ],
    },
    features: {
      id: 'facebook-followers-delivery',
      title: 'Facebook Followers Delivery',
      description:
        'Delivery begins after your order has been reviewed and confirmed. Processing time depends on the selected package and current demand. You can review available progress updates through the order tracking page until delivery is complete.',
      purpose: 'Explain Facebook followers delivery stages',
      primaryKeyword: 'Facebook followers delivery',
      suggestedWordCount: 120,
      items: [
        {
          id: 'fb-f-del-review',
          title: 'Order Review',
          description: 'Your page URL and selected package are verified.',
        },
        {
          id: 'fb-f-del-begins',
          title: 'Delivery Begins',
          description: 'Followers begin according to the delivery estimate.',
        },
        {
          id: 'fb-f-del-progress',
          title: 'Followers Increasing',
          description: 'Review your order status through the tracking page.',
        },
        {
          id: 'fb-f-del-complete',
          title: 'Order Complete',
          description: 'The selected follower package has been delivered.',
        },
      ],
    },
    howItWorks: {
      id: 'how-it-works',
      title: 'How To Buy Facebook Followers',
      description: 'Ordering Facebook followers only takes a few simple steps.',
      purpose: 'Explain the five-step ordering process',
      primaryKeyword: 'buy Facebook followers',
      suggestedWordCount: 140,
      steps: [
        {
          id: 'fb-f-step-1',
          title: 'Choose Your Followers Package',
          description: 'Select the package that best suits your page.',
        },
        {
          id: 'fb-f-step-2',
          title: 'Paste Your Public Facebook Page URL',
          description: 'Enter the public URL of your Facebook page.',
        },
        {
          id: 'fb-f-step-3',
          title: 'Review Your Order',
          description: 'Confirm the selected package and page details.',
        },
        {
          id: 'fb-f-step-4',
          title: 'Complete Secure Checkout',
          description: 'Finish payment using the secure ordering system.',
        },
        {
          id: 'fb-f-step-5',
          title: 'Track Delivery',
          description: 'Use your order details to monitor delivery progress.',
        },
      ],
    },
    deliveryAndSafety: {
      id: 'page-link-and-delivery',
      title: 'What We Need To Process Your Order',
      description:
        'We only require the information necessary to identify your Facebook page and complete your order. Private login information is never requested.',
      purpose: 'Explain page URL and order requirements',
      primaryKeyword: 'Facebook followers delivery',
      suggestedWordCount: 120,
      items: [
        {
          id: 'fb-f-req-url',
          title: 'Public Facebook Page URL',
          description: 'Submit the public URL of the page receiving followers.',
        },
        {
          id: 'fb-f-req-package',
          title: 'Selected Followers Package',
          description: 'Choose the quantity that matches your growth goals.',
        },
        {
          id: 'fb-f-req-public',
          title: 'Public Facebook Page',
          description: 'Keep your page publicly accessible during delivery.',
        },
        {
          id: 'fb-f-req-email',
          title: 'Valid Email Address',
          description: 'Used for confirmation and order tracking.',
        },
      ],
    },
    reviews: {
      id: 'fb-followers-reviews',
      title: 'What Customers Say About InstantViral',
      description: 'Customer reviews for this InstantViral service.',
      purpose: 'Social proof from approved customer reviews',
      testimonialIds: [],
    },
    faq: {
      id: 'fb-followers-faq',
      title: 'Frequently Asked Questions About Facebook Followers',
      description: 'Answers to common questions before you choose a package.',
      purpose: 'Answer buying questions with FAQPage schema',
      primaryKeyword: 'buy Facebook followers Canada',
      faqIds: [
        'faq-fb-followers-choose-package',
        'faq-fb-followers-password',
        'faq-fb-followers-public',
        'faq-fb-followers-delivery-begin',
        'faq-fb-followers-track',
        'faq-fb-followers-order-again',
        'faq-fb-followers-change-url',
        'faq-fb-followers-after-checkout',
        'faq-fb-followers-gradual',
        'faq-fb-followers-support',
      ],
    },
    relatedServices: {
      id: 'related-facebook-services-followers',
      title: 'Explore More Facebook Growth Services',
      purpose: 'Internal links to sibling Facebook offers (no skipped services)',
      serviceSlugs: ['buy-facebook-page-likes', 'buy-facebook-post-likes'],
    },
    finalCta: {
      id: 'fb-followers-final-cta',
      title: 'Ready To Grow Your Facebook Community?',
      description:
        'Choose the Facebook followers package that matches your goals, submit your public page URL and complete your secure order. Track every stage from confirmation through delivery.',
      purpose: 'Drive conversion to pricing packages',
      primaryCta: {
        label: 'Choose Facebook Followers Package',
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
 * Buy Facebook Page Likes Canada — Document 09.32 production content.
 */
function buildBuyFacebookPageLikesContent(): ServiceContent {
  return {
    slug: 'buy-facebook-page-likes',
    platformId: 'facebook',
    seo: {
      title: 'Buy Facebook Page Likes Canada | Packages & Pricing',
      description:
        'Buy Facebook Page Likes Canada with clear package options, public page URL checkout, gradual delivery details and order tracking. No password required.',
    },
    hero: {
      eyebrow: 'FACEBOOK PAGE LIKE PACKAGES FOR CANADIAN BUSINESSES, BRANDS & CREATORS',
      title: 'Buy Facebook Page Likes Canada',
      description:
        'Build a stronger Facebook presence with page like packages designed for businesses, creators and brands across Canada. Choose the package that fits your goals, submit your public Facebook page URL and complete your secure order in just a few steps. Track your order from confirmation through delivery without ever sharing your Facebook password.',
      purpose: 'Convert for Facebook page likes packages in Canada',
      primaryKeyword: 'buy Facebook page likes Canada',
      supportingKeywords: [
        'Buy Facebook Page Likes',
        'Facebook Page Likes',
        'Real Facebook Page Likes',
        'Increase Facebook Page Likes',
        'Facebook Page Likes Packages',
      ],
      suggestedWordCount: 120,
      primaryCta: {
        label: 'Choose Page Likes Package',
        href: PRICING_ANCHOR,
      },
      secondaryCta: {
        label: 'View Delivery Information',
        href: '#what-we-need-from-you',
      },
      trustLabels: [
        { id: 'fb-pl-trust-url', label: 'Public Facebook Page URL Only' },
        { id: 'fb-pl-trust-checkout', label: 'Secure Checkout' },
        { id: 'fb-pl-trust-track', label: 'Order Tracking' },
        { id: 'fb-pl-trust-gradual', label: 'Gradual Delivery' },
        { id: 'fb-pl-trust-ca', label: 'Canadian Support' },
      ],
      visual: {
        src: '/assets/images/illustrations/facebook-dashboard.svg',
        alt: 'Facebook Business Suite page likes analytics dashboard illustration',
        width: 1000,
        height: 800,
      },
    },
    pricing: {
      id: 'pricing-packages',
      title: 'Choose Your Facebook Page Likes Package',
      description:
        'Select the page like package that matches your business goals. Every package includes secure checkout, delivery updates and order tracking from start to finish.',
      purpose: 'Present real InstantViral.ca Facebook page likes packages',
      primaryKeyword: 'Facebook page likes packages',
      suggestedWordCount: 40,
      packageIds: [],
      primaryCtaLabel: 'Order Now',
      emptyMessage: 'Facebook Page Likes packages are temporarily unavailable.',
    },
    benefits: {
      id: 'why-buy-facebook-page-likes',
      title: 'Build A More Trusted Facebook Page',
      description:
        "Page likes help strengthen your Facebook page's credibility and create a stronger first impression for visitors. Combined with regular posting and valuable content, page likes can support long-term brand visibility and community growth.",
      purpose: 'Explain informed use of Facebook page likes packages',
      primaryKeyword: 'buy Facebook page likes',
      suggestedWordCount: 180,
      items: [
        {
          id: 'fb-pl-credibility',
          title: 'Increase Page Credibility',
          description: 'A stronger page like count helps build trust with new visitors.',
        },
        {
          id: 'fb-pl-presence',
          title: 'Strengthen Brand Presence',
          description: 'Suitable for businesses, creators, organisations and brands.',
        },
        {
          id: 'fb-pl-flexible',
          title: 'Flexible Packages',
          description: 'Choose a package that matches your current page size.',
        },
        {
          id: 'fb-pl-secure',
          title: 'Private & Secure',
          description: 'Only your public Facebook page URL is required.',
        },
      ],
    },
    whyInstantViral: {
      id: 'why-choose-instantviral-facebook-page-likes',
      title: 'Why Buy Facebook Page Likes From InstantViral?',
      description:
        'Page likes are one of the first trust signals visitors notice when they discover a Facebook page. A stronger page like count can support brand credibility, encourage more visitors to explore your content and help create a more established online presence when combined with consistent posting.',
      purpose: 'Build trust with clear ordering benefits',
      primaryKeyword: 'Facebook growth service Canada',
      suggestedWordCount: 150,
      items: [
        {
          id: 'fb-pl-why-trust',
          title: 'Build Trust',
          description: 'A stronger page like count creates a positive first impression.',
        },
        {
          id: 'fb-pl-why-presence',
          title: 'Improve Brand Presence',
          description: 'Help your page appear more established.',
        },
        {
          id: 'fb-pl-why-checkout',
          title: 'Secure Checkout',
          description: 'Protected ordering with encrypted payment processing.',
        },
        {
          id: 'fb-pl-why-password',
          title: 'No Password Required',
          description: 'Only your public Facebook page URL is required.',
        },
        {
          id: 'fb-pl-why-track',
          title: 'Track Every Order',
          description: 'Follow your order through every stage of delivery.',
        },
        {
          id: 'fb-pl-why-support',
          title: 'Canadian Support',
          description: 'Helpful assistance whenever you need it.',
        },
      ],
    },
    features: {
      id: 'facebook-page-likes-delivery',
      title: 'Facebook Page Likes Delivery',
      description:
        'Delivery begins after your order has been confirmed and reviewed. Processing time depends on the selected package and current demand. You can review available progress updates through the order tracking page until delivery is complete.',
      purpose: 'Explain Facebook page likes delivery stages',
      primaryKeyword: 'Facebook page likes delivery',
      suggestedWordCount: 120,
      items: [
        {
          id: 'fb-pl-del-review',
          title: 'Order Review',
          description: 'Your page URL and selected package are verified before processing.',
        },
        {
          id: 'fb-pl-del-begins',
          title: 'Delivery Begins',
          description: 'Page likes begin according to the estimated delivery schedule.',
        },
        {
          id: 'fb-pl-del-progress',
          title: 'Progress Tracking',
          description: 'Monitor your order using the tracking page.',
        },
        {
          id: 'fb-pl-del-complete',
          title: 'Delivery Complete',
          description: 'The selected page likes package has been delivered.',
        },
      ],
    },
    howItWorks: {
      id: 'how-it-works',
      title: 'How To Buy Facebook Page Likes',
      description: 'Ordering Facebook page likes only takes a few simple steps.',
      purpose: 'Explain the five-step ordering process',
      primaryKeyword: 'buy Facebook page likes',
      suggestedWordCount: 140,
      steps: [
        {
          id: 'fb-pl-step-1',
          title: 'Choose Your Package',
          description: 'Select the package that matches your page goals.',
        },
        {
          id: 'fb-pl-step-2',
          title: 'Paste Your Public Facebook Page URL',
          description: 'Provide the public URL of your page.',
        },
        {
          id: 'fb-pl-step-3',
          title: 'Review Your Order',
          description: 'Verify the selected package and page details.',
        },
        {
          id: 'fb-pl-step-4',
          title: 'Complete Secure Checkout',
          description: 'Finish payment through our secure checkout process.',
        },
        {
          id: 'fb-pl-step-5',
          title: 'Track Delivery',
          description: 'Monitor delivery progress using your order details.',
        },
      ],
    },
    deliveryAndSafety: {
      id: 'page-link-and-delivery',
      title: 'What We Need To Process Your Order',
      description:
        'Only the information required to identify your Facebook page and complete your purchase is needed. Private account information is never requested.',
      purpose: 'Explain page URL and order requirements',
      primaryKeyword: 'Facebook page likes delivery',
      suggestedWordCount: 120,
      items: [
        {
          id: 'fb-pl-req-url',
          title: 'Public Facebook Page URL',
          description: 'Submit the public URL of the page receiving likes.',
        },
        {
          id: 'fb-pl-req-package',
          title: 'Selected Page Likes Package',
          description: 'Choose the quantity that matches your goals.',
        },
        {
          id: 'fb-pl-req-public',
          title: 'Public Facebook Page',
          description: 'Keep your page publicly accessible while delivery is in progress.',
        },
        {
          id: 'fb-pl-req-email',
          title: 'Valid Email Address',
          description: 'Used for order confirmation and tracking.',
        },
      ],
    },
    reviews: {
      id: 'fb-page-likes-reviews',
      title: 'What Customers Say About InstantViral',
      description: 'Customer reviews for this InstantViral service.',
      purpose: 'Social proof from approved customer reviews',
      testimonialIds: [],
    },
    faq: {
      id: 'fb-page-likes-faq',
      title: 'Frequently Asked Questions About Buying Facebook Page Likes',
      description: 'Answers to common questions before you choose a package.',
      purpose: 'Answer buying questions with FAQPage schema',
      primaryKeyword: 'buy Facebook page likes Canada',
      faqIds: [
        'faq-fb-page-likes-password',
        'faq-fb-page-likes-links',
        'faq-fb-page-likes-delivery-speed',
        'faq-fb-page-likes-gradual-delivery',
        'faq-fb-page-likes-refill',
        'faq-fb-page-likes-businesses',
        'faq-fb-page-likes-money-back',
        'faq-fb-page-likes-track',
      ],
    },
    relatedServices: {
      id: 'related-facebook-services-page-likes',
      title: 'Explore Related Facebook Services',
      purpose: 'Internal links to sibling Facebook offers (no skipped services)',
      serviceSlugs: ['buy-facebook-followers', 'buy-facebook-post-likes'],
    },
    finalCta: {
      id: 'fb-page-likes-final-cta',
      title: 'Choose Your Facebook Page Likes Package',
      description:
        'Review the available quantities, prices, delivery estimates, package features, and eligible refill terms, then select the package that fits your Facebook page.',
      purpose: 'Drive conversion to pricing packages',
      primaryCta: {
        label: 'View Packages',
        href: PRICING_ANCHOR,
      },
      secondaryCta: {
        label: 'Track an Order',
        href: routes.trackOrder,
      },
    },
  };
}

function buildBuyFacebookPostLikesContent(): ServiceContent {
  return {
    slug: 'buy-facebook-post-likes',
    platformId: 'facebook',
    seo: {
      title: 'Buy Facebook Post Likes Canada | Packages & Pricing',
      description:
        'Buy Facebook Post Likes Canada with clear post like packages, public post URL checkout, gradual delivery details and order tracking. No password required.',
    },
    hero: {
      eyebrow: 'FACEBOOK POST LIKE PACKAGES FOR CANADIAN BUSINESSES, BRANDS & CREATORS',
      title: 'Buy Facebook Post Likes Canada',
      description:
        'Increase engagement on your Facebook posts with post like packages designed for businesses, creators and brands across Canada. Choose the package that matches your campaign, submit your public Facebook post URL and complete checkout securely. Track your order from confirmation through delivery without sharing your Facebook password.',
      purpose: 'Convert for Facebook post likes packages in Canada',
      primaryKeyword: 'buy Facebook Post Likes Canada',
      supportingKeywords: [
        'Buy Facebook Post Likes',
        'Facebook Post Likes',
        'Real Facebook Post Likes',
        'Increase Facebook Post Likes',
        'Facebook Engagement Canada',
      ],
      suggestedWordCount: 120,
      primaryCta: {
        label: 'Choose Post Likes Package',
        href: PRICING_ANCHOR,
      },
      secondaryCta: {
        label: 'View Delivery Information',
        href: '#what-we-need-from-you',
      },
      trustLabels: [
        { id: 'fb-post-trust-url', label: 'Public Facebook Post URL Only' },
        { id: 'fb-post-trust-checkout', label: 'Secure Checkout' },
        { id: 'fb-post-trust-track', label: 'Order Tracking' },
        { id: 'fb-post-trust-gradual', label: 'Gradual Delivery' },
        { id: 'fb-post-trust-ca', label: 'Canadian Support' },
      ],
      visual: {
        src: '/assets/images/illustrations/facebook-dashboard.svg',
        alt: 'Facebook post preview with rising post likes and engagement analytics illustration',
        width: 1000,
        height: 800,
      },
    },
    pricing: {
      id: 'pricing-packages',
      title: 'Choose Your Facebook Post Likes Package',
      description:
        'Choose the package that matches your engagement goals. Every package includes secure checkout, transparent delivery updates and order tracking.',
      purpose: 'Present real InstantViral.ca Facebook post likes packages',
      primaryKeyword: 'Facebook Post Likes',
      suggestedWordCount: 40,
      packageIds: [],
      primaryCtaLabel: 'Order Now',
      emptyMessage: 'Facebook Post Likes packages are temporarily unavailable.',
    },
    benefits: {
      id: 'why-buy-facebook-post-likes',
      title: 'Strengthen Engagement On Your Facebook Posts',
      description:
        'Visible engagement can help individual Facebook posts appear more active and encourage additional interaction. Combined with valuable content and consistent publishing, post likes support stronger social proof around important updates, campaigns and announcements.',
      purpose: 'Explain informed use of Facebook post likes packages',
      primaryKeyword: 'Increase Facebook Post Likes',
      suggestedWordCount: 180,
      items: [
        {
          id: 'fb-post-engagement',
          title: 'Increase Post Engagement',
          description: 'Help individual posts appear more active.',
        },
        {
          id: 'fb-post-social-proof',
          title: 'Support Social Proof',
          description: 'Visible engagement encourages more interaction.',
        },
        {
          id: 'fb-post-flexible',
          title: 'Flexible Packages',
          description: 'Choose the package that fits your campaign.',
        },
        {
          id: 'fb-post-secure',
          title: 'Private & Secure',
          description: 'Only your public Facebook post URL is required.',
        },
      ],
    },
    whyInstantViral: {
      id: 'why-choose-instantviral-facebook-post-likes',
      title: 'Why Buy Facebook Post Likes From InstantViral?',
      description:
        "Post likes help create stronger engagement signals around individual Facebook posts. Whether you're promoting a product, announcing an event or sharing important updates, visible engagement can strengthen social proof and encourage more people to interact with your content.",
      purpose: 'Build trust with clear ordering benefits',
      primaryKeyword: 'Facebook Engagement Canada',
      suggestedWordCount: 150,
      items: [
        {
          id: 'fb-post-why-engagement',
          title: 'Increase Engagement',
          description: 'Help important posts appear more active.',
        },
        {
          id: 'fb-post-why-proof',
          title: 'Improve Social Proof',
          description: 'Visible likes create stronger first impressions.',
        },
        {
          id: 'fb-post-why-checkout',
          title: 'Secure Checkout',
          description: 'Protected ordering with secure payment processing.',
        },
        {
          id: 'fb-post-why-password',
          title: 'No Password Required',
          description: 'Only your public Facebook post URL is required.',
        },
        {
          id: 'fb-post-why-track',
          title: 'Track Every Order',
          description: 'Monitor progress from confirmation to completion.',
        },
        {
          id: 'fb-post-why-support',
          title: 'Canadian Support',
          description: 'Friendly assistance whenever you need help.',
        },
      ],
    },
    features: {
      id: 'facebook-post-likes-delivery',
      title: 'Facebook Post Likes Delivery',
      description:
        'Delivery begins after your order has been reviewed and confirmed. Processing time depends on the selected package and current demand. Progress updates remain available through order tracking until delivery is complete.',
      purpose: 'Explain Facebook post likes delivery stages',
      primaryKeyword: 'Facebook Post Likes',
      suggestedWordCount: 120,
      items: [
        {
          id: 'fb-post-del-review',
          title: 'Order Review',
          description: 'Your post URL and selected package are verified.',
        },
        {
          id: 'fb-post-del-begins',
          title: 'Delivery Begins',
          description: 'Post likes begin according to the delivery estimate.',
        },
        {
          id: 'fb-post-del-progress',
          title: 'Likes Increasing',
          description: 'Review your order status through the tracking page.',
        },
        {
          id: 'fb-post-del-complete',
          title: 'Order Complete',
          description: 'The selected post likes package has been delivered.',
        },
      ],
    },
    howItWorks: {
      id: 'how-it-works',
      title: 'How To Buy Facebook Post Likes',
      description: 'Ordering Facebook post likes only takes a few simple steps.',
      purpose: 'Explain the five-step ordering process',
      primaryKeyword: 'Buy Facebook Post Likes',
      suggestedWordCount: 140,
      steps: [
        {
          id: 'fb-post-step-1',
          title: 'Choose Your Package',
          description: 'Select the package that matches your campaign.',
        },
        {
          id: 'fb-post-step-2',
          title: 'Paste Your Public Facebook Post URL',
          description: 'Enter the exact public post URL.',
        },
        {
          id: 'fb-post-step-3',
          title: 'Review Your Order',
          description: 'Verify your package and post information.',
        },
        {
          id: 'fb-post-step-4',
          title: 'Complete Secure Checkout',
          description: 'Finish payment securely.',
        },
        {
          id: 'fb-post-step-5',
          title: 'Track Delivery',
          description: 'Review delivery progress using your order details.',
        },
      ],
    },
    deliveryAndSafety: {
      id: 'post-link-and-delivery',
      title: 'What We Need To Process Your Order',
      description:
        'Only the information required to identify your Facebook post and complete your purchase is needed. Private account information is never requested.',
      purpose: 'Explain post URL and order requirements',
      primaryKeyword: 'Real Facebook Post Likes',
      suggestedWordCount: 120,
      items: [
        {
          id: 'fb-post-req-url',
          title: 'Public Facebook Post URL',
          description: 'Submit the public URL of the post receiving likes.',
        },
        {
          id: 'fb-post-req-package',
          title: 'Selected Package',
          description: 'Choose the quantity that matches your campaign.',
        },
        {
          id: 'fb-post-req-public',
          title: 'Public Facebook Post',
          description: 'Keep the post publicly available while delivery is in progress.',
        },
        {
          id: 'fb-post-req-email',
          title: 'Valid Email Address',
          description: 'Used for confirmation and order tracking.',
        },
      ],
    },
    reviews: {
      id: 'fb-post-likes-reviews',
      title: 'What Customers Say About InstantViral',
      description: 'Customer reviews for this InstantViral service.',
      purpose: 'Social proof from approved customer reviews',
      testimonialIds: [],
    },
    faq: {
      id: 'fb-post-likes-faq',
      title: 'Facebook Post Likes Package FAQs',
      description:
        'Review common questions about eligible posts, package selection, checkout, delivery and tracking before placing an order.',
      purpose: 'Answer buying questions with FAQPage schema',
      primaryKeyword: 'buy Facebook Post Likes Canada',
      faqIds: [
        'faq-fb-post-likes-choose-package',
        'faq-fb-post-likes-password',
        'faq-fb-post-likes-public',
        'faq-fb-post-likes-page-url',
        'faq-fb-post-likes-video',
        'faq-fb-post-likes-delivery-begin',
        'faq-fb-post-likes-track',
        'faq-fb-post-likes-another-post',
        'faq-fb-post-likes-change-url',
        'faq-fb-post-likes-support',
      ],
    },
    relatedServices: {
      id: 'related-facebook-services-post-likes',
      title: 'Explore More Facebook Growth Services',
      purpose: 'Internal links to sibling Facebook offers (no skipped services)',
      serviceSlugs: ['buy-facebook-followers', 'buy-facebook-page-likes'],
    },
    finalCta: {
      id: 'fb-post-likes-final-cta',
      title: 'Ready to Increase Engagement on Your Facebook Post?',
      description:
        'Choose the Facebook post likes package that matches your campaign, submit the correct public post URL and complete checkout securely. Use your order information to monitor available delivery updates after confirmation.',
      purpose: 'Drive conversion to pricing packages',
      primaryCta: {
        label: 'Choose Facebook Post Likes Package',
        href: PRICING_ANCHOR,
      },
      secondaryCta: {
        label: 'Contact Support',
        href: routes.contact,
      },
    },
  };
}

/** Facebook service page content — keyed by buy-* slug. */
export const facebookContent: Record<string, ServiceContent> = {
  'buy-facebook-followers': buildBuyFacebookFollowersContent(),
  'buy-facebook-page-likes': buildBuyFacebookPageLikesContent(),
  'buy-facebook-post-likes': buildBuyFacebookPostLikesContent(),
};

export function getFacebookContent(slug: string): ServiceContent | undefined {
  return facebookContent[slug];
}
