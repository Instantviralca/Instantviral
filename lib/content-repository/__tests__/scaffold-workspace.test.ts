/**
 * Scaffold all 50 planned article packages into ./content
 * Opt-in: SCAFFOLD_CONTENT=1 npx vitest run lib/content-repository/__tests__/scaffold-workspace.test.ts
 */

import { describe, expect, it } from 'vitest';

import {
  buildContentIndex,
  scaffoldAllPlannedPackages,
  validateRepository,
} from '@/lib/content-repository';

const shouldScaffold = process.env.SCAFFOLD_CONTENT === '1';

describe('Workspace content scaffold', () => {
  it.skipIf(!shouldScaffold)(
    'writes packages for all 50 planned articles under content/',
    () => {
      const results = scaffoldAllPlannedPackages({
        cwd: process.cwd(),
        force: true,
      });
      expect(results).toHaveLength(50);
      expect(results.every((r) => r.ok)).toBe(true);

      const index = buildContentIndex({ cwd: process.cwd() });
      expect(index.length).toBeGreaterThanOrEqual(50);

      const { issues } = validateRepository({ cwd: process.cwd() });
      const blockers = issues.filter(
        (i) => i.severity === 'blocker' || i.severity === 'error',
      );
      expect(blockers).toEqual([]);
    },
  );

  it('documents scaffold opt-in when not running', () => {
    if (shouldScaffold) return;
    expect(shouldScaffold).toBe(false);
  });
});
