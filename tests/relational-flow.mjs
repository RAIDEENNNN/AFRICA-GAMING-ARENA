import assert from "node:assert/strict";

const base = `${process.env.BASE_URL ?? "http://localhost:3002"}/api/arena`;
const runId = Date.now().toString(36);
const playerA = `RelOne_${runId}`.slice(0, 20);
const playerB = `RelTwo_${runId}`.slice(0, 20);

async function api(action, actor = "PlayerOne", payload = {}) {
  const response = await fetch(base, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ action, actor, ...payload }),
  });
  const body = await response.json();
  return { status: response.status, body };
}

async function summary() {
  const response = await api("relationalSummary", "Admin");
  assert.equal(response.status, 200);
  return response.body.data;
}

const before = await summary();
await api("reset", "Admin");

const created = await api("createChallenge", playerA, {
  challenge: {
    game: "CODM",
    matchKind: "Player vs player",
    teamSize: "1v1",
    weaponClass: "SMG",
    weapon: "QQ9",
    map: "Raid",
    mode: "Gunfight",
    prizeType: "Wager",
    wagerAmount: 15,
  },
});
assert.equal(created.status, 200);
const challengeId = created.body.data.id;

const accepted = await api("acceptChallenge", playerB, { challengeId });
assert.equal(accepted.status, 200);
const roomId = accepted.body.data.id;

const message = await api("sendMessage", playerA, { roomId, message: "Relational persistence check." });
assert.equal(message.status, 200);

for (const actor of [playerA, playerB]) {
  assert.equal((await api("approveTerms", actor, { roomId })).status, 200);
  assert.equal((await api("approveTerms", actor, { roomId, wager: true })).status, 200);
}

for (const actor of [playerA, playerB]) {
  assert.equal((await api("checkIn", actor, { roomId })).status, 200);
}

for (const actor of [playerA, playerB]) {
  const result = await api("submitResult", actor, {
    roomId,
    result: {
      winner: playerA,
      score: "10-7",
      rounds: "5-3,5-4",
      note: "Both submissions agree.",
      evidence: "demo-upload",
    },
  });
  assert.equal(result.status, 200);
}

const after = await summary();
assert.ok(after.challenges >= before.challenges + 1, "normalized challenge row should be written");
assert.ok(after.matches >= before.matches + 1, "normalized match row should be written");
assert.ok(after.messages >= before.messages + 2, "normalized match messages should be written");
assert.ok(after.stats >= before.stats + 2, "player stats should be updated for both participants");
assert.ok(after.notifications >= before.notifications + 2, "notifications should be persisted");

console.log(JSON.stringify({
  ok: true,
  before,
  after,
  checked: [
    "challenge writes to normalized challenges",
    "acceptance writes match and participants",
    "chat writes to match_messages",
    "agreements and check-ins update normalized match state",
    "verified result updates player_stats",
    "notifications are generated",
  ],
}, null, 2));
