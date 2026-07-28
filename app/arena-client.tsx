"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { games } from "./data";

type GameName = "CODM" | "PUBG Mobile" | "Free Fire";
type MatchKind = "Player vs player" | "Team vs team" | "Clan vs clan";
type PrizeType = "Free" | "Ranked" | "Wager";
type ChallengeStatus = "Open" | "Negotiating" | "Accepted" | "Complete";

type Challenge = {
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
  skill: string;
  status: ChallengeStatus;
  approvals: { creator: boolean; opponent: boolean; creatorWager: boolean; opponentWager: boolean };
  checkIns: { creator: boolean; opponent: boolean };
  history: string[];
};

type ChatMessage = {
  id: string;
  author: string;
  body: string;
  at: string;
  system?: boolean;
  pinned?: boolean;
  replyTo?: string;
  attachment?: string;
  read?: boolean;
};

type MatchRoom = {
  id: string;
  challengeId: string;
  status: "Terms" | "Ready" | "Result review" | "Verified" | "Dispute";
  messages: ChatMessage[];
  resultA?: ResultSubmission;
  resultB?: ResultSubmission;
};

type ResultSubmission = {
  winner: string;
  score: string;
  rounds: string;
  note: string;
  evidence: string;
};

type ArenaState = {
  challenges: Challenge[];
  rooms: MatchRoom[];
  notifications: string[];
};

