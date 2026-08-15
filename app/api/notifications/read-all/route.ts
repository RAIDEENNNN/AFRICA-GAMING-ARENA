import { env } from "cloudflare:workers";
import { errorResponse, requireUser } from "../../../auth";
import { ensureNotificationsTable } from "../../../notifications-repository";

export async function POST(request: Request) {
  try {
    const user = await requireUser(request);
    await ensureNotificationsTable();
    const now = new Date().toISOString();
    await env.DB.prepare("update notifications set read_at = ? where user_id = ? and read_at is null").bind(now, user.id).run();
    return Response.json({ ok: true });
  } catch (error) {
    return errorResponse(error);
  }
}
