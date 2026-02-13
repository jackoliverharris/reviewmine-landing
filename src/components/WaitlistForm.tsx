"use client";

import { FormEvent, useMemo, useState } from "react";
import mixpanel from "mixpanel-browser";

const reviewCountOptions = [
  { value: "under-1000", label: "Under 1,000" },
  { value: "1000-5000", label: "1,000-5,000" },
  { value: "5000-10000", label: "5,000-10,000" },
  { value: "10000-plus", label: "10,000+" },
];

const challengeOptions = [
  "Finding great testimonials fast",
  "Understanding booking objections",
  "Tracking guide performance",
  "Turning reviews into better ad copy",
];

export default function WaitlistForm() {
  const [step, setStep] = useState<1 | 2>(1);
  const [email, setEmail] = useState("");
  const [reviewCount, setReviewCount] = useState("");
  const [challenge, setChallenge] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const progress = useMemo(() => (step === 1 ? 50 : 100), [step]);

  const getPageUrl = () => (typeof window !== "undefined" ? window.location.href : "");

  const getUtmValues = () => {
    if (typeof window === "undefined") {
      return {
        utm_source: "direct",
        utm_medium: "none",
        utm_campaign: "none",
      };
    }

    const params = new URLSearchParams(window.location.search);
    return {
      utm_source: params.get("utm_source") || "direct",
      utm_medium: params.get("utm_medium") || "none",
      utm_campaign: params.get("utm_campaign") || "none",
    };
  };

  const handleContinue = () => {
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!valid) {
      mixpanel.track("Sign In", {
        user_id: email || "anonymous",
        login_method: "email",
        success: false,
      });
      mixpanel.track("Error", {
        error_type: "validation",
        error_message: "Invalid work email",
        error_code: "invalid_email",
        page_url: getPageUrl(),
        user_id: email || "anonymous",
      });
      setStatus("error");
      return;
    }
    mixpanel.track("Sign In", {
      user_id: email,
      login_method: "email",
      success: true,
    });
    setStatus("idle");
    setStep(2);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("submitting");

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, reviewCount, challenge }),
      });

      if (!response.ok) {
        throw new Error("Subscription failed");
      }

      const utmValues = getUtmValues();
      mixpanel.identify(email);
      mixpanel.people.set({
        $email: email,
      });
      mixpanel.track("Sign Up", {
        user_id: email,
        email,
        signup_method: "email",
        utm_source: utmValues.utm_source,
        utm_medium: utmValues.utm_medium,
        utm_campaign: utmValues.utm_campaign,
      });
      mixpanel.track("Conversion", {
        "Conversion Type": "beta_invite_request",
        "Conversion Value": 1,
      });

      setStatus("success");
    } catch {
      mixpanel.track("Error", {
        error_type: "network",
        error_message: "Subscription failed",
        error_code: "subscribe_failed",
        page_url: getPageUrl(),
        user_id: email || "anonymous",
      });
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <section id="waitlist" className="px-6 pt-10 pb-16 md:pt-12 md:pb-20">
        <div className="max-w-2xl mx-auto text-center rounded-2xl border border-emerald-200 bg-white/85 p-8 shadow-[0_18px_65px_-35px_rgba(16,185,129,0.45)] dark:border-emerald-800/60 dark:bg-slate-900/70">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-900/40 mb-6">
            <svg
              className="w-8 h-8 text-emerald-600 dark:text-emerald-300"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">
            You are on the beta cohort list.
          </h2>
          <p className="mt-2 text-base text-slate-600 dark:text-slate-300">
            We will send rollout details and early access windows soon.
          </p>
          <a
            href="https://www.linkedin.com/in/jackoliverharris"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-5 text-sm font-medium text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200"
          >
            Follow the build on LinkedIn
          </a>
        </div>
      </section>
    );
  }

  return (
    <section id="waitlist" className="px-6 pt-14 pb-16 md:pt-16 md:pb-20">
      <div className="max-w-2xl mx-auto text-center mb-6">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
          Early access
        </p>
        <h2 className="mt-2 text-3xl md:text-4xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">
          Get beta invite.
        </h2>
        <p className="mt-2 text-base text-slate-600 dark:text-slate-300">
          Get beta invite to the tool that turns your reviews into bookings and
          help shape it for operators like you.
        </p>
      </div>
      <div className="max-w-2xl mx-auto rounded-2xl border border-slate-200 bg-white/85 p-6 md:p-8 shadow-[0_20px_65px_-40px_rgba(15,23,42,0.7)] dark:border-slate-700 dark:bg-slate-900/70">
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">
            Get beta invite
          </h2>
          <p className="shrink-0 whitespace-nowrap text-xs font-semibold uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
            Step {step} of 2
          </p>
        </div>

        <div className="mt-4 h-2 w-full rounded-full bg-slate-200 dark:bg-slate-700">
          <div
            className="h-full rounded-full bg-gradient-to-r from-amber-400 via-emerald-400 to-cyan-500 transition-all duration-400"
            style={{ width: `${progress}%` }}
          />
        </div>

        <form onSubmit={handleSubmit} className="mt-7 space-y-6">
          {step === 1 && (
            <div className="space-y-4">
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Start with your work email so we can reserve your invite.
              </p>
              <p className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-1.5 text-sm font-medium text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-200">
                <span className="inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                60+ tour and activity operators already on the beta list
              </p>
              <label htmlFor="email" className="sr-only">
                Work email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                placeholder="Work email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-500 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100 dark:placeholder-slate-500"
              />
              <button
                type="button"
                onClick={handleContinue}
                className="w-full rounded-lg bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-white"
              >
                Continue
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div>
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-2">
                  How many reviews are you sitting on?
                </p>
                <div className="grid grid-cols-2 gap-2.5">
                  {reviewCountOptions.map((option) => (
                    <label
                      key={option.value}
                      className={`relative flex items-center justify-center rounded-lg border px-3 py-2.5 text-sm cursor-pointer transition ${
                        reviewCount === option.value
                          ? "border-slate-900 bg-slate-900 text-slate-100 dark:border-slate-100 dark:bg-slate-100 dark:text-slate-900"
                          : "border-slate-300 text-slate-600 hover:border-slate-500 dark:border-slate-700 dark:text-slate-300 dark:hover:border-slate-500"
                      }`}
                    >
                      <input
                        type="radio"
                        name="reviewCount"
                        value={option.value}
                        checked={reviewCount === option.value}
                        onChange={(e) => setReviewCount(e.target.value)}
                        className="sr-only"
                      />
                      {option.label}
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label
                  htmlFor="challenge"
                  className="block text-sm text-slate-500 dark:text-slate-400 mb-2"
                >
                  What is your biggest review workflow bottleneck?
                </label>
                <select
                  id="challenge"
                  name="challenge"
                  value={challenge}
                  onChange={(e) => setChallenge(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-500 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100"
                >
                  <option value="">Select one</option>
                  {challengeOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="rounded-lg border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-500 hover:text-slate-900 dark:border-slate-600 dark:text-slate-200 dark:hover:border-slate-400"
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={status === "submitting" || !reviewCount}
                  className="rounded-lg bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-white"
                >
                  {status === "submitting" ? "Submitting..." : "Get beta invite"}
                </button>
              </div>
            </div>
          )}

          {status === "error" && (
            <p className="text-sm text-rose-600 dark:text-rose-400">
              {step === 1
                ? "Please enter a valid work email to continue."
                : "Something went wrong. Please try again."}
            </p>
          )}

          <p className="text-xs text-slate-400 dark:text-slate-500">
            No spam. Only product updates and invite details.
          </p>
        </form>
      </div>
    </section>
  );
}
