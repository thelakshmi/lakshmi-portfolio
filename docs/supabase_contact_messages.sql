-- ----------------------------------------------------------------
-- Anonymous contact messages — portfolio Contact section.
-- Run once in the Supabase Dashboard -> SQL Editor -> New query -> Run.
--
-- Public (anon key) permissions created here:
--   * INSERT only, through Row Level Security.
--   * No SELECT policy exists, so nobody using the public website can
--     read anyone else's messages.
--   * No UPDATE or DELETE policies exist.
--
-- The client only needs these environment variables in .env.local:
--   NEXT_PUBLIC_SUPABASE_URL
--   NEXT_PUBLIC_SUPABASE_ANON_KEY
-- Never ship the service_role key to the browser.
-- ----------------------------------------------------------------

create table if not exists public.contact_messages (
  id         uuid primary key default gen_random_uuid(),
  message    text not null
               check (char_length(btrim(message)) between 1 and 500),
  created_at timestamptz not null default now()
);

alter table public.contact_messages enable row level security;

drop policy if exists "anonymous messages can be inserted"
  on public.contact_messages;

create policy "anonymous messages can be inserted"
  on public.contact_messages
  for insert
  to anon
  with check (true);

-- Intentionally NO select/update/delete policy:
-- with RLS enabled and no such policy, those operations are denied
-- for the anon (public) role, so messages can be written but never read.