const gameConfig: Record<GameName, { weapons: Record<string, string[]>; maps: string[]; modes: string[]; accent: string }> = {
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

const seedChallenge: Challenge = {
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
  skill: "Legendary",
  status: "Open",
  approvals: { creator: false, opponent: false, creatorWager: false, opponentWager: false },
  checkIns: { creator: false, opponent: false },
  history: ["Challenge created by PlayerOne."],
};

const initialState: ArenaState = {
  challenges: [seedChallenge],
  rooms: [],
  notifications: ["Demo balances enabled. Real money processing is disabled."],
};

const storageKey = "clan-arena-demo-state-v2";

function useArenaState() {
  const [state, setState] = useState<ArenaState>(initialState);

  useEffect(() => {
    const saved = window.localStorage.getItem(storageKey);
    if (saved) setState(JSON.parse(saved));
  }, []);

  useEffect(() => {
    window.localStorage.setItem(storageKey, JSON.stringify(state));
  }, [state]);

  return [state, setState] as const;
}

function prizeMath(amount: number) {
  const pool = amount * 2;
  const fee = Math.round(pool * 0.1 * 100) / 100;
  return { pool, fee, payout: pool - fee };
}

function currentRoom(state: ArenaState, id?: string) {
  return state.rooms.find((room) => room.id === id) ?? state.rooms[0];
}

function addSystem(room: MatchRoom, body: string) {
  room.messages.push({ id: `msg-${Date.now()}-${room.messages.length}`, author: "System", body, at: new Date().toLocaleTimeString(), system: true, read: true });
}

export function CreateChallengeFlow() {
  const [, setState] = useArenaState();
  const [form, setForm] = useState<Challenge>({ ...seedChallenge, id: "", status: "Open", history: [] });
  const config = gameConfig[form.game];
  const weaponClasses = Object.keys(config.weapons);
  const weapons = config.weapons[form.weaponClass] ?? [];
  const math = prizeMath(form.wagerAmount);

  function patch(next: Partial<Challenge>) {
    const merged = { ...form, ...next };
    const nextConfig = gameConfig[merged.game];
    if (!nextConfig.weapons[merged.weaponClass]) merged.weaponClass = Object.keys(nextConfig.weapons)[0];
    merged.weapon = nextConfig.weapons[merged.weaponClass][0];
    if (!nextConfig.maps.includes(merged.map)) merged.map = nextConfig.maps[0];
    if (!nextConfig.modes.includes(merged.mode)) merged.mode = nextConfig.modes[0];
    setForm(merged);
  }

  function publish() {
    const id = `ch-${Date.now()}`;
    const challenge = {
      ...form,
      id,
      wagerAmount: form.prizeType === "Wager" ? Number(form.wagerAmount || 1) : 0,
      history: [`${form.creator} published the challenge.`],
    };
    setState((state) => ({
      ...state,
      challenges: [challenge, ...state.challenges],
      notifications: [`${challenge.teamSize} ${challenge.game} challenge published.`, ...state.notifications],
    }));
    window.location.href = "/matches?created=1";
  }

  return (
    <section className="product-form flow-form">
      <div className="flow-grid">
        <label>Game<select className="field" value={form.game} onChange={(e) => patch({ game: e.target.value as GameName })}>{Object.keys(gameConfig).map((name) => <option key={name}>{name}</option>)}</select></label>
        <label>Match type<select className="field" value={form.matchKind} onChange={(e) => setForm({ ...form, matchKind: e.target.value as MatchKind })}>{["Player vs player", "Team vs team", "Clan vs clan"].map((item) => <option key={item}>{item}</option>)}</select></label>
        <label>Team size<select className="field" value={form.teamSize} onChange={(e) => setForm({ ...form, teamSize: e.target.value as Challenge["teamSize"] })}>{["1v1", "2v2", "3v3", "4v4", "5v5"].map((item) => <option key={item}>{item}</option>)}</select></label>
        <label>Weapon class<select className="field" value={form.weaponClass} onChange={(e) => patch({ weaponClass: e.target.value })}>{weaponClasses.map((item) => <option key={item}>{item}</option>)}</select></label>
        <label>Weapon<select className="field" value={form.weapon} onChange={(e) => setForm({ ...form, weapon: e.target.value })}>{weapons.map((item) => <option key={item}>{item}</option>)}</select></label>
        <label>Map<select className="field" value={form.map} onChange={(e) => setForm({ ...form, map: e.target.value })}>{config.maps.map((item) => <option key={item}>{item}</option>)}</select></label>
        <label>Mode<select className="field" value={form.mode} onChange={(e) => setForm({ ...form, mode: e.target.value })}>{config.modes.map((item) => <option key={item}>{item}</option>)}</select></label>
        <label>Region<select className="field" value={form.region} onChange={(e) => setForm({ ...form, region: e.target.value })}>{["Europe", "North America", "MENA", "LATAM", "Asia"].map((item) => <option key={item}>{item}</option>)}</select></label>
        <label>Server<input className="field" value={form.server} onChange={(e) => setForm({ ...form, server: e.target.value })} /></label>
        <label>Date<input className="field" type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} /></label>
        <label>Time<input className="field" type="time" value={form.time} onChange={(e) => setForm({ ...form, time: e.target.value })} /></label>
        <label>Prize type<select className="field" value={form.prizeType} onChange={(e) => setForm({ ...form, prizeType: e.target.value as PrizeType })}>{["Free", "Ranked", "Wager"].map((item) => <option key={item}>{item}</option>)}</select></label>
        {form.prizeType === "Wager" ? <label>Wager amount<input className="field" type="number" min="1" value={form.wagerAmount} onChange={(e) => setForm({ ...form, wagerAmount: Number(e.target.value) })} /></label> : null}
        <label>Skill level<select className="field" value={form.skill} onChange={(e) => setForm({ ...form, skill: e.target.value })}>{["Casual", "Pro", "Master", "Legendary"].map((item) => <option key={item}>{item}</option>)}</select></label>
      </div>
      <label>Match rules<textarea className="field" value={form.rules} onChange={(e) => setForm({ ...form, rules: e.target.value })} /></label>
      <article className="review-panel">
        <h2>Review challenge</h2>
        <p>{form.game} / {config.accent} / {form.teamSize} / {form.weapon} / {form.map} / {form.mode}</p>
        <p>{form.region} {form.server} / {form.date} at {form.time} / {form.prizeType}</p>
        {form.prizeType === "Wager" ? <p>Player One stake ${form.wagerAmount} / Player Two stake ${form.wagerAmount} / Pool ${math.pool} / Fee ${math.fee} / Winner payout ${math.payout}</p> : null}
      </article>
      <button className="btn primary" onClick={publish}>Publish challenge</button>
    </section>
  );
}

