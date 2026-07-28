import assert from "node:assert/strict";

const base = "http://localhost:3002/api/arena";

async function api(action, actor, payload = {}) {
  const response = await fetch(base, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ action, actor, ...payload }),
  });
  const body = await response.json();
  return { status: response.status, body };
}

await api("reset", "Admin");

const created = await api("createChallenge", "PlayerOne", {
  challenge: {
    game: "CODM",
    matchKind: "Player vs player",
    teamSize: "1v1",
    weaponClass: "Assault Rifle",
    weapon: "DR-H",
    map: "Shipment",
    mode: "Gunfight",
    prizeType: "Wager",
    wagerAmount: 20,
  },
});
assert.equal(created.status, 200);
const challengeId = created.body.data.id;

const ownAccept = await api("acceptChallenge", "PlayerOne", { challengeId });
assert.equal(ownAccept.status, 400);
assert.match(ownAccept.body.error, /Creator cannot accept/);

const accepted = await api("acceptChallenge", "NovaAce", { challengeId });
assert.equal(accepted.status, 200);
const roomId = accepted.body.data.id;

const duplicateAccept = await api("acceptChallenge", "NovaAce", { challengeId });
assert.equal(duplicateAccept.status, 400);
assert.match(duplicateAccept.body.error, /not open/);

const outsiderMessage = await api("sendMessage", "RivalUser", { roomId, message: "I should not see this room." });
assert.equal(outsiderMessage.status, 400);
assert.match(outsiderMessage.body.error, /cannot access/);

const prematureReset = await api("reset", "Admin");
assert.equal(prematureReset.status, 200);
const roomlessCheckin = await api("checkIn", "PlayerOne", { roomId });
assert.equal(roomlessCheckin.status, 400);
assert.match(roomlessCheckin.body.error, /Room not found/);

const state = await fetch(base).then((response) => response.json());
assert.ok(state.persistence);

console.log(JSON.stringify({
  ok: true,
  checked: [
    "User A can create a challenge",
    "User A cannot accept own challenge",
    "User B can accept it",
    "Duplicate acceptance rejected",
    "User C cannot access private room messages",
    "Missing room check-in rejected",
    "Persistent repository metadata returned",
  ],
}, null, 2));
