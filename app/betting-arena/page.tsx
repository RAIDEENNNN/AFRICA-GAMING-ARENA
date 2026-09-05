import Link from "next/link";
import { AGAPageShell, DataCard, EmptyState, PagePanel, SectionHeader, StatCard, StatusBadge, SupabaseNotice } from "../aga-navigation";

const arenaStats = [
  ["Real-money betting", "Locked", "Disabled until age, identity, jurisdiction, payment and dispute controls are approved."],
  ["Demo wagers", "Available", "Challenge flows can display stake math without moving real money."],
  ["Escrow", "Simulated", "Funds are never collected or released in this build."],
  ["Supported games", "3", "CODM, PUBG Mobile and Free Fire all route through the same safety model."],
];

const bettingLanes = [
  {
    title: "1v1 and squad challenges",
    label: "Match betting",
    copy: "Players can create ranked or wager-style challenges, choose game rules, approve terms, check in and submit results.",
    href: "/matches/request",
    action: "Create Challenge",
    tone: "gold",
    items: ["CODM 1v1", "PUBG TDM", "Free Fire Clash Squad"],
  },
  {
    title: "Clan war stakes",
    label: "Clan betting",
    copy: "Clans can discover opponents, request battles and keep wager confirmations tied to team identity instead of loose chat promises.",
    href: "/find-clans",
    action: "Find Clan",
    tone: "purple",
    items: ["Clan search", "Match request", "Roster ownership"],
  },
  {
    title: "Tournament entry controls",
    label: "Tournament betting",
    copy: "Tournament services can prepare entry-fee and prize-pool rules while keeping actual payments disabled until compliance is live.",
    href: "/tournaments/create",
    action: "Create Tournament",
    tone: "cyan",
    items: ["Entry gates", "Prize rules", "Organizer review"],
  },
  {
    title: "Wallet and escrow status",
    label: "Wallet",
    copy: "Players can see wallet readiness, locked status and future transaction history without fake deposits or fake balances.",
    href: "/wallet",
    action: "Open Wallet",
    tone: "gold",
    items: ["£0.00 launch state", "Age gate", "Escrow disabled"],
  },
  {
    title: "Evidence and disputes",
    label: "Integrity",
    copy: "Match rooms keep approvals, chat, uploads, check-ins and submitted results together before any future payout logic can exist.",
    href: "/matches/ca-1024",
    action: "View Match Room",
    tone: "purple",
    items: ["Chat record", "Result evidence", "Dispute review"],
  },
  {
    title: "Profiles and leaderboards",
    label: "Reputation",
    copy: "Completed verified matches update player history and rankings, giving future betting decisions a real trust signal.",
    href: "/leaderboards",
    action: "View Rankings",
    tone: "cyan",
    items: ["Match history", "Player stats", "Anti-fake rankings"],
  },
  {
    title: "Marketplace protection",
    label: "Marketplace",
    copy: "Vendors, coaching and tournament services can connect to wallet safety rules without account sales or unsafe escrow offers.",
    href: "/marketplace",
    action: "Marketplace",
    tone: "gold",
    items: ["Verified vendors", "No account sales", "Support trail"],
  },
  {
    title: "Clips and proof reels",
    label: "Clips",
    copy: "Gameplay clips can support highlights, evidence review and player credibility once moderation and storage are connected.",
    href: "/clips/upload",
    action: "Upload Clip",
    tone: "purple",
    items: ["Proof clips", "Creator attribution", "Moderation first"],
  },
] as const;

const flow = [
  "Player signs in and passes account checks.",
  "Player creates a challenge with game, rules, wager display and schedule.",
  "Opponent or clan accepts, rejects or proposes a counter-offer.",
  "Private match room opens with chat, agreement approvals and check-in.",
  "Both sides submit matching results and evidence.",
  "Stats, leaderboard, profile history and future wallet ledger update from verified results.",
];

