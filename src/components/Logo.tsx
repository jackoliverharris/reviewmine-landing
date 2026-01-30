interface LogoProps {
  className?: string;
  iconSize?: "sm" | "md" | "lg";
}

const sizeClasses = {
  sm: "w-5 h-5",
  md: "w-6 h-6",
  lg: "w-8 h-8",
};

export default function Logo({ className = "", iconSize = "md" }: LogoProps) {
  return (
    <a
      href="/"
      className={`flex items-center gap-2.5 text-gray-800 dark:text-gray-100 ${className}`}
    >
      <svg
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={sizeClasses[iconSize]}
      >
        <path
          d="M7 17L16 21L16 27L7 22L7 17Z"
          fill="currentColor"
          opacity="0.85"
        />
        <path
          d="M25 17L16 21L16 27L25 22L25 17Z"
          fill="currentColor"
          opacity="0.6"
        />
        <path
          d="M9 12L16 5L23 12L16 14L9 12Z"
          fill="currentColor"
          opacity="0.7"
        />
      </svg>
      <span className="text-base tracking-tight">
        <span className="font-normal">Review</span>
        <span className="font-semibold">Mine</span>
      </span>
    </a>
  );
}
