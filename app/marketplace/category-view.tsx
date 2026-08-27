import Link from "next/link";
import { AGAPageShell, EmptyState, SectionHeader, StatCard, StatusBadge, SupabaseNotice } from "../aga-navigation";
import { findMarketplaceCategory, marketplaceCategories } from "./categories";

export function MarketplaceCategoryView({ slug }: { slug: string }) {
  const category = findMarketplaceCategory(slug);

  return (
    <AGAPageShell
      active="Marketplace"
      eyebrow="Marketplace category"
      title={category.title}
      copy={category.copy}
      actions={[{ label: "Back to Marketplace", href: "/marketplace" }, { label: "Order History", href: "/orders", variant: "secondary" }]}
    >
      <SupabaseNotice />
      <nav className="aga-market-category-nav" aria-label="Marketplace categories">
        {marketplaceCategories.map((item) => (
          <Link className={item.slug === category.slug ? "active" : ""} href={`/marketplace/category/${item.slug}`} key={item.slug}>
            {item.label}
          </Link>
        ))}
      </nav>
      <section className="aga-stat-grid">
        <StatCard label="Checkout" value="Off" copy="No buy-now, deposits, withdrawals or escrow." />
        <StatCard label="Vendor status" value="Manual" copy="Providers must be reviewed before appearing." />
        <StatCard label="Category" value={category.label} copy="Dedicated marketplace lane now exists." />
        <StatCard label="Safety" value="Required" copy="No account sales, cheats or unsafe fulfilment." />
      </section>
      <SectionHeader eyebrow="Category board" title={`${category.label} listings`} copy="Real vendor records will populate this category after approval and persistence are connected." />
      <section className="aga-card-grid" aria-label="Allowed marketplace request types">
        {category.items.map((item, index) => (
          <article className={`product-card ${index === 1 ? "purple" : index === 2 ? "cyan" : "gold"}`} key={item}>
            <span className="tag">Allowed type</span>
            <h3>{item}</h3>
            <p>This is an allowed request type, not a live listing. Approved vendor cards will appear separately after review.</p>
          </article>
        ))}
      </section>
      <article className="aga-create-preview">
        <StatusBadge tone={category.tone}>Trust layer</StatusBadge>
        <h3>{category.label} safety</h3>
        <p>AGA should track vendor identity, receipts, support cases, fulfilment proof and disputes before this category allows real transactions.</p>
        <dl>
          <div><dt>Payments</dt><dd>Disabled</dd></div>
          <div><dt>Orders</dt><dd>Tracked later</dd></div>
          <div><dt>Support</dt><dd>Available</dd></div>
        </dl>
      </article>
      <EmptyState title={`No live ${category.label} vendors yet`} copy="Approved vendor profiles will appear here after admin review and marketplace persistence are connected." action="Apply or Ask Support" href="/marketplace/sell" />
    </AGAPageShell>
  );
}
