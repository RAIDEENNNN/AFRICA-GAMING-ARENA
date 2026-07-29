import { CMANav } from "../page";

export default function CMAWeeklyReportsPage() {
  return (
    <main className="cma-page cma-subpage">
      <CMANav />
      <section className="cma-subhero"><span>Weekly Reports</span><h1>Best of CMA, every week.</h1><p>Weekly awards will appear after organiser-reviewed tournament results. No awards are published yet.</p></section>
      <section className="cma-award-grid">{["Best Player", "Best Team", "Longest Survival", "Most Skilled", "Most Improved"].map((title) => <article key={title}><small>{title}</small><h2>No winner yet</h2><p>Waiting for first verified CMA tournament.</p></article>)}</section>
    </main>
  );
}
