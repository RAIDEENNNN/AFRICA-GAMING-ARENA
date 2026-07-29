export type GameName = "CODM" | "PUBG Mobile" | "Free Fire";
export type MatchKind = "Player vs player" | "Team vs team" | "Clan vs clan";
export type PrizeType = "Free" | "Ranked" | "Wager";
export type ChallengeStatus = "Open" | "Negotiating" | "Accepted" | "Complete";
export type RoomStatus = "Terms" | "Ready" | "Result review" | "Verified" | "Dispute";
export type Actor = "PlayerOne" | "NovaAce" | "RivalUser" | "Admin";

export type Challenge = {
  id: string;
  creator: string;
  opponent?: string;
  game: GameName;
  matchKind: MatchKind;
  teamSize: "1v1" | "2v2" | "3v3" | "4v4" | "5v5";
  weaponClass: string;
  weapon: string;
  map: string;
  mode: string;
  rules: string;
  region: string;
  server: string;
  date: string;
  time: string;
  prizeType: PrizeType;
  wagerAmount: number;
  stakePerSide: number;
  totalPrizePool: number;
  feePercent: number;
  feeAmount: number;
  winnerPayout: number;
  currency: "USD";
  fundingStatus: "Not required" | "Pending" | "Locked" | "Paid" | "Frozen" | "Refunded";
  skill: string;
  status: ChallengeStatus;
  approvals: { creator: boolean; opponent: boolean; creatorWager: boolean; opponentWager: boolean };
  checkIns: { creator: boolean; opponent: boolean };
  history: string[];
};

export type ChatMessage = {
  id: string;
  author: Actor | "System";
  body: string;
  at: string;
  system?: boolean;
  pinned?: boolean;
  replyTo?: string;
  attachment?: string;
  read?: boolean;
};

export type ResultSubmission = {
  submittedBy: Actor;
  winner: string;
  score: string;
  rounds: string;
  note: string;
  evidence: string;
};

export type MatchRoom = {
  id: string;
  challengeId: string;
  status: RoomStatus;
  messages: ChatMessage[];
  resultA?: ResultSubmission;
  resultB?: ResultSubmission;
};

export type WalletTransaction = {
  id: string;
  user: Actor;
  amount: number;
  kind: "demo_lock" | "demo_payout" | "demo_refund" | "demo_freeze";
  status: string;
  at: string;
};

export type ArenaState = {
  challenges: Challenge[];
  rooms: MatchRoom[];
  notifications: Record<Actor, string[]>;
  wallets: Record<Actor, { balance: number; locked: number }>;
  transactions: WalletTransaction[];
  auditLog: string[];
};

export const gameConfig: Record<GameName, { weapons: Record<string, string[]>; maps: string[]; modes: string[]; accent: string }> = {
  CODM: {
    accent: "Tactical multiplayer",
    weapons: {
      "Assault Rifle": ["DR-H", "Kilo 141", "M13", "AK117"],
      SMG: ["CBR4", "QQ9", "Fennec", "Switchblade X9"],
      Sniper: ["DL Q33", "Locus", "Arctic .50"],
      Shotgun: ["BY15", "KRM-262", "HS0405"],
    },
    maps: ["Shipment", "Raid", "Firing Range", "Standoff", "Nuketown"],
    modes: ["Gunfight", "Search and Destroy", "Hardpoint", "Domination"],
  },
  "PUBG Mobile": {
    accent: "Battle Royale and Arena",
    weapons: {
      "Assault Rifle": ["M416", "AKM", "SCAR-L", "AUG"],
      DMR: ["Mini14", "SLR", "MK12"],
      Sniper: ["Kar98k", "M24", "AWM"],
      SMG: ["UMP45", "Vector", "UZI"],
    },
    maps: ["Erangel", "Miramar", "Sanhok", "Livik", "Arena Warehouse"],
    modes: ["Battle Royale", "Custom Room", "Team Deathmatch", "4v4 Arena"],
  },
  "Free Fire": {
    accent: "Clash Squad and guild battles",
    weapons: {
      "Assault Rifle": ["SCAR", "XM8", "AK", "AN94"],
      SMG: ["MP40", "UMP", "Thompson"],
      Sniper: ["AWM", "M82B", "Kar98k"],
      Shotgun: ["M1014", "M1887", "SPAS12"],
    },
    maps: ["Bermuda", "Purgatory", "Kalahari", "Alpine", "Nexterra"],
    modes: ["Clash Squad", "Battle Royale", "Guild vs Guild", "Custom Room"],
  },
};

export function wagerMath(amount: number) {
  const stakePerSide = Math.max(0, Number(amount) || 0);
  const totalPrizePool = stakePerSide * 2;
  const feePercent = 10;
  const feeAmount = Math.round(totalPrizePool * (feePercent / 100) * 100) / 100;
  const winnerPayout = totalPrizePool - feeAmount;
  return { stakePerSide, totalPrizePool, feePercent, feeAmount, winnerPayout };
}

