"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

type VelocityRow = {
  guide: string;
  ratio: number;
  tours: number;
  trend: number[];
};

type Feature = {
  title: string;
  before: string;
  after: string;
  mockTitle: string;
  mockTags: string[];
  mockSignal: string;
  preview: "default" | "widget" | "velocity";
  series?: number[];
  velocityRows?: VelocityRow[];
};

const features: Feature[] = [
  {
    title: "Objection mapping",
    before: "Guessing what holds back bookings based on hunches.",
    after:
      "Know the exact hesitations you need to address before a guest clicks 'Book now.'",
    mockTitle: "Top objections this week",
    mockTags: ["First-time safety", "Cancellation policy", "Value for money"],
    mockSignal: "Most common concern: 'Is this suitable for beginners?'",
    preview: "default",
    series: [8, 10, 9, 12, 11, 14, 13],
  },
  {
    title: "Testimonial extraction",
    before: "Digging through spreadsheets and tabs to find one usable quote.",
    after:
      "Auto-group your strongest testimonials into collections and publish ready-to-go proof blocks onto your site.",
    mockTitle: "Collections ready to deploy",
    mockTags: [
      "Homepage trust block",
      "Family tour social proof",
      "Checkout reassurance widget",
    ],
    mockSignal:
      "Publish your strongest conversion-ready testimonial widgets to your booking pages in one click.",
    preview: "widget",
    series: [5, 6, 8, 7, 9, 10, 11],
  },
  {
    title: "Guide performance",
    before: "Performance conversations happen after complaints stack up.",
    after: "Track 5-star review velocity per guide so you can coach earlier.",
    mockTitle: "Guide 5-star velocity",
    mockTags: ["Guide A", "Guide B", "Guide C"],
    mockSignal: "Compare five-star reviews per 10 tours for each guide.",
    preview: "velocity",
    velocityRows: [
      { guide: "Guide A", ratio: 4.4, tours: 18, trend: [3.6, 3.8, 4.0, 4.1, 4.3, 4.4] },
      { guide: "Guide B", ratio: 3.6, tours: 16, trend: [2.9, 3.1, 3.0, 3.3, 3.4, 3.6] },
      { guide: "Guide C", ratio: 4.7, tours: 14, trend: [4.0, 4.2, 4.1, 4.4, 4.5, 4.7] },
    ],
    series: [9, 9, 10, 11, 10, 8, 7],
  },
  {
    title: "Pattern detection",
    before: "Patterns emerge only when someone has time to read hundreds of entries.",
    after: "Spot emerging patterns early after 5 reviews, not 500.",
    mockTitle: "Emerging pattern alert",
    mockTags: ["Pickup confusion", "Meeting point photos", "Pre-tour reminders"],
    mockSignal: "Pattern triggered after 6 mentions in 48 hours.",
    preview: "default",
    series: [4, 5, 5, 6, 8, 11, 13],
  },
];

const howItWorksSteps = [
  {
    number: 1,
    title: "Connect",
    description: "Link your review sources once and start pulling fresh feedback automatically.",
    type: "connect" as const,
  },
  {
    number: 2,
    title: "Analyze",
    description: "ReviewMine reads every review and extracts proof, objections, and patterns.",
    type: "analyze" as const,
  },
  {
    number: 3,
    title: "Deploy",
    description:
      "Publish the testimonials most likely to convert browsers into bookers right on your booking pages.",
    type: "deploy" as const,
  },
];

const connectPlatforms = [
  { name: "Google", src: "/logos/google.svg", width: 24, height: 12 },
  { name: "TripAdvisor", src: "/logos/tripadvisor.svg", width: 42, height: 12 },
  { name: "Airbnb", src: "/logos/airbnb.svg", width: 28, height: 12 },
  { name: "Viator", src: "/logos/viator.svg", width: 30, height: 12 },
];

const oldWaySteps = [
  "Manually export and sort reviews in spreadsheets",
  "Paste batches into ChatGPT and restart when context runs out",
  "Skip analysis entirely because there is no simple workflow",
  "Make marketing and staffing calls on gut feel",
];

const noMoreLines = [
  "No more spreadsheet exports.",
  "No more context-limit restarts.",
  "No more skipped analysis.",
  "No more gut-feel staffing and marketing calls.",
];

function sparklinePoints(series: number[]) {
  const max = Math.max(...series);

  return series
    .map((value, index) => {
      const x = (index / (series.length - 1)) * 100;
      const y = 30 - (value / max) * 24;
      return `${x},${y}`;
    })
    .join(" ");
}

