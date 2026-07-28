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
        <article className="product-card clan-war-banner">
          <h2>Recruitment</h2>
          <p>Open roles: entry fragger, support, IGL, sniper, content creator. Applications require mic, Discord and recent gameplay evidence.</p>
          <div className="achievement-rack"><span>Clan Champion</span><span>12 trophies</span><span>Recruiting</span><span>EU prime time</span></div>
        </article>
        <div className="stack">
          <h2>Recent wars</h2>
          {matches.map((match) => <MatchRow match={match} key={match.id} />)}
        </div>
      </section>
      <section className="card-grid four roster-grid">
        {["Venom / Leader / IGL", "Shadow / Officer / Sniper", "Blaze / Entry / SMG", "Frost / Support / AR"].map((member) => (
          <article className="product-card" key={member}><span className="avatar-ring">{member.slice(0, 2)}</span><h3>{member}</h3><p>Ready for clan wars and tournament check-in.</p></article>
        ))}
      </section>
    </AppShell>
  );
}
