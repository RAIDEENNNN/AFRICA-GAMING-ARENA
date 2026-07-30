"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

const slides = [
  {
    key: "codm",
    kicker: "Call of Duty: Mobile",
    title: ["PLAY. COMPETE.", "DOMINATE.", "BECOME LEGENDARY."],
    copy: "The ultimate gaming arena for African players. Compete in tournaments, join clans, win rewards and build your legacy.",
    image: "/images/aga/hero/codm-hero",
    primary: ["Enter CODM Arena", "/games/codm"],
    secondary: ["View CMA Tournaments", "/tournaments/cma"],
    tone: "gold",
  },
  {
    key: "pubg",
    kicker: "PUBG Mobile",
    title: ["SURVIVE.", "SQUAD UP.", "OWN THE ZONE."],
    copy: "Squad battles, arena challenges, clan matches and esports competition built for mobile battleground players.",
    image: "/images/aga/hero/pubg-mobile-hero",
    primary: ["Enter PUBG Arena", "/games/pubg-mobile"],
    secondary: ["Browse PUBG Matches", "/matches"],
    tone: "cyan",
  },
  {
    key: "free-fire",
    kicker: "Free Fire",
    title: ["FAST FIGHTS.", "GUILD WARS.", "LIVE GLORY."],
    copy: "High-energy custom-room battles, guild competition, clips and live challenges for fast mobile competitors.",
    image: "/images/aga/hero/free-fire-hero",
    primary: ["Enter Free Fire Arena", "/games/free-fire"],
    secondary: ["Browse Free Fire Matches", "/matches"],
    tone: "magenta",
  },
];

const nav = ["Home", "Games", "Tournaments", "Clans", "Leaderboards", "Marketplace", "Clips", "News", "More"];
const sideNav = [
  ["Home", "/", "⌂"],
  ["Find Match", "/matches", "⌕"],
  ["Create Match", "/matches/request", "✦"],
  ["Clans", "/clans", "♜"],
  ["Tournaments", "/tournaments", "♕"],
  ["Leaderboards", "/leaderboards", "▥"],
  ["Clips", "/clips", "▶"],
  ["Marketplace", "/marketplace", "▤"],
  ["Wallet", "/wallet", "▣"],
  ["Messages", "/messages", "✉"],
  ["More", "/rank-system", "•••"],
];

const portals = [
  {
    name: "Call of Duty Mobile",
    href: "/games/codm",
    image: "/images/aga/portals/codm-portal",
    modes: ["1v1", "2v2", "3v3", "5v5", "Clan War"],
    tone: "codm",
    extra: ["CMA Tournaments", "/tournaments/cma"],
  },
  {
    name: "PUBG Mobile",
    href: "/games/pubg-mobile",
    image: "/images/aga/portals/pubg-mobile-portal",
    modes: ["Solo", "Duo", "Squad", "TDM", "Arena"],
    tone: "pubg",
  },
  {
    name: "Free Fire",
    href: "/games/free-fire",
    image: "/images/aga/portals/free-fire-portal",
    modes: ["Solo", "Duo", "Squad", "Clash Squad"],
    tone: "freefire",
  },
];

const homepageStats = [
  ["0", "Active players"],
  ["0", "Live matches"],
  ["0", "Open challenges"],
  ["0", "Registered clans"],
  ["0", "Upcoming tournaments"],
  ["$0", "Prize pool awarded"],
];

