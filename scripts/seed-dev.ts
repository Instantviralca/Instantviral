/**
 * Safe development seed — verifies DATABASE_URL connectivity only.
 * Does not invent orders, articles, or commercial data.
 *
 * Usage: DATABASE_URL=... npx tsx scripts/seed-dev.ts
 */

import { sql } from 'drizzle-orm';

import { closeDb, getDb } from '../lib/db/client';

async function main() {
  if (!process.env.DATABASE_URL) {
    console.error('DATABASE_URL is required for seed.');
    process.exit(1);
  }
  if (process.env.NODE_ENV === 'production') {
    console.error('Refusing to seed in production.');
    process.exit(1);
  }

  const db = getDb();
  await db.execute(sql`SELECT 1`);
  console.log('Dev DB connection OK. Apply drizzle/0001_init.sql for schema.');
  console.log('No commercial seed data written (safe by design).');
  await closeDb();
}

main().catch(async (error) => {
  console.error(error);
  await closeDb().catch(() => undefined);
  process.exit(1);
});