function miniLinePoints(series: number[]) {
  const max = Math.max(...series);
  const min = Math.min(...series);
  const range = max - min || 1;

  return series
    .map((value, index) => {
      const x = (index / (series.length - 1)) * 48;
      const y = 16 - ((value - min) / range) * 12;
      return `${x},${y}`;
    })
    .join(" ");
}

export function FeaturesSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  const activeFeature = features[activeIndex];
  const points = useMemo(
    () => sparklinePoints(activeFeature.series ?? [1, 2, 3]),
    [activeFeature.series]
  );

  return (
    <section id="features" className="px-6 pt-16 pb-16 md:pt-20 md:pb-20">
      <div className="max-w-6xl mx-auto">
        <p className="text-sm font-semibold tracking-[0.14em] uppercase text-slate-500 dark:text-slate-400 text-center">
          Built for tour and activity operators who want outcomes, not dashboards
        </p>
        <h2 className="mt-3 text-center text-3xl md:text-4xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">
          From review chaos to clear growth signals.
        </h2>
        <p className="mt-3 max-w-2xl mx-auto text-center text-base leading-relaxed text-slate-600 dark:text-slate-300">
          Start with the same reviews you already have. Leave with sharper messaging,
          faster decisions, and fewer missed signals.
        </p>

        <div className="mt-10 grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-6 items-start">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {features.map((feature, index) => {
              const isActive = activeIndex === index;

              return (
                <button
                  key={feature.title}
                  type="button"
                  onMouseEnter={() => setActiveIndex(index)}
                  onFocus={() => setActiveIndex(index)}
                  onClick={() => setActiveIndex(index)}
                  className={`text-left rounded-2xl border p-6 transition-all duration-500 ease-out ${
                    isActive
                      ? "border-slate-900 bg-slate-900 text-slate-100 shadow-xl shadow-slate-900/15 dark:border-slate-100 dark:bg-slate-100 dark:text-slate-900"
                      : "border-slate-200 bg-white/75 text-slate-800 hover:border-slate-400 dark:border-slate-700 dark:bg-slate-900/60 dark:text-slate-200"
                  }`}
                  aria-pressed={isActive}
                >
                  <p className="text-lg font-semibold">{feature.title}</p>
                  <div className="mt-4 space-y-3">
                    <div
                      className={`rounded-lg border px-3 py-2 text-sm ${
                        isActive
                          ? "border-white/30 bg-white/10 dark:border-slate-700 dark:bg-slate-900/40"
                          : "border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-950/50"
                      }`}
                    >
                      <p className="text-xs uppercase tracking-[0.14em] font-semibold opacity-70">
                        Before
                      </p>
                      <p className="mt-1 leading-relaxed">{feature.before}</p>
                    </div>
                    <div
                      className={`rounded-lg border px-3 py-2 text-sm ${
                        isActive
                          ? "border-emerald-300/40 bg-emerald-300/10"
                          : "border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-900"
                      }`}
                    >
                      <p className="text-xs uppercase tracking-[0.14em] font-semibold opacity-80">
                        After
                      </p>
                      <p className="mt-1 leading-relaxed">{feature.after}</p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          <aside className="rounded-2xl border border-slate-200 bg-white/80 p-5 shadow-[0_14px_45px_-35px_rgba(15,23,42,0.85)] dark:border-slate-700 dark:bg-slate-900/70">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
              Companion preview
            </p>
            <h3 className="mt-2 text-xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">
              {activeFeature.mockTitle}
            </h3>

            {activeFeature.preview === "velocity" && activeFeature.velocityRows ? (
              <div className="mt-4 space-y-2.5">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">
                  5-star reviews per 10 tours
                </p>
                {activeFeature.velocityRows.map((row) => (
                  <div
                    key={row.guide}
                    className="rounded-md border border-slate-200 bg-white px-3 py-2 dark:border-slate-700 dark:bg-slate-900"
                  >
                    <div className="flex items-center justify-between text-sm text-slate-700 dark:text-slate-300">
                      <span className="font-semibold">{row.guide}</span>
                      <span>{row.ratio.toFixed(1)} / 10</span>
                    </div>
                    <div className="mt-1.5 h-1.5 rounded-full bg-slate-200 dark:bg-slate-700">
                      <span
                        className="block h-full rounded-full bg-emerald-500 transition-all duration-500"
                        style={{ width: `${(row.ratio / 5) * 100}%` }}
                      />
                    </div>
                    <div className="mt-1.5 flex items-center justify-between">
                      <span className="text-[11px] text-slate-500 dark:text-slate-400">
                        {row.tours} tours delivered
                      </span>
                      <svg viewBox="0 0 48 16" className="h-4 w-14" aria-hidden="true">
                        <polyline
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          points={miniLinePoints(row.trend)}
                          className="text-emerald-500"
                        />
                      </svg>
                    </div>
                  </div>
                ))}
              </div>
            ) : activeFeature.preview === "widget" ? (
              <div className="mt-4 space-y-2.5">
                <div className="rounded-md border border-slate-200 bg-white px-3 py-2 dark:border-slate-700 dark:bg-slate-900">
                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">
                    Testimonial collections
                  </p>
                  <div className="mt-2 space-y-1.5">
                    {activeFeature.mockTags.map((tag) => (
                      <p
                        key={tag}
                        className="rounded border border-slate-200 bg-slate-50 px-2 py-1 text-sm text-slate-700 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-300"
                      >
                        {tag}
                      </p>
                    ))}
                  </div>
                </div>
                <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  {activeFeature.mockSignal}
                </p>
                <div className="rounded-md border border-slate-200 bg-slate-950 px-3 py-2 text-[11px] text-emerald-300 dark:border-slate-700">
                  {"<script src=\"reviewmine-widget.js\" data-collection=\"homepage-trust\"></script>"}
                </div>
              </div>
            ) : (
              <>
                <div className="mt-4 rounded-lg border border-slate-200 bg-slate-50/90 p-3 dark:border-slate-700 dark:bg-slate-950/60">
                  <svg viewBox="0 0 100 30" className="h-12 w-full" aria-hidden="true">
                    <polyline
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      points={points}
                      className="text-emerald-500"
                    />
                  </svg>
                </div>

                <div className="mt-4 space-y-2">
                  {activeFeature.mockTags.map((tag) => (
                    <p
                      key={tag}
                      className="rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300"
                    >
                      {tag}
                    </p>
                  ))}
                </div>

                <p className="mt-4 text-sm font-medium text-slate-700 dark:text-slate-300">
                  {activeFeature.mockSignal}
                </p>
              </>
            )}
          </aside>
        </div>
      </div>
    </section>
  );
}

export function HowItWorksSection() {
  return (
    <section className="px-6 py-16 md:py-20">
      <div className="max-w-6xl mx-auto">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400 text-center">
          How it works
        </p>
        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-[1fr_auto_1fr_auto_1fr] md:items-stretch md:gap-0">
          {howItWorksSteps.map((step, index) => (
            <div key={step.title} className="contents">
              <article
                className={`rounded-xl border p-6 ${
                  step.type === "deploy"
                    ? "border-emerald-300 bg-emerald-50/50 dark:border-emerald-700/60 dark:bg-emerald-900/20"
                    : "border-slate-200 bg-white/60 dark:border-slate-700 dark:bg-slate-900/40"
                }`}
              >
                <div className="h-12 w-12 rounded-full border-2 border-[color:var(--bg-secondary)] bg-white grid place-items-center text-base font-semibold text-slate-800 dark:border-[color:color-mix(in_oklab,var(--bg-secondary)_35%,#2dd4bf)] dark:bg-slate-900 dark:text-slate-100">
                  {step.number}
                </div>
                <h3 className="mt-4 text-lg font-bold text-slate-900 dark:text-slate-100">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                  {step.description}
                </p>
                {step.type === "connect" && (
                  <div className="mt-4 flex flex-wrap items-center gap-1.5">
                    {connectPlatforms.map((platform) => (
                      <span
                        key={platform.name}
                        className="inline-flex h-6 items-center rounded-md border border-slate-200 bg-white/90 px-1.5 dark:border-slate-700 dark:bg-slate-900/70"
                      >
                        <Image
                          src={platform.src}
                          alt={platform.name}
                          width={platform.width}
                          height={platform.height}
                          className="h-3 w-auto object-contain"
                        />
                      </span>
                    ))}
                  </div>
                )}
                {step.type === "analyze" && (
                  <div className="mt-4 inline-flex items-center gap-2 rounded-md border border-slate-200 bg-white/90 px-2.5 py-1.5 text-xs font-medium text-slate-600 dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-300">
                    <svg viewBox="0 0 20 20" className="h-3.5 w-3.5 text-emerald-600" aria-hidden="true">
                      <path
                        d="M10 2.5 11.9 7l4.6 1.9-4.6 1.9L10 15.5l-1.9-4.7L3.5 8.9 8.1 7 10 2.5Zm5.5 10.5.9 2.1 2.1.9-2.1.9-.9 2.1-.9-2.1-2.1-.9 2.1-.9.9-2.1Z"
                        fill="currentColor"
                      />
                    </svg>
                    Every review analyzed automatically, nothing missed
                  </div>
                )}
                {step.type === "deploy" && (
                  <div className="mt-4 inline-flex items-center gap-2 rounded-md border border-emerald-300 bg-white/80 px-2.5 py-1.5 text-xs font-medium text-emerald-800 dark:border-emerald-700/60 dark:bg-emerald-900/25 dark:text-emerald-200">
                    <svg viewBox="0 0 20 20" className="h-3.5 w-3.5" aria-hidden="true">
                      <path
                        d="M12.5 3.5h4v4m0-4-6.1 6.1M8 4.5H6.4A1.9 1.9 0 0 0 4.5 6.4v7.2a1.9 1.9 0 0 0 1.9 1.9h7.2a1.9 1.9 0 0 0 1.9-1.9V12"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    One click to add testimonial widgets to your site
                  </div>
                )}
              </article>
              {index < howItWorksSteps.length - 1 && (
                <div
                  className="mx-auto h-6 w-px border-l-2 border-dashed border-slate-300 dark:border-slate-600 md:mx-4 md:h-px md:w-14 md:self-center md:border-l-0 md:border-t-2"
                  aria-hidden="true"
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function OldWayComparisonSection() {
  const [workflowStep, setWorkflowStep] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setWorkflowStep((prev) => (prev + 1) % (oldWaySteps.length + 1));
    }, 1700);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="px-6 pt-16 pb-16 md:pt-20 md:pb-20">
      <div className="max-w-6xl mx-auto">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400 text-center">
          Old way vs ReviewMine way
        </p>
        <div className="mt-5 grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-5">
          <article className="rounded-2xl border border-slate-200 bg-white/75 p-6 dark:border-slate-700 dark:bg-slate-900/60">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
              The old way
            </p>
            <h3 className="mt-2 text-xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">
              Manual busywork or no review analysis at all.
            </h3>
            <div className="mt-5 space-y-2.5">
              {oldWaySteps.map((step, index) => {
                const isCurrent = workflowStep === index;
                const isComplete = workflowStep > index || workflowStep === oldWaySteps.length;

                return (
                  <div
                    key={step}
                    className={`flex items-center gap-3 rounded-lg border px-3 py-2.5 text-sm transition-all duration-500 ${
                      isComplete
                        ? "border-rose-200 bg-rose-50/75 text-slate-500 dark:border-rose-700/30 dark:bg-rose-900/15 dark:text-slate-400"
                        : isCurrent
                          ? "border-amber-300 bg-amber-50 text-slate-900 dark:border-amber-400/40 dark:bg-amber-900/20 dark:text-slate-100"
                          : "border-slate-200 bg-white text-slate-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300"
                    }`}
                  >
                    <span
                      className={`grid h-5 w-5 place-items-center rounded-full text-[11px] font-bold ${
                        isComplete
                          ? "bg-rose-200 text-rose-700 dark:bg-rose-700/30 dark:text-rose-300"
                          : isCurrent
                            ? "bg-amber-200 text-amber-800 dark:bg-amber-700/40 dark:text-amber-300"
                            : "bg-slate-200 text-slate-500 dark:bg-slate-700 dark:text-slate-300"
                      }`}
                    >
                      {isComplete ? "x" : index + 1}
                    </span>
                    <span className={isComplete ? "line-through" : ""}>{step}</span>
                  </div>
                );
              })}
            </div>
          </article>

          <article className="rounded-2xl border border-emerald-200 bg-emerald-50/65 p-6 dark:border-emerald-700/40 dark:bg-emerald-900/15">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-emerald-700 dark:text-emerald-300">
              The ReviewMine way
            </p>
            <h3 className="mt-2 text-xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">
              Turn reviews into deployable proof and performance signals.
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
              Connect once. ReviewMine reads every new review, groups your strongest
              testimonials into collections, and surfaces guide performance signals your
              team can act on.
            </p>
            <div className="mt-4 space-y-2">
              {noMoreLines.map((line, index) => {
                const isRevealed = workflowStep > index || workflowStep === oldWaySteps.length;

                return (
                  <p
                    key={line}
                    className={`text-sm transition-all duration-500 ${
                      isRevealed
                        ? "opacity-100 text-emerald-800 dark:text-emerald-200"
                        : "opacity-45 text-slate-500 dark:text-slate-400"
                    }`}
                  >
                    {line}
                  </p>
                );
              })}
            </div>
            <p
              className={`mt-5 text-sm font-semibold transition-opacity duration-500 ${
                workflowStep === oldWaySteps.length ? "opacity-100" : "opacity-55"
              } text-slate-800 dark:text-slate-100`}
            >
              One system. Clear signals. Faster growth.
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}

export default function Features() {
  return (
    <>
      <FeaturesSection />
      <HowItWorksSection />
      <OldWayComparisonSection />
    </>
  );
}
