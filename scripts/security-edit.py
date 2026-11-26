from pathlib import Path

def edit(file, old, new):
    path = Path(file)
    content = path.read_text(encoding='utf-8')
    if old not in content:
        raise SystemExit('Marker not found: '+file)
    path.write_text(content.replace(old,new,1),encoding='utf-8')

edit('shop/server/app.mjs', "import {processMedia", "import {emailReady,sendVerification} from './email.mjs';\nimport {pendingVerification,verifyEmail} from './verification.mjs';\nimport {processMedia")
edit('shop/server/app.mjs', 'googleFetch=fetch}={})', 'googleFetch=fetch,verificationMailer=sendVerification}={})')
edit('shop/server/app.mjs', 'WHERE s.token_hash=$1 AND s.expires_at>now()', 'WHERE s.token_hash=$1 AND s.expires_at>now() AND u.email_verified_at IS NOT NULL')
edit('shop/server/app.mjs', 'INSERT INTO shop_users(email,name,google_sub) VALUES($1,$2,$3)', 'INSERT INTO shop_users(email,name,google_sub,email_verified_at) VALUES($1,$2,$3,now())')
edit('shop/server/app.mjs', "if(path==='/api/shop/tools'", "if(path==='/api/shop/auth/config'&&!post)return send(200,{emailRegistration:emailReady(env)});\nif(path==='/api/shop/verify-email'&&post){await rate('verification-ip:'+ip,12,900);return send(200,await verifyEmail(db,body.token));}\nif(path==='/api/shop/tools'")
p=Path('shop/server/app.mjs');s=p.read_text(encoding='utf-8')
a=s.index("if(['/api/shop/register','/api/shop/login']")
b=s.index("if(path==='/api/shop/logout'",a)
s=s[:a]+r"""if(['/api/shop/register','/api/shop/login'].includes(path)&&post){
await rate('auth:'+ip,12,900);
const email=clean(body.email,254).toLowerCase();
if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)||typeof body.password!=='string'||body.password.length<14||body.password.length>128)throw failure(400,'Email hợp lệ và mật khẩu 14–128 ký tự là bắt buộc.');
await rate('auth-email:'+email,10,900);
const record=(await db.query('SELECT * FROM shop_users WHERE email=$1',[email])).rows[0];
if(path.endsWith('register')){
 const name=clean(body.name,100);if(!name)throw failure(400,'Nhập họ tên.');
 if(!emailReady(env))throw failure(503,'Gửi thư xác minh chưa được cấu hình. Bạn có thể đăng nhập Google.');
 const passwordHash=await hash(body.password);
 if(record)return send(202,{verificationRequired:true,message:'Nếu email có thể đăng ký, thư xác minh đã được gửi. Nếu đã có tài khoản, hãy đăng nhập.'});
 return send(202,await pendingVerification(db,rate,env,{email,name,passwordHash},verificationMailer));
}
if(!await verify(body.password,record?.password_hash||dummy)||!record)throw failure(401,'Email hoặc mật khẩu không đúng.');
if(!record.email_verified_at)return send(202,await pendingVerification(db,rate,env,{email,name:record.name,userId:record.id},verificationMailer));
const user={id:record.id,email:record.email,name:record.name},token=randomBytes(32).toString('hex');
await db.query("INSERT INTO shop_sessions(token_hash,user_id,expires_at) VALUES($1,$2,now()+interval '8 hours')",[digest(token),user.id]);
return send(200,{user},{'Set-Cookie':cookie(token,28800)});
}
"""+s[b:]
p.write_text(s,encoding='utf-8')
edit('shop/server/index.mjs', "import {readFile}", "import {cleanup} from './cleanup.mjs';\nimport {readFile}")
edit('shop/server/index.mjs', 'new pg.Pool({connectionString:process.env.DATABASE_URL,max:10})','new pg.Pool({connectionString:process.env.DATABASE_URL,max:10,connectionTimeoutMillis:5000,statement_timeout:15000})')
edit('shop/server/index.mjs', 'if(db.exec)await db.exec(schema);else await db.query(schema);', "if(process.env.RUN_MIGRATIONS!=='false'){if(db.exec)await db.exec(schema);else await db.query(schema);}")
edit('shop/server/index.mjs', "const timer=setInterval(()=>db.query('DELETE FROM shop_sessions WHERE expires_at<now()').catch(()=>{}),3600000);timer.unref();", "const timer=setInterval(()=>cleanup(db,process.env).catch(()=>console.error('Shop cleanup failed')),3600000);timer.unref();")
edit('server/index.mjs', 'await migrate(db);', "if(process.env.RUN_MIGRATIONS!=='false')await migrate(db);")
print('SECURITY_SOURCE_UPDATED')
