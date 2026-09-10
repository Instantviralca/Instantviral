import { describe, expect, it } from 'vitest';

import {
  createRecoveryLinkToken,
  parseRecoveryLinkToken,
  generateCheckoutSessionId,
  cartRecoveryLookupHash,
} from '@/lib/abandoned-cart/tokens';
import { isTrackableEmail } from '@/lib/abandoned-cart/capture';
import { buildRecoveryEmailContent } from '@/lib/abandoned-cart/emails';
import {
  getAbandonedCartInactivityMinutes,
  getRecoveryEmailSequence,
} from '@/config/abandoned-cart';
import type { AbandonedCartRecord } from '@/lib/abandoned-cart/types';

describe('abandoned cart tokens', () => {
  it('creates and verifies signed recovery tokens', () => {
    const expiresAt = new Date(Date.now() + 60_000);
    const token = createRecoveryLinkToken('ac_test123', expiresAt);
    const parsed = parseRecoveryLinkToken(token);
    expect(parsed?.cartId).toBe('ac_test123');
    expect(parsed?.expiresAtMs).toBe(expiresAt.getTime());
  });

  it('rejects tampered tokens', () => {
    const token = createRecoveryLinkToken('ac_test123', new Date(Date.now() + 60_000));
    expect(parseRecoveryLinkToken(`${token}x`)).toBeNull();
    expect(parseRecoveryLinkToken('not-a-token')).toBeNull();
  });

  it('rejects expired tokens at parse time only by returning data — restore layer checks time', () => {
    const expiresAt = new Date(Date.now() - 1000);
    const token = createRecoveryLinkToken('ac_old', expiresAt);
    const parsed = parseRecoveryLinkToken(token);
    expect(parsed?.expiresAtMs).toBeLessThan(Date.now());
  });

  it('generates opaque checkout session ids', () => {
    const a = generateCheckoutSessionId();
    const b = generateCheckoutSessionId();
    expect(a).toMatch(/^acs_/);
    expect(a).not.toBe(b);
  });

  it('uses stable lookup hashes', () => {
    expect(cartRecoveryLookupHash('ac_1')).toBe(cartRecoveryLookupHash('ac_1'));
    expect(cartRecoveryLookupHash('ac_1')).not.toBe(cartRecoveryLookupHash('ac_2'));
  });
});

describe('abandoned cart capture validation', () => {
  it('accepts valid emails only', () => {
    expect(isTrackableEmail('user@example.com')).toBe(true);
    expect(isTrackableEmail('bad')).toBe(false);
    expect(isTrackableEmail('')).toBe(false);
  });
});

describe('abandoned cart config', () => {
  it('defaults inactivity to 60 minutes', () => {
    expect(getAbandonedCartInactivityMinutes()).toBe(60);
  });

  it('defaults recovery schedule to 1h / 24h / 72h', () => {
    const seq = getRecoveryEmailSequence();
    expect(seq.map((s) => s.delayMinutes)).toEqual([60, 1440, 4320]);
  });
});

describe('recovery email copy', () => {
  const cart = {
    id: 'ac_demo',
    email: 'a@b.com',
    customerName: 'Alex Example',
    serviceName: 'Instagram Followers',
    packageTitle: '1,000 Followers',
    totalAmount: 1999,
    currency: 'USD',
  } as AbandonedCartRecord;

  it('builds three distinct non-spammy subjects', () => {
    const one = buildRecoveryEmailContent({
      cart,
      sequenceNumber: 1,
      recoveryUrl: 'https://example.com/r',
    });
    const two = buildRecoveryEmailContent({
      cart,
      sequenceNumber: 2,
      recoveryUrl: 'https://example.com/r',
    });
    const three = buildRecoveryEmailContent({
      cart,
      sequenceNumber: 3,
      recoveryUrl: 'https://example.com/r',
    });
    expect(one.subject).toContain('left something behind');
    expect(two.subject.toLowerCase()).toContain('waiting');
    expect(three.subject.toLowerCase()).toContain('final');
    expect(one.html).toContain('Complete Your Order');
    expect(one.html.toLowerCase()).not.toContain('expires in');
    expect(one.html.toLowerCase()).not.toContain('card ending');
  });
});
