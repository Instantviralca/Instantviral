/**
 * Merchant-facing InstantViral order number for CarryCubes / Mollie description.
 * Distinct from the long numeric CarryCubes client order_id used for webhooks.
 *
 * When merchant_order_number is present on a remote payment request, it MUST be
 * included in the HMAC signature payload (CarryCubes verifies the same canonical form).
 */

import { createHash, createHmac } from 'node:crypto';

/** Digits-only positive integer, no leading zeros. */
const MERCHANT_ORDER_NUMBER_RE = /^[1-9]\d{0,11}$/;

/**
 * Validate / normalize a merchant order number for remote payment.
 * Returns the canonical digit string, or null if invalid / absent.
 */
export function normalizeMerchantOrderNumber(
  value: string | number | null | undefined,
): string | null {
  if (value == null) return null;
  const raw = typeof value === 'number' ? String(value) : value.trim();
  if (!MERCHANT_ORDER_NUMBER_RE.test(raw)) return null;
  const n = Number(raw);
  if (!Number.isInteger(n) || n <= 0) return null;
  return raw;
}

/**
 * Mollie hosted description — mirrors CarryCubes server behaviour:
 * `{productName} - Order #{merchantOrderNumber|clientOrderId}`
 * Only call with a merchant number that has already passed signature verification.
 */
export function buildMollieHostedOrderDescription(input: {
  productName: string;
  clientOrderId: string;
  merchantOrderNumber?: string | number | null;
}): string {
  const product = input.productName.trim().slice(0, 64) || 'Cubes';
  const merchant = normalizeMerchantOrderNumber(input.merchantOrderNumber);
  const display = merchant ?? input.clientOrderId;
  return `${product} - Order #${display}`;
}

/** Fields used to build the CarryCubes / InstantViral shared HMAC payload. */
export type MollieRemoteSignatureFields = {
  orderId: string;
  requestTs: string;
  requestNonce: string;
  callbackUrl: string;
  returnUrl: string;
  cancelUrl: string;
  amount: string;
  currency: string;
  productName?: string;
  /** When non-empty, MUST be covered by the signature (never unsigned). */
  merchantOrderNumber?: string | null;
  itemsJson: string;
};

/**
 * Canonical HMAC payload matching CarryCubes `wrp_mollie_request_signature_payload`.
 *
 * Legacy (no merchant): …|product_name|items_hash
 * Extended (merchant present): …|product_name|merchant_order_number|items_hash
 *
 * Throws if merchant_order_number is present but invalid — callers must not sign/send it.
 */
export function buildMollieRemoteSignaturePayload(
  fields: MollieRemoteSignatureFields,
): string {
  const parts = [
    fields.orderId,
    fields.requestTs,
    fields.requestNonce,
    fields.callbackUrl,
    fields.returnUrl,
    fields.cancelUrl,
    fields.amount,
    fields.currency,
  ];

  const productName = fields.productName?.trim() ?? '';
  if (productName !== '') {
    parts.push(productName);
  }

  const merchantRaw =
    fields.merchantOrderNumber == null
      ? ''
      : String(fields.merchantOrderNumber).trim();
  if (merchantRaw !== '') {
    const merchant = normalizeMerchantOrderNumber(merchantRaw);
    if (!merchant) {
      throw new Error('Invalid merchant_order_number.');
    }
    parts.push(merchant);
  }

  parts.push(createHash('sha256').update(fields.itemsJson).digest('hex'));
  return parts.join('|');
}

export function signMollieRemoteRequest(
  fields: MollieRemoteSignatureFields,
  secret: string,
): string {
  return createHmac('sha256', secret)
    .update(buildMollieRemoteSignaturePayload(fields))
    .digest('hex');
}

/**
 * Mirror of CarryCubes `wrp_mollie_verify_client_request` signature rules
 * (timestamp/nonce omitted — signature integrity only).
 */
export function verifyMollieRemoteRequestSignature(input: {
  fields: MollieRemoteSignatureFields;
  signature: string;
  secret: string;
}): { ok: true } | { ok: false; reason: 'invalid_merchant' | 'bad_signature' } {
  const merchantRaw =
    input.fields.merchantOrderNumber == null
      ? ''
      : String(input.fields.merchantOrderNumber).trim();

  if (merchantRaw !== '' && !normalizeMerchantOrderNumber(merchantRaw)) {
    return { ok: false, reason: 'invalid_merchant' };
  }

  let expected: string;
  try {
    expected = signMollieRemoteRequest(input.fields, input.secret);
  } catch {
    return { ok: false, reason: 'invalid_merchant' };
  }

  if (expected !== input.signature) {
    return { ok: false, reason: 'bad_signature' };
  }
  return { ok: true };
}
