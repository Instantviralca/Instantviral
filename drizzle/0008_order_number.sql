-- Customer-facing InstantViral order numbers (#1000+).
-- Internal orders.id and Mollie/CarryCubes payment ids are unchanged.
--
-- Safe for live Postgres with 0..N existing orders while old app code may still insert.
-- Sequence is concurrency-safe (nextval). No application-level max-plus-one or random IDs.
-- Continues past 9999 (NO MAXVALUE).
--
-- Intentionally does not reset/rewind the sequence after backfill: every assignment
-- (DEFAULT insert + backfill) uses nextval() on this same sequence, so the counter
-- advances monotonically and cannot collide under concurrent inserts.

CREATE SEQUENCE IF NOT EXISTS orders_order_number_seq
  AS integer
  START WITH 1000
  INCREMENT BY 1
  MINVALUE 1000
  NO MAXVALUE
  CACHE 1;

ALTER TABLE orders
  ADD COLUMN IF NOT EXISTS order_number integer;

-- DEFAULT before backfill / NOT NULL so concurrent inserts from old production code
-- (column omitted from INSERT) still receive a sequence value safely.
ALTER TABLE orders
  ALTER COLUMN order_number SET DEFAULT nextval('orders_order_number_seq');

-- Backfill existing rows: oldest first for best-effort historical numbering.
-- Concurrent inserts may interleave nextval values; uniqueness is guaranteed by the sequence.
DO $$
DECLARE
  r RECORD;
BEGIN
  FOR r IN
    SELECT id
    FROM orders
    WHERE order_number IS NULL
    ORDER BY created_at ASC, id ASC
  LOOP
    UPDATE orders
    SET order_number = nextval('orders_order_number_seq')
    WHERE id = r.id
      AND order_number IS NULL;
  END LOOP;
END $$;

ALTER TABLE orders
  ALTER COLUMN order_number SET NOT NULL;

ALTER SEQUENCE orders_order_number_seq OWNED BY orders.order_number;

CREATE UNIQUE INDEX IF NOT EXISTS orders_order_number_uidx ON orders (order_number);
