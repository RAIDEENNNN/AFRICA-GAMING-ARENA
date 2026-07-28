"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { gameConfig, makeChallenge, wagerMath, type Actor, type ArenaState, type Challenge, type GameName, type MatchKind, type PrizeType, type ResultSubmission } from "./arena-store";

const defaultChallenge = makeChallenge({ id: "draft" });

function useArenaState(actor: Actor = "PlayerOne") {
  const [state, setState] = useState<ArenaState | null>(null);

  async function refresh() {
    const response = await fetch("/api/arena", { cache: "no-store" });
    setState(await response.json());
  }

  async function mutate(action: string, payload: Record<string, unknown> = {}) {
    const response = await fetch("/api/arena", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ action, actor, ...payload }),
    });
    const json = await response.json();
    if (!response.ok) throw new Error(json.error ?? "Arena request failed.");
    setState(json.state);
    return json.data;
  }

  useEffect(() => {
    refresh();
    const timer = window.setInterval(refresh, 2000);
    return () => window.clearInterval(timer);
  }, []);

  return { state, refresh, mutate };
}

export function CreateChallengeFlow() {
  const { mutate } = useArenaState("PlayerOne");
  const [form, setForm] = useState<Challenge>(defaultChallenge);
  const config = gameConfig[form.game];
  const weaponClasses = Object.keys(config.weapons);
  const weapons = config.weapons[form.weaponClass] ?? [];
  const math = wagerMath(form.prizeType === "Wager" ? form.wagerAmount : 0);

  function patch(next: Partial<Challenge>) {
    const merged = { ...form, ...next };
    const nextConfig = gameConfig[merged.game];
    if (!nextConfig.weapons[merged.weaponClass]) merged.weaponClass = Object.keys(nextConfig.weapons)[0];
    if (!nextConfig.weapons[merged.weaponClass].includes(merged.weapon)) merged.weapon = nextConfig.weapons[merged.weaponClass][0];
    if (!nextConfig.maps.includes(merged.map)) merged.map = nextConfig.maps[0];
    if (!nextConfig.modes.includes(merged.mode)) merged.mode = nextConfig.modes[0];
    setForm(merged);
  }

  async function publish() {
    await mutate("createChallenge", { challenge: { ...form, wagerAmount: form.prizeType === "Wager" ? Number(form.wagerAmount || 1) : 0 } });
    window.location.href = "/matches?created=1";
  }

  return (
    <section className="product-form flow-form">
      <div className="battle-setup-header">
        <span className="eyebrow">Battle setup</span>
        <h2>Configure the contract</h2>
        <p>Choose the arena, weapons, map, rules, schedule and demo wager before publishing.</p>
      </div>
      <div className="step-progress"><span>01 Game</span><span>02 Format</span><span>03 Weapon</span><span>04 Map</span><span>05 Rules</span><span>06 Server</span><span>07 Wager</span><span>08 Contract</span></div>
      <div className="flow-grid">
        <label>Game<select className="field" value={form.game} onChange={(e) => patch({ game: e.target.value as GameName })}>{Object.keys(gameConfig).map((name) => <option key={name}>{name}</option>)}</select></label>
        <label>Match type<select className="field" value={form.matchKind} onChange={(e) => patch({ matchKind: e.target.value as MatchKind })}>{["Player vs player", "Team vs team", "Clan vs clan"].map((item) => <option key={item}>{item}</option>)}</select></label>
        <label>Team size<select className="field" value={form.teamSize} onChange={(e) => patch({ teamSize: e.target.value as Challenge["teamSize"] })}>{["1v1", "2v2", "3v3", "4v4", "5v5"].map((item) => <option key={item}>{item}</option>)}</select></label>
        <label>Weapon class<select className="field" value={form.weaponClass} onChange={(e) => patch({ weaponClass: e.target.value })}>{weaponClasses.map((item) => <option key={item}>{item}</option>)}</select></label>
        <label>Weapon<select className="field" value={form.weapon} onChange={(e) => patch({ weapon: e.target.value })}>{weapons.map((item) => <option key={item}>{item}</option>)}</select></label>
        <label>Map<select className="field" value={form.map} onChange={(e) => patch({ map: e.target.value })}>{config.maps.map((item) => <option key={item}>{item}</option>)}</select></label>
        <label>Mode<select className="field" value={form.mode} onChange={(e) => patch({ mode: e.target.value })}>{config.modes.map((item) => <option key={item}>{item}</option>)}</select></label>
        <label>Region<select className="field" value={form.region} onChange={(e) => patch({ region: e.target.value })}>{["Europe", "North America", "MENA", "LATAM", "Asia"].map((item) => <option key={item}>{item}</option>)}</select></label>
        <label>Server<input className="field" value={form.server} onChange={(e) => patch({ server: e.target.value })} /></label>
        <label>Date<input className="field" type="date" value={form.date} onChange={(e) => patch({ date: e.target.value })} /></label>
        <label>Time<input className="field" type="time" value={form.time} onChange={(e) => patch({ time: e.target.value })} /></label>
        <label>Prize type<select className="field" value={form.prizeType} onChange={(e) => patch({ prizeType: e.target.value as PrizeType })}>{["Free", "Ranked", "Wager"].map((item) => <option key={item}>{item}</option>)}</select></label>
        {form.prizeType === "Wager" ? <label>Wager amount<input className="field" type="number" min="1" value={form.wagerAmount} onChange={(e) => patch({ wagerAmount: Number(e.target.value) })} /></label> : null}
        <label>Skill level<select className="field" value={form.skill} onChange={(e) => patch({ skill: e.target.value })}>{["Casual", "Pro", "Master", "Legendary"].map((item) => <option key={item}>{item}</option>)}</select></label>
      </div>
      <label>Match rules<textarea className="field" value={form.rules} onChange={(e) => patch({ rules: e.target.value })} /></label>
      <article className="review-panel">
        <span className="tag">Battle contract</span>
        <h2>{form.teamSize} {form.game} / {form.weaponClass}</h2>
        <p>{form.game} / {config.accent} / {form.teamSize} / {form.weapon} / {form.map} / {form.mode}</p>
        <p>{form.region} {form.server} / {form.date} at {form.time} / {form.prizeType}</p>
        {form.prizeType === "Wager" ? <p>Player One stake ${math.stakePerSide} / Player Two stake ${math.stakePerSide} / Pool ${math.totalPrizePool} / Fee ${math.feeAmount} / Winner payout ${math.winnerPayout}</p> : null}
      </article>
      <button className="btn primary publish-battle" onClick={publish}>Publish Battle Contract</button>
    </section>
  );
}

