import { AppShell, ChallengeCard, ClipCard, GameConfigPanel, GamePortalCard, PageHero, TournamentCard } from "../../components";
import { challenges, clips, games, tournaments } from "../../data";

export default function CodmGamePage() {
  const game = games[0];
  return (
    <AppShell>
      <PageHero eyebrow="CODM Arena" title="Tactical multiplayer challenges." copy="CODM defaults to weapon-based duels, map veto, 1v1 through 5v5 and competitive multiplayer rules." primary={["Create CODM challenge", "/matches/request"]} />
      <GamePortalCard game={game} />
      <GameConfigPanel game={game} />
      <section className="card-grid three">{challenges.filter((item) => item.game === "CODM").map((challenge) => <ChallengeCard challenge={challenge} key={challenge.id} />)}</section>
      <section className="card-grid three"><TournamentCard tournament={tournaments[0]} /><ClipCard clip={clips[0]} /><ClipCard clip={clips[2]} /></section>
    </AppShell>
  );
}
