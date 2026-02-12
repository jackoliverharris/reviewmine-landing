import type { ReactElement } from "react";

type Profile = {
  title: string;
  description: string;
  outcome: string;
  accent: string;
  iconClass: string;
  icon: ReactElement;
};

const profiles: Profile[] = [
  {
    title: "Owner-operators",
    description:
      "You handle marketing, ops, and delivery. You need review insights fast without learning another complex tool.",
    outcome: "Get your first actionable signals within 24 hours of connecting.",
    accent: "border-t-sky-300 dark:border-t-sky-500/70",
    iconClass: "text-sky-700 bg-sky-100 dark:text-sky-300 dark:bg-sky-900/40",
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden="true">
        <path
          d="M12 3a8 8 0 1 0 0 16 8 8 0 0 0 0-16Zm0 0v3m0 13v2m-9-9h3m13 0h2m-3.2-5.8-2.1 2.1m-7.4 7.4-1.4 1.4m0-10.9 2.1 2.1m7.4 7.4 1.4 1.4"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    title: "Multi-guide tour teams",
    description:
      "You want to see which guides create the best guest outcomes and where coaching can improve consistency.",
    outcome: "See 5-star velocity per guide updated weekly.",
    accent: "border-t-emerald-300 dark:border-t-emerald-500/70",
    iconClass: "text-emerald-700 bg-emerald-100 dark:text-emerald-300 dark:bg-emerald-900/40",
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden="true">
        <path
          d="M4 19h16M7 15l2-2 3 2 5-6"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="9" cy="13" r="1" fill="currentColor" />
        <circle cx="12" cy="15" r="1" fill="currentColor" />
        <circle cx="17" cy="9" r="1" fill="currentColor" />
      </svg>
    ),
  },
  {
    title: "Growth-stage brands",
    description:
      "You already have review volume and want to turn it into better messaging, stronger conversion, and better retention.",
    outcome: "Deploy conversion-ready testimonial widgets to your booking pages.",
    accent: "border-t-violet-300 dark:border-t-violet-500/70",
    iconClass: "text-violet-700 bg-violet-100 dark:text-violet-300 dark:bg-violet-900/40",
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden="true">
        <path
          d="M4 6h16M8 6v12m8-12v12M4 18h16M11 11h2m-1-1v2"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
];

export default function WhoIsThisFor() {
  return (
    <section className="px-6 py-14 md:py-16">
      <div className="max-w-6xl mx-auto">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400 text-center">
          Who is this for?
        </p>
        <h2 className="mt-3 text-center text-3xl md:text-4xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">
          Built for tour and activity operators with real review volume.
        </h2>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          {profiles.map((profile) => (
            <article
              key={profile.title}
              className={`group rounded-2xl border border-slate-200 border-t-4 bg-white/85 p-5 shadow-[0_14px_45px_-40px_rgba(15,23,42,0.65)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_20px_55px_-35px_rgba(15,23,42,0.75)] dark:border-slate-700 dark:bg-slate-900/60 ${profile.accent}`}
            >
              <div
                className={`inline-flex h-8 w-8 items-center justify-center rounded-full ${profile.iconClass}`}
              >
                {profile.icon}
              </div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                {profile.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                {profile.description}
              </p>
              <p className="mt-4 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-medium text-slate-700 dark:border-slate-700 dark:bg-slate-950/60 dark:text-slate-200">
                {profile.outcome}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
