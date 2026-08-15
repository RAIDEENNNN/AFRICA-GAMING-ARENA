"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import type { FormEvent } from "react";
import { useState } from "react";

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
      <p>Enter the arena with your AGA account.</p>
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
      <p className="aga-auth-switch">New to AGA? <Link href="/register">Create Account</Link></p>
    </form>
  );
}
