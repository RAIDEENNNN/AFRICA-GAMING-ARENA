"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import type { PlayerSummary } from "./player-summary";

const guestSummary: PlayerSummary = {
  user: null,
  stats: { game: "codm", matchesPlayed: 0, wins: 0, losses: 0, draws: 0, rating: 1000, xp: 0, level: 1, winStreak: 0, bestWinStreak: 0 },
  clan: null,
  notifications: { unread: 0, total: 0 },
  activity: { openChallenges: 0, acceptedMatches: 0, agreementMatches: 0, checkInMatches: 0, resultPending: 0, completedMatches: 0 },
};

export function usePlayerSummary() {
  const [summary, setSummary] = useState<PlayerSummary>(guestSummary);

  async function refresh() {
    const response = await fetch("/api/player/summary", { cache: "no-store" });
    const body = await response.json() as { summary?: PlayerSummary };
    if (body.summary) setSummary(body.summary);
  }

  useEffect(() => {
    refresh();
    const timer = window.setInterval(refresh, 10000);
    return () => window.clearInterval(timer);
  }, []);

  return { summary, refresh };
}

export function ShellPlayerPanel() {
  const { summary } = usePlayerSummary();
  const user = summary.user;
  const initials = initialsFor(user?.displayName ?? user?.username ?? "AGA");
  const xpProgress = Math.min(100, Math.round((summary.stats.xp % 1000) / 10));

  if (!user) {
    return (
      <section className="side-profile">
        <span className="avatar-ring">AG</span>
        <b>Guest player</b>
        <small>Log in to sync stats, matches and notifications.</small>
        <div><Link href="/login">Login</Link><Link href="/register">Register</Link></div>
      </section>
    );
  }

  return (
    <section className="side-profile">
      <span className="avatar-ring">{initials}</span>
      <b>{user.displayName}</b>
      <small>@{user.username} / {summary.clan?.tag ?? "NO CLAN"} / {summary.stats.game.toUpperCase()}</small>
      <div><span>LVL {summary.stats.level}</span><span>{summary.stats.rating} rating</span></div>
      <progress value={xpProgress} max={100} aria-label="XP progress" />
    </section>
  );
}

export function TopbarPlayerLinks() {
  const { summary } = usePlayerSummary();
  const user = summary.user;
  if (!user) {
    return (
      <>
        <Link href="/login">Login</Link>
        <Link href="/register">Register</Link>
      </>
    );
  }
  return (
    <>
      <Link href="/matches">{summary.activity.acceptedMatches + summary.activity.agreementMatches + summary.activity.checkInMatches} active</Link>
      <Link href="/notifications">Notifications {summary.notifications.unread ? `(${summary.notifications.unread})` : ""}</Link>
      <Link href="/messages">Messages</Link>
      <Link href="/wallet">Wallet</Link>
      <Link href="/settings">Settings</Link>
      <Link href={`/profile/${user.username}`}>{user.username}</Link>
    </>
  );
}

export function PlayerDashboardPanel() {
  const { summary } = usePlayerSummary();
  const user = summary.user;
  const winRate = summary.stats.matchesPlayed ? Math.round((summary.stats.wins / summary.stats.matchesPlayed) * 100) : 0;
  const active = summary.activity.acceptedMatches + summary.activity.agreementMatches + summary.activity.checkInMatches + summary.activity.resultPending;

  if (!user) {
    return (
      <section className="command-deck">
        <article className="product-card empty-arena-state">
          <span className="tag">Player identity</span>
          <h2>Log in to activate your competitive dashboard.</h2>
          <p>Your stats, challenges, notifications and match history appear here after you enter AGA.</p>
          <div className="button-row"><Link className="btn primary small" href="/login">Login</Link><Link className="btn secondary small" href="/register">Create account</Link></div>
        </article>
      </section>
    );
  }

  return (
    <>
      <section className="command-deck">
        <div className="player-command-banner">
          <div>
            <span className="avatar-ring">{initialsFor(user.displayName)}</span>
            <div>
              <small>@{user.username} / {summary.clan?.tag ?? "NO CLAN"} / {summary.stats.game.toUpperCase()}</small>
              <h2>{user.displayName}</h2>
              <p>Level {summary.stats.level}. {summary.stats.rating} rating. {summary.activity.openChallenges} open challenges and {active} active match stages.</p>
            </div>
          </div>
          <div className="command-stats">
            <span><strong>{winRate}%</strong>Win rate</span>
            <span><strong>{summary.stats.xp}</strong>XP</span>
            <span><strong>{summary.stats.winStreak}</strong>Streak</span>
          </div>
        </div>
        <article className="active-battle-card">
          <span className="tag live">Current activity</span>
          <h2>{active ? `${active} active match stages` : "No active match"}</h2>
          <p>{summary.activity.agreementMatches} agreement / {summary.activity.checkInMatches} check-in / {summary.activity.resultPending} result pending</p>
          <strong>{summary.activity.openChallenges} open challenges created by you</strong>
          <Link className="btn primary small" href={active ? "/matches" : "/matches/request"}>{active ? "Open matches" : "Create challenge"}</Link>
        </article>
      </section>
      <section className="card-grid four dashboard-metrics">
        {[
          ["Rating", summary.stats.rating],
          ["Wins", summary.stats.wins],
          ["Losses", summary.stats.losses],
          ["Completed", summary.activity.completedMatches],
        ].map(([label, value]) => <article className="product-card metric-card" key={label}><span>{label}</span><strong>{value}</strong></article>)}
      </section>
    </>
  );
}

