import { AppShell, ClanCard, PageHero } from "../components";
import { clans } from "../data";

export default function FindClansPage() {
  return (
    <AppShell>
      <PageHero eyebrow="Find clans" title="Search clans by game, region and recruitment status." copy="Filter competitive teams without mixing the search experience into the homepage." />
      <section className="filter-bar">
        <input className="field" placeholder="Search clans..." />
        <select className="field"><option>All games</option><option>CODM</option><option>PUBG</option></select>
        <select className="field"><option>All regions</option><option>Europe</option><option>Global</option></select>
        <select className="field"><option>Recruiting</option><option>Verified only</option></select>
      </section>
      <section className="card-grid two">
        {clans.map((clan) => <ClanCard clan={clan} key={clan.name} />)}
      </section>
    </AppShell>
  );
}
