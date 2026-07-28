import { AppShell, ChallengeCard, ClipCard, GameConfigPanel, GamePortalCard, PageHero, TournamentCard } from "../../components";
import { challenges, clips, games, tournaments } from "../../data";

export default function PubgGamePage() {
  const game = games[1];
  return (
    <AppShell>
      <PageHero eyebrow="PUBG Mobile Arena" title="Survival rooms and squad battles." copy="PUBG Mobile supports arena duels, squad battles, BR rooms, custom lobbies and esports tournament formats." primary={["Create PUBG room", "/matches/request"]} />
      <GamePortalCard game={game} />
      <GameConfigPanel game={game} />
      <section className="card-grid three">{challenges.filter((item) => item.game === "PUBG").map((challenge) => <ChallengeCard challenge={challenge} key={challenge.id} />)}</section>
      <section className="card-grid three"><TournamentCard tournament={tournaments[1]} /><ClipCard clip={clips[1]} /></section>
    </AppShell>
  );
}
