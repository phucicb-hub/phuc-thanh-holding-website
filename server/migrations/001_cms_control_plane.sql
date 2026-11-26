-- CMS control-plane foundation. Review and apply only through deployment migration process.
CREATE TABLE IF NOT EXISTS content_items (
  id BIGSERIAL PRIMARY KEY,
  content_type TEXT NOT NULL CHECK (content_type IN ('news','page','project','product')),
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft','pending_review','fact_checked','approved','scheduled','published','unpublished','rejected','archived','trashed')),
  visibility TEXT NOT NULL DEFAULT 'public' CHECK (visibility IN ('public','private','redacted')),
  current_version_id BIGINT,
  created_by INTEGER REFERENCES admin_users(id), updated_by INTEGER REFERENCES admin_users(id),
  published_at TIMESTAMPTZ, deleted_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(), updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE TABLE IF NOT EXISTS content_versions (
  id BIGSERIAL PRIMARY KEY, content_item_id BIGINT NOT NULL REFERENCES content_items(id) ON DELETE CASCADE,
  version_number INTEGER NOT NULL, content JSONB NOT NULL, content_digest TEXT NOT NULL,
  schema_version TEXT NOT NULL DEFAULT '1', created_by INTEGER REFERENCES admin_users(id), created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (content_item_id, version_number), UNIQUE (content_item_id, content_digest)
);
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'content_items_current_version_fk') THEN
    ALTER TABLE content_items ADD CONSTRAINT content_items_current_version_fk FOREIGN KEY (current_version_id) REFERENCES content_versions(id) DEFERRABLE INITIALLY DEFERRED;
  END IF;
END $$;
CREATE TABLE IF NOT EXISTS approval_requests (
  id BIGSERIAL PRIMARY KEY, content_version_id BIGINT NOT NULL REFERENCES content_versions(id),
  target_environment TEXT NOT NULL CHECK (target_environment IN ('development','staging','production')),
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending','approved','rejected','expired','failed')),
  requested_by INTEGER REFERENCES admin_users(id), approved_by INTEGER REFERENCES admin_users(id), approved_digest TEXT,
  decision_reason TEXT, expires_at TIMESTAMPTZ, created_at TIMESTAMPTZ NOT NULL DEFAULT now(), approved_at TIMESTAMPTZ
);
CREATE TABLE IF NOT EXISTS publication_jobs (
  id BIGSERIAL PRIMARY KEY, approval_request_id BIGINT NOT NULL REFERENCES approval_requests(id), provider TEXT NOT NULL,
  idempotency_key TEXT NOT NULL UNIQUE, status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending','publishing','published','failed')),
  provider_reference TEXT, error_code TEXT, created_at TIMESTAMPTZ NOT NULL DEFAULT now(), updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE TABLE IF NOT EXISTS cms_audit_events (
  id BIGSERIAL PRIMARY KEY, correlation_id TEXT NOT NULL, actor_type TEXT NOT NULL CHECK (actor_type IN ('user','automation','system')),
  actor_id TEXT, action TEXT NOT NULL, entity_type TEXT NOT NULL, entity_id TEXT NOT NULL, before_digest TEXT, after_digest TEXT,
  result TEXT NOT NULL CHECK (result IN ('success','rejected','failed')), metadata_redacted JSONB NOT NULL DEFAULT '{}'::jsonb, created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS content_items_status_idx ON content_items(content_type, status, updated_at DESC);
CREATE INDEX IF NOT EXISTS content_versions_item_idx ON content_versions(content_item_id, version_number DESC);
CREATE INDEX IF NOT EXISTS approval_requests_status_idx ON approval_requests(status, created_at DESC);
CREATE INDEX IF NOT EXISTS cms_audit_entity_idx ON cms_audit_events(entity_type, entity_id, created_at DESC);
