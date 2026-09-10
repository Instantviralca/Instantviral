/**
 * Legacy commercial URL handling — redirects + Twitter 410.
 */

import { describe, expect, it } from 'vitest';
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

import {
  FORBIDDEN_LEGACY_PUBLIC_HREFS,
  LEGACY_GONE_PATHS,
  LEGACY_SEO_REDIRECTS,
  buildLegacyRedirectLocation,
  resolveLegacySeoPath,
} from '@/lib/seo/legacy-urls';
import { buildSitemapEntries } from '@/lib/seo/sitemap';
import { getMetadataByRoute } from '@/lib/seo/metadata';
import { ROBOTS_DISALLOW_PATHS } from '@/data/seo/sitemap-policy';
import { getRobotsRules } from '@/seo/robots';

describe('legacy SEO redirects (combined commercial URLs)', () => {
  it('maps TikTok combined URL (slash + non-slash) to followers in one logical hop', () => {
    expect(resolveLegacySeoPath('/buy-tiktok-followers-likes')).toEqual({
      kind: 'redirect',
      destination: '/buy-tiktok-followers',
    });
    expect(resolveLegacySeoPath('/buy-tiktok-followers-likes/')).toEqual({
      kind: 'redirect',
      destination: '/buy-tiktok-followers',
    });
    expect(LEGACY_SEO_REDIRECTS['/buy-tiktok-followers-likes']).toBe(
      '/buy-tiktok-followers',
    );
    expect(LEGACY_SEO_REDIRECTS['/buy-tiktok-followers-likes/']).toBe(
      '/buy-tiktok-followers',
    );
  });

  it('maps Facebook combined URL (slash + non-slash) to followers', () => {
    expect(resolveLegacySeoPath('/buy-facebook-likes-followers')).toEqual({
      kind: 'redirect',
      destination: '/buy-facebook-followers',
    });
    expect(resolveLegacySeoPath('/buy-facebook-likes-followers/')).toEqual({
      kind: 'redirect',
      destination: '/buy-facebook-followers',
    });
  });

  it('maps YouTube combined URL (slash + non-slash) to subscribers', () => {
    expect(resolveLegacySeoPath('/buy-youtube-subscribers-views')).toEqual({
      kind: 'redirect',
      destination: '/buy-youtube-subscribers',
    });
    expect(resolveLegacySeoPath('/buy-youtube-subscribers-views/')).toEqual({
      kind: 'redirect',
      destination: '/buy-youtube-subscribers',
    });
  });

  it('does not send combined URLs to /services or homepage', () => {
    for (const path of [
      '/buy-tiktok-followers-likes',
      '/buy-facebook-likes-followers',
      '/buy-youtube-subscribers-views',
    ]) {
      const result = resolveLegacySeoPath(path);
      expect(result.kind).toBe('redirect');
      if (result.kind === 'redirect') {
        expect(result.destination).not.toBe('/services');
        expect(result.destination).not.toBe('/');
        expect(result.destination.endsWith('/')).toBe(false);
      }
    }
  });

  it('preserves query strings on one-hop 308 Location (slash + non-slash)', () => {
    const cases = [
      {
        path: '/buy-tiktok-followers-likes',
        dest: '/buy-tiktok-followers',
      },
      {
        path: '/buy-tiktok-followers-likes/',
        dest: '/buy-tiktok-followers',
      },
      {
        path: '/buy-facebook-likes-followers',
        dest: '/buy-facebook-followers',
      },
      {
        path: '/buy-facebook-likes-followers/',
        dest: '/buy-facebook-followers',
      },
      {
        path: '/buy-youtube-subscribers-views',
        dest: '/buy-youtube-subscribers',
      },
      {
        path: '/buy-youtube-subscribers-views/',
        dest: '/buy-youtube-subscribers',
      },
    ] as const;

    for (const { path, dest } of cases) {
      const resolved = resolveLegacySeoPath(path);
      expect(resolved).toEqual({ kind: 'redirect', destination: dest });
      expect(
        buildLegacyRedirectLocation(
          'https://instantviral.ca',
          dest,
          '?utm_source=test',
        ),
      ).toBe(`${dest}?utm_source=test`);
    }
  });
});

describe('legacy Twitter 410 Gone', () => {
  it('returns gone for slash and non-slash Twitter followers URLs', () => {
    expect(resolveLegacySeoPath('/buy-twitter-followers')).toEqual({ kind: 'gone' });
    expect(resolveLegacySeoPath('/buy-twitter-followers/')).toEqual({ kind: 'gone' });
    expect(LEGACY_GONE_PATHS.has('/buy-twitter-followers')).toBe(true);
    expect(LEGACY_GONE_PATHS.has('/buy-twitter-followers/')).toBe(true);
  });

  it('does not redirect Twitter to /services or homepage', () => {
    expect(LEGACY_SEO_REDIRECTS['/buy-twitter-followers']).toBeUndefined();
    expect(LEGACY_SEO_REDIRECTS['/buy-twitter-followers/']).toBeUndefined();
    expect(resolveLegacySeoPath('/buy-twitter-followers').kind).not.toBe('redirect');
  });

  it('is not listed in robots.txt Disallow (must remain crawlable for 410)', () => {
    expect(ROBOTS_DISALLOW_PATHS).not.toContain('/buy-twitter-followers');
    const disallow = getRobotsRules()[0]?.disallow ?? [];
    expect(disallow).not.toContain('/buy-twitter-followers');
    expect(disallow).not.toContain('/buy-twitter-followers/');
  });
});

