import { readFileSync } from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';

describe('middleware geo-block reverse-proxy safety', () => {
  const source = readFileSync(
    path.join(process.cwd(), 'middleware.ts'),
    'utf8',
  );

  it('redirects blocked visitors to canonical unavailable via public origin', () => {
    expect(source).toContain('buildGeoBlockUnavailableUrl');
    expect(source).toContain('getSiteOrigin()');
    expect(source).toContain('NextResponse.redirect(destination, 307)');
  });

  it('does not rewrite geo blocks via request.nextUrl (proxy SSL bug)', () => {
    expect(source).not.toMatch(
      /shouldBlockRequest[\s\S]*?NextResponse\.rewrite/,
    );
    expect(source).not.toContain("url.pathname = '/unavailable'");
  });

  it('does not hardcode localhost:3001 destinations', () => {
    expect(source).not.toMatch(/localhost:3001/);
  });
});
