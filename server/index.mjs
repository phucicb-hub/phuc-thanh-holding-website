import { createPool, migrate } from './db.mjs';
import { createApp } from './app.mjs';
const db=createPool();
if(process.env.RUN_MIGRATIONS!=='false')await migrate(db);
const origins=(process.env.ALLOWED_ORIGINS ?? 'https://phucthanhholding.com').split(',').map(x=>x.trim());
const server=await createApp(db,{origins,secureCookie:process.env.COOKIE_SECURE!=='false'});
server.requestTimeout=15000;
server.headersTimeout=10000;
server.listen(8080,'0.0.0.0',()=>console.log('Backend ready on port 8080'));
const cleanup=setInterval(async()=>{
  try {
    await db.query('DELETE FROM admin_sessions WHERE expires_at<=now()');
    await db.query('DELETE FROM rate_limits WHERE expires_at<=now()');
  } catch(error) { console.error('Expired session cleanup failed',error.code??error.name); }
},3600000);
cleanup.unref();
async function shutdown(){server.close(async()=>{await db.end();process.exit(0);});setTimeout(()=>process.exit(1),10000).unref();}
process.on('SIGTERM',shutdown);
process.on('SIGINT',shutdown);
