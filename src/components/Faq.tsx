const faqs = [
  {
    question: "Is setup technical?",
    answer:
      "No. Connect your review sources and ReviewMine starts analyzing incoming reviews automatically.",
  },
  {
    question: "Which platforms are supported first?",
    answer:
      "Google, TripAdvisor, Airbnb, and Viator are in scope now. Booking.com and Expedia are on the roadmap.",
  },
  {
    question: "Will this replace my booking or CRM stack?",
    answer:
      "No. ReviewMine complements your existing tools by turning review text into actionable insights.",
  },
  {
    question: "Who is early access best for?",
    answer:
      "Tour and activity operators with existing review volume who want faster messaging and service insights.",
  },
  {
    question: "How much will it cost?",
    answer:
      "Pricing will be announced before public launch. Beta users get early access and direct input into plan design.",
  },
  {
    question: "How is this different from just using ChatGPT?",
    answer:
      "ChatGPT can help with one-off prompts, but ReviewMine gives you a repeatable workflow. It ingests incoming reviews continuously, tracks patterns over time, and turns insights into publish-ready proof blocks without restarting context every session.",
  },
];

export default function Faq() {
  return (
    <section className="px-6 py-12 md:py-14">
      <div className="max-w-3xl mx-auto">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400 text-center">
          FAQ
        </p>
        <h2 className="mt-3 text-center text-2xl md:text-3xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">
          Answers before you join the beta list.
        </h2>
        <div className="mt-7 space-y-3">
          {faqs.map((faq) => (
            <details
              key={faq.question}
              className="group rounded-xl border border-slate-200 bg-white/75 px-4 py-3 open:bg-white dark:border-slate-700 dark:bg-slate-900/60 dark:open:bg-slate-900/75"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-sm font-semibold text-slate-900 [&::-webkit-details-marker]:hidden dark:text-slate-100">
                <span>{faq.question}</span>
                <svg
                  viewBox="0 0 20 20"
                  className="h-5 w-5 text-slate-400 transition-transform duration-200 group-open:rotate-90 dark:text-slate-500"
                  aria-hidden="true"
                >
                  <path
                    d="M7 4.5 12.5 10 7 15.5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </summary>
              <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
