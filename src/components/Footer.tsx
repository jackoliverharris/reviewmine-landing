export default function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 px-6 py-8">
      <div className="max-w-6xl mx-auto text-center text-sm text-gray-400 dark:text-gray-500">
        <p>
          &copy; 2026 ReviewMine &middot;{" "}
          <a href="/terms" className="hover:text-gray-600 dark:hover:text-gray-400">
            Terms
          </a>{" "}
          &middot;{" "}
          <a href="/privacy" className="hover:text-gray-600 dark:hover:text-gray-400">
            Privacy
          </a>
        </p>
      </div>
    </footer>
  );
}
