import { ChallengeDiscovery } from "../arena-client";
import { AppShell, MatchRow } from "../components";
import { matches } from "../data";

export default function MatchesPage() {
  return (
    <AppShell>
      <section className="lobby-hero">
        <div>
          <span className="eyebrow">Live lobby</span>
          <h1>Pick the fight. Lock the rules.</h1>
          <p>Scan live player, team and clan challenges by wager, rank, weapon, map, region and start time.</p>
        </div>
        <a className="btn primary" href="/matches/request">Request match</a>
      </section>
      <ChallengeDiscovery />
      <section className="page-section">
        <div className="section-heading">
          <span className="eyebrow">Recent results</span>
          <h2>Completed matches stay separate from open challenges.</h2>
        </div>
        <div className="stack">
          {matches.map((match) => <MatchRow match={match} key={match.id} />)}
        </div>
      </section>
    </AppShell>
  );
}
