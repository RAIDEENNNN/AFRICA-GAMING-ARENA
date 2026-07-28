import { AppShell, MatchRow, PageHero } from "../../components";
import { clans, matches } from "../../data";

export default async function DynamicClanPage({ params }: { params: Promise<{ "clan-name": string }> }) {
  const { "clan-name": slug } = await params;
  const clan = clans.find((item) => item.slug === slug) ?? clans[0];
  return (
    <AppShell>
      <PageHero
        eyebrow="Clan profile"
        title={clan.name}
        copy={`${clan.game} clan from ${clan.region}. ${clan.status}. Win rate ${clan.rate}, ${clan.members} members.`}
        primary={["Request to join", "/find-clans"]}
        secondary={["Challenge clan", "/matches/request"]}
      />
      <section className="stack">
        {matches.map((match) => <MatchRow match={match} key={match.id} />)}
      </section>
    </AppShell>
  );
}
