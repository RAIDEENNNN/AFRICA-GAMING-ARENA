import { env } from "cloudflare:workers";
import { errorResponse, requireUser } from "../../../../auth";
import { ensureNotificationsTable } from "../../../../notifications-repository";

export async function POST(request: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const user = await requireUser(request);
    await ensureNotificationsTable();
    const { id } = await context.params;
    const now = new Date().toISOString();
    const result = await env.DB
      .prepare("update notifications set read_at = ? where id = ? and user_id = ?")
      .bind(now, id, user.id)
      .run();
    return Response.json({ ok: true, changed: result.meta.changes });
  } catch (error) {
    return errorResponse(error);
  }
}
