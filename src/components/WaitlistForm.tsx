"use client";

import { useState, FormEvent } from "react";

const reviewCountOptions = [
  { value: "under-1000", label: "Under 1,000" },
  { value: "1000-5000", label: "1,000–5,000" },
  { value: "5000-10000", label: "5,000–10,000" },
  { value: "10000-plus", label: "10,000+" },
];

export default function WaitlistForm() {
  const [email, setEmail] = useState("");
  const [reviewCount, setReviewCount] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("submitting");

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, reviewCount }),
      });

      if (!response.ok) {
        throw new Error("Subscription failed");
      }

      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <section className="px-6 py-16">
        <div className="max-w-xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-teal-50 dark:bg-teal-900/30 mb-6">
            <svg
              className="w-8 h-8 text-teal-600 dark:text-teal-400"
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
          <h2 className="text-2xl font-light tracking-tight text-gray-900 dark:text-gray-100">
            You&apos;re on the list
          </h2>
          <p className="mt-2 text-base text-gray-600 dark:text-gray-400">
            I&apos;ll be in touch soon.
          </p>
          <a
            href="https://www.linkedin.com/in/jackoliverharris"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-4 text-sm text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 transition-colors"
          >
            Follow the build on LinkedIn →
          </a>
        </div>
      </section>
    );
  }

  return (
    <section className="px-6 py-16">
      <div className="max-w-xl mx-auto text-center">
        <h2 className="text-2xl font-light tracking-tight text-gray-900 dark:text-gray-100">
          Request early access
        </h2>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div>
            <p className="text-sm text-gray-400 dark:text-gray-500 mb-3 text-center">
              Beta launching February
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
              className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900/10 focus:border-gray-300 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-100 dark:placeholder-gray-500 dark:focus:ring-gray-100/10"
            />
          </div>

          <div>
            <fieldset>
              <p className="text-xs text-gray-400 dark:text-gray-500 mb-2 text-center">
                The more reviews you have, the more patterns you&apos;re missing.
              </p>
              <legend className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                How many reviews do you have?
              </legend>
              <div className="grid grid-cols-2 gap-3">
                {reviewCountOptions.map((option) => (
                  <label
                    key={option.value}
                    className={`
                      relative flex items-center justify-center px-3 py-2.5 rounded-lg border text-sm cursor-pointer transition-colors
                      ${
                        reviewCount === option.value
                          ? "border-gray-900 text-gray-900 font-medium dark:border-gray-100 dark:text-gray-100"
                          : "border-gray-200 text-gray-500 hover:border-gray-300 dark:border-gray-700 dark:text-gray-400 dark:hover:border-gray-600"
                      }
                    `}
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
            </fieldset>
          </div>

          <div>
            <button
              type="submit"
              disabled={status === "submitting" || !reviewCount}
              className="w-full bg-gray-900 hover:bg-gray-800 text-white px-5 py-3 rounded-lg text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed dark:bg-gray-100 dark:text-gray-900 dark:hover:bg-gray-200"
            >
              {status === "submitting" ? "Requesting..." : "Get early access"}
            </button>
          </div>

          {status === "error" && (
            <p className="text-sm text-rose-600 dark:text-rose-400">
              Something went wrong. Please try again.
            </p>
          )}

          <p className="text-xs text-gray-400 dark:text-gray-500">
            No spam.
          </p>
        </form>
      </div>
    </section>
  );
}
