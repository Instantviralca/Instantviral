import type {
  NotificationTemplateDefinition,
  NotificationTemplateId,
  NotificationTrigger,
} from '@/types/notification';

/**
 * Data-driven email templates — Document 11.04.
 * Customer-specific values come from NotificationTemplateVariableMap at send time.
 */

export const NOTIFICATION_TEMPLATES: NotificationTemplateDefinition[] = [
  {
    id: 'order_confirmation',
    channel: 'email',
    trigger: 'order_created',
    subject: 'Order confirmation — {{orderId}}',
    bodyHtml: defaultHtml(
      'Order confirmation',
      'We received your order <strong>{{orderId}}</strong> for {{serviceName}}.',
    ),
    bodyText:
      'Order confirmation\n\nHi {{customerName}},\nWe received your order {{orderId}} for {{serviceName}}.\nStatus: {{statusLabel}}\n{{statusMessage}}\nTrack: {{trackingUrl}}\nSupport: {{supportEmail}}',
    active: true,
  },
  {
    id: 'processing_update',
    channel: 'email',
    trigger: 'processing_started',
    subject: 'Your order is processing — {{orderId}}',
    bodyHtml: defaultHtml(
      'Order processing',
      'Your order <strong>{{orderId}}</strong> is now being processed.',
    ),
    bodyText:
      'Order processing\n\nHi {{customerName}},\nYour order {{orderId}} is now being processed.\nTrack: {{trackingUrl}}\nSupport: {{supportEmail}}',
    active: true,
  },
  {
    id: 'order_completed',
    channel: 'email',
    trigger: 'order_completed',
    subject: 'Order completed — {{orderId}}',
    bodyHtml: defaultHtml(
      'Order completed',
      'Your order <strong>{{orderId}}</strong> has been completed successfully.',
    ),
    bodyText:
      'Order completed\n\nHi {{customerName}},\nYour order {{orderId}} has been completed.\nTrack: {{trackingUrl}}\nSupport: {{supportEmail}}',
    active: true,
  },
  {
    id: 'partial_completion',
    channel: 'email',
    trigger: 'order_partial',
    subject: 'Order partially completed — {{orderId}}',
    bodyHtml: defaultHtml(
      'Partial completion',
      'Your order <strong>{{orderId}}</strong> was partially completed. Contact support if you have questions.',
    ),
    bodyText:
      'Partial completion\n\nHi {{customerName}},\nYour order {{orderId}} was partially completed.\nTrack: {{trackingUrl}}\nSupport: {{supportEmail}}',
    active: true,
  },
  {
    id: 'order_cancelled',
    channel: 'email',
    trigger: 'order_cancelled',
    subject: 'Order cancelled — {{orderId}}',
    bodyHtml: defaultHtml(
      'Order cancelled',
      'Your order <strong>{{orderId}}</strong> has been cancelled.',
    ),
    bodyText:
      'Order cancelled\n\nHi {{customerName}},\nYour order {{orderId}} has been cancelled.\nSupport: {{supportEmail}}',
    active: true,
  },
  {
    id: 'refund_confirmation',
    channel: 'email',
    trigger: 'order_refunded',
    subject: 'Refund confirmation — {{orderId}}',
    bodyHtml: defaultHtml(
      'Refund confirmation',
      'A refund for order <strong>{{orderId}}</strong> has been processed.',
    ),
    bodyText:
      'Refund confirmation\n\nHi {{customerName}},\nA refund for order {{orderId}} has been processed.\nSupport: {{supportEmail}}',
    active: true,
  },
];

function defaultHtml(title: string, summary: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8" /><meta name="viewport" content="width=device-width, initial-scale=1" /><title>${title}</title></head>
<body style="font-family: system-ui, sans-serif; line-height: 1.5; color: #111; max-width: 560px; margin: 0 auto; padding: 24px;">
  <header>
    <img src="{{companyLogoUrl}}" alt="{{companyName}}" width="140" height="40" style="height:40px;width:auto;" />
  </header>
  <main>
    <h1 style="font-size: 20px;">${title}</h1>
    <p>Hi {{customerName}},</p>
    <p>${summary}</p>
    <p><strong>Status:</strong> {{statusLabel}}</p>
    <p>{{statusMessage}}</p>
    <p><a href="{{trackingUrl}}">Track your order</a></p>
    <p>Need help? <a href="mailto:{{supportEmail}}">{{supportEmail}}</a></p>
  </main>
  <footer style="margin-top: 32px; font-size: 12px; color: #666;">
    <p>{{footerText}}</p>
    <p>{{companyName}}</p>
  </footer>
</body>
</html>`;
}

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
