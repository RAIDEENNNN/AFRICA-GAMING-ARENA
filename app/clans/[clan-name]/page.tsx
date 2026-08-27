import { AppShell, MatchRow, PageHero } from "../../components";
import { clans, matches } from "../../data";

export function generateStaticParams() {
  return clans.map((clan) => ({ "clan-name": clan.slug }));
}

export default async function DynamicClanPage({ params }: { params: Promise<{ "clan-name": string }> }) {
  const { "clan-name": slug } = await params;
  const clan = clans.find((item) => item.slug === slug);
  if (!clan) {
    return (
      <AppShell>
        <PageHero
          eyebrow="Clan profile"
          title="Clan not available"
          copy={`No verified clan record exists for “${slug}”.`}
          primary={["Find clans", "/find-clans"]}
          secondary={["Create clan", "/clans/create"]}
        />
        <section className="stack">
          <article className="product-card"><h2>No match history</h2><p>Clan match history appears only after verified clan records and completed matches exist.</p></article>
        </section>
      </AppShell>
    );
  }
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
