import Image from "next/image";

const platforms = [
  { name: "Google", src: "/logos/google.svg", width: 92, height: 32, comingSoon: false },
  {
    name: "TripAdvisor",
    src: "/logos/tripadvisor.svg",
    darkSrc: "/logos/tripadvisor-dark.svg",
    width: 132,
    height: 32,
    comingSoon: false,
  },
  { name: "Airbnb", src: "/logos/airbnb.svg", width: 96, height: 32, comingSoon: false },
  { name: "Viator", src: "/logos/viator.svg", width: 112, height: 32, comingSoon: false },
  {
    name: "Booking.com",
    src: "/logos/booking-com.svg",
    darkSrc: "/logos/booking-com-dark.svg",
    width: 124,
    height: 32,
    comingSoon: true,
  },
  {
    name: "Expedia",
    src: "/logos/expedia.svg",
    darkSrc: "/logos/expedia-dark.svg",
    width: 108,
    height: 32,
    comingSoon: true,
  },
];

export default function ReviewSignalsStrip() {
  return (
    <section className="px-6 py-6 md:py-8">
      <div className="max-w-6xl mx-auto border-y border-slate-200/70 py-5 dark:border-slate-700/70">
        <p className="text-center text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-600 dark:text-slate-300">
          Works with reviews from
        </p>

        <div className="mt-3 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {platforms.map((platform) => (
            <div
              key={platform.name}
              className={`flex flex-col items-center ${platform.comingSoon ? "opacity-45" : ""}`}
            >
              <div className="flex h-7 w-full items-center justify-center">
                <Image
                  src={platform.src}
                  alt={platform.name}
                  width={platform.width}
                  height={platform.height}
                  className={`h-6 w-auto max-w-[124px] object-contain ${
                    platform.darkSrc ? "dark:hidden" : ""
                  } ${platform.comingSoon ? "grayscale" : ""}`}
                />
                {platform.darkSrc && (
                  <Image
                    src={platform.darkSrc}
                    alt={platform.name}
                    width={platform.width}
                    height={platform.height}
                    className={`hidden h-6 w-auto max-w-[124px] object-contain dark:block ${
                      platform.comingSoon ? "grayscale" : ""
                    }`}
                  />
                )}
              </div>
              <div className="mt-1 h-3">
                {platform.comingSoon && (
                  <span className="text-[9px] font-semibold uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">
                    Coming soon
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
