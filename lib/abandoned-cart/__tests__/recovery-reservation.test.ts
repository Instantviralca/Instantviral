/**
 * Regression tests for abandoned-cart recovery email reservation.
 *
 * Production uses Postgres ON CONFLICT + atomic UPDATE WHERE.
 * These tests exercise the mirrored in-memory algorithm and contract-check
 * the repository source so Error.message unique/duplicate parsing cannot return.
 */

import { readFileSync } from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';

import {
  InMemoryRecoveryReservationStore,
  RECOVERY_PROCESSING_STALE_MS,
  isRecoveryRowReclaimEligible,
  reserveRecoveryEmailInMemory,
  type RecoveryReservationRow,
} from '@/lib/abandoned-cart/recovery-reservation';

const ROOT = process.cwd();
const repositorySrc = readFileSync(
  path.join(ROOT, 'lib', 'abandoned-cart', 'repository.ts'),
  'utf8',
);

function baseRow(
  overrides: Partial<RecoveryReservationRow> &
    Pick<RecoveryReservationRow, 'id' | 'cartId' | 'sequenceNumber' | 'status'>,
): RecoveryReservationRow {
  const now = overrides.updatedAt ?? new Date('2026-03-11T12:00:00.000Z');
  return {
    scheduledAt: now,
    processingStartedAt: null,
    sentAt: null,
    providerMessageId: null,
    error: null,
    triggeredBy: 'scheduler',
    createdAt: now,
    updatedAt: now,
    ...overrides,
  };
}

