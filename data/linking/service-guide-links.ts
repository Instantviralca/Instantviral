/**
 * Required money-page → Learn article links (exact labels).
 * Merged with existing related-article lists in page views.
 */

export type ServiceGuideLinkSpec = {
  slug: string;
  label: string;
};

export const SERVICE_GUIDE_LINKS: Record<string, readonly ServiceGuideLinkSpec[]> = {
  'buy-instagram-followers': [
    {
      slug: 'how-to-grow-instagram-followers-organically',
      label: 'How to Grow Instagram Followers Organically',
    },
    {
      slug: 'instagram-marketing-for-small-businesses',
      label: 'Instagram Marketing for Small Businesses',
    },
  ],
  'buy-instagram-likes': [
    {
      slug: 'how-to-get-more-instagram-likes',
      label: 'How to Get More Likes on Instagram',
    },
    {
      slug: 'best-time-to-post-on-instagram',
      label: 'Best Time to Post on Instagram in Canada',
    },
  ],
  'buy-instagram-views': [
    {
      slug: 'instagram-algorithm-explained',
      label: 'How the Instagram Algorithm Works',
    },
  ],
  'buy-instagram-comments': [
    {
      slug: 'how-to-get-more-instagram-likes',
      label: 'How to Get More Likes on Instagram',
    },
  ],
  'buy-tiktok-followers': [
    {
      slug: 'how-to-get-more-tiktok-followers',
      label: 'How to Get More TikTok Followers',
    },
    { slug: 'tiktok-for-business', label: 'TikTok for Business' },
  ],
  'buy-tiktok-likes': [
    {
      slug: 'how-to-get-more-tiktok-likes',
      label: 'How to Get More Likes on TikTok',
    },
  ],
  'buy-tiktok-views': [
    {
      slug: 'how-to-get-more-tiktok-views',
      label: 'How to Get More Views on TikTok',
    },
    { slug: 'tiktok-seo-guide', label: 'TikTok SEO Guide' },
  ],
  'buy-facebook-followers': [
    {
      slug: 'how-to-get-more-facebook-followers',
      label: 'How to Get More Facebook Followers',
    },
  ],
  'buy-facebook-page-likes': [
    {
      slug: 'how-to-get-more-facebook-followers',
      label: 'How to Get More Facebook Followers',
    },
  ],
  'buy-facebook-post-likes': [
    {
      slug: 'how-to-increase-facebook-engagement',
      label: 'How to Increase Facebook Engagement',
    },
  ],
  'buy-youtube-views': [
    {
      slug: 'how-to-get-more-youtube-views',
      label: 'How to Get More YouTube Views',
    },
  ],
  'buy-youtube-subscribers': [
    {
      slug: 'how-to-get-more-youtube-subscribers',
      label: 'How to Get More YouTube Subscribers',
    },
  ],
} as const;
