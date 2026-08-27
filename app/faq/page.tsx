import { AGAPageShell, PagePanel } from "../aga-navigation";

const faqs = [
  ["Is AGA live yet?", "AGA is in private launch testing. Public activity counters show zero until real users and matches exist."],
  ["Can I deposit money?", "No. Wallet areas show £0.00 and payments unavailable. Deposits, withdrawals and escrow are disabled."],
  ["Which games are supported?", "Call of Duty: Mobile, PUBG Mobile and Free Fire are the first planned game portals."],
];

export default function FAQPage() {
  return (
    <AGAPageShell active="/faq" eyebrow="Help" title="FAQ" copy="Clear answers for players, clans, organisers and vendors.">
      <section className="aga-info-grid">
        {faqs.map(([question, answer]) => <PagePanel title={question} key={question}><p>{answer}</p></PagePanel>)}
      </section>
    </AGAPageShell>
  );
}
