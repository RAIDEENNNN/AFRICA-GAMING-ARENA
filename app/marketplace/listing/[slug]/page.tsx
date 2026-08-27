import { AGAPageShell, EmptyState, PagePanel, StatCard, SupabaseNotice } from "../../../aga-navigation";

export function generateStaticParams() {
  return [];
}

export default async function MarketplaceListingDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  return (
    <AGAPageShell
      active="Marketplace"
      eyebrow="Marketplace listing"
      title="LISTING NOT AVAILABLE"
      copy="Listing detail pages are reserved for verified vendor records. This route does not invent products, prices, sellers, reviews or availability."
      actions={[{ label: "Marketplace", href: "/marketplace" }, { label: "Sell on AGA", href: "/marketplace/sell", variant: "secondary" }]}
    >
      <SupabaseNotice />
      <section className="aga-stat-grid">
        <StatCard label="Requested slug" value={slug} copy="No matching approved D1 listing exists." />
        <StatCard label="Payments" value="Off" copy="No deposits, withdrawals, checkout or escrow." />
        <StatCard label="Reviews" value="0" copy="No fabricated reviews or reputation scores." />
        <StatCard label="Inventory" value="0" copy="Inventory is shown only from real vendor data." />
      </section>
      <PagePanel title="Listing status">
        <p>No approved marketplace listing exists for this URL. Verified vendor listings will show seller identity, category, moderation status and safe contact options after the marketplace backend is connected.</p>
      </PagePanel>
      <EmptyState title="No live listing" copy="Browse marketplace categories or apply for vendor review. Account selling and unsafe fulfilment remain blocked." action="Browse Categories" href="/marketplace" />
    </AGAPageShell>
  );
}
