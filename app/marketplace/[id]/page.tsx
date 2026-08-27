import { AGAPageShell, EmptyState, PagePanel } from "../../aga-navigation";

export function generateStaticParams() {
  return [];
}

export default async function MarketplaceListingPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return (
    <AGAPageShell active="Marketplace" eyebrow="Listing" title="LISTING NOT AVAILABLE" copy="Marketplace listing pages render only when a verified, persisted vendor listing exists.">
      <PagePanel title="Requested listing">
        <p>No approved listing exists for “{id}”. Browse categories or apply for vendor review.</p>
      </PagePanel>
      <EmptyState title="No live listing record" copy="No buy-now, deposits, withdrawals, account sales or unsafe escrow are enabled." action="Back to Marketplace" href="/marketplace" />
    </AGAPageShell>
  );
}
