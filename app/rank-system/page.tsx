import { AGAPageShell, PagePanel } from "../aga-navigation";

export default function RankSystemPage() {
  return (
    <AGAPageShell active="/rank-system" eyebrow="Competition" title="RANK SYSTEM" copy="AGA ranking points are earned through verified matches, tournament results and seasonal performance.">
      <section className="aga-info-grid">
        {["Ranking points", "Match types", "Promotions", "Penalties", "Seasons", "Clan rankings", "Tournament rankings"].map((item) => (
          <PagePanel title={item} key={item}>
            <p>This rule set will be finalised before ranked play opens. No ranking points are awarded until verified match results are live.</p>
          </PagePanel>
        ))}
      </section>
    </AGAPageShell>
  );
}
