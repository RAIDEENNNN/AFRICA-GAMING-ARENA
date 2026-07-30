import { AGAPageShell, EmptyState, FilterTabs, SearchBar, SupabaseNotice } from "../aga-navigation";

export default function NewsPage() {
  return (
    <AGAPageShell
      active="News"
      eyebrow="Updates"
      title="LATEST NEWS"
      copy="Platform announcements, tournament updates, game news, community stories and CMA coverage will appear here."
      actions={[{ label: "Subscribe", href: "/register" }, { label: "Contact AGA", href: "/contact", variant: "secondary" }]}
    >
      <SupabaseNotice />
      <section className="aga-tool-row">
        <SearchBar placeholder="Search news..." />
        <FilterTabs tabs={["AGA updates", "Tournaments", "CODM", "PUBG Mobile", "Free Fire", "CMA", "Community", "Platform announcements"]} />
      </section>
      <EmptyState
        title="News and platform updates will appear here"
        copy="Article cards will include category, title, summary, author, date, read time and featured imagery after publishing tools are connected."
        action="Check Back Later"
        href="/"
      />
    </AGAPageShell>
  );
}
