/**
 * Write generated assets into an article package — Documents 16.03–16.07.
 */

import { mkdirSync, writeFileSync } from 'node:fs';
import path from 'node:path';

import {
  generateSeoAssets,
  validateSeoAssets,
} from '@/lib/content-generators/seo';
import {
  buildImageManifest,
  generateImageBrief,
  generateImagePrompts,
  validateImageAssets,
} from '@/lib/content-generators/images';
import {
  buildCampaignAssets,
  renderSocialPostsMarkdown,
  validateSocialAssets,
} from '@/lib/content-generators/social';
import {
  generateNewsletter,
  renderNewsletterMarkdown,
  validateNewsletter,
} from '@/lib/content-generators/newsletter';
import {
  validateTranslation,
  writeTranslationFiles,
} from '@/lib/content-translation';
import type { ArticleBrief } from '@/types/content-plan';
import type { AssetValidationIssue, ContentPublishState } from '@/types/content-assets';

export type WriteGeneratedAssetsResult = {
  ok: boolean;
  written: string[];
  issues: AssetValidationIssue[];
};

export function writeGeneratedAssets(
  packageAbsDir: string,
  brief: ArticleBrief,
  options: { publishState?: ContentPublishState } = {},
): WriteGeneratedAssetsResult {
  const written: string[] = [];
  const publishState = options.publishState ?? 'draft';
  const { seo, faq, schema } = generateSeoAssets({ brief, publishState });
  const imageManifest = buildImageManifest(brief);
  const social = buildCampaignAssets(brief);
  const newsletter = generateNewsletter(brief);
  const translation = writeTranslationFiles(packageAbsDir, brief);

  const issues: AssetValidationIssue[] = [
    ...validateSeoAssets(seo),
    ...validateImageAssets(imageManifest),
    ...validateSocialAssets(social),
    ...validateNewsletter(newsletter),
    ...validateTranslation(translation.pkg, translation.localeMap).map((i) => ({
      severity: i.severity,
      code: i.code,
      field: i.field ?? i.locale,
      message: i.message,
    })),
  ];

  const assetsSeo = path.join(packageAbsDir, 'assets', 'seo');
  const assetsImages = path.join(packageAbsDir, 'assets', 'images');
  const assetsSocial = path.join(packageAbsDir, 'assets', 'social');
  const assetsNewsletter = path.join(packageAbsDir, 'assets', 'newsletter');
  mkdirSync(assetsSeo, { recursive: true });
  mkdirSync(assetsImages, { recursive: true });
  mkdirSync(assetsSocial, { recursive: true });
  mkdirSync(assetsNewsletter, { recursive: true });

  const writes: Array<[string, string]> = [
    [path.join(packageAbsDir, '04_SEO.json'), `${JSON.stringify(seo, null, 2)}\n`],
    [path.join(packageAbsDir, '05_FAQ.json'), `${JSON.stringify(faq, null, 2)}\n`],
    [
      path.join(packageAbsDir, '06_JSON-LD.json'),
      `${JSON.stringify(schema, null, 2)}\n`,
    ],
    [path.join(packageAbsDir, '07_Image_Brief.md'), generateImageBrief(brief)],
    [
      path.join(packageAbsDir, '10_Social_Posts.md'),
      renderSocialPostsMarkdown(social),
    ],
    [
      path.join(packageAbsDir, '11_Email_Newsletter.md'),
      renderNewsletterMarkdown(newsletter),
    ],
    [path.join(assetsSeo, 'seo.json'), `${JSON.stringify(seo, null, 2)}\n`],
    [path.join(assetsSeo, 'schema.json'), `${JSON.stringify(schema, null, 2)}\n`],
    [path.join(assetsSeo, 'faq.json'), `${JSON.stringify(faq, null, 2)}\n`],
    [
      path.join(assetsSeo, 'sitemap-meta.json'),
      `${JSON.stringify(seo.sitemap, null, 2)}\n`,
    ],
    [
      path.join(assetsImages, 'image-brief.md'),
      generateImageBrief(brief),
    ],
    [
      path.join(assetsImages, 'image-prompts.md'),
      generateImagePrompts(brief),
    ],
    [
      path.join(assetsImages, 'image-manifest.json'),
      `${JSON.stringify(imageManifest, null, 2)}\n`,
    ],
    [
      path.join(assetsSocial, 'social-posts.md'),
      renderSocialPostsMarkdown(social),
    ],
    [
      path.join(assetsSocial, 'social-assets.json'),
      `${JSON.stringify(social, null, 2)}\n`,
    ],
    [
      path.join(assetsNewsletter, 'newsletter.md'),
      renderNewsletterMarkdown(newsletter),
    ],
    [
      path.join(assetsNewsletter, 'newsletter.json'),
      `${JSON.stringify(newsletter, null, 2)}\n`,
    ],
  ];

  for (const [file, contents] of writes) {
    writeFileSync(file, contents, 'utf8');
    written.push(file);
  }

  written.push(...translation.written);

  const ok = !issues.some(
    (i) => i.severity === 'blocker' || i.severity === 'error',
  );

  return { ok, written, issues };
}
