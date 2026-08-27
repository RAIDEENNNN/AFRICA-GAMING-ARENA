import { AGAPageShell, DataCard, EmptyState, FilterTabs, SearchBar, SectionHeader, StatCard, SupabaseNotice } from "../aga-navigation";
import { clans } from "../data";

export default function FindClansPage() {
  return (
    <AGAPageShell
      active="Clans"
      eyebrow="Recruitment"
      title="FIND CLAN"
      copy="Search for teams by game, region, recruitment status and competitive intent. Real applications will attach to authenticated player profiles."
      actions={[{ label: "Create Clan", href: "/clans/create" }, { label: "All Clans", href: "/clans", variant: "secondary" }]}
    >
      <SupabaseNotice />
      <section className="aga-tool-row">
        <SearchBar placeholder="Search clans, tags or captains..." />
        <FilterTabs tabs={["Recruiting", "CODM", "PUBG Mobile", "Free Fire", "Africa", "Global", "Applications"]} />
      </section>
      <section className="aga-stat-grid">
        <StatCard label="Open applications" value="0" copy="Live application records will appear after clan persistence is connected." />
        <StatCard label="Verified clans" value={clans.length} copy="Real clan records only. No design preview teams." />
        <StatCard label="Filters" value="Ready" copy="Game, region and recruitment states are represented in the UI." />
        <StatCard label="Join requests" value="Locked" copy="Requires login, profile and clan membership rules." />
      </section>
      <SectionHeader eyebrow="Clan discovery" title="Choose the squad before you request access" copy="The directory is ready, but it stays empty until real clans are created." />
      <section className="aga-card-grid">
        {clans.map((clan, index) => (
          <DataCard
            action="Open Clan"
            copy={`${clan.name} is a ${clan.game} clan preview for recruitment layout testing. Real captain approvals and rosters will come from D1-backed clan records.`}
            eyebrow={clan.status}
            href={`/clans/${clan.slug}`}
            key={clan.slug}
            meta={[`Region: ${clan.region}`, `Members: ${clan.members}`, `Win rate: ${clan.rate}`, `Points: ${clan.points}`]}
            title={`${clan.badge} / ${clan.name}`}
            tone={index % 3 === 1 ? "purple" : index % 3 === 2 ? "cyan" : "gold"}
          />
        ))}
      </section>
      <EmptyState title="No clans are recruiting yet" copy="Once captains create clans and open applications, recruitment cards will appear here." action="Create Clan" href="/clans/create" />
    </AGAPageShell>
  );
}
