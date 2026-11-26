import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {PGlite} from '../../server/node_modules/@electric-sql/pglite/dist/index.js';
import {createApp} from './app.mjs';
import {notifyRegistrations,csvCell,consentText,adminEmails} from './marketing.mjs';
test('Marketing consent, admin access, CSV filtering and durable registration notifications',async()=>{
 const db=new PGlite();await db.exec(await readFile(new URL('./schema.sql',import.meta.url),'utf8'));let token='',temporary='',smtpFail=false;
 const env={SMTP_HOST:'test',SMTP_USER:'test',SMTP_PASSWORD:'test',SMTP_FROM:'info@phucthanhholding.com',PUBLIC_SHOP_URL:'https://test.local'};
 const server=await createApp(db,{env,secure:false,origins:['http://test.local'],verificationMailer:async d=>{token=d.token;},passwordMailer:async d=>{if(smtpFail)throw Error('Mock failure');temporary=d.password;assert.equal(d.email,'normal@example.test');}});await new Promise(r=>server.listen(0,'127.0.0.1',r));const base='http://127.0.0.1:'+server.address().port+'/api/shop/';
 const call=async(path,body,cookie='')=>{const r=await fetch(base+path,{headers:{Origin:'http://test.local',Cookie:cookie,...(body!==undefined?{'Content-Type':'application/json'}:{})},...(body!==undefined?{method:'POST',body:JSON.stringify(body)}:{})});return {status:r.status,text:await r.text(),cookie:r.headers.get('set-cookie')?.split(';')[0]};};
 const register=async(email,consent)=>{const r=await call('register',{email,name:'Test '+email,password:'Test-only-password-123',...(consent===undefined?{}:{marketingConsent:consent})});assert.equal(r.status,202);const pending=token;assert.equal((await db.query('SELECT count(*) n FROM shop_users WHERE email=$1',[email])).rows[0].n,0);assert.equal((await call('verify-email',{token:pending})).status,200);assert.equal((await call('verify-email',{token:pending})).status,400);return (await call('login',{email,password:'Test-only-password-123'})).cookie;};
 try{
  const normal=await register('normal@example.test',undefined);let row=(await db.query('SELECT * FROM shop_users WHERE email=$1',['normal@example.test'])).rows[0];assert.equal(row.marketing_consent,false);assert.equal(row.marketing_updated_at,null);
  const opted=await register('opted@example.test',true);row=(await db.query('SELECT * FROM shop_users WHERE email=$1',['opted@example.test'])).rows[0];assert.equal(row.marketing_consent,true);assert.equal(row.marketing_consent_text,consentText);assert.ok(row.marketing_updated_at);
  assert.equal((await call('admin/users',undefined,normal)).status,403);assert.equal((await call('admin/marketing.csv',undefined,normal)).status,403);assert.equal((await call('admin/users')).status,401);
  const admin=await register('phuclv@phucthanhholding.com',false);assert.equal(JSON.parse((await call('session',undefined,admin)).text).user.isAdmin,true);const list=await call('admin/users',undefined,admin);assert.equal(list.status,200);assert.equal(JSON.parse(list.text).total,3);assert.ok(!list.text.includes('password_hash'));assert.ok(!list.text.includes('google_sub'));
  let csv=await call('admin/marketing.csv',undefined,admin);assert.equal(csv.status,200);assert.ok(csv.text.includes('opted@example.test'));assert.ok(!csv.text.includes('normal@example.test'));
  assert.equal((await call('marketing-preference',{consent:false},opted)).status,200);csv=await call('admin/marketing.csv',undefined,admin);assert.ok(!csv.text.includes('opted@example.test'));assert.equal((await call('marketing-preference',{consent:'true'},normal)).status,400);
  assert.equal((await call('marketing-preference',{consent:true},normal)).status,200);assert.ok((await call('admin/marketing.csv',undefined,admin)).text.includes('normal@example.test'));
  await notifyRegistrations(db,env,async()=>{throw Error('Simulated SMTP failure');});assert.equal((await db.query('SELECT count(*) n FROM shop_users WHERE registration_notify_pending')).rows[0].n,3);
  const sent=[];await notifyRegistrations(db,env,async m=>sent.push(m));assert.equal(sent.length,3);for(const m of sent){assert.deepEqual(m.to,adminEmails);assert.ok(!m.text.includes('Test-only-password'));assert.ok(!m.text.includes(token));}
  await notifyRegistrations(db,env,async m=>sent.push(m));assert.equal(sent.length,3);assert.equal((await db.query('SELECT count(*) n FROM shop_users WHERE registration_notify_pending')).rows[0].n,0);
  await db.exec(await readFile(new URL('./schema.sql',import.meta.url),'utf8'));assert.equal((await db.query('SELECT marketing_consent FROM shop_users WHERE email=$1',['opted@example.test'])).rows[0].marketing_consent,false);

  assert.equal((await call('admin/reset-password',{userId:1})).status,401);
  assert.equal((await call('admin/reset-password',{userId:1},normal)).status,403);
  assert.equal((await call('admin/reset-password',{userId:3},admin)).status,403);
  smtpFail=true;assert.equal((await call('admin/reset-password',{userId:1},admin)).status,500);
  assert.equal(JSON.parse((await call('session',undefined,normal)).text).user.email,'normal@example.test');
  smtpFail=false;const reset=await call('admin/reset-password',{userId:1},admin);assert.equal(reset.status,200);assert.equal(temporary.length,24);assert.ok(!reset.text.includes(temporary));
  assert.equal(JSON.parse((await call('session',undefined,normal)).text).user,null);
  assert.equal((await call('login',{email:'normal@example.test',password:'Test-only-password-123'})).status,401);
  const tempLogin=await call('login',{email:'normal@example.test',password:temporary});assert.equal(tempLogin.status,200);assert.equal(JSON.parse(tempLogin.text).user.must_change_password,true);
  assert.equal((await call('favorites',undefined,tempLogin.cookie)).status,403);
  assert.equal((await call('password',{currentPassword:'wrong',password:'Newpass123!'},tempLogin.cookie)).status,401);
  assert.equal((await call('password',{currentPassword:temporary,password:'Newpass123!'},tempLogin.cookie)).status,200);
  assert.equal(JSON.parse((await call('session',undefined,tempLogin.cookie)).text).user,null);
  assert.equal((await call('login',{email:'normal@example.test',password:'Newpass123!'})).status,200);
  const audit=(await db.query('SELECT action FROM shop_password_audit ORDER BY id')).rows;assert.deepEqual(audit.map(r=>r.action),['admin_reset','password_changed']);
 }finally{await new Promise(r=>server.close(r));await db.close();}
});
test('CSV prevents formula injection',()=>{for(const v of ['=CMD()','+1','@SUM(1)','-2','  =1','\t=1'])assert.ok(csvCell(v).startsWith('"\''));assert.equal(csvCell('A"B'),'"A""B"');});

