/**
 * Abandoned cart repository — PostgreSQL via Drizzle.
 * All scheduling / recovery state lives here (Contabo-portable).
 */

import { and, asc, count, desc, eq, inArray, lt, lte, ne, or, sql } from 'drizzle-orm';

import type { AbandonedCartStatus } from '@/config/abandoned-cart';
import { getDb, isDbReady } from '@/lib/db/client';
import { abandonedCartRecoveryEmails, abandonedCarts } from '@/lib/db/schema';
import type {
  AbandonedCartCaptureInput,
  AbandonedCartCheckoutSnapshot,
  AbandonedCartListFilters,
  AbandonedCartListRow,
  AbandonedCartMetrics,
  AbandonedCartRecord,
  RecoveryEmailLogRecord,
} from '@/lib/abandoned-cart/types';
import {
  generateAbandonedCartId,
  generateRecoveryEmailLogId,
  cartRecoveryLookupHash,
  getTokenExpiryDate,
  createRecoveryLinkToken,
} from '@/lib/abandoned-cart/tokens';
import { RECOVERY_PROCESSING_STALE_MS } from '@/lib/abandoned-cart/recovery-reservation';

function requireDb() {
  if (!isDbReady()) {
    throw new Error('DATABASE_URL is required for abandoned cart operations.');
  }
  return getDb();
}

function mapCart(row: typeof abandonedCarts.$inferSelect): AbandonedCartRecord {
  return {
    id: row.id,
    checkoutSessionId: row.checkoutSessionId,
    email: row.email,
    customerName: row.customerName,
    status: row.status as AbandonedCartStatus,
    currency: row.currency,
    subtotalAmount: row.subtotalAmount,
    discountAmount: row.discountAmount,
    totalAmount: row.totalAmount,
    platformId: row.platformId,
    serviceId: row.serviceId,
    serviceSlug: row.serviceSlug,
    serviceName: row.serviceName,
    packageId: row.packageId,
    packageTitle: row.packageTitle,
    quantity: row.quantity,
    quantityLabel: row.quantityLabel,
    publicDestination: row.publicDestination,
    checkoutData: (row.checkoutData ?? {}) as AbandonedCartCheckoutSnapshot,
    recoveryTokenHash: row.recoveryTokenHash,
    tokenExpiresAt: row.tokenExpiresAt,
    recoveryEmailsStopped: row.recoveryEmailsStopped,
    lastRecoverySequence: row.lastRecoverySequence,
    recoveryClickedAt: row.recoveryClickedAt,
    recoveryClickSequence: row.recoveryClickSequence,
    abandonedAt: row.abandonedAt,
    recoveredAt: row.recoveredAt,
    recoveredOrderId: row.recoveredOrderId,
    linkedOrderId: row.linkedOrderId,
    createdAt: row.createdAt,
    updatedAt: row.updatedAt,
    lastActivityAt: row.lastActivityAt,
  };
}

function mapEmailLog(
  row: typeof abandonedCartRecoveryEmails.$inferSelect,
): RecoveryEmailLogRecord {
  return {
    id: row.id,
    cartId: row.cartId,
    sequenceNumber: row.sequenceNumber,
    scheduledAt: row.scheduledAt,
    processingStartedAt: row.processingStartedAt,
    sentAt: row.sentAt,
    status: row.status as RecoveryEmailLogRecord['status'],
    providerMessageId: row.providerMessageId,
    error: row.error,
    triggeredBy: row.triggeredBy,
    createdAt: row.createdAt,
    updatedAt: row.updatedAt,
  };
}

function primaryItem(snapshot: AbandonedCartCheckoutSnapshot) {
  return snapshot.items[0] ?? null;
}

function publicDestinationFromSnapshot(snapshot: AbandonedCartCheckoutSnapshot): string | null {
  const item = primaryItem(snapshot);
  if (!item) return null;
  const config = item.configuration ?? {};
  const candidates = [
    'username',
    'targetUrl',
    'profileUrl',
    'url',
    'videoUrl',
    'channelUrl',
    'target',
  ];
  for (const key of candidates) {
    const value = config[key];
    if (typeof value === 'string' && value.trim()) return value.trim();
  }
  return null;
}

