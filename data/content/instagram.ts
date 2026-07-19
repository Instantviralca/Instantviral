import { routes } from '@/config/routes';
import type { ServiceContent } from '@/types/content';

const PRICING_ANCHOR = '#pricing-packages';
const HOW_IT_WORKS_ANCHOR = '#how-it-works';

/**
 * Buy Instagram Followers Canada — Document 09.11 production content.
 * Other Instagram services remain factory placeholders until their production docs land.
 */
function buildBuyInstagramFollowersContent(): ServiceContent {
  return {
    slug: 'buy-instagram-followers',
    platformId: 'instagram',
    seo: {
      title: 'Instagram Followers Packages & Pricing | InstantViral',
      description:
        'Compare Instagram Followers Packages, pricing and plans. Review delivery details, choose a package and place your order through a clear checkout flow.',
    },
    hero: {
      eyebrow: 'INSTAGRAM FOLLOWERS PRICING',
      title: 'Instagram Followers Packages',
      description:
        'Choose a Followers package that matches your audience goals. Compare quantities and pricing, read delivery details, then checkout with a public username only.',
      purpose: 'Convert visitors choosing Instagram follower packages',
      primaryKeyword: 'Instagram Followers Packages',
      supportingKeywords: [
        'Instagram Followers Pricing',
        'Instagram Followers Plans',
        'Instagram Followers Delivery',
        'Instagram Followers Order',
      ],
      suggestedWordCount: 60,
      primaryCta: {
        label: 'Choose a Package',
        href: PRICING_ANCHOR,
      },
      secondaryCta: {
        label: 'View Delivery Information',
        href: '#delivery-process',
      },
      trustLabels: [
        { id: 'ig-f-trust-password', label: 'No Password Required' },
        { id: 'ig-f-trust-public', label: 'Public Username Only' },
        { id: 'ig-f-trust-track', label: 'Order Tracking' },
        { id: 'ig-f-trust-support', label: 'Customer Support' },
      ],
      visual: {
        src: '/assets/images/illustrations/instagram-dashboard.svg',
        alt: 'Instagram profile dashboard showing available follower packages',
        width: 1000,
        height: 800,
      },
    },
    pricing: {
      id: 'pricing-packages',
      title: 'Instagram Followers Pricing',
      description:
        'Select a real package quantity and price. Delivery timing and refill eligibility are confirmed before checkout for the option you choose.',
      purpose: 'Present real InstantViral.ca follower packages',
      primaryKeyword: 'Instagram Followers Pricing',
      suggestedWordCount: 40,
      packageIds: [],
      primaryCtaLabel: 'Order Now',
      emptyMessage: 'Instagram follower packages are temporarily unavailable.',
    },
    benefits: {
      id: 'why-buy-instagram-followers',
      title: 'Support the Presence You Are Already Building',
      description: '',
      purpose: 'Unused on packages conversion layout',
      primaryKeyword: 'Instagram Followers Packages',
      suggestedWordCount: 40,
      items: [],
    },
    whyInstantViral: {
      id: 'why-choose-instantviral',
      title: 'Why Order From InstantViral',
      description: '',
      purpose: 'Unused on packages conversion layout',
      primaryKeyword: 'Instagram Followers Order',
      suggestedWordCount: 40,
      items: [],
    },
    // Retained for factory compatibility; Delivery and Safety uses deliveryAndSafety.
    features: {
      id: 'buy-instagram-followers-features',
      title: 'Features',
      description: '',
      purpose: 'Unused on packages conversion layout',
      items: [],
    },
    howItWorks: {
      id: 'how-it-works',
      title: 'How Instagram Followers Ordering Works',
      description:
        'Choose a package, enter your public username, complete checkout and track available updates.',
      purpose: 'Explain ordering process',
      primaryKeyword: 'Instagram Followers Order',
      suggestedWordCount: 80,
      steps: [
        {
          id: 'ig-f-step-1',
          title: 'Choose a Package',
          description: 'Compare quantities, prices and package details in the pricing grid.',
        },
        {
          id: 'ig-f-step-2',
          title: 'Enter Public Username',
          description: 'Provide the Instagram username connected to your profile.',
        },
        {
          id: 'ig-f-step-3',
          title: 'Review Your Order',
          description: 'Confirm package, price and delivery details before payment.',
        },
        {
          id: 'ig-f-step-4',
          title: 'Complete Checkout',
          description: 'Finish payment and receive your order confirmation by email.',
        },
        {
          id: 'ig-f-step-5',
          title: 'Track Progress',
          description: 'Use your order ID and email on the Track Order page.',
        },
      ],
      cta: {
        label: 'Choose a Package',
        href: PRICING_ANCHOR,
      },
    },
    deliveryAndSafety: {
      id: 'delivery-and-safety',
      title: 'Instagram Followers Delivery',
      description:
        'Delivery timing depends on the selected package. Gradual delivery and refill terms apply where stated before checkout.',
      purpose: 'Delivery clarification',
      primaryKeyword: 'Instagram Followers Delivery',
      suggestedWordCount: 60,
      items: [],
    },
    reviews: {
      id: 'ig-followers-reviews',
      title: 'Customer Reviews for Instagram Followers',
      description:
        'Customer reviews for this InstantViral Instagram service.',
      purpose: 'Social proof from approved customer reviews',
      testimonialIds: [],
    },
    faq: {
      id: 'ig-followers-faq',
      title: 'Instagram Followers Packages FAQs',
      description: 'Answers about choosing packages, delivery and placing an order.',
      purpose: 'Package and ordering FAQs with FAQPage schema',
      primaryKeyword: 'Instagram Followers Packages',
      faqIds: [
        'faq-ig-pkg-choose',
        'faq-ig-pkg-order-again',
        'faq-ig-pkg-split',
        'faq-ig-pkg-delivery-start',
        'faq-ig-pkg-gradual',
        'faq-ig-pkg-track',
        'faq-ig-pkg-after-checkout',
        'faq-ig-pkg-upgrade',
      ],
    },
    relatedServices: {
      id: 'related-instagram-services',
      title: 'Related Instagram Services',
      description:
        'Looking for more than followers? Explore likes, views and comments packages when you need broader profile support.',
      purpose: 'Internal links to sibling Instagram offers',
      serviceSlugs: [
        'buy-instagram-likes',
        'buy-instagram-views',
        'buy-instagram-comments',
      ],
      cta: {
        label: 'Explore Instagram Services',
        href: '/buy-instagram-followers',
      },
    },
    finalCta: {
      id: 'ig-followers-final-cta',
      title: 'Start Growing Your Audience',
      description:
        'Pick an Instagram Followers package that matches your creator growth or brand credibility goals, then checkout with a public username only.',
      purpose: 'Drive conversion to pricing packages',
      primaryCta: {
        label: 'Start Growing Your Audience',
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
 * Instagram Likes Packages — conversion layout (mirrors Followers packages page).
 */
function buildBuyInstagramLikesContent(): ServiceContent {
  return {
    slug: 'buy-instagram-likes',
    platformId: 'instagram',
    seo: {
      title: 'Instagram Likes Packages & Pricing | InstantViral',
      description:
        'Compare Instagram Likes Packages, pricing and plans. Review delivery details, choose a package and place your order with a public post URL only.',
    },
    hero: {
      eyebrow: 'INSTAGRAM LIKES PRICING',
      title: 'Instagram Likes Packages',
      description:
        'Pick a Likes package that supports stronger first impressions on posts or Reels. Compare pricing, check delivery, and order with a public Instagram post URL only.',
      purpose: 'Convert visitors choosing Instagram likes packages',
      primaryKeyword: 'Instagram Likes Packages',
      supportingKeywords: [
        'Buy Instagram Likes',
        'Buy Real Instagram Likes',
        'Instagram Likes Canada',
        'Instagram Likes Pricing',
        'Instagram Likes Delivery',
        'Instagram Likes Order Tracking',
        'Instagram Likes Packages Canada',
      ],
      suggestedWordCount: 70,
      primaryCta: {
        label: 'Choose a Package',
        href: PRICING_ANCHOR,
      },
      secondaryCta: {
        label: 'View Delivery Information',
        href: '#delivery-process',
      },
      trustLabels: [
        { id: 'ig-l-trust-public', label: 'Public Post URL Only' },
        { id: 'ig-l-trust-checkout', label: 'Secure Checkout' },
        { id: 'ig-l-trust-track', label: 'Order Tracking' },
        { id: 'ig-l-trust-support', label: 'Professional Support' },
      ],
      visual: {
        src: '/assets/images/illustrations/instagram-dashboard.svg',
        alt: 'Instagram post engagement dashboard showing likes packages and delivery tracking',
        width: 1000,
        height: 800,
      },
    },
    pricing: {
      id: 'pricing-packages',
      title: 'Instagram Likes Pricing',
      description:
        'Select a real likes package quantity and price. Delivery timing is confirmed before checkout for the option you choose.',
      purpose: 'Present real InstantViral.ca likes packages',
      primaryKeyword: 'Instagram Likes Pricing',
      suggestedWordCount: 40,
      packageIds: [],
      primaryCtaLabel: 'Order Now',
      emptyMessage: 'Instagram Likes packages are temporarily unavailable.',
    },
    benefits: {
      id: 'why-buy-instagram-likes',
      title: 'Support the Content You Are Already Publishing',
      description: '',
      purpose: 'Unused on packages conversion layout',
      primaryKeyword: 'Instagram Likes Packages',
      suggestedWordCount: 40,
      items: [],
    },
    whyInstantViral: {
      id: 'why-choose-instantviral-likes',
      title: 'Why Order From InstantViral',
      description: '',
      purpose: 'Unused on packages conversion layout',
      primaryKeyword: 'Instagram Likes Order',
      suggestedWordCount: 40,
      items: [],
    },
    features: {
      id: 'buy-instagram-likes-features',
      title: 'Features',
      description: '',
      purpose: 'Unused on packages conversion layout',
      items: [],
    },
    howItWorks: {
      id: 'how-it-works',
      title: 'How Instagram Likes Ordering Works',
      description:
        'Choose a package, enter your public post URL, complete checkout and track available updates.',
      purpose: 'Explain ordering process',
      primaryKeyword: 'Instagram Likes Order',
      suggestedWordCount: 80,
      steps: [
        {
          id: 'ig-l-step-1',
          title: 'Choose a Package',
          description: 'Compare quantities, prices and package details in the pricing grid.',
        },
        {
          id: 'ig-l-step-2',
          title: 'Enter Public Post URL',
          description: 'Provide the public Instagram post or Reel URL receiving the likes.',
        },
        {
          id: 'ig-l-step-3',
          title: 'Review Your Order',
          description: 'Confirm package, price and delivery details before payment.',
        },
        {
          id: 'ig-l-step-4',
          title: 'Complete Checkout',
          description: 'Finish payment and receive your order confirmation by email.',
        },
        {
          id: 'ig-l-step-5',
          title: 'Track Progress',
          description: 'Use your order ID and email on the Track Order page.',
        },
      ],
      cta: {
        label: 'Choose a Package',
        href: PRICING_ANCHOR,
      },
    },
    deliveryAndSafety: {
      id: 'delivery-and-safety',
      title: 'Instagram Likes Delivery',
      description:
        'Delivery timing depends on the selected package. Gradual delivery applies where stated before checkout.',
      purpose: 'Delivery clarification',
      primaryKeyword: 'Instagram Likes Delivery',
      suggestedWordCount: 60,
      items: [],
    },
    reviews: {
      id: 'ig-likes-reviews',
      title: 'Customer Reviews for Instagram Likes',
      description:
        'Customer reviews for this InstantViral Instagram service.',
      purpose: 'Social proof from approved customer reviews',
      testimonialIds: [],
    },
    faq: {
      id: 'ig-likes-faq',
      title: 'Instagram Likes Packages FAQs',
      description: 'Answers about choosing likes packages, delivery and placing an order.',
      purpose: 'Package and ordering FAQs with FAQPage schema',
      primaryKeyword: 'Instagram Likes Packages',
      faqIds: [
        'faq-ig-likes-pkg-choose',
        'faq-ig-likes-pkg-order-again',
        'faq-ig-likes-pkg-split',
        'faq-ig-likes-pkg-delivery-start',
        'faq-ig-likes-pkg-gradual',
        'faq-ig-likes-pkg-track',
        'faq-ig-likes-pkg-after-checkout',
        'faq-ig-likes-pkg-upgrade',
        'faq-ig-likes-pkg-password',
        'faq-ig-likes-pkg-any-post',
      ],
    },
    relatedServices: {
      id: 'related-instagram-services-likes',
      title: 'Related Instagram Services',
      description:
        'Looking for more than likes? Explore followers, views and comments packages when you need broader Instagram support.',
      purpose: 'Internal links to sibling Instagram offers',
      serviceSlugs: [
        'buy-instagram-followers',
        'buy-instagram-views',
        'buy-instagram-comments',
      ],
      cta: {
        label: 'Explore Instagram Services',
        href: '/buy-instagram-followers',
      },
    },
    finalCta: {
      id: 'ig-likes-final-cta',
      title: 'Boost Your Instagram Engagement',
      description:
        'Choose an Instagram Likes package that supports stronger post performance and first impressions, then checkout with a public post URL.',
      purpose: 'Drive conversion to pricing packages',
      primaryCta: {
        label: 'Boost Your Instagram Engagement',
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
 * Buy Instagram Views Canada — Document 09.13 production content.
 */
function buildBuyInstagramViewsContent(): ServiceContent {
  return {
    slug: 'buy-instagram-views',
    platformId: 'instagram',
    seo: {
      title: 'Buy Instagram Views for Reels & Video Reach | InstantViral',
      description:
        'Support Instagram Reel and video discoverability with real views packages, clear delivery estimates, no password required, and secure checkout on InstantViral.ca.',
    },
    hero: {
      eyebrow: 'INSTAGRAM VIDEO GROWTH SERVICES FOR CANADA',
      title: 'Buy Instagram Views Canada',
      description:
        'Help Reels and videos get started more often with real Views packages. Compare the InstantViral.ca options, confirm delivery timing, and order with a public video URL—no Instagram password required.',
      purpose: 'Convert for Instagram views packages in Canada',
      primaryKeyword: 'buy Instagram views Canada',
      supportingKeywords: [
        'Instagram views Canada',
        'Buy Instagram video views',
        'Buy Instagram Reel views',
        'Canadian Instagram views',
        'Instagram views packages',
        'Instagram video promotion Canada',
      ],
      suggestedWordCount: 120,
      primaryCta: {
        label: 'View Packages',
        href: PRICING_ANCHOR,
      },
      secondaryCta: {
        label: 'How It Works',
        href: HOW_IT_WORKS_ANCHOR,
      },
      trustLabels: [
        { id: 'ig-v-trust-2018', label: 'Trusted Since 2018' },
        { id: 'ig-v-trust-customers', label: '50,000+ Customers' },
        { id: 'ig-v-trust-password', label: 'No Password Required' },
        { id: 'ig-v-trust-support', label: '24/7 Support' },
        { id: 'ig-v-trust-refund', label: '30-Day Money-Back Guarantee' },
        { id: 'ig-v-trust-refill', label: 'Refill Protection on Eligible Packages' },
      ],
      visual: {
        src: '/assets/images/illustrations/instagram-dashboard.svg',
        alt: 'Instagram views growth service dashboard illustration',
        width: 1000,
        height: 800,
      },
    },
    pricing: {
      id: 'pricing-packages',
      title: 'Choose Your Instagram Views Package',
      description:
        'Select from the existing Instagram Views packages already imported from InstantViral.ca. Quantities, prices, delivery estimates, package features, badges, and availability come from the real pricing data layer.',
      purpose: 'Present real InstantViral.ca views packages',
      primaryKeyword: 'Instagram views packages',
      suggestedWordCount: 40,
      packageIds: [],
      primaryCtaLabel: 'Order Now',
      emptyMessage: 'Instagram Views packages are temporarily unavailable.',
    },
    benefits: {
      id: 'why-buy-instagram-views',
      title: 'Support the Videos and Reels You Want More People to See',
      description:
        'Instagram views are a visible signal of how often a video or Reel has been watched. For creators, they can help strengthen the presentation of tutorials, entertainment, behind-the-scenes clips, or campaign content. For businesses, views can support product demonstrations, promotions, customer stories, and branded video content.\n\nBuying views should not replace creative ideas, strong hooks, useful storytelling, or consistent publishing. It works best as one part of a wider strategy that includes quality content, relevant captions, audience interaction, and thoughtful promotion.',
      purpose: 'Explain informed use of views packages',
      primaryKeyword: 'buy Instagram views',
      suggestedWordCount: 180,
      items: [
        {
          id: 'ig-v-audience-creators',
          title: 'Creators',
          description:
            'Creators can use views packages to support tutorials, entertainment, behind-the-scenes clips, and campaign videos that deserve more visibility alongside strong hooks and consistent publishing.',
        },
        {
          id: 'ig-v-audience-ecommerce',
          title: 'E-commerce Brands',
          description:
            'E-commerce brands can help product demonstrations, promotions, and launch videos present more strongly to shoppers discovering the brand through Instagram video content.',
        },
        {
          id: 'ig-v-audience-local',
          title: 'Local Businesses',
          description:
            'Local businesses can support customer stories, service walkthroughs, and community updates so new viewers see video content that reflects the care behind the brand.',
        },
        {
          id: 'ig-v-audience-agencies',
          title: 'Agencies',
          description:
            'Agencies may use views packages to support client campaigns, launches, and branded video pushes while pairing promotion with clear creative direction and publishing plans.',
        },
      ],
    },
    whyInstantViral: {
      id: 'why-choose-instantviral-views',
      title: 'A Clearer Way to Buy Instagram Views',
      purpose: 'Build trust with conditional policy wording',
      primaryKeyword: 'Instagram video promotion Canada',
      suggestedWordCount: 150,
      items: [
        {
          id: 'ig-v-why-password',
          title: 'No Password Required',
          description:
            'The order form only needs the public URL of the Instagram video or Reel receiving the views.',
        },
        {
          id: 'ig-v-why-packages',
          title: 'Real Package Options',
          description:
            'Use the genuine Instagram Views packages already maintained for InstantViral.ca. Frontend prices and quantities are not invented.',
        },
        {
          id: 'ig-v-why-delivery',
          title: 'Package-Specific Delivery',
          description:
            'Each package should display its actual processing or delivery estimate from the pricing data.',
        },
        {
          id: 'ig-v-why-refill',
          title: 'Refill Protection',
          description:
            'Eligible packages may include refill coverage. Display the applicable terms clearly before checkout.',
        },
        {
          id: 'ig-v-why-refund',
          title: '30-Day Money-Back Guarantee',
          description:
            'Eligible purchases are covered under the Refund Policy and the service-specific conditions.',
        },
        {
          id: 'ig-v-why-support',
          title: '24/7 Support',
          description:
            'Support is available for package questions, order updates, and processing assistance.',
        },
      ],
      cta: {
        label: 'View Instagram Views Packages',
        href: PRICING_ANCHOR,
      },
    },
    features: {
      id: 'buy-instagram-views-features',
      title: 'Features',
      description: '',
      purpose: 'Unused on 09.13 — Video Link and Delivery Requirements is separate',
      items: [],
    },
    howItWorks: {
      id: 'how-it-works',
      title: 'How to Buy Instagram Views',
      description:
        'The ordering process is designed to be simple, transparent, and easy to complete on mobile or desktop.',
      purpose: 'Explain the five-step ordering process',
      primaryKeyword: 'buy Instagram views',
      suggestedWordCount: 140,
      steps: [
        {
          id: 'ig-v-step-1',
          title: 'Choose a Package',
          description:
            'Review the real quantities, prices, package features, and delivery estimates available for Instagram Views.',
        },
        {
          id: 'ig-v-step-2',
          title: 'Add the Video or Reel URL',
          description:
            'Provide the public Instagram link for the content receiving the views.',
        },
        {
          id: 'ig-v-step-3',
          title: 'Review the Details',
          description:
            'Confirm the selected package, content URL, price, delivery estimate, and any applicable refill terms.',
        },
        {
          id: 'ig-v-step-4',
          title: 'Complete Checkout',
          description:
            'Enter your email address, choose an available payment method, accept the terms, and place the order.',
        },
        {
          id: 'ig-v-step-5',
          title: 'Track the Order',
          description:
            'Use the order ID and checkout email on the Track Order page to view progress.',
        },
      ],
      cta: {
        label: 'Select a Package',
        href: PRICING_ANCHOR,
      },
    },
    deliveryAndSafety: {
      id: 'video-link-and-delivery',
      title: 'What We Need to Process Your Order',
      description:
        'The order form should request the public URL of the Instagram video or Reel receiving the views. No Instagram password is required. The content must remain publicly accessible while the order is being processed.\n\nDelivery estimates depend on the package selected and should be read directly from the real pricing data. Do not promise instant delivery unless the package itself explicitly supports that claim.',
      purpose: 'Explain video/Reel URL and delivery requirements',
      primaryKeyword: 'Instagram views delivery',
      suggestedWordCount: 120,
      items: [
        {
          id: 'ig-v-req-url',
          title: 'Public Video or Reel URL',
          description:
            'Orders use the public Instagram video or Reel URL only. Keep the content publicly accessible while processing.',
        },
        {
          id: 'ig-v-req-password',
          title: 'No Password Required',
          description:
            'InstantViral never asks for your Instagram password. Only the public content link is needed to fulfill views.',
        },
        {
          id: 'ig-v-req-delivery',
          title: 'Package-Specific Delivery Estimate',
          description:
            'Start and delivery estimates come from the real package data shown on each pricing card before you order.',
        },
        {
          id: 'ig-v-req-tracking',
          title: 'Customer-Safe Order Tracking',
          description:
            'Track progress with your order ID and checkout email on the Track Order page without internal processing notes.',
        },
      ],
    },
    reviews: {
      id: 'ig-views-reviews',
      title: 'What Customers Say About InstantViral',
      description:
        'Customer reviews for this InstantViral service.',
      purpose: 'Social proof from approved customer reviews',
      testimonialIds: [],
    },
    faq: {
      id: 'ig-views-faq',
      title: 'Frequently Asked Questions About Buying Instagram Views',
      description: 'Answers to common questions before you choose a package.',
      purpose: 'Answer buying questions with FAQPage schema',
      primaryKeyword: 'buy Instagram views Canada',
      faqIds: [
        'faq-ig-views-password',
        'faq-ig-views-links',
        'faq-ig-views-delivery-speed',
        'faq-ig-views-reels',
        'faq-ig-views-gradual-delivery',
        'faq-ig-views-refill',
        'faq-ig-views-money-back',
        'faq-ig-views-track',
      ],
    },
    relatedServices: {
      id: 'related-instagram-services-views',
      title: 'Explore More Instagram Growth Services',
      description:
        'Views help video visibility. Pair them with followers, likes, or comments when your content strategy needs a broader boost — or return to the InstantViral homepage to browse every platform.',
      purpose: 'Internal links to sibling Instagram offers',
      serviceSlugs: [
        'buy-instagram-followers',
        'buy-instagram-likes',
        'buy-instagram-comments',
      ],
      cta: {
        label: 'Back to InstantViral homepage',
        href: '/',
      },
    },
    finalCta: {
      id: 'ig-views-final-cta',
      title: 'Increase Your Video Reach',
      description:
        'Select an Instagram Views package that fits the Reel or video you want more people to discover, then review delivery details before checkout.',
      purpose: 'Drive conversion to pricing packages',
      primaryCta: {
        label: 'Increase Your Video Reach',
        href: PRICING_ANCHOR,
      },
      secondaryCta: {
        label: 'Track an Order',
        href: routes.trackOrder,
      },
    },
  };
}

/**
 * Buy Instagram Comments Canada — Document 09.14 production content.
 */
function buildBuyInstagramCommentsContent(): ServiceContent {
  return {
    slug: 'buy-instagram-comments',
    platformId: 'instagram',
    seo: {
      title: 'Buy Instagram Comments Packages | InstantViral Canada',
      description:
        'Increase meaningful Instagram engagement with comments packages that support conversation, credibility, and community trust. Public post URL only, secure checkout, and order tracking.',
    },
    hero: {
      eyebrow: 'INSTAGRAM COMMENT SERVICE FOR CANADA',
      title: 'Buy Instagram Comments Canada',
      description:
        'Increase meaningful engagement with comments that help your posts look more active and encourage genuine conversations. Choose a package, place your order using only your public post URL, and monitor delivery through secure order tracking.',
      purpose: 'Convert visitors searching for Instagram comments packages',
      primaryKeyword: 'buy Instagram comments',
      supportingKeywords: [
        'Instagram comments packages',
        'Increase Instagram comments',
        'Instagram comment service',
        'More Instagram engagement',
        'Buy Instagram comments Canada',
      ],
      suggestedWordCount: 90,
      primaryCta: {
        label: 'Choose Packages',
        href: PRICING_ANCHOR,
      },
      secondaryCta: {
        label: 'View Delivery Information',
        href: '#comment-type-and-link',
      },
      trustLabels: [
        { id: 'ig-c-trust-public-url', label: 'Public Post URL Only' },
        { id: 'ig-c-trust-checkout', label: 'Secure Checkout' },
        { id: 'ig-c-trust-gradual', label: 'Gradual Delivery Available' },
        { id: 'ig-c-trust-track', label: 'Order Tracking' },
        { id: 'ig-c-trust-support', label: 'Professional Support' },
      ],
      visual: {
        src: '/assets/images/illustrations/instagram-dashboard.svg',
        alt: 'Instagram comments conversation and community engagement dashboard',
        width: 1000,
        height: 800,
      },
    },
    pricing: {
      id: 'pricing-packages',
      title: 'Instagram Comments Packages',
      description:
        'Compare High Quality and Premium Instagram Comments packages. Pick a quantity, review delivery details, and order with a public post URL only.',
      purpose: 'Present real InstantViral.ca comments packages',
      primaryKeyword: 'Instagram comments packages',
      suggestedWordCount: 40,
      packageIds: [],
      primaryCtaLabel: 'Order Now',
      emptyMessage: 'Instagram Comments packages are temporarily unavailable.',
    },
    benefits: {
      id: 'why-buy-instagram-comments',
      title: 'Support the Conversation Around Important Content',
      description:
        'Comments create conversations. Active discussion under a post helps new visitors see credibility, not a quiet grid. Visible engagement also makes it easier for more people to join in.\n\nCreators, businesses, and brands use comments packages when a launch, announcement, or educational post needs a stronger first impression—without replacing real replies, captions, or community management.',
      purpose: 'Explain how comments support credibility and conversation',
      primaryKeyword: 'Instagram comments',
      suggestedWordCount: 160,
      items: [
        {
          id: 'ig-c-benefit-conversation',
          title: 'Comments create conversations',
          description:
            'A thread gives people something to read, ask about, and respond to—so the post feels like a discussion, not a monologue.',
        },
        {
          id: 'ig-c-benefit-credibility',
          title: 'Discussions improve credibility',
          description:
            'Prospects skim comments for tone and proof. Clear, on-topic replies signal that the content matters to a real community.',
        },
        {
          id: 'ig-c-benefit-interaction',
          title: 'Engagement invites more interaction',
          description:
            'When a post already shows activity, viewers are more likely to leave their own question, emoji, or opinion.',
        },
        {
          id: 'ig-c-benefit-audiences',
          title: 'Built for creators, businesses, and brands',
          description:
            'Use comments on campaigns, product drops, education posts, and announcements where visible conversation supports trust.',
        },
      ],
    },
    whyInstantViral: {
      id: 'why-choose-instantviral-comments',
      title: 'A Clearer Way to Buy Instagram Comments',
      description:
        'Every package is built for conversation-focused engagement: public posts only, transparent delivery details, and checkout that never asks for your Instagram password.',
      purpose: 'Differentiate comments purchasing experience',
      primaryKeyword: 'Instagram comment service',
      suggestedWordCount: 140,
      items: [
        {
          id: 'ig-c-why-relevant',
          title: 'Relevant Comments',
          description:
            'Choose packages and options that fit the post you are promoting, so discussion stays useful rather than random noise.',
        },
        {
          id: 'ig-c-why-natural',
          title: 'Natural Delivery',
          description:
            'Gradual delivery options help comments arrive at a pace that looks more natural beside normal activity.',
        },
        {
          id: 'ig-c-why-password',
          title: 'No Password Required',
          description:
            'We never request Instagram login access. Orders use public information only.',
        },
        {
          id: 'ig-c-why-public',
          title: 'Public Post Only',
          description:
            'Paste the public URL for the post or Reel that should receive comments. Keep it accessible while delivery runs.',
        },
        {
          id: 'ig-c-why-checkout',
          title: 'Secure Checkout',
          description:
            'Review package details, confirm pricing, and pay through InstantViral’s secure checkout flow.',
        },
        {
          id: 'ig-c-why-support',
          title: 'Professional Support',
          description:
            'Need help with a package, URL, or order status? Support is available for comments-service questions.',
        },
      ],
      cta: {
        label: 'Choose Instagram Comments Package',
        href: PRICING_ANCHOR,
      },
    },
    features: {
      id: 'buy-instagram-comments-features',
      title: 'Features',
      description: '',
      purpose: 'Unused — delivery requirements live in deliveryAndSafety',
      items: [],
    },
    howItWorks: {
      id: 'how-it-works',
      title: 'How to Buy Instagram Comments',
      description:
        'Five clear steps from package selection to delivery—built for desktop and mobile checkout.',
      purpose: 'Explain the comments ordering process',
      primaryKeyword: 'buy Instagram comments',
      suggestedWordCount: 120,
      steps: [
        {
          id: 'ig-c-step-1',
          title: 'Choose Package',
          description:
            'Compare comment quantities, pricing, and delivery estimates for the post you want more discussion on.',
        },
        {
          id: 'ig-c-step-2',
          title: 'Paste Public Post URL',
          description:
            'Add the public Instagram post or Reel link. No username password or private access is required.',
        },
        {
          id: 'ig-c-step-3',
          title: 'Complete Checkout',
          description:
            'Enter your email, choose a payment method, accept the terms, and place the order securely.',
        },
        {
          id: 'ig-c-step-4',
          title: 'Order Processing',
          description:
            'We verify the public URL and prepare fulfillment based on the package you selected.',
        },
        {
          id: 'ig-c-step-5',
          title: 'Delivery Starts',
          description:
            'Comments begin landing according to the package estimate. Track progress anytime after purchase.',
        },
      ],
      cta: {
        label: 'Choose Packages',
        href: PRICING_ANCHOR,
      },
    },
    deliveryAndSafety: {
      id: 'comment-type-and-link',
      title: 'What We Need to Process Your Order',
      description:
        'Comments orders stay simple: a public Instagram post, the correct URL, a public account, and a valid email for tracking. InstantViral never asks for your Instagram password.',
      purpose: 'Explain comments order requirements',
      primaryKeyword: 'Instagram comments',
      suggestedWordCount: 100,
      items: [
        {
          id: 'ig-c-req-public-post',
          title: 'Public post',
          description:
            'The post or Reel must stay publicly viewable while comments are delivered.',
        },
        {
          id: 'ig-c-req-correct-url',
          title: 'Correct URL',
          description:
            'Paste the exact public link for the content that should receive the conversation.',
        },
        {
          id: 'ig-c-req-public-account',
          title: 'Public account',
          description:
            'Private profiles block delivery. Keep the account public for the duration of the order.',
        },
        {
          id: 'ig-c-req-email',
          title: 'Valid email',
          description:
            'Use a reachable checkout email so you can receive confirmation and track updates.',
        },
      ],
    },
    reviews: {
      id: 'ig-comments-reviews',
      title: 'What Customers Say About InstantViral',
      description:
        'Customer reviews for this InstantViral service.',
      purpose: 'Social proof from approved customer reviews',
      testimonialIds: [],
    },
    faq: {
      id: 'ig-comments-faq',
      title: 'Frequently Asked Questions About Instagram Comments',
      description:
        'Straight answers about relevance, delivery, Reels, passwords, and how conversation packages work.',
      purpose: 'Answer comments-intent questions with FAQPage schema',
      primaryKeyword: 'buy Instagram comments',
      faqIds: [
        'faq-ig-comments-password',
        'faq-ig-comments-links',
        'faq-ig-comments-custom-text',
        'faq-ig-comments-delivery-speed',
        'faq-ig-comments-reels',
        'faq-ig-comments-refill',
        'faq-ig-comments-money-back',
        'faq-ig-comments-track',
      ],
    },
    relatedServices: {
      id: 'related-instagram-services-comments',
      title: 'Related Instagram services that pair with comments',
      description:
        'Comments start the conversation. Pair likes for first reactions, views for Reel stay-time, or followers when you need a larger audience reading future threads.',
      purpose: 'Internal links to sibling Instagram offers',
      serviceSlugs: [
        'buy-instagram-followers',
        'buy-instagram-likes',
        'buy-instagram-views',
      ],
      cta: {
        label: 'Back to InstantViral homepage',
        href: '/',
      },
    },
    finalCta: {
      id: 'ig-comments-final-cta',
      title: 'Build More Conversations On Your Posts',
      description:
        'Encourage more interaction by increasing visible engagement on your Instagram posts. Select a package, place your order securely, and track every step from checkout to delivery.',
      purpose: 'Drive conversion to comments packages',
      primaryCta: {
        label: 'Choose Instagram Comments Package',
        href: PRICING_ANCHOR,
      },
      secondaryCta: {
        label: 'Contact Support',
        href: routes.contact,
      },
    },
  };
}

/** Instagram service page content — keyed by buy-* slug. */
export const instagramContent: Record<string, ServiceContent> = {
  'buy-instagram-followers': buildBuyInstagramFollowersContent(),
  'buy-instagram-likes': buildBuyInstagramLikesContent(),
  'buy-instagram-views': buildBuyInstagramViewsContent(),
  'buy-instagram-comments': buildBuyInstagramCommentsContent(),
};

export function getInstagramContent(slug: string): ServiceContent | undefined {
  return instagramContent[slug];
}
