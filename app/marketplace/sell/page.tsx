import { AGAPageShell, EmptyState, PagePanel, SectionHeader, StatCard, SupabaseNotice } from "../../aga-navigation";

const blockedCategories = ["Account selling", "Account boosting", "Cheats or unlock tools", "Unsafe escrow offers"];

export default function SellOnMarketplacePage() {
  return (
    <AGAPageShell
      active="Marketplace"
      eyebrow="Vendor intake"
      title="SELL ON AGA"
      copy="Apply for reviewed vendor access. Listings are not published until identity, category safety and moderation review are complete."
      actions={[{ label: "Back to Marketplace", href: "/marketplace" }, { label: "Support", href: "/support", variant: "secondary" }]}
    >
      <SupabaseNotice />
      <section className="aga-stat-grid">
        <StatCard label="Applications" value="Manual" copy="Admin review is required before any public listing." />
        <StatCard label="Payments" value="Off" copy="AGA cannot process deposits, withdrawals or escrow yet." />
        <StatCard label="Account sales" value="Blocked" copy="Game account transfers are disabled by policy." />
        <StatCard label="Listings" value="0" copy="No vendor listings are currently live." />
      </section>
      <SectionHeader eyebrow="Application" title="Vendor review form" copy="This page captures the real seller journey without pretending marketplace publishing is automatic." />
      <section className="aga-form-grid">
        <PagePanel title="Vendor details">
          <label>Business or creator name<input className="field" placeholder="Your vendor name" /></label>
          <label>Category<select className="field" defaultValue="COD Points">{["COD Points", "PUBG UC", "Free Fire Diamonds", "Coaching", "Graphics", "Editing", "Tournament Services"].map((item) => <option key={item}>{item}</option>)}</select></label>
          <label>Contact email<input className="field" type="email" placeholder="you@example.com" /></label>
          <label>Proof or portfolio link<input className="field" placeholder="https://" /></label>
          <label>What do you want to list?<textarea className="field" placeholder="Describe the service or product without payment links." /></label>
          <button className="aga-page-btn primary" disabled>Submit after vendor review backend is connected</button>
        </PagePanel>
        <PagePanel title="Blocked marketplace activity">
          {blockedCategories.map((item) => <p key={item}>{item}</p>)}
          <EmptyState title="Public publishing disabled" copy="Applications are intake-only until admin review, storage, notifications and vendor records are connected." />
        </PagePanel>
      </section>
    </AGAPageShell>
  );
}