export default function BettingArenaPage() {
  return (
    <AGAPageShell
      active="/betting-arena"
      eyebrow="Betting Arena"
      title="BETTING ARENA"
      copy="One controlled hub for wager-style matches across AGA. Real-money betting, deposits, withdrawals and escrow are locked; the site only exposes safe demo flows until compliance is ready."
      actions={[{ label: "Create Wager Match", href: "/matches/request" }, { label: "Wallet Status", href: "/wallet", variant: "secondary" }]}
    >
      <SupabaseNotice />

      <section className="aga-betting-alert">
        <StatusBadge tone="gold">Compliance lock active</StatusBadge>
        <h2>No real betting is enabled.</h2>
        <p>AGA can show wager intent, agreement approvals, result verification and wallet readiness, but it must not process real money until age checks, location rules, identity review, payment-provider approval, escrow, moderation and dispute handling are production-ready.</p>
      </section>

      <section className="aga-stat-grid">
        {arenaStats.map(([label, value, copy]) => <StatCard copy={copy} key={label} label={label} value={value} />)}
      </section>

      <SectionHeader eyebrow="Functionality" title="Betting lanes across the site" copy="Every major AGA area has a safe role in the betting system, without turning on unsafe payments." />
      <section className="aga-betting-lane-grid">
        {bettingLanes.map((lane) => (
          <article className={`aga-betting-lane ${lane.tone}`} key={lane.title}>
            <StatusBadge tone={lane.tone}>{lane.label}</StatusBadge>
            <h3>{lane.title}</h3>
            <p>{lane.copy}</p>
            <ul>
              {lane.items.map((item) => <li key={item}>{item}</li>)}
            </ul>
            <Link className="aga-page-btn secondary" href={lane.href}>{lane.action}</Link>
          </article>
        ))}
      </section>

      <section className="aga-betting-command-grid">
        <PagePanel title="Verified betting flow">
          <ol className="aga-betting-flow">
            {flow.map((item, index) => <li key={item}><span>{String(index + 1).padStart(2, "0")}</span>{item}</li>)}
          </ol>
        </PagePanel>
        <PagePanel title="Locked until launch approval">
          <div className="aga-betting-lock-list">
            {["Real deposits", "Withdrawals", "Cash escrow", "Automated payouts", "Third-party odds", "Unverified account selling"].map((item) => (
              <div key={item}><StatusBadge tone="muted">Locked</StatusBadge><strong>{item}</strong></div>
            ))}
          </div>
        </PagePanel>
      </section>

      <SectionHeader eyebrow="Games" title="One policy for CODM, PUBG and Free Fire" copy="Betting controls stay consistent across game portals so mobile players do not have to learn a different safety model on every page." />
      <section className="aga-card-grid three aga-betting-game-grid">
        <DataCard action="CODM Arena" copy="Gunfight, Search and Destroy, Hardpoint and clan war wager-style challenges use the same match-room approval flow." eyebrow="CODM" href="/games/codm" meta={["1v1", "2v2", "5v5", "Clan War"]} title="Call of Duty: Mobile" tone="gold" />
        <DataCard action="PUBG Arena" copy="TDM, arena and squad matches can expose stake previews while keeping real payment collection disabled." eyebrow="PUBG" href="/games/pubg-mobile" meta={["Solo", "Duo", "Squad", "TDM"]} title="PUBG Mobile" tone="cyan" />
        <DataCard action="Free Fire Arena" copy="Fast custom-room and guild matches route through the same check-in, evidence and result-verification rules." eyebrow="Free Fire" href="/games/free-fire" meta={["Solo", "Duo", "Squad", "Clash Squad"]} title="Free Fire" tone="purple" />
      </section>

      <EmptyState title="Real betting launch is not approved yet" copy="Use the arena for safe challenge setup, wager previews and match integrity flows. Real payment rails stay disabled until the platform is legally and operationally ready." action="Read Rules" href="/rules" />
    </AGAPageShell>
  );
}
