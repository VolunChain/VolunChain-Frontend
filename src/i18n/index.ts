import i18n, { type i18n as I18nType } from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import en from "@/shared/utils/locales/en.json";
import es from "@/shared/utils/locales/es.json";

export async function initI18n(): Promise<I18nType> {
  if (!i18n.isInitialized) {
    await i18n
      .use(LanguageDetector)
      .use(initReactI18next)
      .init({
        resources: {
          en: { translation: en },
          es: { translation: es },
        },
        fallbackLng: "en",
        supportedLngs: ["en", "es"],
        interpolation: {
          escapeValue: false,
        },
        detection: {
          order: ["localStorage", "navigator", "htmlTag"],
          caches: ["localStorage"],
        },
        react: {
          useSuspense: false,
        },
      });
  }
  return i18n;
}