export function makeChallenge(input: Partial<Challenge> = {}): Challenge {
  const game = input.game ?? "CODM";
  const cfg = gameConfig[game];
  const weaponClass = input.weaponClass ?? Object.keys(cfg.weapons)[0];
  const prizeType = input.prizeType ?? "Wager";
  const amount = prizeType === "Wager" ? Number(input.wagerAmount ?? 20) : 0;
  return {
    id: input.id ?? `ch-${Date.now()}`,
    creator: input.creator ?? "PlayerOne",
    opponent: input.opponent,
    game,
    matchKind: input.matchKind ?? "Player vs player",
    teamSize: input.teamSize ?? "1v1",
    weaponClass,
    weapon: input.weapon ?? cfg.weapons[weaponClass][0],
    map: input.map ?? cfg.maps[0],
    mode: input.mode ?? cfg.modes[0],
    rules: input.rules ?? "No scorestreaks, no operator skills, screenshots required.",
    region: input.region ?? "Europe",
    server: input.server ?? "EU-West",
    date: input.date ?? "2026-08-02",
    time: input.time ?? "20:30",
    prizeType,
    wagerAmount: amount,
    ...wagerMath(amount),
    currency: "USD",
    fundingStatus: amount > 0 ? "Pending" : "Not required",
    skill: input.skill ?? "Legendary",
    status: input.status ?? "Open",
    approvals: input.approvals ?? { creator: false, opponent: false, creatorWager: false, opponentWager: false },
    checkIns: input.checkIns ?? { creator: false, opponent: false },
    history: input.history ?? ["Challenge created by PlayerOne."],
  };
}

export const initialArenaState: ArenaState = {
  challenges: [makeChallenge({ id: "ch-codm-1v1-demo" })],
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
  auditLog: ["Seeded local server demo state."],
};

export function createChallengeInState(state: ArenaState, input: Partial<Challenge>, actor: Actor) {
  if (actor !== "PlayerOne" && actor !== "NovaAce" && actor !== "RivalUser") throw new Error("Only players can create challenges.");
  const challenge = makeChallenge({ ...input, creator: actor, id: `ch-${Date.now()}` });
  state.challenges.unshift(challenge);
  state.notifications[actor].unshift(`${challenge.teamSize} ${challenge.game} challenge published.`);
  state.auditLog.unshift(`${actor} created challenge ${challenge.id}.`);
  return challenge;
}

export function acceptChallengeInState(state: ArenaState, id: string, actor: Actor) {
  const challenge = state.challenges.find((item) => item.id === id);
  if (!challenge) throw new Error("Challenge not found.");
  if (challenge.creator === actor) throw new Error("Creator cannot accept their own challenge.");
  if (challenge.status !== "Open" && challenge.status !== "Negotiating") throw new Error("Challenge is not open.");
  challenge.opponent = actor;
  challenge.status = "Accepted";
  challenge.history.push(`${actor} accepted the challenge. Agreement opened.`);
  if (challenge.prizeType === "Wager") {
    for (const user of [challenge.creator, actor] as Actor[]) {
      state.wallets[user].balance -= challenge.stakePerSide;
      state.wallets[user].locked += challenge.stakePerSide;
      state.transactions.unshift({ id: `tx-${Date.now()}-${user}`, user, amount: challenge.stakePerSide, kind: "demo_lock", status: "Locked for match", at: new Date().toISOString() });
    }
    challenge.fundingStatus = "Locked";
  }
  const room: MatchRoom = {
    id: `match-${challenge.id}`,
    challengeId: challenge.id,
    status: "Terms",
    messages: [
      systemMessage(`${actor} accepted the challenge. Private match room opened.`, true),
      { id: `msg-${Date.now()}`, author: actor, body: "Ready. Can we confirm the map and start time?", at: new Date().toLocaleTimeString(), read: true },
    ],
  };
  state.rooms.unshift(room);
  state.notifications[challenge.creator as Actor].unshift(`${actor} accepted ${challenge.id}.`);
  state.auditLog.unshift(`${actor} accepted challenge ${challenge.id}.`);
  return room;
}

export function counterOfferInState(state: ArenaState, id: string, actor: Actor, terms: Partial<Challenge>) {
  const challenge = state.challenges.find((item) => item.id === id);
  if (!challenge) throw new Error("Challenge not found.");
  if (challenge.creator === actor && !challenge.opponent) throw new Error("No opponent to negotiate with yet.");
  const previous = `${challenge.map} / ${challenge.weapon} / $${challenge.wagerAmount}`;
  Object.assign(challenge, terms);
  Object.assign(challenge, wagerMath(challenge.prizeType === "Wager" ? challenge.wagerAmount : 0));
  challenge.status = "Negotiating";
  challenge.approvals = { creator: false, opponent: false, creatorWager: false, opponentWager: false };
  challenge.history.push(`${actor} proposed changes. Previous: ${previous}. New: ${challenge.map} / ${challenge.weapon} / $${challenge.wagerAmount}. Approvals reset.`);
  state.auditLog.unshift(`${actor} proposed new terms for ${id}.`);
  return challenge;
}

