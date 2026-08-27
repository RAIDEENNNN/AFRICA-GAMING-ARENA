import { AGAPageShell, DataCard, EmptyState, FilterTabs, SearchBar, SectionHeader, StatCard, SupabaseNotice } from "../aga-navigation";

const listingCategories = [
  ["gaming-gear", "Gaming gear", "Controllers, headsets and mobile accessories discovery listings.", "View Listing"],
  ["creator-services", "Creator services", "Thumbnail, editing and highlight support from approved creator profiles.", "Contact"],
  ["tournament-services", "Tournament services", "Caster, moderator and bracket support requests for organisers.", "View"],
];

export default function MarketplacePage() {
  return (
    <AGAPageShell
      active="Marketplace"
      eyebrow="Vendors"
      title="MARKETPLACE"
      copy="Verified vendors and gaming services only. No direct game-account sales, account transfers or unsafe escrow flows."
      actions={[{ label: "Apply as Vendor", href: "/support" }, { label: "Order History", href: "/orders", variant: "secondary" }]}
    >
      <SupabaseNotice />
      <section className="aga-tool-row">
        <SearchBar placeholder="Search marketplace..." />
        <FilterTabs tabs={["COD Points", "PUBG UC", "Free Fire Diamonds", "Coaching", "Graphics", "Editing", "Tournament services", "Verified vendors"]} />
      </section>
      <section className="aga-stat-grid">
        <StatCard label="Real payments" value="Off" copy="No buy-now, deposits, withdrawals or escrow." />
        <StatCard label="Vendor approval" value="Manual" copy="Listings should be reviewed before appearing." />
        <StatCard label="Unsafe categories" value="Blocked" copy="No account sales, cheats or platform-breaking boosting." />
        <StatCard label="CTA mode" value="Contact" copy="Discovery only until legal/payment systems exist." />
      </section>
      <SectionHeader eyebrow="Discovery" title="Marketplace without unsafe payments" copy="AGA can host approved discovery listings, but transaction actions remain disabled until the proper legal and payment architecture exists." />
      <section className="aga-card-grid">
        {listingCategories.map(([id, title, copy, action], index) => (
          <DataCard
            action={action}
            copy={copy}
            eyebrow="Approved category"
            href={`/marketplace/${id}`}
            key={title}
            meta={["Status: contact only", "Transactions: not enabled", "Review required"]}
            title={title}
            tone={index === 1 ? "purple" : index === 2 ? "cyan" : "gold"}
          />
        ))}
      </section>
      <EmptyState title="No verified marketplace listings yet" copy="Real vendor cards will appear only after approval and moderation tools are connected." action="Contact Support" href="/support" />
    </AGAPageShell>
  );
}
