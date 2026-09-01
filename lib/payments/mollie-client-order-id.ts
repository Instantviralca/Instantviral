/**
 * Mollie server requires a positive integer order_id (WordPress absint).
 * InstantViral order ids (IV-…) are not valid — use a numeric client reference.
 */

export function createMollieClientOrderId(): string {
  const suffix = Math.floor(Math.random() * 900) + 100;
  return `${Date.now()}${suffix}`;
}

export function isValidMollieClientOrderId(value: string): boolean {
  return /^\d+$/.test(value) && Number(value) > 0;
}
