import { AppShell, MatchRow, PageHero } from "../../components";
import { matches } from "../../data";

export default function ClanProfilePage() {
  return (
    <AppShell>
      <PageHero
        eyebrow="Clan profile"
        title="Xclusive"
        copy="A verified CODM clan from Europe. Motto: We do not play for K/D. We play for legacy."
        primary={["Request to join", "/find-clans"]}
        secondary={["Challenge clan", "/matches/request"]}
      />
      <section className="card-grid four">
        <article className="product-card metric-card"><span>Win rate</span><strong>78%</strong></article>
        <article className="product-card metric-card"><span>Matches</span><strong>245</strong></article>
        <article className="product-card metric-card"><span>Tournaments</span><strong>12</strong></article>
        <article className="product-card metric-card"><span>Members</span><strong>28/30</strong></article>
      </section>
      <section className="page-section two-column">
        <article className="product-card">
          <h2>Recruitment</h2>
          <p>Open roles: entry fragger, support, IGL, sniper, content creator. Applications require mic, Discord and recent gameplay evidence.</p>
        </article>
        <div className="stack">
          <h2>Recent matches</h2>
          {matches.map((match) => <MatchRow match={match} key={match.id} />)}
        </div>
      </section>
    </AppShell>
  );
}
