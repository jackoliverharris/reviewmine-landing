import Logo from "./Logo";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
  return (
    <header className="bg-white border-b border-gray-100 px-6 py-4 dark:bg-gray-900 dark:border-gray-800">
      <nav className="max-w-6xl mx-auto flex items-center justify-between">
        <Logo />
        <ThemeToggle />
      </nav>
    </header>
  );
}
