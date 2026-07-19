export type PackagesPageMetric = 'followers' | 'likes';

/** Serializable Lucide icon keys — resolved in UI components (RSC-safe). */
export type PackagesIconKey =
  | 'briefcase'
  | 'clapperboard'
  | 'heart'
  | 'megaphone'
  | 'sparkles'
  | 'users'
  | 'credit-card'
  | 'headphones'
  | 'lock'
  | 'map-pin'
  | 'shield-check'
  | 'truck';

export type PackagesFitCard = {
  id: string;
  quantity: string;
  title: string;
  description: string;
  bestFor: string;
  icon: PackagesIconKey;
};

export type PackagesTimelineStep = {
  id: string;
  label: string;
};

export type PackagesWhyFeature = {
  id: string;
  title: string;
  description: string;
  icon: PackagesIconKey;
};

export type PackagesComparisonRow = {
  id: string;
  packageLabel: string;
  delivery: string;
  recommended: string;
  popularity: string;
  highlighted?: boolean;
};

export type PackagesPageConfig = {
  metric: PackagesPageMetric;
  fit: {
    title: string;
    description: string;
    cards: PackagesFitCard[];
  };
  timeline: {
    title: string;
    description: string;
    steps: PackagesTimelineStep[];
  };
  whyOrder: {
    title: string;
    description: string;
    features: PackagesWhyFeature[];
  };
  comparison: {
    title: string;
    description: string;
    rows: PackagesComparisonRow[];
  };
  learnMore: {
    title: string;
    description: string;
    ctaLabel: string;
  };
  summaryBenefits: readonly string[];
  /** Premium info pills shown under package price. */
  infoPills: readonly string[];
};

export const INSTAGRAM_FOLLOWERS_PACKAGES_CONFIG: PackagesPageConfig = {
  metric: 'followers',
  fit: {
    title: 'Which Package Is Right for You?',
    description:
      'Use these quick guides to match Instagram Followers Packages to your current goals, then confirm quantity and price in the grid above.',
    cards: [
      {
        id: '500',
        quantity: '500',
        title: 'Growing creators',
        description:
          'A practical step when you want a clearer profile presence and steady momentum.',
        bestFor: 'Creators',
        icon: 'clapperboard',
      },
      {
        id: '1000',
        quantity: '1000',
        title: 'Clear first impression',
        description:
          'A common choice for businesses that want a stronger profile starting point.',
        bestFor: 'Businesses',
        icon: 'briefcase',
      },
      {
        id: '2500',
        quantity: '2500+',
        title: 'Campaign-ready profiles',
        description:
          'Suited to brand profiles preparing for launches, campaigns and wider visibility.',
        bestFor: 'Brands',
        icon: 'megaphone',
      },
      {
        id: '2500-inf',
        quantity: '2500+',
        title: 'Audience acceleration',
        description:
          'A strong fit when influencers need more visible social proof before promotions.',
        bestFor: 'Influencers',
        icon: 'users',
      },
      {
        id: '5000',
        quantity: '5000+',
        title: 'Large campaigns',
        description:
          'Built for larger campaign goals where higher package volume is required.',
        bestFor: 'Agencies',
        icon: 'sparkles',
      },
    ],
  },
  timeline: {
    title: 'Instagram Followers Delivery',
    description:
      'After checkout, orders move through a clear sequence from review to delivery. Exact timing depends on the package you select and is confirmed before you pay.',
    steps: [
      { id: 'place', label: 'Place Order' },
      { id: 'review', label: 'Order Review' },
      { id: 'delivery', label: 'Gradual Delivery' },
      { id: 'completed', label: 'Completed' },
    ],
  },
  whyOrder: {
    title: 'Why Order From Us?',
    description:
      'A straightforward ordering experience focused on package clarity, account safety and trackable delivery.',
    features: [
      {
        id: 'public',
        title: 'Public username only',
        description: 'Orders use your public Instagram username or profile URL.',
        icon: 'lock',
      },
      {
        id: 'checkout',
        title: 'Secure checkout',
        description: 'Review package details and complete payment through a clear checkout flow.',
        icon: 'credit-card',
      },
      {
        id: 'gradual',
        title: 'Gradual delivery',
        description: 'Eligible packages may deliver gradually instead of all at once.',
        icon: 'truck',
      },
      {
        id: 'tracking',
        title: 'Order tracking',
        description: 'Monitor available status updates with your order ID and email.',
        icon: 'map-pin',
      },
      {
        id: 'support',
        title: 'Professional support',
        description: 'Get help with packages, checkout, delivery and existing orders.',
        icon: 'headphones',
      },
      {
        id: 'password',
        title: 'No password required',
        description: 'Your Instagram login credentials are never requested.',
        icon: 'shield-check',
      },
    ],
  },
  comparison: {
    title: 'Instagram Followers Plans Comparison',
    description:
      'Compare package sizes side by side — InstantViral packages stay clear and trackable, while typical providers often leave delivery and pricing vague.',
    rows: [
      {
        id: '100',
        packageLabel: '100 Followers',
        delivery: 'Gradual on eligible packages',
        recommended: 'Testing the process',
        popularity: 'Light',
      },
      {
        id: '500',
        packageLabel: '500 Followers',
        delivery: 'Gradual on eligible packages',
        recommended: 'Growing creators',
        popularity: 'Steady',
      },
      {
        id: '1000',
        packageLabel: '1000 Followers',
        delivery: 'Gradual on eligible packages',
        recommended: 'Businesses',
        popularity: 'Most popular',
        highlighted: true,
      },
      {
        id: '2500',
        packageLabel: '2500 Followers',
        delivery: 'Gradual on eligible packages',
        recommended: 'Brands',
        popularity: 'High demand',
      },
      {
        id: '5000',
        packageLabel: '5000+ Followers',
        delivery: 'Gradual on eligible packages',
        recommended: 'Large campaigns',
        popularity: 'Campaign scale',
      },
    ],
  },
  learnMore: {
    title: 'Want to learn more before ordering?',
    description:
      'Visit our homepage to learn how our ordering process works, why customers choose InstantViral and how delivery works.',
    ctaLabel: 'Go to homepage',
  },
  summaryBenefits: [
    'Public Username Only',
    'No Password Required',
    'Secure Checkout',
    '30-Day Money-Back Guarantee',
    'Live Order Tracking',
  ],
  infoPills: [
    'Estimated Delivery',
    'Gradual Delivery',
    'Live Order Tracking',
    'Secure Checkout',
    'Public Username Only',
    'Professional Support',
  ],
};

