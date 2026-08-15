create table if not exists users (
  id text primary key not null,
  username text not null,
  email text not null,
  role text not null default 'PLAYER',
  region text,
  skill_level text,
  age_verified integer not null default 0,
  created_at text not null,
  updated_at text not null
);

alter table users add column display_name text;
alter table users add column password_hash text;
alter table users add column country text;
alter table users add column date_of_birth text;
alter table users add column primary_game text;
alter table users add column avatar_url text;
alter table users add column banner_url text;
alter table users add column bio text;
alter table users add column status text not null default 'active';
alter table users add column last_seen_at text;

create unique index if not exists users_username_lower_unique on users (lower(username));
create unique index if not exists users_email_lower_unique on users (lower(email));

create table if not exists sessions (
  id text primary key not null,
  user_id text not null references users(id),
  token_hash text not null unique,
  expires_at text not null,
  created_at text not null,
  ip_hash text,
  user_agent text
);

create table if not exists player_stats (
  id text primary key not null,
  user_id text not null references users(id),
  game text not null,
  matches_played integer not null default 0,
  wins integer not null default 0,
  losses integer not null default 0,
  draws integer not null default 0,
  kills integer not null default 0,
  deaths integer not null default 0,
  rating integer not null default 1000,
  xp integer not null default 0,
  level integer not null default 1,
  win_streak integer not null default 0,
  best_win_streak integer not null default 0,
  updated_at text not null
);

create table if not exists wallets (
  id text primary key not null,
  user_id text not null references users(id),
  currency text not null,
  available_balance integer not null default 0,
  locked_balance integer not null default 0,
  created_at text not null,
  updated_at text not null
);

create table if not exists audit_logs (
  id text primary key not null,
  actor_user_id text references users(id),
  action text not null,
  entity_type text not null,
  entity_id text not null,
  metadata_json text,
  ip_address text,
  created_at text not null,
  updated_at text not null
);
