/**
 * Contact form validation (Document 13.02).
 */

export type ContactFormValues = {
  fullName: string;
  email: string;
  subject: string;
  orderId: string;
  message: string;
};

export type ContactFormErrors = Partial<Record<keyof ContactFormValues, string>>;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateContactForm(values: ContactFormValues): ContactFormErrors {
  const errors: ContactFormErrors = {};
  const fullName = values.fullName.trim();
  const email = values.email.trim();
  const subject = values.subject.trim();
  const message = values.message.trim();

  if (!fullName) {
    errors.fullName = 'Full name is required.';
  }

  if (!email) {
    errors.email = 'Email address is required.';
  } else if (!EMAIL_PATTERN.test(email)) {
    errors.email = 'Enter a valid email address.';
  }

  if (!subject) {
    errors.subject = 'Subject is required.';
  }

  if (!message) {
    errors.message = 'Message is required.';
  } else if (message.length < 20) {
    errors.message = 'Message must be at least 20 characters.';
  }

  return errors;
}

export function hasContactFormErrors(errors: ContactFormErrors): boolean {
  return Object.keys(errors).length > 0;
}
