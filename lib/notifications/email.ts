/**
 * Transactional email templates (orders + contact).
 * Delivery goes through the shared sendEmail() abstraction (SMTP / temporary Resend).
 */

import { getEmailTransportKind, isEmailConfigured } from '@/lib/config/env';
import {
  getEmailTransportProvider,
  sendEmail,
} from '@/lib/notifications/send-email';
import { getPersistence } from '@/lib/persistence';
import type { NotificationProvider } from '@/types/notification';

export type ExtraTemplateId =
  | 'admin_new_order'
  | 'admin_order_paid'
  | 'payment_confirmed'
  | 'contact_admin'
  | 'contact_acknowledgement';

type ExtraSendInput = {
  templateId: ExtraTemplateId;
  to: string;
  orderId?: string;
  idempotencyKey: string;
  variables: Record<string, string | undefined>;
};

function render(template: string, variables: Record<string, string | undefined>): string {
  return template.replace(/\{\{(\w+)\}\}/g, (_, key: string) => variables[key] ?? '');
}

const EXTRA_TEMPLATES: Record<
  ExtraTemplateId,
  { subject: string; bodyHtml: string; bodyText: string }
> = {
  admin_new_order: {
    subject: 'New order — {{orderId}}',
    bodyHtml:
      '<p>New order <strong>{{orderId}}</strong>.</p><p><strong>Customer:</strong> {{customerEmail}}</p><p><strong>Summary:</strong> {{itemsSummary}}</p>{{orderItemsHtml}}<p>Open Admin → Orders to review.</p>',
    bodyText:
      'New order {{orderId}}.\nCustomer: {{customerEmail}}\nSummary: {{itemsSummary}}\n\n{{orderItemsText}}\n\nReview in Admin → Orders.',
  },
  admin_order_paid: {
    subject: 'Order paid — {{orderId}}',
    bodyHtml:
      '<p>Payment confirmed for <strong>{{orderId}}</strong>.</p><p><strong>Customer:</strong> {{customerEmail}}</p><p><strong>Summary:</strong> {{itemsSummary}}</p>{{orderItemsHtml}}<p>Ready for fulfilment — open Admin → Orders.</p>',
    bodyText:
      'Payment confirmed for {{orderId}}.\nCustomer: {{customerEmail}}\nSummary: {{itemsSummary}}\n\n{{orderItemsText}}\n\nReady for fulfilment.',
  },
  payment_confirmed: {
    subject: 'Payment confirmed — {{orderId}}',
    bodyHtml:
      '<p>Hi {{customerName}},</p><p>We confirmed payment for order <strong>{{orderId}}</strong>.</p>{{orderItemsHtml}}<p><a href="{{trackingUrl}}">Track your order</a></p><p>Need help? {{supportEmail}}</p>',
    bodyText:
      'Hi {{customerName}},\n\nWe confirmed payment for order {{orderId}}.\n\n{{orderItemsText}}\n\nTrack: {{trackingUrl}}\nSupport: {{supportEmail}}',
  },
  contact_admin: {
    subject: 'Contact form — {{subject}}',
    bodyHtml:
      '<p>New contact message from <strong>{{fullName}}</strong> ({{email}}).</p><p>Subject: {{subject}}</p><p>Order ID: {{orderId}}</p><pre>{{message}}</pre>',
    bodyText:
      'New contact message from {{fullName}} ({{email}}).\nSubject: {{subject}}\nOrder ID: {{orderId}}\n\n{{message}}',
  },
  contact_acknowledgement: {
    subject: 'We received your message',
    bodyHtml:
      '<p>Hi {{fullName}},</p><p>Thanks for contacting {{companyName}}. We received your message and will reply soon.</p>',
    bodyText:
      'Hi {{fullName}},\n\nThanks for contacting {{companyName}}. We received your message and will reply soon.',
  },
};

/**
 * @deprecated Prefer sendEmail() from '@/lib/notifications/send-email'.
 * Compatibility export for older call sites that expect a NotificationProvider.
 */
export { getEmailTransportProvider };

/** @deprecated Use sendEmail() — temporary alias that resolves the active transport. */
export const resendEmailProvider: NotificationProvider = {
  id: 'email-transport',
  channel: 'email',
  async send(input) {
    return getEmailTransportProvider().send(input);
  },
};

export async function dispatchTransactionalEmail(input: ExtraSendInput): Promise<{
  id: string;
  status: 'sent' | 'failed' | 'skipped';
}> {
  const store = getPersistence();
  try {
    const existing = await store.findByIdempotencyKey(input.idempotencyKey);
    if (existing) {
      return { id: existing.id, status: existing.status === 'sent' ? 'sent' : 'failed' };
    }
  } catch (error) {
    console.error('[email] idempotency lookup failed', {
      key: input.idempotencyKey,
      message: error instanceof Error ? error.message : 'unknown',
    });
  }

  const template = EXTRA_TEMPLATES[input.templateId];
  const subject = render(template.subject, input.variables);
  const html = render(template.bodyHtml, input.variables);
  const text = render(template.bodyText, input.variables);
  const id = `ntf_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
  const createdAt = new Date().toISOString();
  const storedTemplateId = 'order_confirmation' as const;
  const transport = getEmailTransportKind();

  if (!isEmailConfigured()) {
    await store.saveNotification({
      id,
      orderId: input.orderId ?? '',
      channel: 'email',
      templateId: storedTemplateId,
      trigger: 'order_created',
      recipient: input.to,
      status: 'failed',
      subject,
      bodyPreview: text.slice(0, 180),
      errorMessage:
        'Email provider disabled — set SMTP_* + EMAIL_FROM (preferred) or temporary RESEND_API_KEY + EMAIL_FROM.',
      createdAt,
      immutable: true,
      idempotencyKey: input.idempotencyKey,
    });
    return { id, status: 'skipped' };
  }

  try {
    const result = await sendEmail({
      to: input.to,
      subject,
      html,
      text,
    });
    try {
      await store.saveNotification({
        id,
        orderId: input.orderId ?? '',
        channel: 'email',
        templateId: storedTemplateId,
        trigger: 'order_created',
        recipient: input.to,
        status: 'sent',
        subject,
        bodyPreview: text.slice(0, 180),
        providerId: result.providerId || transport,
        providerMessageId: result.messageId,
        createdAt,
        sentAt: new Date().toISOString(),
        immutable: true,
        idempotencyKey: input.idempotencyKey,
      });
    } catch (persistError) {
      console.error('[email] sent but log save failed', {
        templateId: input.templateId,
        message: persistError instanceof Error ? persistError.message : 'unknown',
      });
    }
    return { id, status: 'sent' };
  } catch (error) {
    console.error('[email] send failed', {
      templateId: input.templateId,
      message: error instanceof Error ? error.message : 'unknown',
    });
    try {
      await store.saveNotification({
        id,
        orderId: input.orderId ?? '',
        channel: 'email',
        templateId: storedTemplateId,
        trigger: 'order_created',
        recipient: input.to,
        status: 'failed',
        subject,
        bodyPreview: text.slice(0, 180),
        errorMessage: error instanceof Error ? error.message : 'Delivery failed',
        providerId: transport === 'none' ? undefined : transport,
        createdAt,
        immutable: true,
        idempotencyKey: input.idempotencyKey,
      });
    } catch (persistError) {
      console.error('[email] failed-log save failed', {
        message: persistError instanceof Error ? persistError.message : 'unknown',
      });
    }
    return { id, status: 'failed' };
  }
}
