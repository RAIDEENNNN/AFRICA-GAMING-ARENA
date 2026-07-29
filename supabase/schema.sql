-- Africa Gaming Arena Supabase foundation.
-- Apply only after creating the Supabase project. Do not paste service-role keys into SQL.

create extension if not exists "pgcrypto";

create type public.app_role as enum (
  'player',
  'clan_leader',
  'clan_officer',
  'vendor',
  'tournament_organiser',
  'cma_organiser',
  'moderator',
  'administrator'
);

create type public.registration_status as enum (
  'draft',
  'submitted',
  'under_review',
  'approved',
  'rejected',
  'waitlisted',
  'checked_in',
  'qualified',
  'eliminated',
  'winner',
  'disqualified'
);

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  username text unique not null,
  display_name text,
  avatar_url text,
  country text,
  region text,
  primary_game text,
  codm_uid text,
  pubg_uid text,
  free_fire_uid text,
  clan_id uuid,
  role public.app_role not null default 'player',
  rank text,
  ranking_points integer not null default 0,
  is_verified boolean not null default false,
  is_suspended boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.games (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  status text not null default 'active',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.clans (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text unique not null,
  owner_user_id uuid not null references public.profiles(id),
  game_slug text not null references public.games(slug),
  region text,
  status text not null default 'forming',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.profiles add constraint profiles_clan_id_fkey foreign key (clan_id) references public.clans(id);

create table public.tournaments (
  id uuid primary key default gen_random_uuid(),
  organisation_id uuid,
  partner_slug text,
  game_slug text not null references public.games(slug),
  title text not null,
  description text not null default '',
  tournament_type text not null,
  game_mode text not null,
  team_size text not null,
  map_pool jsonb not null default '[]'::jsonb,
  region text,
  server text,
  entry_type text not null default 'free',
  entry_fee numeric(12,2) not null default 0,
  currency text not null default 'DEMO',
  prize_pool text not null default '$0',
  maximum_teams integer,
  registered_teams integer not null default 0,
  registration_open_at timestamptz,
  registration_close_at timestamptz,
  starts_at timestamptz,
  ends_at timestamptz,
  status text not null default 'draft',
  rules text not null default '',
  banner_url text,
  thumbnail_url text,
  featured boolean not null default false,
  created_by uuid not null references public.profiles(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.tournament_registrations (
  id uuid primary key default gen_random_uuid(),
  tournament_id uuid not null references public.tournaments(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  clan_id uuid references public.clans(id),
  registration_type text not null,
  roster jsonb not null default '[]'::jsonb,
  game_uid text not null,
  status public.registration_status not null default 'submitted',
  reviewed_by uuid references public.profiles(id),
  reviewed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.challenges (
  id uuid primary key default gen_random_uuid(),
  creator_user_id uuid not null references public.profiles(id),
  game_slug text not null references public.games(slug),
  match_kind text not null,
  team_size text not null,
  status text not null default 'open',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.match_rooms (
  id uuid primary key default gen_random_uuid(),
  challenge_id uuid not null references public.challenges(id),
  status text not null default 'pending',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.match_messages (
  id uuid primary key default gen_random_uuid(),
  room_id uuid not null references public.match_rooms(id) on delete cascade,
  author_user_id uuid references public.profiles(id),
  body text not null,
  attachment_path text,
  created_at timestamptz not null default now()
);

create table public.notifications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  body text not null,
  read_at timestamptz,
  created_at timestamptz not null default now()
);

create table public.result_evidence (
  id uuid primary key default gen_random_uuid(),
  room_id uuid references public.match_rooms(id),
  tournament_id uuid references public.tournaments(id),
  uploaded_by uuid not null references public.profiles(id),
  bucket text not null,
  object_path text not null,
  mime_type text not null,
  size_bytes integer not null,
  created_at timestamptz not null default now()
);

create table public.weekly_awards (
  id uuid primary key default gen_random_uuid(),
  tournament_id uuid references public.tournaments(id),
  partner_slug text not null default 'cma',
  award_type text not null,
  winner_user_id uuid references public.profiles(id),
  winner_clan_id uuid references public.clans(id),
  metric_label text not null,
  metric_value text not null,
  selected_by uuid not null references public.profiles(id),
  published_at timestamptz,
  created_at timestamptz not null default now()
);

create table public.audit_logs (
  id uuid primary key default gen_random_uuid(),
  actor_user_id uuid references public.profiles(id),
  action text not null,
  entity_type text not null,
  entity_id uuid,
  metadata jsonb,
  created_at timestamptz not null default now()
);

create or replace function public.is_admin()
returns boolean
language sql
stable
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid()
    and role in ('administrator', 'moderator')
    and is_suspended = false
  );
$$;

create or replace function public.is_cma_organiser()
returns boolean
language sql
stable
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid()
    and role in ('cma_organiser', 'administrator')
    and is_suspended = false
  );
$$;

alter table public.profiles enable row level security;
alter table public.games enable row level security;
alter table public.clans enable row level security;
alter table public.tournaments enable row level security;
alter table public.tournament_registrations enable row level security;
alter table public.challenges enable row level security;
alter table public.match_rooms enable row level security;
alter table public.match_messages enable row level security;
alter table public.notifications enable row level security;
alter table public.result_evidence enable row level security;
alter table public.weekly_awards enable row level security;
alter table public.audit_logs enable row level security;

create policy "profiles_public_read" on public.profiles for select using (is_suspended = false);
create policy "profiles_self_update" on public.profiles for update using (id = auth.uid()) with check (id = auth.uid());
create policy "games_public_read" on public.games for select using (status = 'active');
create policy "clans_public_read" on public.clans for select using (true);
create policy "tournaments_public_read" on public.tournaments for select using (status in ('open', 'published', 'live', 'completed'));
create policy "cma_organisers_manage_cma_tournaments" on public.tournaments for all using (partner_slug = 'cma' and public.is_cma_organiser()) with check (partner_slug = 'cma' and public.is_cma_organiser());
create policy "registrations_own_read" on public.tournament_registrations for select using (user_id = auth.uid() or public.is_cma_organiser());
create policy "registrations_own_insert" on public.tournament_registrations for insert with check (user_id = auth.uid());
create policy "cma_organisers_review_registrations" on public.tournament_registrations for update using (public.is_cma_organiser()) with check (public.is_cma_organiser());
create policy "notifications_own_read" on public.notifications for select using (user_id = auth.uid());
create policy "messages_room_members_read" on public.match_messages for select using (public.is_admin());
create policy "evidence_owner_or_admin_read" on public.result_evidence for select using (uploaded_by = auth.uid() or public.is_admin());
create policy "weekly_awards_public_read" on public.weekly_awards for select using (published_at is not null);
create policy "cma_organisers_manage_weekly_awards" on public.weekly_awards for all using (partner_slug = 'cma' and public.is_cma_organiser()) with check (partner_slug = 'cma' and public.is_cma_organiser());
