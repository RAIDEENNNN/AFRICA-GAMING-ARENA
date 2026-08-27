import { AppShell, PageHero } from "../../components";

export default function TournamentDetailPage() {
  return (
    <AppShell>
      <PageHero
        eyebrow="Tournament"
        title="Tournament not available"
        copy="No verified tournament record exists for this legacy preview URL."
        primary={["All tournaments", "/tournaments"]}
      />
      <section className="tournament-arena">
        <article className="product-card"><h2>Overview</h2><p>No schedule, prize pool or registration count is available yet.</p></article>
        <article className="product-card"><h2>Format</h2><p>Format details appear after an authorised organiser creates the tournament.</p></article>
        <article className="product-card bracket-card"><h2>Bracket</h2><p>No bracket exists yet.</p></article>
        <article className="product-card"><h2>Rules</h2><p>Player IDs, evidence rules and disputes will be configured per verified event.</p></article>
      </section>
    </AppShell>
  );
}
