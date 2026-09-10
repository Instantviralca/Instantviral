/**
 * CLI / Contabo worker entrypoint for abandoned cart recovery.
 * Usage: npx tsx scripts/process-abandoned-carts.ts
 *
 * Does not depend on Vercel. Safe to schedule via Linux cron or PM2.
 */

import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';

import { processDueAbandonedCartEmails } from '@/lib/abandoned-cart/process-recovery';

function loadEnvFile(filename: string) {
  const fullPath = path.join(process.cwd(), filename);
  if (!existsSync(fullPath)) return;
  const text = readFileSync(fullPath, 'utf8');
  for (const rawLine of text.split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line || line.startsWith('#')) continue;
    const eq = line.indexOf('=');
    if (eq <= 0) continue;
    const key = line.slice(0, eq).trim();
    let value = line.slice(eq + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    if (process.env[key] === undefined) {
      process.env[key] = value;
    }
  }
}

async function main() {
  loadEnvFile('.env');
  loadEnvFile('.env.local');

  const result = await processDueAbandonedCartEmails({
    triggeredBy: 'cli_worker',
    runCleanup: true,
  });

  console.log(JSON.stringify(result, null, 2));
  if (!result.ok && !result.skipped) process.exit(1);
}

main().catch((error) => {
  console.error('[abandoned-carts] failed', error instanceof Error ? error.message : error);
  process.exit(1);
});
