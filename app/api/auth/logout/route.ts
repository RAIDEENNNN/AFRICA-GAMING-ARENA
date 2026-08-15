import { clearAuthCookie, errorResponse, logoutUser } from "../../../auth";

export async function POST(request: Request) {
  try {
    await logoutUser(request);
    return Response.json({ ok: true }, { headers: { "set-cookie": clearAuthCookie() } });
  } catch (error) {
    return errorResponse(error);
  }
}
