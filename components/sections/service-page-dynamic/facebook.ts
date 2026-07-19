import dynamic from 'next/dynamic';

export const FacebookFollowersFinalCtaAside = dynamic(() =>
  import('@/components/marketing/packages/facebook-followers-final-cta-aside').then((m) => ({
    default: m.FacebookFollowersFinalCtaAside,
  })),
);

export const FacebookPostLikesFinalCtaAside = dynamic(() =>
  import('@/components/marketing/packages/facebook-post-likes-final-cta-aside').then((m) => ({
    default: m.FacebookPostLikesFinalCtaAside,
  })),
);

export const FacebookFollowersOrderStatusDashboard = dynamic(() =>
  import('@/components/illustrations/facebook-followers-order-status-dashboard').then((m) => ({
    default: m.FacebookFollowersOrderStatusDashboard,
  })),
);

export const FacebookFollowersOrderSummaryDashboard = dynamic(() =>
  import('@/components/illustrations/facebook-followers-order-summary-dashboard').then((m) => ({
    default: m.FacebookFollowersOrderSummaryDashboard,
  })),
);

export const FacebookFollowersProcessTimeline = dynamic(() =>
  import('@/components/illustrations/facebook-followers-process-timeline').then((m) => ({
    default: m.FacebookFollowersProcessTimeline,
  })),
);

export const FacebookFollowersDeliveryTimeline = dynamic(() =>
  import('@/components/illustrations/facebook-followers-delivery-timeline').then((m) => ({
    default: m.FacebookFollowersDeliveryTimeline,
  })),
);

export const FacebookPageLikesOrderStatusDashboard = dynamic(() =>
  import('@/components/illustrations/facebook-page-likes-order-status-dashboard').then((m) => ({
    default: m.FacebookPageLikesOrderStatusDashboard,
  })),
);

export const FacebookPageLikesOrderSummaryDashboard = dynamic(() =>
  import('@/components/illustrations/facebook-page-likes-order-summary-dashboard').then((m) => ({
    default: m.FacebookPageLikesOrderSummaryDashboard,
  })),
);

export const FacebookPageLikesProcessTimeline = dynamic(() =>
  import('@/components/illustrations/facebook-page-likes-process-timeline').then((m) => ({
    default: m.FacebookPageLikesProcessTimeline,
  })),
);

export const FacebookPageLikesDeliveryTimeline = dynamic(() =>
  import('@/components/illustrations/facebook-page-likes-delivery-timeline').then((m) => ({
    default: m.FacebookPageLikesDeliveryTimeline,
  })),
);

export const FacebookPostLikesOrderStatusDashboard = dynamic(() =>
  import('@/components/illustrations/facebook-post-likes-order-status-dashboard').then((m) => ({
    default: m.FacebookPostLikesOrderStatusDashboard,
  })),
);

export const FacebookPostLikesOrderSummaryDashboard = dynamic(() =>
  import('@/components/illustrations/facebook-post-likes-order-summary-dashboard').then((m) => ({
    default: m.FacebookPostLikesOrderSummaryDashboard,
  })),
);

export const FacebookPostLikesProcessTimeline = dynamic(() =>
  import('@/components/illustrations/facebook-post-likes-process-timeline').then((m) => ({
    default: m.FacebookPostLikesProcessTimeline,
  })),
);

export const FacebookPostLikesDeliveryTimeline = dynamic(() =>
  import('@/components/illustrations/facebook-post-likes-delivery-timeline').then((m) => ({
    default: m.FacebookPostLikesDeliveryTimeline,
  })),
);