test('Password boundaries: reject 7 and 129, verify and login with 8, accept 128',async()=>{
 const db=new PGlite();await db.exec(await readFile(new URL('./schema.sql',import.meta.url),'utf8'));let token='';
 const env={SMTP_HOST:'test',SMTP_USER:'test',SMTP_PASSWORD:'test',SMTP_FROM:'info@example.test',PUBLIC_SHOP_URL:'https://test.local'};
 const server=await createApp(db,{env,secure:false,origins:['http://test.local'],verificationMailer:async d=>{token=d.token;}});await new Promise(r=>server.listen(0,'127.0.0.1',r));
 const call=async(path,body)=>{const r=await fetch('http://127.0.0.1:'+server.address().port+'/api/shop/'+path,{method:'POST',headers:{Origin:'http://test.local','Content-Type':'application/json'},body:JSON.stringify(body)});await r.text();return r.status;};
 try{
  for(const n of [7,129])assert.equal(await call('register',{email:'reject'+n+'@example.test',name:'Boundary',password:'x'.repeat(n)}),400);
  assert.equal(await call('register',{email:'eight@example.test',name:'Boundary',password:'Test123!'}),202);
  assert.equal(await call('verify-email',{token}),200);
  assert.equal(await call('login',{email:'eight@example.test',password:'Test123!'}),200);
  assert.equal(await call('register',{email:'max@example.test',name:'Boundary',password:'x'.repeat(128)}),202);
 }finally{await new Promise(r=>server.close(r));await db.close();}
});
