/**
 * Standard SMTP adapter — preferred Contabo / self-hosted transport.
 * Configured via SMTP_HOST, SMTP_PORT, SMTP_SECURE, SMTP_USER, SMTP_PASS,
 * EMAIL_FROM, EMAIL_FROM_NAME.
 */

import nodemailer from 'nodemailer';

import {
  getFormattedEmailFrom,
  getSmtpConfig,
  isSmtpConfigured,
} from '@/lib/config/env';
import type { NotificationProvider } from '@/types/notification';

export const smtpEmailProvider: NotificationProvider = {
  id: 'smtp',
  channel: 'email',
  async send({ to, subject, html, text }) {
    if (!isSmtpConfigured()) {
      throw new Error(
        'SMTP is not configured (SMTP_HOST / SMTP_USER / SMTP_PASS / EMAIL_FROM).',
      );
    }
    const smtp = getSmtpConfig();
    const from = getFormattedEmailFrom();
    if (!smtp || !from) {
      throw new Error('SMTP or EMAIL_FROM is not configured.');
    }

    const transporter = nodemailer.createTransport({
      host: smtp.host,
      port: smtp.port,
      secure: smtp.secure,
      auth: {
        user: smtp.user,
        pass: smtp.pass,
      },
    });

    try {
      const info = await transporter.sendMail({
        from,
        to,
        subject,
        html,
        text,
      });

      const messageId =
        (typeof info.messageId === 'string' && info.messageId) ||
        `smtp_${Date.now()}`;
      return { messageId };
    } finally {
      // Close SMTP sockets so short-lived CLI workers can exit cleanly.
      transporter.close();
    }
  },
};

