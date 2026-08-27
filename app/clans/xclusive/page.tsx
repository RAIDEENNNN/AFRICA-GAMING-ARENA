import { AppShell, PageHero } from "../../components";

export default function ClanProfilePage() {
  return (
    <AppShell>
      <PageHero
        eyebrow="Clan profile"
        title="Clan not available"
        copy="No verified clan record exists for this legacy preview URL."
        primary={["Find clans", "/find-clans"]}
        secondary={["Create clan", "/clans/create"]}
      />
      <section className="card-grid four">
        <article className="product-card metric-card"><span>Win rate</span><strong>0%</strong></article>
        <article className="product-card metric-card"><span>Matches</span><strong>0</strong></article>
        <article className="product-card metric-card"><span>Tournaments</span><strong>0</strong></article>
        <article className="product-card metric-card"><span>Members</span><strong>0</strong></article>
      </section>
      <section className="page-section two-column">
        <article className="product-card clan-war-banner">
          <h2>No public roster</h2>
          <p>Verified clan profiles will show owner, roster, recruitment status, match history and tournament results after clan persistence is connected.</p>
          <div className="achievement-rack"><span>No trophies</span><span>No roster</span><span>No recruitment record</span><span>No region set</span></div>
        </article>
        <div className="stack">
          <h2>Recent wars</h2>
          <article className="product-card"><p>No verified clan matches yet.</p></article>
        </div>
      </section>
    </AppShell>
  );
}
