"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import type { FormEvent } from "react";
import { useState } from "react";

const loginProviders = [
  ["Google", "Continue with Google"],
  ["Apple", "Continue with Apple"],
  ["Email", "Use email account"],
];

const gameProviders = [
  ["CODM", "Activision / CODM UID"],
  ["PUBG", "Level Infinite / PUBG ID"],
  ["Free Fire", "Garena / Free Fire UID"],
];

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setMessage("");
    const formData = new FormData(event.currentTarget);
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        identifier: formData.get("identifier"),
        password: formData.get("password"),
      }),
    });
    const body = await response.json() as { error?: string };
    setSubmitting(false);
    if (!response.ok) {
      setMessage(body.error ?? "Login failed.");
      return;
    }
    router.push("/dashboard");
  }

  return (
    <form className="aga-auth-form" onSubmit={handleSubmit}>
      <span>Player access</span>
      <h2>LOG IN</h2>
      <p>Enter the arena with your AGA account, email, or linked mobile-game identity.</p>
      <div className="aga-auth-provider-grid" aria-label="Account login options">
        {loginProviders.map(([label, copy]) => (
          <button type="button" className="aga-auth-provider" key={label} onClick={() => setMessage(label === "Email" ? "Use the email form below to log in now." : `${label} sign-in is prepared in the UI. OAuth backend connection is not live yet.`)}>
            <strong>{label}</strong>
            <small>{copy}</small>
          </button>
        ))}
      </div>
      <div className="aga-auth-divider"><span>Email sign in</span></div>
      <label>Email or username<input autoComplete="username" name="identifier" placeholder="player@aga.com" required /></label>
      <label>Password
        <div className="aga-password-field">
          <input autoComplete="current-password" name="password" placeholder="Your password" required type={showPassword ? "text" : "password"} />
          <button type="button" onClick={() => setShowPassword((value) => !value)}>{showPassword ? "Hide" : "Show"}</button>
        </div>
      </label>
      <div className="aga-auth-row">
        <label className="aga-check"><input type="checkbox" /> Remember me</label>
        <Link href="/forgot-password">Forgot password?</Link>
      </div>
      {message ? <p className="aga-auth-message" role="alert">{message}</p> : null}
      <button className="aga-auth-submit" disabled={submitting} type="submit">{submitting ? "ENTERING..." : "LOG IN"}</button>
      <section className="aga-game-auth-options" aria-label="Game account login options">
        <span>Game account linking</span>
        {gameProviders.map(([label, copy]) => (
          <button type="button" key={label} onClick={() => setMessage(`${label} account linking is not live yet. Log in with your AGA email account for now.`)}>
            <strong>{label}</strong>
            <small>{copy} connection soon</small>
          </button>
        ))}
      </section>
      <p className="aga-auth-switch">New to AGA? <Link href="/register">Create Account</Link></p>
    </form>
  );
}
