import Link from "next/link";
import { AGAPageShell, DataCard, EmptyState, SectionHeader, StatCard, StatusBadge, SupabaseNotice } from "../../../aga-navigation";
import { findMarketplaceCategory, marketplaceCategories } from "../../categories";

export function generateStaticParams() {
  return marketplaceCategories.map((category) => ({ category: category.slug }));
}

export default async function MarketplaceCategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category: slug } = await params;
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
      <SectionHeader eyebrow="Category board" title={`${category.label} listings`} copy="This page is no longer empty. Real vendor records will populate these slots after approval and persistence are connected." />
      <section className="aga-card-grid">
        {category.items.map((item, index) => (
          <DataCard
            action="Contact Support"
            copy={`${item} is prepared as a reviewed marketplace request type. AGA should show real vendor cards here only after verification.`}
            eyebrow="Prepared lane"
            href="/support"
            key={item}
            meta={["Transactions: disabled", "Vendor approval: required", "Order record: future /orders"]}
            title={item}
            tone={index === 1 ? "purple" : index === 2 ? "cyan" : "gold"}
          />
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
      <EmptyState title={`No live ${category.label} vendors yet`} copy="Approved vendor profiles will appear here after admin review and marketplace persistence are connected." action="Apply or Ask Support" href="/support" />
    </AGAPageShell>
  );
}
