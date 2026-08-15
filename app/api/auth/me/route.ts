import { errorResponse, getCurrentUser, publicUser } from "../../../auth";

export async function GET(request: Request) {
  try {
    const user = await getCurrentUser(request);
    return Response.json({ ok: true, user: user ? publicUser(user) : null });
  } catch (error) {
    return errorResponse(error);
  }
}
