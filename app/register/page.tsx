import Link from "next/link";

export default function RegisterPage() {
  return (
    <main className="auth-page">
      <form className="auth-card">
        <span className="eyebrow">Create account</span>
        <h1>Register</h1>
        <label>Username<input className="field" /></label>
        <label>Email<input className="field" type="email" /></label>
        <label>Password<input className="field" type="password" /></label>
        <label>Primary game<select className="field"><option>CODM</option><option>PUBG Mobile</option><option>Free Fire</option></select></label>
        <button className="btn primary" disabled>Create account when auth is connected</button>
        <Link href="/login">Already have an account?</Link>
      </form>
    </main>
  );
}
