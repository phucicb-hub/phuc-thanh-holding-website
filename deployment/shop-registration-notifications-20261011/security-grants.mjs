export async function provision(admin,{shop,schema,runtimePassword}) {
 const database=shop?'shop':'phucthanhholding',role=shop?'shop_runtime':'website_runtime';
const grants=shop?{
 shop_users:'SELECT, INSERT, UPDATE',shop_sessions:'SELECT, INSERT, DELETE',shop_history:'SELECT, INSERT, DELETE',
 shop_interests:'SELECT, INSERT, DELETE',shop_rates:'SELECT, INSERT, UPDATE, DELETE',shop_measurements:'SELECT, INSERT, DELETE',
 shop_oauth_states:'SELECT, INSERT, DELETE',shop_user_channels:'SELECT, INSERT, UPDATE',
 shop_favorites:'SELECT, INSERT, DELETE',shop_email_verifications:'SELECT, INSERT, DELETE'
}:{admin_users:'SELECT',admin_sessions:'SELECT, INSERT, DELETE',records:'SELECT, INSERT, UPDATE, DELETE',
 contact_submissions:'SELECT, INSERT',rate_limits:'SELECT, INSERT, UPDATE, DELETE',admin_audit_log:'INSERT'};
try {
 await admin.query('BEGIN');
 if(admin.exec)await admin.exec(schema);else await admin.query(schema);
 if(!(await admin.query('SELECT 1 FROM pg_roles WHERE rolname=$1',[role])).rows.length)await admin.query(`CREATE ROLE ${role} LOGIN`);
 await admin.query(`ALTER ROLE ${role} NOSUPERUSER NOCREATEDB NOCREATEROLE NOINHERIT NOREPLICATION NOBYPASSRLS`);
 const passwordSql=(await admin.query(`SELECT format('ALTER ROLE ${role} PASSWORD %L',$1::text) AS sql`,[runtimePassword])).rows[0].sql;
 await admin.query(passwordSql);
 await admin.query(`REVOKE ALL ON ALL TABLES IN SCHEMA public FROM ${role}`);
 await admin.query(`REVOKE ALL ON ALL SEQUENCES IN SCHEMA public FROM ${role}`);
 await admin.query('REVOKE CREATE ON SCHEMA public FROM PUBLIC');
 await admin.query(`REVOKE ALL ON SCHEMA public FROM ${role}`);
 await admin.query(`GRANT CONNECT ON DATABASE ${database} TO ${role}`);
 await admin.query(`GRANT USAGE ON SCHEMA public TO ${role}`);
 for(const [table,privileges]of Object.entries(grants)) {
   await admin.query(`GRANT ${privileges} ON TABLE public.${table} TO ${role}`);
   if(privileges.includes('INSERT')) {
     const seq=(await admin.query("SELECT pg_get_serial_sequence('public.'||$1,'id') AS seq WHERE EXISTS(SELECT 1 FROM information_schema.columns WHERE table_schema='public' AND table_name=$1 AND column_name='id')",[table])).rows[0]?.seq;
     if(seq)await admin.query(`GRANT USAGE ON SEQUENCE ${seq} TO ${role}`);
   }
 }
 await admin.query('COMMIT');
}catch(e){await admin.query('ROLLBACK');throw e;}
}
