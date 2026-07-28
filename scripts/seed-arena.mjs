import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const dataDir = path.resolve("data");
const stateFile = path.join(dataDir, "arena-state.json");

const state = {
  challenges: [{
    id: "ch-codm-1v1-demo",
    creator: "PlayerOne",
    game: "CODM",
    matchKind: "Player vs player",
    teamSize: "1v1",
    weaponClass: "Assault Rifle",
    weapon: "DR-H",
    map: "Shipment",
    mode: "Gunfight",
    rules: "No scorestreaks, no operator skills, screenshots required.",
    region: "Europe",
    server: "EU-West",
    date: "2026-08-02",
    time: "20:30",
    prizeType: "Wager",
    wagerAmount: 20,
    stakePerSide: 20,
    totalPrizePool: 40,
    feePercent: 10,
    feeAmount: 4,
    winnerPayout: 36,
    currency: "USD",
    fundingStatus: "Pending",
    skill: "Legendary",
    status: "Open",
    approvals: { creator: false, opponent: false, creatorWager: false, opponentWager: false },
    checkIns: { creator: false, opponent: false },
    history: ["Challenge created by PlayerOne."],
  }],
  rooms: [],
  notifications: {
    PlayerOne: ["Demo balance enabled. No real money."],
    NovaAce: ["Demo balance enabled. No real money."],
    RivalUser: ["Demo balance enabled. No real money."],
    Admin: ["Admin audit log enabled."],
  },
  wallets: {
    PlayerOne: { balance: 100, locked: 0 },
    NovaAce: { balance: 100, locked: 0 },
    RivalUser: { balance: 100, locked: 0 },
    Admin: { balance: 0, locked: 0 },
  },
  transactions: [],
  auditLog: ["Seeded persistent local development repository."],
};

await mkdir(dataDir, { recursive: true });
await writeFile(stateFile, `${JSON.stringify(state, null, 2)}\n`);
console.log(`Seeded local fixture ${stateFile}. The app runtime uses D1 through /api/arena.`);
