"use client";

import Image from "next/image";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";

const LIVE_SIGNAL_CYCLE_MS = 6200;
const LIVE_SIGNAL_FADE_MS = 700;

const demoReviews = [
  {
    review:
      "Best rafting day of our trip. Guides made nervous first-timers feel safe and we laughed nonstop.",
    testimonial: "Guides made first-timers feel safe.",
    objection: "Safety concerns for beginners",
    score: "Guide confidence: 9.4/10",
  },
  {
    review:
      "The canyon was unreal and our guide knew every story, but pickup instructions were hard to find.",
    testimonial: "The canyon was unreal.",
    objection: "Confusing pre-tour logistics",
    score: "Guide storytelling: 9.1/10",
  },
  {
    review:
      "Family with two teens. Team kept everyone engaged and even our picky son said he would do it again.",
    testimonial: "Even our picky son would do it again.",
    objection: "Unsure if it fits mixed-age groups",
    score: "Family fit signal: 9.7/10",
  },
];

type DemoReview = (typeof demoReviews)[number];

function LiveSignalSnapshot({ demo }: { demo: DemoReview }) {
  return (
    <>
      <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm leading-relaxed text-slate-700 dark:border-slate-700 dark:bg-slate-950/60 dark:text-slate-200">
        <p>{demo.review}</p>
      </div>

      <div className="mt-4 space-y-2.5 text-sm">
        <div className="rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-emerald-900 dark:border-emerald-700/50 dark:bg-emerald-900/20 dark:text-emerald-200">
          <span className="font-semibold">Testimonial:</span> {demo.testimonial}
        </div>
        <div className="rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-amber-900 dark:border-amber-700/50 dark:bg-amber-900/20 dark:text-amber-200">
          <span className="font-semibold">Objection found:</span> {demo.objection}
        </div>
        <div className="rounded-lg border border-cyan-200 bg-cyan-50 px-3 py-2 text-cyan-900 dark:border-cyan-700/50 dark:bg-cyan-900/20 dark:text-cyan-200">
          <span className="font-semibold">Performance signal:</span> {demo.score}
        </div>
      </div>
    </>
  );
}

