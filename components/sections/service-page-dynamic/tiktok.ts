import dynamic from 'next/dynamic';

export const TikTokFollowersFinalCtaAside = dynamic(() =>
  import('@/components/marketing/packages/tiktok-followers-final-cta-aside').then((m) => ({
    default: m.TikTokFollowersFinalCtaAside,
  })),
);

export const TikTokLikesFinalCtaAside = dynamic(() =>
  import('@/components/marketing/packages/tiktok-likes-final-cta-aside').then((m) => ({
    default: m.TikTokLikesFinalCtaAside,
  })),
);

export const TikTokViewsFinalCtaAside = dynamic(() =>
  import('@/components/marketing/packages/tiktok-views-final-cta-aside').then((m) => ({
    default: m.TikTokViewsFinalCtaAside,
  })),
);

export const TikTokLikesOrderSummaryDashboard = dynamic(() =>
  import('@/components/illustrations/tiktok-likes-order-summary-dashboard').then((m) => ({
    default: m.TikTokLikesOrderSummaryDashboard,
  })),
);

export const TikTokLikesSecureOrderingDashboard = dynamic(() =>
  import('@/components/illustrations/tiktok-likes-secure-ordering-dashboard').then((m) => ({
    default: m.TikTokLikesSecureOrderingDashboard,
  })),
);

export const TikTokOrderStatusDashboard = dynamic(() =>
  import('@/components/illustrations/tiktok-order-status-dashboard').then((m) => ({
    default: m.TikTokOrderStatusDashboard,
  })),
);

export const TikTokOrderSummaryDashboard = dynamic(() =>
  import('@/components/illustrations/tiktok-order-summary-dashboard').then((m) => ({
    default: m.TikTokOrderSummaryDashboard,
  })),
);

export const TikTokViewsOrderSummaryDashboard = dynamic(() =>
  import('@/components/illustrations/tiktok-views-order-summary-dashboard').then((m) => ({
    default: m.TikTokViewsOrderSummaryDashboard,
  })),
);

export const TikTokViewsSecureCheckoutDashboard = dynamic(() =>
  import('@/components/illustrations/tiktok-views-secure-checkout-dashboard').then((m) => ({
    default: m.TikTokViewsSecureCheckoutDashboard,
  })),
);
