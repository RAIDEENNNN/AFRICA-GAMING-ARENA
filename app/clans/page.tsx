import { AppShell, ClanCard, PageHero } from "../components";
import { clans } from "../data";

export default function ClansPage() {
  return (
    <AppShell>
      <PageHero
        eyebrow="Clans"
        title="Create, manage and grow your team."
        copy="Clan profiles include recruitment status, members, matches, clips, achievements, rankings and challenge actions."
        primary={["Create clan", "/clans/create"]}
        secondary={["Find clans", "/find-clans"]}
      />
      <section className="card-grid two">
        {clans.map((clan) => <ClanCard clan={clan} key={clan.name} />)}
      </section>
    </AppShell>
  );
}
