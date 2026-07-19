/**
 * Editorial Publishing Workflow — Document 15.08.
 */

export {
  isEditorialArticleStatus,
  isPublicLiveArticleStatus,
  isPublicLiveArticle,
  editorialStatusLabel,
  getEditorialStatus,
  syncPublishedFlag,
} from '@/lib/learn/editorial/status';

export {
  EDITORIAL_TRANSITIONS,
  canTransitionEditorialStatus,
  validatePublishingState,
  getWorkflowTimeline,
} from '@/lib/learn/editorial/transitions';

export {
  getPublishingChecklist,
  validateArticleForPublishing,
} from '@/lib/learn/editorial/validate';

export {
  publishArticle,
  scheduleArticle,
  activateScheduledArticles,
  updatePublishedArticle,
  archiveArticle,
  submitForReview,
  approveArticle,
} from '@/lib/learn/editorial/actions';

export {
  buildPublishingEffects,
  getEditorialRobots,
} from '@/lib/learn/editorial/effects';

export {
  stripEditorialFields,
  assertPublicArticleAccess,
  publicArticleHasPrivateFields,
} from '@/lib/learn/editorial/public';
