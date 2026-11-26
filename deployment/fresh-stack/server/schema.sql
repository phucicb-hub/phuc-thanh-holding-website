CREATE TABLE IF NOT EXISTS admin_users (
  id integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  email text NOT NULL UNIQUE,
  password_hash text NOT NULL,
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
