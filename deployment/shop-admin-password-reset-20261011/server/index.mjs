import {notifyRegistrations} from './marketing.mjs';
import {cleanup} from './cleanup.mjs';
import {readFile} from 'node:fs/promises';
import {createApp} from './app.mjs';
// Local OAuth credentials stay on the backend and are never bundled into HTML.
if(process.env.SHOP_PREVIEW==='true'){
 try{const key=(await readFile(new URL('../youtube-api.local.txt',import.meta.url),'utf8')).trim();if(!key||/\s/.test(key))throw new Error('Invalid local YouTube key');process.env.YOUTUBE_API_KEY=key;process.env.ENABLE_YOUTUBE_REQUESTS='true';}catch(e){if(e.code!=='ENOENT')throw new Error('Local YouTube key file is not valid.');}
 try{const key=(await readFile(new URL('../gemini-api.local.txt',import.meta.url),'utf8')).trim();const model=(await readFile(new URL('../gemini-model.local.txt',import.meta.url),'utf8')).trim();if(!key||/\s/.test(key)||! /^[a-zA-Z0-9._-]+$/.test(model))throw Error();process.env.GEMINI_API_KEY=key;process.env.GEMINI_TEXT_MODEL=model;process.env.ENABLE_GEMINI_REQUESTS='true';}catch(e){if(e.code!=='ENOENT')throw new Error('Local Gemini key/model file is not valid.');}
 let credentials;
 try{credentials=JSON.parse((await readFile(new URL('../google-oauth.local.json',import.meta.url),'utf8')).replace(/^\uFEFF/,''));}
 catch(e){if(e.code!=='ENOENT')throw new Error('Local Google OAuth file is not valid JSON.');}
 if(credentials){
  const web=credentials.web;
  const callback='http://127.0.0.1:3010/api/shop/google/callback';
  if(!web||typeof web.client_id!=='string'||!web.client_id.endsWith('.apps.googleusercontent.com')||typeof web.client_secret!=='string'||!web.client_secret)throw new Error('Local OAuth requires a valid Web client.');
  // Google Console is authoritative for authorized redirects; exported files may omit them.
  process.env.GOOGLE_CLIENT_ID=web.client_id;
  process.env.GOOGLE_CLIENT_SECRET=web.client_secret;
  process.env.GOOGLE_REDIRECT_URI=callback;
 }
}
let db;
if(process.env.SHOP_PREVIEW==='true'){const {PGlite}=await import('../../server/node_modules/@electric-sql/pglite/dist/index.js');db=new PGlite(process.env.PREVIEW_DB_PATH||'./shop/.preview-db');}
else {const {default:pg}=await import('pg');db=new pg.Pool({connectionString:process.env.DATABASE_URL,max:10,connectionTimeoutMillis:5000,statement_timeout:15000});}
const schema=await readFile(new URL('./schema.sql',import.meta.url),'utf8');
if(process.env.RUN_MIGRATIONS!=='false'){if(db.exec)await db.exec(schema);else await db.query(schema);}
const origins=(process.env.ALLOWED_ORIGINS||'https://shop.phucthanhholding.com').split(',');
const server=await createApp(db,{origins,secure:process.env.COOKIE_SECURE!=='false'});
server.requestTimeout=90000;server.headersTimeout=10000;server.listen(Number(process.env.PORT||8090),'0.0.0.0',()=>console.log('Shop API ready'));
const notificationsTimer=setInterval(()=>notifyRegistrations(db,process.env).catch(()=>console.error('Registration notification queue failed')),60000);notificationsTimer.unref();
const timer=setInterval(()=>cleanup(db,process.env).catch(()=>console.error('Shop cleanup failed')),3600000);timer.unref();
process.on('SIGTERM',()=>server.close(async()=>{if(db.end)await db.end();else await db.close();process.exit(0);}));
