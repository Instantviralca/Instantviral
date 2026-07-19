/**
 * Content Repository Generator — Document 16.01.
 */

import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';

import { getPlannedArticleBySlug, PLANNED_ARTICLES } from '@/data/content-plan/articles';
import { generatePackageFiles } from '@/lib/content-repository/generate-files';
import {
  getArticlePackageRelativePath,
  getRequiredPackageFiles,
  isValidArticleSlug,
  platformToFolder,
  resolveContentRoot,
} from '@/lib/content-repository/paths';
import type { ArticleBrief } from '@/types/content-plan';
import type {
  ArticlePackageFileName,
  ContentRepositoryIndexEntry,
  ContentRepositoryIssue,
  ContentRepositoryPlatformFolder,
} from '@/types/content-design-system';
import { ARTICLE_PACKAGE_FILES } from '@/types/content-design-system';

export type CreateArticlePackageOptions = {
  cwd?: string;
  /** Overwrite existing files when true. */
  force?: boolean;
  brief?: ArticleBrief;
};

export type CreateArticlePackageResult = {
  ok: boolean;
  slug: string;
  relativePath: string;
  created: string[];
  skipped: string[];
  issues: ContentRepositoryIssue[];
};

function packageDir(
  cwd: string,
  folder: ContentRepositoryPlatformFolder,
  slug: string,
): string {
  return path.join(cwd, 'content', folder, slug);
}

/**
 * Create a full article package folder with the 15 standard files.
 */
export function createArticlePackage(
  slug: string,
  options: CreateArticlePackageOptions = {},
): CreateArticlePackageResult {
  const cwd = options.cwd ?? process.cwd();
  const issues: ContentRepositoryIssue[] = [];
  const created: string[] = [];
  const skipped: string[] = [];

  if (!isValidArticleSlug(slug)) {
    return {
      ok: false,
      slug,
      relativePath: '',
      created,
      skipped,
      issues: [
        {
          severity: 'blocker',
          code: 'invalid_slug',
          slug,
          message: 'Slug must be lowercase hyphen-separated.',
        },
      ],
    };
  }

  const brief =
    options.brief ??
    getPlannedArticleBySlug(slug) ??
    null;

  if (!brief) {
    return {
      ok: false,
      slug,
      relativePath: '',
      created,
      skipped,
      issues: [
        {
          severity: 'blocker',
          code: 'unknown_brief',
          slug,
          message: `No content-plan brief found for "${slug}".`,
        },
      ],
    };
  }

  const folder = platformToFolder(brief.platform);
  const relativePath = getArticlePackageRelativePath(folder, slug);
  const absDir = packageDir(cwd, folder, slug);
  mkdirSync(absDir, { recursive: true });

  const files = generatePackageFiles(brief);
  for (const fileName of ARTICLE_PACKAGE_FILES) {
    const absFile = path.join(absDir, fileName);
    if (existsSync(absFile) && !options.force) {
      skipped.push(path.posix.join(relativePath, fileName));
      continue;
    }
    writeFileSync(absFile, files[fileName], 'utf8');
    created.push(path.posix.join(relativePath, fileName));
  }

  return { ok: true, slug, relativePath, created, skipped, issues };
}

export function listMissingFiles(
  slug: string,
  options: { cwd?: string; platformFolder?: ContentRepositoryPlatformFolder } = {},
): ArticlePackageFileName[] {
  const cwd = options.cwd ?? process.cwd();
  const brief = getPlannedArticleBySlug(slug);
  const folder =
    options.platformFolder ??
    (brief ? platformToFolder(brief.platform) : undefined);
  if (!folder) return [...ARTICLE_PACKAGE_FILES];

  const absDir = packageDir(cwd, folder, slug);
  if (!existsSync(absDir)) return [...ARTICLE_PACKAGE_FILES];

  return ARTICLE_PACKAGE_FILES.filter(
    (file) => !existsSync(path.join(absDir, file)),
  );
}

function listSlugDirs(
  cwd: string,
): Array<{ folder: ContentRepositoryPlatformFolder; slug: string }> {
  const root = resolveContentRoot(cwd);
  if (!existsSync(root)) return [];

  const folders: ContentRepositoryPlatformFolder[] = [
    'instagram',
    'tiktok',
    'facebook',
    'youtube',
    'marketing',
  ];
  const results: Array<{ folder: ContentRepositoryPlatformFolder; slug: string }> =
    [];

  for (const folder of folders) {
    const abs = path.join(root, folder);
    if (!existsSync(abs)) continue;
    for (const entry of readdirSync(abs, { withFileTypes: true })) {
      if (!entry.isDirectory()) continue;
      if (entry.name.startsWith('_')) continue;
      results.push({ folder, slug: entry.name });
    }
  }
  return results;
}

