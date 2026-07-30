import { AGAPageShell, PagePanel } from "../aga-navigation";

export default function ContactPage() {
  return (
    <AGAPageShell active="/contact" eyebrow="Contact" title="CONTACT AGA" copy="Reach out for partnerships, organiser access, vendor verification, support and platform questions.">
      <PagePanel title="Contact options">
        <p>Contact forms and support routing will connect to Supabase-backed tickets before public launch.</p>
      </PagePanel>
    </AGAPageShell>
  );
}
