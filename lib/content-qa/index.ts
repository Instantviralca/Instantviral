/**
 * Content QA Pipeline — Document 16.08.
 * Validates article packages before publication.
 */

import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';

import { ARTICLE_PACKAGE_FILES } from '@/types/content-design-system';
import type {
  ContentQAIssue,
  ContentQAReport,
  ContentQASeverity,
  ContentQAStage,
  ContentQAStageSummary,
  ContentQAStatus,
  RunContentQAOptions,
} from '@/types/content-qa';

const STAGE_LABELS: Record<ContentQAStage, string> = {
  structure: 'Structure Validation',
  seo: 'SEO Validation',
  content: 'Content Validation',
  accessibility: 'Accessibility Validation',
  links: 'Link Validation',
  schema: 'Schema Validation',
  editorial: 'Editorial Approval',
};

const PLACEHOLDER_PATTERNS = [
  /body pending/i,
  /placeholder/i,
  /\bTODO\b/,
  /\bFIXME\b/,
  /rewrite during production/i,
  /do not publish this package/i,
];

function countBySeverity(issues: ContentQAIssue[]) {
  const counts = {
    blocker: 0,
    error: 0,
    warning: 0,
    recommendation: 0,
    total: issues.length,
  };
  for (const issue of issues) {
    counts[issue.severity] += 1;
  }
  return counts;
}

function summarizeStages(issues: ContentQAIssue[]): ContentQAStageSummary[] {
  return (Object.keys(STAGE_LABELS) as ContentQAStage[]).map((stage) => {
    const stageIssues = issues.filter((i) => i.stage === stage);
    const blockerCount = stageIssues.filter((i) => i.severity === 'blocker').length;
    const errorCount = stageIssues.filter((i) => i.severity === 'error').length;
    return {
      stage,
      label: STAGE_LABELS[stage],
      passed: blockerCount === 0 && errorCount === 0,
      issueCount: stageIssues.length,
      blockerCount,
      errorCount,
    };
  });
}

function resolveStatus(
  counts: ReturnType<typeof countBySeverity>,
): ContentQAStatus {
  if (counts.blocker > 0) return 'blocked_from_publish';
  if (counts.error > 0) return 'failed';
  if (counts.warning > 0) return 'requires_review';
  return 'passed';
}

function readJson<T>(filePath: string): { ok: true; value: T } | { ok: false; error: string } {
  try {
    return { ok: true, value: JSON.parse(readFileSync(filePath, 'utf8')) as T };
  } catch (error) {
    return {
      ok: false,
      error: error instanceof Error ? error.message : 'Invalid JSON',
    };
  }
}

function issue(
  severity: ContentQASeverity,
  stage: ContentQAStage,
  code: string,
  message: string,
  extra: Partial<Pick<ContentQAIssue, 'field' | 'path'>> = {},
): ContentQAIssue {
  return { severity, stage, code, message, ...extra };
}

export function validatePackage(packageAbsDir: string): ContentQAIssue[] {
  const issues: ContentQAIssue[] = [];
  if (!existsSync(packageAbsDir)) {
    issues.push(
      issue('blocker', 'structure', 'missing_package', 'Article package folder does not exist.', {
        path: packageAbsDir,
      }),
    );
    return issues;
  }

  for (const file of ARTICLE_PACKAGE_FILES) {
    const filePath = path.join(packageAbsDir, file);
    if (!existsSync(filePath)) {
      issues.push(
        issue('blocker', 'structure', 'missing_file', `Required file "${file}" is missing.`, {
          path: file,
        }),
      );
    }
  }

  return issues;
}

