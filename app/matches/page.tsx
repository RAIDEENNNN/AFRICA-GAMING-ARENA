import { AppShell, ChallengeCard, MatchRow, PageHero } from "../components";
import { challenges, matches } from "../data";

export default function MatchesPage() {
  return (
    <AppShell>
      <PageHero
        eyebrow="Matches"
        title="Find player, team and clan challenges."
        copy="Create or accept 1v1, 2v2, small-team and clan challenges by game, weapon, map, mode, rules, region and time."
        primary={["Request match", "/matches/request"]}
      />
      <section className="filter-bar">
        <input className="field" placeholder="Search challenges..." />
        <select className="field"><option>All games</option><option>CODM</option><option>PUBG</option><option>Free Fire</option></select>
        <select className="field"><option>All team sizes</option><option>1v1</option><option>2v2</option><option>5v5</option></select>
        <select className="field"><option>All weapons</option><option>Assault Rifle</option><option>SMG</option><option>Sniper</option></select>
      </section>
      <section className="card-grid three">
        {challenges.map((challenge) => <ChallengeCard challenge={challenge} key={challenge.id} />)}
      </section>
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
