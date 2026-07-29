import { CMANav } from "../page";

export default function CMALeaderboardPage() {
  return (
    <main className="cma-page cma-subpage">
      <CMANav />
      <section className="cma-subhero"><span>CMA Leaderboard</span><h1>Verified weekly CODM rankings.</h1><p>No CMA leaderboard records exist yet. Rankings will appear after verified tournament results.</p></section>
      <section className="cma-leaderboard"><article><b>#0</b><h2>No ranked players yet</h2><p>Be the first player featured after a verified CMA event.</p><strong>0 RP</strong><span>0% win rate</span></article></section>
    </main>
  );
}
