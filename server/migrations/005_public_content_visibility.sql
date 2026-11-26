ALTER TABLE records
  ADD COLUMN IF NOT EXISTS public_visible boolean NOT NULL DEFAULT true;

CREATE INDEX IF NOT EXISTS records_public_kind_idx
  ON records(kind, public_visible, id DESC);
