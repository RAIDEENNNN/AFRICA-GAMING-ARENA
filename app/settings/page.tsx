import { AppShell, PageHero } from "../components";

export default function SettingsPage() {
  return (
    <AppShell>
      <PageHero eyebrow="Settings" title="Account, privacy, notifications and security." copy="Control public profile details, who can message you, connected accounts and notification categories." />
      <section className="card-grid two">
        {["Account", "Privacy", "Notifications", "Security", "Language", "Billing", "Age verification", "Responsible play"].map((item) => (
          <article className="product-card" key={item}><h2>{item}</h2><p>Settings controls will connect with authenticated user preferences.</p></article>
        ))}
      </section>
    </AppShell>
  );
}
