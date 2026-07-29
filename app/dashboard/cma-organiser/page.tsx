import Link from "next/link";

const permissions = ["Create CMA tournaments", "Open or close registration", "Approve teams", "Publish brackets", "Update schedules", "Record scores", "Publish weekly awards", "Send CMA notifications"];
const blocked = ["Full AGA administration", "Other tournament partners", "Platform wallet controls", "User security settings", "AGA system configuration"];

export default function CMAOrganiserDashboardPage() {
  return (
    <main className="product-shell">
      <section className="product-main solo-main">
        <section className="page-hero compact">
          <span>CMA Organiser</span>
          <h1>CMA tournament operations only.</h1>
          <p>This dashboard demonstrates the scoped organiser surface. Server roles are represented in schema and must gate the production APIs.</p>
          <Link className="btn primary" href="/tournaments/cma">Open CMA</Link>
        </section>
        <section className="card-grid two">
          <article className="product-card"><h2>Allowed</h2>{permissions.map((item) => <p key={item}>{item}</p>)}</article>
          <article className="product-card"><h2>Blocked</h2>{blocked.map((item) => <p key={item}>{item}</p>)}</article>
        </section>
      </section>
    </main>
  );
}