export function AGAHome() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [guest, setGuest] = useState(true);
  const [readyState, setReadyState] = useState<"loading" | "ready" | "error">("loading");
  const slide = slides[active];
  const next = () => setActive((index) => (index + 1) % slides.length);
  const prev = () => setActive((index) => (index + slides.length - 1) % slides.length);
  const stats = useMemo(() => homepageStats, []);

  useEffect(() => {
    if (paused) return;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;
    const timer = window.setInterval(next, 7000);
    return () => window.clearInterval(timer);
  }, [paused]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setGuest(params.get("player") !== "1");
    const timeout = window.setTimeout(() => {
      setReadyState(params.get("connection") === "error" ? "error" : "ready");
    }, 250);
    const fallback = window.setTimeout(() => setReadyState((state) => state === "loading" ? "error" : state), 4000);
    return () => {
      window.clearTimeout(timeout);
      window.clearTimeout(fallback);
    };
  }, []);

  if (readyState !== "ready") {
    return <LaunchScreen state={readyState} />;
  }

  return (
    <main className="aga-home">
      <header className="aga-top-nav">
        <Link className="aga-logo" href="/" aria-label="Africa Gaming Arena home">
          <img src="/brand/aga-logo.svg" alt="AGA Africa Gaming Arena" width={210} height={60} />
        </Link>
        <nav aria-label="AGA navigation">
          {nav.map((item) => {
            const href = item === "Home" ? "/" : item === "Games" ? "/games" : item === "Tournaments" ? "/tournaments" : item === "Clans" ? "/clans" : item === "Leaderboards" ? "/leaderboards" : item === "Marketplace" ? "/marketplace" : item === "Clips" ? "/clips" : item === "News" ? "/news" : "/rank-system";
            return item === "Tournaments" ? (
              <details className="aga-nav-menu" key={item}>
                <summary>Tournaments</summary>
                <div><Link href="/tournaments">All Tournaments</Link><Link href="/tournaments/cma">CMA Tournaments</Link></div>
              </details>
            ) : item === "More" ? (
              <details className="aga-nav-menu" key={item}>
                <summary>More</summary>
                <div><Link href="/rank-system">Rank System</Link><Link href="/faq">FAQ</Link><Link href="/support">Support</Link><Link href="/rules">Rules</Link><Link href="/about">About</Link><Link href="/contact">Contact</Link></div>
              </details>
            ) : <Link className={item === "Home" ? "active" : ""} href={href} key={item}>{item}</Link>;
          })}
        </nav>
        <div className="aga-actions">
          <Link href="/find-clans" aria-label="Search">⌕</Link>
          <Link href="/notifications" aria-label="Notifications">♕</Link>
          <Link className="login" href="/login">Log In</Link>
          <Link className="register" href="/register">Register</Link>
        </div>
        <details className="aga-mobile-menu">
          <summary>Menu</summary>
          <div>
            <Link href="/games">Games</Link><Link href="/tournaments">Tournaments</Link><Link href="/tournaments/cma">CMA Tournaments</Link>
            <Link href="/matches">Find Match</Link><Link href="/leaderboards">Leaderboards</Link><Link href="/news">News</Link><Link href="/matches/request">Create Match</Link><Link href="/login">Log In</Link><Link href="/register">Register</Link>
          </div>
        </details>
      </header>

      <aside className="aga-sidebar" aria-label="AGA sidebar">
        {sideNav.map(([label, href, icon]) => <Link className={label === "Home" ? "active" : ""} href={href} key={label}><span>{icon}</span>{label}</Link>)}
      </aside>

      <section className={`aga-hero aga-${slide.tone}`} onPointerEnter={() => setPaused(true)} onPointerLeave={() => setPaused(false)} onPointerDown={() => setPaused(true)}>
        <ResponsiveArt className="aga-hero-art" base={slide.image} alt={`${slide.kicker} tactical arena artwork`} priority={active === 0} />
        <div className="aga-loading-sheen" aria-hidden="true" />
        <div className="aga-hero-copy">
          <span>{slide.kicker}</span>
          <h1>{slide.title.map((line, index) => <b className={index === 1 ? "gold" : ""} key={line}>{line}</b>)}</h1>
          <p>{slide.copy}</p>
          <div className="aga-hero-buttons">
            <Link className="aga-btn primary" href={slide.primary[1]}>{slide.primary[0]}</Link>
            <Link className="aga-btn dark" href={slide.secondary[1]}>{slide.secondary[0]}</Link>
            <button className="aga-trailer" type="button" aria-label="Watch trailer"><i>▶</i><span>Watch Trailer</span></button>
          </div>
          <div className="aga-stats">{stats.map(([value, label]) => <article key={label}><strong>{value}</strong><small>{label}</small></article>)}</div>
        </div>
        <div className="aga-carousel-controls">
          <button type="button" onClick={prev} aria-label="Previous slide">‹</button>
          {slides.map((item, index) => <button className={index === active ? "active" : ""} type="button" onClick={() => setActive(index)} aria-label={`Show ${item.kicker}`} key={item.key} />)}
          <button type="button" onClick={next} aria-label="Next slide">›</button>
        </div>
      </section>

      <aside className="aga-player-panel">
        {guest ? <JoinPanel /> : <PlayerPanel />}
      </aside>

      <section className="aga-game-portals" aria-label="Game portals">
        {portals.map((portal) => (
          <article className={`aga-portal ${portal.tone}`} key={portal.name}>
            <ResponsiveArt className="aga-portal-art" base={portal.image} alt={`${portal.name} arena artwork`} />
            <div>
              <h2>{portal.name}</h2>
              <nav>{portal.modes.map((mode) => <span key={mode}>{mode}</span>)}</nav>
              <strong>0</strong><small>Players online</small>
              <Link className="aga-btn primary" href={portal.href}>Enter Arena</Link>
              {portal.extra ? <Link className="aga-link" href={portal.extra[1]}>{portal.extra[0]}</Link> : null}
            </div>
          </article>
        ))}
      </section>

      <section className="aga-cma-feature">
        <ResponsiveArt className="aga-cma-bg" base="/images/cma/cma-hero" alt="CMA Call of Duty Mobile tournament stage artwork" />
        <div className="aga-cma-copy">
          <span>CMA</span>
          <p>Official CODM Tournament Partner</p>
          <h2>CMA tournament registration will appear here when events open.</h2>
          <div className="aga-cma-actions">
            <Link className="aga-btn primary" href="/tournaments/cma">View CMA Tournaments</Link>
            <Link className="aga-btn dark" href="/tournaments/cma/register">Register Now</Link>
          </div>
        </div>
        <div className="aga-cma-cards">
          <article><small>Next MP tournament</small><h3>No tournament open</h3><p><b>0</b> registered teams</p><em>CMA registration will open after organiser setup.</em></article>
          <article><small>Next BR tournament</small><h3>No tournament open</h3><p><b>0</b> registered players</p><em>Check the schedule or create an AGA profile to get notified.</em></article>
        </div>
      </section>

      <section className="aga-content-rail">
        <EmptyFeature title="Featured Tournaments" copy="No tournaments are currently open." href="/tournaments/cma" action="View CMA hub" />
        <EmptyFeature title="Top Clans" copy="No clans have entered the rankings yet." href="/clans/create" action="Create clan" />
        <EmptyFeature title="Trending Clips" copy="No clips have been uploaded yet." href="/clips/upload" action="Upload clip" />
        <EmptyFeature title="Recent Winners" copy="No tournament winners yet." href="/register" action="Join AGA" />
      </section>

      <section className="aga-bottom-grid">
        <div className="aga-live">
          <header><h2>Live Now</h2><nav><Link href="/tournaments/cma">CMA Tournaments</Link><Link href="/matches">View All</Link></nav></header>
          <EmptyState title="No live matches yet" copy="The arena is waiting for its first competitors. Create the first challenge and it will appear here." href="/matches/request" action="Create Match" />
        </div>
        <aside className="aga-top-players">
          <header><h2>Top Players</h2><Link href="/leaderboards">View All</Link></header>
          <EmptyState title="Be the first player featured" copy="Verified rankings will appear after real matches are completed." href="/matches/request" action="Start ranking" compact />
        </aside>
      </section>

      <nav className="aga-mobile-bottom" aria-label="Mobile navigation">
        <Link href="/">Home</Link><Link href="/matches">Find Match</Link><Link href="/matches/request">Create</Link><Link href="/tournaments">Tournaments</Link><Link href="/profile">Profile</Link>
      </nav>
    </main>
  );
}