export function ChallengeDiscovery({ gameFilter }: { gameFilter?: GameName }) {
  const { state, mutate } = useArenaState("NovaAce");
  const [filters, setFilters] = useState({ game: gameFilter ?? "All", size: "All", weapon: "All", map: "All", mode: "All", prize: "All", region: "All", status: "Open" });
  const allMaps = [...new Set(Object.values(gameConfig).flatMap((item) => item.maps))];
  const allModes = [...new Set(Object.values(gameConfig).flatMap((item) => item.modes))];
  const visible = useMemo(() => (state?.challenges ?? []).filter((challenge) =>
    (!gameFilter || challenge.game === gameFilter) &&
    (filters.game === "All" || challenge.game === filters.game) &&
    (filters.size === "All" || challenge.teamSize === filters.size) &&
    (filters.weapon === "All" || challenge.weaponClass === filters.weapon || challenge.weapon === filters.weapon) &&
    (filters.map === "All" || challenge.map === filters.map) &&
    (filters.mode === "All" || challenge.mode === filters.mode) &&
    (filters.prize === "All" || challenge.prizeType === filters.prize) &&
    (filters.region === "All" || challenge.region === filters.region) &&
    (filters.status === "All" || challenge.status === filters.status)
  ), [state, filters, gameFilter]);

  async function accept(challenge: Challenge) {
    const room = await mutate("acceptChallenge", { challengeId: challenge.id });
    window.location.href = `/matches/${room.id}`;
  }

  async function counter(challenge: Challenge) {
    await mutate("counterOffer", { challengeId: challenge.id, terms: { map: "Raid", wagerAmount: challenge.prizeType === "Wager" ? 20 : challenge.wagerAmount } });
  }

  return (
    <section className="page-section">
      <div className="lobby-ticker">
        <span>LIVE LOBBY</span>
        <p>{visible.length} open invites / 12 high stakes / 36 ranked rooms / next start in 04:22</p>
      </div>
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
            <div className="challenge-topline"><span className="tag">{challenge.status}</span><span className="tag danger">{challenge.prizeType === "Wager" ? "HIGH STAKES" : challenge.prizeType}</span><span className="tag">{challenge.teamSize}</span></div>
            <h3>{challenge.game} {challenge.weaponClass}</h3>
            <p><b>{challenge.creator}</b> / {challenge.matchKind} / {challenge.skill} rank</p>
            {challenge.prizeType === "Wager" ? <strong className="wager-callout">${challenge.stakePerSide} ENTRY / ${challenge.winnerPayout} WINNER PAYOUT</strong> : null}
            <dl>
              <div><dt>Weapon</dt><dd>{challenge.weapon}</dd></div><div><dt>Map</dt><dd>{challenge.map}</dd></div>
              <div><dt>Mode</dt><dd>{challenge.mode}</dd></div><div><dt>Region</dt><dd>{challenge.region}</dd></div>
              <div><dt>Date</dt><dd>{challenge.date} {challenge.time}</dd></div><div><dt>Wager</dt><dd>{challenge.prizeType === "Wager" ? `$${challenge.stakePerSide} per side` : challenge.prizeType}</dd></div>
            </dl>
            <div className="button-row">
              <button className="btn primary small" disabled={challenge.status !== "Open" && challenge.status !== "Negotiating"} onClick={() => accept(challenge)}>Accept</button>
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
  const { state, mutate } = useArenaState("PlayerOne");
  const room = state?.rooms.find((item) => item.id === roomId) ?? state?.rooms[0];
  const challenge = room ? state?.challenges.find((item) => item.id === room.challengeId) : undefined;
  const [message, setMessage] = useState("");
  const [result, setResult] = useState<Omit<ResultSubmission, "submittedBy">>({ winner: "PlayerOne", score: "15-12", rounds: "6-4, 4-6, 5-2", note: "Clean match, screenshots uploaded.", evidence: "scoreboard.png" });
  if (!state) return <article className="product-card"><h2>Loading room</h2></article>;
  if (!challenge || !room) return <article className="product-card"><h2>No match room yet</h2><p>Accept a challenge from Find Match to open a private room.</p><Link className="btn primary" href="/matches">Find Match</Link></article>;

  async function act(actor: Actor, action: string, payload: Record<string, unknown> = {}) {
    const response = await fetch("/api/arena", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ action, actor, roomId: room!.id, ...payload }) });
    if (!response.ok) console.error(await response.text());
    window.dispatchEvent(new Event("arena-refresh"));
    window.location.reload();
  }

  return (
    <>
      <section className={`versus-lobby status-${room.status.toLowerCase().replace(" ", "-")}`}>
        <article><span className="avatar-ring">P1</span><h2>PlayerOne</h2><p>XCL / Legendary / 1v1 {challenge.checkIns.creator ? "READY" : "WAITING"}</p></article>
        <div className="vs-core"><strong>VS</strong><span>{room.status}</span><b>${challenge.totalPrizePool} POOL</b></div>
        <article><span className="avatar-ring">NA</span><h2>NovaAce</h2><p>NVA / Master / 1v1 {challenge.checkIns.opponent ? "READY" : "WAITING"}</p></article>
      </section>
      <section className="flow-columns">
      <article className="product-card agreement-panel">
        <span className="contract-seal">LOCKED SHIELD / VERSION 01</span>
        <h2>Battle Contract</h2>
        <dl>
          <div><dt>Game</dt><dd>{challenge.game}</dd></div><div><dt>Size</dt><dd>{challenge.teamSize}</dd></div>
          <div><dt>Weapon</dt><dd>{challenge.weaponClass} / {challenge.weapon}</dd></div><div><dt>Map</dt><dd>{challenge.map}</dd></div>
          <div><dt>Mode</dt><dd>{challenge.mode}</dd></div><div><dt>Rules</dt><dd>{challenge.rules}</dd></div>
          <div><dt>Region</dt><dd>{challenge.region} / {challenge.server}</dd></div><div><dt>Date</dt><dd>{challenge.date} {challenge.time}</dd></div>
          <div><dt>Stake</dt><dd>${challenge.stakePerSide} per side</dd></div><div><dt>Payout</dt><dd>Pool ${challenge.totalPrizePool} / Fee ${challenge.feeAmount} / Winner ${challenge.winnerPayout}</dd></div>
        </dl>
        {room.status === "Ready" || room.status === "Verified" ? <strong className="locked-banner">BATTLE TERMS LOCKED</strong> : null}
        <div className="approval-grid">
          <button className="btn primary small" disabled={challenge.approvals.creator} onClick={() => act("PlayerOne", "approveTerms")}>PlayerOne accept terms</button>
          <button className="btn primary small" disabled={challenge.approvals.opponent} onClick={() => act("NovaAce", "approveTerms")}>NovaAce accept terms</button>
          <button className="btn secondary small" disabled={challenge.approvals.creatorWager} onClick={() => act("PlayerOne", "approveTerms", { wager: true })}>PlayerOne confirm wager</button>
          <button className="btn secondary small" disabled={challenge.approvals.opponentWager} onClick={() => act("NovaAce", "approveTerms", { wager: true })}>NovaAce confirm wager</button>
        </div>
        <h3>Change history</h3>
        <ul>{challenge.history.map((item) => <li key={item}>{item}</li>)}</ul>
      </article>
      <article className="product-card chat-window">
        <h2>Match chat</h2>
        <p className="presence">NovaAce online / typing... / moderator visible on dispute</p>
        <div className="message-list">{room.messages.map((item) => <div className={item.system ? "message system" : "message"} key={item.id}><strong>{item.system ? "SYSTEM" : `[XCL] ${item.author} / Legendary`}</strong><span>{item.body}</span>{item.attachment ? <small>Attachment: {item.attachment}</small> : null}<em>{item.at} / {item.read ? "read" : "sent"} / + react</em></div>)}</div>
        <input className="field" value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Send match-room message" />
        <div className="button-row">
          <button className="btn primary small" onClick={() => act("PlayerOne", "sendMessage", { message })}>Send</button>
          <button className="btn secondary small" onClick={() => act("PlayerOne", "sendMessage", { message: "Uploaded evidence image.", attachment: "screenshot.png" })}>Upload screenshot</button>
          <button className="btn secondary small" onClick={() => act("PlayerOne", "sendMessage", { message: "Uploaded video evidence.", attachment: "clip.mp4" })}>Upload video</button>
        </div>
      </article>
      <article className="product-card">
        <h2>Check-in and results</h2>
        <p>Countdown: 12:00 / Match starts only when both sides are ready.</p>
        <div className="approval-grid">
          <button className="btn primary small" disabled={challenge.checkIns.creator} onClick={() => act("PlayerOne", "checkIn")}>PlayerOne check in</button>
          <button className="btn primary small" disabled={challenge.checkIns.opponent} onClick={() => act("NovaAce", "checkIn")}>NovaAce check in</button>
          <button className="btn secondary small">Request delay</button><button className="btn secondary small">Approve delay</button>
        </div>
        <label>Winner<input className="field" value={result.winner} onChange={(e) => setResult({ ...result, winner: e.target.value })} /></label>
        <label>Score<input className="field" value={result.score} onChange={(e) => setResult({ ...result, score: e.target.value })} /></label>
        <label>Round scores<input className="field" value={result.rounds} onChange={(e) => setResult({ ...result, rounds: e.target.value })} /></label>
        <label>Evidence<input className="field" value={result.evidence} onChange={(e) => setResult({ ...result, evidence: e.target.value })} /></label>
        <label>Match note<textarea className="field" value={result.note} onChange={(e) => setResult({ ...result, note: e.target.value })} /></label>
        <div className="button-row"><button className="btn primary small" onClick={() => act("PlayerOne", "submitResult", { result })}>Submit as PlayerOne</button><button className="btn primary small" onClick={() => act("NovaAce", "submitResult", { result })}>Submit as NovaAce</button></div>
        <p>Status: {room.status}</p>
      </article>
      </section>
    </>
  );
}

