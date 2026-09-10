export {
  dispatchNotification,
  getNotificationHistoryByOrderId,
  notificationService,
  notifyOrderEvent,
  renderTemplate,
  setNotificationProvider,
  getNotificationProvider,
  stubEmailProvider,
} from '@/lib/notifications/service';

export {
  sendEmail,
  sendTransactionalEmail,
  getEmailTransportProvider,
} from '@/lib/notifications/send-email';
