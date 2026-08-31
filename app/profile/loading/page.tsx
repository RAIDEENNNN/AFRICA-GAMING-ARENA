"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type ProfileUser = {
  username: string;
  displayName: string;
  primaryGame: string;
};

export default function ProfileLoadingPage() {
  const router = useRouter();
  const [user, setUser] = useState<ProfileUser | null>(null);
  const [state, setState] = useState<"checking" | "entering" | "missing" | "error">("checking");

  useEffect(() => {
    let cancelled = false;

    async function loadProfile() {
      try {
        const response = await fetch("/api/auth/me", { cache: "no-store" });
        const body = await response.json() as { user?: ProfileUser | null };
        if (cancelled) return;
        if (!response.ok) throw new Error("Profile check failed.");
        if (!body.user) {
          setState("missing");
          return;
        }
        setUser(body.user);
        setState("entering");
        window.setTimeout(() => {
          if (!cancelled) router.replace(`/profile/${encodeURIComponent(body.user!.username)}`);
        }, 900);
      } catch {
        if (!cancelled) setState("error");
      }
    }

    loadProfile();
    return () => {
      cancelled = true;
    };
  }, [router]);

  const title = state === "missing" ? "LOGIN REQUIRED" : state === "error" ? "PROFILE CHECK FAILED" : "LOGGING INTO YOUR PROFILE";
  const copy = state === "missing"
    ? "Start with your AGA account, then your profile, stats, wallet status and match history will open here."
    : state === "error"
      ? "The profile session could not be confirmed. Try signing in again."
      : user
        ? `Loading ${user.displayName}'s ${(user.primaryGame || "AGA").toUpperCase()} profile, match history and player dashboard.`
        : "Checking your session, player profile, stats, clan status and notifications.";

  return (
    <main className="aga-profile-loading">
      <section className="aga-profile-loading-card">
        <img src="/brand/aga-logo.svg" alt="AGA Africa Gaming Arena" width={178} height={50} />
        <span>{state === "entering" ? "Profile found" : "Player access"}</span>
        <h1>{title}</h1>
        <p>{copy}</p>
        {state === "checking" || state === "entering" ? (
          <>
            <div className="aga-profile-loader" aria-hidden="true"><i /><i /><i /></div>
            <div className="aga-profile-loading-steps">
              <b>Session</b>
              <b>Stats</b>
              <b>Match history</b>
              <b>Wallet status</b>
            </div>
          </>
        ) : (
          <div className="aga-profile-loading-actions">
            <Link className="aga-page-btn primary" href="/login">Log In</Link>
            <Link className="aga-page-btn secondary" href="/register">Create Account</Link>
          </div>
        )}
      </section>
    </main>
  );
}