export function isAbandonedCartDbAvailable(): boolean {
  return isDbReady();
}

export async function findCartBySessionId(
  checkoutSessionId: string,
): Promise<AbandonedCartRecord | null> {
  const db = requireDb();
  const rows = await db
    .select()
    .from(abandonedCarts)
    .where(eq(abandonedCarts.checkoutSessionId, checkoutSessionId))
    .limit(1);
  return rows[0] ? mapCart(rows[0]) : null;
}

export async function findCartById(id: string): Promise<AbandonedCartRecord | null> {
  const db = requireDb();
  const rows = await db.select().from(abandonedCarts).where(eq(abandonedCarts.id, id)).limit(1);
  return rows[0] ? mapCart(rows[0]) : null;
}

export async function findCartByTokenHash(
  tokenHash: string,
): Promise<AbandonedCartRecord | null> {
  const db = requireDb();
  const rows = await db
    .select()
    .from(abandonedCarts)
    .where(eq(abandonedCarts.recoveryTokenHash, tokenHash))
    .limit(1);
  return rows[0] ? mapCart(rows[0]) : null;
}

export async function findCartByLinkedOrderId(
  orderId: string,
): Promise<AbandonedCartRecord | null> {
  const db = requireDb();
  const rows = await db
    .select()
    .from(abandonedCarts)
    .where(
      or(eq(abandonedCarts.linkedOrderId, orderId), eq(abandonedCarts.recoveredOrderId, orderId)),
    )
    .limit(1);
  return rows[0] ? mapCart(rows[0]) : null;
}

/**
 * Upsert tracked checkout by session id. Does not create duplicates on field updates.
 */
export async function upsertActiveCheckout(
  input: AbandonedCartCaptureInput,
): Promise<{ cart: AbandonedCartRecord }> {
  const db = requireDb();
  const now = new Date();
  const existing = await findCartBySessionId(input.checkoutSessionId);
  const item = primaryItem(input.snapshot);
  const destination = publicDestinationFromSnapshot(input.snapshot);
  const name =
    input.customerName?.trim() ||
    [input.snapshot.customer.firstName, input.snapshot.customer.lastName]
      .filter(Boolean)
      .join(' ')
      .trim() ||
    null;

  if (existing) {
    // Never reopen recovered/lost carts via normal field updates.
    if (existing.status === 'recovered' || existing.status === 'lost') {
      return { cart: existing };
    }

    const [updated] = await db
      .update(abandonedCarts)
      .set({
        email: input.email.toLowerCase().trim(),
        customerName: name,
        currency: input.currency,
        subtotalAmount: input.subtotalAmount,
        discountAmount: input.discountAmount,
        totalAmount: input.totalAmount,
        platformId: item?.platformId ?? null,
        serviceId: item?.serviceId ?? null,
        serviceSlug: item?.serviceSlug ?? null,
        serviceName: item?.serviceName ?? null,
        packageId: item?.packageId ?? null,
        packageTitle: item?.packageTitle ?? null,
        quantity: item?.quantity ?? null,
        quantityLabel: item?.quantityLabel ?? null,
        publicDestination: destination,
        checkoutData: input.snapshot,
        updatedAt: now,
        lastActivityAt: now,
        // Returning to checkout reactivates an abandoned cart before payment.
        status: existing.status === 'abandoned' ? 'active' : existing.status,
        abandonedAt: existing.status === 'abandoned' ? null : existing.abandonedAt,
      })
      .where(eq(abandonedCarts.id, existing.id))
      .returning();

    return { cart: mapCart(updated!) };
  }

  const id = generateAbandonedCartId();
  const [created] = await db
    .insert(abandonedCarts)
    .values({
      id,
      checkoutSessionId: input.checkoutSessionId,
      email: input.email.toLowerCase().trim(),
      customerName: name,
      status: 'active',
      currency: input.currency,
      subtotalAmount: input.subtotalAmount,
      discountAmount: input.discountAmount,
      totalAmount: input.totalAmount,
      platformId: item?.platformId ?? null,
      serviceId: item?.serviceId ?? null,
      serviceSlug: item?.serviceSlug ?? null,
      serviceName: item?.serviceName ?? null,
      packageId: item?.packageId ?? null,
      packageTitle: item?.packageTitle ?? null,
      quantity: item?.quantity ?? null,
      quantityLabel: item?.quantityLabel ?? null,
      publicDestination: destination,
      checkoutData: input.snapshot,
      recoveryTokenHash: cartRecoveryLookupHash(id),
      tokenExpiresAt: getTokenExpiryDate(now),
      recoveryEmailsStopped: false,
      lastRecoverySequence: 0,
      createdAt: now,
      updatedAt: now,
      lastActivityAt: now,
    })
    .returning();

  return { cart: mapCart(created!) };
}

