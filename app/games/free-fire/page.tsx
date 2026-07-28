import { AppShell, GameConfigPanel, GamePortalCard, PageHero, TournamentCard } from "../../components";
import { games, tournaments } from "../../data";

export default function FreeFireGamePage() {
  const game = games[2];
  return (
    <AppShell>
      <PageHero eyebrow="Free Fire Arena" title="Guild battles with colour and speed." copy="Free Fire uses Clash Squad, guild vs guild, custom rooms, ranked challenges and energetic survival-esports presentation." primary={["Create Free Fire challenge", "/matches/request"]} />
      <GamePortalCard game={game} />
      <GameConfigPanel game={game} />
      <section className="card-grid three"><TournamentCard tournament={tournaments[2]} /></section>
    </AppShell>
  );
}
