/**
 * JSON values in site_settings — shared by coupons + package overrides.
 */

import { eq } from 'drizzle-orm';

import { isDatabaseConfigured } from '@/lib/config/env';
import { getDb } from '@/lib/db/client';
import * as tables from '@/lib/db/schema';

const memoryJson = new Map<string, string>();

async function readRaw(key: string): Promise<string | null> {
  if (memoryJson.has(key)) return memoryJson.get(key) ?? null;
  if (!isDatabaseConfigured()) return null;
  try {
    const db = getDb();
    const [row] = await db
      .select()
      .from(tables.siteSettings)
      .where(eq(tables.siteSettings.key, key))
      .limit(1);
    if (row?.value != null) {
      memoryJson.set(key, row.value);
      return row.value;
    }
  } catch {
    return null;
  }
  return null;
}

async function writeRaw(key: string, value: string): Promise<void> {
  memoryJson.set(key, value);
  if (!isDatabaseConfigured()) return;
  const db = getDb();
  const now = new Date();
  await db
    .insert(tables.siteSettings)
    .values({ key, value, updatedAt: now })
    .onConflictDoUpdate({
      target: tables.siteSettings.key,
      set: { value, updatedAt: now },
    });
}

export async function readJsonSetting<T>(key: string, fallback: T): Promise<T> {
  const raw = await readRaw(key);
  if (!raw) return fallback;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export async function writeJsonSetting<T>(key: string, value: T): Promise<T> {
  await writeRaw(key, JSON.stringify(value));
  return value;
}

/** Test helper — clear in-memory JSON settings cache. */
export function clearJsonSettingsMemoryForTests(): void {
  memoryJson.clear();
}
