import { AppShell, PageHero } from "../components";

export default function SupportPage() {
  return (
    <AppShell>
      <PageHero eyebrow="Support" title="Help for account, payments, match disputes and reports." copy="Players and clan leaders can open tickets, report content and request moderation review." />
      <section className="card-grid three">
        {["Account support", "Match dispute", "Wager escrow dispute", "Clip report", "Payments", "Technical support", "Community guidelines", "Self-exclusion"].map((item) => (
          <article className="product-card" key={item}><h2>{item}</h2><p>Support flow coming with backend ticketing.</p></article>
        ))}
      </section>
    </AppShell>
  );
}
