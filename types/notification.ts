/**
 * Notification System — Document 11.04
 * Email-first, provider-independent. No live sends in this milestone.
 */

export type NotificationChannel = 'email' | 'sms' | 'whatsapp' | 'push' | 'dashboard';

export type NotificationDeliveryStatus = 'pending' | 'sent' | 'failed';

export type NotificationTrigger =
  | 'order_created'
  | 'payment_confirmed'
  | 'processing_started'
  | 'order_completed'
  | 'order_partial'
  | 'order_cancelled'
  | 'order_refunded';

export type NotificationTemplateId =
  | 'order_confirmation'
  | 'processing_update'
  | 'order_completed'
  | 'partial_completion'
  | 'order_cancelled'
  | 'refund_confirmation';

export type NotificationTemplateVariableMap = {
  companyName: string;
  companyLogoUrl?: string;
  customerName?: string;
  customerEmail: string;
  /** Customer-facing order ref, e.g. "#1000" (legacy may be IV-*). */
  orderId: string;
  /** Full subject line when using branded order emails. */
  emailSubject?: string;
  /** Full HTML document / body for branded order emails. */
  emailHtml?: string;
  /** Full plain-text body for branded order emails. */
  emailText?: string;
  serviceName: string;
  packageName?: string;
  quantity?: string;
  cartQuantity?: string;
  itemCount?: string;
  itemsSummary?: string;
  orderItemsHtml?: string;
  orderItemsText?: string;
  orderTotal?: string;
  statusLabel: string;
  statusMessage: string;
  trackingUrl: string;
  supportEmail: string;
  supportUrl?: string;
  footerText?: string;
};

export type NotificationTemplateDefinition = {
  id: NotificationTemplateId;
  channel: NotificationChannel;
  trigger: NotificationTrigger;
  subject: string;
  /** Semantic HTML body with {{variable}} placeholders. */
  bodyHtml: string;
  /** Plain-text fallback. */
  bodyText: string;
  active: boolean;
};

export type NotificationSendRequest = {
  trigger: NotificationTrigger;
  channel?: NotificationChannel;
  recipient: string;
  orderId: string;
  variables: NotificationTemplateVariableMap;
  /** Idempotency key to prevent duplicate sends. */
  idempotencyKey?: string;
};

export type NotificationRecord = {
  id: string;
  orderId: string;
  channel: NotificationChannel;
  templateId: NotificationTemplateId;
  trigger: NotificationTrigger;
  recipient: string;
  status: NotificationDeliveryStatus;
  subject: string;
  /** Rendered body snapshot (optional; may be omitted for privacy). */
  bodyPreview?: string;
  errorMessage?: string;
  providerId?: string;
  providerMessageId?: string;
  createdAt: string;
  sentAt?: string;
  /** History is immutable — never delete. */
  immutable: true;
};

/**
 * Provider-independent delivery contract.
 * Concrete adapters (SMTP, temporary Resend, etc.) implement this.
 */
export type NotificationProvider = {
  id: string;
  channel: NotificationChannel;
  send: (input: {
    to: string;
    subject: string;
    html: string;
    text: string;
  }) => Promise<{ messageId: string }>;
};

export type NotificationService = {
  dispatch: (request: NotificationSendRequest) => Promise<NotificationRecord>;
  getHistoryByOrderId: (orderId: string) => Promise<NotificationRecord[]>;
};
