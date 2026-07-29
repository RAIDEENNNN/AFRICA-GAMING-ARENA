import Link from "next/link";
import { CMANav } from "../page";

export default function CMARegisterPage() {
  return (
    <main className="cma-page cma-subpage">
      <CMANav />
      <section className="cma-subhero"><span>CMA Registration</span><h1>Join the CMA waitlist.</h1><p>No CMA tournament is open yet. This form is a non-payment waitlist preview until Supabase authentication and registration persistence are connected.</p></section>
      <form className="cma-register-form">
        <label>Registration type<select><option>Solo</option><option>Team</option><option>Clan</option></select></label>
        <label>Tournament<select><option>No open CMA tournament</option></select></label>
        <label>CODM player UID<input placeholder="Enter CODM UID" /></label>
        <label>Roster or clan name<input placeholder="Your team or clan name" /></label>
        <label className="cma-check"><input type="checkbox" /> I accept CMA tournament rules and evidence requirements.</label>
        <button type="button">Join Waitlist</button>
      </form>
      <section className="cma-state-row">{["Draft", "Submitted", "Under review", "Approved", "Rejected", "Waitlisted", "Checked in", "Qualified", "Eliminated", "Winner", "Disqualified"].map((state) => <span key={state}>{state}</span>)}</section>
      <Link className="cma-secondary" href="/dashboard">View Dashboard</Link>
    </main>
  );
}