export function DashboardLive() {
  const { state } = useArenaState();
  const verified = state?.rooms.filter((room) => room.status === "Verified").length ?? 0;
  return <><section className="player-command-banner"><div><span className="avatar-ring">P1</span><h2>PlayerOne</h2><p>Legendary / Xclusive / CODM assault rifle main</p></div><div><strong>{verified ? "100%" : "0%"}</strong><span>Win rate</span></div><div><strong>$100</strong><span>Demo balance</span></div><div><strong>6W</strong><span>Current streak</span></div></section><section className="card-grid four">{[["My challenges", state?.challenges.length ?? 0], ["Open", state?.challenges.filter((item) => item.status === "Open").length ?? 0], ["Match rooms", state?.rooms.length ?? 0], ["Verified results", verified]].map(([label, value]) => <article className="product-card metric-card" key={label}><span>{label}</span><strong>{value}</strong></article>)}</section><ChallengeDiscovery /></>;
}

export function LeaderboardLive() {
  const { state } = useArenaState();
  const verified = state?.rooms.filter((room) => room.status === "Verified").length ?? 0;
  const rows = [{ name: "PlayerOne", game: "CODM", region: "Europe", one: verified ? "1-0" : "0-0", wins: verified, points: 10250 + verified * 120 }, { name: "NovaAce", game: "CODM", region: "Europe", one: verified ? "0-1" : "0-0", wins: 0, points: 9980 }, { name: "GhostKing", game: "PUBG Mobile", region: "MENA", one: "0-0", wins: 0, points: 9720 }];
  return <section className="leaderboard-page podium-board"><div className="chip-row">{["Overall", "1v1", "2v2", "3v3", "CODM", "PUBG Mobile", "Free Fire", "Weapons", "Regions", "Seasons"].map((item) => <span key={item}>{item}</span>)}</div>{rows.map((row, index) => <article className={`leaderboard-row mobile-card-row podium-${index + 1}`} key={row.name}><span>#{index + 1}</span><strong>{row.name}</strong><small>XCL / {row.game} / {row.region} / DR-H / Streak {row.wins}</small><b>{row.wins} wins</b><em>{row.points}</em></article>)}</section>;
}

export function ProfileLive() {
  const { state } = useArenaState();
  const verified = state?.rooms.filter((room) => room.status === "Verified").length ?? 0;
  return <section className="page-section profile-arena"><section className="profile-cover"><span className="avatar-ring">P1</span><div><h2>PlayerOne</h2><p>XCL / Legendary / CODM / Europe / DR-H main</p></div><strong>{verified ? "#1" : "#12"}</strong></section><section className="card-grid four">{[["Total matches", verified], ["Wins", verified], ["Losses", 0], ["Win rate", verified ? "100%" : "0%"], ["Current streak", verified], ["Best streak", verified], ["1v1 record", `${verified}-0`], ["Ranking", verified ? "#1" : "#12"]].map(([label, value]) => <article className="product-card metric-card" key={label}><span>{label}</span><strong>{value}</strong></article>)}</section><section className="achievement-rack">{["First Blood", "10 Win Streak", "Sniper Elite", "Clan Champion", "Undefeated", "Tournament Winner", "High Stakes Winner"].map((item) => <span key={item}>{item}</span>)}</section><section className="card-grid three"><article className="product-card"><h2>Favorites</h2><p>Game CODM / Weapon DR-H / Map Shipment / Mode Gunfight</p></article><article className="product-card"><h2>Current clan</h2><p>Xclusive officer / Europe / Legendary</p></article><article className="product-card"><h2>Demo wallet</h2><p>Demo balance - no real money. PlayerOne balance ${state?.wallets.PlayerOne.balance ?? 0}, locked ${state?.wallets.PlayerOne.locked ?? 0}.</p></article></section><ChallengeDiscovery /></section>;
}

export function GameHubLive({ game }: { game: GameName }) {
  return <ChallengeDiscovery gameFilter={game} />;
}

export function MarketplaceLive() {
  return <section className="content-grid two">{["COD Points", "PUBG Mobile UC", "Free Fire Diamonds"].map((name) => <article className="product-card vendor-card" key={name}><span className="tag">Approved vendor</span><h2>{name}</h2><p>Demo order flow: create order, buyer chat, vendor chat, delivery confirmation, reviews, refund requests and disputes.</p><dl><div><dt>Listing</dt><dd>{name} starter pack</dd></div><div><dt>Status</dt><dd>Vendor approved</dd></div><div><dt>External links</dt><dd>Warning shown before WhatsApp, Telegram or Discord opens</dd></div></dl><div className="button-row"><button className="btn primary small">Create demo order</button><button className="btn secondary small">Apply as vendor</button></div></article>)}</section>;
}
