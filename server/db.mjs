import pg from 'pg';
import { readFile } from 'node:fs/promises';
export function createPool() {
  return new pg.Pool({ host: process.env.PGHOST, database: process.env.PGDATABASE, user: process.env.PGUSER, password: process.env.PGPASSWORD, max: 10, connectionTimeoutMillis: 5000, statement_timeout: 10000 });
}
export async function migrate(db) {
  await db.query(await readFile(new URL('./schema.sql', import.meta.url), 'utf8'));
}
