ALTER TABLE admin_users
  ADD COLUMN IF NOT EXISTS role text NOT NULL DEFAULT 'admin',
  ADD COLUMN IF NOT EXISTS is_active boolean NOT NULL DEFAULT true,
  ADD COLUMN IF NOT EXISTS password_reset_at timestamptz;

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'admin_users_role_check') THEN
    ALTER TABLE admin_users ADD CONSTRAINT admin_users_role_check CHECK (role IN ('owner','admin','editor','reviewer'));
  END IF;
END $$;

CREATE INDEX IF NOT EXISTS admin_users_active_idx ON admin_users(is_active, role);
