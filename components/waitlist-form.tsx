"use client";

import { useId, useState } from "react";
import type { WaitlistTarget } from "@/lib/content/apps";

// No waitlist backend exists yet. Submitting opens the visitor's email app
// with a pre-filled message to the app's support address, so a signup is
// still a real, deliverable message. Swap `submit` for a server action or
// API call when a list service is chosen.
export function WaitlistForm({
  targets,
  only,
  surface = false,
}: {
  targets: WaitlistTarget[];
  /** Slug of a single app to sign up for. Omit to show an app picker. */
  only?: string;
  surface?: boolean;
}) {
  const id = useId();
  const [message, setMessage] = useState("");
  const [choice, setChoice] = useState(only ?? "any");

  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const email = String(form.get("email") ?? "").trim();
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setMessage("Enter a valid email address, like you@example.com.");
      return;
    }
    const target = targets.find((t) => t.slug === choice) ?? targets[0];
    const what = choice === "any" ? "your apps" : target.name;
    const subject = `Notify me when ${what} launches`;
    const body = `Please add ${email} to the waitlist for ${what}.`;
    setMessage("Opening your email app. Send the message to join the waitlist.");
    window.location.href = `mailto:${target.contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }

  if (targets.length === 0) return null;

  return (
    <form className={`wl ${surface ? "on-surface" : "light"}`} onSubmit={submit} noValidate>
      <div className="fields">
        {only ? null : (
          <>
            <label className="sr" htmlFor={`${id}-app`}>
              Choose an app
            </label>
            <select id={`${id}-app`} value={choice} onChange={(e) => setChoice(e.target.value)}>
              <option value="any">All apps</option>
              {targets.map((t) => (
                <option key={t.slug} value={t.slug}>
                  {t.name}
                </option>
              ))}
            </select>
          </>
        )}
        <label className="sr" htmlFor={`${id}-email`}>
          Email address
        </label>
        <input id={`${id}-email`} name="email" type="email" placeholder="you@example.com" autoComplete="email" required />
        <button className="btn" type="submit">
          Join the waitlist
        </button>
      </div>
      <div className="wl-msg" aria-live="polite">
        {message}
      </div>
    </form>
  );
}
