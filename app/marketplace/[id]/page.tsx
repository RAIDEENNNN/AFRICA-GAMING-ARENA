import { AGAPageShell, DataCard, EmptyState, PagePanel } from "../../aga-navigation";

const listings = {
  "gaming-gear": ["Gaming gear", "Controllers, headsets and mobile accessories discovery listing."],
  "creator-services": ["Creator services", "Thumbnail, editing and highlight support from approved creator profiles."],
  "tournament-services": ["Tournament services", "Caster, moderator and bracket support requests for organisers."],
};

export function generateStaticParams() {
  return Object.keys(listings).map((id) => ({ id }));
}

export default async function MarketplaceListingPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [title, copy] = listings[id as keyof typeof listings] ?? listings["gaming-gear"];
  return (
    <AGAPageShell active="Marketplace" eyebrow="Contact only" title={title} copy="Marketplace listings are discovery pages only until legal, moderation and payment architecture exists.">
      <PagePanel title="Listing overview">
        <p>{copy}</p>
      </PagePanel>
      <section className="aga-card-grid two">
        <DataCard title="Safety status" copy="No buy-now, deposits, withdrawals, account sales or unsafe escrow." tone="purple" />
        <DataCard title="Contact route" copy="Use support to apply as a vendor or ask about approved listings." href="/support" action="Contact Support" />
      </section>
      <EmptyState title="Transactions are disabled" copy="AGA will not process real-money marketplace actions in this phase." />
    </AGAPageShell>
  );
}
