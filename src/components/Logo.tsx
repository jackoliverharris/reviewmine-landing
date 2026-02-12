import Link from "next/link";

interface LogoProps {
  className?: string;
  iconSize?: "sm" | "md" | "lg";
}

const sizeClasses = {
  sm: "w-6 h-6",
  md: "w-8 h-8",
  lg: "w-10 h-10",
};

export default function Logo({ className = "", iconSize = "md" }: LogoProps) {
  return (
    <Link
      href="/"
      className={`flex items-center gap-3.5 text-gray-800 dark:text-gray-100 ${className}`}
    >
      <svg
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={iconSize === "md" ? "w-9 h-9" : sizeClasses[iconSize]}
      >
        <path
          d="M7 17L16 21L16 27L7 22L7 17Z"
          fill="currentColor"
          opacity="0.9"
        />
        <path
          d="M25 17L16 21L16 27L25 22L25 17Z"
          fill="currentColor"
          opacity="0.7"
        />
        <path
          d="M9 12L16 5L23 12L16 14L9 12Z"
          fill="currentColor"
          opacity="0.5"
        />
      </svg>
      <span className="text-xl tracking-tight leading-none sm:text-2xl">
        <span className="font-normal">Review</span>
        <span className="font-bold">Mine</span>
      </span>
    </Link>
  );
}
