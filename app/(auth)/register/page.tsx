"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import type { FormEvent } from "react";
import { useMemo, useState } from "react";

const uidLabels: Record<string, string> = {
  codm: "CODM UID",
  pubg: "PUBG Mobile Player ID",
  freefire: "Free Fire Player ID",
};

const accountOptions = [
  ["Google", "Register with Google"],
  ["Apple", "Register with Apple"],
  ["Email", "Register with email"],
];

const gameAccountOptions = [
  ["CODM", "Activision account, Facebook, Apple, Google or CODM UID"],
  ["PUBG Mobile", "Level Infinite account, Apple, Google, Facebook or PUBG ID"],
  ["Free Fire", "Garena account, Apple, Google, Facebook or Free Fire UID"],
];

export default function RegisterPage() {
  const router = useRouter();
  const [game, setGame] = useState("codm");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const uidLabel = useMemo(() => uidLabels[game], [game]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setMessage("");
    const formData = new FormData(event.currentTarget);
    const password = String(formData.get("password") ?? "");
    const confirmPassword = String(formData.get("confirmPassword") ?? "");
    if (password !== confirmPassword) {
      setSubmitting(false);
      setMessage("Passwords do not match.");
      return;
    }
    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        username: formData.get("username"),
        displayName: formData.get("displayName"),
        email: formData.get("email"),
        password,
        country: formData.get("country"),
        dateOfBirth: formData.get("dateOfBirth"),
        primaryGame: game,
        acceptedTerms: formData.get("acceptedTerms") === "on",
      }),
    });
    const body = await response.json() as { error?: string };
    setSubmitting(false);
    if (!response.ok) {
      setMessage(body.error ?? "Registration failed.");
      return;
    }
    router.push("/profile/loading");
  }

  return (
    <form className="aga-auth-form wide" onSubmit={handleSubmit}>
      <span>Join AGA</span>
      <h2>CREATE YOUR PLAYER PROFILE</h2>
      <p>Join Africa Gaming Arena with email, Apple, Google, or a game identity from CODM, PUBG Mobile or Free Fire.</p>
      <div className="aga-auth-provider-grid" aria-label="Account registration options">
        {accountOptions.map(([label, copy]) => (
          <button type="button" className="aga-auth-provider" key={label} onClick={() => setMessage(label === "Email" ? "Use the email profile setup below to create your account now." : `${label} registration is prepared in the UI. OAuth backend connection is not live yet.`)}>
            <strong>{label}</strong>
            <small>{copy}</small>
          </button>
        ))}
      </div>
      <div className="aga-auth-divider"><span>Email profile setup</span></div>
      <div className="aga-auth-grid">
        <label>Username<input autoComplete="username" name="username" placeholder="ShadowStriker" required /></label>
        <label>Display name<input autoComplete="name" name="displayName" placeholder="Shadow Striker" required /></label>
      </div>
      <label>Email<input autoComplete="email" name="email" placeholder="player@example.com" required type="email" /></label>
      <div className="aga-auth-grid">
        <label>Password<input autoComplete="new-password" minLength={8} name="password" placeholder="Create password" required type="password" /></label>
        <label>Confirm password<input autoComplete="new-password" minLength={8} name="confirmPassword" placeholder="Confirm password" required type="password" /></label>
      </div>
      <div className="aga-auth-grid">
        <label>Country<input autoComplete="country-name" name="country" placeholder="Nigeria" required /></label>
        <label>Date of birth<input name="dateOfBirth" required type="date" /></label>
      </div>
      <label>Primary game
        <select value={game} onChange={(event) => setGame(event.target.value)}>
          <option value="codm">Call of Duty: Mobile</option>
          <option value="pubg">PUBG Mobile</option>
          <option value="freefire">Free Fire</option>
        </select>
      </label>
      <label>{uidLabel}<input name="gameUid" placeholder={uidLabel} /></label>
      <section className="aga-game-auth-options" aria-label="Game registration options">
        <span>Connect game identity</span>
        {gameAccountOptions.map(([label, copy]) => (
          <button type="button" key={label} onClick={() => setMessage(`${label} account linking is not live yet. Create your AGA account with email for now, then connect game identity later.`)}>
            <strong>{label}</strong>
            <small>{copy}</small>
          </button>
        ))}
      </section>
      <label className="aga-check"><input name="acceptedTerms" required type="checkbox" /> I agree to the Terms and Privacy Policy</label>
      <label className="aga-check"><input type="checkbox" /> Send me platform updates and tournament alerts</label>
      {message ? <p className="aga-auth-message" role="alert">{message}</p> : null}
      <button className="aga-auth-submit" disabled={submitting} type="submit">{submitting ? "CREATING..." : "CREATE ACCOUNT"}</button>
      <p className="aga-auth-switch">Already have an account? <Link href="/login">Log In</Link></p>
    </form>
  );
}
