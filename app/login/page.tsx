import Link from "next/link";

export default function LoginPage() {
  return (
    <main className="auth-page">
      <form className="auth-card">
        <span className="eyebrow">Clan Arena</span>
        <h1>Login</h1>
        <label>Email or username<input className="field" /></label>
        <label>Password<input className="field" type="password" /></label>
        <button className="btn primary" disabled>Login when auth is connected</button>
        <Link href="/register">Need an account?</Link>
      </form>
    </main>
  );
}
