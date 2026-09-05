import { MatchRoomClient } from "../../arena-client";
import { AppShell, PageHero } from "../../components";
import { coreMatches } from "../../competitive-core";
import { matches } from "../../data";

export function generateStaticParams() {
  return matches.map((match) => ({ "match-id": match.id }));
}

export default async function DynamicMatchPage({ params }: { params: Promise<{ "match-id": string }> }) {
  const { "match-id": id } = await params;
  const match = coreMatches.find((item) => item.id === id) ?? coreMatches[0];
  return (
    <AppShell>
      <PageHero
        eyebrow="Match Room 2.0"
        title={match ? `${match.teamA} vs ${match.teamB}` : "Private challenge room"}
        copy="A command centre for match ID, teams, players, badges, check-in, ready status, rules, chat, evidence, disputes, MVP and post-match summary."
        primary={["Find another match", "/matches"]}
      />
      {match ? (
        <section className="match-command-centre">
          <article className="product-card"><small>Match ID</small><strong>{match.id}</strong><p>{match.game} / {match.mode} / {match.map}</p></article>
          <article className="product-card"><small>Lifecycle</small><strong>{match.lifecycle}</strong><p>{"Created -> Waiting -> Check-In -> Ready -> Live -> Result Pending -> Under Review -> Completed."}</p></article>
          <article className="product-card"><small>Players</small><strong>{match.playersA.length + match.playersB.length}</strong><p>{match.playersA.join(", ")} vs {match.playersB.join(", ")}</p></article>
          <article className="product-card"><small>Referee</small><strong>{match.referee}</strong><p>MVP: {match.mvp}. Winner: {match.winner}.</p></article>
          <article className="product-card match-room-wide"><h2>Rules and lobby details</h2><p>{match.rules}</p><p>Scheduled time: {match.scheduledTime}. Score submission, evidence upload and disputes stay attached to this room.</p></article>
        </section>
      ) : null}
      <MatchRoomClient roomId={id} />
    </AppShell>
  );
}