export function sendRoomMessageInState(state: ArenaState, roomId: string, actor: Actor, body: string, attachment?: string) {
  const { room } = requireRoom(state, roomId, actor);
  const message: ChatMessage = { id: `msg-${Date.now()}-${room.messages.length}`, author: actor, body, attachment, at: new Date().toLocaleTimeString(), read: false };
  room.messages.push(message);
  return message;
}

export function approveTermsInState(state: ArenaState, roomId: string, actor: Actor, wager = false) {
  const { room, challenge, side } = requireRoom(state, roomId, actor);
  if (room.status === "Verified") throw new Error("Verified match cannot be changed.");
  if (wager) challenge.approvals[side === "creator" ? "creatorWager" : "opponentWager"] = true;
  else challenge.approvals[side] = true;
  room.messages.push(systemMessage(`${actor} approved ${wager ? "the wager" : "the final terms"}.`));
  const termsOk = challenge.approvals.creator && challenge.approvals.opponent;
  const wagerOk = challenge.prizeType !== "Wager" || (challenge.approvals.creatorWager && challenge.approvals.opponentWager);
  if (termsOk && wagerOk) {
    room.status = "Ready";
    challenge.history.push("Both sides accepted the final terms. Agreement locked.");
    room.messages.push(systemMessage("Both sides accepted the final terms. Agreement locked.", true));
  }
  return { room, challenge };
}

export function checkInInState(state: ArenaState, roomId: string, actor: Actor) {
  const { room, challenge, side } = requireRoom(state, roomId, actor);
  if (room.status !== "Ready") throw new Error("Terms and wager must be approved before check-in.");
  challenge.checkIns[side] = true;
  room.messages.push(systemMessage(`${actor} checked in.`));
  return { room, challenge };
}

export function submitResultInState(state: ArenaState, roomId: string, actor: Actor, result: Omit<ResultSubmission, "submittedBy">) {
  const { room, challenge, side } = requireRoom(state, roomId, actor);
  const payload = { ...result, submittedBy: actor };
  if (side === "creator") room.resultA = payload;
  else room.resultB = payload;
  room.status = "Result review";
  room.messages.push(systemMessage(`${actor} submitted result ${result.score}.`));
  if (room.resultA && room.resultB) {
    const same = room.resultA.winner === room.resultB.winner && room.resultA.score === room.resultB.score;
    room.status = same ? "Verified" : "Dispute";
    challenge.status = same ? "Complete" : "Accepted";
    if (same) {
      challenge.fundingStatus = "Paid";
      const winner = room.resultA.winner as Actor;
      const users = [challenge.creator, challenge.opponent] as Actor[];
      for (const user of users) state.wallets[user].locked = Math.max(0, state.wallets[user].locked - challenge.stakePerSide);
      if (state.wallets[winner]) {
        state.wallets[winner].balance += challenge.winnerPayout;
        state.transactions.unshift({ id: `tx-${Date.now()}-payout`, user: winner, amount: challenge.winnerPayout, kind: "demo_payout", status: "Demo payout completed", at: new Date().toISOString() });
      }
      challenge.history.push("Result verified. Leaderboards, profiles and demo wallet updated.");
      room.messages.push(systemMessage("Match result verified. Leaderboard and demo wallet updated.", true));
    } else {
      challenge.fundingStatus = "Frozen";
      state.transactions.unshift({ id: `tx-${Date.now()}-freeze`, user: "Admin", amount: challenge.totalPrizePool, kind: "demo_freeze", status: "Frozen for dispute", at: new Date().toISOString() });
      challenge.history.push("Conflict detected. Dispute opened and demo wager frozen.");
      room.messages.push(systemMessage("Dispute opened. Moderator visibility enabled and demo wager frozen.", true));
    }
  }
  return { room, challenge };
}

function requireRoom(state: ArenaState, roomId: string, actor: Actor) {
  const room = state.rooms.find((item) => item.id === roomId);
  if (!room) throw new Error("Room not found.");
  const challenge = state.challenges.find((item) => item.id === room.challengeId);
  if (!challenge) throw new Error("Challenge not found.");
  const side = challenge.creator === actor ? "creator" : challenge.opponent === actor ? "opponent" : null;
  if (!side && actor !== "Admin") throw new Error("User cannot access this private match room.");
  return { state, room, challenge, side: side ?? "creator" };
}

function systemMessage(body: string, pinned = false): ChatMessage {
  return { id: `sys-${Date.now()}-${Math.random()}`, author: "System", body, at: new Date().toLocaleTimeString(), system: true, pinned, read: true };
}
