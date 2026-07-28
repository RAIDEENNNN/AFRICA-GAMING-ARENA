import { AppShell, ClipCard, PageHero } from "../components";
import { clips } from "../data";

export default function ProfilePage() {
  return (
    <AppShell>
      <PageHero eyebrow="Player profile" title="PlayerOne" copy="Legendary CODM player, Xclusive officer, objective support, available evenings in Europe." primary={["Edit settings", "/settings"]} />
      <section className="card-grid four">
        <article className="product-card metric-card"><span>Matches</span><strong>2,450</strong></article>
        <article className="product-card metric-card"><span>Wins</span><strong>1,680</strong></article>
        <article className="product-card metric-card"><span>K/D</span><strong>2.45</strong></article>
        <article className="product-card metric-card"><span>Win rate</span><strong>68.6%</strong></article>
      </section>
      <section className="card-grid three">
        {clips.map((clip) => <ClipCard clip={clip} key={clip.title} />)}
      </section>
    </AppShell>
  );
}
