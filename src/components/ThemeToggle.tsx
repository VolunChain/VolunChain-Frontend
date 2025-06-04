import { useThemeStore } from "@/store/useThemeStore";
import { Sun, Moon } from "lucide-react";

export function ThemeToggle() {
  const { theme, toggleTheme } = useThemeStore();

  return (
    <button
      onClick={toggleTheme}
      className="relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:bg-gray-600 bg-gray-200"
      role="switch"
      aria-checked={theme === "dark"}
    >
      <span className="sr-only">Toggle theme</span>
      <span
        className={`${
          theme === "dark" ? "translate-x-6" : "translate-x-1"
        } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
      />
      <Sun
        className={`absolute left-1 h-4 w-4 text-yellow-500 transition-opacity ${
          theme === "dark" ? "opacity-0" : "opacity-100"
        }`}
      />
      <Moon
        className={`absolute right-1 h-4 w-4 text-gray-700 transition-opacity ${
          theme === "dark" ? "opacity-100" : "opacity-0"
        }`}
      />
    </button>
  );
}