describe('reserveRecoveryEmail production contract', () => {
  it('uses ON CONFLICT DO NOTHING and does not parse unique/duplicate Error.message', () => {
    expect(repositorySrc).toContain('onConflictDoNothing');
    expect(repositorySrc).toContain('abandonedCartRecoveryEmails.cartId');
    expect(repositorySrc).toContain('abandonedCartRecoveryEmails.sequenceNumber');
    expect(repositorySrc).not.toMatch(/\/unique\|duplicate\/i/);
    expect(repositorySrc).not.toMatch(/error\.message[\s\S]{0,80}unique/i);
  });

  it('encodes reclaim eligibility in the UPDATE WHERE (failed|skipped|stale processing)', () => {
    expect(repositorySrc).toContain("eq(abandonedCartRecoveryEmails.status, 'failed')");
    expect(repositorySrc).toContain("eq(abandonedCartRecoveryEmails.status, 'skipped')");
    expect(repositorySrc).toContain("eq(abandonedCartRecoveryEmails.status, 'processing')");
    expect(repositorySrc).toContain('lt(abandonedCartRecoveryEmails.processingStartedAt, staleBefore)');
    expect(repositorySrc).toContain('RECOVERY_PROCESSING_STALE_MS');
    // Must not reclaim purely because status is processing without a stale timestamp check.
    expect(repositorySrc).not.toMatch(
      /inArray\(\s*abandonedCartRecoveryEmails\.status,\s*\[\s*'failed',\s*'skipped',\s*'processing'\s*\]/,
    );
  });
});

describe('isRecoveryRowReclaimEligible', () => {
  const now = new Date('2026-03-11T12:00:00.000Z');

  it('allows failed and skipped', () => {
    expect(
      isRecoveryRowReclaimEligible({ status: 'failed', processingStartedAt: null }, now),
    ).toBe(true);
    expect(
      isRecoveryRowReclaimEligible({ status: 'skipped', processingStartedAt: null }, now),
    ).toBe(true);
  });

  it('allows only stale processing locks (>10 minutes)', () => {
    const fresh = new Date(now.getTime() - RECOVERY_PROCESSING_STALE_MS + 1_000);
    const exact = new Date(now.getTime() - RECOVERY_PROCESSING_STALE_MS);
    const stale = new Date(now.getTime() - RECOVERY_PROCESSING_STALE_MS - 1);
    expect(
      isRecoveryRowReclaimEligible({ status: 'processing', processingStartedAt: fresh }, now),
    ).toBe(false);
    expect(
      isRecoveryRowReclaimEligible({ status: 'processing', processingStartedAt: exact }, now),
    ).toBe(false);
    expect(
      isRecoveryRowReclaimEligible({ status: 'processing', processingStartedAt: stale }, now),
    ).toBe(true);
  });

  it('never allows sent or pending', () => {
    expect(
      isRecoveryRowReclaimEligible({ status: 'sent', processingStartedAt: null }, now),
    ).toBe(false);
    expect(
      isRecoveryRowReclaimEligible({ status: 'pending', processingStartedAt: null }, now),
    ).toBe(false);
  });
});

describe('reserveRecoveryEmailInMemory (Postgres semantics mirror)', () => {
  const cartId = 'ac_mtw30c1j_7cc89cd9b11b';
  const sequenceNumber = 1;
  const scheduledAt = new Date('2026-03-11T11:00:00.000Z');
  const now = new Date('2026-03-11T12:00:00.000Z');

  it('1) first reservation with no existing row → reserved true', () => {
    const store = new InMemoryRecoveryReservationStore();
    const result = reserveRecoveryEmailInMemory(store, {
      id: 'are_1',
      cartId,
      sequenceNumber,
      scheduledAt,
      now,
    });
    expect(result.reserved).toBe(true);
    expect(result.log?.id).toBe('are_1');
    expect(result.log?.status).toBe('processing');
    expect(store.count()).toBe(1);
  });

  it('2) duplicate with existing sent row → reserved false', () => {
    const store = new InMemoryRecoveryReservationStore();
    store.seed(
      baseRow({
        id: 'are_sent',
        cartId,
        sequenceNumber,
        status: 'sent',
        sentAt: now,
        processingStartedAt: now,
      }),
    );
    const result = reserveRecoveryEmailInMemory(store, {
      id: 'are_new',
      cartId,
      sequenceNumber,
      scheduledAt,
      now,
    });
    expect(result.reserved).toBe(false);
    expect(result.log?.id).toBe('are_sent');
    expect(result.log?.status).toBe('sent');
    expect(store.count()).toBe(1);
  });

  it('3) existing failed row → atomically reclaimed, same DB row reused', () => {
    const store = new InMemoryRecoveryReservationStore();
    store.seed(
      baseRow({
        id: 'are_failed',
        cartId,
        sequenceNumber,
        status: 'failed',
        error: 'SMTP 535 auth',
        processingStartedAt: new Date('2026-03-11T10:00:00.000Z'),
      }),
    );
    const result = reserveRecoveryEmailInMemory(store, {
      id: 'are_should_not_insert',
      cartId,
      sequenceNumber,
      scheduledAt,
      now,
      triggeredBy: 'scheduler-retry',
    });
    expect(result.reserved).toBe(true);
    expect(result.log?.id).toBe('are_failed');
    expect(result.log?.status).toBe('processing');
    expect(result.log?.error).toBeNull();
    expect(result.log?.triggeredBy).toBe('scheduler-retry');
    expect(store.count()).toBe(1);
    expect(store.get(cartId, sequenceNumber)?.id).toBe('are_failed');
  });

  it('4) existing skipped row → reclaimed (existing intentional behavior)', () => {
    const store = new InMemoryRecoveryReservationStore();
    store.seed(
      baseRow({
        id: 'are_skipped',
        cartId,
        sequenceNumber,
        status: 'skipped',
        error: 'provider skipped',
      }),
    );
    const result = reserveRecoveryEmailInMemory(store, {
      id: 'are_new',
      cartId,
      sequenceNumber,
      scheduledAt,
      now,
    });
    expect(result.reserved).toBe(true);
    expect(result.log?.id).toBe('are_skipped');
    expect(result.log?.status).toBe('processing');
  });

  it('5) existing stale processing row >10 min → reclaimed', () => {
    const store = new InMemoryRecoveryReservationStore();
    const started = new Date(now.getTime() - RECOVERY_PROCESSING_STALE_MS - 5_000);
    store.seed(
      baseRow({
        id: 'are_stale',
        cartId,
        sequenceNumber,
        status: 'processing',
        processingStartedAt: started,
      }),
    );
    const result = reserveRecoveryEmailInMemory(store, {
      id: 'are_new',
      cartId,
      sequenceNumber,
      scheduledAt,
      now,
    });
    expect(result.reserved).toBe(true);
    expect(result.log?.id).toBe('are_stale');
    expect(result.log?.processingStartedAt?.getTime()).toBe(now.getTime());
  });

  it('6) existing fresh processing row → NOT reclaimed', () => {
    const store = new InMemoryRecoveryReservationStore();
    const started = new Date(now.getTime() - 60_000);
    store.seed(
      baseRow({
        id: 'are_fresh',
        cartId,
        sequenceNumber,
        status: 'processing',
        processingStartedAt: started,
      }),
    );
    const result = reserveRecoveryEmailInMemory(store, {
      id: 'are_new',
      cartId,
      sequenceNumber,
      scheduledAt,
      now,
    });
    expect(result.reserved).toBe(false);
    expect(result.log?.id).toBe('are_fresh');
    expect(result.log?.processingStartedAt?.getTime()).toBe(started.getTime());
  });

  it('7) concurrent failed-row reclaim → exactly one reserved=true', async () => {
    const store = new InMemoryRecoveryReservationStore();
    store.seed(
      baseRow({
        id: 'are_failed',
        cartId,
        sequenceNumber,
        status: 'failed',
        error: 'SMTP 535',
      }),
    );

    const [a, b] = await Promise.all([
      Promise.resolve(
        reserveRecoveryEmailInMemory(store, {
          id: 'worker_a',
          cartId,
          sequenceNumber,
          scheduledAt,
          now,
          triggeredBy: 'worker-a',
        }),
      ),
      Promise.resolve(
        reserveRecoveryEmailInMemory(store, {
          id: 'worker_b',
          cartId,
          sequenceNumber,
          scheduledAt,
          now,
          triggeredBy: 'worker-b',
        }),
      ),
    ]);

    const reserved = [a, b].filter((r) => r.reserved);
    const denied = [a, b].filter((r) => !r.reserved);
    expect(reserved).toHaveLength(1);
    expect(denied).toHaveLength(1);
    expect(reserved[0]?.log?.id).toBe('are_failed');
    expect(store.count()).toBe(1);
  });

  it('7b) sequential atomic reclaim after first claim cannot double-send', () => {
    const store = new InMemoryRecoveryReservationStore();
    store.seed(
      baseRow({
        id: 'are_failed',
        cartId,
        sequenceNumber,
        status: 'failed',
      }),
    );
    const first = store.reclaimAtomic({
      cartId,
      sequenceNumber,
      now,
      triggeredBy: 'a',
    });
    const second = store.reclaimAtomic({
      cartId,
      sequenceNumber,
      now: new Date(now.getTime() + 1_000),
      triggeredBy: 'b',
    });
    expect(first).not.toBeNull();
    expect(second).toBeNull();
  });

  it('8) concurrent first reservation → only one row and one reserved worker', async () => {
    const store = new InMemoryRecoveryReservationStore();
    const [a, b] = await Promise.all([
      Promise.resolve(
        reserveRecoveryEmailInMemory(store, {
          id: 'worker_a',
          cartId,
          sequenceNumber,
          scheduledAt,
          now,
        }),
      ),
      Promise.resolve(
        reserveRecoveryEmailInMemory(store, {
          id: 'worker_b',
          cartId,
          sequenceNumber,
          scheduledAt,
          now,
        }),
      ),
    ]);

    const reserved = [a, b].filter((r) => r.reserved);
    const denied = [a, b].filter((r) => !r.reserved);
    expect(reserved).toHaveLength(1);
    expect(denied).toHaveLength(1);
    expect(store.count()).toBe(1);
    expect(reserved[0]?.log?.id === 'worker_a' || reserved[0]?.log?.id === 'worker_b').toBe(
      true,
    );
  });

  it('9) does not depend on matching unique/duplicate in Error.message', () => {
    // In-memory path never throws; production path uses ON CONFLICT (contract above).
    const store = new InMemoryRecoveryReservationStore();
    store.seed(
      baseRow({
        id: 'are_failed',
        cartId,
        sequenceNumber,
        status: 'failed',
        error: 'Failed query: insert into "abandoned_cart_recovery_emails"',
      }),
    );
    const result = reserveRecoveryEmailInMemory(store, {
      id: 'are_new',
      cartId,
      sequenceNumber,
      scheduledAt,
      now,
    });
    expect(result.reserved).toBe(true);
    expect(result.log?.id).toBe('are_failed');
  });
});
