import Link from "next/link";
import Image from "next/image";
import { challenges, clans, clips, games, matches, tournaments } from "./data";
import { ShellPlayerPanel, SidebarNav, SidebarUtilities, SidebarWallet, TopbarPlayerLinks } from "./player-client";

export const primaryNavItems = [
  ["HOME", "/", "HM"],
  ["FIND MATCH", "/matches", "FM"],
  ["CREATE MATCH", "/matches/request", "CM"],
  ["CLANS", "/clans", "CL"],
  ["TOURNAMENTS", "/tournaments", "TR"],
  ["LEADERBOARDS", "/leaderboards", "LB"],
  ["CLIPS", "/clips", "CP"],
] as const;

export const secondaryNavItems = [
  ["MARKETPLACE", "/marketplace", "MK"],
  ["NEWS & EVENTS", "/news", "NE"],
  ["SUPPORT", "/support", "SP"],
] as const;

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <main className="product-shell">
      <header className="product-mobile-header">
        <Link className="product-mobile-brand" href="/" aria-label="Africa Gaming Arena home">
          <img src="/brand/aga-logo.svg" alt="AGA Africa Gaming Arena" width={150} height={42} />
        </Link>
        <div className="product-mobile-actions">
          <Link href="/notifications" aria-label="Notifications">♕</Link>
          <Link href="/login">Log In</Link>
          <details>
            <summary aria-label="Open menu">☰</summary>
            <nav>
              {[...primaryNavItems, ...secondaryNavItems].map(([label, href, icon]) => (
                <Link href={href} key={href}><span>{icon}</span>{label}</Link>
              ))}
              <Link href="/tournaments/cma"><span>CA</span>CMA Tournaments</Link>
              <Link href="/rank-system"><span>RS</span>Rank System</Link>
              <Link href="/faq"><span>FQ</span>FAQ</Link>
              <Link href="/rules"><span>RL</span>Rules</Link>
            </nav>
          </details>
        </div>
      </header>
      <aside className="product-sidebar">
        <Link className="brand" href="/">
          <span>AG</span>
          <strong>AGA</strong>
          <small>Africa Gaming Arena</small>
        </Link>
        <ShellPlayerPanel />
        <SidebarNav primary={primaryNavItems} secondary={secondaryNavItems} />
        <div className="sidebar-spacer" aria-hidden="true" />
        <SidebarWallet />
        <SidebarUtilities />
        <details className="mobile-create">
          <summary>Create</summary>
          <div>
            <Link href="/matches/request">Create Challenge</Link>
            <Link href="/matches/request">Create Wager Match</Link>
            <Link href="/clans/create">Create Team</Link>
            <Link href="/clans/create">Create Clan</Link>
            <Link href="/clips/upload">Upload Clip</Link>
            <Link href="/tournaments">Create Tournament</Link>
          </div>
        </details>
      </aside>
      <section className="product-main">
        <header className="product-topbar">
          <label className="search">
            <span className="sr-only">Search</span>
            <input placeholder="Search clans, players, tournaments..." />
          </label>
          <nav>
            <TopbarPlayerLinks />
          </nav>
        </header>
        {children}
      </section>
      <nav className="mobile-bottom-nav" aria-label="Mobile navigation">
        <Link href="/">Home</Link>
        <Link href="/matches">Find Match</Link>
        <details>
          <summary>Create</summary>
          <div>
            <Link href="/matches/request">Challenge</Link>
            <Link href="/clans/create">Clan</Link>
            <Link href="/clips/upload">Clip</Link>
            <Link href="/tournaments">Tournament</Link>
          </div>
        </details>
        <Link href="/tournaments">Tournaments</Link>
        <Link href="/profile">Profile</Link>
      </nav>
    </main>
  );
}

export function PageHero({
  eyebrow,
  title,
  copy,
  primary,
  secondary,
}: {
  eyebrow: string;
  title: string;
  copy: string;
  primary?: [string, string];
  secondary?: [string, string];
}) {
  return (
    <section className="page-hero">
      <div>
        <span className="eyebrow">{eyebrow}</span>
        <h1>{title}</h1>
        <p>{copy}</p>
        <div className="hero-status-rail">
          <span>Authenticated profiles</span>
          <span>D1-backed matches</span>
          <span>Demo wagers labelled</span>
        </div>
        <div className="button-row">
          {primary ? <Link className="btn primary" href={primary[1]}>{primary[0]}</Link> : null}
          {secondary ? <Link className="btn secondary" href={secondary[1]}>{secondary[0]}</Link> : null}
        </div>
      </div>
      <div className="hero-art" aria-hidden="true">
        <span />
        <b />
        <i />
      </div>
    </section>
  );
}

export function ClanCard({ clan = clans[0] }) {
  return (
    <article className="product-card clan-card">
      <span className="crest">{clan.badge}</span>
      <div>
        <h3>{clan.name}</h3>
        <p>{clan.game} / {clan.region} / {clan.members} members</p>
        <small>{clan.status} / Win rate {clan.rate}</small>
      </div>
      <Link className="btn ghost small" href={`/clans/${clan.slug}`}>View clan</Link>
    </article>
  );
}

export function TournamentCard({ tournament = tournaments[0] }) {
  return (
    <article className="product-card tournament-card">
      <span className={tournament.tag === "Live now" ? "tag live" : "tag"}>{tournament.tag}</span>
      <h3>{tournament.name}</h3>
      <p>{tournament.game} / {tournament.date}</p>
      <div className="card-meta">
        <strong>{tournament.prize}</strong>
        <span>{tournament.teams} teams</span>
      </div>
      <Link className="btn ghost small" href={`/tournaments/${tournament.slug}`}>View details</Link>
    </article>
  );
}

