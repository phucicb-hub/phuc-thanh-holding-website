import {mailTransport,emailReady} from './email.mjs';
export const consentText='Tôi đồng ý nhận tin cập nhật sản phẩm, hướng dẫn và ưu đãi từ Phúc Thành Holding. Tôi có thể hủy đăng ký bất cứ lúc nào.';
export const adminEmails=['info@phucthanhholding.com','phuclv@phucthanhholding.com'];
export const isAdmin=user=>!!user&&adminEmails.includes(user.email.toLowerCase());
export function csvCell(value){let s=String(value??'');if(/^[\s]*[=+@-]/.test(s)||/^[\t\r\n]/.test(s))s="'"+s;return '"'+s.replaceAll('"','""')+'"';}
export function marketingCsv(rows){return '\uFEFF'+[['Họ tên','Email','Ngày đăng ký','Ngày đồng ý','Nguồn','Nội dung đồng ý'],...rows.map(u=>[u.name,u.email,u.created_at,u.marketing_updated_at,u.marketing_source,u.marketing_consent_text])].map(r=>r.map(csvCell).join(',')).join('\r\n');}
let notifying=false;
export async function notifyRegistrations(db,env,mailer){
 if(notifying||(!mailer&&!emailReady(env)))return;
 notifying=true;
 let transport;
 try{
  const users=(await db.query('SELECT id,name,email,created_at,marketing_consent FROM shop_users WHERE registration_notify_pending=true AND email_verified_at IS NOT NULL ORDER BY id LIMIT 20')).rows;
  if(!users.length)return;
  if(!mailer)transport=mailTransport(env);
  for(const u of users){
   try{
    const message={from:env.SMTP_FROM,to:adminEmails,subject:'Người dùng mới đã xác minh · Phúc Thành AI Shop',text:`Người dùng đã đăng ký và xác minh email.\nHọ tên: ${u.name}\nEmail: ${u.email}\nNgày đăng ký: ${new Date(u.created_at).toISOString()}\nĐồng ý nhận tin: ${u.marketing_consent?'Có':'Không'}\n\nQuản lý: https://shop.phucthanhholding.com/dashboard?view=users\nChỉ dùng danh sách đã đồng ý cho email marketing.`};
    const delivery=await (mailer?mailer(message):transport.sendMail(message));
    if(delivery?.rejected?.length)throw Error('Recipient rejected');
    await db.query('UPDATE shop_users SET registration_notify_pending=false,registration_notified_at=now() WHERE id=$1',[u.id]);
   }catch{console.error('Registration notification failed; retry queued');}
  }
 }finally{transport?.close();notifying=false;}
}
