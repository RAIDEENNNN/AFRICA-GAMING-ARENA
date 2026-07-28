import { AppShell, PageHero } from "../../components";

export default function TournamentDetailPage() {
  return (
    <AppShell>
      <PageHero
        eyebrow="Tournament"
        title="CODM Championship"
        copy="A verified double-elimination event with registration, brackets, rules, standings and match results."
        primary={["Register clan soon", "/tournaments/codm-championship"]}
      />
      <section className="tournament-arena">
        <article className="product-card"><h2>Overview</h2><p>Prize pool $5,000. Registration closes May 20, 2026. Starts May 25, 2026.</p></article>
        <article className="product-card"><h2>Format</h2><p>Double elimination / 5v5 / 64 max teams / captain check-in required.</p></article>
        <article className="product-card bracket-card"><h2>Bracket</h2><div><span>XCL</span><b>2-0</b><span>NOVA</span></div><div><span>7DS</span><b>1-2</b><span>IM</span></div></article>
        <article className="product-card"><h2>Rules</h2><p>Player IDs required, evidence screenshots mandatory, disputes reviewed by moderators.</p></article>
      </section>
    </AppShell>
  );
}
