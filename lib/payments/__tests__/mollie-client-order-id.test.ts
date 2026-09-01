import { describe, expect, it } from 'vitest';

import {
  createMollieClientOrderId,
  isValidMollieClientOrderId,
} from '@/lib/payments/mollie-client-order-id';

describe('Mollie client order id', () => {
  it('generates a positive numeric id for WordPress absint', () => {
    const id = createMollieClientOrderId();
    expect(isValidMollieClientOrderId(id)).toBe(true);
    expect(isValidMollieClientOrderId('IV-ABC-123')).toBe(false);
    expect(isValidMollieClientOrderId('0')).toBe(false);
  });
});
