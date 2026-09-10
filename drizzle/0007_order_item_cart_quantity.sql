-- Explicit cart quantity + line totals on order_items (non-destructive).
-- quantity / quantity_label remain package size labels (e.g. 1000 followers).

ALTER TABLE order_items
  ADD COLUMN IF NOT EXISTS cart_quantity integer NOT NULL DEFAULT 1;

ALTER TABLE order_items
  ADD COLUMN IF NOT EXISTS line_total integer;

UPDATE order_items
SET line_total = unit_price * COALESCE(cart_quantity, 1)
WHERE line_total IS NULL;