export const INSTAGRAM_LIKES_PACKAGES_CONFIG: PackagesPageConfig = {
  metric: 'likes',
  fit: {
    title: 'Which Package Is Right for You?',
    description:
      'Match Instagram Likes Packages to your content goals, then confirm quantity and price in the pricing grid above.',
    cards: [
      {
        id: '100',
        quantity: '100',
        title: 'Perfect for testing',
        description: 'A lightweight option when you want to try likes delivery on a public post first.',
        bestFor: 'Testing',
        icon: 'sparkles',
      },
      {
        id: '500',
        quantity: '500',
        title: 'Small creators',
        description: 'A practical boost for creators supporting everyday posts and early momentum.',
        bestFor: 'Small creators',
        icon: 'clapperboard',
      },
      {
        id: '1000',
        quantity: '1000',
        title: 'Growing creators',
        description: 'A common choice for creators who want stronger engagement on important posts.',
        bestFor: 'Growing creators',
        icon: 'heart',
      },
      {
        id: '2500',
        quantity: '2500',
        title: 'Businesses',
        description: 'Suited to business posts that need a clearer engagement first impression.',
        bestFor: 'Businesses',
        icon: 'briefcase',
      },
      {
        id: '5000',
        quantity: '5000+',
        title: 'High engagement campaigns',
        description: 'Built for launches and campaigns where higher like volume supports visibility.',
        bestFor: 'Campaigns',
        icon: 'megaphone',
      },
    ],
  },
  timeline: {
    title: 'Instagram Likes Delivery',
    description:
      'After checkout, likes orders move through a clear sequence from review to delivery. Exact timing depends on the package you select and is confirmed before you pay.',
    steps: [
      { id: 'place', label: 'Place Order' },
      { id: 'review', label: 'Order Review' },
      { id: 'likes', label: 'Likes Begin' },
      { id: 'completed', label: 'Delivery Complete' },
    ],
  },
  whyOrder: {
    title: 'Why Order From Us?',
    description:
      'A straightforward likes ordering experience focused on post URL clarity, secure checkout and trackable delivery.',
    features: [
      {
        id: 'public',
        title: 'Public Post URL Only',
        description: 'Orders use the public Instagram post or Reel URL — no login credentials.',
        icon: 'lock',
      },
      {
        id: 'checkout',
        title: 'Secure Checkout',
        description: 'Review package details and complete payment through a clear checkout flow.',
        icon: 'credit-card',
      },
      {
        id: 'gradual',
        title: 'Gradual Delivery',
        description: 'Eligible packages may deliver likes gradually instead of all at once.',
        icon: 'truck',
      },
      {
        id: 'tracking',
        title: 'Order Tracking',
        description: 'Monitor available status updates with your order ID and email.',
        icon: 'map-pin',
      },
      {
        id: 'support',
        title: 'Professional Support',
        description: 'Get help with packages, checkout, delivery and existing likes orders.',
        icon: 'headphones',
      },
      {
        id: 'password',
        title: 'No Password Required',
        description: 'Your Instagram login credentials are never requested.',
        icon: 'shield-check',
      },
    ],
  },
  comparison: {
    title: 'Instagram Likes Plans Comparison',
    description:
      'Compare likes package sizes side by side — InstantViral packages stay clear and trackable, while typical providers often leave delivery and pricing vague.',
    rows: [
      {
        id: '100',
        packageLabel: '100 Likes',
        delivery: 'Gradual on eligible packages',
        recommended: 'Testing the process',
        popularity: 'Light',
      },
      {
        id: '500',
        packageLabel: '500 Likes',
        delivery: 'Gradual on eligible packages',
        recommended: 'Small creators',
        popularity: 'Steady',
      },
      {
        id: '1000',
        packageLabel: '1000 Likes',
        delivery: 'Gradual on eligible packages',
        recommended: 'Growing creators',
        popularity: 'Most popular',
        highlighted: true,
      },
      {
        id: '2500',
        packageLabel: '2500 Likes',
        delivery: 'Gradual on eligible packages',
        recommended: 'Businesses',
        popularity: 'High demand',
      },
      {
        id: '5000',
        packageLabel: '5000 Likes',
        delivery: 'Gradual on eligible packages',
        recommended: 'High engagement campaigns',
        popularity: 'Campaign scale',
      },
    ],
  },
  learnMore: {
    title: 'Want to learn more before ordering likes?',
    description:
      'Visit our homepage to see how InstantViral ordering works, how delivery is tracked, and how Instagram engagement services fit together.',
    ctaLabel: 'Go to homepage',
  },
  summaryBenefits: [
    'Public Post URL Only',
    'No Password Required',
    'Secure Checkout',
    '30-Day Money-Back Guarantee',
    'Order Tracking',
  ],
  infoPills: [
    'Estimated Delivery',
    'Gradual Delivery',
    'Live Order Tracking',
    'Secure Checkout',
    'Public Post URL Only',
    'Professional Support',
  ],
};
