import { createServer } from 'node:http';
import { randomBytes } from 'node:crypto';
import { digest, hashPassword, verifyPassword } from './auth.mjs';
import { can, assertRole } from './user-policy.mjs';
import { createContentDraft, transitionContent, rollbackContentVersion, requestApproval, decideApproval, createPublicationJob } from './cms-service.mjs';
import { createDryRunOrder, createDryRunPayment, createDryRunRefund } from './commerce-service.mjs';
import { dispatchLeadNotifications } from './notify.mjs';

const PUBLIC = ['content_news', 'content_projects', 'content_products'];
const FIELDS = {
  content_news: ['title','category','excerpt','date','image','content','tags','title_en','category_en','excerpt_en','content_en','tags_en'],
  content_projects: ['title','category','description','image','status','year','content','title_en','category_en','description_en','status_en','content_en'],
  content_products: ['category_id','slug','title','description','image','featured','date','features','title_en','description_en','features_en'],
  order_headers: ['status'],
};
const ARRAYS = new Set(['content','tags','features','content_en','tags_en','features_en']);
const defaults = { content_news: { category:'',excerpt:'',date:'',image:'',content:[],tags:[] }, content_products: { category_id:'',description:'',image:'',featured:false,date:'',features:[],slug:null }, content_projects: { category:'',description:'',image:'',status:'',year:'',content:[] } };
const text = (value, max) => typeof value === 'string' ? value.trim().slice(0, max) : '';
const failure = (status, message) => Object.assign(new Error(message), { status });
const rowData = (row) => ({ ...row.data, id: row.id, created_at: row.created_at, updated_at: row.updated_at });
function clean(kind, input, create) {
  if (!input || typeof input !== 'object' || Array.isArray(input)) throw failure(400,'Invalid data');
  const fields = FIELDS[kind];
  if (!fields) throw failure(400,'Invalid resource');
  const result = {};
  for (const [key,value] of Object.entries(input)) {
    if (!fields.includes(key)) throw failure(400,'Invalid field');
    if (value === null && (key.endsWith('_en') || key === 'slug')) { result[key] = null; continue; }
    if (ARRAYS.has(key)) {
      if (!Array.isArray(value) || value.length > 100 || value.some(x => typeof x !== 'string' || x.length > 10000)) throw failure(400,'Invalid array');
    } else if (key === 'featured') {
      if (typeof value !== 'boolean') throw failure(400,'Invalid boolean');
    } else if (typeof value !== 'string' || value.length > 10000) throw failure(400,'Invalid text');
    result[key] = value;
  }
  if (!Object.keys(result).length) throw failure(400,'Empty data');
  if (create && !text(result.title,10000)) throw failure(400,'Title is required');
  if ('title' in result && !text(result.title,10000)) throw failure(400,'Title is required');
  if (result.slug && !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(result.slug)) throw failure(400,'Invalid slug');
  if (kind === 'order_headers' && !['new','confirmed','processing','completed','cancelled'].includes(result.status)) throw failure(400,'Invalid status');
  return create ? { ...defaults[kind], ...result } : result;
}

