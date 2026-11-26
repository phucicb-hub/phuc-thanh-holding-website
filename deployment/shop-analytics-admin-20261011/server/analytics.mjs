import {failure} from './providers.mjs';
export const analyticsOwner = user => user?.email === 'phuclv@phucthanhholding.com';
export function analyticsReader(env, request=fetch) {
 let token='',loginPromise;
 const base='http://pt-analytics:3000/api/';
 async function login(){
  if(!env.ANALYTICS_PASSWORD)throw failure(503,'Chưa cấu hình báo cáo truy cập.');
  if(!loginPromise)loginPromise=(async()=>{const r=await request(base+'auth/login',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({username:'phuclv',password:env.ANALYTICS_PASSWORD}),signal:AbortSignal.timeout(8000)});if(!r.ok)throw Error();const d=await r.json();if(typeof d.token!=='string'||!d.token)throw Error();token=d.token;})().finally(()=>{loginPromise=undefined;});
  await loginPromise;
 }
 async function get(path){if(!token)await login();let r=await request(base+path,{headers:{Authorization:'Bearer '+token},signal:AbortSignal.timeout(8000)});if(r.status===401){token='';await login();r=await request(base+path,{headers:{Authorization:'Bearer '+token},signal:AbortSignal.timeout(8000)});}if(!r.ok)throw Error();return r.json();}
 function count(x){if(typeof x==='object'&&x!==null)x=x.value;const n=Number(x);if(x===undefined||x===null||!Number.isFinite(n)||n<0)throw Error();return n;}
 return async days=>{
  if(![1,7,30].includes(days))throw failure(400,'Chọn khoảng thời gian 1, 7 hoặc 30 ngày.');
  const endAt=Date.now(),startAt=endAt-days*86400000;
  try{
   const sites=await Promise.all([['phucthanhholding.com',env.ANALYTICS_COMPANY_ID],['shop.phucthanhholding.com',env.ANALYTICS_SHOP_ID]].map(async([domain,id])=>{
    if(!/^[a-f0-9-]{36}$/.test(id||''))throw Error();
    const [stats,active]=await Promise.all([get(`websites/${id}/stats?startAt=${startAt}&endAt=${endAt}`),get(`websites/${id}/active`)]);
    return {domain,visitors:count(stats.visitors),visits:count(stats.visits),pageviews:count(stats.pageviews),online:count(active.visitors)};
   }));
   return {days,updatedAt:new Date().toISOString(),sites};
  }catch(e){if(e.status)throw e;throw failure(503,'Chưa lấy được số liệu Umami. Vui lòng thử lại sau.');}
 };
}
