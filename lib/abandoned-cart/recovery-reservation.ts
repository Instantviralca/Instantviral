/**
 * Abandoned-cart recovery email reservation semantics.
 *
 * Production uses PostgreSQL INSERT … ON CONFLICT DO NOTHING + an atomic
 * UPDATE whose WHERE encodes reclaim eligibility (no Error.message parsing).
 *
 * The in-memory harness mirrors that algorithm for concurrency/regression tests
 * when a real Postgres unique-index race cannot be exercised in vitest.
 */

export const RECOVERY_PROCESSING_STALE_MS = 10 * 60 * 1000;

export type RecoveryReservationStatus =
  | 'pending'
  | 'processing'
  | 'sent'
  | 'failed'
  | 'skipped';

export type RecoveryReservationRow = {
  id: string;
  cartId: string;
  sequenceNumber: number;
  scheduledAt: Date;
  processingStartedAt: Date | null;
  sentAt: Date | null;
  status: RecoveryReservationStatus;
  providerMessageId: string | null;
  error: string | null;
  triggeredBy: string;
  createdAt: Date;
  updatedAt: Date;
};

export function isProcessingLockStale(
  processingStartedAt: Date | null | undefined,
  now: Date,
  staleMs: number = RECOVERY_PROCESSING_STALE_MS,
): boolean {
  if (!processingStartedAt) return false;
  return now.getTime() - processingStartedAt.getTime() > staleMs;
}

/**
 * Eligibility mirrored by the production atomic UPDATE WHERE:
 * failed | skipped | (processing AND processing_started_at older than stale threshold).
 * Sent / fresh processing / pending are not reclaimable.
 */
export function isRecoveryRowReclaimEligible(
  row: Pick<RecoveryReservationRow, 'status' | 'processingStartedAt'>,
  now: Date,
  staleMs: number = RECOVERY_PROCESSING_STALE_MS,
): boolean {
  if (row.status === 'failed' || row.status === 'skipped') return true;
  if (row.status === 'processing' && isProcessingLockStale(row.processingStartedAt, now, staleMs)) {
    return true;
  }
  return false;
}

function slotKey(cartId: string, sequenceNumber: number): string {
  return `${cartId}::${sequenceNumber}`;
}

/**
 * In-memory reservation store with the same conflict + atomic-reclaim rules as Postgres.
 * Check+write happens synchronously inside each method so concurrent awaits cannot double-claim.
 */
export class InMemoryRecoveryReservationStore {
  private readonly rows = new Map<string, RecoveryReservationRow>();

  get(cartId: string, sequenceNumber: number): RecoveryReservationRow | undefined {
    return this.rows.get(slotKey(cartId, sequenceNumber));
  }

  seed(row: RecoveryReservationRow): void {
    this.rows.set(slotKey(row.cartId, row.sequenceNumber), { ...row });
  }

  /** INSERT … ON CONFLICT DO NOTHING RETURNING — null when the unique slot exists. */
  insertOnConflictDoNothing(row: RecoveryReservationRow): RecoveryReservationRow | null {
    const key = slotKey(row.cartId, row.sequenceNumber);
    if (this.rows.has(key)) return null;
    const stored = { ...row };
    this.rows.set(key, stored);
    return { ...stored };
  }

  /**
   * Atomic reclaim: eligibility evaluated and applied in one critical section.
   * Returns the claimed row only for the worker that wins the update.
   */
  reclaimAtomic(input: {
    cartId: string;
    sequenceNumber: number;
    now: Date;
    triggeredBy: string;
    staleMs?: number;
  }): RecoveryReservationRow | null {
    const key = slotKey(input.cartId, input.sequenceNumber);
    const existing = this.rows.get(key);
    if (!existing) return null;
    if (!isRecoveryRowReclaimEligible(existing, input.now, input.staleMs)) return null;

    const updated: RecoveryReservationRow = {
      ...existing,
      processingStartedAt: input.now,
      updatedAt: input.now,
      status: 'processing',
      error: null,
      sentAt: null,
      providerMessageId: null,
      triggeredBy: input.triggeredBy,
    };
    this.rows.set(key, updated);
    return { ...updated };
  }

  count(): number {
    return this.rows.size;
  }
}

export type ReserveRecoveryEmailResult = {
  reserved: boolean;
  log: RecoveryReservationRow | null;
};

/**
 * Same control flow as production `reserveRecoveryEmail`:
 * 1) insert on conflict do nothing
 * 2) else atomic reclaim
 * 3) else reserved=false with existing row (if any)
 */
export function reserveRecoveryEmailInMemory(
  store: InMemoryRecoveryReservationStore,
  input: {
    id: string;
    cartId: string;
    sequenceNumber: number;
    scheduledAt: Date;
    triggeredBy?: string;
    now?: Date;
  },
): ReserveRecoveryEmailResult {
  const now = input.now ?? new Date();
  const triggeredBy = input.triggeredBy ?? 'scheduler';

  const inserted = store.insertOnConflictDoNothing({
    id: input.id,
    cartId: input.cartId,
    sequenceNumber: input.sequenceNumber,
    scheduledAt: input.scheduledAt,
    processingStartedAt: now,
    sentAt: null,
    status: 'processing',
    providerMessageId: null,
    error: null,
    triggeredBy,
    createdAt: now,
    updatedAt: now,
  });
  if (inserted) return { reserved: true, log: inserted };

  const reclaimed = store.reclaimAtomic({
    cartId: input.cartId,
    sequenceNumber: input.sequenceNumber,
    now,
    triggeredBy,
  });
  if (reclaimed) return { reserved: true, log: reclaimed };

  const existing = store.get(input.cartId, input.sequenceNumber) ?? null;
  return { reserved: false, log: existing ? { ...existing } : null };
}
