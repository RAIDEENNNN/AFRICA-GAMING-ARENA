import Link from "next/link";
import { AGAPageShell, PagePanel, SupabaseNotice } from "../aga-navigation";

const gamePortals = [
  {
    title: "Call of Duty: Mobile",
    short: "CODM",
    href: "/games/codm",
    image: "/images/aga/portals/codm-portal",
    modes: ["1v1", "2v2", "3v3", "5v5", "Clan War", "MP", "BR"],
    tone: "gold",
    cta: "Enter CODM Arena",
    extra: ["CMA Tournaments", "/tournaments/cma"],
  },
  {
    title: "PUBG Mobile",
    short: "PUBG",
    href: "/games/pubg-mobile",
    image: "/images/aga/portals/pubg-mobile-portal",
    modes: ["Solo", "Duo", "Squad", "TDM", "Arena", "BR"],
    tone: "cyan",
    cta: "Enter PUBG Arena",
  },
  {
    title: "Free Fire",
    short: "FF",
    href: "/games/free-fire",
    image: "/images/aga/portals/free-fire-portal",
    modes: ["Solo", "Duo", "Squad", "Clash Squad", "Guild War"],
    tone: "purple",
    cta: "Enter Free Fire Arena",
  },
];

export default function GamesPage() {
  return (
    <AGAPageShell
      active="Games"
      eyebrow="Game portals"
      title="CHOOSE YOUR GAME"
      copy="Compete in your favourite mobile games. Each arena has its own match formats, challenges, tournaments, clips and rankings."
      actions={[{ label: "Create Match", href: "/matches/request" }, { label: "Browse Tournaments", href: "/tournaments", variant: "secondary" }]}
    >
      <SupabaseNotice />
      <section className="aga-game-page-grid">
        {gamePortals.map((game) => (
          <article className={`aga-game-page-card ${game.tone}`} key={game.href}>
            <picture>
              <source media="(max-width: 640px)" srcSet={`${game.image}-mobile.avif`} type="image/avif" />
              <source media="(max-width: 1024px)" srcSet={`${game.image}-tablet.avif`} type="image/avif" />
              <source srcSet={`${game.image}-desktop.avif`} type="image/avif" />
              <img src={`${game.image}-desktop.webp`} alt={`${game.title} arena artwork`} />
            </picture>
            <div>
              <span>{game.short}</span>
              <h2>{game.title}</h2>
              <nav aria-label={`${game.title} formats`}>
                {game.modes.map((mode) => <small key={mode}>{mode}</small>)}
              </nav>
              <dl>
                <div><dt>Open challenges</dt><dd>0</dd></div>
                <div><dt>Upcoming tournaments</dt><dd>0</dd></div>
                <div><dt>Players online</dt><dd>0</dd></div>
              </dl>
              <div className="aga-card-actions">
                <Link className="aga-page-btn primary" href={game.href}>{game.cta}</Link>
                {game.extra ? <Link className="aga-page-btn secondary" href={game.extra[1]}>{game.extra[0]}</Link> : null}
              </div>
            </div>
          </article>
        ))}
      </section>
      <PagePanel title="Arena data">
        <p>Game-specific challenges, tournaments, top players, top clans and trending clips will populate from Supabase as real activity begins.</p>
      </PagePanel>
    </AGAPageShell>
  );
}
