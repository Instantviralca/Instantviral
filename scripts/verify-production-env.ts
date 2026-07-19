/**
 * Verify required production environment variables (no secret values printed).
 * Usage:
 *   npx tsx scripts/verify-production-env.ts
 *   IV_VERIFY_AS_PRODUCTION=1 npx tsx scripts/verify-production-env.ts
 * Exit 0 = ready, Exit 1 = missing/invalid.
 */

import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';

import { validateEnv } from '../lib/config/env';

/** Minimal .env loader (no dependency) — does not override existing process.env. */
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

function main() {
  loadEnvFile('.env');
  loadEnvFile('.env.local');

  const forceProduction = process.env.IV_VERIFY_AS_PRODUCTION === '1';
  const result = validateEnv({
    throwOnProductionErrors: false,
    forceProduction,
  });

  const errors = result.issues.filter((i) => i.level === 'error');
  const warnings = result.issues.filter((i) => i.level === 'warning');

  console.log('[env] Production environment verification');
  console.log(`[env] mode=${forceProduction ? 'production-rules' : 'current-runtime'}`);
  console.log(`[env] ok=${result.ok}`);

  for (const issue of errors) {
    console.error(`[env:error] ${issue.key}: ${issue.message}`);
  }
  for (const issue of warnings) {
    console.warn(`[env:warn] ${issue.key}: ${issue.message}`);
  }

  if (!result.ok) {
    console.error('[env] NOT READY — fix errors above before deploying.');
    process.exit(1);
  }

  console.log('[env] READY — critical production variables are present.');
  process.exit(0);
}

main();
