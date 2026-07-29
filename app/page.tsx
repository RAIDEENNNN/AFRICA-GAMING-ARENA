import { AppShell, ClanCard, ClipCard, GamePortalCard, MatchRow, TournamentCard } from "./components";
import { clans, clips, games, matches, tournaments } from "./data";

export default function Home() {
  return (
    <AppShell>
      <section className="campaign-hero">
        <div className="campaign-copy">
          <span className="eyebrow">Enter the Arena / Clan Arena</span>
          <h1>Challenge anyone. Own the lobby.</h1>
          <p>Create 1v1, team and clan battles across CODM, PUBG Mobile and Free Fire. Lock the rules, prove the result and climb one verified match at a time.</p>
          <div className="button-row">
            <a className="btn primary" href="/register">Join Arena</a>
            <a className="btn secondary" href="/matches/request">Create Challenge</a>
          </div>
        </div>
        <div className="operator-stage" aria-hidden="true">
          <span className="operator-silhouette" />
          <i className="operator-rifle" />
          <b className="drop-light" />
        </div>
        <aside className="live-command-card">
          <span>LIVE OPS</span>
          <strong>128</strong>
          <p>active rooms</p>
          <small>Xclusive accepted CODM 1v1 / NovaAce locked $20 / PUBG squad room opened</small>
        </aside>
        <div className="hero-portal-strip">
          {games.map((game) => (
            <a href={`/games/${game.slug}`} className={`portal-chip portal-${game.theme}`} key={game.slug}>
              <span>{game.short}</span>
              <b>{game.stats[0]}</b>
            </a>
          ))}
        </div>
      </section>
      <section className="page-section two-column">
        <div className="section-heading">
          <span className="eyebrow">Game portals</span>
          <h2>Enter CODM, PUBG Mobile or Free Fire with the right rules and atmosphere.</h2>
        </div>
      </section>
      <section className="game-portal-grid">
        {games.map((game) => <GamePortalCard game={game} key={game.slug} />)}
      </section>
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
