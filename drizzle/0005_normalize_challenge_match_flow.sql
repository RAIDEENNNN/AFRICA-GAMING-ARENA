alter table challenges add column accepted_at text;
alter table challenges add column completed_at text;
alter table challenges add column currency text not null default 'DEMO';
alter table challenges add column rules_json text;
alter table challenges add column expires_at text;

alter table challenge_participants add column team text;
alter table challenge_participants add column joined_at text;

create table if not exists matches (
  id text primary key not null,
  challenge_id text not null references challenges(id),
  game text not null,
  mode text not null,
  status text not null,
  started_at text,
  ended_at text,
  winner_user_id text references users(id),
  winner_team text,
  created_at text not null,
  updated_at text not null
);

create table if not exists match_participants (
  id text primary key not null,
  match_id text not null references matches(id),
  user_id text not null references users(id),
  team text not null,
  ready integer not null default 0,
  checked_in integer not null default 0,
  result_claim text,
  created_at text not null,
  updated_at text not null
);

create table if not exists match_messages (
  id text primary key not null,
  match_id text not null references matches(id),
  user_id text references users(id),
  message text not null,
  created_at text not null,
  edited_at text,
  deleted_at text
);

create table if not exists match_agreements (
  id text primary key not null,
  match_id text not null references matches(id),
  user_id text not null references users(id),
  approved integer not null default 0,
  approved_at text
);

create table if not exists check_ins (
  id text primary key not null,
  room_id text not null,
  user_id text not null,
  status text not null,
  delay_requested_until text,
  created_at text not null,
  updated_at text not null
);

create table if not exists match_results (
  id text primary key not null,
  room_id text not null,
  submitted_by_user_id text not null,
  winner_user_id text,
  score text not null,
  round_scores text not null,
  note text,
  status text not null,
  created_at text not null,
  updated_at text not null
);

alter table notifications add column type text;
alter table notifications add column title text;
alter table notifications add column message text;
alter table notifications add column link text;
