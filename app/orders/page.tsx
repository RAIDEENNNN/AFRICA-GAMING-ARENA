import { AGAPageShell, DataCard, EmptyState, SectionHeader, StatCard, SupabaseNotice } from "../aga-navigation";

const orderStates = [
  ["Pending", "Orders waiting for review or vendor response."],
  ["Completed", "Fulfilled marketplace orders after payment architecture exists."],
  ["Refunded", "Resolved cases once disputes and provider records are live."],
];

export default function OrderHistoryPage() {
  return (
    <AGAPageShell
      active="/orders"
      eyebrow="Marketplace"
      title="ORDER HISTORY"
      copy="Track marketplace discovery requests and future approved orders. Real payments and fulfilment records remain disabled until compliance and vendor systems exist."
      actions={[{ label: "Back to Marketplace", href: "/marketplace" }, { label: "Contact Support", href: "/support", variant: "secondary" }]}
    >
      <SupabaseNotice />
      <section className="aga-stat-grid">
        <StatCard label="Real orders" value="0" copy="No transactions are enabled in this phase." />
        <StatCard label="Payments" value="Off" copy="No buy-now, deposits, withdrawals or escrow." />
        <StatCard label="Vendor fulfilment" value="Pending" copy="Requires approved vendor accounts and admin review." />
        <StatCard label="Disputes" value="Planned" copy="Support and evidence workflows must come first." />
      </section>
      <SectionHeader eyebrow="History" title="Order records will stay honest" copy="This page gives marketplace users a real destination without inventing purchases." />
      <section className="aga-card-grid">
        {orderStates.map(([title, copy], index) => (
          <DataCard
            copy={copy}
            eyebrow="Empty state"
            key={title}
            meta={["Count: 0", "Source: future marketplace orders", "Status: not connected"]}
            title={title}
            tone={index === 1 ? "purple" : index === 2 ? "cyan" : "gold"}
          />
        ))}
      </section>
      <EmptyState title="No marketplace orders yet" copy="When safe marketplace transactions are approved and connected, player purchases and support cases will appear here." action="Browse Marketplace" href="/marketplace" />
    </AGAPageShell>
  );
}
