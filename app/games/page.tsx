import { AppShell, GamePortalCard } from "../components";
import { games } from "../data";

export default function GamesPage() {
  return (
    <AppShell>
      <section className="portal-gateway">
        <span className="eyebrow">Game portals</span>
        <h1>Choose your universe.</h1>
        <p>CODM is tactical and weapon-led. PUBG Mobile is survival pressure. Free Fire is fast guild warfare. Each portal has its own rules, texture and lobby rhythm.</p>
      </section>
      <section className="game-portal-grid">
        {games.map((game) => <GamePortalCard game={game} key={game.slug} />)}
      </section>
    </AppShell>
  );
}
