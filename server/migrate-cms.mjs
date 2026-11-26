import { readFile, readdir } from 'node:fs/promises';
import { createPool, migrate } from './db.mjs';

if (process.env.NODE_ENV === 'production' && process.env.CMS_MIGRATION_APPROVED !== 'true') {
  throw new Error('Refusing CMS migration in production without CMS_MIGRATION_APPROVED=true');
}

const db = createPool();
try {
  if (process.env.CMS_BOOTSTRAP_SCHEMA === 'true') await migrate(db);
  await db.query(`CREATE TABLE IF NOT EXISTS cms_schema_migrations (
    migration_name text PRIMARY KEY,
    applied_at timestamptz NOT NULL DEFAULT now()
  )`);
  await db.query('SELECT pg_advisory_lock(73412026)');
  const migrationDir = new URL('./migrations/', import.meta.url);
  const files = (await readdir(migrationDir)).filter((file) => file.endsWith('.sql')).sort();
  for (const file of files) {
    const existing = await db.query('SELECT 1 FROM cms_schema_migrations WHERE migration_name=$1', [file]);
    if (existing.rowCount) continue;
    await db.query('BEGIN');
    try {
      await db.query(await readFile(new URL(file, migrationDir), 'utf8'));
      await db.query('INSERT INTO cms_schema_migrations(migration_name) VALUES ($1)', [file]);
      await db.query('COMMIT');
      console.log(`Applied CMS migration ${file}`);
    } catch (error) {
      await db.query('ROLLBACK');
      throw error;
    }
  }
  console.log('CMS migrations are up to date');
} finally {
  try { await db.query('SELECT pg_advisory_unlock(73412026)'); } catch {}
  await db.end();
}
