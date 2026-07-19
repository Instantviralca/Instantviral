/**
 * Analytics public barrel — Document 14.09.
 * Preserves existing feature-specific trackers and exports the core system.
 */

export {
  trackEvent,
  trackPageView,
  trackConversion,
  validateEvent,
  sanitizeEventPayload,
  findForbiddenFieldsInEvent,
  canTrackEvent,
  getAnalyticsConsent,
  setAnalyticsConsent,
  hydrateAnalyticsConsent,
  resetAnalyticsConsentForTests,
  consentAllowsCategory,
  dispatchToProviders,
  initializeAnalyticsProviders,
  syncProviderConsent,
  preventDuplicateEvent,
  preventDuplicatePurchase,
  buildEventDedupeKey,
  resetDuplicateGuardsForTests,
  getAnalyticsContext,
  mapEventToProvider,
  getAnalyticsDebugRecords,
  subscribeAnalyticsDebug,
  clearAnalyticsDebugRecordsForTests,
  getAnalyticsSessionId,
  resetAnalyticsSessionIdForTests,
} from '@/lib/analytics/core';

export { AnalyticsDispatcher } from '@/lib/analytics/core/dispatcher';
export { emitLegacyAnalyticsEvent } from '@/lib/analytics/core/bridge';

export {
  getEnabledAnalyticsAdapters,
  resetAnalyticsAdaptersForTests,
  setAnalyticsAdaptersForTests,
  getPublicMarketingAdapters,
  getInternalAdapters,
} from '@/lib/analytics/providers';

export {
  homepageAnalyticsEvents,
  trackHomepageEvent,
  type HomepageAnalyticsEvent,
  type HomepageAnalyticsPayload,
} from '@/lib/analytics/homepage-events';

export {
  igFollowersAnalyticsEvents,
  trackIgFollowersEvent,
  type IgFollowersAnalyticsEvent,
  type IgFollowersAnalyticsPayload,
} from '@/lib/analytics/ig-followers-events';

export {
  igLikesAnalyticsEvents,
  trackIgLikesEvent,
  type IgLikesAnalyticsEvent,
  type IgLikesAnalyticsPayload,
} from '@/lib/analytics/ig-likes-events';

export {
  igViewsAnalyticsEvents,
  trackIgViewsEvent,
  type IgViewsAnalyticsEvent,
  type IgViewsAnalyticsPayload,
} from '@/lib/analytics/ig-views-events';

export {
  igCommentsAnalyticsEvents,
  trackIgCommentsEvent,
  type IgCommentsAnalyticsEvent,
  type IgCommentsAnalyticsPayload,
} from '@/lib/analytics/ig-comments-events';

export {
  tiktokFollowersAnalyticsEvents,
  trackTikTokFollowersEvent,
  type TikTokFollowersAnalyticsEvent,
  type TikTokFollowersAnalyticsPayload,
} from '@/lib/analytics/tiktok-followers-events';

export {
  tiktokLikesAnalyticsEvents,
  trackTikTokLikesEvent,
  type TikTokLikesAnalyticsEvent,
  type TikTokLikesAnalyticsPayload,
} from '@/lib/analytics/tiktok-likes-events';

export {
  tiktokViewsAnalyticsEvents,
  trackTikTokViewsEvent,
  type TikTokViewsAnalyticsEvent,
  type TikTokViewsAnalyticsPayload,
} from '@/lib/analytics/tiktok-views-events';

export {
  facebookFollowersAnalyticsEvents,
  trackFacebookFollowersEvent,
  type FacebookFollowersAnalyticsEvent,
  type FacebookFollowersAnalyticsPayload,
} from '@/lib/analytics/facebook-followers-events';

export {
  facebookPageLikesAnalyticsEvents,
  trackFacebookPageLikesEvent,
  type FacebookPageLikesAnalyticsEvent,
  type FacebookPageLikesAnalyticsPayload,
} from '@/lib/analytics/facebook-page-likes-events';

export {
  facebookPostLikesAnalyticsEvents,
  trackFacebookPostLikesEvent,
  type FacebookPostLikesAnalyticsEvent,
  type FacebookPostLikesAnalyticsPayload,
} from '@/lib/analytics/facebook-post-likes-events';

export {
  youtubeSubscribersAnalyticsEvents,
  trackYouTubeSubscribersEvent,
  type YouTubeSubscribersAnalyticsEvent,
  type YouTubeSubscribersAnalyticsPayload,
} from '@/lib/analytics/youtube-subscribers-events';

export {
  youtubeViewsAnalyticsEvents,
  trackYouTubeViewsEvent,
  type YouTubeViewsAnalyticsEvent,
  type YouTubeViewsAnalyticsPayload,
} from '@/lib/analytics/youtube-views-events';

export {
  aboutAnalyticsEvents,
  trackAboutEvent,
  type AboutAnalyticsEvent,
  type AboutAnalyticsPayload,
} from '@/lib/analytics/about-events';

export {
  contactAnalyticsEvents,
  trackContactEvent,
  type ContactAnalyticsEvent,
  type ContactAnalyticsPayload,
} from '@/lib/analytics/contact-events';

export {
  faqPageAnalyticsEvents,
  trackFaqPageEvent,
  type FaqPageAnalyticsEvent,
  type FaqPageAnalyticsPayload,
} from '@/lib/analytics/faq-page-events';

export {
  learnSearchAnalyticsEvents,
  trackLearnSearchEvent,
  type LearnSearchAnalyticsEvent,
  type LearnSearchAnalyticsPayload,
} from '@/lib/analytics/learn-search-events';

export {
  trustAnalyticsEvents,
  trackTrustEvent,
  type TrustAnalyticsEvent,
  type TrustAnalyticsPayload,
} from '@/lib/analytics/trust-events';

export {
  reviewAnalyticsEvents,
  trackReviewEvent,
  type ReviewAnalyticsEvent,
  type ReviewAnalyticsPayload,
} from '@/lib/analytics/review-events';

export {
  linkingAnalyticsEvents,
  trackLinkingEvent,
  type LinkingAnalyticsEvent,
  type LinkingAnalyticsPayload,
} from '@/lib/analytics/linking-events';

export {
  ctaAnalyticsEvents,
  trackCtaEvent,
  resolveCtaClickEvent,
  type CtaAnalyticsEvent,
  type CtaAnalyticsPayload,
} from '@/lib/analytics/cta-events';

export {
  getServicePageAnalytics,
  type ServicePageAnalytics,
  type ServicePageAnalyticsPayload,
} from '@/lib/analytics/service-page-events';

export {
  faqAnalyticsEvents,
  trackFaqEvent,
  type FaqAnalyticsEvent,
  type FaqAnalyticsPayload,
} from '@/lib/analytics/faq-events';

export {
  contentAnalyticsEvents,
  trackContentAnalyticsEvent,
  type ContentAnalyticsEventName,
  type ContentEventPayload,
} from '@/lib/analytics/content-events';
