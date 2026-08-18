-- Migration 202608160003: Data Retention & Cleanup Procedures
-- Provides explicit, safe function to purge contact submissions and audit logs older than a configurable threshold.

create or replace function public.purge_old_submissions_and_logs(retention_days integer default 365)
returns table(deleted_submissions bigint, deleted_audit_logs bigint)
language plpgsql security definer set search_path=public as $$
declare
  sub_count bigint := 0;
  audit_count bigint := 0;
  cutoff_date timestamptz;
begin
  cutoff_date := now() - (retention_days || ' days')::interval;

  with deleted as (
    delete from public.contact_submissions
    where created_at < cutoff_date
    returning id
  )
  select count(*) into sub_count from deleted;

  with deleted_audit as (
    delete from public.admin_audit_log
    where created_at < cutoff_date
    returning id
  )
  select count(*) into audit_count from deleted_audit;

  return query select sub_count, audit_count;
end;
$$;

revoke all on function public.purge_old_submissions_and_logs(integer) from anon, authenticated;
