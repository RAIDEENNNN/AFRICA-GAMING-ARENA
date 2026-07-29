import Link from "next/link";
import { CMANav } from "../page";

export default function CMARegisterPage() {
  return (
    <main className="cma-page cma-subpage">
      <CMANav />
      <section className="cma-subhero"><span>CMA Registration</span><h1>Register with your AGA profile.</h1><p>No separate CMA account. Submit your CODM UID, roster, rules approval and wait for organiser review.</p></section>
      <form className="cma-register-form">
        <label>Registration type<select><option>Solo</option><option>Team</option><option>Clan</option></select></label>
        <label>Tournament<select><option>CMA Daily MP Cup</option><option>CMA Daily BR Cup</option></select></label>
        <label>CODM player UID<input placeholder="Enter CODM UID" /></label>
        <label>Roster or clan name<input placeholder="Team Venom" /></label>
        <label className="cma-check"><input type="checkbox" /> I accept CMA tournament rules and evidence requirements.</label>
        <button type="button">Submit Registration</button>
      </form>
      <section className="cma-state-row">{["Registration submitted", "Under review", "Approved", "Rejected", "Waitlisted", "Checked in", "Eliminated", "Qualified", "Winner"].map((state) => <span key={state}>{state}</span>)}</section>
      <Link className="cma-secondary" href="/dashboard">View Dashboard</Link>
    </main>
  );
}
