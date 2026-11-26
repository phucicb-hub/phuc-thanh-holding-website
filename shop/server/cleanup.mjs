function days(env,key,fallback) {
  const value=Number(env[key]??fallback);
  if (!Number.isInteger(value)||value<1||value>3650) throw new Error('Invalid retention: '+key);
  return value;
}
export async function cleanup(db,env={}) {
  const history=days(env,'HISTORY_RETENTION_DAYS',90),measurements=days(env,'MEASUREMENTS_RETENTION_DAYS',30),interests=days(env,'INTERESTS_RETENTION_DAYS',180);
  for (const table of ['shop_sessions','shop_rates','shop_oauth_states','shop_email_verifications']) {
    await db.query(`DELETE FROM ${table} WHERE expires_at<=now()`);
  }
  for (const [table,column,limit] of [['shop_history','created_at',history],['shop_measurements','measured_at',measurements],['shop_interests','created_at',interests]]) {
    await db.query(`DELETE FROM ${table} WHERE ${column}<now()-($1::int*interval '1 day')`,[limit]);
  }
}
