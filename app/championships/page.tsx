import { AGAPageShell, DataCard, SectionHeader, StatCard, StatusBadge } from "../aga-navigation";
import { championshipEvents, championshipStandings, currentSeason } from "../competitive-core";

export default function ChampionshipsPage() {
  return (
    <AGAPageShell
      active="/championships"
      eyebrow="Official AGA competition"
      title="AGA Championships"
      copy="The official competitive circuit for CODM, PUBG Mobile and Free Fire across open qualifiers, regional qualifiers, national finals and continental finals."
      actions={[{ label: "View schedule", href: "#schedule" }, { label: "Play ranked", href: "/ranked", variant: "secondary" }]}
    >
      <section className="aga-stat-grid">
        <StatCard label="Season" value={currentSeason.name} copy="Championship points reset by season rules." />
        <StatCard label="Supported games" value="3" copy="CODM, PUBG Mobile and Free Fire." />
        <StatCard label="Country standings" value="Prepared" copy="Nigeria, Ghana, South Africa and future national circuits." />
        <StatCard label="Cash prizes" value="Locked" copy="No prize claims are active until organiser approval." />
      </section>
      <SectionHeader eyebrow="Circuit path" title="Open Qualifier to Championship Final" copy="Each stage feeds qualification status, trophies, standings and player history." />
      <section className="aga-card-grid" id="schedule">
        {championshipEvents.map((event, index) => (
          <DataCard
            action={event.status === "Registration Open" ? "Register Interest" : "View Stage"}
            copy={`${event.stage} for ${event.game}. Qualification and check-in will bind to tournament records when official events open.`}
            eyebrow={event.status}
            href="/tournaments"
            key={event.stage}
            meta={[event.date, `Qualified: ${event.qualified}`, "Circuit: AGA Championship Series"]}
            title={event.stage}
            tone={index % 3 === 1 ? "purple" : index % 3 === 2 ? "cyan" : "gold"}
          />
        ))}
      </section>
      <SectionHeader eyebrow="Standings" title="Players, clans and countries" copy="Championship points are deterministic demo records here; official updates should come from completed tournament matches." />
      <section className="aga-table-shell core-standings">
        <div className="aga-table-head"><span>Rank</span><span>Competitor</span><span>Country</span><span>Game</span><span>Points</span><span>Status</span></div>
        {championshipStandings.map((row) => (
          <div className="aga-rank-row" key={row.name}>
            <strong>#{row.rank}</strong>
            <span>{row.name}</span>
            <span>{row.country}</span>
            <span>{row.game}</span>
            <span>{row.points}</span>
            <StatusBadge tone={row.rank < 3 ? "gold" : "purple"}>{row.status}</StatusBadge>
          </div>
        ))}
      </section>
    </AGAPageShell>
  );
}
