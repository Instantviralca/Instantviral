/**
 * Production Content Library — Phase 17 starter kit.
 * Maps editorial slots to planned article packages. Does not invent article bodies.
 */

import { existsSync, mkdirSync, writeFileSync } from 'node:fs';
import path from 'node:path';

import { PLANNED_ARTICLES, getPlannedArticleBySlug } from '@/data/content-plan/articles';
import { platformToFolder } from '@/lib/content-repository/paths';
import { runContentQA } from '@/lib/content-qa';
import type {
  ContentLibraryQueue,
  ContentLibrarySlot,
  ContentLibrarySlotStatus,
} from '@/types/content-library';

/** First 10 production queue titles from Document 17.00. */
export const CONTENT_LIBRARY_STARTER_QUEUE = [
  {
    slot: 1,
    title: 'How to Get More Instagram Followers',
    slug: 'how-to-get-more-instagram-followers',
  },
  {
    slot: 2,
    title: 'How the Instagram Algorithm Works',
    slug: 'how-the-instagram-algorithm-works',
  },
  {
    slot: 3,
    title: 'How to Get More TikTok Followers',
    slug: 'how-to-get-more-tiktok-followers',
  },
  {
    slot: 4,
    title: 'How to Get More TikTok Views',
    slug: 'how-to-get-more-views-on-tiktok',
  },
  {
    slot: 5,
    title: 'How to Get More Facebook Followers',
    slug: 'how-to-get-more-facebook-followers',
  },
  {
    slot: 6,
    title: 'Facebook Page Optimization Guide',
    slug: 'facebook-page-optimization-guide',
  },
  {
    slot: 7,
    title: 'How to Get More YouTube Subscribers',
    slug: 'how-to-get-more-youtube-subscribers',
  },
  {
    slot: 8,
    title: 'How to Get More YouTube Views',
    slug: 'how-to-get-more-views-on-youtube',
  },
  {
    slot: 9,
    title: 'Social Media Growth Strategy for Beginners',
    slug: 'social-media-growth-strategy-for-beginners',
  },
  {
    slot: 10,
    title: 'Social Media Metrics That Matter',
    slug: 'social-media-metrics-that-matter',
  },
] as const;

const SUCCESS_CRITERIA = [
  'Every article passes QA',
  'SEO assets complete',
  'Schema valid',
  'Internal links complete',
  'Ready to publish',
] as const;

export function resolveLibrarySlotStatus(
  packageAbsDir: string | null,
): ContentLibrarySlotStatus {
  if (!packageAbsDir || !existsSync(packageAbsDir)) return 'Not Started';

  const mdxPath = path.join(packageAbsDir, '03_Article.mdx');
  if (!existsSync(mdxPath)) return 'Not Started';

  const report = runContentQA(packageAbsDir, { writeReports: false });
  if (report.publishEligible) return 'Ready to Publish';
  if (report.issues.some((i) => i.code === 'placeholder_or_todo')) {
    return 'Not Started';
  }
  if (report.issues.some((i) => i.code === 'awaiting_editorial_approval')) {
    return 'In Progress';
  }
  if (report.status === 'requires_review' || report.status === 'failed') {
    return 'In QA';
  }
  return 'In Progress';
}

export function buildLibrarySlot(
  slot: number,
  options: { cwd?: string; status?: ContentLibrarySlotStatus } = {},
): ContentLibrarySlot | null {
  const entry = CONTENT_LIBRARY_STARTER_QUEUE.find((s) => s.slot === slot);
  if (!entry) return null;
  const brief = getPlannedArticleBySlug(entry.slug);
  if (!brief) return null;

  const cwd = options.cwd ?? process.cwd();
  const platformFolder = platformToFolder(brief.platform);
  const packagePath = `content/${platformFolder}/${brief.slug}`;
  const abs = path.join(cwd, packagePath);
  const status = options.status ?? resolveLibrarySlotStatus(abs);

  return {
    slot: entry.slot,
    articleId: `Article_${String(entry.slot).padStart(2, '0')}`,
    title: entry.title,
    slug: entry.slug,
    platform: brief.platform,
    platformFolder,
    packagePath,
    status,
    successCriteria: [...SUCCESS_CRITERIA],
  };
}

export function getLibraryQueue(options: { cwd?: string } = {}): ContentLibraryQueue {
  const slots = CONTENT_LIBRARY_STARTER_QUEUE.map((entry) => {
    const slot = buildLibrarySlot(entry.slot, { cwd: options.cwd });
    if (!slot) {
      throw new Error(`Missing planned brief for library slot ${entry.slot}`);
    }
    return slot;
  });

  return {
    phase: '17',
    title: 'Production Content Library',
    totalPlanned: PLANNED_ARTICLES.length,
    starterCount: slots.length,
    slots,
  };
}

export function renderLibrarySlotReadme(slot: ContentLibrarySlot): string {
  const criteria = slot.successCriteria.map((c) => `- [ ] ${c}`).join('\n');
  return [
    `# ${slot.articleId} — ${slot.title}`,
    '',
    `Status: **${slot.status}**`,
    '',
    '## Mapping',
    '',
    `- Slug: \`${slot.slug}\``,
    `- Platform: ${slot.platform}`,
    `- Package: \`${slot.packagePath}\``,
    '',
    '## Production package',
    '',
    'This slot tracks the full production package living under the content repository:',
    '',
    '```',
    '00_README.md',
    '01_Research.md',
    '02_Article_Brief.md',
    '03_Article.mdx',
    '04_SEO.json',
    '05_FAQ.json',
    '06_JSON-LD.json',
    '07_Image_Brief.md',
    '08_Internal_Links.md',
    '09_External_Sources.md',
    '10_Social_Posts.md',
    '11_Email_Newsletter.md',
    '12_Content_Checklist.md',
    '13_Editor_Notes.md',
    '14_Changelog.md',
    '```',
    '',
    '## Success criteria',
    '',
    criteria,
    '',
    '## Notes',
    '',
    '- Do not invent authors, stats, or publish unfinished MDX.',
    '- Continue until all 50 planned articles are completed.',
    '',
  ].join('\n');
}

export function syncLibraryStarters(options: {
  cwd?: string;
  writeQueueJson?: boolean;
} = {}): ContentLibraryQueue {
  const cwd = options.cwd ?? process.cwd();
  const queue = getLibraryQueue({ cwd });
  const root = path.join(cwd, 'docs', '17_Content_Library');
  mkdirSync(root, { recursive: true });

  for (const slot of queue.slots) {
    const dir = path.join(root, slot.articleId);
    mkdirSync(dir, { recursive: true });
    writeFileSync(path.join(dir, 'README.md'), renderLibrarySlotReadme(slot), 'utf8');
  }

  writeFileSync(
    path.join(root, 'QUEUE.md'),
    [
      '# Phase 17 — Publishing Queue (Starter Kit)',
      '',
      `Total planned articles: **${queue.totalPlanned}**`,
      `Starter slots: **${queue.starterCount}**`,
      '',
      '| Slot | Title | Slug | Status | Package |',
      '| --- | --- | --- | --- | --- |',
      ...queue.slots.map(
        (s) =>
          `| ${String(s.slot).padStart(2, '0')} | ${s.title} | \`${s.slug}\` | ${s.status} | \`${s.packagePath}\` |`,
      ),
      '',
      'Continue until all 50 planned articles are completed.',
      '',
    ].join('\n'),
    'utf8',
  );

  if (options.writeQueueJson !== false) {
    writeFileSync(
      path.join(root, 'queue.json'),
      `${JSON.stringify(queue, null, 2)}\n`,
      'utf8',
    );
  }

  return queue;
}