export async function touchCheckoutActivity(checkoutSessionId: string): Promise<void> {
  if (!isDbReady()) return;
  const db = getDb();
  const now = new Date();
  await db
    .update(abandonedCarts)
    .set({ lastActivityAt: now, updatedAt: now })
    .where(
      and(
        eq(abandonedCarts.checkoutSessionId, checkoutSessionId),
        inArray(abandonedCarts.status, ['active', 'abandoned']),
      ),
    );
}

export async function linkCartToOrder(
  checkoutSessionId: string,
  orderId: string,
): Promise<void> {
  if (!isDbReady()) return;
  const db = getDb();
  const now = new Date();
  await db
    .update(abandonedCarts)
    .set({
      linkedOrderId: orderId,
      lastActivityAt: now,
      updatedAt: now,
      status: 'active',
      abandonedAt: null,
    })
    .where(
      and(
        eq(abandonedCarts.checkoutSessionId, checkoutSessionId),
        ne(abandonedCarts.status, 'recovered'),
        ne(abandonedCarts.status, 'lost'),
      ),
    );
}

export async function markInactiveCartsAbandoned(
  inactivityMinutes: number,
  now: Date = new Date(),
): Promise<number> {
  const db = requireDb();
  const threshold = new Date(now.getTime() - inactivityMinutes * 60 * 1000);
  const result = await db
    .update(abandonedCarts)
    .set({
      status: 'abandoned',
      abandonedAt: now,
      updatedAt: now,
    })
    .where(
      and(
        eq(abandonedCarts.status, 'active'),
        lt(abandonedCarts.lastActivityAt, threshold),
      ),
    )
    .returning({ id: abandonedCarts.id });
  return result.length;
}

/**
 * Atomically reserve a recovery email slot.
 * Unique (cart_id, sequence_number) prevents duplicate sends across workers.
 *
 * Algorithm (no Error.message parsing):
 * 1. INSERT … ON CONFLICT (cart_id, sequence_number) DO NOTHING RETURNING
 * 2. If a row was inserted → reserved
 * 3. Else atomic UPDATE reclaim with eligibility in WHERE:
 *    failed | skipped | (processing AND processing_started_at < now-10m)
 * 4. If UPDATE returned a row → reserved; else not reserved (sent/fresh processing/etc.)
 */
