import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {PGlite} from '../../server/node_modules/@electric-sql/pglite/dist/index.js';
import {createApp} from './app.mjs';
import {gemini,youtube,videoId} from './providers.mjs';
test('Shop authentication, ownership, forms, unavailable providers and CSRF',async t=>{
 const db=new PGlite();await db.exec(await readFile(new URL('./schema.sql',import.meta.url),'utf8'));const server=await createApp(db,{origins:['http://test.local'],secure:false,env:{}});await new Promise(r=>server.listen(0,'127.0.0.1',r));const base='http://127.0.0.1:'+server.address().port;let cookie='';const call=async(path,body,session=cookie,origin='http://test.local')=>{const r=await fetch(base+'/api/shop/'+path,{headers:{Origin:origin,Cookie:session,...(body?{'Content-Type':'application/json'}:{})},...(body?{method:'POST',body:JSON.stringify(body)}:{})});return {status:r.status,body:await r.json(),cookie:r.headers.get('set-cookie')?.split(';')[0]};};
 try {
 await t.test('Reject foreign origin and short password',async()=>{assert.equal((await call('register',{email:'a@example.test',name:'A',password:'short'},'','http://evil.test')).status,403);assert.equal((await call('register',{email:'a@example.test',name:'A',password:'short'})).status,400);});
 await t.test('Register, session, password hash and logout',async()=>{const r=await call('register',{email:'a@example.test',name:'Test A',password:'Test-only-password-123'});assert.equal(r.status,200);cookie=r.cookie;assert.equal((await call('session')).body.user.email,'a@example.test');const stored=(await db.query('SELECT password_hash FROM shop_users')).rows[0].password_hash;assert.ok(!stored.includes('Test-only-password'));});
 await t.test('Store history; isolate users',async()=>{assert.equal((await call('history',{tool:'yt-metadata',input:'test',result:'real test result'})).status,201);assert.equal((await call('history')).body.items.length,1);const r=await call('register',{email:'b@example.test',name:'Test B',password:'Test-only-password-456'});assert.equal((await call('history',undefined,r.cookie)).body.items.length,0);});
 await t.test('Favorites persist per user and registry contains all tools',async()=>{assert.equal((await call('tools')).body.tools.length,27);assert.equal((await call('favorites',{tool:'spy-channel',saved:true})).status,200);assert.deepEqual((await call('favorites')).body.items,['spy-channel']);const login=await call('login',{email:'b@example.test',password:'Test-only-password-456'});assert.deepEqual((await call('favorites',undefined,login.cookie)).body.items,[]);assert.equal((await call('favorites',{tool:'invalid',saved:true})).status,400);assert.equal((await call('run',{tool:'music',input:'test'})).status,501);});
 await t.test('Saved channel belongs to the signed-in user',async()=>{assert.equal((await call('channel',{channel:'@GoogleDevelopers'})).status,200);assert.equal((await call('channel')).body.channel,'@GoogleDevelopers');const login=await call('login',{email:'b@example.test',password:'Test-only-password-456'});assert.equal((await call('channel',undefined,login.cookie)).body.channel,null);assert.equal((await call('channel',{channel:'https://evil.test/@name'})).status,400);});
 await t.test('Interest form persisted; missing providers never return fabricated results',async()=>{assert.equal((await call('interest',{email:'test@example.test',name:'Test',message:'Local test',kind:'Affiliate'})).status,201);assert.equal((await db.query('SELECT count(*) AS n FROM shop_interests')).rows[0].n,1);const r=await call('run',{tool:'keyword-research',input:'test'});assert.equal(r.status,503);assert.ok(!('result' in r.body));assert.equal((await call('capabilities')).body.payments,false);});
 await t.test('Logout invalidates session; wrong password rejected',async()=>{assert.equal((await call('logout',{})).status,200);assert.equal((await call('session')).body.user,null);assert.equal((await call('login',{email:'a@example.test',password:'Wrong-password-123456'})).status,401);const r=await call('login',{email:'a@example.test',password:'Test-only-password-123'});assert.equal(r.status,200);});
 } finally {await new Promise(r=>server.close(r));await db.close();}
});
test('Provider adapters require configuration and validate video IDs',async()=>{await assert.rejects(()=>gemini('test','topic-research',{},{}),{status:503});await assert.rejects(()=>youtube('spy-video','test',null,1,{}),{status:503});assert.equal(videoId('https://youtu.be/dQw4w9WgXcQ'),'dQw4w9WgXcQ');assert.throws(()=>videoId('https://evil.test/v'),{status:400});});
import {generateKeyPairSync,sign} from 'node:crypto';
import {googleStart,googleIdentity} from './google.mjs';
test('Google OAuth binds state, verifies signed identity, refuses account takeover and replay',async()=>{
 const db=new PGlite();await db.exec(await readFile(new URL('./schema.sql',import.meta.url),'utf8'));
 const {privateKey,publicKey}=generateKeyPairSync('rsa',{modulusLength:2048});const jwk={...publicKey.export({format:'jwk'}),kid:'test-key'};
 const env={GOOGLE_CLIENT_ID:'test-client',GOOGLE_CLIENT_SECRET:'test-secret',GOOGLE_REDIRECT_URI:'http://localhost/api/shop/google/callback'};let claims={};
 const fakeFetch=async url=>({ok:true,json:async()=>{if(url.endsWith('/certs'))return {keys:[jwk]};const h=Buffer.from(JSON.stringify({alg:'RS256',kid:'test-key'})).toString('base64url'),p=Buffer.from(JSON.stringify(claims)).toString('base64url');return {id_token:h+'.'+p+'.'+sign('RSA-SHA256',Buffer.from(h+'.'+p),privateKey).toString('base64url')};}});
 const server=await createApp(db,{origins:['http://localhost'],secure:false,env,googleFetch:fakeFetch});await new Promise(r=>server.listen(0,'127.0.0.1',r));const base='http://127.0.0.1:'+server.address().port;
 const start=async()=>{const r=await fetch(base+'/api/shop/google/start',{method:'POST',headers:{Origin:'http://localhost','Content-Type':'application/json'},body:'{}'});assert.equal(r.status,200);const u=new URL((await r.json()).url);assert.equal(u.searchParams.get('code_challenge_method'),'S256');assert.equal(u.searchParams.get('scope'),'openid email profile');return {state:u.searchParams.get('state'),nonce:u.searchParams.get('nonce'),cookie:r.headers.get('set-cookie').split(';')[0]};};
 const callback=flow=>fetch(base+'/api/shop/google/callback?state='+flow.state+'&code=test',{headers:{Cookie:flow.cookie},redirect:'manual'});
 try{let flow=await start();let r=await callback({...flow,cookie:''});assert.ok(r.headers.get('location').endsWith('google_error=failed'));assert.equal((await db.query('SELECT count(*) n FROM shop_users')).rows[0].n,0);
 claims={iss:'https://accounts.google.com',aud:'test-client',sub:'google-person',email:'person@gmail.com',email_verified:true,name:'Google Test',nonce:flow.nonce,iat:Math.floor(Date.now()/1000),exp:Math.floor(Date.now()/1000)+600};r=await callback(flow);assert.ok(r.headers.get('location').endsWith('/dashboard'));assert.ok(r.headers.get('set-cookie').includes('ptshop_session='));assert.equal((await db.query('SELECT count(*) n FROM shop_users')).rows[0].n,1);assert.ok((await callback(flow)).headers.get('location').endsWith('google_error=failed'));
 flow=await start();claims={...claims,nonce:'wrong'};assert.ok((await callback(flow)).headers.get('location').endsWith('google_error=failed'));
 await db.query("INSERT INTO shop_users(email,name,password_hash) VALUES('existing@gmail.com','Existing','unused')");flow=await start();claims={...claims,nonce:flow.nonce,sub:'different-person',email:'existing@gmail.com'};assert.ok((await callback(flow)).headers.get('location').endsWith('google_error=email_exists'));assert.equal((await db.query("SELECT google_sub FROM shop_users WHERE email='existing@gmail.com'")).rows[0].google_sub,null);
 const f=googleStart({id:'test-client',redirect:env.GOOGLE_REDIRECT_URI});claims={...claims,nonce:f.nonce,aud:'wrong-client'};await assert.rejects(()=>googleIdentity('test',f,{id:'test-client',redirect:env.GOOGLE_REDIRECT_URI},fakeFetch),{status:401});
 }finally{await new Promise(r=>server.close(r));await db.close();}
});
import {channelFilter} from './providers.mjs';
test('YouTube resolves handles and URLs through channels.list, rejects other hosts and missing channels',async()=>{
 assert.deepEqual(channelFilter('@axcenhotview'),{forHandle:'@axcenhotview'});assert.deepEqual(channelFilter('https://www.youtube.com/@axcenhotview/videos'),{forHandle:'@axcenhotview'});assert.throws(()=>channelFilter('https://evil.test/@handle'),{status:400});
 let requested;const mock=async url=>{requested=new URL(url);return {ok:true,json:async()=>({items:[{id:'UC1234567890123456789012',snippet:{title:'Test channel'},statistics:{viewCount:'10'}}]})};};
 const result=await youtube('spy-channel','@axcenhotview',null,1,{YOUTUBE_API_KEY:'test-only'},mock);assert.equal(requested.searchParams.get('forHandle'),'@axcenhotview');assert.equal(requested.searchParams.has('key'),false);assert.equal(result.result.items[0].snippet.title,'Test channel');assert.equal(result.result.source,'YouTube Data API v3');
 await assert.rejects(()=>youtube('spy-channel','@missing',null,1,{YOUTUBE_API_KEY:'test-only'},async()=>({ok:true,json:async()=>({items:[]})})),{status:404});
});
test('PtIQ keyword statistics, competitor comparison and outlier baseline use returned data',async()=>{
 const mock=async value=>{const u=new URL(value),resource=u.pathname.split('/').at(-1);let data;
 if(resource==='search')data={items:[{id:{videoId:'dQw4w9WgXcQ'}}]};
 else if(resource==='channels')data={items:[{id:'UC_x5XG1OV2P6uZZ5FSM9Ttw',snippet:{title:u.searchParams.get('forHandle')},contentDetails:{relatedPlaylists:{uploads:'uploads'}}}]};
 else if(resource==='playlistItems')data={items:[1,2,3,4,5].map(n=>({contentDetails:{videoId:'video'+n}}))};
 else data={items:[1,2,3,4,5].map(n=>({id:'video'+n,snippet:{title:'Video '+n},statistics:{viewCount:String(n*100)}}))};
 return {ok:true,json:async()=>data};};
 const env={YOUTUBE_API_KEY:'test-only'};assert.equal((await youtube('keyword-research','test',null,1,env,mock)).result.items[0].statistics.viewCount,'100');
 assert.equal((await youtube('spy-competitors','@channelone\n@channeltwo',null,1,env,mock)).result.items.length,2);
 await assert.rejects(()=>youtube('spy-competitors','@one\n@two\n@three\n@four\n@five\n@six',null,1,env,mock),{status:400});
 const data=(await youtube('outliers','@channelone',null,1,env,mock)).result;assert.equal(data.baseline.medianViews,300);assert.equal(data.items[0].relativeViews,1.67);assert.equal(data.items[0].id,'video5');
});
