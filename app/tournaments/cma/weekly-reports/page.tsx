import { CMANav } from "../page";

const awards = [
  ["Best Player", "CMAXGhostYT", "248 kills"],
  ["Best Team", "Revenant Esports", "1,248 points"],
  ["Longest Survival", "LoneWolfXD", "32:47"],
  ["Most Skilled", "SkillzMaster", "78% accuracy"],
  ["Most Improved", "RogueNinja", "+125 rank movement"],
];

export default function CMAWeeklyReportsPage() {
  return (
    <main className="cma-page cma-subpage">
      <CMANav />
      <section className="cma-subhero"><span>Weekly Reports</span><h1>Best of CMA, every week.</h1><p>Weekly awards are ready for organiser selection once CMA organiser permissions are connected.</p></section>
      <section className="cma-award-grid">{awards.map(([title, name, detail]) => <article key={title}><small>{title}</small><h2>{name}</h2><p>{detail}</p></article>)}</section>
    </main>
  );
}