export function PlayerProfilePanel() {
  const { summary } = usePlayerSummary();
  const user = summary.user;
  const winRate = summary.stats.matchesPlayed ? Math.round((summary.stats.wins / summary.stats.matchesPlayed) * 100) : 0;
  if (!user) {
    return <article className="product-card empty-arena-state"><h2>No player profile loaded.</h2><p>Log in to show your real AGA identity and stats.</p><Link className="btn primary small" href="/login">Login</Link></article>;
  }
  return (
    <section className="page-section profile-arena">
      <section className="profile-cover">
        <span className="avatar-ring">{initialsFor(user.displayName)}</span>
        <div><h2>{user.displayName}</h2><p>@{user.username} / {user.country || "Country unset"} / {summary.clan?.tag ?? "No clan"} / {summary.stats.game.toUpperCase()}</p></div>
        <strong>{summary.stats.rating}</strong>
      </section>
      <section className="card-grid four">
        {[
          ["Matches", summary.stats.matchesPlayed],
          ["Wins", summary.stats.wins],
          ["Losses", summary.stats.losses],
          ["Win rate", `${winRate}%`],
          ["Level", summary.stats.level],
          ["XP", summary.stats.xp],
          ["Current streak", summary.stats.winStreak],
          ["Best streak", summary.stats.bestWinStreak],
        ].map(([label, value]) => <article className="product-card metric-card" key={label}><span>{label}</span><strong>{value}</strong></article>)}
      </section>
      <section className="card-grid three">
        <article className="product-card"><h2>Primary game</h2><p>{summary.stats.game.toUpperCase()}</p></article>
        <article className="product-card"><h2>Current clan</h2><p>{summary.clan ? `${summary.clan.name} [${summary.clan.tag}]` : "No clan joined yet."}</p></article>
        <article className="product-card"><h2>Achievements</h2><p>Achievements are not active yet. Badges will appear here after the achievement system ships.</p></article>
      </section>
    </section>
  );
}

export function LeaderboardPanel() {
  const [rows, setRows] = useState<Array<Record<string, string | number | null>>>([]);

  useEffect(() => {
    fetch("/api/player/leaderboard", { cache: "no-store" })
      .then((response) => response.json())
      .then((body) => setRows(body.leaderboard ?? []))
      .catch(() => setRows([]));
  }, []);

  if (!rows.length) {
    return <article className="product-card empty-arena-state"><h2>No ranked players yet.</h2><p>Complete verified matches to create the first real leaderboard rows.</p><Link className="btn primary small" href="/matches/request">Create challenge</Link></article>;
  }

  return (
    <section className="leaderboard-page podium-board">
      <div className="chip-row">{["All Time", "Weekly", "Monthly", "CODM", "PUBG Mobile", "Free Fire"].map((item) => <span key={item}>{item}</span>)}</div>
      {rows.map((row, index) => {
        const matches = Number(row.matches_played ?? 0);
        const wins = Number(row.wins ?? 0);
        const losses = Number(row.losses ?? 0);
        const winRate = matches ? Math.round((wins / matches) * 100) : 0;
        return (
          <article className={`leaderboard-row mobile-card-row podium-${index + 1}`} key={String(row.username)}>
            <span>#{index + 1}</span>
            <strong>{String(row.display_name ?? row.username)}</strong>
            <small>@{String(row.username)} / {String(row.game ?? "game")} / {String(row.country ?? "region unset")}</small>
            <b>{wins}W {losses}L / {winRate}%</b>
            <em>{String(row.rating ?? 1000)}</em>
          </article>
        );
      })}
    </section>
  );
}

export function NotificationsPanel() {
  const [items, setItems] = useState<Array<Record<string, string | null>>>([]);
  const [loggedOut, setLoggedOut] = useState(false);

  async function refresh() {
    const response = await fetch("/api/notifications", { cache: "no-store" });
    const body = await response.json();
    if (response.status === 401) {
      setLoggedOut(true);
      return;
    }
    setLoggedOut(false);
    setItems(body.notifications ?? []);
  }

  useEffect(() => {
    refresh();
  }, []);

  async function markAll() {
    await fetch("/api/notifications/read-all", { method: "POST" });
    await refresh();
  }

  async function markOne(id: string) {
    await fetch(`/api/notifications/${id}/read`, { method: "POST" });
    await refresh();
  }

  if (loggedOut) {
    return <article className="product-card empty-arena-state"><h2>Login required.</h2><p>Your match requests, clan invites and result alerts appear here after login.</p><Link className="btn primary small" href="/login">Login</Link></article>;
  }

  return (
    <section className="stack">
      <div className="button-row"><button className="btn secondary small" onClick={markAll} disabled={!items.length}>Mark all read</button></div>
      {items.length ? items.map((item) => (
        <article className={`product-card notification-card ${item.read_at ? "read" : "unread"}`} key={String(item.id)}>
          <span className="tag">{item.read_at ? "READ" : "UNREAD"}</span>
          <h2>{item.title ?? item.type ?? "AGA notification"}</h2>
          <p>{item.message ?? item.body}</p>
          <div className="button-row">
            {item.link ? <Link className="btn ghost small" href={item.link}>Open</Link> : null}
            {!item.read_at ? <button className="btn secondary small" onClick={() => markOne(String(item.id))}>Mark read</button> : null}
          </div>
        </article>
      )) : <article className="product-card empty-arena-state"><h2>No notifications yet.</h2><p>Challenge accepts, check-ins, results and clan invites will appear here.</p><Link className="btn primary small" href="/matches">Find match</Link></article>}
    </section>
  );
}

function initialsFor(name: string) {
  return name.split(/[\s_]+/).filter(Boolean).slice(0, 2).map((part) => part[0]?.toUpperCase()).join("") || "AG";
}
