import { MarketplaceLive } from "../arena-client";
import { AppShell, PageHero } from "../components";
import { games } from "../data";

export default function MarketplacePage() {
  return (
    <AppShell>
      <PageHero
        eyebrow="Marketplace"
        title="Verified vendors, not account selling."
        copy="Clan Arena can list legitimate top-up vendors, services and community links. Account buying, selling or transfer is excluded."
      />
      <section className="market-category-row">
        {["COD Points", "PUBG Mobile UC", "Free Fire Diamonds", "Verified vendors", "Orders", "Vendor group links"].map((item) => <a href="#" key={item}>{item}</a>)}
      </section>
      <section className="card-grid three">
        {games.map((game) => (
          <article className={`product-card vendor-card game-${game.theme}`} key={game.slug}>
            <h2>{game.vendor}</h2>
            <p>Verified listings only. External WhatsApp, Telegram or Discord links must show a safety warning before redirect.</p>
            <button className="btn secondary" disabled>Checkout flow coming soon</button>
          </article>
        ))}
      </section>
      <MarketplaceLive />
    </AppShell>
  );
}
