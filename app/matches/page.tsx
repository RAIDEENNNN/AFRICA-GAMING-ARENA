import { ChallengeDiscovery } from "../arena-client";
import { AppShell, MatchRow, PageHero } from "../components";
import { matches } from "../data";

export default function MatchesPage() {
  return (
    <AppShell>
      <PageHero
        eyebrow="Matches"
        title="Find player, team and clan challenges."
        copy="Create or accept 1v1, 2v2, small-team and clan challenges by game, weapon, map, mode, rules, region and time."
        primary={["Request match", "/matches/request"]}
      />
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
