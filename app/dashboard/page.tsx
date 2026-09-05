import { DashboardLive } from "../arena-client";
import { AppShell, ClanCard, ClipCard, MatchRow, TournamentCard } from "../components";
import { achievementsForPlayer, championshipStandings, currentPlayer, currentSeason, levelProgress, rankForMmr } from "../competitive-core";
import { clans, clips, matches, tournaments } from "../data";

export default function DashboardPage() {
  const xp = levelProgress(currentPlayer.xp);
  const unlocked = achievementsForPlayer(currentPlayer.id).filter((item) => item.unlocked).slice(0, 4);
  return (
    <AppShell>
      <section className="command-centre-hero">
        <div>
          <span className="eyebrow">AGA Command Centre</span>
          <h1>Competitive Core 2.0</h1>
          <p>{currentPlayer.gamerTag} / {rankForMmr(currentPlayer.mmr)} / {currentSeason.name}. One dashboard for rank, XP, clan, matches, tournaments, championship progress, notifications and clips.</p>
        </div>
        <a className="btn primary" href="/ranked">Join Ranked Queue</a>
      </section>
      <section className="core-command-strip">
        <article className="product-card"><small>Your rank</small><strong>{rankForMmr(currentPlayer.mmr)}</strong><p>{currentPlayer.mmr} MMR / +{currentPlayer.rankMovement} movement.</p></article>
        <article className="product-card"><small>AGA level</small><strong>{xp.level}</strong><p>{xp.current}/{xp.needed} XP to next level.</p><progress value={xp.percent} max={100} aria-label="AGA XP progress" /></article>
        <article className="product-card"><small>Upcoming match</small><strong>XCL vs LGT</strong><p>Ready status: waiting for final check-in.</p></article>
        <article className="product-card"><small>Championship</small><strong>{championshipStandings[0].points} pts</strong><p>{championshipStandings[0].status} in {currentSeason.name}.</p></article>
      </section>
      <section className="core-grid four">
        <article className="product-card compact-core-card"><small>Clan</small><h3>{currentPlayer.clanName}</h3><p>{currentPlayer.role} / reputation {currentPlayer.reputationScore}</p><a className="btn ghost small" href={`/clans/${currentPlayer.clanSlug}`}>Open HQ</a></article>
        <article className="product-card compact-core-card"><small>Predictions</small><h3>4 streak</h3><p>Non-cash XP predictions are ready.</p><a className="btn ghost small" href="/predictions">Make picks</a></article>
        <article className="product-card compact-core-card"><small>Notifications</small><h3>16 types</h3><p>Match, clan, tournament and rank alerts.</p><a className="btn ghost small" href="/notifications">Open centre</a></article>
        <article className="product-card compact-core-card"><small>Achievements</small><h3>{unlocked.length} featured</h3><p>{unlocked.map((item) => item.title).join(" / ")}</p><a className="btn ghost small" href="/achievements">View badges</a></article>
      </section>
      <DashboardLive />
      <section className="mobile-dashboard-actions">
        <a className="btn primary" href="/matches/request">Create Challenge</a>
        <a className="btn secondary" href="/matches">Find Match</a>
      </section>
      <section className="product-card">
        <h2>Connected competitive journey</h2>
        <p>{"Authenticated Player -> Challenge -> Opponent -> Match -> Result -> Stats -> Leaderboard -> Match History, with XP, achievements and notifications attached."}</p>
      </section>
      <section className="page-section two-column">
        <div className="stack">
          <h2>Upcoming and recent matches</h2>
          {matches.map((match) => <MatchRow match={match} key={match.id} />)}
        </div>
        <div className="stack">
          <h2>Recommended for you</h2>
          <ClanCard clan={clans[0]} />
          <TournamentCard tournament={tournaments[0]} />
          <ClipCard clip={clips[0]} />
        </div>
      </section>
    </AppShell>
  );
}
