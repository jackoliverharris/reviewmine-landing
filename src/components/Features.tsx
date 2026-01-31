const features = [
  {
    title: "Objection mapping",
    description:
      "Know which booking fear your reviews don't answer — then fix it.",
  },
  {
    title: "Testimonial extraction",
    description:
      "Find the testimonial that belongs on your homepage, not buried on page 47 of TripAdvisor.",
  },
  {
    title: "Guide performance",
    description:
      "See who's creating superfans — and who needs coaching — without reading every review.",
  },
  {
    title: "Pattern detection",
    description: "Spot the pattern after 5 reviews, not 500.",
  },
];

export default function Features() {
  return (
    <section className="px-6 py-16">
      <div className="max-w-6xl mx-auto">
        <p className="text-sm font-medium tracking-wide uppercase text-gray-500 dark:text-gray-400 text-center mb-10">
          Built for operators who want to run better tours, not just collect more stars
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm dark:bg-gray-800 dark:border-gray-700"
            >
              <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                {feature.title}
              </h3>
              <p className="mt-2 text-base font-normal leading-relaxed text-gray-600 dark:text-gray-400">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Founder Quote */}
        <div className="mt-16 mb-8 text-center max-w-2xl mx-auto">
          <p className="text-lg italic text-gray-600 dark:text-gray-400 leading-relaxed">
            &quot;Every time I needed a testimonial, I&apos;d export reviews to Excel, paste batches into ChatGPT, hit the context limit, and start again.&quot;
          </p>
          <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
            — Jack Harris, tour operator since 2011
          </p>
        </div>
      </div>
    </section>
  );
}
