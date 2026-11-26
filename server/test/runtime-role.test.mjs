import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {PGlite} from '@electric-sql/pglite';
import {provision} from '../../scripts/security-grants.mjs';

for(const shop of [false,true])test('Runtime role cannot modify schema or provision admins: '+(shop?'shop':'company'),async()=>{
 const db=new PGlite();
 try{
 const schema=await readFile(new URL(shop?'../../shop/server/schema.sql':'../schema.sql',import.meta.url),'utf8');
 // PGlite has one current database name; CONNECT grant uses the production name.
 await db.exec('CREATE DATABASE '+(shop?'shop':'phucthanhholding'));
 await provision(db,{shop,schema,runtimePassword:'a'.repeat(64)});
 await provision(db,{shop,schema,runtimePassword:'a'.repeat(64)});
 const role=shop?'shop_runtime':'website_runtime';await db.exec('SET ROLE '+role);
 const access=(await db.query("SELECT rolsuper,rolcreatedb,rolcreaterole,rolbypassrls,has_schema_privilege(current_user,'public','CREATE') AS can_create FROM pg_roles WHERE rolname=current_user")).rows[0];
 assert.deepEqual(access,{rolsuper:false,rolcreatedb:false,rolcreaterole:false,rolbypassrls:false,can_create:false});
 await assert.rejects(()=>db.query('CREATE TABLE forbidden(id int)'),e=>e.code==='42501');
 if(shop){
 const id=(await db.query("INSERT INTO shop_users(email,name,email_verified_at) VALUES('role@example.test','Role',now()) RETURNING id")).rows[0].id;
 await db.query("INSERT INTO shop_sessions(token_hash,user_id,expires_at) VALUES('test',$1,now())",[id]);
 await db.query("INSERT INTO shop_rates VALUES('test',1,now())");
 await db.query("INSERT INTO shop_interests(email,name,kind,message) VALUES('test@example.test','Test','test','test')");
 await db.query('DELETE FROM shop_interests WHERE created_at<now()');
 await assert.rejects(()=>db.query('DELETE FROM shop_users'),e=>e.code==='42501');
 }else{
 await db.exec('RESET ROLE');await db.query("INSERT INTO admin_users(email,password_hash) VALUES('admin@example.test','test')");await db.exec('SET ROLE '+role);
 await db.query('SELECT * FROM admin_users');
 await db.query("INSERT INTO records(kind,data) VALUES('content_news','{}')");
 await db.query("INSERT INTO admin_audit_log(actor_id,action,resource) VALUES(1,'test','test')");
 await assert.rejects(()=>db.query("INSERT INTO admin_users(email,password_hash) VALUES('intruder@example.test','test')"),e=>e.code==='42501');
 await assert.rejects(()=>db.query('DELETE FROM admin_audit_log'),e=>e.code==='42501');
 }
 }finally{await db.close();}
});
