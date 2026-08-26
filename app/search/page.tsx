import { AGAPageShell, DataCard, EmptyState, SearchBar, SectionHeader, SupabaseNotice } from "../aga-navigation";
import { clans, games, tournaments } from "../data";

export default function SearchPage() {
  return (
    <AGAPageShell
      active="/search"
      eyebrow="Global search"
      title="FIND ANYTHING IN AGA"
      copy="Search across games, clans, tournaments, players and news. Results stay limited to data sources that actually exist."
      actions={[{ label: "Find Match", href: "/matches" }, { label: "Create Match", href: "/matches/request", variant: "secondary" }]}
    >
      <SupabaseNotice />
      <section className="aga-tool-row">
        <SearchBar placeholder="Search players, clans, tournaments, games..." />
      </section>
      <SectionHeader eyebrow="Indexed now" title="Available result groups" copy="This launch build can link to existing static and demo-reference records. Backend search will expand as normalized data grows." />
      <section className="aga-card-grid">
        <DataCard title="Games" eyebrow="3 arenas" copy="Jump into CODM, PUBG Mobile or Free Fire game hubs." href="/games" action="Browse Games" meta={games.map((game) => game.name)} />
        <DataCard title="Clans" eyebrow="Directory" copy="Browse clan profile routes and recruitment-ready pages." href="/clans" action="Browse Clans" meta={clans.slice(0, 3).map((clan) => clan.name)} tone="purple" />
        <DataCard title="Tournaments" eyebrow="Events" copy="Open tournament pages and CMA preparation routes." href="/tournaments" action="Browse Tournaments" meta={tournaments.map((item) => item.name)} tone="cyan" />
      </section>
      <EmptyState title="Live text search is not connected yet" copy="When the backend search index exists, submitted queries will return grouped live results here." />
    </AGAPageShell>
  );
}
