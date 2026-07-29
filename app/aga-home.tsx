"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

const slides = [
  {
    key: "codm",
    kicker: "Call of Duty: Mobile",
    title: ["PLAY. COMPETE.", "DOMINATE.", "BECOME LEGENDARY."],
    copy: "The ultimate gaming arena for African players. Compete in tournaments, join clans, win rewards and build your legacy.",
    image: "/images/aga/hero-main.webp",
    primary: ["Enter CODM Arena", "/games/codm"],
    secondary: ["View CMA Tournaments", "/tournaments/cma"],
    tone: "gold",
  },
  {
    key: "pubg",
    kicker: "PUBG Mobile",
    title: ["SURVIVE.", "SQUAD UP.", "OWN THE ZONE."],
    copy: "Squad battles, arena challenges, clan matches and esports competition built for mobile battleground players.",
    image: "/images/aga/pubg-portal.webp",
    primary: ["Enter PUBG Arena", "/games/pubg-mobile"],
    secondary: ["Browse PUBG Matches", "/matches"],
    tone: "cyan",
  },
  {
    key: "free-fire",
    kicker: "Free Fire",
    title: ["FAST FIGHTS.", "GUILD WARS.", "LIVE GLORY."],
    copy: "High-energy custom-room battles, guild competition, clips and live challenges for fast mobile competitors.",
    image: "/images/aga/free-fire-portal.webp",
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
  ["Leaderboards", "/leaderboard", "▥"],
  ["Clips", "/clips", "▶"],
  ["Marketplace", "/marketplace", "▤"],
  ["Wallet", "/wallet", "▣"],
  ["Messages", "/messages", "✉"],
  ["More", "/settings", "•••"],
];

const portals = [
  {
    name: "Call of Duty Mobile",
    href: "/games/codm",
    image: "/images/aga/codm-portal.webp",
    modes: ["1v1", "2v2", "3v3", "5v5", "Clan War"],
    players: "2,431",
    tone: "codm",
    extra: ["CMA Tournaments", "/tournaments/cma"],
  },
  {
    name: "PUBG Mobile",
    href: "/games/pubg-mobile",
    image: "/images/aga/pubg-portal.webp",
    modes: ["Solo", "Duo", "Squad", "TDM", "Arena"],
    players: "3,672",
    tone: "pubg",
  },
  {
    name: "Free Fire",
    href: "/games/free-fire",
    image: "/images/aga/free-fire-portal.webp",
    modes: ["Solo", "Duo", "Squad", "Clash Squad"],
    players: "4,298",
    tone: "freefire",
  },
];

const liveMatches = [
  ["Clan War", "5v5", "Night Hunters", "Royal Kings", "¢5,000", "13/20", "/matches/ca-1024"],
  ["Ranked 2v2", "2v2", "Alpha Force", "Omega Squad", "¢2,000", "7/16", "/matches"],
  ["Battle Royale", "Squad", "Survivors", "Warlords", "¢3,000", "9/20", "/matches"],
  ["Clash Squad", "4v4", "Death Dealers", "Last Hope", "¢1,500", "6/16", "/matches"],
];

const topPlayers = [
  ["FearlessYT", "4,982 RP", "/profile"],
  ["xGodzilla", "4,756 RP", "/profile"],
  ["NinjaX", "4,532 RP", "/profile"],
];

export function AGAHome() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [guest, setGuest] = useState(false);
  const slide = slides[active];
  const next = () => setActive((index) => (index + 1) % slides.length);
  const prev = () => setActive((index) => (index + slides.length - 1) % slides.length);
  const stats = useMemo(() => [["25,873+", "Active players"], ["1,247+", "Live matches"], ["3,458+", "Tournaments"], ["¢78M+", "Demo rewards pool"]], []);

  useEffect(() => {
    if (paused) return;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;
    const timer = window.setInterval(next, 7000);
    return () => window.clearInterval(timer);
  }, [paused]);

  useEffect(() => {
    setGuest(new URLSearchParams(window.location.search).get("guest") === "1");
  }, []);

  return (
    <main className="aga-home">
      <header className="aga-top-nav">
        <Link className="aga-logo" href="/" aria-label="Africa Gaming Arena home">
          <Image src="/brand/aga-logo.svg" alt="AGA Africa Gaming Arena" width={210} height={60} priority unoptimized />
        </Link>
        <nav aria-label="AGA navigation">
          {nav.map((item) => {
            const href = item === "Home" ? "/" : item === "Games" ? "/games" : item === "Tournaments" ? "/tournaments" : item === "Clans" ? "/clans" : item === "Leaderboards" ? "/leaderboard" : item === "Marketplace" ? "/marketplace" : item === "Clips" ? "/clips" : item === "News" ? "/notifications" : "/settings";
            return item === "Tournaments" ? (
              <details className="aga-nav-menu" key={item}>
                <summary>Tournaments</summary>
                <div><Link href="/tournaments">All Tournaments</Link><Link href="/tournaments/cma">CMA Tournaments</Link></div>
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
            <Link href="/matches">Find Match</Link><Link href="/matches/request">Create Match</Link><Link href="/login">Log In</Link><Link href="/register">Register</Link>
          </div>
        </details>
      </header>

      <aside className="aga-sidebar" aria-label="AGA sidebar">
        {sideNav.map(([label, href, icon]) => <Link className={label === "Home" ? "active" : ""} href={href} key={label}><span>{icon}</span>{label}{label === "Messages" ? <b>8</b> : null}</Link>)}
      </aside>

      <section className={`aga-hero aga-${slide.tone}`} onPointerEnter={() => setPaused(true)} onPointerLeave={() => setPaused(false)}>
        <Image className="aga-hero-art" src={slide.image} alt={`${slide.kicker} tactical arena artwork`} fill priority sizes="(max-width: 900px) 100vw, 72vw" unoptimized />
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
            <Image src={portal.image} alt={`${portal.name} arena artwork`} fill sizes="(max-width: 900px) 90vw, 30vw" unoptimized />
            <div>
              <h2>{portal.name}</h2>
              <nav>{portal.modes.map((mode) => <span key={mode}>{mode}</span>)}</nav>
              <strong>{portal.players}</strong><small>Players online</small>
              <Link className="aga-btn primary" href={portal.href}>Enter Arena</Link>
              {portal.extra ? <Link className="aga-link" href={portal.extra[1]}>{portal.extra[0]}</Link> : null}
            </div>
          </article>
        ))}
      </section>

      <section className="aga-bottom-grid">
        <div className="aga-live">
          <header><h2>Live Now</h2><nav><Link href="/tournaments/cma">CMA Tournaments</Link><Link href="/matches">View All</Link></nav></header>
          <div className="aga-live-row">
            {liveMatches.map(([type, format, teamA, teamB, prize, teams, href], index) => (
              <Link className="aga-live-card" href={href} key={`${type}-${teamA}`}>
                <span>● Live</span><em>{type}<small>{format}</small></em>
                <div><b>{teamA}</b><i>vs</i><b>{teamB}</b></div>
                <footer><strong>{prize}</strong><small>{teams} Teams</small></footer>
                <u className={`badge-${index + 1}`} />
              </Link>
            ))}
          </div>
        </div>
        <aside className="aga-top-players">
          <header><h2>Top Players</h2><Link href="/leaderboard">View All</Link></header>
          {topPlayers.map(([name, points, href], index) => <Link href={href} key={name}><span>{index + 1}</span><Image src="/images/aga/player-avatar.webp" alt="" width={36} height={36} unoptimized /><b>{name}</b><em>{points}</em></Link>)}
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
    <>
      <section className="aga-profile-head">
        <Image src="/images/aga/player-avatar.webp" alt="ShadowStriker avatar" width={74} height={74} unoptimized />
        <div><h2>ShadowStriker <span>◆</span></h2><p>Level 42</p><meter min="0" max="100" value="68">68%</meter></div>
      </section>
      <section className="aga-rank-grid">
        <Image src="/images/aga/rank-diamond.webp" alt="Diamond rank emblem" width={84} height={84} unoptimized />
        <div><small>Current Rank</small><h3>Diamond IV</h3><p>3,248 RP</p></div>
        <div><small>Win Rate</small><strong>68.4%</strong><small>K/D Ratio</small><strong>2.45</strong></div>
      </section>
      <section className="aga-wallet"><small>Demo balance — no real money</small><strong>¢24,850.00</strong><Link href="/wallet">+</Link></section>
      <section className="aga-next-match"><small>Next Match</small><h3>Ranked 2v2 Battle</h3><p>Today, 08:00 PM</p><div><b>02</b><b>34</b><b>45</b></div><Link className="aga-btn purple" href="/matches/ca-1024">View Match</Link></section>
    </>
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
