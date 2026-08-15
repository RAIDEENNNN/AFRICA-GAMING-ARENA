import { errorResponse, getCurrentUser } from "../../../auth";
import { getPlayerSummary } from "../../../player-summary";

export async function GET(request: Request) {
  try {
    const user = await getCurrentUser(request);
    return Response.json({ ok: true, summary: await getPlayerSummary(user) });
  } catch (error) {
    return errorResponse(error);
  }
}
