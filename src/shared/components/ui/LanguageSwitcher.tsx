"use client";

import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Globe } from "lucide-react";
import { useLanguage } from "@/shared/hooks/useLanguage";
import { languages, getLanguageByCode } from "@/shared/utils/languages";

export default function LanguageSwitcher() {
  const { i18n, t } = useTranslation();
  const { currentLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const currentLang = getLanguageByCode(currentLanguage);

  const handleLanguageChange = (languageCode: string) => {
    if (i18n && typeof i18n.changeLanguage === "function") {
      try {
        i18n.changeLanguage(languageCode);
      } catch (error) {
        console.warn("Failed to change language:", error);
      }
    }
    setIsOpen(false);
  };

  // Simple client-side check without state
  if (typeof window === "undefined") {
    // Return a fallback during SSR
    return (
      <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-background-primary border border-gray-700">
        <Globe size={16} className="text-secondary" />
        <span className="dark:text-white text-sm font-medium hidden sm:inline">
          English
        </span>
        <span className="dark:text-white text-sm font-medium sm:hidden">
          🇺🇸
        </span>
      </div>
    );
  }

  return (
    <div className="relative">
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-background-primary hover:bg-background-secondary transition-colors border border-gray-700 hover:border-secondary/50"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        aria-label={t("common.ariaLabels.languageSwitcher")}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <Globe size={16} className="text-secondary" />
        <span className="dark:text-white text-sm font-medium hidden sm:inline">
          {currentLang.name}
        </span>
        <span className="dark:text-white text-sm font-medium sm:hidden">
          {currentLang.flag}
        </span>
        <ChevronDown
          size={14}
          className={`text-gray-400 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <div
              className="fixed inset-0 z-10"
              onClick={() => setIsOpen(false)}
            />

            {/* Dropdown */}
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.15 }}
              className="absolute top-full left-0 mt-2 w-40 bg-background-primary border border-gray-700 rounded-lg shadow-xl z-20 overflow-hidden"
              role="listbox"
              aria-label={t("common.ariaLabels.languageSwitcher")}
            >
              {languages.map((language) => (
                <motion.button
                  key={language.code}
                  onClick={() => handleLanguageChange(language.code)}
                  className={`w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-background-secondary transition-colors ${
                    language.code === currentLanguage
                      ? "bg-secondary/10 text-secondary"
                      : "dark:text-white"
                  }`}
                  whileHover={{ x: 4 }}
                  role="option"
                  aria-selected={language.code === currentLanguage}
                  aria-label={t("common.ariaLabels.selectLanguage", {
                    language: language.name,
                  })}
                >
                  <span className="text-lg">{language.flag}</span>
                  <span className="text-sm font-medium">{language.name}</span>
                  {language.code === currentLanguage && (
                    <div className="ml-auto w-2 h-2 bg-secondary rounded-full" />
                  )}
                </motion.button>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
