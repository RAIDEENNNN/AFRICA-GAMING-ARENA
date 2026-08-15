import { env } from "cloudflare:workers";
import { errorResponse, requireUser } from "../../auth";
import { ensureNotificationsTable } from "../../notifications-repository";

export async function GET(request: Request) {
  try {
    const user = await requireUser(request);
    await ensureNotificationsTable();
    const rows = await env.DB
      .prepare(
        `select id, type, title, message, link, read_at, created_at
         from notifications
         where user_id = ?
         order by created_at desc
         limit 50`,
      )
      .bind(user.id)
      .all();
    return Response.json({ ok: true, notifications: rows.results ?? [] });
  } catch (error) {
    return errorResponse(error);
  }
}
