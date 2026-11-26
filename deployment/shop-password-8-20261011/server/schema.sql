CREATE TABLE IF NOT EXISTS shop_users(id BIGSERIAL PRIMARY KEY,email TEXT UNIQUE NOT NULL,name TEXT NOT NULL,password_hash TEXT NOT NULL,created_at TIMESTAMPTZ NOT NULL DEFAULT now());
CREATE TABLE IF NOT EXISTS shop_sessions(token_hash TEXT PRIMARY KEY,user_id BIGINT NOT NULL REFERENCES shop_users(id) ON DELETE CASCADE,expires_at TIMESTAMPTZ NOT NULL);
CREATE TABLE IF NOT EXISTS shop_history(id BIGSERIAL PRIMARY KEY,user_id BIGINT NOT NULL REFERENCES shop_users(id) ON DELETE CASCADE,tool TEXT NOT NULL,input TEXT NOT NULL,result TEXT NOT NULL,created_at TIMESTAMPTZ NOT NULL DEFAULT now());
CREATE TABLE IF NOT EXISTS shop_interests(id BIGSERIAL PRIMARY KEY,email TEXT NOT NULL,name TEXT NOT NULL,kind TEXT NOT NULL,message TEXT NOT NULL,created_at TIMESTAMPTZ NOT NULL DEFAULT now());
CREATE TABLE IF NOT EXISTS shop_rates(key TEXT PRIMARY KEY,count INTEGER NOT NULL,expires_at TIMESTAMPTZ NOT NULL);
CREATE TABLE IF NOT EXISTS shop_measurements(user_id BIGINT NOT NULL REFERENCES shop_users(id) ON DELETE CASCADE,video_id TEXT NOT NULL,views BIGINT NOT NULL,measured_at TIMESTAMPTZ NOT NULL DEFAULT now(),PRIMARY KEY(user_id,video_id,measured_at));
ALTER TABLE shop_users ALTER COLUMN password_hash DROP NOT NULL;
ALTER TABLE shop_users ADD COLUMN IF NOT EXISTS google_sub TEXT;
CREATE UNIQUE INDEX IF NOT EXISTS shop_users_google_sub ON shop_users(google_sub) WHERE google_sub IS NOT NULL;
CREATE TABLE IF NOT EXISTS shop_oauth_states(state_hash TEXT PRIMARY KEY,nonce TEXT NOT NULL,verifier TEXT NOT NULL,expires_at TIMESTAMPTZ NOT NULL);
CREATE TABLE IF NOT EXISTS shop_user_channels(user_id BIGINT PRIMARY KEY REFERENCES shop_users(id) ON DELETE CASCADE,channel TEXT NOT NULL);
CREATE TABLE IF NOT EXISTS shop_favorites(user_id BIGINT NOT NULL REFERENCES shop_users(id) ON DELETE CASCADE,tool TEXT NOT NULL,PRIMARY KEY(user_id,tool));
ALTER TABLE shop_users ADD COLUMN IF NOT EXISTS email_verified_at TIMESTAMPTZ;
UPDATE shop_users SET email_verified_at=created_at WHERE google_sub IS NOT NULL AND email_verified_at IS NULL;
CREATE TABLE IF NOT EXISTS shop_email_verifications(
 token_hash TEXT PRIMARY KEY,email TEXT NOT NULL,name TEXT NOT NULL,password_hash TEXT,
 user_id BIGINT REFERENCES shop_users(id) ON DELETE CASCADE,expires_at TIMESTAMPTZ NOT NULL
);
CREATE INDEX IF NOT EXISTS shop_email_verifications_expiry ON shop_email_verifications(expires_at);
CREATE INDEX IF NOT EXISTS shop_history_created ON shop_history(created_at);
CREATE INDEX IF NOT EXISTS shop_measurements_measured ON shop_measurements(measured_at);
CREATE INDEX IF NOT EXISTS shop_interests_created ON shop_interests(created_at);

ALTER TABLE shop_users ADD COLUMN IF NOT EXISTS marketing_consent BOOLEAN NOT NULL DEFAULT false;
ALTER TABLE shop_users ADD COLUMN IF NOT EXISTS marketing_updated_at TIMESTAMPTZ;
ALTER TABLE shop_users ADD COLUMN IF NOT EXISTS marketing_consent_text TEXT;
ALTER TABLE shop_users ADD COLUMN IF NOT EXISTS marketing_source TEXT;
ALTER TABLE shop_users ADD COLUMN IF NOT EXISTS registration_notify_pending BOOLEAN NOT NULL DEFAULT false;
ALTER TABLE shop_users ADD COLUMN IF NOT EXISTS registration_notified_at TIMESTAMPTZ;
ALTER TABLE shop_email_verifications ADD COLUMN IF NOT EXISTS marketing_consent BOOLEAN NOT NULL DEFAULT false;
ALTER TABLE shop_oauth_states ADD COLUMN IF NOT EXISTS marketing_consent BOOLEAN NOT NULL DEFAULT false;
