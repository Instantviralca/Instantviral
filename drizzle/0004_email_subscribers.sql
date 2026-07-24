-- Marketing email subscribers (checkout opt-in) + campaign log
CREATE TABLE IF NOT EXISTS email_subscribers (
  id TEXT PRIMARY KEY,
  email TEXT NOT NULL,
  source TEXT NOT NULL DEFAULT 'checkout',
  marketing_opt_in BOOLEAN NOT NULL DEFAULT FALSE,
  opted_in_at TIMESTAMPTZ,
  unsubscribed_at TIMESTAMPTZ,
  unsubscribe_token TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL
);

CREATE UNIQUE INDEX IF NOT EXISTS email_subscribers_email_uidx
  ON email_subscribers (email);

CREATE UNIQUE INDEX IF NOT EXISTS email_subscribers_token_uidx
  ON email_subscribers (unsubscribe_token);

CREATE INDEX IF NOT EXISTS email_subscribers_opt_in_idx
  ON email_subscribers (marketing_opt_in);

CREATE TABLE IF NOT EXISTS email_campaigns (
  id TEXT PRIMARY KEY,
  subject TEXT NOT NULL,
  body_preview TEXT NOT NULL,
  coupon_code TEXT,
  sent_count INTEGER NOT NULL DEFAULT 0,
  failed_count INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL,
  created_by TEXT NOT NULL DEFAULT 'admin'
);
