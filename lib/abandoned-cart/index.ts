/**
 * Abandoned cart recovery — public exports.
 */

export { captureCheckoutActivity, isTrackableEmail } from '@/lib/abandoned-cart/capture';
export { processDueAbandonedCartEmails } from '@/lib/abandoned-cart/process-recovery';
export { resolveRecoveryToken } from '@/lib/abandoned-cart/restore';
export { markAbandonedCartRecoveredFromOrder } from '@/lib/abandoned-cart/mark-recovered';