export async function createApp(db, options = {}) {
  const origins = new Set(options.origins ?? ['https://phucthanhholding.com']);
  const secure = options.secureCookie !== false;
  const dummyHash = await hashPassword(randomBytes(24).toString('hex'));
  const cookie = (value, age) => `pth_session=${value}; Path=/api; HttpOnly; SameSite=Strict; Max-Age=${age}${secure ? '; Secure' : ''}`;
  async function session(req) {
    const token = /(?:^|;\s*)pth_session=([a-f0-9]{64})(?:;|$)/.exec(req.headers.cookie ?? '')?.[1];
    if (!token) return null;
    const result = await db.query('SELECT u.id,u.email,u.role,u.is_active FROM admin_sessions s JOIN admin_users u ON u.id=s.user_id WHERE s.token_hash=$1 AND s.expires_at>now() AND u.is_active=true', [digest(token)]);
    return result.rows[0] ?? null;
  }
  async function rate(key, maximum, seconds) {
    const result = await db.query(`INSERT INTO rate_limits(key,count,expires_at) VALUES($1,1,now()+($2::int * interval '1 second')) ON CONFLICT(key) DO UPDATE SET count=CASE WHEN rate_limits.expires_at<=now() THEN 1 ELSE rate_limits.count+1 END,expires_at=CASE WHEN rate_limits.expires_at<=now() THEN EXCLUDED.expires_at ELSE rate_limits.expires_at END RETURNING count`, [digest(key), seconds]);
    if (result.rows[0].count > maximum) throw failure(429,'Too many requests. Try again later.');
  }
  return createServer(async (req,res) => {
    const send = (status, body, headers = {}) => { res.writeHead(status, { 'Content-Type':'application/json; charset=utf-8','Cache-Control':'no-store','X-Content-Type-Options':'nosniff', ...headers }); res.end(JSON.stringify(body)); };
    try {
      const url = new URL(req.url, 'http://backend');
      const path = url.pathname;
      const method = req.method;
      const mutation = ['POST','PUT','DELETE','PATCH'].includes(method);
      const integrationContent = path.startsWith('/api/integrations/content') && method === 'POST';
      if (mutation && !integrationContent && (!origins.has(req.headers.origin) || !req.headers['content-type']?.startsWith('application/json'))) throw failure(403,'Request origin or content type not allowed');
      if (integrationContent && !req.headers['content-type']?.startsWith('application/json')) throw failure(415,'JSON required');
      let body = {};
      if (mutation) {
        let raw = '';
        for await (const chunk of req) { raw += chunk; if (Buffer.byteLength(raw) > 100000) throw failure(413,'Request too large'); }
        try { body = JSON.parse(raw || '{}'); } catch { throw failure(400,'Invalid JSON'); }
        if (!body || typeof body !== 'object' || Array.isArray(body)) throw failure(400,'Invalid JSON object');
      }
      const ip = req.headers['x-real-ip'] ?? req.socket.remoteAddress;
      if (path === '/api/health' && method === 'GET') { await db.query('SELECT 1'); return send(200,{ok:true}); }
      if (path === '/api/commerce/orders' && method === 'POST') { if (!await session(req)) throw failure(401,'Unauthorized'); return send(201,{data:await createDryRunOrder(db, { externalReference: body.external_reference, totalMinor: body.total_minor, currency: body.currency, items: body.items })}); }
      const commercePayment = /^\/api\/commerce\/orders\/(\d+)\/payment-events$/.exec(path);
      if (commercePayment && method === 'POST') { if (!await session(req)) throw failure(401,'Unauthorized'); return send(200,{data:await createDryRunPayment(db, { orderId: Number(commercePayment[1]), eventType: body.event_type, idempotencyKey: body.idempotency_key, payload: body.payload })}); }
      const commerceRefund = /^\/api\/commerce\/orders\/(\d+)\/refunds$/.exec(path);
      if (commerceRefund && method === 'POST') { if (!await session(req)) throw failure(401,'Unauthorized'); return send(200,{data:await createDryRunRefund(db, { orderId: Number(commerceRefund[1]), amountMinor: body.amount_minor, idempotencyKey: body.idempotency_key, reason: body.reason })}); }
      if (path === '/api/auth/session' && method === 'GET') return send(200,{user:await session(req)});
      if (path === '/api/auth/login' && method === 'POST') {
        const email = text(body.email,254).toLowerCase();
        await rate(`login-ip:${ip}`,20,900);
        await rate(`login-email:${email}`,10,900);
        const result = await db.query('SELECT id,email,password_hash,role FROM admin_users WHERE email=$1 AND is_active=true',[email]);
        const user = result.rows[0];
        const valid = await verifyPassword(body.password,user?.password_hash ?? dummyHash);
        if (!user || !valid) throw failure(401,'Email hoặc mật khẩu không đúng.');
        const token = randomBytes(32).toString('hex');
        await db.query("INSERT INTO admin_sessions(token_hash,user_id,expires_at) VALUES($1,$2,now()+interval '8 hours')",[digest(token),user.id]);
        return send(200,{user:{id:user.id,email:user.email,role:user.role}}, {'Set-Cookie':cookie(token,28800)});
      }
      if (path === '/api/auth/logout' && method === 'POST') {
        const token = /(?:^|;\s*)pth_session=([a-f0-9]{64})(?:;|$)/.exec(req.headers.cookie ?? '')?.[1];
        if (token) await db.query('DELETE FROM admin_sessions WHERE token_hash=$1',[digest(token)]);
        return send(200,{ok:true},{'Set-Cookie':cookie('',0)});
      }
      if (path === '/api/admin/users/audit' && method === 'GET') {
        const user = await session(req);
        if (!user) throw failure(401, 'Unauthorized');
        if (!can(user.role, 'audit:read')) throw failure(403, 'Permission denied');
        const result = await db.query("SELECT id,actor_id,action,resource,resource_id,created_at FROM admin_audit_log WHERE resource='admin_users' ORDER BY created_at DESC LIMIT 200");
        return send(200, { data: result.rows });
      }
      const usersMatch = /^\/api\/admin\/users(?:\/(\d+)(?:\/(reset-password))?)?$/.exec(path);
      if (usersMatch && ['GET','POST','PATCH'].includes(method)) {
        const user = await session(req);
        if (!user) throw failure(401, 'Unauthorized');
        if (!can(user.role, 'users:write')) throw failure(403, 'Permission denied');
        if (method === 'GET' && !usersMatch[1]) {
          const result = await db.query('SELECT id,email,role,is_active,password_reset_at,created_at FROM admin_users ORDER BY id');
          return send(200, { data: result.rows });
        }
        if (method === 'POST' && !usersMatch[1]) {
          assertRole(text(body.role, 20));
          const passwordHash = await hashPassword(body.password);
          const result = await db.query('SELECT * FROM cms_create_admin($1,$2,$3,$4)', [text(body.email, 254).toLowerCase(), passwordHash, body.role, user.id]);
          return send(201, { data: result.rows[0] });
        }
        const targetId = Number(usersMatch[1]);
        if (!Number.isSafeInteger(targetId) || targetId <= 0) throw failure(400, 'Invalid id');
        if (usersMatch[2] === 'reset-password') {
          const passwordHash = await hashPassword(body.password);
          const result = await db.query('SELECT * FROM cms_reset_admin_password($1,$2,$3)', [targetId, passwordHash, user.id]);
          if (!result.rows[0]) throw failure(404, 'User not found');
          return send(200, { data: result.rows[0] });
        }
        if (method !== 'PATCH') throw failure(405, 'Method not allowed');
        if (targetId === user.id && body.is_active === false) throw failure(409, 'Cannot deactivate current user');
        if (body.role !== undefined) assertRole(text(body.role, 20));
        const result = await db.query('SELECT * FROM cms_update_admin($1,$2,$3,$4)', [targetId, body.role ?? null, typeof body.is_active === 'boolean' ? body.is_active : null, user.id]);
        if (!result.rows[0]) throw failure(404, 'User not found');
        return send(200, { data: result.rows[0] });
      }
      const cmsMatch = /^\/api\/cms\/content(?:\/(\d+)\/transition)?$/.exec(path);
      if (cmsMatch && (method === 'GET' || method === 'POST')) {
        const user = await session(req);
        if (!user) throw failure(401, 'Unauthorized');
        if (method === 'GET') {
          const result = await db.query('SELECT ci.id,ci.content_type,ci.status,ci.current_version_id,ci.created_at,ci.updated_at,ci.published_at,cv.content FROM content_items ci LEFT JOIN content_versions cv ON cv.id=ci.current_version_id WHERE ci.deleted_at IS NULL ORDER BY ci.updated_at DESC LIMIT 500');
          return send(200, { data: result.rows });
        }
        if (cmsMatch[1]) {
          const result = await transitionContent(db, { id: Number(cmsMatch[1]), from: text(body.from,40), to: text(body.to,40), actorId: user.id, content: body.content });
          return send(200, { data: result });
        }
        const created = await createContentDraft(db, { contentType: text(body.content_type,40), content: body.content, actorId: user.id });
        return send(201, { data: created });
      }
      const versionMatch = /^\/api\/cms\/content\/(\d+)\/versions$/.exec(path);
      if (versionMatch && method === 'GET') {
        if (!await session(req)) throw failure(401, 'Unauthorized');
        const result = await db.query('SELECT id,version_number,content_digest,created_by,created_at FROM content_versions WHERE content_item_id=$1 ORDER BY version_number DESC', [Number(versionMatch[1])]);
        return send(200, { data: result.rows });
      }
      const revisionMatch = /^\/api\/cms\/content\/(\d+)\/(rollback|approval)$/.exec(path);
      if (revisionMatch && method === 'POST') {
        const user = await session(req);
        if (!user) throw failure(401, 'Unauthorized');
        const itemId = Number(revisionMatch[1]);
        if (revisionMatch[2] === 'rollback') return send(200, { data: await rollbackContentVersion(db, { itemId, versionId: body.version_id, actorId: user.id }) });
        return send(201, { data: await requestApproval(db, { versionId: body.version_id, targetEnvironment: text(body.target_environment, 30), actorId: user.id }) });
      }
      const approvalDecision = /^\/api\/cms\/approvals\/(\d+)\/(approve|reject)$/.exec(path);
      if (approvalDecision && method === 'POST') {
        const user = await session(req);
        if (!user) throw failure(401, 'Unauthorized');
        return send(200, { data: await decideApproval(db, { approvalId: Number(approvalDecision[1]), decision: approvalDecision[2] === 'approve' ? 'approved' : 'rejected', actorId: user.id, reason: body.reason }) });
      }
      if (path === '/api/cms/approvals' && method === 'GET') {
        if (!await session(req)) throw failure(401, 'Unauthorized');
        const status = text(url.searchParams.get('status'), 30);
        const result = status ? await db.query('SELECT id,content_version_id,target_environment,status,requested_by,approved_by,created_at,approved_at FROM approval_requests WHERE status=$1 ORDER BY created_at DESC LIMIT 500', [status]) : await db.query('SELECT id,content_version_id,target_environment,status,requested_by,approved_by,created_at,approved_at FROM approval_requests ORDER BY created_at DESC LIMIT 500');
        return send(200, { data: result.rows });
      }
      if (path === '/api/cms/audit' && method === 'GET') {
        if (!await session(req)) throw failure(401, 'Unauthorized');
        const entityType = text(url.searchParams.get('entity_type'), 80);
        const result = entityType ? await db.query('SELECT id,correlation_id,actor_type,actor_id,action,entity_type,entity_id,result,created_at FROM cms_audit_events WHERE entity_type=$1 ORDER BY created_at DESC LIMIT 500', [entityType]) : await db.query('SELECT id,correlation_id,actor_type,actor_id,action,entity_type,entity_id,result,created_at FROM cms_audit_events ORDER BY created_at DESC LIMIT 500');
        return send(200, { data: result.rows });
      }
      if (path === '/api/cms/publication-jobs' && method === 'POST') {
        if (!await session(req)) throw failure(401, 'Unauthorized');
        const job = await createPublicationJob(db, { approvalId: body.approval_id, provider: body.provider, idempotencyKey: text(body.idempotency_key, 160) });
        return send(job.alreadyExists ? 200 : 201, { data: job, external_side_effect: false });
      }
      const publicMatch = /^\/api\/content\/(content_news|content_projects|content_products)(?:\/([^/]+))?$/.exec(path);
      if (publicMatch && method === 'GET') {
        const [,kind,param] = publicMatch;
        if (!param) {
          const result = await db.query('SELECT * FROM records WHERE kind=$1 AND public_visible=true ORDER BY id DESC LIMIT 500',[kind]);
          return send(200,result.rows.map(rowData));
        }
        let result;
        if (/^\d+$/.test(param)) result = await db.query('SELECT * FROM records WHERE kind=$1 AND id=$2 AND public_visible=true',[kind,Number(param)]);
        else if (kind === 'content_products') result = await db.query("SELECT * FROM records WHERE kind=$1 AND data->>'slug'=$2",[kind,decodeURIComponent(param)]);
        else throw failure(400,'Invalid id');
        return send(200,result.rows[0] ? rowData(result.rows[0]) : null);
      }
      if (path === '/api/integrations/content/promote' && method === 'POST') {
        const expected = process.env.CONTENT_INTEGRATION_SECRET ?? '';
        const provided = typeof req.headers['x-content-integration-key'] === 'string' ? req.headers['x-content-integration-key'] : '';
        if (!expected || !provided || digest(provided) !== digest(expected)) throw failure(401,'Invalid integration credential');
        const approvalId = text(body.approval_id,160), idempotencyKey = text(body.idempotency_key,160), approvedBy = text(body.approved_by,160);
        if (!approvalId || !idempotencyKey || !approvedBy || body.approved !== true) throw failure(409,'Explicit approval is required');
        const client = await db.connect();
        try {
          await client.query('BEGIN');
          const found = await client.query('SELECT id,kind,data,status,promoted_record_id FROM content_drafts WHERE approval_id=$1 AND idempotency_key=$2 FOR UPDATE',[approvalId,idempotencyKey]);
          if (!found.rows[0]) throw failure(404,'Draft not found');
          const draft = found.rows[0];
          if (draft.status === 'promoted') { await client.query('COMMIT'); return send(200,{status:'already_promoted',promoted_record_id:draft.promoted_record_id,external_side_effect:false}); }
          if (draft.status !== 'pending') throw failure(409,'Draft is not pending');
          const promoted = await client.query('INSERT INTO records(kind,data) VALUES($1,$2::jsonb) RETURNING id',[draft.kind,JSON.stringify(draft.data)]);
          await client.query('UPDATE content_drafts SET status=$1,approved_by=$2,approved_at=now(),promoted_record_id=$3,updated_at=now() WHERE id=$4',['promoted',approvedBy,promoted.rows[0].id,draft.id]);
          await client.query('INSERT INTO integration_audit_log(integration,action,resource,resource_id,approval_id,idempotency_key,metadata) VALUES($1,$2,$3,$4,$5,$6,$7::jsonb)',['n8n','draft.promote','records',promoted.rows[0].id,approvalId,idempotencyKey,JSON.stringify({draft_id:draft.id,approved_by:approvedBy})]);
          await client.query('COMMIT');
          return send(201,{status:'promoted',record_id:promoted.rows[0].id,external_side_effect:true});
        } catch (error) { await client.query('ROLLBACK'); throw error; } finally { client.release(); }
      }

      if (integrationContent) {
        const expected = process.env.CONTENT_INTEGRATION_SECRET ?? '';
        const provided = typeof req.headers['x-content-integration-key'] === 'string' ? req.headers['x-content-integration-key'] : '';
        if (!expected || !provided || digest(provided) !== digest(expected)) throw failure(401,'Invalid integration credential');
        const kind = text(body.kind,40), approvalId = text(body.approval_id,160), idempotencyKey = text(body.idempotency_key,160);
        if (!['content_news','content_projects'].includes(kind)) throw failure(400,'Invalid content kind');
        if (!approvalId || !idempotencyKey) throw failure(400,'approval_id and idempotency_key are required');
        if (body.publish === true) throw failure(409,'Draft endpoint cannot publish');
        const existing = await db.query('SELECT id,approval_id,kind,status FROM content_drafts WHERE idempotency_key=$1',[idempotencyKey]);
        if (existing.rows[0]) return send(200,{status:'already_exists',data:existing.rows[0],external_side_effect:false});
        const safe = clean(kind, body.data, true);
        const created = await db.query('INSERT INTO content_drafts(idempotency_key,approval_id,kind,data) VALUES($1,$2,$3,$4::jsonb) RETURNING id,approval_id,kind,status,created_at',[idempotencyKey,approvalId,kind,JSON.stringify(safe)]);
        await db.query('INSERT INTO integration_audit_log(integration,action,resource,resource_id,approval_id,idempotency_key,metadata) VALUES($1,$2,$3,$4,$5,$6,$7::jsonb)',['n8n','draft.create','content_drafts',created.rows[0].id,approvalId,idempotencyKey,JSON.stringify({kind})]);
        return send(201,{status:'draft_created',data:created.rows[0],external_side_effect:false});
      }

      if (path === '/api/contact' && method === 'POST') {
        if (text(body.company_alt,100)) return send(200,{ok:true});
        const name=text(body.name,120),email=text(body.email,254).toLowerCase(),message=text(body.message,2000);
        if (!name || !message || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || body.consent !== true) throw failure(400,'Invalid submission');
        await rate(`contact:${ip}`,5,3600);
        const data={name,email,message,phone:text(body.phone,30),organization:text(body.organization,160),field:text(body.field,160),language:text(body.submitted_language,20),consent:true};
        const insertRes = await db.query('INSERT INTO contact_submissions(data) VALUES($1::jsonb) RETURNING id,created_at',[JSON.stringify(data)]);
        const submissionId = insertRes.rows[0]?.id;
        dispatchLeadNotifications({ id: submissionId, ...data }).catch(() => {});
        return send(201,{ok:true});
      }
      if (path === '/api/admin' && method === 'POST') {
        const user = await session(req);
        if (!user) throw failure(401,'Unauthorized');
        const { action, table:kind, id, data } = body;
        if (action === 'stats') {
          const counts = await db.query('SELECT kind,count(*)::int AS count FROM records GROUP BY kind');
          const map=Object.fromEntries(counts.rows.map(x=>[x.kind,x.count]));
          const contacts=await db.query('SELECT count(*)::int AS count FROM contact_submissions');
          return send(200,{data:{news:map.content_news??0,projects:map.content_projects??0,products:map.content_products??0,orders:map.order_headers??0,contacts:contacts.rows[0].count}});
        }
        if (![...PUBLIC,'order_headers','order_items','contact_submissions'].includes(kind)) throw failure(400,'Invalid resource');
        if (action === 'list') {
          const result = kind==='contact_submissions' ? await db.query('SELECT * FROM contact_submissions ORDER BY id DESC LIMIT 500') : await db.query('SELECT * FROM records WHERE kind=$1 ORDER BY id DESC LIMIT 500',[kind]);
          return send(200,{data:result.rows.map(rowData)});
        }
        if (!['create','update','remove'].includes(action) || !FIELDS[kind]) throw failure(400,'Invalid action');
        if (action==='create' && !PUBLIC.includes(kind)) throw failure(400,'Creation is not available for this resource');
        if (action!=='create' && (!Number.isSafeInteger(id) || id<=0)) throw failure(400,'Invalid id');
        const safe = action==='remove' ? null : clean(kind,data,action==='create');
        const client=await db.connect();
        try {
          await client.query('BEGIN');
          let result;
          if(action==='create') result=await client.query('INSERT INTO records(kind,data) VALUES($1,$2::jsonb) RETURNING *',[kind,JSON.stringify(safe)]);
          if(action==='update') result=await client.query('UPDATE records SET data=data || $3::jsonb,updated_at=now() WHERE kind=$1 AND id=$2 RETURNING *',[kind,id,JSON.stringify(safe)]);
          if(action==='remove') result=await client.query('DELETE FROM records WHERE kind=$1 AND id=$2 RETURNING *',[kind,id]);
          if(!result.rows[0]) throw failure(404,'Not found');
          await client.query('INSERT INTO admin_audit_log(actor_id,action,resource,resource_id) VALUES($1,$2,$3,$4)',[user.id,action,kind,result.rows[0].id]);
          await client.query('COMMIT');
          return send(200,{data:action==='remove'?{id}:rowData(result.rows[0])});
        } catch(error) { await client.query('ROLLBACK'); throw error; } finally { client.release(); }
      }
      throw failure(404,'Not found');
    } catch(error) {
      const status=error.status ?? (error.code==='23505'?409:500);
      if (status===500) console.error('API error',error.code??error.name);
      send(status,{error:status===500?'Server error':status===409?'Duplicate record':error.message});
    }
  });
}