function hasArticleBody(absMdx: string): boolean {
  if (!existsSync(absMdx)) return false;
  const raw = readFileSync(absMdx, 'utf8');
  const withoutFrontmatter = raw.replace(/^---[\s\S]*?---\s*/, '');
  const withoutComments = withoutFrontmatter.replace(/\{\/\*[\s\S]*?\*\/\}/g, '');
  const withoutHeadings = withoutComments
    .replace(/^#.+$/gm, '')
    .replace(/^>.+$/gm, '')
    .trim();
  // Scaffold-only packages keep pending marker / thin outlines.
  if (/Body pending editorial production/i.test(raw)) return false;
  return withoutHeadings.length > 280;
}

export function buildContentIndex(
  options: { cwd?: string } = {},
): ContentRepositoryIndexEntry[] {
  const cwd = options.cwd ?? process.cwd();
  const entries: ContentRepositoryIndexEntry[] = [];

  for (const { folder, slug } of listSlugDirs(cwd)) {
    const relativePath = getArticlePackageRelativePath(folder, slug);
    const absDir = packageDir(cwd, folder, slug);
    const missing = ARTICLE_PACKAGE_FILES.filter(
      (file) => !existsSync(path.join(absDir, file)),
    );
    const brief = getPlannedArticleBySlug(slug);
    let workingTitle = brief?.workingTitle ?? slug;
    let status = brief?.status ?? 'unknown';
    const seoPath = path.join(absDir, '04_SEO.json');
    if (existsSync(seoPath)) {
      try {
        const seo = JSON.parse(readFileSync(seoPath, 'utf8')) as {
          title?: string;
          status?: string;
        };
        if (seo.title) workingTitle = seo.title;
        if (seo.status) status = seo.status;
      } catch {
        // Invalid metadata reported by validateRepository.
      }
    }

    entries.push({
      slug,
      platformFolder: folder,
      relativePath,
      workingTitle,
      status,
      hasArticleBody: hasArticleBody(path.join(absDir, '03_Article.mdx')),
      missingFiles: missing,
    });
  }

  return entries.sort((a, b) => a.slug.localeCompare(b.slug));
}

export function validateRepository(
  options: { cwd?: string } = {},
): {
  ok: boolean;
  issues: ContentRepositoryIssue[];
  index: ContentRepositoryIndexEntry[];
} {
  const cwd = options.cwd ?? process.cwd();
  const issues: ContentRepositoryIssue[] = [];
  const index = buildContentIndex({ cwd });
  const slugOwners = new Map<string, string[]>();

  for (const entry of index) {
    slugOwners.set(entry.slug, [
      ...(slugOwners.get(entry.slug) ?? []),
      entry.relativePath,
    ]);

    if (!isValidArticleSlug(entry.slug)) {
      issues.push({
        severity: 'blocker',
        code: 'invalid_slug',
        slug: entry.slug,
        path: entry.relativePath,
        message: 'Folder slug must be lowercase hyphen-separated.',
      });
    }

    for (const missing of entry.missingFiles) {
      issues.push({
        severity: 'error',
        code: 'missing_file',
        slug: entry.slug,
        path: `${entry.relativePath}/${missing}`,
        message: `Missing required package file "${missing}".`,
      });
    }

    const seoPath = path.join(cwd, entry.relativePath, '04_SEO.json');
    if (existsSync(seoPath)) {
      try {
        const seo = JSON.parse(readFileSync(seoPath, 'utf8')) as {
          slug?: string;
          title?: string;
          metaTitle?: string;
          metaDescription?: string;
          canonicalPath?: string;
        };
        if (!seo.title || !seo.metaTitle || !seo.metaDescription || !seo.canonicalPath) {
          issues.push({
            severity: 'error',
            code: 'invalid_metadata',
            slug: entry.slug,
            path: `${entry.relativePath}/04_SEO.json`,
            message: 'SEO JSON is missing required metadata fields.',
          });
        }
        if (seo.slug && seo.slug !== entry.slug) {
          issues.push({
            severity: 'error',
            code: 'slug_mismatch',
            slug: entry.slug,
            path: `${entry.relativePath}/04_SEO.json`,
            message: `SEO slug "${seo.slug}" does not match folder slug.`,
          });
        }
      } catch {
        issues.push({
          severity: 'blocker',
          code: 'invalid_metadata',
          slug: entry.slug,
          path: `${entry.relativePath}/04_SEO.json`,
          message: 'SEO JSON is not valid JSON.',
        });
      }
    }

    const mdxPath = path.join(cwd, entry.relativePath, '03_Article.mdx');
    if (existsSync(mdxPath)) {
      const raw = readFileSync(mdxPath, 'utf8').trim();
      if (!raw) {
        issues.push({
          severity: 'error',
          code: 'empty_article_file',
          slug: entry.slug,
          path: `${entry.relativePath}/03_Article.mdx`,
          message: 'Article MDX file is empty.',
        });
      }
    }

    // Internal related slugs from plan (when brief exists)
    const brief = getPlannedArticleBySlug(entry.slug);
    if (brief) {
      for (const related of brief.relatedArticles) {
        const relatedBrief = getPlannedArticleBySlug(related);
        if (!relatedBrief) {
          issues.push({
            severity: 'warning',
            code: 'broken_internal_link',
            slug: entry.slug,
            message: `Related article "${related}" is not in the content plan.`,
          });
        }
      }
    }
  }

  for (const [slug, paths] of slugOwners) {
    if (paths.length > 1) {
      issues.push({
        severity: 'blocker',
        code: 'duplicate_slug',
        slug,
        message: `Duplicate slug folders: ${paths.join(', ')}`,
      });
    }
  }

  // Plan coverage recommendations
  for (const planned of PLANNED_ARTICLES) {
    const folder = platformToFolder(planned.platform);
    const abs = packageDir(cwd, folder, planned.slug);
    if (!existsSync(abs)) {
      issues.push({
        severity: 'recommendation',
        code: 'missing_planned_package',
        slug: planned.slug,
        message: `Planned article "${planned.slug}" has no repository package yet.`,
      });
    }
  }

  const ok = !issues.some(
    (i) => i.severity === 'blocker' || i.severity === 'error',
  );

  return { ok, issues, index };
}

/**
 * Scaffold packages for every planned article (50).
 */
export function scaffoldAllPlannedPackages(
  options: { cwd?: string; force?: boolean } = {},
): CreateArticlePackageResult[] {
  return PLANNED_ARTICLES.map((brief) =>
    createArticlePackage(brief.slug, {
      cwd: options.cwd,
      force: options.force,
      brief,
    }),
  );
}

export { getRequiredPackageFiles, platformToFolder, isValidArticleSlug };
