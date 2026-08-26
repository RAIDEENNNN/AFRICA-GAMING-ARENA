import { AGAPageShell, DataCard, PagePanel, SectionHeader } from "../../aga-navigation";

const articles = {
  "aga-launch-roadmap": {
    category: "AGA",
    title: "AGA launch roadmap",
    body: "AGA is being shaped around real player accounts, challenge creation, match rooms, clans, tournaments, rankings, clips and notifications. Each system should use real records as the backend matures.",
  },
  "cma-tournament-prep": {
    category: "CMA",
    title: "CMA tournament preparation",
    body: "CMA tournament pages are prepared for registration, rules, check-in and result workflows. Registration remains closed until organiser controls and persistence are enabled.",
  },
  "safe-marketplace-policy": {
    category: "Policy",
    title: "Marketplace safety policy",
    body: "AGA marketplace discovery must avoid account sales, cheats, unsafe escrow, unverified cash transactions and anything that breaks game platform rules.",
  },
};

export function generateStaticParams() {
  return Object.keys(articles).map((slug) => ({ slug }));
}

export default async function NewsArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = articles[slug as keyof typeof articles] ?? articles["aga-launch-roadmap"];
  return (
    <AGAPageShell active="News" eyebrow={article.category} title={article.title} copy="AGA editorial and platform notes. CMS-backed publishing will replace internal launch notes later.">
      <PagePanel title="Article">
        <p>{article.body}</p>
      </PagePanel>
      <SectionHeader eyebrow="Related" title="Continue reading" />
      <section className="aga-card-grid two">
        <DataCard title="Tournament preparation" copy="See how tournament infrastructure is being staged." href="/tournaments" action="View Tournaments" />
        <DataCard title="Marketplace safety" copy="Review the marketplace discovery rules." href="/marketplace" action="View Marketplace" tone="purple" />
      </section>
    </AGAPageShell>
  );
}
