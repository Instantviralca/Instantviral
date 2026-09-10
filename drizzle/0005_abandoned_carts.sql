-- Abandoned cart recovery (PostgreSQL source of truth for scheduling)
-- Safe additive migration — does not modify orders, prices, or customer order data.

CREATE TABLE IF NOT EXISTS abandoned_carts (
  id TEXT PRIMARY KEY,
  checkout_session_id TEXT NOT NULL,
  email TEXT NOT NULL,
  customer_name TEXT,
  status TEXT NOT NULL DEFAULT 'active',
  currency TEXT NOT NULL DEFAULT 'USD',
  subtotal_amount INTEGER NOT NULL DEFAULT 0,
  discount_amount INTEGER NOT NULL DEFAULT 0,
  total_amount INTEGER NOT NULL DEFAULT 0,
  platform_id TEXT,
  service_id TEXT,
  service_slug TEXT,
  service_name TEXT,
  package_id TEXT,
  package_title TEXT,
  quantity INTEGER,
  quantity_label TEXT,
  public_destination TEXT,
  checkout_data JSONB NOT NULL DEFAULT '{}'::jsonb,
  recovery_token_hash TEXT NOT NULL,
  token_expires_at TIMESTAMPTZ NOT NULL,
  recovery_emails_stopped BOOLEAN NOT NULL DEFAULT FALSE,
  last_recovery_sequence INTEGER NOT NULL DEFAULT 0,
  recovery_clicked_at TIMESTAMPTZ,
  recovery_click_sequence INTEGER,
  abandoned_at TIMESTAMPTZ,
  recovered_at TIMESTAMPTZ,
  recovered_order_id TEXT REFERENCES orders(id) ON DELETE SET NULL,
  linked_order_id TEXT REFERENCES orders(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL,
  last_activity_at TIMESTAMPTZ NOT NULL
);

CREATE UNIQUE INDEX IF NOT EXISTS abandoned_carts_session_uidx
  ON abandoned_carts (checkout_session_id);

CREATE UNIQUE INDEX IF NOT EXISTS abandoned_carts_token_hash_uidx
  ON abandoned_carts (recovery_token_hash);

CREATE INDEX IF NOT EXISTS abandoned_carts_status_idx
  ON abandoned_carts (status);

CREATE INDEX IF NOT EXISTS abandoned_carts_email_idx
  ON abandoned_carts (email);

CREATE INDEX IF NOT EXISTS abandoned_carts_last_activity_idx
  ON abandoned_carts (last_activity_at);

CREATE INDEX IF NOT EXISTS abandoned_carts_abandoned_at_idx
  ON abandoned_carts (abandoned_at);

CREATE INDEX IF NOT EXISTS abandoned_carts_recovered_order_idx
  ON abandoned_carts (recovered_order_id);

CREATE INDEX IF NOT EXISTS abandoned_carts_linked_order_idx
  ON abandoned_carts (linked_order_id);

CREATE TABLE IF NOT EXISTS abandoned_cart_recovery_emails (
  id TEXT PRIMARY KEY,
  cart_id TEXT NOT NULL REFERENCES abandoned_carts(id) ON DELETE CASCADE,
  sequence_number INTEGER NOT NULL,
  scheduled_at TIMESTAMPTZ NOT NULL,
  processing_started_at TIMESTAMPTZ,
  sent_at TIMESTAMPTZ,
  status TEXT NOT NULL DEFAULT 'pending',
  provider_message_id TEXT,
  error TEXT,
  triggered_by TEXT NOT NULL DEFAULT 'scheduler',
  created_at TIMESTAMPTZ NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL
);

CREATE UNIQUE INDEX IF NOT EXISTS abandoned_cart_recovery_emails_cart_seq_uidx
  ON abandoned_cart_recovery_emails (cart_id, sequence_number);

CREATE INDEX IF NOT EXISTS abandoned_cart_recovery_emails_status_sched_idx
  ON abandoned_cart_recovery_emails (status, scheduled_at);
