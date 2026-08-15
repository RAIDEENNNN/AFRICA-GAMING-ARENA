import { env } from "cloudflare:workers";
import { errorResponse } from "../../../auth";

export async function GET() {
  try {
    const rows = await env.DB
      .prepare(
        `select users.username, users.display_name, users.avatar_url, users.country,
          player_stats.game, player_stats.matches_played, player_stats.wins, player_stats.losses,
          player_stats.rating, player_stats.win_streak, player_stats.best_win_streak
         from player_stats
         join users on users.id = player_stats.user_id
         order by player_stats.rating desc, player_stats.wins desc
         limit 25`,
      )
      .all();
    return Response.json({ ok: true, leaderboard: rows.results ?? [] });
  } catch (error) {
    return errorResponse(error);
  }
}
