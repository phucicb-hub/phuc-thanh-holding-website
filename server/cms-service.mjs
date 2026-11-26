import { createHash, randomUUID } from 'node:crypto';
import { assertTransition, validatePublishableContent } from './cms-policy.mjs';

const digest = (value) => createHash('sha256').update(JSON.stringify(value)).digest('hex');

export async function createContentDraft(db, { contentType, content, actorId }) {
  if (!['news', 'page', 'project', 'product'].includes(contentType)) throw Object.assign(new Error('Invalid content type'), { status: 400 });
  const item = await db.query('INSERT INTO content_items(content_type,status,created_by,updated_by) VALUES($1,$2,$3,$3) RETURNING id', [contentType, 'draft', actorId]);
  const version = await db.query('INSERT INTO content_versions(content_item_id,version_number,content,content_digest,created_by) VALUES($1,1,$2::jsonb,$3,$4) RETURNING id,version_number,content_digest', [item.rows[0].id, JSON.stringify(content), digest(content), actorId]);
  await db.query('UPDATE content_items SET current_version_id=$1 WHERE id=$2', [version.rows[0].id, item.rows[0].id]);
  await db.query('INSERT INTO cms_audit_events(correlation_id,actor_type,actor_id,action,entity_type,entity_id,after_digest,result) VALUES($1,$2,$3,$4,$5,$6,$7,$8)', [randomUUID(), 'user', String(actorId), 'content.create', 'content_item', String(item.rows[0].id), version.rows[0].content_digest, 'success']);
  return { id: item.rows[0].id, versionId: version.rows[0].id, status: 'draft' };
}

export async function transitionContent(db, { id, from, to, actorId, content }) {
  assertTransition(from, to);
  if (to === 'published' && !validatePublishableContent(content)) throw Object.assign(new Error('Content is not publishable'), { status: 422 });
  const result = await db.query('UPDATE content_items SET status=$1,updated_by=$2,published_at=CASE WHEN $1=\'published\' THEN now() ELSE published_at END,updated_at=now() WHERE id=$3 AND status=$4 RETURNING id,status', [to, actorId, id, from]);
  if (!result.rows[0]) throw Object.assign(new Error('Content changed or not found'), { status: 409 });
  await db.query('INSERT INTO cms_audit_events(correlation_id,actor_type,actor_id,action,entity_type,entity_id,result) VALUES($1,$2,$3,$4,$5,$6,$7)', [randomUUID(), 'user', String(actorId), `content.${to}`, 'content_item', String(id), 'success']);
  return result.rows[0];
}

export async function createContentVersion(db, { itemId, content, actorId }) {
  const current = await db.query('SELECT COALESCE(MAX(version_number),0)::int AS version FROM content_versions WHERE content_item_id=$1', [itemId]);
  const versionNumber = current.rows[0].version + 1;
  const version = await db.query('INSERT INTO content_versions(content_item_id,version_number,content,content_digest,created_by) VALUES($1,$2,$3::jsonb,$4,$5) RETURNING id,version_number,content_digest', [itemId, versionNumber, JSON.stringify(content), digest(content), actorId]);
  await db.query('UPDATE content_items SET current_version_id=$1,updated_by=$2,updated_at=now() WHERE id=$3', [version.rows[0].id, actorId, itemId]);
  return version.rows[0];
}

export async function rollbackContentVersion(db, { itemId, versionId, actorId }) {
  const version = await db.query('SELECT id,content_digest FROM content_versions WHERE id=$1 AND content_item_id=$2', [versionId, itemId]);
  if (!version.rows[0]) throw Object.assign(new Error('Version not found'), { status: 404 });
  await db.query('UPDATE content_items SET current_version_id=$1,updated_by=$2,updated_at=now() WHERE id=$3', [versionId, actorId, itemId]);
  return version.rows[0];
}

export async function requestApproval(db, { itemId, versionId, targetEnvironment, actorId }) {
  if (!['development', 'staging', 'production'].includes(targetEnvironment)) throw Object.assign(new Error('Invalid target environment'), { status: 400 });
  const result = await db.query('INSERT INTO approval_requests(content_version_id,target_environment,requested_by) VALUES($1,$2,$3) RETURNING id,status,target_environment', [versionId, targetEnvironment, actorId]);
  return result.rows[0];
}

export async function decideApproval(db, { approvalId, decision, actorId, reason = '' }) {
  if (!['approved', 'rejected'].includes(decision)) throw Object.assign(new Error('Invalid approval decision'), { status: 400 });
  const approval = await db.query('SELECT ar.id, ar.content_version_id, cv.content_item_id FROM approval_requests ar JOIN content_versions cv ON cv.id=ar.content_version_id WHERE ar.id=$1 AND ar.status=$2', [approvalId, 'pending']);
  if (!approval.rows[0]) throw Object.assign(new Error('Approval request not found or already decided'), { status: 409 });
  const result = await db.query('UPDATE approval_requests SET status=$1,approved_by=$2,decision_reason=$3,approved_at=now() WHERE id=$4 AND status=$5 RETURNING id,status,approved_by', [decision, actorId, String(reason).slice(0, 500), approvalId, 'pending']);
  if (!result.rows[0]) throw Object.assign(new Error('Approval request not found or already decided'), { status: 409 });
  const nextStatus = decision === 'approved' ? 'approved' : 'rejected';
  await db.query('UPDATE content_items SET status=$1,updated_by=$2,updated_at=now() WHERE id=$3 AND status=$4', [nextStatus, actorId, approval.rows[0].content_item_id, 'pending_review']);
  await db.query('INSERT INTO cms_audit_events(correlation_id,actor_type,actor_id,action,entity_type,entity_id,result) VALUES($1,$2,$3,$4,$5,$6,$7)', [randomUUID(), 'user', String(actorId), `approval.${decision}`, 'content_item', String(approval.rows[0].content_item_id), 'success']);
  return result.rows[0];
}

export async function createPublicationJob(db, { approvalId, provider, idempotencyKey }) {
  if (!idempotencyKey || !/^[A-Za-z0-9._:-]{8,160}$/.test(idempotencyKey)) throw Object.assign(new Error('Invalid idempotency key'), { status: 400 });
  if (provider !== 'website-dry-run') throw Object.assign(new Error('Only website-dry-run provider is enabled'), { status: 400 });
  const approval = await db.query('SELECT id,status FROM approval_requests WHERE id=$1', [approvalId]);
  if (!approval.rows[0]) throw Object.assign(new Error('Approval request not found'), { status: 404 });
  if (approval.rows[0].status !== 'approved') throw Object.assign(new Error('Approval is not approved'), { status: 409 });
  const existing = await db.query('SELECT id,status,provider FROM publication_jobs WHERE idempotency_key=$1', [idempotencyKey]);
  if (existing.rows[0]) return { ...existing.rows[0], alreadyExists: true };
  const result = await db.query('INSERT INTO publication_jobs(approval_request_id,provider,idempotency_key) VALUES($1,$2,$3) RETURNING id,status,provider,idempotency_key', [approvalId, String(provider).slice(0, 80), idempotencyKey]);
  return { ...result.rows[0], alreadyExists: false };
}
