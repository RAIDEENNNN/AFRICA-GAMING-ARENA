import { AppShell, FormNotice, PageHero } from "../../components";

export default function CreateClanPage() {
  return (
    <AppShell>
      <PageHero eyebrow="Create clan" title="Build your clan profile." copy="Set identity, branding, recruitment rules and review before publishing." />
      <form className="product-form">
        <FormNotice>This form is UI-ready. Backend saving will connect in the full-stack phase.</FormNotice>
        <label>Clan name<input className="field" placeholder="Xclusive" /></label>
        <label>Clan tag<input className="field" placeholder="XCL" /></label>
        <label>Primary game<select className="field"><option>CODM</option><option>PUBG Mobile</option><option>Free Fire</option></select></label>
        <label>Region<input className="field" placeholder="Europe" /></label>
        <label>Recruitment<select className="field"><option>Application only</option><option>Open recruitment</option><option>Invite only</option></select></label>
        <label>Clan description<textarea className="field" placeholder="Tell players what your clan stands for." /></label>
        <button className="btn primary" disabled>Publish clan when backend is connected</button>
      </form>
    </AppShell>
  );
}
