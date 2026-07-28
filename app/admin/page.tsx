import { AppShell, PageHero } from "../components";
import { adminConfig, games } from "../data";

export default async function AdminPage({ searchParams }: { searchParams: Promise<{ role?: string }> }) {
  const { role } = await searchParams;
  if (role !== "admin") {
    return (
      <AppShell>
        <PageHero
          eyebrow="Protected"
          title="Admin access requires an administrator session."
          copy="This route is blocked for normal players. The next production step is replacing this development guard with role-based session middleware."
          primary={["Back to dashboard", "/dashboard"]}
        />
      </AppShell>
    );
  }

  return (
    <AppShell>
      <PageHero
        eyebrow="Admin"
        title="Control games, challenge rules, safety limits and result disputes."
        copy="This internal view is where approved operators would manage game taxonomies, match formats, evidence rules, wager gates and marketplace vendors."
        primary={["Review match room", "/matches/ca-1024"]}
        secondary={["Open settings", "/settings"]}
      />
      <section className="content-grid two">
        <article className="product-card admin-panel">
          <h2>Safety gates</h2>
          <p>Wager status: {adminConfig.wagerFeatureFlag}</p>
          <div className="chip-row">
            {adminConfig.wagerLimits.map((item) => <span key={item}>{item}</span>)}
          </div>
        </article>
        <article className="product-card admin-panel">
          <h2>Challenge taxonomy</h2>
          <div className="chip-row">
            {adminConfig.challengeTaxonomy.map((item) => <span key={item}>{item}</span>)}
          </div>
        </article>
      </section>
      <section className="content-grid three">
        {games.map((game) => (
          <article className="product-card" key={game.slug}>
            <h3>{game.short}</h3>
            <p>{game.maps.length} maps, {game.modes.length} modes and {game.weapons.length} weapon groups configured.</p>
            <small>{game.vendor}</small>
          </article>
        ))}
      </section>
    </AppShell>
  );
}
