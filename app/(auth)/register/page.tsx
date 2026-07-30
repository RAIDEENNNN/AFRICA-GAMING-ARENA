"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

const uidLabels: Record<string, string> = {
  codm: "CODM UID",
  pubg: "PUBG Mobile Player ID",
  freefire: "Free Fire Player ID",
};

export default function RegisterPage() {
  const [game, setGame] = useState("codm");
  const uidLabel = useMemo(() => uidLabels[game], [game]);

  return (
    <form className="aga-auth-form wide">
      <span>Join AGA</span>
      <h2>CREATE YOUR PLAYER PROFILE</h2>
      <p>Join Africa Gaming Arena, compete across mobile games and build your reputation.</p>
      <div className="aga-auth-grid">
        <label>Username<input autoComplete="username" placeholder="ShadowStriker" /></label>
        <label>Display name<input autoComplete="name" placeholder="Shadow Striker" /></label>
      </div>
      <label>Email<input autoComplete="email" placeholder="player@example.com" type="email" /></label>
      <div className="aga-auth-grid">
        <label>Password<input autoComplete="new-password" placeholder="Create password" type="password" /></label>
        <label>Confirm password<input autoComplete="new-password" placeholder="Confirm password" type="password" /></label>
      </div>
      <div className="aga-auth-grid">
        <label>Country<input autoComplete="country-name" placeholder="Nigeria" /></label>
        <label>Region<input placeholder="West Africa" /></label>
      </div>
      <label>Primary game
        <select value={game} onChange={(event) => setGame(event.target.value)}>
          <option value="codm">Call of Duty: Mobile</option>
          <option value="pubg">PUBG Mobile</option>
          <option value="freefire">Free Fire</option>
        </select>
      </label>
      <label>{uidLabel}<input placeholder={uidLabel} /></label>
      <label className="aga-check"><input type="checkbox" /> I agree to the Terms and Privacy Policy</label>
      <label className="aga-check"><input type="checkbox" /> Send me platform updates and tournament alerts</label>
      <button className="aga-auth-submit" type="button">CREATE ACCOUNT</button>
      <p className="aga-auth-switch">Already have an account? <Link href="/login">Log In</Link></p>
    </form>
  );
}