export async function reserveRecoveryEmail(input: {
  cartId: string;
  sequenceNumber: number;
  scheduledAt: Date;
  triggeredBy?: string;
}): Promise<{ reserved: boolean; log: RecoveryEmailLogRecord | null }> {
  const db = requireDb();
  const now = new Date();
  const id = generateRecoveryEmailLogId();
  const triggeredBy = input.triggeredBy ?? 'scheduler';
  const staleBefore = new Date(now.getTime() - RECOVERY_PROCESSING_STALE_MS);

  const inserted = await db
    .insert(abandonedCartRecoveryEmails)
    .values({
      id,
      cartId: input.cartId,
      sequenceNumber: input.sequenceNumber,
      scheduledAt: input.scheduledAt,
      processingStartedAt: now,
      status: 'processing',
      triggeredBy,
      createdAt: now,
      updatedAt: now,
    })
    .onConflictDoNothing({
      target: [
        abandonedCartRecoveryEmails.cartId,
        abandonedCartRecoveryEmails.sequenceNumber,
      ],
    })
    .returning();

  if (inserted[0]) {
    return { reserved: true, log: mapEmailLog(inserted[0]) };
  }

  // Conflict: try to reclaim only if the existing row is eligible — eligibility is
  // enforced in the UPDATE WHERE so two workers cannot both claim a failed/skipped/
  // stale-processing row (fresh processing / sent never match).
  const reclaimed = await db
    .update(abandonedCartRecoveryEmails)
    .set({
      processingStartedAt: now,
      updatedAt: now,
      status: 'processing',
      error: null,
      sentAt: null,
      providerMessageId: null,
      triggeredBy,
    })
    .where(
      and(
        eq(abandonedCartRecoveryEmails.cartId, input.cartId),
        eq(abandonedCartRecoveryEmails.sequenceNumber, input.sequenceNumber),
        or(
          eq(abandonedCartRecoveryEmails.status, 'failed'),
          eq(abandonedCartRecoveryEmails.status, 'skipped'),
          and(
            eq(abandonedCartRecoveryEmails.status, 'processing'),
            lt(abandonedCartRecoveryEmails.processingStartedAt, staleBefore),
          ),
        ),
      ),
    )
    .returning();

  if (reclaimed[0]) {
    return { reserved: true, log: mapEmailLog(reclaimed[0]) };
  }

  const existing = await db
    .select()
    .from(abandonedCartRecoveryEmails)
    .where(
      and(
        eq(abandonedCartRecoveryEmails.cartId, input.cartId),
        eq(abandonedCartRecoveryEmails.sequenceNumber, input.sequenceNumber),
      ),
    )
    .limit(1);

  return {
    reserved: false,
    log: existing[0] ? mapEmailLog(existing[0]) : null,
  };
}

export async function completeRecoveryEmail(input: {
  logId: string;
  cartId: string;
  sequenceNumber: number;
  status: 'sent' | 'failed' | 'skipped';
  providerMessageId?: string | null;
  error?: string | null;
}): Promise<void> {
  const db = requireDb();
  const now = new Date();
  await db
    .update(abandonedCartRecoveryEmails)
    .set({
      status: input.status,
      sentAt: input.status === 'sent' ? now : null,
      providerMessageId: input.providerMessageId ?? null,
      error: input.error ?? null,
      updatedAt: now,
    })
    .where(eq(abandonedCartRecoveryEmails.id, input.logId));

  if (input.status === 'sent') {
    await db
      .update(abandonedCarts)
      .set({
        lastRecoverySequence: input.sequenceNumber,
        updatedAt: now,
      })
      .where(eq(abandonedCarts.id, input.cartId));
  }
}

export async function listAbandonedCartsDueForSequence(input: {
  sequenceNumber: number;
  delayMinutes: number;
  now?: Date;
  limit?: number;
}): Promise<AbandonedCartRecord[]> {
  const db = requireDb();
  const now = input.now ?? new Date();
  const dueBefore = new Date(now.getTime() - input.delayMinutes * 60 * 1000);

  const rows = await db
    .select()
    .from(abandonedCarts)
    .where(
      and(
        eq(abandonedCarts.status, 'abandoned'),
        eq(abandonedCarts.recoveryEmailsStopped, false),
        lte(abandonedCarts.lastRecoverySequence, input.sequenceNumber - 1),
        lte(abandonedCarts.abandonedAt, dueBefore),
      ),
    )
    .orderBy(asc(abandonedCarts.abandonedAt))
    .limit(input.limit ?? 50);

  // Exclude carts that already have a non-failed log for this sequence.
  const filtered: AbandonedCartRecord[] = [];
  for (const row of rows) {
    const logs = await db
      .select()
      .from(abandonedCartRecoveryEmails)
      .where(
        and(
          eq(abandonedCartRecoveryEmails.cartId, row.id),
          eq(abandonedCartRecoveryEmails.sequenceNumber, input.sequenceNumber),
          inArray(abandonedCartRecoveryEmails.status, ['sent', 'processing', 'pending']),
        ),
      )
      .limit(1);
    if (logs.length === 0) filtered.push(mapCart(row));
  }
  return filtered;
}

