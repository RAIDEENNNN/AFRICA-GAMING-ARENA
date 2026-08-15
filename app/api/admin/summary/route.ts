import { env } from "cloudflare:workers";
import { errorResponse, requireAdmin } from "../../../auth";

export async function GET(request: Request) {
  try {
    await requireAdmin(request);
    const db = env.DB;
    const [users, clans, openChallenges, activeRooms] = await Promise.all([
      db.prepare("select count(*) as total from users").first<{ total: number }>(),
      db.prepare("select count(*) as total from clans").first<{ total: number }>(),
      db.prepare("select count(*) as total from challenges where lower(status) = 'open'").first<{ total: number }>(),
      db.prepare("select count(*) as total from match_rooms where lower(status) != 'completed'").first<{ total: number }>(),
    ]);
    return Response.json({
      ok: true,
      counts: {
        users: users?.total ?? 0,
        clans: clans?.total ?? 0,
        openChallenges: openChallenges?.total ?? 0,
        activeMatches: activeRooms?.total ?? 0,
      },
    });
  } catch (error) {
    return errorResponse(error);
  }
}
