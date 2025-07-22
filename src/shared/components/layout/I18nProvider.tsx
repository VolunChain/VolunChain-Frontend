"use client";

import { useEffect, useState } from "react";
import { I18nextProvider } from "react-i18next";
import type { i18n } from "i18next";

interface I18nProviderProps {
  children: React.ReactNode;
}

type InitializationState = "loading" | "success" | "error" | "ssr";

export default function I18nProvider({ children }: I18nProviderProps) {
  const [i18nInstance, setI18nInstance] = useState<i18n | null>(null);
  const [initState, setInitState] = useState<InitializationState>("loading");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initializeI18n = async () => {
      if (typeof window === "undefined") {
        setInitState("ssr");
        return;
      }

      try {
        setInitState("loading");
        const { initI18n } = await import("@/i18n");
        const instance = await initI18n();

        if (instance) {
          setI18nInstance(instance);
          setInitState("success");
          console.log("i18n provider ready");
        } else {
          throw new Error("Failed to create i18n instance");
        }
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : "Unknown error occurred";
        console.error("Failed to initialize i18n:", error);
        setError(errorMessage);
        setInitState("error");
      }
    };

    initializeI18n();
  }, []);

  // Server-side rendering - render without i18n
  if (initState === "ssr") {
    return <>{children}</>;
  }

  // Loading state
  if (initState === "loading") {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-secondary mx-auto mb-4"></div>
          <div className="dark:text-white text-lg">Loading translations...</div>
          <div className="text-gray-400 text-sm mt-2">
            Preparing the application
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (initState === "error") {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="text-center max-w-md mx-auto p-6">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="dark:text-white text-xl font-semibold mb-2">
            Translation System Error
          </h2>
          <p className="dark:text-white text-gray-600 mb-4">
            Failed to load the language system. The application may not display
            text correctly.
          </p>
          <div className="text-red-400 text-sm mb-4 p-3 bg-red-900/20 rounded border border-red-500/30">
            Error: {error}
          </div>
          <button
            onClick={() => window.location.reload()}
            className="bg-secondary hover:bg-secondary/80 dark:text-white px-6 py-2 rounded-lg transition-colors"
          >
            Reload Application
          </button>
          <p className="text-gray-400 text-xs mt-3">
            If this error persists, please check your internet connection or
            contact support.
          </p>
        </div>
      </div>
    );
  }

  // Success state - render with i18n
  if (initState === "success" && i18nInstance) {
    return <I18nextProvider i18n={i18nInstance}>{children}</I18nextProvider>;
  }

  // Fallback state (should not reach here)
  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <div className="text-center">
        <div className="text-yellow-500 text-6xl mb-4">⚠️</div>
        <div className="dark:text-white text-lg">Unexpected State</div>
        <div className="text-gray-400 text-sm mt-2">
          Please reload the application
        </div>
      </div>
    </div>
  );
}
