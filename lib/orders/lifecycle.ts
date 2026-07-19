/**
 * @deprecated Prefer `@/lib/orders/status` — Document 11.03 is the SSOT.
 */
export {
  ORDER_STATUSES,
  MANUAL_ORDER_STATUS_FLOW as ORDER_STATUS_FLOW,
  TERMINAL_ORDER_STATUSES,
  ORDER_STATUS_TRANSITIONS,
  canTransition,
  getOrderStatusMetadata,
} from '@/lib/orders/status';

export {
  createTimelineEvent,
  createStatusChangeEvent,
} from '@/lib/orders/timeline';
