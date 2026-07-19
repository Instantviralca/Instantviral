/**
 * CLI harness for create-article — Document 16.02.
 * Invoked via scripts/create-article.sh
 */

import { describe, expect, it } from 'vitest';

import { createArticle } from '@/lib/content-generators/article-package';

const platform = process.env.CREATE_ARTICLE_PLATFORM;
const slug = process.env.CREATE_ARTICLE_SLUG;
const force = process.env.CREATE_ARTICLE_FORCE === '1';
const shouldRun = Boolean(platform && slug);

describe('create-article CLI', () => {
  it.skipIf(!shouldRun)('creates the requested article package', () => {
    const result = createArticle(platform!, slug!, { force });
    if (!result.ok) {
      for (const issue of result.issues) {
        console.error(`[${issue.severity}] ${issue.code}: ${issue.message}`);
      }
    }
    expect(result.ok).toBe(true);
    expect(result.relativePath.length).toBeGreaterThan(0);
    console.log(
      `Created ${result.relativePath} (${result.created.length} files, ${result.assetsWritten.length} asset writes)`,
    );
  });

  it('stays idle without CLI env', () => {
    if (shouldRun) return;
    expect(shouldRun).toBe(false);
  });
});
