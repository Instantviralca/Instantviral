/**
 * Social image file validation — Document 14.07.
 */

import fs from 'node:fs';
import path from 'node:path';

import { seoSiteConfig } from '@/config/seo';
import { getMetadataRegistry } from '@/data/seo/metadata-registry';
import type { MetadataEntry, MetadataIssue, SocialImageValidation } from '@/types/seo-metadata';

function publicFilePath(webPath: string): string {
  const cleaned = webPath.startsWith('/') ? webPath.slice(1) : webPath;
  return path.join(process.cwd(), 'public', cleaned);
}

export function validateSocialImage(webPath: string): SocialImageValidation {
  if (!webPath.trim()) {
    return { path: webPath, exists: false, detail: 'Empty image path' };
  }

  if (webPath.startsWith('http://') || webPath.startsWith('https://')) {
    return {
      path: webPath,
      exists: false,
      detail: 'Remote social images are not validated as local assets',
    };
  }

  const filePath = publicFilePath(webPath);
  const exists = fs.existsSync(filePath);

  return {
    path: webPath,
    exists,
    width: exists ? seoSiteConfig.defaultOpenGraphImageWidth : undefined,
    height: exists ? seoSiteConfig.defaultOpenGraphImageHeight : undefined,
    detail: exists
      ? undefined
      : `Missing social image file at public${webPath.startsWith('/') ? webPath : `/${webPath}`}`,
  };
}

export function validateSocialImages(
  source: MetadataEntry[] = getMetadataRegistry(),
): MetadataIssue[] {
  const issues: MetadataIssue[] = [];
  const checked = new Set<string>();

  for (const entry of source) {
    if (!entry.active) continue;
    const images = [
      entry.openGraphImage,
      entry.twitterImage ?? entry.openGraphImage,
    ].filter(Boolean) as string[];

    for (const image of images) {
      if (checked.has(image)) continue;
      checked.add(image);
      const result = validateSocialImage(image);
      if (!result.exists) {
        issues.push({
          kind: 'missing_social_image_file',
          route: entry.route,
          entryId: entry.id,
          sourceFile: entry.sourceFile,
          detail: result.detail ?? `Missing social image "${image}"`,
        });
      }
    }
  }

  return issues;
}
