// Client-side only i18n configuration
import type { i18n } from 'i18next';
import { getSupportedLanguageCodes, defaultLanguage } from './languages';

let i18nInstance: i18n | null = null;

const initI18n = async () => {
  if (typeof window === 'undefined') {
    return null;
  }

  if (i18nInstance) {
    return i18nInstance;
  }

  try {
    // Dynamic imports to prevent server-side execution
    const [
      { default: i18n },
      { initReactI18next },
      { default: LanguageDetector },
      enTranslations,
      esTranslations
    ] = await Promise.all([
      import('i18next'),
      import('react-i18next'),
      import('i18next-browser-languagedetector'),
      import('./locales/en.json'),
      import('./locales/es.json')
    ]);

    const resources = {
      en: { translation: enTranslations },
      es: { translation: esTranslations }
    };

    if (!i18n.isInitialized) {
      await i18n
        .use(LanguageDetector)
        .use(initReactI18next)
        .init({
          resources,
          fallbackLng: defaultLanguage.code,
          supportedLngs: getSupportedLanguageCodes(),
          debug: false,
          
          detection: {
            order: ['localStorage', 'navigator', 'htmlTag'],
            caches: ['localStorage'],
            lookupLocalStorage: 'i18nextLng',
          },

          interpolation: {
            escapeValue: false,
          },

          react: {
            useSuspense: false,
          },
        });
      
      console.log('i18n initialized successfully');
    }

    i18nInstance = i18n;
    return i18n;
  } catch (error) {
    console.error('Failed to initialize i18n:', error);
    return null;
  }
};

// Export the initialization function
export { initI18n };

// Export a default that will be set after initialization
export default {
  t: (key: string) => key,
  language: defaultLanguage.code,
  changeLanguage: () => Promise.resolve(),
  isInitialized: false
}; 