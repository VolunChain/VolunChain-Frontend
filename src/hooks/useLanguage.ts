"use client";

import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';

export const useLanguage = () => {
  const { i18n } = useTranslation();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || typeof window === 'undefined') return;

    const updateHtmlLang = () => {
      const lang = i18n.language || 'en';
      document.documentElement.lang = lang;
    };

    // Update immediately
    updateHtmlLang();

    // Listen for changes if the method exists
    if (i18n.on && typeof i18n.on === 'function') {
      i18n.on('languageChanged', updateHtmlLang);
      
      return () => {
        if (i18n.off && typeof i18n.off === 'function') {
          i18n.off('languageChanged', updateHtmlLang);
        }
      };
    }
  }, [i18n, mounted]);

  return {
    currentLanguage: i18n.language || 'en',
    changeLanguage: (lng: string) => {
      if (i18n.changeLanguage && typeof i18n.changeLanguage === 'function') {
        i18n.changeLanguage(lng);
      }
    },
  };
};