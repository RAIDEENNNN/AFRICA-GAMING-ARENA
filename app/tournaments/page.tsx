import { AppShell, PageHero, TournamentCard } from "../components";
import { tournaments } from "../data";

export default function TournamentsPage() {
  return (
    <AppShell>
      <PageHero eyebrow="Tournaments" title="Discover events and register your clan." copy="Filter by game, region, format, entry status and prize pool." />
      <section className="product-card cma-feature-card">
        <span className="tag live">Official tournament partner</span>
        <h2>CMA Tournaments</h2>
        <p>Daily Call of Duty: Mobile MP and BR competitions powered inside Africa Gaming Arena.</p>
        <a className="btn primary" href="/tournaments/cma">Open CMA Tournaments</a>
      </section>
      <section className="card-grid three">
        {tournaments.map((tournament) => <TournamentCard tournament={tournament} key={tournament.name} />)}
      </section>
    </AppShell>
  );
}
