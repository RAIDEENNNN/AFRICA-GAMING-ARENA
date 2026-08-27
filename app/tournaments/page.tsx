import Link from "next/link";
import { AGAPageShell, DataCard, EmptyState, FilterTabs, PagePanel, SectionHeader, StatCard, SupabaseNotice } from "../aga-navigation";
import { tournaments } from "../data";

export default function TournamentsPage() {
  return (
    <AGAPageShell
      active="Tournaments"
      eyebrow="Events"
      title="ALL TOURNAMENTS"
      copy="Browse official and partner tournaments by game, format, status and organiser. Real events will appear here from Supabase."
      actions={[{ label: "View CMA Tournaments", href: "/tournaments/cma" }, { label: "Create Tournament", href: "/tournaments/create", variant: "secondary" }]}
    >
      <SupabaseNotice />
      <section className="aga-stat-grid">
        <StatCard label="Open registration" value="0" copy="No verified registration records yet." />
        <StatCard label="Live events" value="0" copy="Live brackets will appear from the tournament backend." />
        <StatCard label="Supported games" value="3" copy="CODM, PUBG Mobile and Free Fire." />
        <StatCard label="CMA status" value="Setup" copy="CMA hub is prepared for organiser activation." />
      </section>
      <FilterTabs tabs={["All", "CODM", "PUBG Mobile", "Free Fire", "CMA", "Upcoming", "Live", "Completed"]} />
      <SectionHeader eyebrow="Tournament board" title="Upcoming, live and completed events" copy="Only verified organiser records will appear here. No invented prize pools, brackets or registered team counts." />
      <section className="aga-card-grid">
        {tournaments.map((tournament, index) => (
          <DataCard
            action="View Tournament"
            copy={`${tournament.format}. Registration flow is architecture-ready and will only accept real entries when organiser controls are enabled.`}
            eyebrow={tournament.tag}
            href={`/tournaments/${tournament.slug}`}
            key={tournament.slug}
            meta={[tournament.game, tournament.date, "Participants: awaiting real registration", `Prize: ${tournament.prize}`]}
            title={tournament.name}
            tone={index === 1 ? "purple" : index === 2 ? "cyan" : "gold"}
          />
        ))}
      </section>
      <EmptyState title="No tournaments are open yet" copy="Tournament matches, standings and results will appear here only after authorised organisers create real brackets." action="View CMA Hub" href="/tournaments/cma" />
      <PagePanel title="CMA tournaments">
        <p>CMA tournament registration will appear here when CODM events are opened by an authorised organiser.</p>
        <Link className="aga-page-btn secondary" href="/tournaments/cma">View CMA Tournaments</Link>
      </PagePanel>
    </AGAPageShell>
  );
}
