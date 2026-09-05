"use client";

import Link from "next/link";

type Action = {
  label: string;
  href: string;
  variant?: "primary" | "secondary";
};

type PageShellProps = {
  active: string;
  eyebrow?: string;
  title: string;
  copy: string;
  actions?: Action[];
  children: React.ReactNode;
};

const mainNav = [
  ["Home", "/"],
  ["Games", "/games"],
  ["Tournaments", "/tournaments"],
  ["Clans", "/clans"],
  ["Leaderboards", "/leaderboards"],
  ["Marketplace", "/marketplace"],
  ["Clips", "/clips"],
  ["News", "/news"],
];

const moreLinks = [
  ["Betting Arena", "/betting-arena"],
  ["Match History", "/matches"],
  ["Order History", "/orders"],
  ["Wallet", "/wallet"],
  ["Notifications", "/notifications"],
  ["Profile", "/profile"],
  ["Rank System", "/rank-system"],
  ["FAQ", "/faq"],
  ["Support", "/support"],
  ["Rules", "/rules"],
  ["About", "/about"],
  ["Contact", "/contact"],
];

export function AGAHeader({ active }: { active: string }) {
  return (
    <header className="aga-site-header">
      <Link className="aga-site-logo" href="/" aria-label="Africa Gaming Arena home">
        <img src="/brand/aga-logo.svg" alt="AGA Africa Gaming Arena" width={178} height={50} />
      </Link>
      <nav className="aga-site-nav" aria-label="Main navigation">
        {mainNav.map(([label, href]) => (
          <Link className={active === label ? "active" : ""} href={href} key={href}>
            {label}
          </Link>
        ))}
        <details className="aga-more-menu">
          <summary className={moreLinks.some(([, href]) => active === href) ? "active" : ""}>More</summary>
          <div>
            {moreLinks.map(([label, href]) => <Link href={href} key={href}>{label}</Link>)}
          </div>
        </details>
      </nav>
      <div className="aga-site-actions">
        <Link href="/search" aria-label="Search">⌕</Link>
        <Link href="/notifications" aria-label="Notifications">♕</Link>
        <Link href="/profile" aria-label="Profile">●</Link>
        <Link className="login" href="/login">Log In</Link>
        <Link className="register" href="/register">Register</Link>
      </div>
      <div className="aga-mobile-top-actions">
        <Link href="/notifications" aria-label="Notifications">♕</Link>
        <Link className="mobile-login" href="/login">Log In</Link>
        <details className="aga-mobile-native-menu">
          <summary aria-label="Open menu">☰</summary>
          <nav aria-label="Mobile menu drawer">
            {[...mainNav, ["CMA Tournaments", "/tournaments/cma"], ...moreLinks].map(([label, href]) => (
              <Link href={href} key={href}>{label}</Link>
            ))}
            <Link href="/login">Log In</Link>
            <Link href="/register">Register</Link>
          </nav>
        </details>
      </div>
    </header>
  );
}

export function AGAPageShell({ active, eyebrow, title, copy, actions = [], children }: PageShellProps) {
  return (
    <main className="aga-page">
      <AGAHeader active={active} />
      <section className="aga-page-hero">
        <div>
          {eyebrow ? <span>{eyebrow}</span> : null}
          <h1>{title}</h1>
          <p>{copy}</p>
          {actions.length ? (
            <div className="aga-page-actions">
              {actions.map((action) => (
                <Link className={`aga-page-btn ${action.variant ?? "primary"}`} href={action.href} key={action.href}>
                  {action.label}
                </Link>
              ))}
            </div>
          ) : null}
        </div>
      </section>
      {children}
      <nav className="aga-page-mobile-nav" aria-label="Mobile navigation">
        <Link href="/">Home</Link>
        <Link href="/games">Games</Link>
        <Link className="primary" href="/matches">Find Match</Link>
        <Link href="/tournaments">Tourneys</Link>
        <Link href="/profile">Profile</Link>
      </nav>
    </main>
  );
}

export function FilterTabs({ tabs }: { tabs: string[] }) {
  return (
    <nav className="aga-filter-tabs" aria-label="Page filters">
      {tabs.map((tab, index) => <button className={index === 0 ? "active" : ""} type="button" key={tab}>{tab}</button>)}
    </nav>
  );
}

export function SearchBar({ placeholder }: { placeholder: string }) {
  return (
    <label className="aga-search-bar">
      <span className="sr-only">{placeholder}</span>
      <input placeholder={placeholder} />
    </label>
  );
}

export function EmptyState({
  title,
  copy,
  action,
  href,
}: {
  title: string;
  copy: string;
  action?: string;
  href?: string;
}) {
  return (
    <article className="aga-empty-state">
      <i aria-hidden="true">◇</i>
      <h2>{title}</h2>
      <p>{copy}</p>
      {action && href ? <Link className="aga-page-btn primary" href={href}>{action}</Link> : null}
    </article>
  );
}

export function LoadingSkeleton() {
  return (
    <div className="aga-skeleton-grid" aria-label="Loading content">
      <span /><span /><span />
    </div>
  );
}

export function ErrorState() {
  return (
    <article className="aga-error-state">
      <h2>Connection failed</h2>
      <p>Live platform data could not be loaded. Check Supabase configuration and retry.</p>
      <button className="aga-page-btn secondary" type="button">Retry</button>
    </article>
  );
}

export function SupabaseNotice() {
  return (
    <section className="aga-supabase-notice">
      <strong>Live data status</strong>
      <p>Supabase environment values are not present in this local build, so public pages show real launch-zero states instead of invented activity.</p>
    </section>
  );
}

export function PagePanel({ children, title }: { children: React.ReactNode; title?: string }) {
  return (
    <section className="aga-page-panel">
      {title ? <h2>{title}</h2> : null}
      {children}
    </section>
  );
}

export function SectionHeader({ eyebrow, title, copy }: { eyebrow?: string; title: string; copy?: string }) {
  return (
    <header className="aga-section-header">
      {eyebrow ? <span>{eyebrow}</span> : null}
      <h2>{title}</h2>
      {copy ? <p>{copy}</p> : null}
    </header>
  );
}

export function StatusBadge({ children, tone = "gold" }: { children: React.ReactNode; tone?: "gold" | "purple" | "cyan" | "muted" }) {
  return <span className={`aga-status-badge ${tone}`}>{children}</span>;
}

export function StatCard({ label, value, copy }: { label: string; value: string | number; copy?: string }) {
  return (
    <article className="aga-stat-card">
      <small>{label}</small>
      <strong>{value}</strong>
      {copy ? <p>{copy}</p> : null}
    </article>
  );
}

export function DataCard({
  eyebrow,
  title,
  copy,
  href,
  action = "View",
  meta = [],
  tone = "gold",
}: {
  eyebrow?: string;
  title: string;
  copy: string;
  href?: string;
  action?: string;
  meta?: string[];
  tone?: "gold" | "purple" | "cyan" | "muted";
}) {
  return (
    <article className={`aga-data-card ${tone}`}>
      <div>
        {eyebrow ? <StatusBadge tone={tone}>{eyebrow}</StatusBadge> : null}
        <h3>{title}</h3>
        <p>{copy}</p>
      </div>
      {meta.length ? <ul>{meta.map((item) => <li key={item}>{item}</li>)}</ul> : null}
      {href ? <Link className="aga-page-btn secondary" href={href}>{action}</Link> : null}
    </article>
  );
}
