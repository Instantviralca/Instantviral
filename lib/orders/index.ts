export {
  ORDER_STATUSES,
  MANUAL_ORDER_STATUS_FLOW,
  TERMINAL_ORDER_STATUSES,
  ORDER_STATUS_TRANSITIONS,
  ORDER_STATUS_METADATA,
  INVALID_ORDER_STATUS_TRANSITIONS,
  getOrderStatusMetadata,
  getCustomerStatusMessage,
  getAdminStatusLabel,
  getAllowedTransitions,
  canTransition,
  isTerminalStatus,
  getAllowedAdminActions,
  statusForAdminAction,
} from '@/lib/orders/status';

export {
  createTimelineEvent,
  createStatusChangeEvent,
  toPublicTimelineEvent,
  SYSTEM_ACTOR,
  type CreateStatusChangeEventInput,
  type CreateTimelineEventInput,
} from '@/lib/orders/timeline';

export {
  manualOrderWorkflow,
  MANUAL_WORKFLOW_INTEGRATIONS,
  type ManualOrderWorkflow,
  type ManualWorkflowStage,
  type ManualWorkflowIntegrations,
  type CreateOrderFromCheckoutInput,
  type ManualStatusUpdateInput,
} from '@/lib/orders/manual-workflow';

export {
  orderNotificationHooks,
  notificationEventForStatus,
  buildNotificationPayload,
  dispatchOrderNotification,
  type OrderNotificationEvent,
  type OrderNotificationPayload,
  type OrderNotificationHooks,
} from '@/lib/orders/notifications';

export {
  orderManager,
  buildTransitionEvent,
  type OrderManager,
} from '@/lib/orders/manager';

/** @deprecated Alias — use MANUAL_ORDER_STATUS_FLOW */
export { MANUAL_ORDER_STATUS_FLOW as ORDER_STATUS_FLOW } from '@/lib/orders/status';

/** @deprecated Provider automation is not used in v1 manual workflow. */
export function mapProviderStatusToOrderStatus(raw: string) {
  const value = raw.toLowerCase();
  if (['completed', 'done', 'success'].includes(value)) return 'completed' as const;
  if (['partial', 'partially_completed'].includes(value)) return 'partial' as const;
  if (['cancelled', 'canceled'].includes(value)) return 'cancelled' as const;
  if (['refunded'].includes(value)) return 'refunded' as const;
  if (['processing', 'in_progress'].includes(value)) return 'processing' as const;
  return 'pending' as const;
}