describe('legacy URLs absent from sitemap + destinations indexable', () => {
  const urls = buildSitemapEntries().map((entry) => entry.url);

  it('excludes all four legacy URL families from sitemap', () => {
    for (const legacy of FORBIDDEN_LEGACY_PUBLIC_HREFS) {
      expect(urls.some((url) => url.includes(legacy))).toBe(false);
    }
  });

  it('keeps active replacement pages indexable with self-canonical paths', () => {
    for (const route of [
      '/buy-tiktok-followers',
      '/buy-facebook-followers',
      '/buy-youtube-subscribers',
    ]) {
      const meta = getMetadataByRoute(route);
      expect(meta, route).toBeTruthy();
      expect(meta?.indexable, route).toBe(true);
      expect(meta?.robots.index, route).toBe(true);
      expect(meta?.canonicalPath, route).toBe(route);
    }
  });
});

describe('no public hrefs to legacy commercial URLs', () => {
  const roots = ['components', 'data', 'app', 'public', 'config'];
  const skipDir = new Set([
    'node_modules',
    '.next',
    'dist',
    'coverage',
    '__tests__',
  ]);
  const exts = new Set(['.ts', '.tsx', '.js', '.jsx', '.md', '.txt', '.json']);

  function walk(dir: string, files: string[]): void {
    let entries: string[];
    try {
      entries = readdirSync(dir);
    } catch {
      return;
    }
    for (const name of entries) {
      if (skipDir.has(name)) continue;
      const full = join(dir, name);
      const st = statSync(full);
      if (st.isDirectory()) {
        walk(full, files);
        continue;
      }
      const ext = name.includes('.') ? name.slice(name.lastIndexOf('.')) : '';
      if (exts.has(ext)) files.push(full);
    }
  }

  it('finds zero public href occurrences of the four legacy paths', () => {
    const files: string[] = [];
    const root = process.cwd();
    for (const rel of roots) walk(join(root, rel), files);

    const hits: string[] = [];
    for (const file of files) {
      // Redirect/Gone source-of-truth module may mention paths; exclude it.
      if (file.replace(/\\/g, '/').endsWith('/lib/seo/legacy-urls.ts')) continue;
      if (file.replace(/\\/g, '/').includes('/lib/seo/__tests__/')) continue;

      const text = readFileSync(file, 'utf8');
      for (const legacy of FORBIDDEN_LEGACY_PUBLIC_HREFS) {
        // Match href="/path" or href='/path' or markdown ](/path)
        const patterns = [
          new RegExp(`href=["']${legacy}/?["']`),
          new RegExp(`\\]\\(${legacy}/?\\)`),
          new RegExp(`["']${legacy}/?["']\\s*[,}]`),
        ];
        // Also catch plain public URL strings used as links in content data.
        if (
          patterns.some((re) => re.test(text)) ||
          /(?:to|href|url|canonicalPath)\s*[:=]\s*['"`]/.test(text) &&
            text.includes(`'${legacy}'`)
        ) {
          // Narrow: only count clear link-like usages
          if (
            text.includes(`href="${legacy}`) ||
            text.includes(`href='${legacy}`) ||
            text.includes(`](${legacy}`) ||
            text.includes(`href: '${legacy}`) ||
            text.includes(`href: "${legacy}`) ||
            text.includes(`url: '${legacy}`) ||
            text.includes(`url: "${legacy}`)
          ) {
            hits.push(`${file} → ${legacy}`);
          }
        }
      }
    }

    expect(hits).toEqual([]);
  });
});

describe('next.config must not redefine Twitter → /services', () => {
  it('has no buy-twitter-followers redirect entries', () => {
    const config = readFileSync(join(process.cwd(), 'next.config.ts'), 'utf8');
    expect(config).not.toMatch(/source:\s*'\/buy-twitter-followers/);
    expect(config).not.toMatch(/buy-twitter-followers['"]\s*,\s*\n\s*destination:\s*['"]\/services/);
    expect(config).not.toContain("destination: '/services'");
  });

  it('does not redefine combined legacy redirects (middleware owns them)', () => {
    const config = readFileSync(join(process.cwd(), 'next.config.ts'), 'utf8');
    expect(config).not.toContain('/buy-tiktok-followers-likes');
    expect(config).not.toContain('/buy-facebook-likes-followers');
    expect(config).not.toContain('/buy-youtube-subscribers-views');
  });
});
