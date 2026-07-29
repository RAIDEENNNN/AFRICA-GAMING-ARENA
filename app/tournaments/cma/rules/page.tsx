import { CMANav } from "../page";

const rules = [
  "Call of Duty: Mobile only. This is not Black Ops 6.",
  "Use your AGA account and verified CODM UID.",
  "Roster locks before check-in.",
  "Match evidence may be requested for disputes.",
  "No emulator, macro, exploit or account sharing unless a specific event allows it.",
  "Organisers can approve, reject, waitlist, check in, score and publish results for CMA only.",
];

export default function CMARulesPage() {
  return (
    <main className="cma-page cma-subpage">
      <CMANav />
      <section className="cma-subhero"><span>CMA Rules</span><h1>Fair CODM tournament rules.</h1><p>Rules are enforced by CMA organisers and AGA server-side permissions before launch.</p></section>
      <section className="cma-rules-list">{rules.map((rule) => <article key={rule}>{rule}</article>)}</section>
    </main>
  );
}
