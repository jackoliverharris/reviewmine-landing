import Logo from "./Logo";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
  return (
    <header className="sticky top-0 z-30 bg-[color:var(--bg-main)] px-6 pt-5 pb-3">
      <nav className="max-w-6xl mx-auto flex items-center justify-between gap-4 rounded-xl border border-slate-200/70 bg-white/55 px-4 py-2.5 backdrop-blur-lg dark:border-slate-700/70 dark:bg-slate-900/45 sm:px-5">
        <Logo />
        <div className="flex items-center gap-2">
          <a
            href="#waitlist"
            className="hidden sm:inline-flex whitespace-nowrap rounded-md border border-slate-300/90 bg-white/80 px-2.5 py-2 text-[11px] font-semibold uppercase tracking-[0.1em] text-slate-700 transition hover:border-slate-500 hover:text-slate-900 dark:border-slate-600 dark:bg-slate-900/70 dark:text-slate-200 dark:hover:border-slate-400 dark:hover:text-white sm:px-3.5 sm:text-xs sm:tracking-[0.12em]"
          >
            Get beta invite
          </a>
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}