export function validateMetadata(packageAbsDir: string): ContentQAIssue[] {
  const issues: ContentQAIssue[] = [];
  const seoPath = path.join(packageAbsDir, '04_SEO.json');
  if (!existsSync(seoPath)) {
    issues.push(
      issue('blocker', 'seo', 'missing_seo', '04_SEO.json is required.', { path: '04_SEO.json' }),
    );
    return issues;
  }

  const parsed = readJson<Record<string, unknown>>(seoPath);
  if (!parsed.ok) {
    issues.push(
      issue('blocker', 'seo', 'invalid_seo_json', parsed.error, { path: '04_SEO.json' }),
    );
    return issues;
  }

  const seo = parsed.value;
  const required = ['metaTitle', 'metaDescription', 'canonicalPath', 'canonicalUrl', 'robots'] as const;
  for (const key of required) {
    if (seo[key] == null || seo[key] === '') {
      issues.push(
        issue('blocker', 'seo', 'incomplete_metadata', `Missing SEO field "${key}".`, {
          field: key,
          path: '04_SEO.json',
        }),
      );
    }
  }

  const canonical = String(seo.canonicalUrl ?? '');
  if (canonical && !canonical.startsWith('https://')) {
    issues.push(
      issue('error', 'seo', 'invalid_canonical', 'Canonical URL must be HTTPS.', {
        field: 'canonicalUrl',
        path: '04_SEO.json',
      }),
    );
  }

  const readingTime = seo.readingTimeMinutes;
  if (typeof readingTime !== 'number' || readingTime < 1) {
    issues.push(
      issue(
        'warning',
        'seo',
        'missing_reading_time',
        'Reading time should be calculated and stored on SEO assets.',
        { field: 'readingTimeMinutes', path: '04_SEO.json' },
      ),
    );
  }

  return issues;
}

export function validateArticle(packageAbsDir: string): ContentQAIssue[] {
  const issues: ContentQAIssue[] = [];
  const mdxPath = path.join(packageAbsDir, '03_Article.mdx');
  if (!existsSync(mdxPath)) {
    issues.push(
      issue('blocker', 'content', 'missing_article', '03_Article.mdx is required.', {
        path: '03_Article.mdx',
      }),
    );
    return issues;
  }

  const raw = readFileSync(mdxPath, 'utf8');
  if (!/^---[\s\S]*?---/.test(raw)) {
    issues.push(
      issue('blocker', 'content', 'invalid_frontmatter', 'MDX frontmatter is missing or invalid.', {
        path: '03_Article.mdx',
      }),
    );
  } else {
    if (!/slug:\s*\S+/.test(raw) || !/title:\s*.+/.test(raw)) {
      issues.push(
        issue(
          'error',
          'content',
          'incomplete_frontmatter',
          'Frontmatter must include slug and title.',
          { path: '03_Article.mdx' },
        ),
      );
    }
  }

  for (const pattern of PLACEHOLDER_PATTERNS) {
    if (pattern.test(raw)) {
      issues.push(
        issue(
          'blocker',
          'content',
          'placeholder_or_todo',
          `Article still contains placeholder/TODO content matching /${pattern.source}/.`,
          { path: '03_Article.mdx' },
        ),
      );
      break;
    }
  }

  if (!/^##\s+/m.test(raw)) {
    issues.push(
      issue(
        'warning',
        'content',
        'missing_headings',
        'Article should include at least one H2 section.',
        { path: '03_Article.mdx' },
      ),
    );
  }

  return issues;
}

export function validateSchema(packageAbsDir: string): ContentQAIssue[] {
  const issues: ContentQAIssue[] = [];
  const schemaPath = path.join(packageAbsDir, '06_JSON-LD.json');
  if (!existsSync(schemaPath)) {
    issues.push(
      issue('blocker', 'schema', 'missing_schema', '06_JSON-LD.json is required.', {
        path: '06_JSON-LD.json',
      }),
    );
    return issues;
  }

  const parsed = readJson<Record<string, unknown>>(schemaPath);
  if (!parsed.ok) {
    issues.push(
      issue('blocker', 'schema', 'invalid_schema_json', parsed.error, {
        path: '06_JSON-LD.json',
      }),
    );
    return issues;
  }

  const article = parsed.value.article as Record<string, unknown> | undefined;
  if (!article || article['@type'] !== 'Article') {
    issues.push(
      issue(
        'error',
        'schema',
        'invalid_article_schema',
        'JSON-LD must include an Article schema object.',
        { path: '06_JSON-LD.json', field: 'article' },
      ),
    );
  }

  const faqPath = path.join(packageAbsDir, '05_FAQ.json');
  if (existsSync(faqPath)) {
    const faq = readJson<{ items?: unknown[] }>(faqPath);
    if (!faq.ok) {
      issues.push(
        issue('error', 'schema', 'invalid_faq_json', faq.error, { path: '05_FAQ.json' }),
      );
    }
  }

  return issues;
}

