import Link from "next/link";
import { AGAPageShell, DataCard, EmptyState, FilterTabs, PagePanel, SectionHeader, StatCard, SupabaseNotice } from "../aga-navigation";
import { coreTournaments } from "../competitive-core";
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
      <section className="aga-stat-grid">
        <StatCard label="Open registration" value={String(coreTournaments.filter((item) => item.status === "Registration Open").length)} copy="Demo tournament records prepared for organiser-backed registration." />
        <StatCard label="Live events" value={String(coreTournaments.filter((item) => item.status === "Live" || item.status === "Check-In").length)} copy="Live brackets will appear from the tournament backend." />
        <StatCard label="Supported games" value="3" copy="CODM, PUBG Mobile and Free Fire." />
        <StatCard label="Formats" value="5" copy="Single, double, round robin, groups and league table." />
      </section>
      <FilterTabs tabs={["All", "CODM", "PUBG Mobile", "Free Fire", "CMA", "Upcoming", "Live", "Completed"]} />
      <SectionHeader eyebrow="Tournament Engine 2.0" title="Upcoming, live and completed events" copy="Registration, seeding, brackets, match rooms, score reporting, evidence, disputes, progression and winner ceremony are presented as one organiser flow." />
      <section className="aga-card-grid">
        {tournaments.map((tournament, index) => (
          <DataCard
            action="View Tournament"
            copy={`${tournament.format}. Registration flow, check-in, bracket progression and match rooms are architecture-ready for organiser control.`}
            eyebrow={tournament.tag}
            href={`/tournaments/${tournament.slug}`}
            key={tournament.slug}
            meta={[tournament.game, tournament.date, `Entrants: ${coreTournaments[index]?.entrants ?? tournament.teams}`, `Prize: ${tournament.prize}`]}
            title={tournament.name}
            tone={index === 1 ? "purple" : index === 2 ? "cyan" : "gold"}
          />
        ))}
      </section>
      <section className="aga-card-grid">
        {["Single Elimination", "Double Elimination", "Round Robin", "Groups + Knockout", "League Table"].map((format) => (
          <DataCard key={format} title={format} eyebrow="Bracket format" copy="Designed for registration, check-in, seeding, match rooms, score reporting, evidence upload and admin review." href="/tournaments/create" action="Create Format" />
        ))}
      </section>
      <EmptyState title="Authoritative tournament publishing is gated" copy="Demo tournament pages are visible, but official prizes, brackets and winners require authorised organiser approval." action="View CMA Hub" href="/tournaments/cma" />
      <PagePanel title="CMA tournaments">
        <p>CMA tournament registration will appear here when CODM events are opened by an authorised organiser.</p>
        <Link className="aga-page-btn secondary" href="/tournaments/cma">View CMA Tournaments</Link>
      </PagePanel>
    </AGAPageShell>
  );
}
