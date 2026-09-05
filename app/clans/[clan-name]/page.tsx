import { AppShell, MatchRow, PageHero } from "../../components";
import { coreClans, coreMatches } from "../../competitive-core";
import { clans, matches } from "../../data";

export function generateStaticParams() {
  return coreClans.map((clan) => ({ "clan-name": clan.slug }));
}

export default async function DynamicClanPage({ params }: { params: Promise<{ "clan-name": string }> }) {
  const { "clan-name": slug } = await params;
  const clan = coreClans.find((item) => item.slug === slug);
  const publicClan = clans.find((item) => item.slug === slug);
  if (!clan || !publicClan) {
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
        eyebrow="Clan HQ 2.0"
        title={clan.name}
        copy={`${clan.game} organisation from ${clan.region}. ${clan.status}. Record ${clan.record}, ${clan.members} members, #${clan.ranking} ranking.`}
        primary={["Request to join", "/find-clans"]}
        secondary={["Challenge clan", "/matches/request"]}
      />
      <section className="clan-hq-cover">
        <span className="crest">{clan.logo}</span>
        <div>
          <small>{clan.country} / founded {clan.founded} / {clan.banner}</small>
          <h2>{clan.tag} Command Headquarters</h2>
          <p>Overview, roster, academy, recruitment, applications, announcements, statistics, rankings, media and management are arranged as one clan operations surface.</p>
        </div>
        <strong>{clan.winRate}% WR</strong>
      </section>
      <nav className="core-tabs" aria-label="Clan HQ tabs">
        {["Overview", "Roster", "Academy", "Matches", "Tournaments", "Achievements", "Recruitment", "Applications", "Announcements", "Statistics", "Rankings", "Media", "Management"].map((tab) => <a href={`#${tab.toLowerCase()}`} key={tab}>{tab}</a>)}
      </nav>
      <section className="core-command-strip" id="overview">
        <article className="product-card"><small>Members</small><strong>{clan.members}</strong><p>Roster plus academy pipeline.</p></article>
        <article className="product-card"><small>Record</small><strong>{clan.record}</strong><p>{clan.trophies} trophies across events.</p></article>
        <article className="product-card"><small>Ranking</small><strong>#{clan.ranking}</strong><p>{clan.game} clan ladder.</p></article>
        <article className="product-card"><small>Recruitment</small><strong>{clan.status}</strong><p>Applications require manager review.</p></article>
      </section>
      <section className="clan-hq-grid">
        <article className="product-card" id="roster">
          <h2>Roster roles</h2>
          {clan.roles.map((member) => <p key={member.name}><b>{member.role}</b> / {member.name}</p>)}
        </article>
        <article className="product-card" id="academy"><h2>Academy</h2><p>Academy players can be tracked separately from starting roster members as the clan grows.</p><button className="btn secondary small" type="button" disabled title="Requires owner or manager permissions">Invite academy player</button></article>
        <article className="product-card" id="recruitment"><h2>Recruitment</h2><p>{clan.status}. Trial invitations and clan offers stay locked until a verified manager is signed in.</p><a className="btn ghost small" href="/scout">Open AGA Scout</a></article>
        <article className="product-card" id="applications"><h2>Applications</h2><p>2 demo applications ready for review. Approve/reject actions require role-based permissions.</p><button className="btn secondary small" type="button" disabled title="Manager role required">Approve application</button></article>
        <article className="product-card" id="announcements"><h2>Announcements</h2><p>Scrim block posted for Friday. Announcement publishing will write to normalized clan records.</p><button className="btn secondary small" type="button" disabled title="Manager role required">Post announcement</button></article>
        <article className="product-card" id="management"><h2>Management</h2><p>Invite player, remove player, change role, promote/demote and recruitment toggles are permission-gated.</p></article>
      </section>
      <section className="stack">
        {coreMatches.filter((match) => match.teamA === clan.name || match.teamB === clan.name).map((match) => <MatchRow match={matches.find((row) => row.id === match.id)} key={match.id} />)}
      </section>
    </AppShell>
  );
}
