import type { PackagesIconKey } from '@/data/content/packages-page-config';

export type TikTokFollowersBestPractice = {
  id: string;
  title: string;
  description: string;
  icon: PackagesIconKey;
};

export type TikTokFollowersPackageRec = {
  id: string;
  quantity: string;
  recommendedFor: string;
};

export type TikTokFollowersPageConfig = {
  doesBuyingWork: {
    id: string;
    title: string;
    description: string;
  };
  packageRecommendation: {
    id: string;
    title: string;
    description: string;
    rows: TikTokFollowersPackageRec[];
  };
  bestPractices: {
    id: string;
    title: string;
    description: string;
    items: TikTokFollowersBestPractice[];
  };
};

/**
 * Lean topical blocks for Buy TikTok Followers Canada.
 * Hero, pricing, process, requirements, FAQ remain in data/content/tiktok.ts.
 */
export const TIKTOK_FOLLOWERS_PAGE_CONFIG: TikTokFollowersPageConfig = {
  doesBuyingWork: {
    id: 'does-buying-tiktok-followers-work',
    title: 'Does Buying TikTok Followers Work?',
    description:
      'It works for one specific thing: the follower count on your profile goes up, which can change how new visitors see your account. It does not decide whether TikTok shows your videos on the For You feed. TikTok recommends each video based on how viewers respond to it, so your content still does the heavy lifting. Treat followers as a way to look established while your posting builds the rest.',
  },
  packageRecommendation: {
    id: 'compare-popular-tiktok-follower-packages',
    title: 'Compare Popular TikTok Follower Packages',
    description:
      'The right size depends on where your account is now. As a rough guide, pick a package that is not much larger than your current audience, then add more as your content grows.',
    rows: [
      { id: 'pkg-100', quantity: '100', recommendedFor: 'Starter: try the ordering process' },
      { id: 'pkg-500', quantity: '500', recommendedFor: 'Creator: new accounts finding their audience' },
      { id: 'pkg-1000', quantity: '1,000', recommendedFor: 'Business: active creators and local businesses' },
      { id: 'pkg-3000', quantity: '3,000', recommendedFor: 'Brand: established creator accounts' },
      { id: 'pkg-5000', quantity: '5,000', recommendedFor: 'Campaign: product launches and larger campaigns' },
      { id: 'pkg-10000', quantity: '10,000+', recommendedFor: 'Agency: brands with an existing large audience' },
    ],
  },
  bestPractices: {
    id: 'tiktok-followers-best-practices',
    title: 'Best Practices After You Buy TikTok Followers',
    description:
      'A bigger follower count makes the most sense on a profile that is clearly active. These four habits keep your account looking balanced after delivery.',
    items: [
      {
        id: 'bp-profile',
        title: 'Complete your profile',
        description:
          'Use a clear photo and a one line bio that says what you post. Local businesses should add their city, for example "Vancouver bakery, new bakes every Friday".',
        icon: 'users',
      },
      {
        id: 'bp-post',
        title: 'Post consistently',
        description:
          'Post on a schedule you can keep. Canada spans six time zones, so check TikTok Studio to see when your own followers are most active.',
        icon: 'clapperboard',
      },
      {
        id: 'bp-quality',
        title: 'Publish quality videos',
        description:
          'Open with the most interesting moment, keep it tight and make it yours. Reposted or low effort clips are less likely to be recommended.',
        icon: 'sparkles',
      },
      {
        id: 'bp-engage',
        title: 'Engage with your audience',
        description:
          'Reply to comments, and answer good questions with a video reply. It shows visitors there is a real person behind the account.',
        icon: 'heart',
      },
    ],
  },
};
