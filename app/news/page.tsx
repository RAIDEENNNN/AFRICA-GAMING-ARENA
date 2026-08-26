import { AGAPageShell, DataCard, EmptyState, FilterTabs, SearchBar, SectionHeader, StatCard, SupabaseNotice } from "../aga-navigation";

const articles = [
  {
    slug: "aga-launch-roadmap",
    category: "AGA",
    title: "AGA launch roadmap",
    excerpt: "A clear view of the platform systems being prepared: profiles, matches, clans, tournaments, clips and rankings.",
  },
  {
    slug: "cma-tournament-prep",
    category: "CMA",
    title: "CMA tournament preparation",
    excerpt: "How CODM tournament registration, rules, check-in and results will connect once organiser controls are active.",
  },
  {
    slug: "safe-marketplace-policy",
    category: "Policy",
    title: "Marketplace safety policy",
    excerpt: "AGA discovery listings avoid account sales, cheats, unsafe escrow and unverified cash transactions.",
  },
];

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
      <section className="aga-stat-grid">
        <StatCard label="CMS status" value="Planned" copy="Article records will move out of page files later." />
        <StatCard label="Categories" value="6" copy="AGA, esports, tournaments, games, community and updates." />
        <StatCard label="Fake news" value="0" copy="No external claims or fabricated patch notes." />
        <StatCard label="Editorial" value="Ready" copy="Listing and detail routes are prepared." />
      </section>
      <SectionHeader eyebrow="Editorial board" title="Platform stories and policies" copy="These articles document AGA itself until a CMS or newsroom workflow is connected." />
      <section className="aga-card-grid">
        {articles.map((article, index) => (
          <DataCard
            action="Read Article"
            copy={article.excerpt}
            eyebrow={article.category}
            href={`/news/${article.slug}`}
            key={article.slug}
            meta={["Author: AGA Team", "Date: launch preparation", "Source: internal platform notes"]}
            title={article.title}
            tone={index === 1 ? "purple" : index === 2 ? "cyan" : "gold"}
          />
        ))}
      </section>
      <EmptyState title="No live CMS posts yet" copy="News records from a CMS will replace these internal launch notes once publishing tools are connected." action="Back Home" href="/" />
    </AGAPageShell>
  );
}
