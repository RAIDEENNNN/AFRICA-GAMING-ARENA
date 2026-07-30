import { AGAPageShell, EmptyState, FilterTabs, SupabaseNotice } from "../aga-navigation";

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
      <section className="aga-table-shell" aria-label="Leaderboard table">
        <div className="aga-table-head">
          <span>Rank</span><span>Player or clan</span><span>Main game</span><span>Wins</span><span>Win rate</span><span>RP</span>
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