export async function markCartRecovered(input: {
  cartId?: string;
  checkoutSessionId?: string;
  orderId: string;
  email?: string;
}): Promise<AbandonedCartRecord | null> {
  const db = requireDb();
  const now = new Date();

  let cart: AbandonedCartRecord | null = null;
  if (input.cartId) cart = await findCartById(input.cartId);
  if (!cart && input.checkoutSessionId) {
    cart = await findCartBySessionId(input.checkoutSessionId);
  }
  if (!cart && input.orderId) {
    cart = await findCartByLinkedOrderId(input.orderId);
  }
  if (!cart && input.email) {
    const rows = await db
      .select()
      .from(abandonedCarts)
      .where(
        and(
          eq(abandonedCarts.email, input.email.toLowerCase().trim()),
          inArray(abandonedCarts.status, ['active', 'abandoned']),
        ),
      )
      .orderBy(desc(abandonedCarts.lastActivityAt))
      .limit(1);
    cart = rows[0] ? mapCart(rows[0]) : null;
  }

  if (!cart) return null;
  if (cart.status === 'recovered' && cart.recoveredOrderId === input.orderId) {
    return cart;
  }

  const [updated] = await db
    .update(abandonedCarts)
    .set({
      status: 'recovered',
      recoveredAt: cart.recoveredAt ?? now,
      recoveredOrderId: input.orderId,
      recoveryEmailsStopped: true,
      updatedAt: now,
    })
    .where(eq(abandonedCarts.id, cart.id))
    .returning();

  return updated ? mapCart(updated) : null;
}

export async function markRecoveryClicked(input: {
  cartId: string;
  sequenceHint?: number | null;
}): Promise<AbandonedCartRecord | null> {
  const db = requireDb();
  const now = new Date();
  const cart = await findCartById(input.cartId);
  if (!cart) return null;

  const [updated] = await db
    .update(abandonedCarts)
    .set({
      recoveryClickedAt: cart.recoveryClickedAt ?? now,
      recoveryClickSequence:
        input.sequenceHint ??
        cart.recoveryClickSequence ??
        (cart.lastRecoverySequence > 0 ? cart.lastRecoverySequence : null),
      lastActivityAt: now,
      updatedAt: now,
      status: cart.status === 'abandoned' ? 'active' : cart.status,
      abandonedAt: cart.status === 'abandoned' ? null : cart.abandonedAt,
    })
    .where(eq(abandonedCarts.id, input.cartId))
    .returning();

  return updated ? mapCart(updated) : null;
}

export async function extendRecoveryTokenExpiry(cartId: string): Promise<AbandonedCartRecord | null> {
  const db = requireDb();
  const now = new Date();
  const [updated] = await db
    .update(abandonedCarts)
    .set({
      tokenExpiresAt: getTokenExpiryDate(now),
      updatedAt: now,
    })
    .where(eq(abandonedCarts.id, cartId))
    .returning();
  return updated ? mapCart(updated) : null;
}

export function buildCartRecoveryToken(cart: AbandonedCartRecord): string {
  return createRecoveryLinkToken(cart.id, cart.tokenExpiresAt);
}

export async function stopRecoveryEmails(cartId: string): Promise<AbandonedCartRecord | null> {
  const db = requireDb();
  const now = new Date();
  const [updated] = await db
    .update(abandonedCarts)
    .set({
      recoveryEmailsStopped: true,
      updatedAt: now,
    })
    .where(eq(abandonedCarts.id, cartId))
    .returning();
  return updated ? mapCart(updated) : null;
}

export async function markCartLost(cartId: string): Promise<AbandonedCartRecord | null> {
  const db = requireDb();
  const now = new Date();
  const [updated] = await db
    .update(abandonedCarts)
    .set({
      status: 'lost',
      recoveryEmailsStopped: true,
      updatedAt: now,
    })
    .where(eq(abandonedCarts.id, cartId))
    .returning();
  return updated ? mapCart(updated) : null;
}

export async function listRecoveryEmailsForCart(
  cartId: string,
): Promise<RecoveryEmailLogRecord[]> {
  const db = requireDb();
  const rows = await db
    .select()
    .from(abandonedCartRecoveryEmails)
    .where(eq(abandonedCartRecoveryEmails.cartId, cartId))
    .orderBy(asc(abandonedCartRecoveryEmails.sequenceNumber));
  return rows.map(mapEmailLog);
}

