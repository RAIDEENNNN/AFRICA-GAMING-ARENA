import { AGAPageShell, DataCard, EmptyState, FilterTabs, SectionHeader, StatCard, StatusBadge, SupabaseNotice } from "../aga-navigation";

const ladders = [
  ["Player ladder", "Solo records, win rate, rating points and match history.", "/profile"],
  ["Clan ladder", "Clan wins, losses, roster strength and tournament results.", "/clans"],
  ["Tournament ladder", "Event standings for active brackets and completed events.", "/tournaments"],
];

export default function LeaderboardPage() {
  return (
    <AGAPageShell
      active="Leaderboards"
      eyebrow="Rankings"
      title="LEADERBOARDS"
      copy="Track verified players, clans, weekly ladders, tournaments and game-specific rankings. Only completed and confirmed matches should move the official board."
      actions={[{ label: "Play Ranked", href: "/matches/request" }, { label: "View Match History", href: "/matches", variant: "secondary" }]}
    >
      <SupabaseNotice />
      <section className="aga-tool-row">
        <FilterTabs tabs={["Overall", "Players", "Clans", "CODM", "PUBG Mobile", "Free Fire", "Weekly", "Seasonal", "Tournaments"]} />
      </section>
      <section className="aga-stat-grid">
        <StatCard label="Official ranked players" value="0" copy="Live ratings come from verified result records only." />
        <StatCard label="Official ranked clans" value="0" copy="Clan rankings need real clan match history." />
        <StatCard label="Current season" value="Launch" copy="Season windows and resets are ready for backend activation." />
        <StatCard label="Anti-fake stats" value="Server" copy="Client UI never decides authoritative RP." />
      </section>

      <section className="aga-leaderboard-hero-grid">
        <article className="aga-podium-card champion">
          <StatusBadge>Champion slot</StatusBadge>
          <strong>#1</strong>
          <h2>Awaiting first champion</h2>
          <p>The top slot unlocks after a verified result updates player stats and match history.</p>
        </article>
        <article className="aga-podium-card"><span>#2</span><h3>Open slot</h3><p>No verified player has earned this position yet.</p><StatusBadge tone="purple">Empty</StatusBadge></article>
        <article className="aga-podium-card"><span>#3</span><h3>Open slot</h3><p>Rankings begin after completed match results are verified.</p><StatusBadge tone="cyan">Empty</StatusBadge></article>
      </section>

      <SectionHeader eyebrow="Official ladder" title="Rankings stay synced with verified matches" copy="Real RP, wins, losses and win rate come from server-side match results only." />
      <section className="aga-table-shell aga-leaderboard-table" aria-label="Leaderboard table">
        <div className="aga-table-head">
          <span>Rank</span><span>Competitor</span><span>Game</span><span>Record</span><span>Win rate</span><span>RP</span>
        </div>
        <div className="aga-leaderboard-list">
          <div className="aga-rank-row">
            <strong>-</strong>
            <span>No verified competitors yet<small>Complete a match to create the first record.</small></span>
            <span>All games</span>
            <span>0W / 0L</span>
            <span>0%</span>
            <StatusBadge tone="muted">Empty</StatusBadge>
          </div>
        </div>
      </section>

      <section className="aga-card-grid">
        {ladders.map(([title, copy, href], index) => (
          <DataCard
            action="Open"
            copy={copy}
            eyebrow="Leaderboard type"
            href={href}
            key={title}
            meta={["Source: verified matches", "No fabricated ranks", "Status: awaiting live records"]}
            title={title}
            tone={index === 1 ? "purple" : index === 2 ? "cyan" : "gold"}
          />
        ))}
      </section>

      <EmptyState
        title="No official leaderboard records yet"
        copy="Once players complete verified matches, this page will update from persistent stats instead of design preview data."
        action="Start First Match"
        href="/matches/request"
      />
    </AGAPageShell>
  );
}
