import Link from "next/link";
import { AGAPageShell, EmptyState, SearchBar, SectionHeader, StatCard, SupabaseNotice } from "../aga-navigation";
import { marketplaceCategories } from "./categories";

export default function MarketplacePage() {
  return (
    <AGAPageShell
      active="Marketplace"
      eyebrow="Vendors"
      title="MARKETPLACE"
      copy="Verified vendors and gaming services only. No direct game-account sales, account transfers or unsafe escrow flows."
      actions={[{ label: "Sell on AGA", href: "/marketplace/sell" }, { label: "Order History", href: "/orders", variant: "secondary" }]}
    >
      <SupabaseNotice />
      <section className="aga-tool-row">
        <SearchBar placeholder="Search marketplace..." />
        <nav className="aga-market-category-nav" aria-label="Marketplace categories">
          {marketplaceCategories.map((category, index) => (
            <Link className={index === 0 ? "active" : ""} href={`/marketplace/category/${category.slug}`} key={category.slug}>
              {category.label}
            </Link>
          ))}
        </nav>
      </section>
      <section className="aga-stat-grid">
        <StatCard label="Real payments" value="Off" copy="No buy-now, deposits, withdrawals or escrow." />
        <StatCard label="Vendor approval" value="Manual" copy="Listings should be reviewed before appearing." />
        <StatCard label="Unsafe categories" value="Blocked" copy="No account sales, cheats or platform-breaking boosting." />
        <StatCard label="CTA mode" value="Contact" copy="Discovery only until legal/payment systems exist." />
      </section>
      <SectionHeader eyebrow="Categories" title="Marketplace lanes" copy="These categories are navigation only. Listing cards appear after real vendor approval and persistent marketplace records exist." />
      <section className="aga-market-category-grid">
        {marketplaceCategories.map((category) => (
          <article className={`aga-market-category-card ${category.tone}`} key={category.slug}>
            <span>{category.label}</span>
            <h3>{category.title}</h3>
            <p>{category.copy}</p>
            <ul>{category.items.map((item) => <li key={item}>{item}</li>)}</ul>
            <Link className="aga-page-btn secondary" href={`/marketplace/category/${category.slug}`}>Open Category</Link>
          </article>
        ))}
      </section>
      <EmptyState title="No verified marketplace listings yet" copy="Real vendor cards will appear only after approval and moderation tools are connected." action="Contact Support" href="/support" />
    </AGAPageShell>
  );
}
