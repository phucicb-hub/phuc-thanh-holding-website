import { randomBytes, scrypt, timingSafeEqual, createHash } from 'node:crypto';
import { promisify } from 'node:util';

const derive = promisify(scrypt);
export const digest = (value) => createHash('sha256').update(value).digest('hex');
export async function hashPassword(password) {
  if (typeof password !== 'string' || password.length < 14 || password.length > 128) throw new Error('Password must contain 14–128 characters');
  const salt = randomBytes(16).toString('hex');
  const key = await derive(password, salt, 64, { N: 32768, maxmem: 64 * 1024 * 1024 });
  return `scrypt:${salt}:${key.toString('hex')}`;
}
export async function verifyPassword(password, hash) {
  if (typeof password !== 'string' || password.length > 128) return false;
  const [algorithm, salt, stored] = hash.split(':');
  if (algorithm !== 'scrypt' || !salt || !stored) return false;
  const key = await derive(password, salt, 64, { N: 32768, maxmem: 64 * 1024 * 1024 });
  const expected = Buffer.from(stored, 'hex');
  return expected.length === key.length && timingSafeEqual(key, expected);
}
