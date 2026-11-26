import { createPool, migrate } from './db.mjs';
import { hashPassword } from './auth.mjs';
// Owner credentials are supplied only to a short-lived administrative container.
if(process.env.ADMIN_PROVISION==='true') {
  const raw=process.env.POSTGRES_PASSWORD;
  if(!raw)throw new Error('Owner credential required');
  process.env.PGHOST='database';process.env.PGDATABASE='phucthanhholding';process.env.PGUSER='website';
  process.env.PGPASSWORD=raw.startsWith("'")&&raw.endsWith("'")?raw.slice(1,-1):raw;
}
const db = createPool();
try {
  let input = '';
  for await (const chunk of process.stdin) {
    input += chunk;
    if (input.length > 2048) throw new Error('Input too large');
  }
  const { email, password } = JSON.parse(input);
  if (typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) throw new Error('Invalid email');
  await migrate(db);
  await db.query('INSERT INTO admin_users(email,password_hash) VALUES($1,$2)', [email.trim().toLowerCase(), await hashPassword(password)]);
  console.log('ADMIN_CREATED');
} catch (error) {
  console.error(error.code === '23505' ? 'Admin already exists; existing password was not changed' : 'Unable to create admin. Check database and password length (14–128 characters).');
  process.exitCode = 1;
} finally { await db.end(); }
