import Link from "next/link";
import { CMANav } from "../page";

const schedule = [
  ["09:00 AM", "CMA MP Morning Cup", "Multiplayer", "5v5", "Registration open"],
  ["02:00 PM", "CMA BR Afternoon Cup", "Battle Royale", "Solo", "Under review"],
  ["08:00 PM", "CMA MP Night Cup", "Multiplayer", "5v5", "Registration open"],
  ["11:00 PM", "CMA BR Late Night Cup", "Battle Royale", "Squad", "Opens tonight"],
];

export default function CMASchedulePage() {
  return (
    <main className="cma-page cma-subpage">
      <CMANav />
      <section className="cma-subhero"><span>CMA Schedule</span><h1>Daily CODM MP and BR tournament calendar.</h1><p>Schedule availability is demo seeded until organiser publishing is connected to D1 tournament records.</p></section>
      <section className="cma-table">
        {schedule.map(([time, title, type, mode, status]) => <article key={title}><b>{time}</b><h2>{title}</h2><p>{type} · {mode}</p><span>{status}</span><Link href="/tournaments/cma/register">Register</Link></article>)}
      </section>
    </main>
  );
}
