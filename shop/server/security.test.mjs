import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {PGlite} from '../../server/node_modules/@electric-sql/pglite/dist/index.js';
import {createApp} from './app.mjs';
import {cleanup} from './cleanup.mjs';
import {sendVerification} from './email.mjs';

test('Email verification gates accounts, rejects replay, expires and limits email across IPs',async()=>{
 const db=new PGlite();await db.exec(await readFile(new URL('./schema.sql',import.meta.url),'utf8'));
 let token='',email='';const env={TRUST_PROXY:'true',SMTP_HOST:'test',SMTP_USER:'test',SMTP_PASSWORD:'test',SMTP_FROM:'test@example.test',PUBLIC_SHOP_URL:'https://shop.example.test'};
 const server=await createApp(db,{origins:['https://shop.example.test'],secure:true,env,verificationMailer:async item=>{token=item.token;email=item.email;}});
 await new Promise(r=>server.listen(0,'127.0.0.1',r));
 const call=async(path,body,ip='1')=>{const r=await fetch('http://127.0.0.1:'+server.address().port+'/api/shop/'+path,{method:'POST',headers:{Origin:'https://shop.example.test','Content-Type':'application/json','X-Real-IP':ip},body:JSON.stringify(body)});return {status:r.status,body:await r.json(),cookie:r.headers.get('set-cookie')};};
 const registration={email:'owner@example.test',name:'Owner',password:'Test-password-123456'};
 try{
 const r=await call('register',registration);assert.equal(r.status,202);assert.equal(r.cookie,null);assert.equal(email,registration.email);assert.ok(!JSON.stringify(r.body).includes(token));
 assert.equal((await db.query('SELECT count(*) n FROM shop_users')).rows[0].n,0);
 const pending=(await db.query('SELECT token_hash,password_hash FROM shop_email_verifications')).rows[0];assert.notEqual(pending.token_hash,token);assert.ok(!pending.password_hash.includes(registration.password));
 assert.equal((await call('login',registration)).status,401);
 assert.equal((await call('verify-email',{token:'invalid'})).status,400);
 assert.equal((await call('verify-email',{token})).status,200);
 assert.equal((await call('verify-email',{token})).status,400);
 assert.equal((await call('login',registration)).status,200);
 // A Google identity can register while password verification is pending: pending email never reserves shop_users.
 await call('register',{...registration,email:'google@example.test'});const pendingGoogle=token;
 await db.query("INSERT INTO shop_users(email,name,google_sub,email_verified_at) VALUES('google@example.test','Google','google-id',now())");
 assert.equal((await call('verify-email',{token:pendingGoogle})).status,200);
 assert.equal((await db.query("SELECT password_hash FROM shop_users WHERE email='google@example.test'")).rows[0].password_hash,null);
 await call('register',{...registration,email:'expire@example.test'});await db.query("UPDATE shop_email_verifications SET expires_at=now()-interval '1 second' WHERE email='expire@example.test'");assert.equal((await call('verify-email',{token})).status,400);
 for(let i=0;i<10;i++)assert.equal((await call('login',{email:'target@example.test',password:'wrong-password-12345'},'ip'+i)).status,401);
 assert.equal((await call('login',{email:'TARGET@example.test',password:'wrong-password-12345'},'new-ip')).status,429);
 }finally{await new Promise(r=>server.close(r));await db.close();}
});

test('Missing SMTP fails closed and never creates an account',async()=>{
 const db=new PGlite();await db.exec(await readFile(new URL('./schema.sql',import.meta.url),'utf8'));
 const server=await createApp(db,{origins:['https://test.local'],env:{}});await new Promise(r=>server.listen(0,'127.0.0.1',r));
 try{const r=await fetch('http://127.0.0.1:'+server.address().port+'/api/shop/register',{method:'POST',headers:{Origin:'https://test.local','Content-Type':'application/json'},body:JSON.stringify({name:'Test',email:'test@example.test',password:'Test-password-123456'})});assert.equal(r.status,503);assert.equal((await db.query('SELECT count(*) n FROM shop_users')).rows[0].n,0);
 await assert.rejects(()=>sendVerification({email:'a@example.test',token:'test'},{}),{status:503});
 }finally{await new Promise(r=>server.close(r));await db.close();}
});

test('Retention removes expired records and preserves recent data and accounts',async()=>{
 const db=new PGlite();await db.exec(await readFile(new URL('./schema.sql',import.meta.url),'utf8'));
 try{
 await db.query("INSERT INTO shop_users(email,name,email_verified_at) VALUES('retention@example.test','Retention',now())");
 for(const age of [1,100])await db.query("INSERT INTO shop_history(user_id,tool,input,result,created_at) VALUES(1,'test','','result',now()-($1::int*interval '1 day'))",[age]);
 for(const age of [1,31])await db.query("INSERT INTO shop_measurements(user_id,video_id,views,measured_at) VALUES(1,'video',1,now()-($1::int*interval '1 day'))",[age]);
 for(const age of [1,181])await db.query("INSERT INTO shop_interests(email,name,kind,message,created_at) VALUES('test@example.test','Test','test','message',now()-($1::int*interval '1 day'))",[age]);
 await db.query("INSERT INTO shop_rates VALUES('expired',1,now()-interval '1 second'),('active',1,now()+interval '1 hour')");
 await cleanup(db,{});
 for(const table of ['shop_history','shop_measurements','shop_interests','shop_rates','shop_users'])assert.equal((await db.query(`SELECT count(*) n FROM ${table}`)).rows[0].n,1);
 await assert.rejects(()=>cleanup(db,{HISTORY_RETENTION_DAYS:'0'}));
 }finally{await db.close();}
});
