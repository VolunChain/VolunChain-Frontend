"use client";

import { useEffect, useState } from 'react';
import { I18nextProvider } from 'react-i18next';

interface I18nProviderProps {
  children: React.ReactNode;
}

export default function I18nProvider({ children }: I18nProviderProps) {
  const [i18nInstance, setI18nInstance] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initializeI18n = async () => {
      if (typeof window === 'undefined') {
        setIsLoading(false);
        return;
      }

      try {
        const { initI18n } = await import('@/i18n');
        const instance = await initI18n();
        
        if (instance) {
          setI18nInstance(instance);
          console.log('i18n provider ready');
        }
      } catch (error) {
        console.error('Failed to initialize i18n:', error);
      } finally {
        setIsLoading(false);
      }
    };

    initializeI18n();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-white">Loading translations...</div>
      </div>
    );
  }

  if (!i18nInstance) {
    // Fallback rendering without i18n
    return <>{children}</>;
  }

  return (
    <I18nextProvider i18n={i18nInstance}>
      {children}
    </I18nextProvider>
  );
}
 