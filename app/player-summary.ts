import { env } from "cloudflare:workers";
import type { AuthUser } from "./auth";

export type PlayerSummary = {
  user: AuthUser | null;
  stats: {
    game: string;
    matchesPlayed: number;
    wins: number;
    losses: number;
    draws: number;
    rating: number;
    xp: number;
    level: number;
    winStreak: number;
    bestWinStreak: number;
  };
  clan: { id: string; name: string; slug: string; tag: string } | null;
  notifications: { unread: number; total: number };
  activity: {
    openChallenges: number;
    acceptedMatches: number;
    agreementMatches: number;
    checkInMatches: number;
    resultPending: number;
    completedMatches: number;
  };
};

const emptyStats = {
  game: "codm",
  matchesPlayed: 0,
  wins: 0,
  losses: 0,
  draws: 0,
  rating: 1000,
  xp: 0,
  level: 1,
  winStreak: 0,
  bestWinStreak: 0,
};

export async function getPlayerSummary(user: AuthUser | null): Promise<PlayerSummary> {
  if (!user) {
    return {
      user: null,
      stats: emptyStats,
      clan: null,
      notifications: { unread: 0, total: 0 },
      activity: { openChallenges: 0, acceptedMatches: 0, agreementMatches: 0, checkInMatches: 0, resultPending: 0, completedMatches: 0 },
    };
  }

  const [stats, clan, notifications, activity] = await Promise.all([
    getStats(user),
    getClan(user),
    getNotificationCounts(user),
    getActivity(user),
  ]);

  return { user, stats, clan, notifications, activity };
}

async function getStats(user: AuthUser): Promise<PlayerSummary["stats"]> {
  const row = await safeFirst<{
    game: string;
    matches_played: number;
    wins: number;
    losses: number;
    draws: number;
    rating: number;
    xp: number;
    level: number;
    win_streak: number;
    best_win_streak: number;
  }>(
    `select game, matches_played, wins, losses, draws, rating, xp, level, win_streak, best_win_streak
     from player_stats
     where user_id = ?
     order by updated_at desc
     limit 1`,
    user.id,
  );
  if (!row) return { ...emptyStats, game: user.primaryGame || "codm" };
  return {
    game: row.game,
    matchesPlayed: row.matches_played,
    wins: row.wins,
    losses: row.losses,
    draws: row.draws,
    rating: row.rating,
    xp: row.xp,
    level: row.level,
    winStreak: row.win_streak,
    bestWinStreak: row.best_win_streak,
  };
}

async function getClan(user: AuthUser): Promise<PlayerSummary["clan"]> {
  return safeFirst<{ id: string; name: string; slug: string; tag: string }>(
    `select clans.id, clans.name, clans.slug, clans.tag
     from clans
     join clan_members on clan_members.clan_id = clans.id
     where clan_members.user_id = ?
     limit 1`,
    user.id,
  );
}

async function getNotificationCounts(user: AuthUser): Promise<PlayerSummary["notifications"]> {
  const total = await safeFirst<{ total: number }>("select count(*) as total from notifications where user_id = ?", user.id);
  const unread = await safeFirst<{ total: number }>("select count(*) as total from notifications where user_id = ? and read_at is null", user.id);
  return { total: total?.total ?? 0, unread: unread?.total ?? 0 };
}

async function getActivity(user: AuthUser): Promise<PlayerSummary["activity"]> {
  const openChallenges = await safeFirst<{ total: number }>(
    "select count(*) as total from challenges where creator_user_id = ? and status = 'OPEN'",
    user.id,
  );
  const rows = await safeAll<{ status: string; total: number }>(
    `select matches.status, count(*) as total
     from matches
     join match_participants on match_participants.match_id = matches.id
     where match_participants.user_id = ?
     group by matches.status`,
    user.id,
  );
  const byStatus = new Map(rows.map((row) => [row.status, row.total]));
  return {
    openChallenges: openChallenges?.total ?? 0,
    acceptedMatches: byStatus.get("ACCEPTED") ?? 0,
    agreementMatches: (byStatus.get("AGREEMENT") ?? 0) + (byStatus.get("TERMS") ?? 0),
    checkInMatches: (byStatus.get("READY") ?? 0) + (byStatus.get("CHECK_IN") ?? 0),
    resultPending: (byStatus.get("RESULT_PENDING") ?? 0) + (byStatus.get("RESULT_REVIEW") ?? 0),
    completedMatches: byStatus.get("COMPLETED") ?? 0,
  };
}

async function safeFirst<T>(sql: string, ...bindings: unknown[]) {
  try {
    return await env.DB.prepare(sql).bind(...bindings).first<T>();
  } catch {
    return null;
  }
}

async function safeAll<T>(sql: string, ...bindings: unknown[]) {
  try {
    const rows = await env.DB.prepare(sql).bind(...bindings).all<T>();
    return rows.results ?? [];
  } catch {
    return [];
  }
}
