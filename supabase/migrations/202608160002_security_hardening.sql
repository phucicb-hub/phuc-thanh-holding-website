alter table if exists public.content_news enable row level security;
alter table if exists public.content_projects enable row level security;
alter table if exists public.content_products enable row level security;

revoke insert, update, delete on public.content_news from anon, authenticated;
revoke insert, update, delete on public.content_projects from anon, authenticated;
revoke insert, update, delete on public.content_products from anon, authenticated;
revoke all on public.order_headers from anon, authenticated;
revoke all on public.order_items from anon, authenticated;

drop policy if exists "public read news" on public.content_news;
create policy "public read news" on public.content_news for select to anon, authenticated using (true);
drop policy if exists "public read projects" on public.content_projects;
create policy "public read projects" on public.content_projects for select to anon, authenticated using (true);
drop policy if exists "public read products" on public.content_products;
create policy "public read products" on public.content_products for select to anon, authenticated using (true);

create table if not exists public.admin_audit_log (
  id bigint generated always as identity primary key,
  actor_id uuid not null,
  action text not null check (action in ('create','update','remove')),
  resource text not null,
  resource_id text,
  created_at timestamptz not null default now()
);
alter table public.admin_audit_log enable row level security;
revoke all on public.admin_audit_log from anon, authenticated;

create table if not exists public.contact_submissions (
  id bigint generated always as identity primary key, name text not null, email text not null,
  phone text, organization text, field text, message text not null, language text,
  ip_hash text not null, created_at timestamptz not null default now()
);
create index if not exists contact_submissions_rate_idx on public.contact_submissions(ip_hash, created_at desc);
alter table public.contact_submissions enable row level security;
revoke all on public.contact_submissions from anon, authenticated;
