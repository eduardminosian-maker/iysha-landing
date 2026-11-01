-- IYSHA landing statistics: run ONCE in a NEW Supabase project (SQL Editor -> paste -> Run).
-- Before running, replace  CHANGE_ME_PASSWORD  with the password for the /stats page (one place, near the bottom).

create extension if not exists pgcrypto with schema extensions;

create table if not exists public.site_events (
  id        bigint generated always as identity primary key,
  created_at timestamptz not null default now(),
  visit     text not null,        -- random id of one visit (one tab), links the visit with its clicks
  kind      text not null check (kind in ('visit', 'apply_open', 'apply_click')),
  path      text not null,        -- which page
  source    text not null,        -- Instagram / Facebook / Threads / Telegram / Google / ... / Напрямую
  referrer  text,                 -- the full address the person came from, if the browser told it
  tag       text,                 -- the ?s=... label from the link, if any
  device    text                  -- phone / computer / tablet
);

alter table public.site_events enable row level security;

-- Anyone can ADD a record, nobody can read the table directly.
drop policy if exists "site can add events" on public.site_events;
create policy "site can add events" on public.site_events for insert to anon with check (true);
revoke all on public.site_events from anon, authenticated;
grant insert on public.site_events to anon;

-- The password for /stats is kept only as a hash.
create table if not exists public.stats_secret (hash text not null);
alter table public.stats_secret enable row level security;
revoke all on public.stats_secret from anon, authenticated;
delete from public.stats_secret;
insert into public.stats_secret (hash) values (extensions.crypt('CHANGE_ME_PASSWORD', extensions.gen_salt('bf')));

-- The /stats page reads through this function, and only with the right password.
create or replace function public.stats_get(pw text, days int default 30)
returns json
language plpgsql
security definer
set search_path = public, extensions
as $$
begin
  if not exists (select 1 from public.stats_secret where hash = extensions.crypt(pw, hash)) then
    return null;
  end if;
  return (
    select coalesce(json_agg(e order by e.created_at desc), '[]'::json)
    from (
      select created_at, visit, kind, path, source, referrer, tag, device
      from public.site_events
      where created_at > now() - make_interval(days => least(greatest(days, 1), 365))
      order by created_at desc
      limit 5000
    ) e
  );
end;
$$;
revoke all on function public.stats_get(text, int) from public;
grant execute on function public.stats_get(text, int) to anon;
