CREATE TABLE IF NOT EXISTS admin_users (
  id integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  email text NOT NULL UNIQUE,
  password_hash text NOT NULL,
  role text NOT NULL DEFAULT 'admin' CHECK (role IN ('owner','admin','editor','reviewer')),
  is_active boolean NOT NULL DEFAULT true,
  password_reset_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE IF NOT EXISTS admin_sessions (
  token_hash text PRIMARY KEY,
  user_id integer NOT NULL REFERENCES admin_users(id) ON DELETE CASCADE,
  expires_at timestamptz NOT NULL
);
CREATE TABLE IF NOT EXISTS records (
  id integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  kind text NOT NULL CHECK (kind IN ('content_news','content_projects','content_products','order_headers','order_items')),
  data jsonb NOT NULL,
  public_visible boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS records_kind_idx ON records(kind, id);
CREATE UNIQUE INDEX IF NOT EXISTS product_slug_idx ON records((data->>'slug'))
  WHERE kind='content_products' AND NULLIF(data->>'slug','') IS NOT NULL;
CREATE TABLE IF NOT EXISTS contact_submissions (
  id integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  data jsonb NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE IF NOT EXISTS rate_limits (
  key text PRIMARY KEY,
  count integer NOT NULL,
  expires_at timestamptz NOT NULL
);
CREATE TABLE IF NOT EXISTS admin_audit_log (
  id integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  actor_id integer NOT NULL REFERENCES admin_users(id),
  action text NOT NULL,
  resource text NOT NULL,
  resource_id integer,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS content_drafts (
  id integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  idempotency_key text NOT NULL UNIQUE,
  approval_id text NOT NULL UNIQUE,
  kind text NOT NULL CHECK (kind IN ('content_news','content_projects')),
  data jsonb NOT NULL,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending','approved','rejected','promoted')),
  approved_by text,
  approved_at timestamptz,
  promoted_record_id integer,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS content_drafts_status_idx ON content_drafts(status, id);

CREATE TABLE IF NOT EXISTS integration_audit_log (
  id integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  integration text NOT NULL,
  action text NOT NULL,
  resource text NOT NULL,
  resource_id integer,
  approval_id text,
  idempotency_key text,
  metadata jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);
