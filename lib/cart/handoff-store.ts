/**
 * Short-lived cart handoff for cross-subdomain checkout when cookies are oversized.
 */

import { randomBytes } from 'node:crypto';

import { eq } from 'drizzle-orm';

import { isDatabaseConfigured } from '@/lib/config/env';
import { getDb } from '@/lib/db/client';
import * as tables from '@/lib/db/schema';
import { deserializeCart } from '@/lib/cart/utils';
import type { CartState } from '@/types/cart';

const HANDOFF_PREFIX = 'cart_handoff:';
const memoryHandoffs = new Map<string, { payload: string; expiresAt: number }>();
const TTL_MS = 1000 * 60 * 30; // 30 minutes

function handoffKey(id: string): string {
  return `${HANDOFF_PREFIX}${id}`;
}

export async function createCartHandoff(payload: string): Promise<string> {
  const id = randomBytes(16).toString('hex');
  const expiresAt = Date.now() + TTL_MS;
  memoryHandoffs.set(id, { payload, expiresAt });

  if (isDatabaseConfigured()) {
    try {
      const db = getDb();
      await db
        .insert(tables.siteSettings)
        .values({
          key: handoffKey(id),
          value: JSON.stringify({ payload, expiresAt }),
          updatedAt: new Date(),
        })
        .onConflictDoUpdate({
          target: tables.siteSettings.key,
          set: {
            value: JSON.stringify({ payload, expiresAt }),
            updatedAt: new Date(),
          },
        });
    } catch (error) {
      console.error('[cart-handoff] persist failed, using memory only', error);
    }
  }

  return id;
}

export async function consumeCartHandoff(id: string): Promise<CartState | null> {
  const safeId = id.trim();
  if (!/^[a-f0-9]{32}$/i.test(safeId)) return null;

  const fromMemory = memoryHandoffs.get(safeId);
  if (fromMemory) {
    memoryHandoffs.delete(safeId);
    if (fromMemory.expiresAt >= Date.now()) {
      return deserializeCart(fromMemory.payload);
    }
  }

  if (!isDatabaseConfigured()) return null;

  try {
    const db = getDb();
    const key = handoffKey(safeId);
    const [row] = await db
      .select()
      .from(tables.siteSettings)
      .where(eq(tables.siteSettings.key, key))
      .limit(1);
    if (!row) return null;

    await db.delete(tables.siteSettings).where(eq(tables.siteSettings.key, key));

    const parsed = JSON.parse(row.value) as { payload?: string; expiresAt?: number };
    if (!parsed.payload || !parsed.expiresAt || parsed.expiresAt < Date.now()) {
      return null;
    }
    return deserializeCart(parsed.payload);
  } catch (error) {
    console.error('[cart-handoff] consume failed', error);
    return null;
  }
}
