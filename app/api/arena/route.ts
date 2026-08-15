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
import { getCurrentUser } from "../../auth";
import {
  relationalSummary,
  syncAgreement,
  syncChallengeAccepted,
  syncChallengeCreated,
  syncCheckIn,
  syncResult,
  syncRoomMessage,
} from "../../arena-relational-repository";

export async function GET() {
  const state = await loadArenaState();
  return Response.json({ ...state, persistence: persistentStoreInfo() });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const currentUser = await getCurrentUser(request);
    const actor = (currentUser?.username ?? body.actor ?? "PlayerOne") as Actor;
    const state = await loadArenaState();
    let data;
    switch (body.action) {
      case "reset":
        data = await resetArenaStateFile();
        break;
      case "createChallenge":
        data = createChallengeInState(state, body.challenge, actor);
        await syncChallengeCreated(data, currentUser);
        break;
      case "acceptChallenge":
        data = acceptChallengeInState(state, body.challengeId, actor);
        await syncChallengeAccepted(state.challenges.find((item) => item.id === body.challengeId)!, data, currentUser, actor);
        break;
      case "counterOffer":
        data = counterOfferInState(state, body.challengeId, actor, body.terms);
        break;
      case "sendMessage":
        data = sendRoomMessageInState(state, body.roomId, actor, body.message, body.attachment);
        await syncRoomMessage(state.rooms.find((item) => item.id === body.roomId)!, data, currentUser);
        break;
      case "approveTerms":
        data = approveTermsInState(state, body.roomId, actor, Boolean(body.wager));
        await syncAgreement(data.challenge, data.room, actor, currentUser);
        break;
      case "checkIn":
        data = checkInInState(state, body.roomId, actor);
        await syncCheckIn(data.challenge, data.room, actor, currentUser);
        break;
      case "submitResult":
        data = submitResultInState(state, body.roomId, actor, body.result);
        {
          const submission = data.room.resultA?.submittedBy === actor ? data.room.resultA : data.room.resultB;
          if (submission) await syncResult(data.challenge, data.room, submission, currentUser);
        }
        break;
      case "relationalSummary":
        data = await relationalSummary();
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
