/**
 * Database client — PostgreSQL via DATABASE_URL (Neon/Supabase compatible).
 */

import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

import * as schema from '@/lib/db/schema';
import { isDatabaseConfigured } from '@/lib/config/env';

export type AppDatabase = ReturnType<typeof drizzle<typeof schema>>;

let client: ReturnType<typeof postgres> | null = null;
let db: AppDatabase | null = null;

export function getDatabaseUrl(): string | null {
  const url = process.env.DATABASE_URL?.trim();
  return url || null;
}

export function getDb(): AppDatabase {
  if (db) return db;
  const url = getDatabaseUrl();
  if (!url) {
    throw new Error('DATABASE_URL is not configured.');
  }
  client = postgres(url, { max: 5, prepare: false });
  db = drizzle(client, { schema });
  return db;
}

export function isDbReady(): boolean {
  return isDatabaseConfigured();
}

export async function closeDb(): Promise<void> {
  if (client) {
    await client.end({ timeout: 5 });
    client = null;
    db = null;
  }
}

/** Test helper — reset singleton between suites. */
export function resetDbSingletonForTests(): void {
  client = null;
  db = null;
}
