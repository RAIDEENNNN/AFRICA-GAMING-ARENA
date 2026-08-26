import Link from "next/link";
import { AGAPageShell, EmptyState, FilterTabs, SectionHeader, StatCard, StatusBadge, SupabaseNotice } from "../aga-navigation";
import { clans } from "../data";

export default function LeaderboardPage() {
  return (
    <AGAPageShell
      active="Leaderboards"
      eyebrow="Rankings"
      title="LEADERBOARDS"
      copy="Verified rankings for players, clans, games, match formats, tournaments, weekly ladders and seasonal competition."
      actions={[{ label: "Play Now", href: "/matches/request" }]}
    >
      <SupabaseNotice />
      <FilterTabs tabs={["Players", "Clans", "CODM", "PUBG Mobile", "Free Fire", "1v1", "Team battles", "Tournament rankings", "Weekly", "Seasonal"]} />
      <section className="aga-stat-grid">
        <StatCard label="Official ranked players" value="0" copy="Ratings update from verified completed matches only." />
        <StatCard label="Official ranked clans" value="0" copy="Clan ranking logic will appear after real clan match history." />
        <StatCard label="Current season" value="Launch" copy="Season rules are ready for activation." />
        <StatCard label="Integrity" value="Server" copy="Client never decides authoritative rating." />
      </section>
      <SectionHeader eyebrow="Podium preview" title="Top ranks are ready for champions" copy="The podium stays empty until real stats exist. Demo clan rows below are visual references, not official ranking data." />
      <section className="aga-table-shell" aria-label="Leaderboard table">
        <div className="aga-table-head">
          <span>Rank</span><span>Player or clan</span><span>Main game</span><span>Wins</span><span>Win rate</span><span>RP</span>
        </div>
        <div className="aga-leaderboard-list">
          {clans.slice(0, 5).map((clan) => (
            <Link className="aga-rank-row" href={`/clans/${clan.slug}`} key={clan.slug}>
              <strong>#{clan.rank}</strong>
              <span>{clan.name}<small>{clan.badge} / demo directory preview</small></span>
              <span>{clan.game}</span>
              <span>Awaiting verified matches</span>
              <StatusBadge tone="muted">Preview</StatusBadge>
            </Link>
          ))}
        </div>
        <EmptyState
          title="The leaderboard is waiting for its first champion"
          copy="No one has earned verified ranking points yet. Completed Supabase-backed results will populate this table."
          action="Play Now"
          href="/matches/request"
        />
      </section>
    </AGAPageShell>
  );
}
