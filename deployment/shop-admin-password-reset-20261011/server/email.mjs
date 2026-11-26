import nodemailer from 'nodemailer';
import {failure} from './providers.mjs';

export function emailReady(env) {
  return !!(env.SMTP_HOST && env.SMTP_USER && env.SMTP_PASSWORD && env.SMTP_FROM && env.PUBLIC_SHOP_URL);
}

export function mailTransport(env) {
  if (!emailReady(env)) throw failure(503,'Gửi thư xác minh chưa được cấu hình. Bạn có thể đăng nhập Google.');
  const site = new URL(env.PUBLIC_SHOP_URL);
  if (site.protocol !== 'https:' || site.username || site.password || site.search || site.hash) throw failure(503,'Cấu hình thư xác minh không hợp lệ.');
  const port = Number(env.SMTP_PORT || 587);
  if (![465,587].includes(port)) throw failure(503,'SMTP cần dùng TLS trên cổng 465 hoặc 587.');
  return nodemailer.createTransport({host:env.SMTP_CONNECT_HOST || env.SMTP_HOST,port,secure:port===465,requireTLS:port===587,
    auth:{user:env.SMTP_USER,pass:env.SMTP_PASSWORD},tls:{servername:env.SMTP_HOST,minVersion:'TLSv1.2',rejectUnauthorized:true},
    connectionTimeout:10000,greetingTimeout:10000,socketTimeout:15000});
}

export async function sendVerification({email,token},env) {
  const transport=mailTransport(env);
  const site=new URL(env.PUBLIC_SHOP_URL);
  const url = new URL('/verify-email',site);
  // The fragment is not sent in HTTP requests, Referer headers or access logs.
  url.hash = token;
  try {
    await transport.sendMail({from:env.SMTP_FROM,to:email,subject:'Xác minh email · Phúc Thành AI Shop',
      text:`Bạn vừa yêu cầu xác minh email tại Phúc Thành AI Shop.\n\nMở liên kết và bấm xác nhận (hiệu lực 30 phút, dùng một lần):\n${url.href}\n\nNếu không phải bạn, hãy bỏ qua thư. Không gửi liên kết này cho người khác.`});
  } catch {
    throw failure(503,'Chưa gửi được thư xác minh. Thử lại sau hoặc đăng nhập Google.');
  } finally { transport.close(); }
}

export async function sendTemporaryPassword({email,password},env){
 const transport=mailTransport(env);
 try{const result=await transport.sendMail({from:env.SMTP_FROM,to:email,subject:'Mật khẩu tạm thời · Phúc Thành AI Shop',text:`Quản trị viên vừa cấp lại mật khẩu tài khoản shop của bạn.\n\nMật khẩu tạm thời: ${password}\nHiệu lực 24 giờ. Đăng nhập tại ${new URL('/dashboard/',env.PUBLIC_SHOP_URL).href} và đổi mật khẩu trước khi sử dụng công cụ.\nCác phiên đăng nhập trước đã bị thu hồi. Không chia sẻ mật khẩu. Nếu không mong đợi yêu cầu này, liên hệ info@phucthanhholding.com.`});if(result.rejected?.length)throw Error();}
 catch{throw failure(503,'Chưa gửi được mật khẩu tạm thời; tài khoản chưa thay đổi.');}finally{transport.close();}
}
