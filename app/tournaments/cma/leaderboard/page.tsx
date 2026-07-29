import { CMANav } from "../page";

const rows = [
  ["1", "Xclusive", "CODM", "12,460", "78%"],
  ["2", "Revenant Esports", "CODM", "11,880", "75%"],
  ["3", "LoneWolfXD", "CODM", "10,940", "72%"],
  ["4", "SkillzMaster", "CODM", "10,120", "69%"],
];

export default function CMALeaderboardPage() {
  return (
    <main className="cma-page cma-subpage">
      <CMANav />
      <section className="cma-subhero"><span>CMA Leaderboard</span><h1>Verified weekly CODM rankings.</h1><p>Leaderboard data is demo seeded here and will move to normalised D1 tournament tables.</p></section>
      <section className="cma-leaderboard">{rows.map(([rank, name, game, points, rate]) => <article key={name}><b>#{rank}</b><h2>{name}</h2><p>{game}</p><strong>{points} RP</strong><span>{rate} win rate</span></article>)}</section>
    </main>
  );
}
