import type {
  NotificationTemplateDefinition,
  NotificationTemplateId,
  NotificationTrigger,
} from '@/types/notification';

/**
 * Data-driven email templates — Document 11.04.
 * Order bodies/subjects are built by lib/notifications/order-email.ts
 * and injected as emailSubject / emailHtml / emailText.
 */

const brandedBody = {
  bodyHtml: '{{emailHtml}}',
  bodyText: '{{emailText}}',
} as const;

export const NOTIFICATION_TEMPLATES: NotificationTemplateDefinition[] = [
  {
    id: 'order_confirmation',
    channel: 'email',
    trigger: 'order_created',
    subject: '{{emailSubject}}',
    ...brandedBody,
    active: true,
  },
  {
    id: 'processing_update',
    channel: 'email',
    trigger: 'processing_started',
    subject: '{{emailSubject}}',
    ...brandedBody,
    active: true,
  },
  {
    id: 'order_completed',
    channel: 'email',
    trigger: 'order_completed',
    subject: '{{emailSubject}}',
    ...brandedBody,
    active: true,
  },
  {
    id: 'partial_completion',
    channel: 'email',
    trigger: 'order_partial',
    subject: '{{emailSubject}}',
    ...brandedBody,
    active: true,
  },
  {
    id: 'order_cancelled',
    channel: 'email',
    trigger: 'order_cancelled',
    subject: '{{emailSubject}}',
    ...brandedBody,
    active: true,
  },
  {
    id: 'refund_confirmation',
    channel: 'email',
    trigger: 'order_refunded',
    subject: '{{emailSubject}}',
    ...brandedBody,
    active: true,
  },
];

export function getTemplateById(
  id: NotificationTemplateId,
): NotificationTemplateDefinition | undefined {
  return NOTIFICATION_TEMPLATES.find((t) => t.id === id && t.active);
}

export function getTemplateForTrigger(
  trigger: NotificationTrigger,
): NotificationTemplateDefinition | undefined {
  return NOTIFICATION_TEMPLATES.find((t) => t.trigger === trigger && t.active);
}
