import { AppShell, GamePortalCard, PageHero } from "../components";
import { games } from "../data";

export default function GamesPage() {
  return (
    <AppShell>
      <PageHero
        eyebrow="Game portals"
        title="Three gaming worlds inside one Clan Arena."
        copy="Each supported game has its own atmosphere, challenge defaults, weapons, maps, modes, tournaments, clips and vendors."
      />
      <section className="game-portal-grid">
        {games.map((game) => <GamePortalCard game={game} key={game.slug} />)}
      </section>
    </AppShell>
  );
}
