import {
  acceptChallengeInState,
  approveTermsInState,
  checkInInState,
  counterOfferInState,
  createChallengeInState,
  sendRoomMessageInState,
  submitResultInState,
  type Actor,
} from "../../arena-store";
import { loadArenaState, persistentStoreInfo, resetArenaStateFile, saveArenaState } from "../../arena-d1-repository";

export async function GET() {
  const state = await loadArenaState();
  return Response.json({ ...state, persistence: persistentStoreInfo() });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const actor = (body.actor ?? "PlayerOne") as Actor;
    const state = await loadArenaState();
    let data;
    switch (body.action) {
      case "reset":
        data = await resetArenaStateFile();
        break;
      case "createChallenge":
        data = createChallengeInState(state, body.challenge, actor);
        break;
      case "acceptChallenge":
        data = acceptChallengeInState(state, body.challengeId, actor);
        break;
      case "counterOffer":
        data = counterOfferInState(state, body.challengeId, actor, body.terms);
        break;
      case "sendMessage":
        data = sendRoomMessageInState(state, body.roomId, actor, body.message, body.attachment);
        break;
      case "approveTerms":
        data = approveTermsInState(state, body.roomId, actor, Boolean(body.wager));
        break;
      case "checkIn":
        data = checkInInState(state, body.roomId, actor);
        break;
      case "submitResult":
        data = submitResultInState(state, body.roomId, actor, body.result);
        break;
      default:
        return Response.json({ error: "Unknown action." }, { status: 400 });
    }
    if (body.action !== "reset") await saveArenaState(state);
    return Response.json({ ok: true, data, state: body.action === "reset" ? data : state });
  } catch (error) {
    return Response.json({ error: error instanceof Error ? error.message : "Request failed." }, { status: 400 });
  }
}
