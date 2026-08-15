import { authCookie, errorResponse, loginUser, publicUser } from "../../../auth";

export async function POST(request: Request) {
  try {
    const { user, session } = await loginUser(await request.json(), request);
    return Response.json(
      { ok: true, user: publicUser(user) },
      { headers: { "set-cookie": authCookie(session.token, request) } },
    );
  } catch (error) {
    return errorResponse(error);
  }
}