export function ChallengeDiscovery({ gameFilter }: { gameFilter?: GameName }) {
  const [state, setState] = useArenaState();
  const [filters, setFilters] = useState({ game: gameFilter ?? "All", size: "All", weapon: "All", map: "All", mode: "All", prize: "All", region: "All", status: "Open" });
  const visible = state.challenges.filter((challenge) =>
    (!gameFilter || challenge.game === gameFilter) &&
    (filters.game === "All" || challenge.game === filters.game) &&
    (filters.size === "All" || challenge.teamSize === filters.size) &&
    (filters.weapon === "All" || challenge.weaponClass === filters.weapon || challenge.weapon === filters.weapon) &&
    (filters.map === "All" || challenge.map === filters.map) &&
    (filters.mode === "All" || challenge.mode === filters.mode) &&
    (filters.prize === "All" || challenge.prizeType === filters.prize) &&
    (filters.region === "All" || challenge.region === filters.region) &&
    (filters.status === "All" || challenge.status === filters.status)
  );
  const allMaps = [...new Set(Object.values(gameConfig).flatMap((item) => item.maps))];
  const allModes = [...new Set(Object.values(gameConfig).flatMap((item) => item.modes))];

  function accept(challenge: Challenge) {
    const roomId = `match-${challenge.id}`;
    const accepted = { ...challenge, opponent: "NovaAce", status: "Accepted" as ChallengeStatus, history: [...challenge.history, "NovaAce accepted the challenge. Agreement opened."] };
    const room: MatchRoom = {
      id: roomId,
      challengeId: challenge.id,
      status: "Terms",
      messages: [
        { id: "sys-accept", author: "System", body: "NovaAce accepted the challenge. Private match room opened.", at: new Date().toLocaleTimeString(), system: true, pinned: true, read: true },
        { id: "msg-hi", author: "NovaAce", body: "Ready. Can we confirm the map and start time?", at: new Date().toLocaleTimeString(), read: true },
      ],
    };
    setState((state) => ({
      ...state,
      challenges: state.challenges.map((item) => item.id === challenge.id ? accepted : item),
      rooms: [room, ...state.rooms.filter((item) => item.challengeId !== challenge.id)],
      notifications: [`NovaAce accepted ${challenge.id}.`, ...state.notifications],
    }));
    window.location.href = `/matches/${roomId}`;
  }

  function counter(challenge: Challenge) {
    setState((state) => ({
      ...state,
      challenges: state.challenges.map((item) => item.id === challenge.id ? { ...item, status: "Negotiating", map: "Raid", wagerAmount: item.prizeType === "Wager" ? 20 : item.wagerAmount, approvals: { creator: false, opponent: false, creatorWager: false, opponentWager: false }, history: [...item.history, "NovaAce proposed map change from Shipment to Raid. Approvals reset."] } : item),
      notifications: [`Counter-offer sent for ${challenge.id}.`, ...state.notifications],
    }));
  }

  return (
    <section className="page-section">
      <div className="filter-bar deep-filter">
        <select className="field" value={filters.game} onChange={(e) => setFilters({ ...filters, game: e.target.value })}><option>All</option>{Object.keys(gameConfig).map((item) => <option key={item}>{item}</option>)}</select>
        <select className="field" value={filters.size} onChange={(e) => setFilters({ ...filters, size: e.target.value })}><option>All</option>{["1v1", "2v2", "3v3", "4v4", "5v5"].map((item) => <option key={item}>{item}</option>)}</select>
        <select className="field" value={filters.weapon} onChange={(e) => setFilters({ ...filters, weapon: e.target.value })}><option>All</option>{["Assault Rifle", "SMG", "Sniper", "Shotgun", "DMR"].map((item) => <option key={item}>{item}</option>)}</select>
        <select className="field" value={filters.map} onChange={(e) => setFilters({ ...filters, map: e.target.value })}><option>All</option>{allMaps.map((item) => <option key={item}>{item}</option>)}</select>
        <select className="field" value={filters.mode} onChange={(e) => setFilters({ ...filters, mode: e.target.value })}><option>All</option>{allModes.map((item) => <option key={item}>{item}</option>)}</select>
        <select className="field" value={filters.prize} onChange={(e) => setFilters({ ...filters, prize: e.target.value })}><option>All</option>{["Free", "Ranked", "Wager"].map((item) => <option key={item}>{item}</option>)}</select>
        <select className="field" value={filters.region} onChange={(e) => setFilters({ ...filters, region: e.target.value })}><option>All</option>{["Europe", "North America", "MENA", "LATAM", "Asia"].map((item) => <option key={item}>{item}</option>)}</select>
        <select className="field" value={filters.status} onChange={(e) => setFilters({ ...filters, status: e.target.value })}><option>Open</option><option>Negotiating</option><option>Accepted</option><option>Complete</option><option>All</option></select>
      </div>
      <div className="card-grid three">
        {visible.map((challenge) => (
          <article className="product-card challenge-card live-challenge" key={challenge.id}>
            <span className="tag">{challenge.status}</span>
            <h3>{challenge.teamSize} {challenge.game} {challenge.weaponClass}</h3>
            <p>{challenge.creator} / {challenge.matchKind} / {challenge.skill}</p>
            <dl>
              <div><dt>Weapon</dt><dd>{challenge.weapon}</dd></div>
              <div><dt>Map</dt><dd>{challenge.map}</dd></div>
              <div><dt>Mode</dt><dd>{challenge.mode}</dd></div>
              <div><dt>Region</dt><dd>{challenge.region}</dd></div>
              <div><dt>Date</dt><dd>{challenge.date} {challenge.time}</dd></div>
              <div><dt>Wager</dt><dd>{challenge.prizeType === "Wager" ? `$${challenge.wagerAmount} per side` : challenge.prizeType}</dd></div>
            </dl>
            <div className="button-row">
              <button className="btn primary small" onClick={() => accept(challenge)}>Accept</button>
              <button className="btn secondary small" onClick={() => counter(challenge)}>Suggest Raid</button>
              <Link className="btn ghost small" href={`/matches/${`match-${challenge.id}`}`}>View details</Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export function MatchRoomClient({ roomId }: { roomId?: string }) {
  const [state, setState] = useArenaState();
  const room = currentRoom(state, roomId);
  const challenge = room ? state.challenges.find((item) => item.id === room.challengeId) : state.challenges[0];
  const [message, setMessage] = useState("");
  const [replyTo, setReplyTo] = useState("");
  const [result, setResult] = useState<ResultSubmission>({ winner: "PlayerOne", score: "15-12", rounds: "6-4, 4-6, 5-2", note: "Clean match, screenshots uploaded.", evidence: "scoreboard.png" });

  if (!challenge || !room) {
    return <article className="product-card"><h2>No match room yet</h2><p>Accept a challenge from Find Match to open a private room.</p><Link className="btn primary" href="/matches">Find Match</Link></article>;
  }

  const math = prizeMath(challenge.wagerAmount);

  function updateRoom(mutator: (room: MatchRoom, challenge: Challenge) => void) {
    setState((state) => {
      const rooms = state.rooms.map((item) => item.id === room.id ? { ...item, messages: [...item.messages] } : item);
      const challenges = state.challenges.map((item) => item.id === challenge.id ? { ...item, history: [...item.history] } : item);
      const nextRoom = rooms.find((item) => item.id === room.id)!;
      const nextChallenge = challenges.find((item) => item.id === challenge.id)!;
      mutator(nextRoom, nextChallenge);
      return { ...state, rooms, challenges };
    });
  }

  function sendMessage(attachment?: string) {
    if (!message && !attachment) return;
    updateRoom((nextRoom) => {
      nextRoom.messages.push({ id: `msg-${Date.now()}`, author: "PlayerOne", body: message || "Uploaded evidence image.", attachment, replyTo, at: new Date().toLocaleTimeString(), read: false });
    });
    setMessage("");
    setReplyTo("");
  }

  function approve(side: "creator" | "opponent", wager = false) {
    updateRoom((nextRoom, nextChallenge) => {
      if (wager) nextChallenge.approvals[side === "creator" ? "creatorWager" : "opponentWager"] = true;
      else nextChallenge.approvals[side] = true;
      addSystem(nextRoom, `${side === "creator" ? "PlayerOne" : "NovaAce"} approved ${wager ? "the wager" : "the final terms"}.`);
      const termsOk = nextChallenge.approvals.creator && nextChallenge.approvals.opponent;
      const wagerOk = nextChallenge.prizeType !== "Wager" || (nextChallenge.approvals.creatorWager && nextChallenge.approvals.opponentWager);
      if (termsOk && wagerOk) {
        nextRoom.status = "Ready";
        nextChallenge.history.push("Both sides accepted the final terms. Agreement locked.");
        addSystem(nextRoom, "Both sides accepted the final terms. Agreement locked.");
      }
    });
  }

  function checkIn(side: "creator" | "opponent") {
    updateRoom((nextRoom, nextChallenge) => {
      nextChallenge.checkIns[side] = true;
      addSystem(nextRoom, `${side === "creator" ? "PlayerOne" : "NovaAce"} checked in.`);
    });
  }

  function submitResult(side: "A" | "B") {
    updateRoom((nextRoom, nextChallenge) => {
      if (side === "A") nextRoom.resultA = result;
      else nextRoom.resultB = result;
      addSystem(nextRoom, `${side === "A" ? "PlayerOne" : "NovaAce"} submitted result ${result.score}.`);
      if (nextRoom.resultA && nextRoom.resultB) {
        const same = nextRoom.resultA.winner === nextRoom.resultB.winner && nextRoom.resultA.score === nextRoom.resultB.score;
        nextRoom.status = same ? "Verified" : "Dispute";
        nextChallenge.status = same ? "Complete" : "Accepted";
        nextChallenge.history.push(same ? "Result verified. Leaderboards and profiles updated." : "Conflict detected. Dispute opened and wager frozen.");
        addSystem(nextRoom, same ? "Match result verified. Leaderboard updated." : "Dispute opened. Moderator visibility enabled and wager frozen.");
      }
    });
  }

  return (
    <section className="flow-columns">
      <article className="product-card agreement-panel">
        <h2>Agreement Panel</h2>
        <dl>
          <div><dt>Game</dt><dd>{challenge.game}</dd></div>
          <div><dt>Size</dt><dd>{challenge.teamSize}</dd></div>
          <div><dt>Weapon</dt><dd>{challenge.weaponClass} / {challenge.weapon}</dd></div>
          <div><dt>Map</dt><dd>{challenge.map}</dd></div>
          <div><dt>Mode</dt><dd>{challenge.mode}</dd></div>
          <div><dt>Rules</dt><dd>{challenge.rules}</dd></div>
          <div><dt>Region</dt><dd>{challenge.region} / {challenge.server}</dd></div>
          <div><dt>Date</dt><dd>{challenge.date} {challenge.time}</dd></div>
          <div><dt>Stake</dt><dd>${challenge.wagerAmount} per side</dd></div>
          <div><dt>Payout</dt><dd>Pool ${math.pool} / Fee ${math.fee} / Winner ${math.payout}</dd></div>
        </dl>
        <div className="approval-grid">
          <button className="btn primary small" disabled={challenge.approvals.creator} onClick={() => approve("creator")}>PlayerOne accept terms</button>
          <button className="btn primary small" disabled={challenge.approvals.opponent} onClick={() => approve("opponent")}>NovaAce accept terms</button>
          <button className="btn secondary small" disabled={challenge.approvals.creatorWager} onClick={() => approve("creator", true)}>PlayerOne confirm wager</button>
          <button className="btn secondary small" disabled={challenge.approvals.opponentWager} onClick={() => approve("opponent", true)}>NovaAce confirm wager</button>
        </div>
        <h3>Change history</h3>
        <ul>{challenge.history.map((item) => <li key={item}>{item}</li>)}</ul>
      </article>
      <article className="product-card chat-window">
        <h2>Match chat</h2>
        <p className="presence">NovaAce online / typing indicator ready / moderator visible on dispute</p>
        <div className="message-list">
          {room.messages.map((item) => (
            <button className={item.system ? "message system" : "message"} key={item.id} onClick={() => setReplyTo(item.id)}>
              <strong>{item.pinned ? "Pinned / " : ""}{item.author}</strong>
              <span>{item.body}</span>
              {item.attachment ? <small>Attachment: {item.attachment}</small> : null}
              <em>{item.at} / {item.read ? "read" : "sent"}</em>
            </button>
          ))}
        </div>
        {replyTo ? <small>Replying to {replyTo}</small> : null}
        <input className="field" value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Send match-room message" />
        <div className="button-row">
          <button className="btn primary small" onClick={() => sendMessage()}>Send</button>
          <button className="btn secondary small" onClick={() => sendMessage("screenshot.png")}>Upload screenshot</button>
          <button className="btn secondary small" onClick={() => sendMessage("clip.mp4")}>Upload video</button>
        </div>
      </article>
      <article className="product-card">
        <h2>Check-in and results</h2>
        <p>Countdown: 12:00 / Match starts only when both sides are ready.</p>
        <div className="approval-grid">
          <button className="btn primary small" disabled={challenge.checkIns.creator} onClick={() => checkIn("creator")}>PlayerOne check in</button>
          <button className="btn primary small" disabled={challenge.checkIns.opponent} onClick={() => checkIn("opponent")}>NovaAce check in</button>
          <button className="btn secondary small">Request delay</button>
          <button className="btn secondary small">Approve delay</button>
        </div>
        <label>Winner<input className="field" value={result.winner} onChange={(e) => setResult({ ...result, winner: e.target.value })} /></label>
        <label>Score<input className="field" value={result.score} onChange={(e) => setResult({ ...result, score: e.target.value })} /></label>
        <label>Round scores<input className="field" value={result.rounds} onChange={(e) => setResult({ ...result, rounds: e.target.value })} /></label>
        <label>Evidence<input className="field" value={result.evidence} onChange={(e) => setResult({ ...result, evidence: e.target.value })} /></label>
        <label>Match note<textarea className="field" value={result.note} onChange={(e) => setResult({ ...result, note: e.target.value })} /></label>
        <div className="button-row">
          <button className="btn primary small" onClick={() => submitResult("A")}>Submit as PlayerOne</button>
          <button className="btn primary small" onClick={() => submitResult("B")}>Submit as NovaAce</button>
        </div>
        <p>Status: {room.status}</p>
      </article>
    </section>
  );
}

export function DashboardLive() {
  const [state] = useArenaState();
  const open = state.challenges.filter((item) => item.status === "Open").length;
  const rooms = state.rooms.length;
  const verified = state.rooms.filter((item) => item.status === "Verified").length;
  return (
    <>
      <section className="card-grid four">
        {[["My challenges", state.challenges.length], ["Open", open], ["Match rooms", rooms], ["Verified results", verified]].map(([label, value]) => (
          <article className="product-card metric-card" key={label}><span>{label}</span><strong>{value}</strong></article>
        ))}
      </section>
      <ChallengeDiscovery />
    </>
  );
}

export function LeaderboardLive() {
  const [state] = useArenaState();
  const verified = state.rooms.filter((room) => room.status === "Verified").length;
  const rows = [
    { name: "PlayerOne", game: "CODM", region: "Europe", one: verified ? "1-0" : "0-0", wins: verified, points: 10250 + verified * 120 },
    { name: "NovaAce", game: "CODM", region: "Europe", one: verified ? "0-1" : "0-0", wins: 0, points: 9980 },
    { name: "GhostKing", game: "PUBG Mobile", region: "MENA", one: "0-0", wins: 0, points: 9720 },
  ];
  return (
    <section className="leaderboard-page">
      <div className="chip-row">{["Overall players", "1v1", "2v2", "3v3", "Clans", "CODM", "PUBG Mobile", "Free Fire", "Assault Rifle", "SMG", "Sniper", "Shotgun", "Region", "Season"].map((item) => <span key={item}>{item}</span>)}</div>
      {rows.map((row, index) => (
        <article className="leaderboard-row mobile-card-row" key={row.name}>
          <span>#{index + 1}</span><strong>{row.name}</strong><small>{row.game} / {row.region} / 1v1 {row.one}</small><b>{row.wins} wins</b><em>{row.points}</em>
        </article>
      ))}
    </section>
  );
}

export function ProfileLive() {
  const [state] = useArenaState();
  const verified = state.rooms.filter((room) => room.status === "Verified").length;
  const matches = verified;
  const wins = verified;
  const losses = 0;
  return (
    <section className="page-section">
      <section className="card-grid four">
        {[["Total matches", matches], ["Wins", wins], ["Losses", losses], ["Win rate", matches ? "100%" : "0%"], ["Current streak", wins], ["Best streak", wins], ["1v1 record", `${wins}-${losses}`], ["Ranking", verified ? "#1" : "#12"]].map(([label, value]) => (
          <article className="product-card metric-card" key={label}><span>{label}</span><strong>{value}</strong></article>
        ))}
      </section>
      <section className="card-grid three">
        <article className="product-card"><h2>Favorites</h2><p>Game CODM / Weapon DR-H / Map Shipment / Mode Gunfight</p></article>
        <article className="product-card"><h2>Current clan</h2><p>Xclusive officer / Europe / Legendary</p></article>
        <article className="product-card"><h2>Uploaded clips</h2><p>Insane 1v4 Clutch / Screenshot evidence / match highlight</p></article>
      </section>
      <ChallengeDiscovery />
    </section>
  );
}

export function GameHubLive({ game }: { game: GameName }) {
  return <ChallengeDiscovery gameFilter={game} />;
}

export function MarketplaceLive() {
  return (
    <section className="content-grid two">
      {["COD Points", "PUBG Mobile UC", "Free Fire Diamonds"].map((name) => (
        <article className="product-card vendor-card" key={name}>
          <span className="tag">Approved vendor</span>
          <h2>{name}</h2>
          <p>Demo order flow: create order, buyer chat, vendor chat, delivery confirmation, reviews, refund requests and disputes.</p>
          <dl>
            <div><dt>Listing</dt><dd>{name} starter pack</dd></div>
            <div><dt>Status</dt><dd>Vendor approved</dd></div>
            <div><dt>External links</dt><dd>Warning shown before WhatsApp, Telegram or Discord opens</dd></div>
          </dl>
          <div className="button-row"><button className="btn primary small">Create demo order</button><button className="btn secondary small">Apply as vendor</button></div>
        </article>
      ))}
    </section>
  );
}