function PlayerPanel() {
  return (
    <section className="aga-join-panel">
      <h2>Profile data unavailable</h2>
      <p>Real Supabase authentication is not connected yet. Once a real session exists, this panel will show the signed-in player’s profile, clan, matches, notifications and demo wallet ledger.</p>
      <small>Demo balance — no real money</small>
      <Link className="aga-btn primary" href="/login">Log In</Link>
      <Link className="aga-btn dark" href="/register">Create Account</Link>
    </section>
  );
}

function JoinPanel() {
  return (
    <section className="aga-join-panel">
      <h2>Join AGA</h2>
      <p>Create one profile for clans, tournaments, challenges, clips and demo wallet tracking.</p>
      <Link className="aga-btn primary" href="/register">Create Account</Link>
      <Link className="aga-btn dark" href="/login">Login</Link>
    </section>
  );
}

function LaunchScreen({ state }: { state: "loading" | "error" }) {
  return (
    <main className="aga-launch-screen" aria-live="polite">
      <img src="/brand/aga-logo.svg" alt="Africa Gaming Arena" width={220} height={64} />
      <div className="aga-launch-ring" aria-hidden="true" />
      <h1>{state === "loading" ? "Entering the Arena" : "Connection error"}</h1>
      <p>{state === "loading" ? "Checking session, player profile and platform data." : "The arena could not finish initialization. Retry when the connection is ready."}</p>
      {state === "error" ? <button type="button" onClick={() => window.location.assign("/")}>Retry</button> : null}
    </main>
  );
}

function ResponsiveArt({ base, alt, className, priority = false }: { base: string; alt: string; className: string; priority?: boolean }) {
  return (
    <picture className={className}>
      <source media="(max-width: 640px)" srcSet={`${base}-mobile.avif`} type="image/avif" />
      <source media="(max-width: 1024px)" srcSet={`${base}-tablet.avif`} type="image/avif" />
      <source srcSet={`${base}-desktop.avif`} type="image/avif" />
      <source media="(max-width: 640px)" srcSet={`${base}-mobile.webp`} type="image/webp" />
      <source media="(max-width: 1024px)" srcSet={`${base}-tablet.webp`} type="image/webp" />
      <img src={`${base}-desktop.webp`} alt={alt} loading={priority ? "eager" : "lazy"} decoding="async" />
    </picture>
  );
}

function EmptyFeature({ title, copy, href, action }: { title: string; copy: string; href: string; action: string }) {
  return (
    <section className="aga-feature-list">
      <header><h2>{title}</h2><Link href={href}>{action}</Link></header>
      <div className="aga-empty-card"><b>{copy}</b><span>Real records from the production backend will appear here.</span></div>
    </section>
  );
}

function EmptyState({ title, copy, href, action, compact = false }: { title: string; copy: string; href: string; action: string; compact?: boolean }) {
  return (
    <article className={compact ? "aga-empty-state compact" : "aga-empty-state"}>
      <h3>{title}</h3>
      <p>{copy}</p>
      <Link className="aga-btn primary" href={href}>{action}</Link>
    </article>
  );
}
