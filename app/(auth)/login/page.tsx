"use client";

import Link from "next/link";
import { useState } from "react";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <form className="aga-auth-form">
      <span>Player access</span>
      <h2>LOG IN</h2>
      <p>Enter the arena with your AGA account.</p>
      <label>Email or username<input autoComplete="username" placeholder="player@aga.com" /></label>
      <label>Password
        <div className="aga-password-field">
          <input autoComplete="current-password" placeholder="Your password" type={showPassword ? "text" : "password"} />
          <button type="button" onClick={() => setShowPassword((value) => !value)}>{showPassword ? "Hide" : "Show"}</button>
        </div>
      </label>
      <div className="aga-auth-row">
        <label className="aga-check"><input type="checkbox" /> Remember me</label>
        <Link href="/forgot-password">Forgot password?</Link>
      </div>
      <button className="aga-auth-submit" type="button">LOG IN</button>
      <p className="aga-auth-switch">New to AGA? <Link href="/register">Create Account</Link></p>
    </form>
  );
}
