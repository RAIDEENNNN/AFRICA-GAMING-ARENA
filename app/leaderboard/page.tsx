import { AppShell, PageHero } from "../components";
import { clans } from "../data";

export default function LeaderboardPage() {
  return (
    <AppShell>
      <PageHero eyebrow="Leaderboard" title="Verified ranking, not manually edited points." copy="Rankings consider wins, losses, opponent strength, tournaments, forfeits, disputes and activity." />
      <section className="leaderboard-page">
        {clans.map((clan) => (
          <article className="leaderboard-row" key={clan.name}>
            <span>#{clan.rank}</span>
            <strong>{clan.name}</strong>
            <small>{clan.game} / {clan.region}</small>
            <b>{clan.rate}</b>
            <em>{clan.points}</em>
          </article>
        ))}
      </section>
    </AppShell>
  );
}
