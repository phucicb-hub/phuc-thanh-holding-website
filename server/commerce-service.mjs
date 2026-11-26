import { randomUUID } from 'node:crypto';
import { assertCommerceTransition, assertDryRunProvider } from './commerce-policy.mjs';

const key = (value) => typeof value === 'string' ? value.trim().slice(0, 160) : '';

export async function createDryRunOrder(db, { externalReference, totalMinor, currency = 'VND', items = [] }) {
  if (!/^[A-Za-z0-9._:-]{8,160}$/.test(key(externalReference))) throw Object.assign(new Error('Invalid external reference'), { status: 400 });
  if (!Number.isSafeInteger(totalMinor) || totalMinor < 0) throw Object.assign(new Error('Invalid total'), { status: 400 });
  if (!Array.isArray(items) || items.length > 100) throw Object.assign(new Error('Invalid items'), { status: 400 });
  const result = await db.query('INSERT INTO commerce_orders(external_reference,total_minor,currency,items,status) VALUES($1,$2,$3,$4::jsonb,$5) ON CONFLICT(external_reference) DO UPDATE SET external_reference=EXCLUDED.external_reference RETURNING id,external_reference,status,total_minor,currency,items', [key(externalReference), totalMinor, key(currency) || 'VND', JSON.stringify(items), 'pending_payment']);
  return result.rows[0];
}

export async function createDryRunPayment(db, { orderId, eventType, idempotencyKey, payload = {} }) {
  assertDryRunProvider('dry-run');
  const order = await db.query('SELECT id,status FROM commerce_orders WHERE id=$1', [orderId]);
  if (!order.rows[0]) throw Object.assign(new Error('Order not found'), { status: 404 });
  const existing = await db.query('SELECT id,order_id,event_type,idempotency_key FROM commerce_payment_events WHERE idempotency_key=$1', [key(idempotencyKey)]);
  if (existing.rows[0]) return { ...existing.rows[0], alreadyExists: true };
  const next = eventType === 'captured' ? 'paid' : eventType === 'failed' ? 'cancelled' : null;
  if (!next) throw Object.assign(new Error('Only captured or failed dry-run events are supported'), { status: 400 });
  assertCommerceTransition('order', order.rows[0].status, next);
  const event = await db.query('INSERT INTO commerce_payment_events(order_id,provider,event_type,idempotency_key,payload_redacted) VALUES($1,$2,$3,$4,$5::jsonb) RETURNING id,order_id,event_type,idempotency_key', [orderId, 'dry-run', key(eventType), key(idempotencyKey), JSON.stringify({ synthetic: true, event_type: eventType, reference: payload.reference ?? null })]);
  await db.query('UPDATE commerce_orders SET status=$1,updated_at=now() WHERE id=$2', [next, orderId]);
  return { ...event.rows[0], order_status: next, alreadyExists: false };
}

export async function createDryRunRefund(db, { orderId, amountMinor, idempotencyKey, reason = '' }) {
  const order = await db.query('SELECT id,status,total_minor FROM commerce_orders WHERE id=$1', [orderId]);
  if (!order.rows[0]) throw Object.assign(new Error('Order not found'), { status: 404 });
  const existing = await db.query('SELECT id,order_id,amount_minor,idempotency_key FROM commerce_refund_events WHERE idempotency_key=$1', [key(idempotencyKey)]);
  if (existing.rows[0]) return { ...existing.rows[0], alreadyExists: true };
  if (!Number.isSafeInteger(amountMinor) || amountMinor <= 0 || amountMinor > Number(order.rows[0].total_minor)) throw Object.assign(new Error('Invalid refund amount'), { status: 400 });
  assertCommerceTransition('order', order.rows[0].status, 'refunded');
  const refund = await db.query('INSERT INTO commerce_refund_events(order_id,provider,amount_minor,idempotency_key,reason) VALUES($1,$2,$3,$4,$5) RETURNING id,order_id,amount_minor,idempotency_key', [orderId, 'dry-run', amountMinor, key(idempotencyKey), String(reason).slice(0, 500)]);
  await db.query('UPDATE commerce_orders SET status=$1,updated_at=now() WHERE id=$2', ['refunded', orderId]);
  return { ...refund.rows[0], order_status: 'refunded', alreadyExists: false };
}
