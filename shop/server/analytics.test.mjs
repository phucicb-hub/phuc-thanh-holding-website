import {test} from 'node:test';
import assert from 'node:assert/strict';
import {analyticsOwner,analyticsReader} from './analytics.mjs';
import {createApp} from './app.mjs';
test('Analytics HTTP requires verified owner session and rejects writes',async()=>{
 let user={id:1,email:'info@phucthanhholding.com',name:'Owner',must_change_password:false};
 const db={query:async sql=>({rows:sql.includes('SELECT u.id')?[user]:[{count:1}]})};
 const server=await createApp(db,{secure:false,origins:['http://test.local'],env:{}});
 await new Promise(r=>server.listen(0,'127.0.0.1',r));
 const url='http://127.0.0.1:'+server.address().port+'/api/shop/admin/analytics';
 const headers={Cookie:'ptshop_session='+'a'.repeat(64),Origin:'http://test.local','Content-Type':'application/json'};
 try{
  assert.equal((await fetch(url)).status,401);
  user.email='info@phucthanhholding.com';assert.equal((await fetch(url,{headers})).status,403);
  user.email='normal@example.test';assert.equal((await fetch(url,{headers})).status,403);
  user.email='info@phucthanhholding.com';assert.equal((await fetch(url,{headers,method:'POST',body:'{}'})).status,405);
  assert.equal((await fetch(url+'?days=999',{headers})).status,400);
  assert.equal((await fetch(url,{headers})).status,503);
  user.must_change_password=true;assert.equal((await fetch(url,{headers})).status,403);
 }finally{await new Promise(r=>server.close(r));}
});
test('Analytics limits owner, dates, upstream paths and private credentials',async()=>{
 assert.equal(analyticsOwner({email:'info@phucthanhholding.com'}),false);
 assert.equal(analyticsOwner({email:'info@phucthanhholding.com'}),true);
 const env={ANALYTICS_PASSWORD:'private-password',ANALYTICS_COMPANY_ID:'2afca2f5-1b0e-48e3-847e-a3d4ee9aea08',ANALYTICS_SHOP_ID:'474f25d8-f8c6-4b27-92c5-27f213569f1b'};
 let logins=0,fail=false,expired=false;
 const mock=async(url,opt)=>{assert.ok(url.startsWith('http://pt-analytics:3000/api/'));if(url.endsWith('auth/login')){logins++;assert.equal(JSON.parse(opt.body).password,env.ANALYTICS_PASSWORD);return Response.json({token:'private-token'});}assert.equal(opt.headers.Authorization,'Bearer private-token');if(expired){expired=false;return new Response('',{status:401});}if(fail)return new Response('',{status:500});return Response.json(url.endsWith('/active')?{visitors:1}:{visitors:2,visits:3,pageviews:4});};
 const read=analyticsReader(env,mock);const result=await read(7);assert.equal(logins,1);assert.equal(result.sites.length,2);assert.equal(result.sites[0].online,1);assert.ok(!JSON.stringify(result).includes('private-'));expired=true;await read(1);assert.ok(logins>=2);await assert.rejects(()=>read(999),e=>e.status===400);fail=true;await assert.rejects(()=>read(30),e=>e.status===503&&!e.message.includes('private-'));
 const bad=analyticsReader(env,async url=>Response.json(url.endsWith('auth/login')?{token:'x'}:{}));await assert.rejects(()=>bad(7),e=>e.status===503);
});
