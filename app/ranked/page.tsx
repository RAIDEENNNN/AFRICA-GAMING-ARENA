import { AppShell, PageHero } from "../components";
import { currentPlayer, currentSeason, rankForMmr, rankedQueues } from "../competitive-core";
import { RankedMatchmakingConsole } from "./ranked-client";

export default function RankedPage() {
  const rank = rankForMmr(currentPlayer.mmr);
  return (
    <AppShell>
      <PageHero
        eyebrow="AGA Competitive Core 2.0"
        title="AGA Ranked"
        copy="Queue for fair CODM, PUBG Mobile and Free Fire matches with rank bands, placement state, seasonal MMR and acceptance before the match room opens."
        primary={["Join ranked queue", "#ranked-console"]}
        secondary={["View leaderboards", "/leaderboards"]}
      />
      <section className="core-command-strip">
        <article className="product-card"><small>Current season</small><strong>{currentSeason.name}</strong><p>{currentSeason.resetModel}</p></article>
        <article className="product-card"><small>Your rank</small><strong>{rank}</strong><p>{currentPlayer.mmr} MMR / {currentPlayer.rankPoints} rank points</p></article>
        <article className="product-card"><small>Placements</small><strong>{10 - currentPlayer.placementMatches}/10</strong><p>Placement matches remaining before final rank lock.</p></article>
        <article className="product-card"><small>Streak</small><strong>{currentPlayer.currentStreak}</strong><p>Best streak {currentPlayer.bestStreak}. Movement +{currentPlayer.rankMovement} this week.</p></article>
      </section>
      <div id="ranked-console">
        <RankedMatchmakingConsole />
      </div>
      <section className="page-section">
        <div className="section-heading">
          <span className="eyebrow">Queue pools</span>
          <h2>Supported games and team sizes</h2>
        </div>
        <div className="core-grid four">
          {rankedQueues.map((queue) => (
            <article className="product-card queue-pool-card" key={`${queue.game}-${queue.mode}-${queue.teamSize}`}>
              <span className="tag">{queue.teamSize}</span>
              <h3>{queue.game}</h3>
              <p>{queue.mode}</p>
              <dl>
                <div><dt>Players searching</dt><dd>{queue.searching}</dd></div>
                <div><dt>Estimated wait</dt><dd>{queue.estimated}</dd></div>
                <div><dt>Band</dt><dd>{queue.rankBand}</dd></div>
              </dl>
            </article>
          ))}
        </div>
      </section>
    </AppShell>
  );
}
