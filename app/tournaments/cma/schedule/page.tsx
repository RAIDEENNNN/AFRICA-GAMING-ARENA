import Link from "next/link";
import { CMANav } from "../page";

export default function CMASchedulePage() {
  return (
    <main className="cma-page cma-subpage">
      <CMANav />
      <section className="cma-subhero"><span>CMA Schedule</span><h1>CODM MP and BR tournament calendar.</h1><p>No CMA schedule is published yet. Real tournament records will appear here after organiser approval and database publishing.</p></section>
      <section className="cma-table">
        <article><b>0 events</b><h2>No upcoming CMA tournaments</h2><p>The schedule is waiting for the first organiser-published CODM event.</p><span>Coming soon</span><Link href="/tournaments/cma/register">Join waitlist</Link></article>
      </section>
    </main>
  );
}
