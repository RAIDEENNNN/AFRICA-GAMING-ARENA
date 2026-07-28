import {
  acceptChallenge,
  approveTerms,
  checkIn,
  counterOffer,
  createChallenge,
  getArenaState,
  resetArenaState,
  sendRoomMessage,
  submitResult,
  type Actor,
} from "../../arena-store";

export async function GET() {
  return Response.json(getArenaState());
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const actor = (body.actor ?? "PlayerOne") as Actor;
    let data;
    switch (body.action) {
      case "reset":
        data = resetArenaState();
        break;
      case "createChallenge":
        data = createChallenge(body.challenge, actor);
        break;
      case "acceptChallenge":
        data = acceptChallenge(body.challengeId, actor);
        break;
      case "counterOffer":
        data = counterOffer(body.challengeId, actor, body.terms);
        break;
      case "sendMessage":
        data = sendRoomMessage(body.roomId, actor, body.message, body.attachment);
        break;
      case "approveTerms":
        data = approveTerms(body.roomId, actor, Boolean(body.wager));
        break;
      case "checkIn":
        data = checkIn(body.roomId, actor);
        break;
      case "submitResult":
        data = submitResult(body.roomId, actor, body.result);
        break;
      default:
        return Response.json({ error: "Unknown action." }, { status: 400 });
    }
    return Response.json({ ok: true, data, state: getArenaState() });
  } catch (error) {
    return Response.json({ error: error instanceof Error ? error.message : "Request failed." }, { status: 400 });
  }
}
