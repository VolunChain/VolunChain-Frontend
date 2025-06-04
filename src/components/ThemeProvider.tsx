import { useEffect } from "react";
import { useThemeStore } from "@/store/useThemeStore";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { theme, setTheme } = useThemeStore();

  useEffect(() => {
    // Check if theme exists in localStorage, otherwise use system preference
    const isDarkMode = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    const storedTheme = localStorage.getItem("theme-storage");

    if (!storedTheme) {
      setTheme(isDarkMode ? "dark" : "light");
    }

    // Update document class for Tailwind dark mode
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(theme);
  }, [theme, setTheme]);

  return <>{children}</>;
}
