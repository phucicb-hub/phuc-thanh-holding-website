import { createServer } from 'node:http';
import { randomBytes } from 'node:crypto';
import { digest, hashPassword, verifyPassword } from './auth.mjs';

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
    const result = await db.query('SELECT u.id,u.email FROM admin_sessions s JOIN admin_users u ON u.id=s.user_id WHERE s.token_hash=$1 AND s.expires_at>now()', [digest(token)]);
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
      if (mutation && (!origins.has(req.headers.origin) || !req.headers['content-type']?.startsWith('application/json'))) throw failure(403,'Request origin or content type not allowed');
      let body = {};
      if (mutation) {
        let raw = '';
        for await (const chunk of req) { raw += chunk; if (Buffer.byteLength(raw) > 100000) throw failure(413,'Request too large'); }
        try { body = JSON.parse(raw || '{}'); } catch { throw failure(400,'Invalid JSON'); }
        if (!body || typeof body !== 'object' || Array.isArray(body)) throw failure(400,'Invalid JSON object');
      }
      const ip = req.headers['x-real-ip'] ?? req.socket.remoteAddress;
      if (path === '/api/health' && method === 'GET') { await db.query('SELECT 1'); return send(200,{ok:true}); }
      if (path === '/api/auth/session' && method === 'GET') return send(200,{user:await session(req)});
      if (path === '/api/auth/login' && method === 'POST') {
        const email = text(body.email,254).toLowerCase();
        await rate(`login-ip:${ip}`,20,900);
        await rate(`login-email:${email}`,10,900);
        const result = await db.query('SELECT id,email,password_hash FROM admin_users WHERE email=$1',[email]);
        const user = result.rows[0];
        const valid = await verifyPassword(body.password,user?.password_hash ?? dummyHash);
        if (!user || !valid) throw failure(401,'Email hoặc mật khẩu không đúng.');
        const token = randomBytes(32).toString('hex');
        await db.query("INSERT INTO admin_sessions(token_hash,user_id,expires_at) VALUES($1,$2,now()+interval '8 hours')",[digest(token),user.id]);
        return send(200,{user:{id:user.id,email:user.email}}, {'Set-Cookie':cookie(token,28800)});
      }
      if (path === '/api/auth/logout' && method === 'POST') {
        const token = /(?:^|;\s*)pth_session=([a-f0-9]{64})(?:;|$)/.exec(req.headers.cookie ?? '')?.[1];
        if (token) await db.query('DELETE FROM admin_sessions WHERE token_hash=$1',[digest(token)]);
        return send(200,{ok:true},{'Set-Cookie':cookie('',0)});
      }
      const publicMatch = /^\/api\/content\/(content_news|content_projects|content_products)(?:\/([^/]+))?$/.exec(path);
      if (publicMatch && method === 'GET') {
        const [,kind,param] = publicMatch;
        if (!param) {
          const result = await db.query('SELECT * FROM records WHERE kind=$1 ORDER BY id DESC LIMIT 500',[kind]);
          return send(200,result.rows.map(rowData));
        }
        let result;
        if (/^\d+$/.test(param)) result = await db.query('SELECT * FROM records WHERE kind=$1 AND id=$2',[kind,Number(param)]);
        else if (kind === 'content_products') result = await db.query("SELECT * FROM records WHERE kind=$1 AND data->>'slug'=$2",[kind,decodeURIComponent(param)]);
        else throw failure(400,'Invalid id');
        return send(200,result.rows[0] ? rowData(result.rows[0]) : null);
      }
      if (path === '/api/contact' && method === 'POST') {
        if (text(body.company_alt,100)) return send(200,{ok:true});
        const name=text(body.name,120),email=text(body.email,254).toLowerCase(),message=text(body.message,2000);
        if (!name || !message || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || body.consent !== true) throw failure(400,'Invalid submission');
        await rate(`contact:${ip}`,5,3600);
        const data={name,email,message,phone:text(body.phone,30),organization:text(body.organization,160),field:text(body.field,160),language:text(body.submitted_language,20),consent:true};
        await db.query('INSERT INTO contact_submissions(data) VALUES($1::jsonb)',[JSON.stringify(data)]);
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
