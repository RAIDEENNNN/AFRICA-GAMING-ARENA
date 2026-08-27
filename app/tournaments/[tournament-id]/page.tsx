import { AppShell, PageHero } from "../../components";
import Link from "next/link";
import { tournaments } from "../../data";

export function generateStaticParams() {
  return tournaments.map((tournament) => ({ "tournament-id": tournament.slug }));
}

export default async function DynamicTournamentPage({ params }: { params: Promise<{ "tournament-id": string }> }) {
  const { "tournament-id": slug } = await params;
  const tournament = tournaments.find((item) => item.slug === slug);
  if (!tournament) {
    return (
      <AppShell>
        <PageHero
          eyebrow="Tournament"
          title="Tournament not available"
          copy="No verified tournament record exists for this page yet."
          primary={["Back to tournaments", "/tournaments"]}
          secondary={["Create tournament", "/tournaments/create"]}
        />
        <section className="card-grid two">
          <article className="product-card"><h2>No schedule</h2><p>Schedules are shown only after an authorised organiser creates the event.</p></article>
          <article className="product-card"><h2>No bracket</h2><p>Brackets and results stay hidden until real registrations and match records exist.</p><Link className="btn secondary" href="/tournaments">Browse tournaments</Link></article>
        </section>
      </AppShell>
    );
  }
  return (
    <AppShell>
      <PageHero
        eyebrow="Tournament"
        title={tournament.name}
        copy={`${tournament.game} / ${tournament.format} / ${tournament.prize} prize pool / ${tournament.teams} registered.`}
        primary={["Register clan soon", `/tournaments/${tournament.slug}`]}
      />
      <section className="card-grid two">
        <article className="product-card"><h2>Schedule</h2><p>{tournament.date}. Registration and check-in workflows connect in the backend phase.</p></article>
        <article className="product-card"><h2>Bracket</h2><p>Interactive seeding, advancement and dispute handling will live here.</p></article>
      </section>
    </AppShell>
  );
}
