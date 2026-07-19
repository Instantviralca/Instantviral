/**
 * Content Repository — Document 16.01.
 */

export {
  createArticlePackage,
  listMissingFiles,
  buildContentIndex,
  validateRepository,
  scaffoldAllPlannedPackages,
  getRequiredPackageFiles,
  platformToFolder,
  isValidArticleSlug,
} from '@/lib/content-repository/package';

export {
  getArticlePackageRelativePath,
  resolveContentRoot,
  CONTENT_REPOSITORY_ROOT,
} from '@/lib/content-repository/paths';

export { generatePackageFiles } from '@/lib/content-repository/generate-files';
