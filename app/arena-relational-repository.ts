import { env } from "cloudflare:workers";
import type { AuthUser } from "./auth";
import type { Actor, Challenge, ChatMessage, MatchRoom, ResultSubmission } from "./arena-store";

type Db = D1Database;

export async function syncChallengeCreated(challenge: Challenge, user: AuthUser | null) {
  const db = await getRelationalDb();
  const creator = await ensureUser(db, challenge.creator, user);
  const now = new Date().toISOString();

  await db
    .prepare(
      `insert into challenges (
        id, creator_user_id, game_id, match_kind, team_size, weapon_class, weapon, map, mode, rules,
        region, server, scheduled_at, prize_type, wager_amount, status, created_at, updated_at
      ) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      on conflict(id) do update set status = excluded.status, updated_at = excluded.updated_at`,
    )
    .bind(
      challenge.id,
      creator.id,
      gameId(challenge.game),
      challenge.matchKind,
      challenge.teamSize,
      challenge.weaponClass,
      challenge.weapon,
      challenge.map,
      challenge.mode,
      challenge.rules,
      challenge.region,
      challenge.server,
      `${challenge.date}T${challenge.time}:00.000Z`,
      challenge.prizeType,
      toMinorUnits(challenge.wagerAmount),
      "OPEN",
      now,
      now,
    )
    .run();

  await upsertParticipant(db, challenge.id, creator.id, "creator", "CREATOR", now);
  await writeNotification(db, creator.id, "challenge.created", "Challenge published", `${challenge.teamSize} ${challenge.game} challenge is open.`, `/matches/${challenge.id}`);
  await writeAudit(db, creator.id, "challenge.created", "challenge", challenge.id, { game: challenge.game, mode: challenge.mode });
}

export async function syncChallengeAccepted(challenge: Challenge, room: MatchRoom, user: AuthUser | null, actor: Actor) {
  const db = await getRelationalDb();
  const creator = await ensureUser(db, challenge.creator, null);
  const opponent = await ensureUser(db, actor, user);
  const now = new Date().toISOString();

  await db
    .prepare("update challenges set status = 'ACCEPTED', accepted_at = ?, updated_at = ? where id = ?")
    .bind(now, now, challenge.id)
    .run();
  await upsertParticipant(db, challenge.id, opponent.id, "opponent", "ACCEPTED", now);

  await db
    .prepare(
      `insert into matches (id, challenge_id, game, mode, status, created_at, updated_at)
       values (?, ?, ?, ?, 'AGREEMENT', ?, ?)
       on conflict(id) do update set status = excluded.status, updated_at = excluded.updated_at`,
    )
    .bind(room.id, challenge.id, challenge.game, challenge.mode, now, now)
    .run();

  await upsertMatchParticipant(db, room.id, creator.id, "creator", now);
  await upsertMatchParticipant(db, room.id, opponent.id, "opponent", now);
  await syncMessages(room);
  await writeNotification(db, creator.id, "challenge.accepted", "Challenge accepted", `${actor} accepted ${challenge.id}.`, `/matches/${room.id}`);
  await writeNotification(db, opponent.id, "match.ready", "Match room opened", `Private room ${room.id} is ready.`, `/matches/${room.id}`);
  await writeAudit(db, opponent.id, "challenge.accepted", "challenge", challenge.id, { matchId: room.id });
}

export async function syncRoomMessage(room: MatchRoom, message: ChatMessage, user: AuthUser | null) {
  const db = await getRelationalDb();
  const actor = message.author === "System" ? null : await ensureUser(db, String(message.author), user);
  const now = new Date().toISOString();
  await db
    .prepare(
      `insert into match_messages (id, match_id, user_id, message, created_at)
       values (?, ?, ?, ?, ?)
       on conflict(id) do nothing`,
    )
    .bind(message.id, room.id, actor?.id ?? null, message.body, now)
    .run();
}

export async function syncAgreement(challenge: Challenge, room: MatchRoom, actor: Actor, user: AuthUser | null) {
  const db = await getRelationalDb();
  const account = await ensureUser(db, actor, user);
  const approved = challenge.approvals.creator && challenge.approvals.opponent;
  const now = new Date().toISOString();
  await db
    .prepare(
      `insert into match_agreements (id, match_id, user_id, approved, approved_at)
       values (?, ?, ?, ?, ?)
       on conflict(id) do update set approved = excluded.approved, approved_at = excluded.approved_at`,
    )
    .bind(`mag_${room.id}_${account.id}`, room.id, account.id, approved ? 1 : 0, now)
    .run();
  await syncMatchStatus(db, room, challenge);
  await writeAudit(db, account.id, "match.agreement.approved", "match", room.id, { status: room.status });
}

