/**
 * Content generators barrel — Documents 16.02–16.06.
 */

export {
  createArticle,
  createTemplateFiles,
  validateArticlePackage,
  updateContentIndex,
  createArticlePackage,
  SUPPORTED_CLI_PLATFORMS,
} from '@/lib/content-generators/article-package';

export {
  generateSeoAssets,
  validateSeoAssets,
  generateOpenGraph,
  generateTwitterCard,
  generateArticleSchema,
  generateFaqSchema,
  estimateReadingTime,
} from '@/lib/content-generators/seo';

export {
  generateImageBrief,
  generateImagePrompts,
  validateImageAssets,
  buildImageManifest,
} from '@/lib/content-generators/images';

export {
  generateSocialPosts,
  generateHashtags,
  buildCampaignAssets,
  validateSocialAssets,
  renderSocialPostsMarkdown,
} from '@/lib/content-generators/social';

export {
  generateNewsletter,
  generateSubjectLines,
  generatePreviewText,
  validateNewsletter,
  renderNewsletterMarkdown,
} from '@/lib/content-generators/newsletter';

export { writeGeneratedAssets } from '@/lib/content-generators/write-assets';
