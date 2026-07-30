import { AGAPageShell, EmptyState, FilterTabs, SearchBar, SupabaseNotice } from "../aga-navigation";

export default function MarketplacePage() {
  return (
    <AGAPageShell
      active="Marketplace"
      eyebrow="Vendors"
      title="MARKETPLACE"
      copy="Verified vendors and gaming services only. No direct game-account sales, account transfers or unsafe escrow flows."
      actions={[{ label: "Apply as Vendor", href: "/support" }, { label: "Order History", href: "/profile", variant: "secondary" }]}
    >
      <SupabaseNotice />
      <section className="aga-tool-row">
        <SearchBar placeholder="Search marketplace..." />
        <FilterTabs tabs={["COD Points", "PUBG UC", "Free Fire Diamonds", "Coaching", "Graphics", "Editing", "Tournament services", "Verified vendors"]} />
      </section>
      <EmptyState
        title="The marketplace will open when verified vendors are approved"
        copy="Product cards will show image, game, price, vendor, verified badge, rating, delivery estimate and view-product actions."
        action="Contact Support"
        href="/support"
      />
    </AGAPageShell>
  );
}
