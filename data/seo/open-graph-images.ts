/**
 * Page-specific Open Graph / Twitter images for commercial routes.
 * Fallback remains seoSiteConfig.defaultOpenGraphImage for unscoped pages.
 */

export const OPEN_GRAPH_IMAGE_WIDTH = 1200 as const;
export const OPEN_GRAPH_IMAGE_HEIGHT = 630 as const;

export type OpenGraphImageKey =
  | 'homepage'
  | 'buy-instagram-followers'
  | 'buy-instagram-likes'
  | 'buy-instagram-views'
  | 'buy-instagram-comments'
  | 'buy-tiktok-followers'
  | 'buy-tiktok-likes'
  | 'buy-tiktok-views'
  | 'buy-youtube-subscribers'
  | 'buy-youtube-views'
  | 'buy-facebook-followers'
  | 'buy-facebook-page-likes'
  | 'buy-facebook-post-likes';

export type OpenGraphImageAsset = {
  /** Public path under /public */
  path: string;
  alt: string;
  width: typeof OPEN_GRAPH_IMAGE_WIDTH;
  height: typeof OPEN_GRAPH_IMAGE_HEIGHT;
};

const OG_DIR = '/assets/images/og' as const;

export const openGraphImagesBySlug = {
  homepage: {
    path: `${OG_DIR}/instantviral-canada-social-media-growth-og.webp`,
    alt: 'InstantViral social media growth services in Canada',
    width: OPEN_GRAPH_IMAGE_WIDTH,
    height: OPEN_GRAPH_IMAGE_HEIGHT,
  },
  'buy-instagram-followers': {
    path: `${OG_DIR}/buy-instagram-followers-canada-og.webp`,
    alt: 'Buy Instagram Followers Canada by InstantViral',
    width: OPEN_GRAPH_IMAGE_WIDTH,
    height: OPEN_GRAPH_IMAGE_HEIGHT,
  },
  'buy-instagram-likes': {
    path: `${OG_DIR}/buy-instagram-likes-canada-og.webp`,
    alt: 'Buy Instagram Likes Canada by InstantViral',
    width: OPEN_GRAPH_IMAGE_WIDTH,
    height: OPEN_GRAPH_IMAGE_HEIGHT,
  },
  'buy-instagram-views': {
    path: `${OG_DIR}/buy-instagram-views-canada-og.webp`,
    alt: 'Buy Instagram Views Canada by InstantViral',
    width: OPEN_GRAPH_IMAGE_WIDTH,
    height: OPEN_GRAPH_IMAGE_HEIGHT,
  },
  'buy-instagram-comments': {
    path: `${OG_DIR}/buy-instagram-comments-canada-og.webp`,
    alt: 'Buy Instagram Comments Canada by InstantViral',
    width: OPEN_GRAPH_IMAGE_WIDTH,
    height: OPEN_GRAPH_IMAGE_HEIGHT,
  },
  'buy-tiktok-followers': {
    path: `${OG_DIR}/buy-tiktok-followers-canada-og.webp`,
    alt: 'Buy TikTok Followers Canada by InstantViral',
    width: OPEN_GRAPH_IMAGE_WIDTH,
    height: OPEN_GRAPH_IMAGE_HEIGHT,
  },
  'buy-tiktok-likes': {
    path: `${OG_DIR}/buy-tiktok-likes-canada-og.webp`,
    alt: 'Buy TikTok Likes Canada by InstantViral',
    width: OPEN_GRAPH_IMAGE_WIDTH,
    height: OPEN_GRAPH_IMAGE_HEIGHT,
  },
  'buy-tiktok-views': {
    path: `${OG_DIR}/buy-tiktok-views-canada-og.webp`,
    alt: 'Buy TikTok Views Canada by InstantViral',
    width: OPEN_GRAPH_IMAGE_WIDTH,
    height: OPEN_GRAPH_IMAGE_HEIGHT,
  },
  'buy-youtube-subscribers': {
    path: `${OG_DIR}/buy-youtube-subscribers-canada-og.webp`,
    alt: 'Buy YouTube Subscribers Canada by InstantViral',
    width: OPEN_GRAPH_IMAGE_WIDTH,
    height: OPEN_GRAPH_IMAGE_HEIGHT,
  },
  'buy-youtube-views': {
    path: `${OG_DIR}/buy-youtube-views-canada-og.webp`,
    alt: 'Buy YouTube Views Canada by InstantViral',
    width: OPEN_GRAPH_IMAGE_WIDTH,
    height: OPEN_GRAPH_IMAGE_HEIGHT,
  },
  'buy-facebook-followers': {
    path: `${OG_DIR}/buy-facebook-followers-canada-og.webp`,
    alt: 'Buy Facebook Followers Canada by InstantViral',
    width: OPEN_GRAPH_IMAGE_WIDTH,
    height: OPEN_GRAPH_IMAGE_HEIGHT,
  },
  'buy-facebook-page-likes': {
    path: `${OG_DIR}/buy-facebook-page-likes-canada-og.webp`,
    alt: 'Buy Facebook Page Likes Canada by InstantViral',
    width: OPEN_GRAPH_IMAGE_WIDTH,
    height: OPEN_GRAPH_IMAGE_HEIGHT,
  },
  'buy-facebook-post-likes': {
    path: `${OG_DIR}/buy-facebook-post-likes-canada-og.webp`,
    alt: 'Buy Facebook Post Likes Canada by InstantViral',
    width: OPEN_GRAPH_IMAGE_WIDTH,
    height: OPEN_GRAPH_IMAGE_HEIGHT,
  },
} as const satisfies Record<OpenGraphImageKey, OpenGraphImageAsset>;

export function getOpenGraphImageForSlug(
  slug: string,
): OpenGraphImageAsset | undefined {
  if (slug === 'homepage' || slug === '/') {
    return openGraphImagesBySlug.homepage;
  }
  const key = slug.startsWith('/') ? slug.slice(1) : slug;
  return openGraphImagesBySlug[key as OpenGraphImageKey];
}