export async function syncCheckIn(challenge: Challenge, room: MatchRoom, actor: Actor, user: AuthUser | null) {
  const db = await getRelationalDb();
  const account = await ensureUser(db, actor, user);
  const side = challenge.creator === actor ? "creator" : "opponent";
  const now = new Date().toISOString();
  await db
    .prepare("update match_participants set ready = 1, checked_in = 1, updated_at = ? where match_id = ? and user_id = ?")
    .bind(now, room.id, account.id)
    .run();
  await db
    .prepare(
      `insert into check_ins (id, room_id, user_id, status, created_at, updated_at)
       values (?, ?, ?, 'checked_in', ?, ?)
       on conflict(id) do update set status = 'checked_in', updated_at = excluded.updated_at`,
    )
    .bind(`chk_${room.id}_${side}`, room.id, account.id, now, now)
    .run();
  await syncMatchStatus(db, room, challenge);
  await writeAudit(db, account.id, "match.check_in", "match", room.id, { side });
}

export async function syncResult(challenge: Challenge, room: MatchRoom, result: ResultSubmission, user: AuthUser | null) {
  const db = await getRelationalDb();
  const submitter = await ensureUser(db, result.submittedBy, user);
  const winner = await ensureUser(db, result.winner, null);
  const now = new Date().toISOString();
  await db
    .prepare(
      `insert into match_results (id, room_id, submitted_by_user_id, winner_user_id, score, round_scores, note, status, created_at, updated_at)
       values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
       on conflict(id) do update set winner_user_id = excluded.winner_user_id, score = excluded.score,
       round_scores = excluded.round_scores, note = excluded.note, status = excluded.status, updated_at = excluded.updated_at`,
    )
    .bind(
      `res_${room.id}_${submitter.id}`,
      room.id,
      submitter.id,
      winner.id,
      result.score,
      result.rounds,
      result.note,
      room.status === "Verified" ? "verified" : "submitted",
      now,
      now,
    )
    .run();

  await db
    .prepare("update match_participants set result_claim = ?, updated_at = ? where match_id = ? and user_id = ?")
    .bind(result.winner, now, room.id, submitter.id)
    .run();

  await syncMatchStatus(db, room, challenge);
  if (room.status === "Verified") await updateStatsForVerifiedMatch(db, challenge, room, winner.id, now);
  await writeNotification(db, winner.id, "match.result", "Result submitted", `${result.score} submitted for ${room.id}.`, `/matches/${room.id}`);
  await writeAudit(db, submitter.id, "match.result.submitted", "match", room.id, { winner: result.winner, score: result.score });
}

export async function relationalSummary() {
  const db = await getRelationalDb();
  const [challenges, matches, messages, stats, notifications] = await Promise.all([
    count(db, "challenges"),
    count(db, "matches"),
    count(db, "match_messages"),
    count(db, "player_stats"),
    count(db, "notifications"),
  ]);
  return { challenges, matches, messages, stats, notifications };
}

async function getRelationalDb() {
  if (!env.DB) throw new Error("Cloudflare D1 binding `DB` is required.");
  await ensureRelationalTables(env.DB);
  return env.DB;
}

