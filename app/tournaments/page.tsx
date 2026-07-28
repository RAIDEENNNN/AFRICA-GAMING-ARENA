import { AppShell, PageHero, TournamentCard } from "../components";
import { tournaments } from "../data";

export default function TournamentsPage() {
  return (
    <AppShell>
      <PageHero eyebrow="Tournaments" title="Discover events and register your clan." copy="Filter by game, region, format, entry status and prize pool." />
      <section className="card-grid three">
        {tournaments.map((tournament) => <TournamentCard tournament={tournament} key={tournament.name} />)}
      </section>
    </AppShell>
  );
}
