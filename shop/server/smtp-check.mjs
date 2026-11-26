import {mailTransport} from './email.mjs';
let transport;
try {
 transport=mailTransport(process.env);
 await transport.verify();
 console.log('SMTP_TLS_AUTH_OK');
}catch(e){console.error('SMTP_CHECK_FAILED='+ (e.code||e.name));process.exitCode=1;}
finally{transport?.close();}