export default function Hero() {
  const [slotIndexes, setSlotIndexes] = useState<[number, number]>([0, 1]);
  const [activeSlot, setActiveSlot] = useState<0 | 1>(0);
  const [targetSlot, setTargetSlot] = useState<0 | 1 | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [fadeStarted, setFadeStarted] = useState(false);
  const [containerHeight, setContainerHeight] = useState<number | null>(null);

  const slotARef = useRef<HTMLDivElement>(null);
  const slotBRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number | null>(null);
  const transitionTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const activeIndexRef = useRef(0);
  const activeSlotRef = useRef<0 | 1>(0);
  const pendingIndexRef = useRef(1);
  const isTransitioningRef = useRef(false);

  const measureSlotHeight = useCallback((slot: 0 | 1) => {
    const node = slot === 0 ? slotARef.current : slotBRef.current;
    if (!node) {
      return;
    }

    // Layers are absolutely positioned; scrollHeight captures intrinsic content height.
    const nextHeight = Math.ceil(node.scrollHeight || node.offsetHeight);
    if (nextHeight > 0) {
      setContainerHeight((prev) => (prev === nextHeight ? prev : nextHeight));
    }
  }, []);

  const startTransition = useCallback(() => {
    if (isTransitioningRef.current) {
      return;
    }

    const outgoingSlot = activeSlotRef.current;
    const incomingSlot: 0 | 1 = outgoingSlot === 0 ? 1 : 0;
    const nextIndex = (activeIndexRef.current + 1) % demoReviews.length;

    pendingIndexRef.current = nextIndex;
    isTransitioningRef.current = true;

    setSlotIndexes((prev) => {
      const next: [number, number] = [prev[0], prev[1]];
      next[incomingSlot] = nextIndex;
      return next;
    });
    setTargetSlot(incomingSlot);
    setFadeStarted(false);
    setIsTransitioning(true);
  }, []);

  useEffect(() => {
    const cycleTimer = setInterval(startTransition, LIVE_SIGNAL_CYCLE_MS);

    return () => {
      clearInterval(cycleTimer);
      if (frameRef.current !== null) {
        cancelAnimationFrame(frameRef.current);
      }
      if (transitionTimerRef.current) {
        clearTimeout(transitionTimerRef.current);
      }
    };
  }, [startTransition]);

  useEffect(() => {
    if (!isTransitioning || targetSlot === null) {
      return;
    }

    if (frameRef.current !== null) {
      cancelAnimationFrame(frameRef.current);
    }
    if (transitionTimerRef.current) {
      clearTimeout(transitionTimerRef.current);
    }

    frameRef.current = requestAnimationFrame(() => {
      measureSlotHeight(targetSlot);
      setFadeStarted(true);
    });

    transitionTimerRef.current = setTimeout(() => {
      const nextIndex = pendingIndexRef.current;
      const resolvedTarget = targetSlot;
      const hiddenSlot: 0 | 1 = resolvedTarget === 0 ? 1 : 0;
      const preloadIndex = (nextIndex + 1) % demoReviews.length;

      activeIndexRef.current = nextIndex;
      activeSlotRef.current = resolvedTarget;
      setActiveSlot(resolvedTarget);
      setIsTransitioning(false);
      setFadeStarted(false);
      setTargetSlot(null);
      setSlotIndexes((prev) => {
        const next: [number, number] = [prev[0], prev[1]];
        next[hiddenSlot] = preloadIndex;
        return next;
      });
      isTransitioningRef.current = false;

      frameRef.current = requestAnimationFrame(() => {
        measureSlotHeight(resolvedTarget);
      });
    }, LIVE_SIGNAL_FADE_MS);

    return () => {
      if (frameRef.current !== null) {
        cancelAnimationFrame(frameRef.current);
      }
      if (transitionTimerRef.current) {
        clearTimeout(transitionTimerRef.current);
      }
    };
  }, [isTransitioning, measureSlotHeight, targetSlot]);

  useLayoutEffect(() => {
    measureSlotHeight(activeSlotRef.current);
  }, [measureSlotHeight]);

  useEffect(() => {
    const onResize = () => {
      measureSlotHeight(activeSlotRef.current);
    };

    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, [measureSlotHeight]);

  const getSlotOpacity = (slot: 0 | 1) => {
    if (!isTransitioning || targetSlot === null) {
      return slot === activeSlot ? 1 : 0;
    }
    if (!fadeStarted) {
      return slot === activeSlot ? 1 : 0;
    }
    return slot === targetSlot ? 1 : 0;
  };

  const slotADemo = demoReviews[slotIndexes[0]];
  const slotBDemo = demoReviews[slotIndexes[1]];

  return (
    <section className="px-6 pt-16 pb-9 md:pt-24 md:pb-12">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">
            Live review intelligence for tour and activity operators
          </p>
          <h1 className="mt-5 text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.05] text-slate-900 dark:text-slate-100">
            Turn guest reviews into booking gold.
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-slate-600 dark:text-slate-300 max-w-xl">
            Pull the exact testimonials that convert, surface hidden objections,
            and spot your best guides in one clear workflow.
          </p>
          <p className="mt-4 text-sm font-medium text-slate-600 dark:text-slate-300">
            Save an estimated 3-5 hours a week on review analysis.
          </p>
          <p className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-slate-600 dark:text-slate-300">
            <span className="inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            60+ tour and activity operators already on the beta list
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <a
              href="#waitlist"
              className="inline-flex items-center rounded-lg bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-white"
            >
              Get beta invite
            </a>
            <a
              href="#features"
              className="inline-flex items-center rounded-lg border border-slate-300 bg-white/80 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:text-slate-900 dark:border-slate-700 dark:bg-slate-900/60 dark:text-slate-200 dark:hover:border-slate-500"
            >
              See how it works
            </a>
          </div>
          <div className="mt-4 flex max-w-xl items-center gap-3 text-sm text-slate-500 dark:text-slate-400">
            <span className="inline-flex h-10 w-10 shrink-0 overflow-hidden rounded-full border border-slate-200/80 bg-white dark:border-slate-700 dark:bg-slate-900">
              <Image
                src="/founder/jack-harris.png"
                alt="Jack Harris"
                width={40}
                height={40}
                className="h-full w-full object-cover"
              />
            </span>
            <p>
              Built by Jack Harris: 15 years running premium London tours, 75,000+
              pax hosted, and a 4.9-star average rating.
            </p>
          </div>
        </div>

        <div className="relative">
          <div className="pointer-events-none absolute -inset-2 rounded-3xl bg-gradient-to-br from-amber-300/30 via-cyan-300/20 to-fuchsia-300/20 blur-2xl dark:from-amber-500/10 dark:via-cyan-500/10 dark:to-fuchsia-500/10" />
          <div className="relative rounded-2xl border border-slate-200/80 bg-white/90 backdrop-blur p-5 shadow-[0_18px_60px_-28px_rgba(15,23,42,0.5)] dark:border-slate-700 dark:bg-slate-900/80">
            <div className="flex items-center justify-between">
              <p className="text-xs font-semibold tracking-[0.14em] uppercase text-slate-500 dark:text-slate-400">
                ReviewMine Live Signal
              </p>
              <span className="live-signal-dot inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
            </div>

            <div
              className="mt-4 relative overflow-hidden transition-[height] duration-700 ease-in-out"
              style={{ height: `${containerHeight ?? 232}px` }}
            >
              <div
                ref={slotARef}
                className="absolute inset-0 transition-opacity duration-700 ease-in-out"
                style={{ opacity: getSlotOpacity(0) }}
              >
                <LiveSignalSnapshot demo={slotADemo} />
              </div>

              <div
                ref={slotBRef}
                className="absolute inset-0 transition-opacity duration-700 ease-in-out"
                style={{ opacity: getSlotOpacity(1) }}
              >
                <LiveSignalSnapshot demo={slotBDemo} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
