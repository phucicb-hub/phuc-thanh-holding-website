import {consentText} from './marketing.mjs';
import {randomBytes,createHash} from 'node:crypto';
import {emailReady,sendVerification} from './email.mjs';
import {failure} from './providers.mjs';
const digest=value=>createHash('sha256').update(value).digest('hex');
export async function pendingVerification(db,rate,env,{email,name,passwordHash=null,userId=null,marketingConsent=false},mailer=sendVerification) {
  if (!emailReady(env)) throw failure(503,'Gửi thư xác minh chưa được cấu hình. Bạn có thể đăng nhập Google.');
  await rate('verification-email:'+email,3,3600);
  await rate('verification-global',100,3600);
  const token=randomBytes(32).toString('hex');
  await db.query("INSERT INTO shop_email_verifications(token_hash,email,name,password_hash,user_id,marketing_consent,expires_at) VALUES($1,$2,$3,$4,$5,$6,now()+interval '30 minutes')",[digest(token),email,name,passwordHash,userId,marketingConsent===true]);
  try { await mailer({email,token},env); }
  catch(e) { await db.query('DELETE FROM shop_email_verifications WHERE token_hash=$1',[digest(token)]);throw e; }
  return {verificationRequired:true,message:'Nếu email có thể đăng ký, thư xác minh đã được gửi. Kiểm tra hộp thư và Spam; liên kết hiệu lực 30 phút.'};
}
export async function verifyEmail(db,token) {
  if(typeof token!=='string'||!/^[a-f0-9]{64}$/.test(token))throw failure(400,'Liên kết xác minh không hợp lệ.');
  const client=db.connect?await db.connect():db;
  try {
    await client.query('BEGIN');
    const record=(await client.query('DELETE FROM shop_email_verifications WHERE token_hash=$1 AND expires_at>now() RETURNING *',[digest(token)])).rows[0];
    if(!record)throw failure(400,'Liên kết đã hết hạn hoặc đã sử dụng. Hãy yêu cầu thư mới.');
    if(record.user_id)await client.query('UPDATE shop_users SET email_verified_at=now(),registration_notify_pending=true WHERE id=$1 AND email=$2',[record.user_id,record.email]);
    else await client.query(`INSERT INTO shop_users(email,name,password_hash,email_verified_at,marketing_consent,marketing_updated_at,marketing_consent_text,marketing_source,registration_notify_pending) VALUES($1,$2,$3,now(),$4,CASE WHEN $4 THEN now() ELSE NULL END,CASE WHEN $4 THEN $5 ELSE NULL END,'email-registration',true) ON CONFLICT(email) DO NOTHING`,[record.email,record.name,record.password_hash,record.marketing_consent,consentText]);
    await client.query('DELETE FROM shop_email_verifications WHERE email=$1',[record.email]);
    await client.query('COMMIT');
    return {ok:true,message:'Email đã được xác minh. Hãy đăng nhập bằng phương thức đã đăng ký.'};
  } catch(e) {await client.query('ROLLBACK');throw e;}
  finally {if(client!==db)client.release();}
}
