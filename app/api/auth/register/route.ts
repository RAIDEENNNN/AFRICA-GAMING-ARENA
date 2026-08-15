import { authCookie, errorResponse, publicUser, registerUser } from "../../../auth";

export async function POST(request: Request) {
  try {
    const { user, session } = await registerUser(await request.json(), request);
    return Response.json(
      { ok: true, user: publicUser(user) },
      { status: 201, headers: { "set-cookie": authCookie(session.token, request) } },
    );
  } catch (error) {
    return errorResponse(error);
  }
}
