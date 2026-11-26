import {consentText,isAdmin,marketingCsv} from './marketing.mjs';
import {emailReady,sendVerification,sendTemporaryPassword} from './email.mjs';
import {pendingVerification,verifyEmail} from './verification.mjs';
import {processMedia,mediaTools} from './media.mjs';
import {toolRegistry} from './tools.mjs';
import {googleConfig,googleStart,googleIdentity,sha} from './google.mjs';
import {createServer} from 'node:http';
import {randomBytes,createHash,scrypt,timingSafeEqual} from 'node:crypto';
import {promisify} from 'node:util';
import {failure,channelFilter,textTools,youtubeTools,gemini,youtube,speech,image} from './providers.mjs';
const derive=promisify(scrypt),digest=x=>createHash('sha256').update(x).digest('hex');
async function hash(password){const salt=randomBytes(16).toString('hex');return salt+':'+(await derive(password,salt,64,{N:32768,maxmem:64*1024*1024})).toString('hex');}
async function verify(password,stored){if(typeof password!=='string'||password.length>128)return false;const [salt,key]=stored.split(':');const actual=await derive(password,salt,64,{N:32768,maxmem:64*1024*1024});return timingSafeEqual(actual,Buffer.from(key,'hex'));}
export async function createApp(db,{origins=['https://shop.phucthanhholding.com'],secure=true,env=process.env,googleFetch=fetch,verificationMailer=sendVerification,passwordMailer=sendTemporaryPassword}={}){
const dummy=await hash(randomBytes(20).toString('hex'));const cookie=(token,age)=>`ptshop_session=${token}; Path=/api/shop; HttpOnly; SameSite=Strict; Max-Age=${age}${secure?'; Secure':''}`;
const readUser=async req=>{const token=req.headers.cookie?.match(/(?:^|;\s*)ptshop_session=([a-f0-9]{64})(?:;|$)/)?.[1];if(!token)return null;return(await db.query('SELECT u.id,u.email,u.name,u.must_change_password,u.temporary_password_expires_at FROM shop_sessions s JOIN shop_users u ON u.id=s.user_id WHERE s.token_hash=$1 AND s.expires_at>now() AND u.email_verified_at IS NOT NULL',[digest(token)])).rows[0]||null;};
const rate=async(key,max,seconds)=>{const r=await db.query("INSERT INTO shop_rates(key,count,expires_at) VALUES($1,1,now()+($2::int*interval '1 second')) ON CONFLICT(key) DO UPDATE SET count=CASE WHEN shop_rates.expires_at<=now() THEN 1 ELSE shop_rates.count+1 END,expires_at=CASE WHEN shop_rates.expires_at<=now() THEN EXCLUDED.expires_at ELSE shop_rates.expires_at END RETURNING count",[digest(key),seconds]);if(r.rows[0].count>max)throw failure(429,'Quá nhiều yêu cầu. Vui lòng thử lại sau.');};
return createServer(async(req,res)=>{const send=(status,body,headers={})=>{res.writeHead(status,{'Content-Type':'application/json; charset=utf-8','Cache-Control':'no-store','X-Content-Type-Options':'nosniff',...headers});res.end(JSON.stringify(body));};try{const path=new URL(req.url,'http://shop').pathname;const post=req.method==='POST';if(!['GET','POST'].includes(req.method))throw failure(405,'Phương thức không hỗ trợ.');let body={};if(post){if(!origins.includes(req.headers.origin)||!req.headers['content-type']?.startsWith('application/json'))throw failure(403,'Nguồn yêu cầu không được phép.');const chunks=[];let size=0;for await(const c of req){size+=c.length;if(size>15000000)throw failure(413,'Yêu cầu quá lớn.');chunks.push(c);}try{body=JSON.parse(Buffer.concat(chunks).toString()||'{}');}catch{throw failure(400,'JSON không hợp lệ.');}if(!body||typeof body!=='object'||Array.isArray(body))throw failure(400,'Dữ liệu không hợp lệ.');}
const ip=env.TRUST_PROXY==='true'?(req.headers['x-real-ip']||req.socket.remoteAddress):req.socket.remoteAddress;const clean=(x,max)=>typeof x==='string'?x.trim().slice(0,max):'';
if(path==='/api/shop/health'&&!post){await db.query('SELECT 1');return send(200,{ok:true});}
if(path==='/api/shop/capabilities'&&!post)return send(200,{gemini:!!(env.GEMINI_API_KEY&&env.GEMINI_TEXT_MODEL),youtube:!!env.YOUTUBE_API_KEY,tts:!!(env.GEMINI_API_KEY&&env.GEMINI_TTS_MODEL),image:!!(env.GEMINI_API_KEY&&env.GEMINI_IMAGE_MODEL),enabled:env.ENABLE_PROVIDER_REQUESTS==='true',youtubeEnabled:!!env.YOUTUBE_API_KEY&&(env.ENABLE_PROVIDER_REQUESTS==='true'||env.ENABLE_YOUTUBE_REQUESTS==='true'),geminiEnabled:!!(env.GEMINI_API_KEY&&env.GEMINI_TEXT_MODEL)&&(env.ENABLE_PROVIDER_REQUESTS==='true'||env.ENABLE_GEMINI_REQUESTS==='true'),payments:false});
if(path==='/api/shop/google/config'&&!post){let enabled=false;try{googleConfig(env,origins);enabled=true;}catch{}return send(200,{enabled});}
if(path==='/api/shop/google/start'&&post){await rate('google:'+ip,12,900);const config=googleConfig(env,origins),flow=googleStart(config);await db.query('DELETE FROM shop_oauth_states WHERE expires_at<now()');await db.query("INSERT INTO shop_oauth_states(state_hash,nonce,verifier,marketing_consent,expires_at) VALUES($1,$2,$3,$4,now()+interval '10 minutes')",[sha(flow.state),flow.nonce,flow.verifier,body.marketingConsent===true]);return send(200,{url:flow.url},{'Set-Cookie':`ptshop_oauth=${flow.state}; Path=/api/shop/google; HttpOnly; SameSite=Lax; Max-Age=600${secure?'; Secure':''}`});}
if(path==='/api/shop/google/callback'&&!post){const config=googleConfig(env,origins),query=new URL(req.url,'http://shop').searchParams,state=query.get('state'),bound=req.headers.cookie?.match(/(?:^|;\s*)ptshop_oauth=([a-f0-9]{64})(?:;|$)/)?.[1];const clear=`ptshop_oauth=; Path=/api/shop/google; HttpOnly; SameSite=Lax; Max-Age=0${secure?'; Secure':''}`;const redirect=(error,session)=>{res.writeHead(303,{'Location':config.origin+(error?'/?google_error='+error:'/dashboard'),'Cache-Control':'no-store','Set-Cookie':session?[clear,session]:clear});res.end();};
try{if(!state||state!==bound)throw Error();const record=(await db.query('DELETE FROM shop_oauth_states WHERE state_hash=$1 AND expires_at>now() RETURNING nonce,verifier,marketing_consent',[sha(state)])).rows[0];if(!record||query.has('error')||!query.get('code'))throw Error();const identity=await googleIdentity(query.get('code'),record,config,googleFetch);let user=(await db.query('SELECT id,email,name FROM shop_users WHERE google_sub=$1',[identity.sub])).rows[0];if(!user){const existing=(await db.query('SELECT id FROM shop_users WHERE email=$1',[identity.email])).rows[0];if(existing)return redirect('email_exists');try{user=(await db.query(`INSERT INTO shop_users(email,name,google_sub,email_verified_at,marketing_consent,marketing_updated_at,marketing_consent_text,marketing_source,registration_notify_pending) VALUES($1,$2,$3,now(),$4,CASE WHEN $4 THEN now() ELSE NULL END,CASE WHEN $4 THEN $5 ELSE NULL END,'google-registration',true) RETURNING id,email,name`,[identity.email,identity.name,identity.sub,record.marketing_consent,consentText])).rows[0];}catch(e){if(e.code==='23505')return redirect('email_exists');throw e;}}const token=randomBytes(32).toString('hex');await db.query("INSERT INTO shop_sessions(token_hash,user_id,expires_at) VALUES($1,$2,now()+interval '8 hours')",[digest(token),user.id]);return redirect(null,cookie(token,28800));}catch{return redirect('failed');}}
if(path==='/api/shop/auth/config'&&!post)return send(200,{emailRegistration:emailReady(env)});
if(path==='/api/shop/verify-email'&&post){await rate('verification-ip:'+ip,12,900);return send(200,await verifyEmail(db,body.token));}
if(path==='/api/shop/tools'&&!post)return send(200,{tools:toolRegistry(env)});
if(path==='/api/shop/session'&&!post){const u=await readUser(req);return send(200,{user:u?{...u,isAdmin:isAdmin(u)}:null});};
if(['/api/shop/register','/api/shop/login'].includes(path)&&post){
await rate('auth:'+ip,12,900);
const email=clean(body.email,254).toLowerCase();
if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)||typeof body.password!=='string'||body.password.length<8||body.password.length>128)throw failure(400,'Email hợp lệ và mật khẩu 8–128 ký tự là bắt buộc.');
await rate('auth-email:'+email,10,900);
const record=(await db.query('SELECT * FROM shop_users WHERE email=$1',[email])).rows[0];
if(path.endsWith('register')){
 const name=clean(body.name,100);if(!name)throw failure(400,'Nhập họ tên.');
 if(!emailReady(env))throw failure(503,'Gửi thư xác minh chưa được cấu hình. Bạn có thể đăng nhập Google.');
 const passwordHash=await hash(body.password);
 if(record)return send(202,{verificationRequired:true,message:'Nếu email có thể đăng ký, thư xác minh đã được gửi. Kiểm tra hộp thư và Spam; liên kết hiệu lực 30 phút.'});
 return send(202,await pendingVerification(db,rate,env,{email,name,passwordHash,marketingConsent:body.marketingConsent===true},verificationMailer));
}
if(!await verify(body.password,record?.password_hash||dummy)||!record)throw failure(401,'Email hoặc mật khẩu không đúng.');
if(!record.email_verified_at)return send(202,await pendingVerification(db,rate,env,{email,name:record.name,userId:record.id},verificationMailer));
if(record.must_change_password&&record.temporary_password_expires_at&&new Date(record.temporary_password_expires_at)<=new Date())throw failure(401,'Mật khẩu tạm thời hết hạn; liên hệ quản trị viên cấp lại.');
const user={id:record.id,email:record.email,name:record.name,must_change_password:record.must_change_password},token=randomBytes(32).toString('hex');
await db.query("INSERT INTO shop_sessions(token_hash,user_id,expires_at) VALUES($1,$2,now()+interval '8 hours')",[digest(token),user.id]);
return send(200,{user:{...user,isAdmin:isAdmin(user)}},{'Set-Cookie':cookie(token,28800)});
}
if(path==='/api/shop/logout'&&post){const token=req.headers.cookie?.match(/ptshop_session=([a-f0-9]{64})/)?.[1];if(token)await db.query('DELETE FROM shop_sessions WHERE token_hash=$1',[digest(token)]);return send(200,{ok:true},{'Set-Cookie':cookie('',0)});}
if(path==='/api/shop/interest'&&post){await rate('interest:'+ip,10,3600);const email=clean(body.email,254),name=clean(body.name,100),message=clean(body.message,3000),kind=clean(body.kind,100);if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)||!name||!message||!kind)throw failure(400,'Điền đầy đủ thông tin hợp lệ.');await db.query('INSERT INTO shop_interests(email,name,kind,message) VALUES($1,$2,$3,$4)',[email,name,kind,message]);return send(201,{ok:true});}
const user=await readUser(req);if(!user)throw failure(401,'Bạn cần đăng ký, xác minh email và đăng nhập (hoặc dùng Google) để sử dụng công cụ miễn phí.');
const transaction=async fn=>{if(db.connect){const c=await db.connect();try{await c.query('BEGIN');const result=await fn(c);await c.query('COMMIT');return result;}catch(e){await c.query('ROLLBACK');throw e;}finally{c.release();}}return db.transaction(fn);};
if(path==='/api/shop/password'&&post){
 await rate('password-change:'+user.id,5,900);
 if(typeof body.password!=='string'||body.password.length<8||body.password.length>128)throw failure(400,'Mật khẩu mới cần 8–128 ký tự.');
 const newHash=await hash(body.password);
 await transaction(async c=>{const old=(await c.query('SELECT * FROM shop_users WHERE id=$1 FOR UPDATE',[user.id])).rows[0];if(!await verify(body.currentPassword,old.password_hash||dummy))throw failure(401,'Mật khẩu hiện tại không đúng.');if(old.must_change_password&&old.temporary_password_expires_at&&new Date(old.temporary_password_expires_at)<=new Date())throw failure(401,'Mật khẩu tạm thời hết hạn.');if(await verify(body.password,old.password_hash||dummy))throw failure(400,'Mật khẩu mới phải khác mật khẩu hiện tại.');await c.query('UPDATE shop_users SET password_hash=$2,must_change_password=false,temporary_password_expires_at=NULL WHERE id=$1',[user.id,newHash]);await c.query('DELETE FROM shop_sessions WHERE user_id=$1',[user.id]);await c.query("INSERT INTO shop_password_audit(actor_id,user_id,action) VALUES($1,$1,'password_changed')",[user.id]);});
 return send(200,{ok:true,message:'Đã đổi mật khẩu. Vui lòng đăng nhập lại.'},{'Set-Cookie':cookie('',0)});
}
if(user.must_change_password)throw failure(403,'Bạn cần đổi mật khẩu tạm thời trước khi sử dụng chức năng.');
if(path==='/api/shop/admin/reset-password'&&post){
 if(!isAdmin(user))throw failure(403,'Chỉ quản trị viên được cấp lại mật khẩu.');
 const id=Number(body.userId);if(!Number.isSafeInteger(id)||id<1)throw failure(400,'Tài khoản không hợp lệ.');
 await rate('password-reset-admin:'+user.id,10,3600);await rate('password-reset-target:'+id,3,3600);
 const password=randomBytes(18).toString('base64url'),passwordHash=await hash(password);
 await transaction(async c=>{const target=(await c.query('SELECT * FROM shop_users WHERE id=$1 FOR UPDATE',[id])).rows[0];if(!target)throw failure(404,'Không tìm thấy tài khoản.');if(!target.email_verified_at)throw failure(400,'Chỉ cấp lại mật khẩu cho email đã xác minh.');if(target.google_sub)throw failure(400,'Tài khoản Google dùng cơ chế khôi phục của Google.');if(isAdmin(target))throw failure(403,'Không cấp lại mật khẩu quản trị viên qua chức năng này.');
 await c.query("UPDATE shop_users SET password_hash=$2,must_change_password=true,temporary_password_expires_at=now()+interval '24 hours' WHERE id=$1",[id,passwordHash]);await c.query('DELETE FROM shop_sessions WHERE user_id=$1',[id]);await c.query("INSERT INTO shop_password_audit(actor_id,user_id,action) VALUES($1,$2,'admin_reset')",[user.id,id]);await passwordMailer({email:target.email,password},env);});
 return send(200,{ok:true,message:'Đã gửi mật khẩu tạm thời tới email người dùng; phiên cũ đã thu hồi.'});
}
if(path==='/api/shop/marketing-preference'){
 if(!post)return send(200,(await db.query('SELECT marketing_consent,marketing_updated_at FROM shop_users WHERE id=$1',[user.id])).rows[0]);
 if(typeof body.consent!=='boolean')throw failure(400,'Lựa chọn không hợp lệ.');
 await db.query("UPDATE shop_users SET marketing_consent=$2,marketing_updated_at=now(),marketing_consent_text=$3,marketing_source='account-settings' WHERE id=$1",[user.id,body.consent,consentText]);return send(200,{ok:true});
}
if(path==='/api/shop/admin/users'||path==='/api/shop/admin/marketing.csv'){
 if(!isAdmin(user))throw failure(403,'Chỉ quản trị viên được truy cập.');if(post)throw failure(405,'Chỉ hỗ trợ đọc.');
 await rate('admin-list:'+user.id,60,60);
 if(path.endsWith('.csv')){
  const rows=(await db.query('SELECT name,email,created_at,marketing_updated_at,marketing_source,marketing_consent_text FROM shop_users WHERE marketing_consent=true AND email_verified_at IS NOT NULL ORDER BY id LIMIT 10001')).rows;
  if(rows.length>10000)throw failure(413,'Danh sách vượt 10.000 người; cần xuất theo phân trang.');
  res.writeHead(200,{'Content-Type':'text/csv; charset=utf-8','Content-Disposition':'attachment; filename="shop-marketing-consented.csv"','Cache-Control':'no-store','X-Content-Type-Options':'nosniff'});return res.end(marketingCsv(rows));
 }
 const params=new URL(req.url,'http://shop').searchParams,page=Number(params.get('page')||1);
 if(!Number.isSafeInteger(page)||page<1||page>100000)throw failure(400,'Trang không hợp lệ.');
 const total=Number((await db.query('SELECT count(*) AS n FROM shop_users')).rows[0].n);
 const rows=(await db.query('SELECT id,name,email,created_at,email_verified_at,marketing_consent,marketing_updated_at,registration_notified_at,(google_sub IS NOT NULL) AS google_account,must_change_password FROM shop_users ORDER BY id DESC LIMIT 50 OFFSET $1',[(page-1)*50])).rows;return send(200,{items:rows,total,page});
}
if(path==='/api/shop/favorites'){if(!post)return send(200,{items:(await db.query('SELECT tool FROM shop_favorites WHERE user_id=$1 ORDER BY tool',[user.id])).rows.map(r=>r.tool)});const tool=clean(body.tool,100);if(!toolRegistry(env).some(t=>t.id===tool)||typeof body.saved!=='boolean')throw failure(400,'Công cụ yêu thích không hợp lệ.');if(body.saved)await db.query('INSERT INTO shop_favorites(user_id,tool) VALUES($1,$2) ON CONFLICT DO NOTHING',[user.id,tool]);else await db.query('DELETE FROM shop_favorites WHERE user_id=$1 AND tool=$2',[user.id,tool]);return send(200,{ok:true});}
if(path==='/api/shop/channel'){if(!post)return send(200,{channel:(await db.query('SELECT channel FROM shop_user_channels WHERE user_id=$1',[user.id])).rows[0]?.channel||null});const channel=clean(body.channel,300);channelFilter(channel);await db.query('INSERT INTO shop_user_channels(user_id,channel) VALUES($1,$2) ON CONFLICT(user_id) DO UPDATE SET channel=EXCLUDED.channel',[user.id,channel]);return send(200,{ok:true});}
if(path==='/api/shop/history'){if(!post)return send(200,{items:(await db.query('SELECT id,tool,input,result,created_at FROM shop_history WHERE user_id=$1 ORDER BY id DESC LIMIT 100',[user.id])).rows});const tool=clean(body.tool,100),input=clean(body.input,10000),result=clean(body.result,100000);if(!tool||!result)throw failure(400,'Kết quả không hợp lệ.');await rate('history:'+user.id,100,3600);await db.query('INSERT INTO shop_history(user_id,tool,input,result) VALUES($1,$2,$3,$4)',[user.id,tool,input,result]);return send(201,{ok:true});}
if(path==='/api/shop/run'&&post){const input=clean(body.input,10000),tool=clean(body.tool,100);if(!input&&!body.file&&!body.files?.length)throw failure(400,'Nhập nội dung.');const spec=toolRegistry(env).find(t=>t.id===tool);if(!spec)throw failure(400,'Công cụ không hợp lệ.');if(spec.execution==='unavailable')throw failure(501,'Chưa có dịch vụ xử lý cho công cụ này.');if(spec.execution==='browser')throw failure(400,'Công cụ này đang xử lý tại trình duyệt.');if(!mediaTools.has(tool)&&env.ENABLE_PROVIDER_REQUESTS!=='true'&&!(youtubeTools.has(tool)&&env.ENABLE_YOUTUBE_REQUESTS==='true')&&!((textTools.has(tool)||['transcribe','dubbing'].includes(tool))&&env.ENABLE_GEMINI_REQUESTS==='true'))throw failure(503,'Chưa bật dịch vụ API tại máy chủ. Công cụ xử lý tại trình duyệt vẫn sử dụng được.');await rate('provider-user:'+user.id,Number(env.USER_DAILY_REQUESTS||20),86400);await rate('provider-global',Number(env.GLOBAL_DAILY_REQUESTS||100),86400);let output;if(mediaTools.has(tool))output=await processMedia(tool,{...body,input},env);else if(textTools.has(tool)||['transcribe','dubbing'].includes(tool))output=await gemini(input,tool,body,env);else if(tool==='text-to-speech'||tool==='voice-design')output=await speech(input,env);else if(tool==='image-video')output=await image(input,env);else if(youtubeTools.has(tool))output=await youtube(tool,input,db,user.id,env);else throw failure(503,'Chưa triển khai dịch vụ cho công cụ này.');return send(200,output);}
throw failure(404,'Không tìm thấy chức năng.');}catch(e){if(!e.status)console.error('Shop error',e.code||e.name);send(e.status||500,{error:e.status?e.message:'Không thể xử lý yêu cầu. Kiểm tra log máy chủ.'});}});
}
