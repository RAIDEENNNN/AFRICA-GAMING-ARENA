import { AppShell, ClanCard, ClipCard, MatchRow, PageHero, StatGrid, TournamentCard } from "./components";
import { clans, clips, matches, tournaments } from "./data";

export default function Home() {
  return (
    <AppShell>
      <PageHero
        eyebrow="Clan Arena"
        title="Built for clans. Made to win."
        copy="A professional esports platform for clan recruitment, match requests, tournaments, verified results, clips and rankings."
        primary={["Find a clan", "/find-clans"]}
        secondary={["Create account", "/register"]}
      />
      <StatGrid />
      <section className="page-section two-column">
        <div>
          <div className="section-heading">
            <span className="eyebrow">Featured clans</span>
            <h2>Recruit, challenge and follow competitive teams.</h2>
          </div>
          <div className="stack">
            {clans.slice(0, 3).map((clan) => <ClanCard clan={clan} key={clan.name} />)}
          </div>
        </div>
        <div>
          <div className="section-heading">
            <span className="eyebrow">Recent matches</span>
            <h2>Verified results keep reputation meaningful.</h2>
          </div>
          <div className="stack">
            {matches.map((match) => <MatchRow match={match} key={match.id} />)}
          </div>
        </div>
      </section>
      <section className="page-section">
        <div className="section-heading">
          <span className="eyebrow">Tournaments</span>
          <h2>Browse upcoming events without leaving the platform.</h2>
        </div>
        <div className="card-grid three">
          {tournaments.map((tournament) => <TournamentCard tournament={tournament} key={tournament.name} />)}
        </div>
      </section>
      <section className="page-section two-column">
        <div>
          <div className="section-heading">
            <span className="eyebrow">Clips</span>
            <h2>Showcase plays that build your clan reputation.</h2>
          </div>
          <div className="card-grid">
            {clips.slice(0, 2).map((clip) => <ClipCard clip={clip} key={clip.title} />)}
          </div>
        </div>
        <section className="cta-panel">
          <span className="eyebrow">Start the journey</span>
          <h2>Create your profile, join a clan, request a match.</h2>
          <p>The core path is split across real pages so the product feels usable, not like a design board.</p>
          <a className="btn primary" href="/register">Create account</a>
        </section>
      </section>
    </AppShell>
  );
}
