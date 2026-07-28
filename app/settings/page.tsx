import { AppShell, PageHero } from "../components";

export default function SettingsPage() {
  return (
    <AppShell>
      <PageHero eyebrow="Settings" title="Account, privacy, notifications and security." copy="Control public profile details, who can message you, connected accounts and notification categories." />
      <section className="card-grid two">
        {["Account", "Privacy", "Notifications", "Security", "Language", "Billing", "Age verification", "Responsible play"].map((item) => (
          <article className="product-card" key={item}><h2>{item}</h2><p>Settings controls will connect with authenticated user preferences.</p></article>
        ))}
        <article className="product-card"><h2>Sound readiness</h2><p>Optional cues prepared for challenge accepted, terms locked, match starting, message received, victory and rank increased. Sound remains off until enabled.</p><button className="btn secondary">Sound off</button></article>
      </section>
    </AppShell>
  );
}
