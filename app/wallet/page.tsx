import { AppShell, PageHero, WagerSafetyPanel } from "../components";

const ledger = [
  ["Available balance", "$0.00", "Cash features disabled"],
  ["Pending escrow", "$0.00", "Requires legal approval"],
  ["Platform points", "2,450", "Active for free challenges"],
  ["Verification", "Incomplete", "Age and location required"],
];

export default function WalletPage() {
  return (
    <AppShell>
      <PageHero
        eyebrow="Wallet"
        title="Prizes, points and escrow controls stay gated until compliance is ready."
        copy="AGA can support wager-style challenge fields, but real money movement is locked behind age checks, jurisdiction rules, identity review, payment provider approval and admin moderation."
        primary={["Create points challenge", "/matches/request"]}
        secondary={["Read support", "/support"]}
      />
      <section className="content-grid two">
        <article className="product-card">
          <h2>Wallet overview</h2>
          <div className="stat-list">
            {ledger.map(([label, value, note]) => (
              <div key={label} className="stat-row">
                <span>{label}</span>
                <strong>{value}</strong>
                <small>{note}</small>
              </div>
            ))}
          </div>
        </article>
        <WagerSafetyPanel />
      </section>
      <section className="content-grid three">
        {["Age verification", "Location check", "Escrow release"].map((title) => (
          <article className="product-card" key={title}>
            <h3>{title}</h3>
            <p>Disabled in this prototype until the backend policy engine and manual admin review workflow are connected.</p>
            <button className="btn secondary" disabled>Locked</button>
          </article>
        ))}
      </section>
    </AppShell>
  );
}
