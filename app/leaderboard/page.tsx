import { AGAPageShell, DataCard, EmptyState, FilterTabs, SectionHeader, StatCard, StatusBadge, SupabaseNotice } from "../aga-navigation";
import { currentSeason, leaderboardRows, rankForMmr, winRate } from "../competitive-core";

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
        <StatCard label="Ranked players" value={String(leaderboardRows.length)} copy="Deterministic demo ladder mirrors the normalized player model." />
        <StatCard label="Official ranked clans" value="7" copy="Clan rankings connect to roster and match history." />
        <StatCard label="Current season" value={currentSeason.name} copy="Season windows and resets are ready for backend activation." />
        <StatCard label="Anti-fake stats" value="Server" copy="Client UI never decides authoritative RP." />
      </section>

      <section className="aga-leaderboard-hero-grid">
        <article className="aga-podium-card champion">
          <StatusBadge>Champion slot</StatusBadge>
          <strong>#1</strong>
          <h2>{leaderboardRows[0].gamerTag}</h2>
          <p>{rankForMmr(leaderboardRows[0].mmr)} / {leaderboardRows[0].mmr} MMR / {leaderboardRows[0].clanName}.</p>
        </article>
        <article className="aga-podium-card"><span>#2</span><h3>{leaderboardRows[1].gamerTag}</h3><p>{leaderboardRows[1].clanName} / {leaderboardRows[1].rankPoints} RP.</p><StatusBadge tone="purple">{rankForMmr(leaderboardRows[1].mmr)}</StatusBadge></article>
        <article className="aga-podium-card"><span>#3</span><h3>{leaderboardRows[2].gamerTag}</h3><p>{leaderboardRows[2].clanName} / {leaderboardRows[2].rankPoints} RP.</p><StatusBadge tone="cyan">{rankForMmr(leaderboardRows[2].mmr)}</StatusBadge></article>
      </section>

      <SectionHeader eyebrow="Official ladder" title="Rankings stay synced with verified matches" copy="Real RP, wins, losses and win rate come from server-side match results only." />
      <section className="aga-table-shell aga-leaderboard-table" aria-label="Leaderboard table">
        <div className="aga-table-head">
          <span>Rank</span><span>Competitor</span><span>Game</span><span>Record</span><span>Win rate</span><span>RP</span>
        </div>
        <div className="aga-leaderboard-list">
          {leaderboardRows.slice(0, 12).map((player) => (
            <div className="aga-rank-row" key={player.id}>
              <strong>#{player.leaderboardPosition}</strong>
              <span>{player.gamerTag}<small>@{player.username} / {player.clanName}</small></span>
              <span>{player.mainGame}</span>
              <span>{player.wins}W / {player.losses}L</span>
              <span>{winRate(player)}%</span>
              <StatusBadge tone={player.leaderboardPosition < 4 ? "gold" : "purple"}>{player.rankPoints} RP</StatusBadge>
            </div>
          ))}
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

      <EmptyState title="Official live leaderboard sync is still gated" copy="This demo board shows shared competitive data. Production rankings should update only from verified match results." action="Start First Match" href="/matches/request" />
    </AGAPageShell>
  );
}