async function ensureRelationalTables(db: Db) {
  await db
    .prepare(
      `create table if not exists users (
        id text primary key not null,
        username text not null,
        email text not null,
        role text not null default 'PLAYER',
        region text,
        skill_level text,
        age_verified integer not null default 0,
        created_at text not null,
        updated_at text not null
      )`,
    )
    .run();
  await addColumn(db, "users", "display_name text");
  await addColumn(db, "users", "password_hash text");
  await addColumn(db, "users", "country text");
  await addColumn(db, "users", "date_of_birth text");
  await addColumn(db, "users", "primary_game text");
  await addColumn(db, "users", "avatar_url text");
  await addColumn(db, "users", "banner_url text");
  await addColumn(db, "users", "bio text");
  await addColumn(db, "users", "status text not null default 'active'");
  await addColumn(db, "users", "last_seen_at text");

  await db
    .prepare(
      `create table if not exists challenges (
        id text primary key not null,
        creator_user_id text not null,
        game_id text not null,
        match_kind text not null,
        team_size text not null,
        weapon_class text not null,
        weapon text not null,
        map text not null,
        mode text not null,
        rules text not null,
        region text not null,
        server text not null,
        scheduled_at text not null,
        prize_type text not null,
        wager_amount integer not null default 0,
        status text not null default 'OPEN',
        created_at text not null,
        updated_at text not null,
        accepted_at text,
        completed_at text
      )`,
    )
    .run();
  await addColumn(db, "challenges", "accepted_at text");
  await addColumn(db, "challenges", "completed_at text");
  await addColumn(db, "challenges", "currency text not null default 'DEMO'");
  await addColumn(db, "challenges", "rules_json text");
  await addColumn(db, "challenges", "expires_at text");

  await db
    .prepare(
      `create table if not exists challenge_participants (
        id text primary key not null,
        challenge_id text not null,
        user_id text not null,
        side text,
        team text,
        status text not null,
        created_at text not null,
        updated_at text not null,
        joined_at text
      )`,
    )
    .run();
  await addColumn(db, "challenge_participants", "team text");
  await addColumn(db, "challenge_participants", "joined_at text");

  await db
    .prepare(
      `create table if not exists matches (
        id text primary key not null,
        challenge_id text not null,
        game text not null,
        mode text not null,
        status text not null,
        started_at text,
        ended_at text,
        winner_user_id text,
        winner_team text,
        created_at text not null,
        updated_at text not null
      )`,
    )
    .run();

  await db
    .prepare(
      `create table if not exists match_participants (
        id text primary key not null,
        match_id text not null,
        user_id text not null,
        team text not null,
        ready integer not null default 0,
        checked_in integer not null default 0,
        result_claim text,
        created_at text not null,
        updated_at text not null
      )`,
    )
    .run();

  await db
    .prepare(
      `create table if not exists match_messages (
        id text primary key not null,
        match_id text not null,
        user_id text,
        message text not null,
        created_at text not null,
        edited_at text,
        deleted_at text
      )`,
    )
    .run();

  await db
    .prepare(
      `create table if not exists match_agreements (
        id text primary key not null,
        match_id text not null,
        user_id text not null,
        approved integer not null default 0,
        approved_at text
      )`,
    )
    .run();

  await db
    .prepare(
      `create table if not exists check_ins (
        id text primary key not null,
        room_id text not null,
        user_id text not null,
        status text not null,
        delay_requested_until text,
        created_at text not null,
        updated_at text not null
      )`,
    )
    .run();

  await db
    .prepare(
      `create table if not exists match_results (
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
      )`,
    )
    .run();

  await db
    .prepare(
      `create table if not exists notifications (
        id text primary key not null,
        user_id text not null,
        body text not null,
        read_at text,
        created_at text not null,
        updated_at text not null
      )`,
    )
    .run();
  await addColumn(db, "notifications", "type text");
  await addColumn(db, "notifications", "title text");
  await addColumn(db, "notifications", "message text");
  await addColumn(db, "notifications", "link text");
}

async function ensureUser(db: Db, actor: Actor, currentUser: AuthUser | null) {
  if (currentUser && currentUser.username === actor) return { id: currentUser.id, username: currentUser.username };
  const username = String(actor);
  const existing = await db
    .prepare("select id, username from users where lower(username) = lower(?) limit 1")
    .bind(username)
    .first<{ id: string; username: string }>();
  if (existing) return existing;
  const now = new Date().toISOString();
  const id = `demo_${username.toLowerCase().replace(/[^a-z0-9_]/g, "_")}`;
  await db
    .prepare(
      `insert into users (id, username, email, display_name, country, primary_game, status, role, created_at, updated_at, last_seen_at)
       values (?, ?, ?, ?, 'Demo', 'codm', 'active', ?, ?, ?, ?)
       on conflict(id) do nothing`,
    )
    .bind(id, username, `${id}@demo.aga`, username, username === "Admin" ? "ADMIN" : "PLAYER", now, now, now)
    .run();
  return { id, username };
}

async function upsertParticipant(db: Db, challengeId: string, userId: string, team: string, status: string, now: string) {
  await db
    .prepare(
      `insert into challenge_participants (id, challenge_id, user_id, side, team, status, created_at, updated_at, joined_at)
       values (?, ?, ?, ?, ?, ?, ?, ?, ?)
       on conflict(id) do update set status = excluded.status, updated_at = excluded.updated_at`,
    )
    .bind(`cpt_${challengeId}_${team}`, challengeId, userId, team, team, status, now, now, now)
    .run();
}

