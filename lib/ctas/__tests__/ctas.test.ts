/**
 * Global CTA System tests — Document 14.06.
 */

import { describe, expect, it } from 'vitest';

import {
  dedupeCtas,
  getActiveCtas,
  getBlockingCtaIssues,
  getCtasByPage,
  getCtasByPlatform,
  getCtasByService,
  isValidCtaDestination,
  sanitizeCtaForPublic,
  selectFinalCtaPair,
  selectPageCtas,
  validateCtaDestination,
  validateCtaRegistry,
} from '@/lib/ctas';
import { getCtaRegistry } from '@/data/ctas';
import type { CtaRecord } from '@/types/cta';

describe('Global CTA System', () => {
  it('hides inactive CTAs from public getters', () => {
    const active = getActiveCtas();
    expect(active.every((cta) => cta.id !== 'cta-inactive-placeholder')).toBe(true);
    const inactive = getCtaRegistry().find((cta) => cta.id === 'cta-inactive-placeholder')!;
    expect(sanitizeCtaForPublic(inactive)).toBeNull();
  });

  it('selects CTAs by page location', () => {
    const homepage = getCtasByPage('homepage');
    expect(homepage.length).toBeGreaterThan(0);
    expect(homepage.every((cta) => cta.pageLocations.includes('homepage'))).toBe(
      true,
    );
  });

  it('selects service and platform CTAs', () => {
    const service = getCtasByService('buy-instagram-followers', { limit: 5 });
    expect(service.length).toBeGreaterThan(0);
    expect(service.length).toBeLessThanOrEqual(5);

    const platform = getCtasByPlatform('instagram', { limit: 5 });
    expect(platform.some((cta) => cta.platform === 'instagram')).toBe(true);
  });

  it('validates destinations and rejects external / skipped services', () => {
    expect(isValidCtaDestination('/contact')).toBe(true);
    expect(isValidCtaDestination('/buy-instagram-followers')).toBe(true);
    expect(isValidCtaDestination('#service-pricing')).toBe(true);
    expect(isValidCtaDestination('https://example.com')).toBe(false);
    expect(isValidCtaDestination('/buy-instagram-reels-views')).toBe(false);
    expect(validateCtaDestination('/not-a-real-page').valid).toBe(false);
  });

  it('prevents duplicate CTA rendering', () => {
    const duplicates = dedupeCtas([
      {
        id: 'a',
        title: 'A',
        buttonLabel: 'Get Started',
        destination: '/contact',
        variant: 'primary',
        pageLocations: ['homepage'],
        order: 1,
      },
      {
        id: 'a',
        title: 'A2',
        buttonLabel: 'Get Started',
        destination: '/contact',
        variant: 'primary',
        pageLocations: ['homepage'],
        order: 2,
      },
      {
        id: 'b',
        title: 'B',
        buttonLabel: 'Get Started',
        destination: '/contact',
        variant: 'secondary',
        pageLocations: ['homepage'],
        order: 3,
      },
    ]);
    expect(duplicates).toHaveLength(1);
  });

  it('selects final CTA pairs without inactive items', () => {
    const pair = selectFinalCtaPair('homepage');
    expect(pair).not.toBeNull();
    expect(pair?.primary.variant).toBe('primary');
    expect(pair?.primary.id).not.toBe('cta-inactive-placeholder');
  });

  it('page selection returns structured variants', () => {
    const selection = selectPageCtas('faq', { limit: 6 });
    expect(selection.all.length).toBeGreaterThan(0);
    expect(selection.all.every((cta) => cta.buttonLabel.trim().length > 0)).toBe(
      true,
    );
  });

  it('registry validation reports inactive but no blocking destination errors', () => {
    const report = validateCtaRegistry();
    expect(report.issues.some((issue) => issue.kind === 'inactive')).toBe(true);
    expect(report.invalidDestinationCount).toBe(0);
    expect(report.duplicateIdCount).toBe(0);
    expect(getBlockingCtaIssues(report)).toHaveLength(0);
  });

  it('rejects CTAs with invalid destinations during sanitize', () => {
    const bad: CtaRecord = {
      id: 'bad-external',
      title: 'Bad',
      buttonLabel: 'Click',
      destination: 'https://evil.example',
      variant: 'primary',
      pageLocations: ['homepage'],
      active: true,
      order: 1,
    };
    expect(sanitizeCtaForPublic(bad)).toBeNull();
  });
});
