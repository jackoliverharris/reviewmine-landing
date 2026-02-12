"use client";

import { useEffect, useState } from "react";

export default function MobileStickyCta() {
  const [hideForWaitlist, setHideForWaitlist] = useState(false);

  useEffect(() => {
    const waitlist = document.getElementById("waitlist");
    if (!waitlist) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setHideForWaitlist(entry.isIntersecting);
      },
      {
        threshold: 0.05,
        rootMargin: "0px 0px -28% 0px",
      },
    );

    observer.observe(waitlist);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      className={`pointer-events-none fixed inset-x-0 bottom-0 z-40 px-4 pb-[calc(env(safe-area-inset-bottom)+0.75rem)] transition-[opacity,transform] duration-300 sm:hidden ${
        hideForWaitlist ? "translate-y-2 opacity-0" : "translate-y-0 opacity-100"
      }`}
    >
      <div className={`mx-auto max-w-md ${hideForWaitlist ? "pointer-events-none" : "pointer-events-auto"}`}>
        <a
          href="#waitlist"
          aria-hidden={hideForWaitlist}
          className="block w-full rounded-xl border border-slate-900/80 bg-slate-900 px-5 py-3 text-center text-sm font-semibold uppercase tracking-[0.12em] text-white shadow-[0_18px_40px_-24px_rgba(15,23,42,0.9)] transition hover:bg-slate-800 dark:border-slate-100/80 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-white"
        >
          Join the beta
        </a>
      </div>
    </div>
  );
}