export function MatchRow({ match = matches[0] }) {
  return (
    <Link className="match-row" href={`/matches/${match.id}`}>
      <span>{match.left}</span>
      <strong>{match.score}</strong>
      <span>{match.right}</span>
      <em className={match.state.toLowerCase()}>{match.status}</em>
    </Link>
  );
}

export function ClipCard({ clip = clips[0] }) {
  return (
    <article className="product-card clip-product-card">
      <div className="video-thumb"><button>Preview soon</button><span>00:45</span></div>
      <h3>{clip.title}</h3>
      <p>by {clip.creator} / {clip.game}</p>
      <small>{clip.views} views / {clip.likes} likes</small>
    </article>
  );
}

export function GamePortalCard({ game = games[0] }) {
  return (
    <article className={`game-portal game-${game.theme}`}>
      <Image src={game.art} alt={`${game.name} inspired original AGA artwork`} width={1200} height={720} />
      <div>
        <span className="eyebrow">{game.short} arena</span>
        <h3>{game.name}</h3>
        <p>{game.accent}</p>
        <ul>{game.stats.map((stat) => <li key={stat}>{stat}</li>)}</ul>
        <dl className="portal-intel">
          <div><dt>Top clan</dt><dd>Real ranking pending</dd></div>
          <div><dt>Modes</dt><dd>{game.modes[0]}</dd></div>
          <div><dt>Wagers</dt><dd>Demo only</dd></div>
        </dl>
        <Link className="btn primary small" href={`/games/${game.slug}`}>View {game.short} arena</Link>
        {game.slug === "codm" ? <Link className="btn ghost small" href="/tournaments/cma">CMA Tournaments</Link> : null}
      </div>
    </article>
  );
}

export function GameConfigPanel({ game = games[0] }) {
  return (
    <section className="game-config-grid">
      <article className="product-card"><h2>Weapon classes</h2><p>{game.weapons.join(" / ")}</p></article>
      <article className="product-card"><h2>Maps</h2><p>{game.maps.join(" / ")}</p></article>
      <article className="product-card"><h2>Modes</h2><p>{game.modes.join(" / ")}</p></article>
      <article className="product-card"><h2>Marketplace</h2><p>{game.vendor} and verified vendor links only. No account selling.</p></article>
    </section>
  );
}

export function ChallengeCard({ challenge = challenges[0] }) {
  return (
    <article className="product-card challenge-card">
      <div>
        <span className="tag">{challenge.status}</span>
        <h3>{challenge.size} {challenge.weaponClass}</h3>
        <p>{challenge.challenger} / {challenge.type}</p>
      </div>
      <dl>
        <div><dt>Game</dt><dd>{challenge.game}</dd></div>
        <div><dt>Weapon</dt><dd>{challenge.weapon}</dd></div>
        <div><dt>Map</dt><dd>{challenge.map}</dd></div>
        <div><dt>Mode</dt><dd>{challenge.mode}</dd></div>
        <div><dt>Region</dt><dd>{challenge.region}</dd></div>
        <div><dt>Prize</dt><dd>{challenge.prize}</dd></div>
      </dl>
      <Link className="btn ghost small" href="/matches/request">Accept or counter soon</Link>
    </article>
  );
}

export function AgreementPanel() {
  const terms = [
    ["Game", "CODM"],
    ["Team size", "1v1"],
    ["Weapon", "DR-H / Assault Rifle"],
    ["Map", "Firing Range"],
    ["Mode", "Gunfight"],
    ["Rules", "No scorestreaks, no operator skills, screenshots required"],
    ["Region", "Europe"],
    ["Status", "Terms must be accepted by both sides"],
  ];

  return (
    <article className="product-card agreement-panel">
      <h2>Agreement panel</h2>
      <p>Important match changes are approved here, not hidden in chat.</p>
      <dl>
        {terms.map(([label, value]) => (
          <div key={label}><dt>{label}</dt><dd>{value}</dd></div>
        ))}
      </dl>
      <div className="button-row">
        <button className="btn primary small" disabled>Accept match terms</button>
        <button className="btn secondary small" disabled>Ready to play</button>
      </div>
    </article>
  );
}

export function WagerSafetyPanel() {
  return (
    <article className="product-card wager-panel">
      <span className="tag danger">Feature flag disabled</span>
      <h2>Wager controls</h2>
      <p>
        Real-money wager matches stay disabled until age checks, regional restrictions,
        payment-provider approval, legal review, escrow and dispute moderation are live.
      </p>
      <dl>
        <div><dt>Player one stake</dt><dd>$20</dd></div>
        <div><dt>Player two stake</dt><dd>$20</dd></div>
        <div><dt>Total prize pool</dt><dd>$40</dd></div>
        <div><dt>Platform fee</dt><dd>$4</dd></div>
        <div><dt>Winner payout</dt><dd>$36</dd></div>
        <div><dt>Escrow status</dt><dd>Unavailable pending approval</dd></div>
      </dl>
    </article>
  );
}

export function StatGrid() {
  return (
    <section className="stat-grid-wide">
      {[
        ["5.5K", "listed clans"],
        ["128", "tracked matches"],
        ["42", "active tournaments"],
        ["18K", "clip views"],
      ].map(([value, label]) => (
        <article key={label}>
          <strong>{value}</strong>
          <span>{label}</span>
        </article>
      ))}
    </section>
  );
}

export function FormNotice({ children }: { children: React.ReactNode }) {
  return <p className="form-notice">{children}</p>;
}
