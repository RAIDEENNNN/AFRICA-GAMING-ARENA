import { AppShell, ClanCard, ClipCard, MatchRow, PageHero, TournamentCard } from "../components";
import { clans, clips, matches, tournaments } from "../data";

export default function DashboardPage() {
  return (
    <AppShell>
      <PageHero
        eyebrow="Dashboard"
        title="Your gaming command centre."
        copy="Track clan status, pending match requests, tournament registrations, clips and notifications from one focused workspace."
        primary={["Request match", "/matches/request"]}
        secondary={["Find clans", "/find-clans"]}
      />
      <section className="card-grid four">
        {[
          ["Wallet", "Wagers disabled"],
          ["Upcoming", "1 match"],
          ["Negotiations", "2 active"],
          ["Messages", "6 unread"],
        ].map(([title, value]) => (
          <article className="product-card metric-card" key={title}><span>{title}</span><strong>{value}</strong></article>
        ))}
      </section>
      <section className="mobile-dashboard-actions">
        <a className="btn primary" href="/matches/request">Create Challenge</a>
        <a className="btn secondary" href="/matches">Find Match</a>
      </section>
      <section className="product-card">
        <h2>Challenge journey</h2>
        <p>Create challenge, accept or counter terms, approve agreement, check in, submit evidence, confirm result, then update ranking.</p>
      </section>
      <section className="page-section two-column">
        <div className="stack">
          <h2>Upcoming and recent matches</h2>
          {matches.map((match) => <MatchRow match={match} key={match.id} />)}
        </div>
        <div className="stack">
          <h2>Recommended for you</h2>
          <ClanCard clan={clans[0]} />
          <TournamentCard tournament={tournaments[0]} />
          <ClipCard clip={clips[0]} />
        </div>
      </section>
    </AppShell>
  );
}