export function validateLinks(packageAbsDir: string): ContentQAIssue[] {
  const issues: ContentQAIssue[] = [];
  const linksPath = path.join(packageAbsDir, '08_Internal_Links.md');
  if (!existsSync(linksPath)) {
    issues.push(
      issue('error', 'links', 'missing_internal_links', '08_Internal_Links.md is required.', {
        path: '08_Internal_Links.md',
      }),
    );
  } else {
    const raw = readFileSync(linksPath, 'utf8');
    if (!raw.trim()) {
      issues.push(
        issue('error', 'links', 'empty_internal_links', 'Internal links file is empty.', {
          path: '08_Internal_Links.md',
        }),
      );
    }
    const emptyMdLinks = raw.match(/\[[^\]]*\]\(\s*\)/g) ?? [];
    for (const match of emptyMdLinks) {
      issues.push(
        issue('error', 'links', 'broken_internal_link', `Broken markdown link: ${match}`, {
          path: '08_Internal_Links.md',
        }),
      );
    }
  }

  const externalPath = path.join(packageAbsDir, '09_External_Sources.md');
  if (existsSync(externalPath)) {
    const raw = readFileSync(externalPath, 'utf8');
    const urls = raw.match(/https?:\/\/[^\s)]+/g) ?? [];
    for (const url of urls) {
      if (!url.startsWith('https://')) {
        issues.push(
          issue(
            'warning',
            'links',
            'insecure_external_link',
            `External source should use HTTPS: ${url}`,
            { path: '09_External_Sources.md' },
          ),
        );
      }
    }
    if (/\]\(\s*http:\/\//.test(raw)) {
      issues.push(
        issue(
          'warning',
          'links',
          'external_link_format',
          'Prefer HTTPS markdown links for external sources.',
          { path: '09_External_Sources.md' },
        ),
      );
    }
  }

  return issues;
}

function validateAccessibility(packageAbsDir: string): ContentQAIssue[] {
  const issues: ContentQAIssue[] = [];
  const manifestPath = path.join(
    packageAbsDir,
    'assets',
    'images',
    'image-manifest.json',
  );
  const briefPath = path.join(packageAbsDir, '07_Image_Brief.md');

  if (!existsSync(briefPath) && !existsSync(manifestPath)) {
    issues.push(
      issue(
        'error',
        'accessibility',
        'missing_image_assets',
        'Image brief or image manifest is required for alt-text checks.',
      ),
    );
    return issues;
  }

  if (existsSync(manifestPath)) {
    const parsed = readJson<{ assets?: Array<{ alt?: string; role?: string }> }>(
      manifestPath,
    );
    if (!parsed.ok) {
      issues.push(
        issue('error', 'accessibility', 'invalid_image_manifest', parsed.error, {
          path: 'assets/images/image-manifest.json',
        }),
      );
      return issues;
    }
    for (const asset of parsed.value.assets ?? []) {
      if (!asset.alt?.trim()) {
        issues.push(
          issue(
            'blocker',
            'accessibility',
            'missing_alt_text',
            `Image asset "${asset.role ?? 'unknown'}" is missing alt text.`,
            { path: 'assets/images/image-manifest.json', field: 'alt' },
          ),
        );
      }
    }
  } else if (existsSync(briefPath)) {
    const raw = readFileSync(briefPath, 'utf8');
    if (!/alt/i.test(raw)) {
      issues.push(
        issue(
          'warning',
          'accessibility',
          'alt_text_not_documented',
          'Image brief should document alt text requirements.',
          { path: '07_Image_Brief.md' },
        ),
      );
    }
  }

  return issues;
}

