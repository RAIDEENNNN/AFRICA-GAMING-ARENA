import Link from "next/link";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="aga-auth-shell">
      <section className="aga-auth-visual">
        <Link href="/" aria-label="Back to Africa Gaming Arena home">
          <img src="/brand/aga-logo.svg" alt="AGA Africa Gaming Arena" width={190} height={54} />
        </Link>
        <div>
          <span>Africa Gaming Arena</span>
          <h1>WELCOME BACK TO THE ARENA</h1>
          <p>Continue your journey, join matches and build your gaming legacy.</p>
          <ul>
            <li>Enter tournaments</li>
            <li>Challenge players</li>
            <li>Join clans</li>
            <li>Track your ranking</li>
          </ul>
        </div>
      </section>
      <section className="aga-auth-panel">
        <Link className="aga-auth-home" href="/">← Back to Home</Link>
        {children}
        <nav className="aga-auth-legal" aria-label="Legal links">
          <Link href="/rules">Rules</Link>
          <Link href="/support">Support</Link>
          <Link href="/contact">Contact</Link>
        </nav>
      </section>
    </main>
  );
}