export async function getAbandonedCartMetrics(): Promise<AbandonedCartMetrics> {
  const db = requireDb();

  async function countStatus(status: AbandonedCartStatus): Promise<number> {
    const rows = await db
      .select({ value: count() })
      .from(abandonedCarts)
      .where(eq(abandonedCarts.status, status));
    return Number(rows[0]?.value ?? 0);
  }

  const [activeCheckouts, abandoned, recovered, lost] = await Promise.all([
    countStatus('active'),
    countStatus('abandoned'),
    countStatus('recovered'),
    countStatus('lost'),
  ]);

  const abandonedValueRows = await db
    .select({
      total: sql<number>`coalesce(sum(${abandonedCarts.totalAmount}), 0)`,
    })
    .from(abandonedCarts)
    .where(eq(abandonedCarts.status, 'abandoned'));

  const recoveredValueRows = await db
    .select({
      total: sql<number>`coalesce(sum(${abandonedCarts.totalAmount}), 0)`,
    })
    .from(abandonedCarts)
    .where(eq(abandonedCarts.status, 'recovered'));

  const eligibleAbandoned = abandoned + recovered + lost;
  const recoveryRate =
    eligibleAbandoned === 0 ? 0 : Math.round((recovered / eligibleAbandoned) * 1000) / 10;

  return {
    activeCheckouts,
    abandonedCarts: abandoned,
    recoveredCarts: recovered,
    lostCarts: lost,
    abandonedCartValue: Number(abandonedValueRows[0]?.total ?? 0),
    recoveredRevenue: Number(recoveredValueRows[0]?.total ?? 0),
    recoveryRate,
    currency: 'USD',
  };
}

export async function listAbandonedCartRows(
  filters: AbandonedCartListFilters = {},
): Promise<{ rows: AbandonedCartListRow[]; total: number; page: number; pageSize: number }> {
  const db = requireDb();
  const page = Math.max(1, filters.page ?? 1);
  const pageSize = Math.min(100, Math.max(1, filters.pageSize ?? 20));
  const offset = (page - 1) * pageSize;

  const conditions = [];
  if (filters.status && filters.status !== 'all') {
    conditions.push(eq(abandonedCarts.status, filters.status));
  }
  if (filters.query?.trim()) {
    const q = `%${filters.query.trim().toLowerCase()}%`;
    conditions.push(
      or(
        sql`lower(${abandonedCarts.email}) like ${q}`,
        sql`lower(coalesce(${abandonedCarts.customerName}, '')) like ${q}`,
        sql`lower(coalesce(${abandonedCarts.serviceName}, '')) like ${q}`,
        sql`lower(${abandonedCarts.id}) like ${q}`,
      )!,
    );
  }

  const where = conditions.length > 0 ? and(...conditions) : undefined;

  const totalRows = await db
    .select({ value: count() })
    .from(abandonedCarts)
    .where(where);
  const total = Number(totalRows[0]?.value ?? 0);

  const rows = await db
    .select()
    .from(abandonedCarts)
    .where(where)
    .orderBy(desc(abandonedCarts.updatedAt))
    .limit(pageSize)
    .offset(offset);

  return {
    page,
    pageSize,
    total,
    rows: rows.map((row) => ({
      id: row.id,
      email: row.email,
      customerName: row.customerName,
      serviceName: row.serviceName,
      packageTitle: row.packageTitle,
      totalAmount: row.totalAmount,
      currency: row.currency,
      status: row.status as AbandonedCartStatus,
      createdAt: row.createdAt.toISOString(),
      abandonedAt: row.abandonedAt?.toISOString() ?? null,
      lastRecoverySequence: row.lastRecoverySequence,
      recoveredOrderId: row.recoveredOrderId,
      lastActivityAt: row.lastActivityAt.toISOString(),
    })),
  };
}

export async function deleteExpiredAbandonedCarts(retentionDays: number): Promise<number> {
  const db = requireDb();
  const cutoff = new Date(Date.now() - retentionDays * 24 * 60 * 60 * 1000);
  // Never delete recovered carts that still point at orders within retention window of recovery.
  const result = await db
    .delete(abandonedCarts)
    .where(
      and(
        lt(abandonedCarts.updatedAt, cutoff),
        inArray(abandonedCarts.status, ['abandoned', 'lost', 'active']),
      ),
    )
    .returning({ id: abandonedCarts.id });
  return result.length;
}
