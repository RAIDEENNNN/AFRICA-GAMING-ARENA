import Link from "next/link";
import { AGAPageShell, DataCard, EmptyState, PagePanel, SectionHeader, StatCard, StatusBadge, SupabaseNotice } from "../aga-navigation";

const ledger = [
  ["Available balance", "£0.00", "New accounts never start with fake funds."],
  ["Pending escrow", "£0.00", "Real escrow remains disabled until legal and payment review."],
  ["Platform points", "0", "Points will come only from verified platform activity."],
  ["Verification", "Incomplete", "Age, region and identity checks are required before wallet controls unlock."],
];

const gates = [
  ["Age verification", "Locked", "Player age checks must be connected before wager or payment controls can open."],
  ["Location check", "Locked", "Regional rules decide which wallet features are available to each user."],
  ["Payment provider", "Pending", "Deposits, withdrawals and checkout need approved provider architecture."],
  ["Escrow release", "Unavailable", "Match result, evidence and dispute systems must mature before payouts exist."],
];

export default function WalletPage() {
  return (
    <AGAPageShell
      active="/wallet"
      eyebrow="Wallet"
      title="AGA WALLET"
      copy="Wallet status is visible, but payments stay locked. No deposits, withdrawals, buy-now checkout or real escrow will appear until compliance, identity, dispute and payment systems are ready."
      actions={[{ label: "Create Challenge", href: "/matches/request" }, { label: "Order History", href: "/orders", variant: "secondary" }]}
    >
      <SupabaseNotice />

      <section className="aga-wallet-hero-grid">
        <article className="aga-wallet-balance-card">
          <StatusBadge tone="gold">Current balance</StatusBadge>
          <strong>£0.00</strong>
          <div>
            <Link className="aga-page-btn primary" href="/login">Log In</Link>
            <Link className="aga-page-btn secondary" href="/support">Wallet Support</Link>
          </div>
          <p>Login connects this panel to your profile, match history and future wallet ledger. Real money controls remain disabled in this phase.</p>
        </article>
        <PagePanel title="Wallet safety lock">
          <p>AGA should never show fake deposits, fake winnings or fake orders. Every wallet number on this page starts from honest launch-zero data.</p>
          <dl className="aga-wallet-ledger">
            <div><dt>Deposits</dt><dd>Disabled</dd></div>
            <div><dt>Withdrawals</dt><dd>Disabled</dd></div>
            <div><dt>Escrow</dt><dd>Compliance pending</dd></div>
          </dl>
        </PagePanel>
      </section>

      <section className="aga-stat-grid">
        <StatCard label="Available" value="£0.00" copy="No simulated public balance is shown." />
        <StatCard label="Locked" value="£0.00" copy="Escrow is unavailable until approval." />
        <StatCard label="Transactions" value="0" copy="No payment records exist yet." />
        <StatCard label="Verification" value="Needed" copy="Age and region checks come first." />
      </section>

      <SectionHeader eyebrow="Ledger" title="Wallet overview" copy="The wallet is arranged as a real account screen while clearly showing that payment features are not live." />
      <section className="aga-card-grid two">
        {ledger.map(([title, value, copy], index) => (
          <DataCard
            copy={copy}
            eyebrow={value}
            key={title}
            meta={["Source: authenticated wallet record", "Status: launch-zero"]}
            title={title}
            tone={index % 2 === 0 ? "gold" : "cyan"}
          />
        ))}
      </section>

      <SectionHeader eyebrow="Compliance" title="Unlock requirements" copy="These controls are visible so players know what is coming, but every risky action remains locked." />
      <section className="aga-wallet-gate-grid">
        {gates.map(([title, status, copy], index) => (
          <article className="aga-wallet-gate-card" key={title}>
            <StatusBadge tone={index === 2 ? "purple" : "muted"}>{status}</StatusBadge>
            <h3>{title}</h3>
            <p>{copy}</p>
            <button className="aga-page-btn secondary" disabled type="button">Locked</button>
          </article>
        ))}
      </section>

      <EmptyState title="No wallet activity yet" copy="Verified transactions, refunds and dispute records will appear only after production payment systems are approved." action="Read Support" href="/support" />
    </AGAPageShell>
  );
}
