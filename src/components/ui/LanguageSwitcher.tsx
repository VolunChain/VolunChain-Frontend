"use client";

import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Globe } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';

const languages = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'es', name: 'Español', flag: '🇪🇸' }
];

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const { currentLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const currentLang = languages.find(lang => lang.code === currentLanguage) || languages[0];

  const handleLanguageChange = (languageCode: string) => {
    if (i18n && typeof i18n.changeLanguage === 'function') {
      try {
        i18n.changeLanguage(languageCode);
      } catch (error) {
        console.warn('Failed to change language:', error);
      }
    }
    setIsOpen(false);
  };

  if (!isClient) {
    // Return a fallback during SSR
    return (
      <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-background-primary border border-gray-700">
        <Globe size={16} className="text-secondary" />
        <span className="text-white text-sm font-medium hidden sm:inline">
          English
        </span>
        <span className="text-white text-sm font-medium sm:hidden">
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
      >
        <Globe size={16} className="text-secondary" />
        <span className="text-white text-sm font-medium hidden sm:inline">
          {currentLang.name}
        </span>
        <span className="text-white text-sm font-medium sm:hidden">
          {currentLang.flag}
        </span>
        <ChevronDown 
          size={14} 
          className={`text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} 
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
            >
              {languages.map((language) => (
                <motion.button
                  key={language.code}
                  onClick={() => handleLanguageChange(language.code)}
                  className={`w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-background-secondary transition-colors ${
                    language.code === currentLanguage ? 'bg-secondary/10 text-secondary' : 'text-white'
                  }`}
                  whileHover={{ x: 4 }}
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