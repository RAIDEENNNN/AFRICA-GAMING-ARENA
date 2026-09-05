"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { currentPlayer, rankForMmr, rankedQueues, type CoreGame, type TeamSize } from "../competitive-core";

const gameModes: Record<CoreGame, string[]> = {
  CODM: ["Search and Destroy", "Gunfight", "Hardpoint", "Domination"],
  "PUBG Mobile": ["4v4 Arena", "Team Deathmatch", "Custom Room", "Battle Royale"],
  "Free Fire": ["Clash Squad", "Guild vs Guild", "Custom Room", "Battle Royale"],
};

const teamSizes: TeamSize[] = ["1v1", "2v2", "4v4", "5v5"];

type QueueState = "idle" | "searching" | "found" | "accepted" | "declined";

export function RankedMatchmakingConsole() {
  const [game, setGame] = useState<CoreGame>("CODM");
  const [mode, setMode] = useState("Search and Destroy");
  const [teamSize, setTeamSize] = useState<TeamSize>("5v5");
  const [queueState, setQueueState] = useState<QueueState>("idle");
  const queue = rankedQueues.find((item) => item.game === game && item.mode === mode && item.teamSize === teamSize) ?? rankedQueues.find((item) => item.game === game) ?? rankedQueues[0];
  const matchedOpponent = useMemo(() => {
    const spread = Math.abs(currentPlayer.mmr - 1744);
    return { clan: "Lagos Titans", captain: "NovaAce", mmr: 1744, rank: rankForMmr(1744), spread };
  }, []);

  function updateGame(next: CoreGame) {
    setGame(next);
    setMode(gameModes[next][0]);
    setQueueState("idle");
  }

  function joinQueue() {
    setQueueState("searching");
    window.setTimeout(() => setQueueState((state) => (state === "searching" ? "found" : state)), 900);
  }

  return (
    <section className="ranked-console" aria-label="AGA Ranked matchmaking simulator">
      <article className="product-card ranked-setup-card">
        <span className="tag live">Simulated matchmaking engine</span>
        <h2>Find a fair match</h2>
        <p>This queue is intentionally local simulation. It is structured so a real matchmaking service can replace the search, acceptance and room creation later.</p>
        <div className="core-form-grid">
          <label>Game<select className="field" value={game} onChange={(event) => updateGame(event.target.value as CoreGame)}>{Object.keys(gameModes).map((item) => <option key={item}>{item}</option>)}</select></label>
          <label>Mode<select className="field" value={mode} onChange={(event) => { setMode(event.target.value); setQueueState("idle"); }}>{gameModes[game].map((item) => <option key={item}>{item}</option>)}</select></label>
          <label>Team size<select className="field" value={teamSize} onChange={(event) => { setTeamSize(event.target.value as TeamSize); setQueueState("idle"); }}>{teamSizes.map((item) => <option key={item}>{item}</option>)}</select></label>
        </div>
        <div className="button-row">
          {queueState === "idle" || queueState === "declined" ? <button className="btn primary" type="button" onClick={joinQueue}>Join Queue</button> : null}
          {queueState === "searching" ? <button className="btn secondary" type="button" onClick={() => setQueueState("idle")}>Cancel Queue</button> : null}
          {queueState === "found" ? <button className="btn primary" type="button" onClick={() => setQueueState("accepted")}>Accept Match</button> : null}
          {queueState === "found" ? <button className="btn secondary" type="button" onClick={() => setQueueState("declined")}>Decline</button> : null}
          {queueState === "accepted" ? <Link className="btn primary" href="/matches/ranked-core-2001">Enter Match Room</Link> : null}
        </div>
      </article>

      <article className={`product-card ranked-status-card state-${queueState}`}>
        <small>Queue status</small>
        <strong>{queueState === "idle" ? "Ready" : queueState === "searching" ? "Searching..." : queueState === "found" ? "Match Found" : queueState === "accepted" ? "Room Ready" : "Declined"}</strong>
        <p>{queueState === "searching" ? "Searching similar-ranked players in your game, mode and team size." : queueState === "found" ? `${matchedOpponent.clan} is within ${matchedOpponent.spread} MMR. Both sides must accept.` : queueState === "accepted" ? "Both sides accepted in this demo. The match room can now open." : "Choose a queue and start when ready."}</p>
        <dl>
          <div><dt>Searching</dt><dd>{queue.searching} players</dd></div>
          <div><dt>Estimate</dt><dd>{queue.estimated}</dd></div>
          <div><dt>Rank band</dt><dd>{queue.rankBand}</dd></div>
          <div><dt>Your MMR</dt><dd>{currentPlayer.mmr}</dd></div>
          <div><dt>Your rank</dt><dd>{rankForMmr(currentPlayer.mmr)}</dd></div>
          <div><dt>Opponent</dt><dd>{matchedOpponent.captain} / {matchedOpponent.rank}</dd></div>
        </dl>
      </article>
    </section>
  );
}
