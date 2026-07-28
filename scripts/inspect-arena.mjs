import { readFile } from "node:fs/promises";
import path from "node:path";

const stateFile = path.resolve("data/arena-state.json");
const state = JSON.parse(await readFile(stateFile, "utf8"));

console.log(JSON.stringify({
  challenges: state.challenges.map((item) => ({ id: item.id, creator: item.creator, opponent: item.opponent, status: item.status, wager: item.wagerAmount })),
  rooms: state.rooms.map((item) => ({ id: item.id, challengeId: item.challengeId, status: item.status, messages: item.messages.length })),
  transactions: state.transactions,
  notifications: state.notifications,
  auditLog: state.auditLog,
}, null, 2));
