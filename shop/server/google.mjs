import {createHash,randomBytes,createPublicKey,verify} from 'node:crypto';
import {failure} from './providers.mjs';
export const sha=value=>createHash('sha256').update(value).digest('hex');
export function googleConfig(env,origins){
 if(!env.GOOGLE_CLIENT_ID||!env.GOOGLE_CLIENT_SECRET||!env.GOOGLE_REDIRECT_URI)throw failure(503,'Đăng nhập Google chưa được cấu hình tại máy chủ.');
 const url=new URL(env.GOOGLE_REDIRECT_URI);
 if(!origins.includes(url.origin)||url.pathname!=='/api/shop/google/callback'||url.search||url.hash||(url.protocol!=='https:'&&!['localhost','127.0.0.1'].includes(url.hostname)))throw failure(503,'Cấu hình callback Google không hợp lệ.');
 return {id:env.GOOGLE_CLIENT_ID,secret:env.GOOGLE_CLIENT_SECRET,redirect:url.href,origin:url.origin};
}
export function googleStart(config){
 const state=randomBytes(32).toString('hex'),nonce=randomBytes(32).toString('hex'),verifier=randomBytes(32).toString('base64url');
 const url=new URL('https://accounts.google.com/o/oauth2/v2/auth');
 url.search=new URLSearchParams({client_id:config.id,redirect_uri:config.redirect,response_type:'code',scope:'openid email profile',state,nonce,code_challenge:Buffer.from(sha(verifier),'hex').toString('base64url'),code_challenge_method:'S256',prompt:'select_account'}).toString();
 return {state,nonce,verifier,url:url.href};
}
export async function googleIdentity(code,record,config,fetcher=fetch){
 async function request(url,options){const r=await fetcher(url,{...options,signal:AbortSignal.timeout(15000)});if(!r.ok)throw failure(401,'Không thể xác minh đăng nhập Google.');return r.json();}
 const tokens=await request('https://oauth2.googleapis.com/token',{method:'POST',headers:{'Content-Type':'application/x-www-form-urlencoded'},body:new URLSearchParams({client_id:config.id,client_secret:config.secret,redirect_uri:config.redirect,grant_type:'authorization_code',code,code_verifier:record.verifier})});
 try{
 const pieces=tokens.id_token.split('.');if(pieces.length!==3)throw Error();
 const head=JSON.parse(Buffer.from(pieces[0],'base64url')),claims=JSON.parse(Buffer.from(pieces[1],'base64url'));
 if(head.alg!=='RS256'||typeof head.kid!=='string')throw Error();
 const jwks=await request('https://www.googleapis.com/oauth2/v3/certs');const jwk=jwks.keys.find(k=>k.kid===head.kid&&k.kty==='RSA');if(!jwk||!verify('RSA-SHA256',Buffer.from(pieces[0]+'.'+pieces[1]),createPublicKey({key:jwk,format:'jwk'}),Buffer.from(pieces[2],'base64url')))throw Error();
 const now=Date.now()/1000;if(!['accounts.google.com','https://accounts.google.com'].includes(claims.iss)||claims.aud!==config.id||claims.nonce!==record.nonce||!(claims.exp>now)||!(claims.iat<=now+60)||claims.email_verified!==true||typeof claims.sub!=='string'||!claims.sub||claims.sub.length>255||typeof claims.email!=='string'||! /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(claims.email))throw Error();
 return {sub:claims.sub,email:claims.email.toLowerCase().slice(0,254),name:typeof claims.name==='string'?claims.name.slice(0,100):claims.email.split('@')[0]};
 }catch{throw failure(401,'Không thể xác minh tài khoản Google.');}
}
