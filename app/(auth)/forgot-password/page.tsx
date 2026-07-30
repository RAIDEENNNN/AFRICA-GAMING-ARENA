import Link from "next/link";

export default function ForgotPasswordPage() {
  return (
    <form className="aga-auth-form">
      <span>Account recovery</span>
      <h2>FORGOT PASSWORD</h2>
      <p>Enter your email and AGA will send password reset instructions once authentication is connected.</p>
      <label>Email<input autoComplete="email" placeholder="player@example.com" type="email" /></label>
      <button className="aga-auth-submit" type="button">SEND RESET LINK</button>
      <p className="aga-auth-switch"><Link href="/login">Back to Log In</Link></p>
    </form>
  );
}
