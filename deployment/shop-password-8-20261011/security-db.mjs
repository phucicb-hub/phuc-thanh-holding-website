import {provision} from './security-grants.mjs';
import pg from 'pg';
import {readFile} from 'node:fs/promises';

const shop=process.env.SECURITY_STACK==='shop';
for(const key of ['POSTGRES_PASSWORD','SHOP_RUNTIME_PASSWORD','WEBSITE_RUNTIME_PASSWORD']) {
 const value=process.env[key];if(value?.startsWith("'")&&value.endsWith("'"))process.env[key]=value.slice(1,-1);
}
if(!shop&&process.env.SECURITY_STACK!=='company')throw new Error('Unknown stack');
const database=shop?'shop':'phucthanhholding',owner=shop?'shop':'website',role=shop?'shop_runtime':'website_runtime';
const runtimePassword=process.env[shop?'SHOP_RUNTIME_PASSWORD':'WEBSITE_RUNTIME_PASSWORD'];
if(!runtimePassword||!/^[a-f0-9]{64}$/.test(runtimePassword))throw new Error('Runtime password missing');
const admin=new pg.Client({host:'database',database,user:owner,password:process.env.POSTGRES_PASSWORD});
await admin.connect();
try {await provision(admin,{shop,schema:await readFile('/app/security-schema.sql','utf8'),runtimePassword});}
catch(e){throw new Error('Security migration failed: '+(e.code||e.name));}
finally{await admin.end();}
const runtime=new pg.Client({host:'database',database,user:role,password:runtimePassword});await runtime.connect();
try {
 const r=(await runtime.query("SELECT current_user,rolsuper,rolcreatedb,rolcreaterole,rolbypassrls,has_schema_privilege(current_user,'public','CREATE') AS can_create FROM pg_roles WHERE rolname=current_user")).rows[0];
 if(r.current_user!==role||r.rolsuper||r.rolcreatedb||r.rolcreaterole||r.rolbypassrls||r.can_create)throw new Error('Unexpected privileges');
 await runtime.query(`SELECT 1 FROM ${shop?'shop_users':'admin_users'} LIMIT 0`);
 console.log('RUNTIME_ROLE_VERIFIED='+role);
} finally {await runtime.end();}
