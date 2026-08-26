import { AGAPageShell, DataCard, EmptyState, FilterTabs, SearchBar, SectionHeader, StatCard, SupabaseNotice } from "../aga-navigation";
import { clans } from "../data";

export default function ClansPage() {
  return (
    <AGAPageShell
      active="Clans"
      eyebrow="Squads"
      title="TOP CLANS"
      copy="Search clans by game, region, recruitment status and ranking. Clan cards will be powered by real member and match records."
      actions={[{ label: "Create Clan", href: "/clans/create" }, { label: "Find Clan", href: "/find-clans", variant: "secondary" }]}
    >
      <SupabaseNotice />
      <section className="aga-tool-row">
        <SearchBar placeholder="Search clans..." />
        <FilterTabs tabs={["Top ranked", "New clans", "Recruiting", "My clan"]} />
      </section>
      <section className="aga-stat-grid">
        <StatCard label="Verified clans" value="0" copy="Normalized clan records will drive official rankings." />
        <StatCard label="Recruitment" value="Open" copy="Players can browse and prepare clan requests." />
        <StatCard label="Games" value="3" copy="CODM, PUBG Mobile and Free Fire." />
        <StatCard label="Management" value="Roles" copy="Owner, captain and member flows are planned server-side." />
      </section>
      <SectionHeader eyebrow="Directory preview" title="Clan cards are ready for real records" copy="The cards below are demo reference entries from the design system, not official live standings." />
      <section className="aga-card-grid">
        {clans.map((clan, index) => (
          <DataCard
            action="View Clan"
            copy={`${clan.name} is shown as a directory preview. Real rosters, owner permissions and match records will come from normalized clan tables.`}
            eyebrow={clan.status}
            href={`/clans/${clan.slug}`}
            key={clan.slug}
            meta={[clan.game, clan.region, `Members: ${clan.members}`, `Tag: ${clan.badge}`]}
            title={`${clan.badge} / ${clan.name}`}
            tone={index % 3 === 1 ? "purple" : index % 3 === 2 ? "cyan" : "gold"}
          />
        ))}
      </section>
      <EmptyState title="No authenticated clan joined yet" copy="Your real clan membership will appear here after login and clan creation or approval." action="Create Clan" href="/clans/create" />
    </AGAPageShell>
  );
}
