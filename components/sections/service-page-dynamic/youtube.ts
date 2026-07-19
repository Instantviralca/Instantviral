import dynamic from 'next/dynamic';

export const YouTubeSubscribersFinalCtaAside = dynamic(() =>
  import('@/components/marketing/packages/youtube-subscribers-final-cta-aside').then((m) => ({
    default: m.YouTubeSubscribersFinalCtaAside,
  })),
);

export const YouTubeSubscribersLearnMore = dynamic(() =>
  import('@/components/marketing/packages/youtube-subscribers-learn-more').then((m) => ({
    default: m.YouTubeSubscribersLearnMore,
  })),
);

export const YouTubeViewsFinalCtaAside = dynamic(() =>
  import('@/components/marketing/packages/youtube-views-final-cta-aside').then((m) => ({
    default: m.YouTubeViewsFinalCtaAside,
  })),
);

export const YouTubeSubscribersOrderStatusDashboard = dynamic(() =>
  import('@/components/illustrations/youtube-subscribers-order-status-dashboard').then((m) => ({
    default: m.YouTubeSubscribersOrderStatusDashboard,
  })),
);

export const YouTubeSubscribersOrderSummaryDashboard = dynamic(() =>
  import('@/components/illustrations/youtube-subscribers-order-summary-dashboard').then((m) => ({
    default: m.YouTubeSubscribersOrderSummaryDashboard,
  })),
);

export const YouTubeSubscribersProcessTimeline = dynamic(() =>
  import('@/components/illustrations/youtube-subscribers-process-timeline').then((m) => ({
    default: m.YouTubeSubscribersProcessTimeline,
  })),
);

export const YouTubeViewsDeliveryTimeline = dynamic(() =>
  import('@/components/illustrations/youtube-views-delivery-timeline').then((m) => ({
    default: m.YouTubeViewsDeliveryTimeline,
  })),
);

export const YouTubeViewsOrderStatusDashboard = dynamic(() =>
  import('@/components/illustrations/youtube-views-order-status-dashboard').then((m) => ({
    default: m.YouTubeViewsOrderStatusDashboard,
  })),
);

export const YouTubeViewsOrderSummaryDashboard = dynamic(() =>
  import('@/components/illustrations/youtube-views-order-summary-dashboard').then((m) => ({
    default: m.YouTubeViewsOrderSummaryDashboard,
  })),
);

export const YouTubeViewsProcessTimeline = dynamic(() =>
  import('@/components/illustrations/youtube-views-process-timeline').then((m) => ({
    default: m.YouTubeViewsProcessTimeline,
  })),
);
