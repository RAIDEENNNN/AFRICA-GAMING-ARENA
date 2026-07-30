import Link from "next/link";

export default function VerifyEmailPage() {
  return (
    <section className="aga-auth-form">
      <span>Account verification</span>
      <h2>VERIFY EMAIL</h2>
      <p>Check your inbox for the AGA verification link. Verified accounts will unlock protected player features after Supabase Auth is connected.</p>
      <Link className="aga-auth-submit" href="/login">BACK TO LOG IN</Link>
    </section>
  );
}
