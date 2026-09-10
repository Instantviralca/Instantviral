/**
 * Soft metadata length / uniqueness audit.
 * Warnings only — does not fail CI for slight over-length descriptions.
 *
 * Usage: npx tsx scripts/audit-metadata-length.ts
 */

import {
  findDuplicateDescriptions,
  findDuplicateTitles,
  getIndexableMetadataEntries,
  validateMetadataRegistry,
} from '@/lib/seo/metadata';
import { clampMetaDescription } from '@/lib/seo/metadata/sanitize';

const entries = getIndexableMetadataEntries();
const report = validateMetadataRegistry();
const soft = report.issues.filter((issue) => issue.kind === 'soft_length_warning');
const hard = report.issues.filter((issue) => issue.kind !== 'soft_length_warning');

console.log(`Indexable entries: ${entries.length}`);
console.log(`Duplicate titles: ${findDuplicateTitles().length}`);
console.log(`Duplicate descriptions: ${findDuplicateDescriptions().length}`);
console.log(`Hard validation issues: ${hard.length}`);
console.log(`Soft length warnings: ${soft.length}`);

if (soft.length) {
  console.log('\nSoft length warnings:');
  for (const issue of soft.slice(0, 40)) {
    console.log(`- ${issue.route}: ${issue.detail}`);
  }
  if (soft.length > 40) console.log(`…and ${soft.length - 40} more`);
}

const longAfterClamp = entries.filter(
  (entry) => clampMetaDescription(entry.description).length > 160,
);
console.log(`\nDescriptions still >160 after clampMetaDescription: ${longAfterClamp.length}`);

if (hard.length) {
  console.log('\nHard issues:');
  for (const issue of hard.slice(0, 20)) {
    console.log(`- [${issue.kind}] ${issue.route}: ${issue.detail}`);
  }
  process.exitCode = 1;
}