function validateEditorial(packageAbsDir: string): ContentQAIssue[] {
  const issues: ContentQAIssue[] = [];
  const checklist = path.join(packageAbsDir, '12_Content_Checklist.md');
  const notes = path.join(packageAbsDir, '13_Editor_Notes.md');

  if (!existsSync(checklist)) {
    issues.push(
      issue('error', 'editorial', 'missing_checklist', '12_Content_Checklist.md is required.', {
        path: '12_Content_Checklist.md',
      }),
    );
  }

  if (existsSync(notes)) {
    const raw = readFileSync(notes, 'utf8');
    if (/approved\s*:\s*(yes|true)/i.test(raw)) {
      // Editorial marked approved — still subject to blockers elsewhere.
    } else {
      issues.push(
        issue(
          'blocker',
          'editorial',
          'awaiting_editorial_approval',
          'Editor notes do not record approval — package is not publish-eligible.',
          { path: '13_Editor_Notes.md' },
        ),
      );
    }
  } else {
    issues.push(
      issue('blocker', 'editorial', 'missing_editor_notes', '13_Editor_Notes.md is missing.', {
        path: '13_Editor_Notes.md',
      }),
    );
  }

  return issues;
}

export function generateQAReport(
  report: ContentQAReport,
  packageAbsDir: string,
): { jsonPath: string; mdPath: string } {
  const jsonPath = path.join(packageAbsDir, 'qa-report.json');
  const mdPath = path.join(packageAbsDir, 'qa-summary.md');

  writeFileSync(jsonPath, `${JSON.stringify(report, null, 2)}\n`, 'utf8');

  const lines = [
    `# QA Summary — ${report.slug}`,
    '',
    `- Status: **${report.status}**`,
    `- Publish eligible: **${report.publishEligible ? 'yes' : 'no'}**`,
    `- Generated: ${report.generatedAt}`,
    `- Package: \`${report.packagePath}\``,
    '',
    '## Counts',
    '',
    `- Blockers: ${report.counts.blocker}`,
    `- Errors: ${report.counts.error}`,
    `- Warnings: ${report.counts.warning}`,
    `- Recommendations: ${report.counts.recommendation}`,
    '',
    '## Stages',
    '',
  ];

  for (const stage of report.stages) {
    lines.push(
      `- ${stage.passed ? '✅' : '❌'} ${stage.label} (${stage.issueCount} issues)`,
    );
  }

  lines.push('', '## Issues', '');
  if (!report.issues.length) {
    lines.push('No issues found.');
  } else {
    for (const item of report.issues) {
      lines.push(
        `- **[${item.severity}]** (${item.stage}) \`${item.code}\`: ${item.message}`,
      );
    }
  }
  lines.push('');

  writeFileSync(mdPath, `${lines.join('\n')}\n`, 'utf8');
  return { jsonPath, mdPath };
}

export function runContentQA(
  packageAbsDir: string,
  options: RunContentQAOptions = {},
): ContentQAReport {
  const slug = path.basename(packageAbsDir);
  const issues: ContentQAIssue[] = [
    ...validatePackage(packageAbsDir),
    ...validateMetadata(packageAbsDir),
    ...validateArticle(packageAbsDir),
    ...validateAccessibility(packageAbsDir),
    ...validateLinks(packageAbsDir),
    ...validateSchema(packageAbsDir),
    ...validateEditorial(packageAbsDir),
  ];

  const counts = countBySeverity(issues);
  const status = resolveStatus(counts);
  const publishEligible = counts.blocker === 0 && counts.error === 0;

  const report: ContentQAReport = {
    slug,
    packagePath: packageAbsDir,
    generatedAt: new Date().toISOString(),
    status,
    publishEligible,
    stages: summarizeStages(issues),
    counts,
    issues,
  };

  if (options.writeReports !== false && existsSync(packageAbsDir)) {
    generateQAReport(report, packageAbsDir);
  }

  return report;
}

/** Convenience alias matching the package-level naming in the spec. */
export function validatePackageFull(packageAbsDir: string): ContentQAIssue[] {
  return [
    ...validatePackage(packageAbsDir),
    ...validateMetadata(packageAbsDir),
    ...validateArticle(packageAbsDir),
    ...validateAccessibility(packageAbsDir),
    ...validateLinks(packageAbsDir),
    ...validateSchema(packageAbsDir),
    ...validateEditorial(packageAbsDir),
  ];
}
