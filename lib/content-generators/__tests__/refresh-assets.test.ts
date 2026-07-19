/**
 * Refresh SEO/image/social/newsletter/i18n assets for all planned packages —
 * Documents 16.03–16.07. Opt-in: SCAFFOLD_CONTENT_ASSETS=1
 */

import { existsSync } from 'node:fs';
import path from 'node:path';

import { describe, expect, it } from 'vitest';

import { PLANNED_ARTICLES } from '@/data/content-plan/articles';
import { writeGeneratedAssets } from '@/lib/content-generators/write-assets';
import { updateContentIndex } from '@/lib/content-generators/article-package';
import { buildLocaleIndex } from '@/lib/content-translation';
import { platformToFolder } from '@/lib/content-repository/paths';

const shouldRun = process.env.SCAFFOLD_CONTENT_ASSETS === '1';

describe('Refresh package assets', () => {
  it.skipIf(!shouldRun)(
    'writes SEO, image, social, newsletter, and i18n assets for all 50 packages',
    () => {
      let updated = 0;
      for (const brief of PLANNED_ARTICLES) {
        const folder = platformToFolder(brief.platform);
        const abs = path.join(process.cwd(), 'content', folder, brief.slug);
        if (!existsSync(abs)) continue;
        const result = writeGeneratedAssets(abs, brief, { publishState: 'draft' });
        expect(
          result.issues.filter((i) => i.severity === 'blocker'),
        ).toEqual([]);
        updated += 1;
      }
      expect(updated).toBe(50);
      const index = updateContentIndex({ cwd: process.cwd() });
      expect(index.count).toBeGreaterThanOrEqual(50);
      const localeIndex = buildLocaleIndex({ cwd: process.cwd() });
      expect(localeIndex.count).toBeGreaterThanOrEqual(50);
    },
    60_000,
  );

  it('documents opt-in when idle', () => {
    if (shouldRun) return;
    expect(shouldRun).toBe(false);
  });
});
