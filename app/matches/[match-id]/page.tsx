import { AgreementPanel, AppShell, PageHero } from "../../components";
import { matches } from "../../data";

export default async function DynamicMatchPage({ params }: { params: Promise<{ "match-id": string }> }) {
  const { "match-id": id } = await params;
  const match = matches.find((item) => item.id === id) ?? matches[0];
  return (
    <AppShell>
      <PageHero
        eyebrow="Match room"
        title={`${match.left} vs ${match.right}`}
        copy={`${match.game} match room for check-in, rules, rosters, chat, evidence, result submission and disputes.`}
        primary={["Submit result soon", `/matches/${match.id}`]}
      />
      <section className="card-grid two">
        <article className="product-card"><h2>Status</h2><p>{match.status}</p></article>
        <article className="product-card"><h2>Score</h2><p>{match.score}</p></article>
      </section>
      <AgreementPanel />
    </AppShell>
  );
}
