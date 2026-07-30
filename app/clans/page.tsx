import { AGAPageShell, EmptyState, FilterTabs, SearchBar, SupabaseNotice } from "../aga-navigation";

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
      <EmptyState
        title="No clans have entered the arena yet"
        copy="Create the first squad. When real clans exist, each card will show emblem, tag, game, region, members, record, ranking points and recruitment status."
        action="Create Clan"
        href="/clans/create"
      />
    </AGAPageShell>
  );
}
