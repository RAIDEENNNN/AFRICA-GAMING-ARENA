alter table clans add column slug text not null default '';
alter table clans add column tag text not null default 'AGA';
alter table clans add column description text;
alter table clans add column country text;
alter table clans add column logo_url text;
alter table clans add column banner_url text;
alter table clans add column recruitment_status text not null default 'closed';
alter table clans add column founded_at text;

create table if not exists clan_members (
  id text primary key not null,
  clan_id text not null references clans(id),
  user_id text not null references users(id),
  role text not null default 'Player',
  status text not null default 'active',
  joined_at text,
  created_at text not null,
  updated_at text not null
);

create table if not exists clan_applications (
  id text primary key not null,
  clan_id text not null references clans(id),
  user_id text not null references users(id),
  message text,
  status text not null default 'pending',
  reviewed_by_user_id text references users(id),
  reviewed_at text,
  created_at text not null,
  updated_at text not null
);

create table if not exists rank_seasons (
  id text primary key not null,
  name text not null,
  starts_at text not null,
  ends_at text not null,
  reset_model text not null,
  status text not null default 'active',
  created_at text not null,
  updated_at text not null
);

create table if not exists ranked_ratings (
  id text primary key not null,
  user_id text not null references users(id),
  game_id text not null references games(id),
  season_id text not null references rank_seasons(id),
  team_size text not null,
  mmr integer not null default 1000,
  rank_tier text not null default 'Unranked',
  rank_points integer not null default 0,
  placement_matches integer not null default 10,
  wins integer not null default 0,
  losses integer not null default 0,
  current_streak integer not null default 0,
  best_streak integer not null default 0,
  rank_movement integer not null default 0,
  created_at text not null,
  updated_at text not null
);

create table if not exists xp_transactions (
  id text primary key not null,
  user_id text not null references users(id),
  source_type text not null,
  source_id text,
  amount integer not null,
  reason text not null,
  created_at text not null
);

create table if not exists achievements_catalog (
  id text primary key not null,
  icon text not null,
  title text not null,
  description text not null,
  rarity text not null,
  xp_reward integer not null default 0,
  created_at text not null,
  updated_at text not null
);

create table if not exists player_achievements (
  id text primary key not null,
  user_id text not null references users(id),
  achievement_id text not null references achievements_catalog(id),
  unlocked_at text not null,
  match_id text references matches(id),
  tournament_id text,
  created_at text not null,
  updated_at text not null
);

create table if not exists scouting_profiles (
  id text primary key not null,
  user_id text not null references users(id),
  game_id text not null references games(id),
  role text not null,
  region text not null,
  availability text not null,
  language text not null,
  experience text,
  looking_for_team integer not null default 0,
  saved_by_count integer not null default 0,
  created_at text not null,
  updated_at text not null
);

create table if not exists predictions (
  id text primary key not null,
  user_id text not null references users(id),
  target_type text not null,
  target_id text not null,
  pick text not null,
  status text not null default 'pending',
  xp_reward integer not null default 0,
  resolved_at text,
  created_at text not null,
  updated_at text not null
);

create table if not exists championships (
  id text primary key not null,
  name text not null,
  season_id text not null references rank_seasons(id),
  game_id text references games(id),
  stage text not null,
  country text,
  status text not null default 'scheduled',
  starts_at text,
  ends_at text,
  created_at text not null,
  updated_at text not null
);

create table if not exists championship_standings (
  id text primary key not null,
  championship_id text not null references championships(id),
  user_id text references users(id),
  clan_id text references clans(id),
  country text,
  points integer not null default 0,
  rank integer not null,
  qualification_status text not null default 'open',
  created_at text not null,
  updated_at text not null
);

create table if not exists tournament_matches (
  id text primary key not null,
  tournament_id text not null references partner_tournaments(id),
  match_id text references matches(id),
  round_label text not null,
  bracket_path text not null,
  seed_a integer,
  seed_b integer,
  status text not null default 'scheduled',
  scheduled_at text,
  created_at text not null,
  updated_at text not null
);

create index if not exists idx_ranked_ratings_user_season on ranked_ratings(user_id, season_id);
create index if not exists idx_ranked_ratings_game_tier on ranked_ratings(game_id, rank_tier);
create index if not exists idx_clan_members_clan on clan_members(clan_id);
create index if not exists idx_clan_members_user on clan_members(user_id);
create index if not exists idx_scouting_profiles_game_role on scouting_profiles(game_id, role);
create index if not exists idx_predictions_user_status on predictions(user_id, status);
create index if not exists idx_championship_standings_championship on championship_standings(championship_id, rank);
