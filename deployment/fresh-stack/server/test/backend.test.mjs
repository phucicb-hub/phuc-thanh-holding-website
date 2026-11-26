import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { createPool } from '../db.mjs';
import { createApp } from '../app.mjs';
import { hashPassword } from '../auth.mjs';

test('Fresh backend integration with PostgreSQL engine', async t => {
  let db,closeDatabase;
  const schemaSql=await readFile(new URL('../schema.sql',import.meta.url),'utf8');
  if(process.env.TEST_POSTGRES==='true') {
    const pool=createPool();
    const client=await pool.connect();
    const schema='integration_'+Date.now();
    await client.query(`CREATE SCHEMA ${schema}`);
    await client.query(`SET search_path TO ${schema}`);
    await client.query(schemaSql);
    db={query:(sql,params)=>client.query(sql,params),connect:async()=>({query:(sql,params)=>client.query(sql,params),release(){}})};
    closeDatabase=async()=>{await client.query('SET search_path TO public');await client.query(`DROP SCHEMA ${schema} CASCADE`);client.release();await pool.end();};
  } else {
    const { PGlite }=await import('@electric-sql/pglite');
    const engine = new PGlite();
    await engine.exec(schemaSql);
    db = { query: (sql,params) => engine.query(sql,params), connect: async () => ({ query:(sql,params)=>engine.query(sql,params), release(){} }) };
    closeDatabase=()=>engine.close();
  }
  await db.query('INSERT INTO admin_users(email,password_hash) VALUES($1,$2)',['admin@example.test',await hashPassword('Test-only-Password-1234')]);
  const app = await createApp(db);
  await new Promise(resolve => app.listen(0,'127.0.0.1',resolve));
  const base='http://127.0.0.1:'+app.address().port;
  let cookie='';
  const request=(path,body,overrides={})=>fetch(base+path,{method:body===undefined?'GET':'POST',headers:{Origin:'https://phucthanhholding.com','Content-Type':'application/json',Cookie:cookie,...overrides},body:body===undefined?undefined:JSON.stringify(body)});
  try {
    await t.test('fresh public content empty and database healthy',async()=>{
      assert.equal((await request('/api/health')).status,200);
      for(const kind of ['content_news','content_products','content_projects']) assert.deepEqual(await (await request('/api/content/'+kind)).json(),[]);
      assert.deepEqual(await (await request('/api/auth/session')).json(),{user:null});
    });
    await t.test('reject unauthorized admin, cross-origin and malformed contacts',async()=>{
      assert.equal((await request('/api/admin',{action:'stats'})).status,401);
      assert.equal((await request('/api/auth/login',{}, {Origin:'https://attacker.test'})).status,403);
      assert.equal((await request('/api/contact',{})).status,400);
      assert.equal((await request('/api/auth/login',{email:'admin@example.test',password:'wrong'})).status,401);
    });
    await t.test('valid login, secure cookie and session restoration',async()=>{
      const response=await request('/api/auth/login',{email:'admin@example.test',password:'Test-only-Password-1234'});
      assert.equal(response.status,200);
      const header=response.headers.get('set-cookie');
      assert.match(header,/HttpOnly/);assert.match(header,/Secure/);assert.match(header,/SameSite=Strict/);
      cookie=header.split(';')[0];
      assert.equal((await (await request('/api/auth/session')).json()).user.email,'admin@example.test');
    });
    let newsId,productId;
    await t.test('create bilingual content and fetch detail with defaults',async()=>{
      const r=await request('/api/admin',{action:'create',table:'content_news',data:{title:'Kiểm thử nội bộ',title_en:'Internal test',content:['VI'],content_en:['EN']}});
      assert.equal(r.status,200);newsId=(await r.json()).data.id;
      const n=await (await request('/api/content/content_news/'+newsId)).json();assert.equal(n.title_en,'Internal test');assert.deepEqual(n.tags,[]);
      const p=await (await request('/api/admin',{action:'create',table:'content_products',data:{title:'Test',slug:'internal-test'}})).json();productId=p.data.id;
      assert.equal((await (await request('/api/content/content_products/internal-test')).json()).id,productId);
    });
    await t.test('reject invalid resource, fields, ids and duplicate slug',async()=>{
      assert.equal((await request('/api/admin',{action:'list',table:'admin_users'})).status,400);
      assert.equal((await request('/api/admin',{action:'update',table:'content_news',id:'1;DROP TABLE records',data:{title:'x'}})).status,400);
      assert.equal((await request('/api/admin',{action:'update',table:'content_news',id:newsId,data:{id:99}})).status,400);
      assert.equal((await request('/api/admin',{action:'create',table:'content_products',data:{title:'x',slug:'internal-test'}})).status,409);
    });
    await t.test('update preserves translations, audit is recorded, delete removes content',async()=>{
      assert.equal((await request('/api/admin',{action:'update',table:'content_news',id:newsId,data:{title:'Updated'}})).status,200);
      assert.equal((await (await request('/api/content/content_news/'+newsId)).json()).title_en,'Internal test');
      assert.equal((await request('/api/admin',{action:'remove',table:'content_products',id:productId})).status,200);
      assert.equal(await (await request('/api/content/content_products/'+productId)).json(),null);
      assert.equal((await db.query('SELECT count(*)::int AS count FROM admin_audit_log')).rows[0].count,4);
    });
    await t.test('contact persistence visible only to admin; consent mandatory',async()=>{
      const payload={name:'Internal integration test',email:'test@example.test',message:'Ephemeral test database only',consent:true};
      assert.equal((await request('/api/contact',{...payload,consent:false})).status,400);
      assert.equal((await request('/api/contact',payload)).status,201);
      const contacts=await (await request('/api/admin',{action:'list',table:'contact_submissions'})).json();assert.equal(contacts.data.length,1);assert.equal(contacts.data[0].message,payload.message);
      assert.equal((await request('/api/contact_submissions')).status,404);
      const stats=await (await request('/api/admin',{action:'stats'})).json();assert.equal(stats.data.contacts,1);assert.equal(stats.data.news,1);
    });
    await t.test('contact throttling and honeypot create no additional records',async()=>{
      const p={name:'Test',email:'test@example.test',message:'Test',consent:true};
      for(let i=0;i<4;i++)assert.equal((await request('/api/contact',p)).status,201);
      assert.equal((await request('/api/contact',p)).status,429);
      assert.equal((await request('/api/contact',{company_alt:'bot'})).status,200);
      assert.equal((await db.query('SELECT count(*)::int AS count FROM contact_submissions')).rows[0].count,5);
    });
    await t.test('logout revokes session and access',async()=>{
      assert.equal((await request('/api/auth/logout',{})).status,200);
      assert.equal((await request('/api/admin',{action:'stats'})).status,401);
      assert.deepEqual(await (await request('/api/auth/session')).json(),{user:null});
    });
    await t.test('login attempts limited persistently',async()=>{
      let status;
      for(let i=0;i<11;i++)status=(await request('/api/auth/login',{email:'missing@example.test',password:'wrong'},{'X-Real-IP':'test-rate'})).status;
      assert.equal(status,429);
    });
  } finally { await new Promise(resolve=>app.close(resolve));await closeDatabase(); }
});