async function upsertMatchParticipant(db: Db, matchId: string, userId: string, team: string, now: string) {
  await db
    .prepare(
      `insert into match_participants (id, match_id, user_id, team, ready, checked_in, created_at, updated_at)
       values (?, ?, ?, ?, 0, 0, ?, ?)
       on conflict(id) do update set updated_at = excluded.updated_at`,
    )
    .bind(`mpt_${matchId}_${team}`, matchId, userId, team, now, now)
    .run();
}

async function syncMessages(room: MatchRoom) {
  await Promise.all(room.messages.map((message) => syncRoomMessage(room, message, null)));
}

async function syncMatchStatus(db: Db, room: MatchRoom, challenge: Challenge) {
  const now = new Date().toISOString();
  const status = room.status === "Verified" ? "COMPLETED" : room.status === "Dispute" ? "DISPUTED" : room.status.toUpperCase().replaceAll(" ", "_");
  await db
    .prepare("update matches set status = ?, ended_at = case when ? = 'COMPLETED' then ? else ended_at end, updated_at = ? where id = ?")
    .bind(status, status, now, now, room.id)
    .run();
  await db
    .prepare("update challenges set status = ?, completed_at = case when ? = 'COMPLETED' then ? else completed_at end, updated_at = ? where id = ?")
    .bind(challenge.status === "Complete" ? "COMPLETED" : status, status, now, now, challenge.id)
    .run();
}

async function updateStatsForVerifiedMatch(db: Db, challenge: Challenge, room: MatchRoom, winnerUserId: string, now: string) {
  const participants = await db
    .prepare("select user_id from match_participants where match_id = ?")
    .bind(room.id)
    .all<{ user_id: string }>();
  for (const row of participants.results ?? []) {
    const won = row.user_id === winnerUserId;
    await db
      .prepare(
        `insert into player_stats (id, user_id, game, matches_played, wins, losses, draws, kills, deaths, rating, xp, level, win_streak, best_win_streak, updated_at)
         values (?, ?, ?, 1, ?, ?, 0, 0, 0, ?, ?, 1, ?, ?, ?)
         on conflict(id) do update set
           matches_played = matches_played + 1,
           wins = wins + ?,
           losses = losses + ?,
           rating = rating + ?,
           xp = xp + ?,
           win_streak = case when ? = 1 then win_streak + 1 else 0 end,
           best_win_streak = case when ? = 1 and win_streak + 1 > best_win_streak then win_streak + 1 else best_win_streak end,
           updated_at = excluded.updated_at`,
      )
      .bind(
        `pst_${row.user_id}_${gameId(challenge.game)}`,
        row.user_id,
        gameId(challenge.game),
        won ? 1 : 0,
        won ? 0 : 1,
        won ? 1025 : 985,
        won ? 100 : 25,
        won ? 1 : 0,
        won ? 1 : 0,
        now,
        won ? 1 : 0,
        won ? 0 : 1,
        won ? 25 : -15,
        won ? 100 : 25,
        won ? 1 : 0,
        won ? 1 : 0,
      )
      .run();
  }
}

async function writeNotification(db: Db, userId: string, type: string, title: string, message: string, link: string) {
  const now = new Date().toISOString();
  await db
    .prepare(
      `insert into notifications (id, user_id, body, type, title, message, link, created_at, updated_at)
       values (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    )
    .bind(`ntf_${crypto.randomUUID()}`, userId, message, type, title, message, link, now, now)
    .run();
}

async function writeAudit(db: Db, actorUserId: string, action: string, targetType: string, targetId: string, metadata: Record<string, unknown>) {
  const now = new Date().toISOString();
  await db
    .prepare(
      `insert into audit_logs (id, actor_user_id, action, entity_type, entity_id, metadata_json, created_at, updated_at)
       values (?, ?, ?, ?, ?, ?, ?, ?)`,
    )
    .bind(`aud_${crypto.randomUUID()}`, actorUserId, action, targetType, targetId, JSON.stringify(metadata), now, now)
    .run();
}

async function count(db: Db, table: string) {
  const row = await db.prepare(`select count(*) as total from ${table}`).first<{ total: number }>();
  return row?.total ?? 0;
}

async function addColumn(db: Db, table: string, columnSql: string) {
  try {
    await db.prepare(`alter table ${table} add column ${columnSql}`).run();
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    if (!message.toLowerCase().includes("duplicate column name")) throw error;
  }
}

function gameId(game: string) {
  return game.toLowerCase().replaceAll(" ", "-");
}

function toMinorUnits(amount: number) {
  return Math.round((Number(amount) || 0) * 100);
}
